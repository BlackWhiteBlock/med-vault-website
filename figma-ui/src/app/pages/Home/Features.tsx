import React from "react";
import { motion } from "motion/react";
import { PlusCircle, Search, Users, ShieldCheck, Sparkles, Layers } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: <PlusCircle className="w-6 h-6" />,
      title: "一站式归集",
      desc: "支持拍照上传、相册导入、文件导入等方式，将病历、检验、影像、处方、体检等资料集中管理。"
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: "结构化整理",
      desc: "通过智能识别和字段提取，让医疗资料不只是“存下来”，而是“真正能用起来”。"
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "快速搜索与查看",
      desc: "支持按时间、类型、医院、关键词等维度查找资料，在需要时快速定位关键档案。"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "家庭成员管理",
      desc: "支持管理本人、父母、孩子等家庭成员的医疗档案，满足代管、陪诊和长期健康管理需求。"
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "安全分享",
      desc: "支持生成受控分享链接，可结合有效期、访问密码和授权管理机制，让资料分享更安心。"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI 辅助理解",
      desc: "通过趋势展示、异常提示和摘要参考，帮助用户更容易理解复杂医疗信息。所有 AI 结果仅作辅助参考，不替代医生诊断。"
    }
  ];

  return (
    <section className="py-24 bg-white" id="features">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          >
            强大的核心功能
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600"
          >
            让医疗资料真正变得可管理、可理解、可分享。
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-[2rem] border border-slate-100 hover:border-blue-100 hover:bg-blue-50/50 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-md transition-all duration-300 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm md:text-base">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
