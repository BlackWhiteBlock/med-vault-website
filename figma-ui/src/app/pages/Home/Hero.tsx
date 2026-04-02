import React from "react";
import { motion } from "motion/react";
import { Button } from "../../components/ui/button";
import { ArrowRight, Sparkles, Activity, FileText } from "lucide-react";
import { AppIconSvg } from "../LogoPage";
import { useLaunchNotice } from "../../components/LaunchNoticeProvider";

export function Hero() {
  const { showLaunchNotice } = useLaunchNotice();
  return (
    <section className="relative pt-32 pb-32 overflow-hidden bg-gradient-to-b from-blue-50/50 to-slate-50">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-1 space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium tracking-wide shadow-sm">
              <Sparkles className="w-4 h-4" />
              全新医案通，您的家庭健康管理中枢
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
              让每个人都拥有一份<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                完整的个人医疗档案
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl font-light">
              归集病历、整理报告、追踪趋势、安全分享，帮助个人与家庭更高效地管理健康资料，让医疗信息真正为你所用。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                type="button"
                size="lg"
                className="gap-2 group shadow-xl shadow-blue-600/20"
                onClick={showLaunchNotice}
              >
                立即体验
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                type="button"
                size="lg"
                variant="outline"
                className="border-slate-200 text-slate-600 hover:text-slate-900 bg-white shadow-sm"
                onClick={showLaunchNotice}
              >
                了解更多
              </Button>
            </div>
            
            <div className="pt-8 flex items-center gap-6 text-sm font-medium text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <Activity className="w-4 h-4" />
                </div>
                <span>指标追溯</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <FileText className="w-4 h-4" />
                </div>
                <span>影像沉浸浏览</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex-1 w-full max-w-md relative"
          >
            {/* Phone Mockup Frame */}
            <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl overflow-hidden ring-4 ring-slate-100">
              <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
              <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
              <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
              <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
              
              <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white relative pb-10">
                {/* App UI Mockup */}
                <div className="bg-slate-50 h-full p-4 flex flex-col gap-4 relative font-sans">
                  {/* Mockup Header */}
                  <div className="flex justify-between items-center pt-8 pb-2">
                    <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 shadow-sm border border-blue-100">
                      <AppIconSvg shadow={false} />
                    </div>
                    <div className="font-semibold text-slate-800">李女士的档案</div>
                    <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden" />
                  </div>
                  
                  {/* Mockup Chart Card */}
                  <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
                    <div className="text-sm text-slate-500 mb-1 font-medium">空腹血糖趋势</div>
                    <div className="text-2xl font-bold text-slate-800 mb-4">5.4 <span className="text-sm font-normal text-slate-400">mmol/L</span></div>
                    
                    {/* Simplified Line Chart SVG */}
                    <div className="h-24 w-full relative">
                      <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                        <path d="M0 30 Q 15 25, 30 35 T 60 20 T 100 15" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="0" cy="30" r="2" fill="#2563eb" />
                        <circle cx="30" cy="35" r="2" fill="#2563eb" />
                        <circle cx="60" cy="20" r="2" fill="#2563eb" />
                        <circle cx="100" cy="15" r="2" fill="#2563eb" />
                        
                        {/* Area gradient */}
                        <path d="M0 30 Q 15 25, 30 35 T 60 20 T 100 15 L100 40 L0 40 Z" fill="url(#blue-gradient)" opacity="0.1" />
                        
                        <defs>
                          <linearGradient id="blue-gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2563eb" />
                            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Mockup List */}
                  <div className="space-y-3 mt-2">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider pl-1">近期档案</div>
                    
                    <div className="bg-white p-3 rounded-2xl flex gap-3 items-center border border-slate-50 shadow-sm">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-slate-800">生化检查报告</div>
                        <div className="text-xs text-slate-400 mt-0.5">昨天 · 协和医院</div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-3 rounded-2xl flex gap-3 items-center border border-slate-50 shadow-sm">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-slate-800">复诊病历记录</div>
                        <div className="text-xs text-slate-400 mt-0.5">3月12日 · 人民医院</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Nav Mockup */}
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-800 rounded-[2rem] p-4 flex justify-around items-center text-slate-400 shadow-xl shadow-slate-900/10">
                     <div className="text-white bg-slate-700/50 p-2 rounded-full"><Activity className="w-5 h-5" /></div>
                     <div className="p-2"><FileText className="w-5 h-5" /></div>
                     <div className="p-2"><div className="w-5 h-5 rounded-full border-2 border-current" /></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating UI Elements */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -right-8 top-1/4 bg-white p-4 rounded-2xl shadow-xl shadow-blue-900/5 border border-slate-100 flex items-center gap-3 z-20"
            >
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-800">指标恢复正常</div>
                <div className="text-xs text-slate-400">持续追踪3个月</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />
    </section>
  );
}
