/**
 * ESA 边缘函数（EdgeRoutine，随 Pages 一起部署，入口见 esa.jsonc 的 entry 字段）
 *
 * 职责：为官网 H5 代理 App 版本检查接口 GET /api/v1/app/version-check
 *  - 同域转发，规避浏览器直连 api.med-vault.cloud 的 CORS 限制
 *  - 统一补充 CORS 响应头（支持 OPTIONS 预检）
 *  - 边缘节点短缓存，降低源站查询压力
 *
 * 静态资源与 SPA 路由由 Pages assets 直接处理（assets.directory=./dist），
 * 未匹配到静态资源的非导航请求（fetch/XHR）会进入本函数。
 */

const UPSTREAM_BASE = "https://api.med-vault.cloud";
const VERSION_CHECK_PATH = "/api/v1/app/version-check";

/** 允许透传给上游的查询参数白名单 */
const ALLOWED_QUERY_KEYS = ["platform", "current_version", "user_id", "device_id"];

/** 边缘缓存时长（秒）：版本发布低频，短缓存即可 */
const EDGE_MAX_AGE = 60;

const CORS_HEADERS = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, OPTIONS",
  "access-control-allow-headers": "content-type",
  "access-control-max-age": "86400",
};

function jsonError(status, message, requestId) {
  return new Response(
    JSON.stringify({ success: false, error: message, request_id: requestId || null }),
    {
      status,
      headers: { "content-type": "application/json; charset=utf-8", ...CORS_HEADERS },
    }
  );
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);

  if (url.pathname !== VERSION_CHECK_PATH) {
    return jsonError(404, "Not Found");
  }

  // CORS 预检
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  if (request.method !== "GET") {
    return jsonError(405, "Method Not Allowed");
  }

  // 仅透传白名单内的查询参数
  const upstreamUrl = new URL(VERSION_CHECK_PATH, UPSTREAM_BASE);
  for (const key of ALLOWED_QUERY_KEYS) {
    const value = url.searchParams.get(key);
    if (value !== null) {
      upstreamUrl.searchParams.set(key, value);
    }
  }

  let upstream;
  try {
    upstream = await fetch(upstreamUrl.toString(), {
      method: "GET",
      headers: { accept: "application/json" },
    });
  } catch (err) {
    return jsonError(502, "upstream fetch failed");
  }

  const body = await upstream.text();
  const headers = {
    "content-type":
      upstream.headers.get("content-type") || "application/json; charset=utf-8",
    "cache-control": `public, max-age=${EDGE_MAX_AGE}`,
    ...CORS_HEADERS,
  };
  return new Response(body, { status: upstream.status, headers });
}
