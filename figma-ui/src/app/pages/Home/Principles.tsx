import React from "react";
import { motion } from "motion/react";
import { Heart, Lock, Database, ArrowRight } from "lucide-react";

export function Principles() {
  const principles = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "以患者为中心",
      desc: "医疗资料首先应该服务于用户自己，而不是机构或系统。"
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "先可信，后智能",
      desc: "隐私安全和结果可控优先于任何花哨的AI功能炫技。"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "先归集，后分析",
      desc: "只有全面且完整的档案基础，才能产生长期的健康数据价值。"
    },
    {
      icon: <ArrowRight className="w-6 h-6" />,
      title: "先场景，后扩展",
      desc: "优先解决复诊、转诊、家庭代管等真实且高频的核心痛点问题。"
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="principles">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
          >
            我们坚持的产品原则
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600"
          >
            克制而专注，是我们对待医疗和健康数据的基本态度。
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {principles.map((p, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-6"
            >
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-blue-600 mb-6 border border-slate-100 shadow-sm relative">
                <div className="absolute inset-0 border-2 border-transparent border-t-blue-100 rounded-full animate-spin-slow" />
                {p.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{p.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
