import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { AppIconSvg } from "./LogoPage";

/** 兜底下载链接：仅在版本检查接口异常时回退使用 */
const FALLBACK_APK_URL =
  "https://download.med-vault.cloud/public/app-packages/android/7faf3715-0c16-44df-ae9b-53c9b41a976f.apk";

/**
 * 版本检查接口：优先走同域 /api（ESA 边缘函数 edge/index.js 代理，规避 CORS），
 * 失败时再尝试直连 api.med-vault.cloud（若服务端已放行 CORS）。
 */
const VERSION_CHECK_ENDPOINTS = [
  "/api/v1/app/version-check?platform=android",
  "https://api.med-vault.cloud/api/v1/app/version-check?platform=android",
];

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
    try {
      const res = await fetch(endpoint, { method: "GET", headers: { accept: "application/json" } });
      if (!res.ok) continue;
      const payload = await res.json();
      // 统一信封 { success, data, error, request_id }
      if (payload && payload.success === true && payload.data) {
        return payload.data as AndroidVersionInfo;
      }
    } catch {
      // 继续尝试下一个端点
    }
  }
  return null;
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

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    setMobile(/android|iphone|ipad|ipod|mobile/.test(ua));
  }, []);
  return mobile;
}

function useAndroidVersionInfo() {
  const [info, setInfo] = useState<AndroidVersionInfo | null>(null);
  useEffect(() => {
    let cancelled = false;
    fetchLatestAndroidVersion().then((v) => {
      if (!cancelled) setInfo(v);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return info;
}

function DownloadButton({ versionInfo }: { versionInfo: AndroidVersionInfo | null }) {
  const isMobile = useIsMobile();
  const [pressed, setPressed] = useState(false);

  // 接口返回的 download_url 可能为空串（运营未填地址），此时回退到内置链接
  const apkUrl = versionInfo?.download_url || FALLBACK_APK_URL;

  const handleClick = () => {
    setPressed(true);
    window.location.href = apkUrl;
    setTimeout(() => setPressed(false), 2500);
  };

  return (
    <div className="w-full">
      <motion.button
        onClick={handleClick}
        whileTap={{ scale: 0.97 }}
        className="w-full relative overflow-hidden rounded-2xl py-4 px-6 flex items-center justify-center gap-3 font-bold text-lg text-white"
        style={{
          background: pressed
            ? "linear-gradient(135deg,#059669,#10B981)"
            : "linear-gradient(135deg,#1D4ED8,#3B82F6)",
          boxShadow: pressed
            ? "0 8px 32px rgba(16,185,129,0.35)"
            : "0 8px 32px rgba(37,99,235,0.4)",
          transition: "background 0.4s, box-shadow 0.4s",
        }}
      >
        {/* Shimmer */}
        {!pressed && (
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

      {!isMobile && (
        <p className="text-center text-xs mt-2.5" style={{ color: "rgba(255,255,255,0.4)" }}>
          建议在手机浏览器中打开此页面以直接安装
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
  const versionInfo = useAndroidVersionInfo();

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center"
      style={{
        background: "linear-gradient(160deg,#060E2A 0%,#0D2260 55%,#091840 100%)",
        fontFamily: "'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif",
      }}
    >
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
          {/* Beta badge */}
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
              内测招募中
            </span>
            <span style={{
              background: "rgba(255,165,0,0.25)",
              border: "1px solid rgba(255,165,0,0.4)",
              borderRadius: 100, padding: "1px 8px",
              color: "#FCD34D", fontSize: 10, fontWeight: 800, letterSpacing: "0.1em",
            }}>BETA</span>
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
              { icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, label: "限时内测" },
              { icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, label: "名额有限" },
              { icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>, label: "仅限安卓" },
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
          <DownloadButton versionInfo={versionInfo} />
        </motion.div>

        {/* ── Release notes ── */}
        <ReleaseNotes versionInfo={versionInfo} />

        {/* ── Footer ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ textAlign: "center", paddingBottom: 16 }}
        >
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, lineHeight: 1.7 }}>
            内测版本仅供体验 · 数据加密存储<br />
            © 2026 医案通 MedVault · All Rights Reserved
          </p>
        </motion.div>

      </div>
    </div>
  );
}
