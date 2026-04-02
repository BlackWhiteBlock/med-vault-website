import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, Lock, EyeOff, FileKey, ShieldAlert } from "lucide-react";

export function Privacy() {
  const points = [
    { icon: <Lock />, text: "数据传输与存储端到端加密保护" },
    { icon: <FileKey />, text: "分享链接可灵活设置有效期与访问密码" },
    { icon: <EyeOff />, text: "用户可随时查看并管理所有数据授权记录" },
    { icon: <ShieldCheck />, text: "高敏感健康数据严格遵循最小化采集原则" },
    { icon: <ShieldAlert />, text: "AI 内容始终附带明确免责声明，绝不越界" }
  ];

  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden" id="privacy">
      {/* Background glow for Trust Blue */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] opacity-10 pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-900/50 border border-blue-800 text-blue-300 text-sm font-medium tracking-wide">
              <ShieldCheck className="w-4 h-4" />
              信任是医疗应用的基石
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              对医疗数据敏感性的<br/>
              <span className="text-blue-400">绝对尊重与保护</span>
            </h2>
            
            <p className="text-lg text-slate-400 leading-relaxed">
              医案通高度重视用户信任，我们将隐私安全放在一切功能之前，围绕以下核心方向持续建设，确保您的健康资产绝密安全。
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full max-w-lg lg:max-w-none"
          >
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 border border-slate-700 shadow-2xl">
              <ul className="space-y-6">
                {points.map((point, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-900/30 text-blue-400 flex items-center justify-center shrink-0 border border-blue-800/50 mt-1">
                      {React.cloneElement(point.icon as React.ReactElement, { className: "w-5 h-5" })}
                    </div>
                    <div className="text-slate-300 text-lg leading-relaxed pt-1.5 font-medium">
                      {point.text}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
