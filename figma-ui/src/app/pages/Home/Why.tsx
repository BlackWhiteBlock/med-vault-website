import React from "react";
import { motion } from "motion/react";
import { Search, FileQuestion, Clock, AlertCircle, Share2, ShieldAlert } from "lucide-react";

export function Why() {
  const painPoints = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "临时找不全",
      desc: "资料分散在不同App、相册或抽屉里，复诊时急需却找不到。"
    },
    {
      icon: <FileQuestion className="w-6 h-6" />,
      title: "容易丢难整理",
      desc: "纸质报告褪色遗失，电子资料命名杂乱，整理起来费时费力。"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "病史不连续",
      desc: "跨院转诊时，医生无法快速看到连贯的历史检查和用药记录。"
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "指标看不懂",
      desc: "复杂的专业术语和海量数字，不知道哪些异常需要重点关注。"
    },
    {
      icon: <ShieldAlert className="w-6 h-6" />,
      title: "分享效率低",
      desc: "拍照发微信看不清，打包发邮件太繁琐，且存在隐私泄露风险。"
    }
  ];

  return (
    <section className="py-24 bg-white" id="why">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
          >
            为什么需要医案通？
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 leading-relaxed"
          >
            在现实就医中，病历、报告、影像等资料往往分散在各大医院App、纸质单据和相册中。一旦遇到复诊、跨院或慢病管理，您可能经常面临以下痛点：
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-lg hover:shadow-slate-200/50 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-blue-500 group-hover:bg-blue-50 transition-colors mb-6">
                {point.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">{point.title}</h3>
              <p className="text-slate-500 leading-relaxed">{point.desc}</p>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: painPoints.length * 0.1 }}
            className="bg-blue-600 p-8 rounded-3xl text-white flex flex-col justify-center relative overflow-hidden"
          >
            <div className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 w-48 h-48 bg-blue-500 rounded-full blur-2xl opacity-50" />
            <h3 className="text-2xl font-bold mb-3 relative z-10">医案通<br/>为您解决痛点</h3>
            <p className="text-blue-100 relative z-10 font-medium">
              打造以患者为中心的个人医疗档案中枢，让健康资产重归您手中。
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
