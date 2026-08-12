import React from "react";
import { motion } from "motion/react";
import { Button } from "../../components/ui/button";
import { useLaunchNotice } from "../../components/LaunchNoticeProvider";
import { ArrowRight, Handshake } from "lucide-react";

export function CTA() {
  const { showLaunchNotice, showPartnerNotice } = useLaunchNotice();
  return (
    <section id="cta" className="py-32 bg-slate-50 relative overflow-hidden text-center">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full max-h-[400px] bg-gradient-to-tr from-[#E8F0FE] to-sky-50 rounded-[4rem] blur-3xl opacity-70 -z-10" />
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
            让医疗资料真正变得<br/>
            <span className="text-[#2D6EF7]">
              可管理、可理解、可分享
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            医案通，让分散的医疗资料变成可长期使用的个人健康档案。
            保护每一次看病的记录，也是保护你和家人的健康未来。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              type="button"
              size="lg"
              className="h-14 px-10 text-lg gap-2 group bg-[#2D6EF7] hover:bg-[#255ED9] shadow-xl shadow-[#2D6EF7]/25"
              onClick={showLaunchNotice}
            >
              立即免费体验
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              type="button"
              size="lg"
              variant="outline"
              className="h-14 px-10 text-lg border-slate-200 text-slate-600 hover:text-slate-900 bg-white shadow-sm gap-2"
              onClick={showPartnerNotice}
            >
              <Handshake className="w-5 h-5" /> 合作咨询
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
