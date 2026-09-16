import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { AppIconSvg } from "./LogoPage";
import { useLaunchNotice } from "../components/LaunchNoticeProvider";

/**
 * 版本检查接口：优先走同域 /api（ESA 边缘函数 edge/index.js 代理，规避 CORS），
 * 失败时再尝试直连 api.med-vault.cloud（若服务端已放行 CORS）。
 */
const VERSION_CHECK_ENDPOINTS = [
  "/api/v1/app/version-check?platform=android",
  "https://api.med-vault.cloud/api/v1/app/version-check?platform=android",
];

/** 单个端点的请求超时时间（毫秒），避免按钮长时间卡在加载态 */
const FETCH_TIMEOUT_MS = 6000;

/** 下载事件上报接口（同域，经 ESA 边缘函数 / vite dev 代理转发，规避 CORS） */
const DOWNLOAD_EVENT_PATH = "/api/v1/app/download-events";

interface AndroidVersionInfo {
  latest_version: string;
  download_url: string;
  release_notes: string;
  force_update: boolean;
  min_supported_version: string;
  rollout_channel: string;
}

async function fetchLatestAndroidVersion(): Promise<AndroidVersionInfo | null> {
  for (const endpoint of VERSION_CHECK_ENDPOINTS) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    try {
      const res = await fetch(endpoint, {
        method: "GET",
        headers: { accept: "application/json" },
        signal: controller.signal,
      });
      if (!res.ok) continue;
      const payload = await res.json();
      // 统一信封 { success, data, error, request_id }
      if (payload && payload.success === true && payload.data) {
        return payload.data as AndroidVersionInfo;
      }
    } catch {
      // 继续尝试下一个端点
    } finally {
      clearTimeout(timer);
    }
  }
  return null;
}

/**
 * 下载点击上报：fire-and-forget，失败静默忽略，绝不阻塞下载主流程。
 * 口径以「点击/触发下载」为准（浏览器无法可靠感知下载完成）。
 */
function reportAppDownload(version?: string) {
  const body = JSON.stringify({
    platform: "android",
    version: (version || "").slice(0, 64), // 后端限制最长 64 字符，防御性截断
  });
  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(DOWNLOAD_EVENT_PATH, new Blob([body], { type: "application/json" }));
    } else {
      fetch(DOWNLOAD_EVENT_PATH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // 静默
  }
}

const FEATURES = [
  {
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
    title: "多类型报告上传",
    desc: "病历、体检单、检验报告一站管理",
  },
  {
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
      </svg>
    ),
    title: "AI 智能解读分析",
    desc: "读懂指标异常，给出通俗建议",
  },
  {
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "健康趋势追踪",
    desc: "血压、血糖、血脂长期可视化",
  },
  {
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
    title: "一键分享给医生",
    desc: "加密链接，复诊前30秒搞定",
  },
];

type ClientPlatform = "android" | "ios" | "desktop";

function detectPlatform(ua: string): ClientPlatform {
  const value = ua.toLowerCase();
  if (/iphone|ipad|ipod/.test(value)) return "ios";
  // iPadOS 13+ 可能伪装成 Macintosh
  if (/macintosh/.test(value) && typeof navigator !== "undefined" && navigator.maxTouchPoints > 1) {
    return "ios";
  }
  if (/android/.test(value)) return "android";
  return "desktop";
}

function useClientPlatform() {
  const [platform, setPlatform] = useState<ClientPlatform>("desktop");
  useEffect(() => {
    setPlatform(detectPlatform(navigator.userAgent));
  }, []);
  return platform;
}

function useIsWechat() {
  const [isWechat, setIsWechat] = useState(false);
  useEffect(() => {
    // 微信内置浏览器 UA 包含 MicroMessenger（企业微信为 WXWork，同样拦截）
    setIsWechat(/micromessenger|wxwork/i.test(navigator.userAgent));
  }, []);
  return isWechat;
}

function getDownloadPageUrl() {
  if (typeof window === "undefined") return "https://med-vault.cloud/#/download";
  return `${window.location.origin}${window.location.pathname}#/download`;
}

/** 微信内置浏览器会拦截 APK 下载，仅 Android 微信展示引导 */
function WechatGuideMask({ platform }: { platform: ClientPlatform }) {
  const isWechat = useIsWechat();
  if (!isWechat || platform !== "android") return null;

  const steps = [
    "点击右上角的 ··· 菜单",
    "选择「在浏览器打开」",
    "回到页面后点击「立即下载」即可安装",
  ];

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(4,9,26,0.85)", backdropFilter: "blur(4px)",
        display: "flex", flexDirection: "column",
        padding: "18px 22px 32px",
      }}
    >
      {/* 右上角指引：浮动箭头 + 文案 */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
        <motion.svg
          width="52" height="52" viewBox="0 0 24 24" fill="none"
          stroke="#FCD34D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M7 17L17 7" />
          <path d="M9 7h8v8" />
        </motion.svg>
        <p style={{ color: "#fff", fontSize: 19, fontWeight: 800, margin: 0, textAlign: "right" }}>
          点击右上角 <span style={{ color: "#FCD34D", fontSize: 24, letterSpacing: "0.05em" }}>···</span>
        </p>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 15, fontWeight: 600, margin: 0, textAlign: "right" }}>
          选择「在浏览器打开」
        </p>
      </div>

      {/* 步骤说明卡片 */}
      <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 12 }}>
        {steps.map((text, i) => (
          <div
            key={i}
            style={{
              display: "flex", alignItems: "center", gap: 12,
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 14, padding: "12px 14px",
            }}
          >
            <div style={{
              width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
              background: "linear-gradient(135deg,#1D4ED8,#3B82F6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: 13, fontWeight: 800,
            }}>
              {i + 1}
            </div>
            <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, fontWeight: 600, lineHeight: 1.4 }}>
              {text}
            </span>
          </div>
        ))}
      </div>

      {/* 底部提示 */}
      <p style={{ marginTop: "auto", textAlign: "center", color: "rgba(255,255,255,0.35)", fontSize: 12, lineHeight: 1.7 }}>
        微信内无法直接下载安装包<br />请使用系统浏览器打开本页面
      </p>
    </div>
  );
}

function useAndroidVersionInfo() {
  const [info, setInfo] = useState<AndroidVersionInfo | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let cancelled = false;
    fetchLatestAndroidVersion().then((v) => {
      if (cancelled) return;
      if (v) setInfo(v);
      else setFailed(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return { info, failed };
}

function DownloadButton({
  versionInfo,
  failed,
}: {
  versionInfo: AndroidVersionInfo | null;
  failed: boolean;
}) {
  const [pressed, setPressed] = useState(false);

  // 无硬编码兜底：接口异常或 download_url 为空串时禁用按钮
  const apkUrl = versionInfo?.download_url?.trim() || "";
  const loading = !versionInfo && !failed;
  const unavailable = !loading && !apkUrl;

  const handleClick = () => {
    if (!apkUrl) return;
    // 下载真正发起时上报一次（先上报再跳转，sendBeacon 不受页面离开影响）
    reportAppDownload(versionInfo?.latest_version);
    setPressed(true);
    window.location.href = apkUrl;
    setTimeout(() => setPressed(false), 2500);
  };

  return (
    <div className="w-full">
      <motion.button
        onClick={handleClick}
        disabled={loading || unavailable}
        whileTap={apkUrl ? { scale: 0.97 } : undefined}
        className="w-full relative overflow-hidden rounded-2xl py-4 px-6 flex items-center justify-center gap-3 font-bold text-lg text-white"
        style={{
          background: pressed
            ? "linear-gradient(135deg,#059669,#10B981)"
            : unavailable
              ? "rgba(255,255,255,0.12)"
              : "linear-gradient(135deg,#1D4ED8,#3B82F6)",
          boxShadow: pressed
            ? "0 8px 32px rgba(16,185,129,0.35)"
            : unavailable
              ? "none"
              : "0 8px 32px rgba(37,99,235,0.4)",
          opacity: loading ? 0.7 : 1,
          cursor: apkUrl ? "pointer" : "default",
          transition: "background 0.4s, box-shadow 0.4s, opacity 0.4s",
        }}
      >
        {/* Shimmer */}
        {!pressed && !unavailable && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.15) 50%,transparent 60%)",
            }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
          />
        )}
        {pressed ? (
          <>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            下载已开始
          </>
        ) : unavailable ? (
          "下载暂不可用"
        ) : loading ? (
          "正在获取下载链接…"
        ) : (
          <>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            立即下载 · Android APK
          </>
        )}
      </motion.button>

      {/* 接口异常 / 未配置下载地址时的提示 */}
      {unavailable && (
        <p className="text-center text-xs mt-2.5" style={{ color: "#FCA5A5" }}>
          获取下载链接失败，请稍后刷新页面重试
        </p>
      )}

      {/* 最新版本号 */}
      {versionInfo?.latest_version && (
        <p className="text-center mt-2.5" style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>
          最新版本 v{versionInfo.latest_version}
        </p>
      )}

      <div className="flex items-center justify-center gap-2 mt-3">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
        <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12 }}>仅支持 Android 手机安装</span>
      </div>
    </div>
  );
}

function SupportNotice() {
  const { showLaunchNotice } = useLaunchNotice();
  return (
    <button
      type="button"
      onClick={showLaunchNotice}
      className="w-full mt-3 text-center text-sm font-medium"
      style={{ color: "rgba(255,255,255,0.55)", background: "none", border: 0, cursor: "pointer" }}
    >
      安装后可添加客服，领取体验资格
    </button>
  );
}

function DesktopQrCard() {
  const pageUrl = useMemo(() => getDownloadPageUrl(), []);
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=10&data=${encodeURIComponent(pageUrl)}`;

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 20,
        padding: "22px 18px 18px",
        textAlign: "center",
      }}
    >
      <p style={{ color: "#fff", fontSize: 16, fontWeight: 800, margin: 0 }}>手机扫码下载</p>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, margin: "8px 0 16px", lineHeight: 1.5 }}>
        请使用手机浏览器扫描，在手机上完成安装
      </p>
      <div
        style={{
          width: 176,
          height: 176,
          margin: "0 auto",
          borderRadius: 16,
          background: "#fff",
          padding: 10,
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        }}
      >
        <img src={qrSrc} alt="医案通下载页二维码" width={156} height={156} style={{ display: "block" }} />
      </div>
      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, marginTop: 12, wordBreak: "break-all" }}>
        {pageUrl}
      </p>
    </div>
  );
}

function IosComingSoon() {
  const { showLaunchNotice } = useLaunchNotice();
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 20,
        padding: "22px 18px",
        textAlign: "center",
      }}
    >
      <p style={{ color: "#fff", fontSize: 16, fontWeight: 800, margin: 0 }}>iOS 即将上架 App Store</p>
      <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, margin: "10px 0 18px", lineHeight: 1.6 }}>
        当前可先添加官方客服预约体验，上架后我们会第一时间通知你。
      </p>
      <button
        type="button"
        onClick={showLaunchNotice}
        className="w-full rounded-2xl py-4 px-6 font-bold text-white"
        style={{
          background: "linear-gradient(135deg,#1D4ED8,#3B82F6)",
          boxShadow: "0 8px 32px rgba(37,99,235,0.4)",
          border: 0,
          cursor: "pointer",
        }}
      >
        添加客服预约 iOS
      </button>
    </div>
  );
}

function DeviceAwareDownload({
  platform,
  versionInfo,
  failed,
}: {
  platform: ClientPlatform;
  versionInfo: AndroidVersionInfo | null;
  failed: boolean;
}) {
  if (platform === "ios") return <IosComingSoon />;
  if (platform === "desktop") {
    return (
      <div>
        <DesktopQrCard />
        <SupportNotice />
      </div>
    );
  }
  return (
    <div>
      <DownloadButton versionInfo={versionInfo} failed={failed} />
      <SupportNotice />
    </div>
  );
}

/** 更新说明卡片：接口返回的 release_notes（多行以 \n 分隔），无内容时不渲染 */
function ReleaseNotes({ versionInfo }: { versionInfo: AndroidVersionInfo | null }) {
  const notes = versionInfo?.release_notes?.trim();
  if (!notes) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.48, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 16, padding: "14px 16px",
      }}
    >
      <div style={{ color: "#fff", fontSize: 13, fontWeight: 700, marginBottom: 8 }}>
        版本更新说明
      </div>
      {notes.split("\n").map((line, i) => (
        <p key={i} style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, lineHeight: 1.7, margin: 0 }}>
          {line}
        </p>
      ))}
    </motion.div>
  );
}

export default function AppDownloadPage() {
  const { info: versionInfo, failed: versionFailed } = useAndroidVersionInfo();
  const platform = useClientPlatform();

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center"
      style={{
        background: "linear-gradient(160deg,#060E2A 0%,#0D2260 55%,#091840 100%)",
        fontFamily: "'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif",
      }}
    >
      {/* 微信内置浏览器拦截提示遮罩（仅 Android） */}
      <WechatGuideMask platform={platform} />

      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div style={{
          position: "absolute", top: -120, right: -100,
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(59,130,246,0.12) 0%,transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: 60, left: -80,
          width: 320, height: 320, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(99,102,241,0.1) 0%,transparent 70%)",
        }} />
        {/* Grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
      </div>

      <div className="relative w-full max-w-sm px-5 py-12 flex flex-col gap-8">

        {/* ── Hero ── */}
        <motion.div
          className="flex flex-col items-center text-center gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            to="/"
            style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, fontWeight: 600, textDecoration: "none" }}
          >
            ← 返回官网
          </Link>

          <div style={{
            display: "flex", alignItems: "center", gap: 7,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 100, padding: "6px 14px",
          }}>
            <div style={{
              width: 7, height: 7, borderRadius: "50%",
              background: "#4ADE80", boxShadow: "0 0 8px #4ADE80",
            }} />
            <span style={{ color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em" }}>
              现已上线
            </span>
          </div>

          {/* App icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 96, height: 96, borderRadius: 26,
              background: "rgba(255,255,255,0.1)",
              border: "1.5px solid rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 16px 48px rgba(0,0,0,0.3)",
            }}
          >
            <div style={{ width: 78, height: 78, borderRadius: 20, overflow: "hidden" }}>
              <AppIconSvg shadow={false} />
            </div>
          </motion.div>

          <div>
            <h1 style={{ color: "#fff", fontSize: 32, fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.1, margin: 0 }}>
              医案通
            </h1>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginTop: 6, letterSpacing: "0.04em" }}>
              MedVault · 家庭医疗档案管家
            </p>
          </div>

          {/* Restriction pills */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, label: "官方下载" },
              { icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>, label: platform === "ios" ? "iOS 即将上架" : "现支持 Android" },
            ].map(({ icon, label }) => (
              <div key={label} style={{
                display: "flex", alignItems: "center", gap: 5,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: 100, padding: "4px 11px",
                color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 600,
              }}>
                {icon}
                {label}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Features ── */}
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {FEATURES.map(({ svg, title, desc }) => (
            <div
              key={title}
              style={{
                display: "flex", alignItems: "center", gap: 14,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 16, padding: "14px 16px",
              }}
            >
              <div style={{
                width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                background: "rgba(59,130,246,0.2)",
                border: "1px solid rgba(59,130,246,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#93C5FD",
              }}>
                {svg}
              </div>
              <div>
                <div style={{ color: "#fff", fontSize: 14, fontWeight: 700, lineHeight: 1.3 }}>{title}</div>
                <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, marginTop: 2, lineHeight: 1.4 }}>{desc}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Download CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <DeviceAwareDownload platform={platform} versionInfo={versionInfo} failed={versionFailed} />
        </motion.div>

        {/* ── Release notes ── */}
        {platform !== "ios" && <ReleaseNotes versionInfo={versionInfo} />}

        {/* ── Footer ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ textAlign: "center", paddingBottom: 16 }}
        >
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, lineHeight: 1.7 }}>
            官方安装通道 · 数据加密存储<br />
            © 2026 医案通 MedVault · All Rights Reserved
          </p>
        </motion.div>

      </div>
    </div>
  );
}
