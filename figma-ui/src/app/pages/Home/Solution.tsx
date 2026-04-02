import React from "react";
import { motion } from "motion/react";
import { Database, FolderHeart, Users, Share2 } from "lucide-react";

export function Solution() {
  const steps = [
    { icon: <Database />, title: "统一归集", desc: "病历、检验、影像资料" },
    { icon: <FolderHeart />, title: "长期保存", desc: "结构化整理，终身积累" },
    { icon: <Share2 />, title: "随时调用", desc: "需时安全分享给医生家人" },
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              打造您的<br/>
              <span className="text-blue-600">个人医疗档案中枢</span>
            </h2>
            
            <p className="text-lg text-slate-600 leading-relaxed">
              医案通不是在线问诊平台，也不是医院官方系统。它是一款面向个人与家庭的<strong className="text-slate-800 font-semibold">健康资产管理平台</strong>。
            </p>
            
            <p className="text-slate-500 leading-relaxed">
              它让分散的病历、检验、影像、处方和体检资料统一归集，结构化整理，并在需要时安全分享。让医疗信息真正回到用户手中，成为长期可管理、可复用、可积累的健康资产。
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              {steps.map((step, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-500">
                    {step.icon}
                  </div>
                  <h4 className="font-semibold text-slate-800">{step.title}</h4>
                  <p className="text-sm text-slate-500">{step.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 w-full"
          >
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-blue-50 rounded-full mix-blend-multiply filter blur-2xl opacity-70" />
              <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-indigo-50 rounded-full mix-blend-multiply filter blur-2xl opacity-70" />
              
              <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-end border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">健康档案库</h3>
                    <p className="text-sm text-slate-500 mt-1">已累计 124 份资料</p>
                  </div>
                  <div className="bg-blue-600 text-white p-2 rounded-xl">
                    <Users className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-50 rounded-2xl p-4 flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-slate-700">化验单据</div>
                      <div className="text-xs text-slate-400 mt-1">45份 · 最近更新 昨天</div>
                    </div>
                    <div className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-xs font-medium">+ 上传</div>
                  </div>
                  
                  <div className="bg-slate-50 rounded-2xl p-4 flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-slate-700">医学影像</div>
                      <div className="text-xs text-slate-400 mt-1">12次 · 包含CT/核磁</div>
                    </div>
                    <div className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-xs font-medium">+ 导入</div>
                  </div>
                  
                  <div className="bg-slate-50 rounded-2xl p-4 flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-slate-700">门诊病历</div>
                      <div className="text-xs text-slate-400 mt-1">67份 · 跨院记录</div>
                    </div>
                    <div className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-xs font-medium">查看</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
