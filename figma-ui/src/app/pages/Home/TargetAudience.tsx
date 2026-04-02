import React from "react";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

export function TargetAudience() {
  const users = [
    "需要长期复诊用药的慢病患者",
    "异地工作、为父母代管病历的子女",
    "记录孩子成长、就诊、体检的育儿家庭",
    "经常跨院、跨省寻求优质医疗资源的就医人群",
    "重视数据资产、关注自身长期健康管理的职场人"
  ];

  return (
    <section className="py-24 bg-white border-t border-slate-100 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 lg:w-5/12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">适合谁使用</h2>
            <p className="text-lg text-slate-600 mb-8">
              无论是自己、孩子还是父母，医案通都能成为家庭健康信息的靠谱管家。
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="w-full md:w-1/2 lg:w-7/12"
          >
            <div className="grid gap-4">
              {users.map((user, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center gap-4 shadow-sm"
                >
                  <div className="text-blue-500 shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <span className="text-slate-800 font-medium text-lg">{user}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
