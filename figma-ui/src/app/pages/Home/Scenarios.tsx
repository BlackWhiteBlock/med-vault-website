import React from "react";
import { motion } from "motion/react";
import { Activity, ShieldCheck, TrendingUp, Users, FileSearch } from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

const scenarioIconClass: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600",
  indigo: "bg-indigo-50 text-indigo-600",
  emerald: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  rose: "bg-rose-50 text-rose-600",
};

export function Scenarios() {
  const scenarios = [
    {
      title: "慢病复诊",
      desc: "快速调取近半年检验结果和历史病历，帮助医生更快了解病情变化。",
      icon: <Activity className="w-5 h-5" />,
      color: "blue",
      img: "https://images.unsplash.com/photo-1758691462858-f1286e5daf40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjBwYXRpZW50JTIwZG9jdG9yJTIwY29uc3VsdGF0aW9ufGVufDF8fHx8MTc3NTEyNjgyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "跨院/跨省就医",
      desc: "提前整理完整病史资料包，减少现场翻找资料和重复检查。",
      icon: <FileSearch className="w-5 h-5" />,
      color: "indigo",
      img: "https://images.unsplash.com/photo-1758691462814-485c3672e447?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcmVzZWFyY2glMjBkb2N1bWVudCUyMHJldmlld3xlbnwxfHx8fDE3NzUxMjY4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "儿童成长档案",
      desc: "集中保存孩子的就诊、用药、体检等资料，便于长期留存和复用。",
      icon: <ShieldCheck className="w-5 h-5" />,
      color: "emerald",
      img: "https://images.unsplash.com/photo-1758691462126-2ee47c8bf9e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHBhdGllbnQlMjBwZWRpYXRyaWNpYW58ZW58MXx8fHwxNzc1MTI2ODI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "父母病历代管",
      desc: "帮助父母长期保留住院记录、处方和检验报告，提升家庭协同效率。",
      icon: <Users className="w-5 h-5" />,
      color: "amber",
      img: "https://images.unsplash.com/photo-1576089235406-0612d7bb033e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBjaGVja2luZyUyMG1lZGljYWwlMjByZWNvcmRzJTIwb24lMjB0YWJsZXR8ZW58MXx8fHwxNzc1MTI2ODI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "年度体检管理",
      desc: "对比历年体检结果，关注关键指标变化趋势，提早预警健康风险。",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "rose",
      img: null // For the last one, we might use a chart UI representation instead of photo
    }
  ];

  return (
    <section className="py-24 bg-slate-50" id="scenarios">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
            >
              典型使用场景
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-600 leading-relaxed"
            >
              无论是个人的健康追踪，还是全家的医疗档案管理，医案通都能在关键时刻发挥巨大作用。
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-[2.5rem] bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 flex flex-col group ${
                index === 0 || index === 3 ? "md:col-span-2 lg:col-span-2" : ""
              } ${index === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}
            >
              <div className="p-8 pb-0">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${scenarioIconClass[item.color] ?? "bg-slate-50 text-slate-600"}`}
                >
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-8 max-w-md">{item.desc}</p>
              </div>
              
              <div className="mt-auto overflow-hidden px-8 pb-8 flex-1">
                {item.img ? (
                   <div className="w-full h-48 md:h-56 rounded-2xl overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-700">
                     <ImageWithFallback 
                       src={item.img} 
                       alt={item.title} 
                       className="w-full h-full object-cover rounded-2xl"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                   </div>
                ) : (
                  <div className="w-full h-48 md:h-56 rounded-2xl bg-slate-50 border border-slate-100 p-6 flex items-end group-hover:scale-[1.02] transition-transform duration-700">
                    <div className="w-full h-32 flex items-end justify-between gap-2 opacity-80">
                      {[40, 60, 45, 80, 65, 90, 85].map((h, i) => (
                        <div key={i} className="w-full bg-blue-100 rounded-t-lg relative" style={{ height: `${h}%` }}>
                          <div className={`absolute bottom-0 w-full rounded-t-lg bg-blue-500 ${i === 6 ? 'bg-rose-500' : ''}`} style={{ height: '40%' }} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
