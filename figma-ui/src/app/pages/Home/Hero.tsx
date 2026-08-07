import React from "react";
import { motion } from "motion/react";
import { Button } from "../../components/ui/button";
import { ArrowRight, Sparkles, Activity, FileText } from "lucide-react";
import { useLaunchNotice } from "../../components/LaunchNoticeProvider";

export function Hero() {
  const { showLaunchNotice } = useLaunchNotice();
  return (
    <section className="relative pt-32 pb-28 overflow-hidden bg-gradient-to-b from-[#EEF4FF] via-slate-50 to-slate-50">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-1 space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8F0FE] text-[#2D6EF7] text-sm font-medium tracking-wide shadow-sm">
              <Sparkles className="w-4 h-4" />
              全新医案通，您的家庭健康管理中枢
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
              让每个人都拥有一份
              <br />
              <span className="text-[#2D6EF7]">完整的个人医疗档案</span>
            </h1>

            <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl font-light">
              归集病历、整理报告、追踪趋势、安全分享，帮助个人与家庭更高效地管理健康资料，让医疗信息真正为你所用。
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                type="button"
                size="lg"
                className="gap-2 group bg-[#2D6EF7] hover:bg-[#255ED9] shadow-xl shadow-[#2D6EF7]/25"
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
                <div className="w-8 h-8 rounded-full bg-[#E8F0FE] flex items-center justify-center text-[#2D6EF7]">
                  <Activity className="w-4 h-4" />
                </div>
                <span>指标追溯</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#E8F0FE] flex items-center justify-center text-[#2D6EF7]">
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
            className="flex-1 w-full max-w-md relative flex justify-center"
          >
            {/* Soft glow behind device — matches app blue */}
            <div className="absolute inset-x-8 top-10 bottom-6 rounded-[3rem] bg-[#2D6EF7]/15 blur-3xl -z-10" />

            {/* Phone frame — proportions tuned to real app screenshot */}
            <div className="relative border-[#1e293b] bg-[#1e293b] border-[12px] rounded-[2.25rem] h-[620px] w-[304px] shadow-2xl shadow-slate-900/20 overflow-hidden ring-1 ring-slate-200/80">
              <div className="h-[28px] w-[3px] bg-[#1e293b] absolute -left-[15px] top-[88px] rounded-l-lg" />
              <div className="h-[42px] w-[3px] bg-[#1e293b] absolute -left-[15px] top-[140px] rounded-l-lg" />
              <div className="h-[42px] w-[3px] bg-[#1e293b] absolute -left-[15px] top-[192px] rounded-l-lg" />
              <div className="h-[56px] w-[3px] bg-[#1e293b] absolute -right-[15px] top-[160px] rounded-r-lg" />

              <div className="rounded-[1.55rem] overflow-hidden w-full h-full bg-[#F5F7FB] relative">
                <img
                  src="/images/hero/app-home.png"
                  alt="医案通 App 首页"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  draggable={false}
                />
                {/* Soft fade so tall screenshot crops cleanly at frame bottom */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#F5F7FB]/90 to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-[#2D6EF7]/15 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl" />
    </section>
  );
}
