import React, { useRef, useState } from "react";
import { motion as Motion } from "motion/react";
import { Download, ChevronLeft, Loader2, Palette } from "lucide-react";
import { toPng } from "html-to-image";
import { useNavigate } from "react-router";

export const AppIconSvg = ({ className = "w-full h-full", shadow = true }: { className?: string, shadow?: boolean }) => (
  <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="primary-bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1E3A8A" />
      </linearGradient>
      <linearGradient id="cross-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
      {shadow && (
        <filter id="folder-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="16" stdDeviation="20" floodOpacity="0.15" />
        </filter>
      )}
    </defs>

    {/* Squircle Base */}
    <rect width="512" height="512" rx="116" fill="url(#primary-bg)" />

    {/* Folder Group */}
    <g filter={shadow ? "url(#folder-shadow)" : undefined}>
      {/* Back Folder Tab */}
      <path 
        d="M 112 176 C 112 158 126 144 144 144 H 224 L 264 184 H 368 C 386 184 400 198 400 216 V 352 C 400 370 386 384 368 384 H 144 C 126 384 112 370 112 352 V 176 Z" 
        fill="white" 
        fillOpacity="0.85" 
      />
      
      {/* Front Folder Card */}
      <path 
        d="M 112 224 C 112 206 126 192 144 192 H 368 C 386 192 400 206 400 224 V 352 C 400 370 386 384 368 384 H 144 C 126 384 112 370 112 352 V 224 Z" 
        fill="white" 
      />
    </g>

    {/* Medical Cross */}
    <path 
      d="M 256 240 V 336 M 208 288 H 304" 
      stroke="url(#cross-grad)" 
      strokeWidth="36" 
      strokeLinecap="round" 
    />

    {/* Pulse/Health Notification Dot */}
    <circle cx="384" cy="160" r="16" fill="#F43F5E" stroke="white" strokeWidth="6" />
  </svg>
);

export default function LogoPage() {
  const navigate = useNavigate();
  const iconRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);

  const handleDownload = async (name: string, ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return;
    try {
      setIsDownloading(name);
      const dataUrl = await toPng(ref.current, {
        cacheBust: true,
        pixelRatio: 4, // 超清导出
        backgroundColor: "transparent",
        style: { transform: 'none' }
      });
      const link = document.createElement("a");
      link.download = `医案通-${name}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("导出失败:", error);
    } finally {
      setIsDownloading(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
          >
            <ChevronLeft size={24} className="text-slate-600" />
          </button>
          <div className="font-bold text-slate-800 flex items-center gap-2">
            <Palette size={20} className="text-blue-600" />
            品牌标志设计
          </div>
          <div className="w-10" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-8 space-y-12">
        {/* 核心理念 */}
        <Motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-3xl font-bold text-slate-900">视觉识别系统 (VI)</h1>
          <p className="text-slate-500 max-w-lg mx-auto leading-relaxed">
            医案通的品牌标志融合了「医疗十字」、「隐私档案夹」与「健康生命点」三大核心元素，采用纯净的大圆角医疗蓝（Trust Blue）以传递信任、安全与专业感。
          </p>
        </Motion.section>

        {/* 1. 主应用图标 (App Icon) */}
        <Motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100"
        >
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">主应用图标 (App Icon)</h2>
                <p className="text-slate-500 text-sm">用于桌面图标、各大应用商店以及大视角的品牌展示。采用平滑的超椭圆（Squircle）比例。</p>
              </div>
              <button 
                onClick={() => handleDownload("AppIcon", iconRef)}
                disabled={isDownloading !== null}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
              >
                {isDownloading === "AppIcon" ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                导出超清 PNG (2048px)
              </button>
            </div>
            
            <div className="shrink-0 p-8 bg-slate-50 rounded-[40px] border border-slate-100 flex items-center justify-center">
              {/* 这里使用 ref 包裹便于截图 */}
              <div ref={iconRef} className="w-[256px] h-[256px]">
                <AppIconSvg />
              </div>
            </div>
          </div>
        </Motion.section>

        {/* 2. 横向标志 (Horizontal Logo) */}
        <Motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100"
        >
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">横向组合标志 (Horizontal)</h2>
                <p className="text-slate-500 text-sm">适用于导航栏、信笺、网页页眉等横向排列的场景，配备专属打磨的中文字体比例。</p>
              </div>
              <button 
                onClick={() => handleDownload("HorizontalLogo", horizontalRef)}
                disabled={isDownloading !== null}
                className="flex items-center gap-2 px-6 py-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors font-medium disabled:opacity-50"
              >
                {isDownloading === "HorizontalLogo" ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                导出透明背景 PNG
              </button>
            </div>

            <div className="shrink-0 w-full md:w-auto overflow-x-auto p-8 bg-slate-900 rounded-3xl border border-slate-800 flex items-center justify-center">
              {/* 横向 Logo Ref */}
              <div ref={horizontalRef} className="flex items-center gap-4 px-4 py-2">
                <div className="w-14 h-14 shrink-0">
                  <AppIconSvg shadow={false} />
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white tracking-widest">医案通</span>
                  <span className="text-[10px] text-blue-300 tracking-[0.2em] uppercase font-semibold mt-0.5">MedArchive</span>
                </div>
              </div>
            </div>
          </div>
        </Motion.section>
      </main>
    </div>
  );
}