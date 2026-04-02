import React, { useRef, useState } from "react";
import { 
  HeartPulse, 
  ScanLine, 
  TrendingUp, 
  ShieldCheck, 
  Download,
  FileImage,
  Activity,
  Loader2
} from "lucide-react";
import { motion as Motion } from "motion/react";
import { toPng } from "html-to-image";
import { Link } from "react-router";
import { AppIconSvg } from "./LogoPage";

/** 将 `public/promo-qrcode.svg` 换成你的客服二维码 PNG/SVG 即可与 Figma 资源一致 */
const promoQrcodeSrc = `${import.meta.env.BASE_URL}promo-qrcode.svg`;

export default function PromoPage() {
  const poster1Ref = useRef<HTMLDivElement>(null);
  const poster2Ref = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);

  const handleDownload = async (posterName: string, ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return;
    
    try {
      setIsDownloading(posterName);
      
      const dataUrl = await toPng(ref.current, {
        cacheBust: true,
        pixelRatio: 3,
        style: {
          transform: 'none' // 防止动画导致的偏移
        }
      });
      
      const link = document.createElement("a");
      link.download = `医案通-${posterName}-${new Date().getTime()}.png`;
      link.href = dataUrl;
      link.click();
      
    } catch (error) {
      console.error("生成海报失败:", error);
      alert("生成海报失败，请尝试截图保存。");
    } finally {
      setIsDownloading(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center py-12 px-4 sm:px-8">
      <div className="text-center mb-10 relative">
        <h1 className="text-3xl font-black text-slate-900 mb-3">宣发海报</h1>
        <p className="text-slate-500 mb-6">长按或点击下载，分享至朋友圈/客户群（建议在手机端预览）</p>
        <Link 
          to="/logo" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
        >
          <FileImage size={16} />
          查看品牌标志 (Logo) 资源
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 w-full max-w-6xl">
        
        {/* 海报 1：品牌与核心理念 (浅色版) */}
        <div className="flex flex-col items-center gap-6">
          <Motion.div 
            ref={poster1Ref}
            id="poster-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-[340px] h-[604px] sm:w-[380px] sm:h-[676px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-100"
          >
            {/* 顶部装饰背景 */}
            <div className="absolute top-0 inset-x-0 h-80 bg-gradient-to-br from-blue-50 via-slate-50 to-white -z-10" />
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -z-10" />
            <div className="absolute top-32 -left-20 w-48 h-48 bg-cyan-400/10 rounded-full blur-2xl -z-10" />

            {/* Logo与日期 */}
            <div className="px-8 pt-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-[10px] overflow-hidden shadow-md shadow-blue-500/20">
                  <AppIconSvg shadow={false} />
                </div>
                <span className="font-extrabold text-lg text-slate-900 tracking-wide">医案通</span>
              </div>
              <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold border border-blue-100">
                2026.4 全新上线
              </div>
            </div>

            {/* 主标题 */}
            <div className="px-8 mt-10">
              <h2 className="text-[2.5rem] leading-[1.1] font-black text-slate-900 tracking-tight mb-4">
                你的随身<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">智能医疗管家</span>
              </h2>
              <p className="text-slate-500 font-medium leading-relaxed">
                告别纸质病历堆积<br />全家健康档案，一手轻松掌握
              </p>
            </div>

            {/* 核心功能图形区 */}
            <div className="flex-1 relative mt-10 px-8 flex flex-col justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 pointer-events-none" />
              
              <div className="space-y-4 relative z-0">
                <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center gap-4 transform -rotate-2">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <ScanLine size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">AI 拍照即录入</h3>
                    <p className="text-xs text-slate-500 mt-0.5">自动识别化验单，秒级提取指标</p>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center gap-4 transform translate-x-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">跨医院指标追踪</h3>
                    <p className="text-xs text-slate-500 mt-0.5">历史趋势折线图，对齐同类数据</p>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center gap-4 transform rotate-1 translate-x-2">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">银行级隐私安全</h3>
                    <p className="text-xs text-slate-500 mt-0.5">端到端加密，数据仅存你手</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 底部扫码区 */}
            <div className="h-28 bg-slate-50 border-t border-slate-100 px-8 flex items-center justify-between z-20">
              <div>
                <div className="font-bold text-slate-800 mb-1 text-[15px]">长按扫码，添加客服，第一时间体验</div>
                <div className="text-xs text-slate-500">限时免费开放 100 个内部邀请名额</div>
              </div>
              <div className="w-[72px] h-[72px] bg-white rounded-xl shadow-sm border border-slate-200 p-1 flex items-center justify-center overflow-hidden shrink-0">
                <img src={promoQrcodeSrc} alt="客服二维码" className="w-full h-full object-cover rounded-lg" />
              </div>
            </div>
          </Motion.div>

          <button 
            onClick={() => handleDownload("品牌海报", poster1Ref)}
            disabled={isDownloading !== null}
            className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-full shadow-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDownloading === "品牌海报" ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
            {isDownloading === "品牌海报" ? "正在生成..." : "保存品牌海报"}
          </button>
        </div>

        {/* 海报 2：功能深潜 (深色医疗蓝调) */}
        <div className="flex flex-col items-center gap-6">
          <Motion.div 
            ref={poster2Ref}
            id="poster-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative w-[340px] h-[604px] sm:w-[380px] sm:h-[676px] bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-800"
          >
            {/* 医疗蓝调背景 */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-slate-900 to-slate-900 -z-10" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[80px] -z-10 translate-x-1/3 -translate-y-1/3" />

            {/* Header */}
            <div className="px-8 pt-10 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-[9px] overflow-hidden shadow-md shadow-blue-900/50">
                  <AppIconSvg shadow={false} />
                </div>
                <span className="font-extrabold text-lg tracking-wider">医案通</span>
              </div>
              <Activity className="text-blue-400 opacity-80" size={20} />
            </div>

            {/* 标题 */}
            <div className="px-8 mt-12">
              <h2 className="text-[2.2rem] leading-[1.2] font-black text-white tracking-tight mb-4">
                指标趋势，一眼即知<br />
                原件影像，触手可及
              </h2>
              <div className="w-12 h-1 bg-blue-500 rounded-full mb-6" />
              <p className="text-blue-200/80 font-medium leading-relaxed text-sm">
                无论多少次检查，我们为你自动绘制指标折线图。<br />对数据有疑问？一键随时查看化验单高清原件。
              </p>
            </div>

            {/* 抽象化的趋势图与原件卡片 */}
            <div className="flex-1 relative mt-12 px-6">
              {/* 模拟App内的图表卡片 */}
              <div className="absolute top-0 inset-x-6 h-48 bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-5 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <div className="text-slate-400 text-xs font-medium mb-1">白细胞 (WBC)</div>
                    <div className="text-white font-bold text-xl flex items-baseline gap-1">
                      6.8 <span className="text-xs text-slate-500 font-normal">10^9/L</span>
                    </div>
                  </div>
                  <div className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs font-bold">
                    正常
                  </div>
                </div>
                
                {/* 简易折线图 SVG */}
                <div className="h-16 relative w-full mt-4">
                  <svg viewBox="0 0 200 60" className="w-full h-full overflow-visible">
                    <path 
                      d="M0,50 L40,45 L80,20 L120,35 L160,10 L200,15" 
                      fill="none" 
                      stroke="#3b82f6" 
                      strokeWidth="3" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                    <circle cx="80" cy="20" r="4" fill="#3b82f6" stroke="#1e293b" strokeWidth="2" />
                    <circle cx="160" cy="10" r="4" fill="#3b82f6" stroke="#1e293b" strokeWidth="2" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-800/80 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* 模拟悬浮的“查看原件”按钮/提示 */}
              <Motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-[8.5rem] right-2 bg-blue-600 rounded-xl p-3 shadow-lg shadow-blue-900/50 flex items-center gap-3 border border-blue-500"
              >
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white">
                  <FileImage size={16} />
                </div>
                <div className="pr-2">
                  <div className="text-white text-sm font-bold leading-tight">查看化验单原件</div>
                  <div className="text-blue-200 text-[10px] mt-0.5">支持左右滑动浏览</div>
                </div>
              </Motion.div>
            </div>

            {/* 底部扫码区 */}
            <div className="mt-auto px-8 pb-8 pt-4 flex items-center justify-between z-20">
              <div className="pr-2">
                <div className="font-bold text-white mb-1.5 text-[15px] leading-tight">长按扫码，添加客服，第一时间体验</div>
                <div className="text-xs text-blue-300/80">限时免费开放 100 个内部邀请名额</div>
              </div>
              <div className="w-[72px] h-[72px] bg-white rounded-xl p-1 flex items-center justify-center overflow-hidden shrink-0">
                <img src={promoQrcodeSrc} alt="客服二维码" className="w-full h-full object-cover rounded-lg" />
              </div>
            </div>
          </Motion.div>

          <button 
            onClick={() => handleDownload("功能海报", poster2Ref)}
            disabled={isDownloading !== null}
            className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-full shadow-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDownloading === "功能海报" ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
            {isDownloading === "功能海报" ? "正在生成..." : "保存功能海报"}
          </button>
        </div>

      </div>
    </div>
  );
}