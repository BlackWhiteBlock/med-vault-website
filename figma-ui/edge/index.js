/**
 * ESA 边缘函数（函数和Pages，模块格式入口，见 esa.jsonc 的 entry 字段）
 *
 * 职责：把 /api/* 同域代理到 https://api.med-vault.cloud，
 * 规避浏览器直连 API 域名的 CORS 限制（H5 下载页依赖 /api/v1/app/version-check）。
 *
 * 路由说明（ESA Pages 规则）：
 *  - 静态资源命中时由 assets 层直接响应，不会进入本函数；
 *  - 导航请求（Sec-Fetch-Mode: navigate）由 notFoundStrategy 回退 index.html，不进入本函数；
 *  - 仅「未命中静态资源的非导航请求」才会执行本函数，因此 /api/* 之外直接返回 404，
 *    不能 return fetch(request)，否则会对自身域名发起子请求造成回环。
 *  - 统一补充 CORS 响应头（支持 OPTIONS 预检）。
 */

const UPSTREAM_BASE = "https://api.med-vault.cloud";

const CORS_HEADERS = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, OPTIONS",
  "access-control-allow-headers": "content-type",
  "access-control-max-age": "86400",
};

function jsonError(status, message) {
  return new Response(JSON.stringify({ success: false, error: message }), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...CORS_HEADERS },
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // 仅代理 /api/*，其余路径返回 404（静态资源/SPA 由 Pages assets 层处理，见文件头说明）
    if (!url.pathname.startsWith("/api/")) {
      return jsonError(404, "Not Found");
    }

    // CORS 预检
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const upstreamUrl = UPSTREAM_BASE + url.pathname + url.search;

    // 透传 method 与安全头部；非 GET/HEAD 额外透传请求体
    const headers = { accept: request.headers.get("accept") || "application/json" };
    const init = { method: request.method, headers };
    if (request.method !== "GET" && request.method !== "HEAD") {
      const contentType = request.headers.get("content-type");
      if (contentType) headers["content-type"] = contentType;
      init.body = await request.text();
    }

    let upstream;
    try {
      upstream = await fetch(upstreamUrl, init);
    } catch (err) {
      return jsonError(502, "upstream fetch failed");
    }

    const body = await upstream.text();
    return new Response(body, {
      status: upstream.status,
      headers: {
        "content-type":
          upstream.headers.get("content-type") || "application/json; charset=utf-8",
        ...CORS_HEADERS,
      },
    });
  },
};
