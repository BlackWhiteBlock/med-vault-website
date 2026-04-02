import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Camera, Image as ImageIcon, FileText, CheckCircle2, Loader2, Sparkles, UploadCloud, ChevronRight, Stethoscope } from "lucide-react";
import { motion as Motion } from "motion/react";
import { ArchiveType, ARCHIVE_TYPE_LABELS } from "../types";

export default function UploadPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"select" | "uploading" | "ocr" | "confirm">("select");
  const [selectedType, setSelectedType] = useState<ArchiveType | "">("");

  const handleFileSelect = (type: string) => {
    setStep("uploading");
    
    // Simulate upload
    setTimeout(() => {
      setStep("ocr");
      
      // Simulate OCR processing
      setTimeout(() => {
        setStep("confirm");
      }, 2500);
    }, 1500);
  };

  const handleConfirm = () => {
    const archives = JSON.parse(localStorage.getItem("archives") || "[]");
    const newArchive = {
      id: Date.now().toString(),
      memberId: localStorage.getItem("currentMemberId") || "1",
      type: selectedType || "other",
      title: "智能识别档案 - 门诊病历",
      hospital: "北京协和医院",
      department: "内分泌科",
      date: new Date().toISOString().split("T")[0],
      uploadDate: new Date().toISOString().split("T")[0],
      tags: ["复诊", "高血糖"],
      isFavorite: false,
      isDeleted: false,
      ocrData: {
        summary: "患者诉多饮、多尿、多食伴体重下降3月余。空腹血糖 9.8 mmol/L。",
        items: [
          { name: "空腹血糖", value: "9.8", unit: "mmol/L", referenceRange: "3.9-6.1", isAbnormal: true }
        ]
      }
    };
    
    archives.push(newArchive);
    localStorage.setItem("archives", JSON.stringify(archives));
    
    navigate("/records");
  };

  if (step === "uploading" || step === "ocr") {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-[100px] opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100 rounded-full blur-[100px] opacity-60"></div>

        <Motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center relative z-10 w-full max-w-sm"
        >
          <div className="relative w-32 h-32 mx-auto mb-8">
            <Motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute inset-0 border-2 border-dashed border-blue-200 rounded-full"
            />
            <div className="absolute inset-2 bg-white rounded-full shadow-lg shadow-blue-500/20 flex items-center justify-center overflow-hidden">
              {step === "uploading" ? (
                <UploadCloud className="w-10 h-10 text-blue-500" />
              ) : (
                <div className="relative">
                  <Sparkles className="w-10 h-10 text-blue-500" />
                  {/* AI Scan Line */}
                  <Motion.div 
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent blur-[1px] -translate-y-1/2 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                  />
                </div>
              )}
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">
            {step === "uploading" ? "正在加密上传..." : "AI 智能解析中..."}
          </h3>
          <p className="text-sm text-slate-500 font-medium">
            {step === "uploading" ? "确保您的数据安全传输" : "正在提取关键医疗信息与指标"}
          </p>

          <div className="mt-8 bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-slate-100">
             <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
               <Motion.div 
                 initial={{ width: step === "uploading" ? "0%" : "50%" }}
                 animate={{ width: step === "uploading" ? "50%" : "100%" }}
                 transition={{ duration: step === "uploading" ? 1.5 : 2.5, ease: "easeInOut" }}
                 className="h-full bg-blue-500"
               />
             </div>
          </div>
        </Motion.div>
      </div>
    );
  }

  if (step === "confirm") {
    return (
      <div className="min-h-screen bg-slate-50 pb-24 relative">
        <div className="absolute top-0 w-full h-64 bg-gradient-to-b from-blue-600 to-slate-50 -z-10" />
        
        <div className="px-5 pt-12 pb-6 text-center text-white">
          <Motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-900/20"
          >
            <CheckCircle2 className="w-8 h-8 text-blue-600" />
          </Motion.div>
          <h2 className="text-2xl font-bold mb-2">解析成功</h2>
          <p className="text-blue-100 text-sm font-medium">AI 已为您提取并结构化档案信息</p>
        </div>

        <div className="px-5">
          <Motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100"
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                <span className="text-slate-500 text-sm font-bold">档案类型</span>
                <span className="text-slate-900 font-bold bg-slate-50 px-3 py-1 rounded-lg text-sm">门诊病历</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                <span className="text-slate-500 text-sm font-bold">就诊医院</span>
                <span className="text-slate-900 font-bold">北京协和医院</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                <span className="text-slate-500 text-sm font-bold">就诊科室</span>
                <span className="text-slate-900 font-bold">内分泌科</span>
              </div>
              <div className="flex items-center justify-between pb-2">
                <span className="text-slate-500 text-sm font-bold">就诊日期</span>
                <span className="text-slate-900 font-bold">今天</span>
              </div>

              <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100/50 mt-4">
                 <div className="flex items-center gap-2 mb-2">
                   <Sparkles className="text-blue-500 w-4 h-4" />
                   <span className="text-xs font-bold text-blue-700">AI 提取指标</span>
                 </div>
                 <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-50 flex justify-between items-center">
                    <div>
                      <span className="text-sm font-bold text-slate-800">空腹血糖</span>
                      <p className="text-[10px] text-slate-400 mt-0.5">参考值: 3.9-6.1</p>
                    </div>
                    <div className="text-right">
                      <span className="text-rose-600 font-bold text-lg">9.8</span>
                      <span className="text-[10px] text-slate-400 ml-1">mmol/L</span>
                    </div>
                 </div>
              </div>

              <button
                onClick={handleConfirm}
                className="w-full bg-blue-600 text-white rounded-2xl py-4 font-bold text-lg shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-colors active:scale-95 mt-6"
              >
                保存档案
              </button>
              <button
                onClick={() => setStep("select")}
                className="w-full bg-slate-50 text-slate-600 rounded-2xl py-4 font-bold border border-slate-200 hover:bg-slate-100 transition-colors mt-3"
              >
                重新上传
              </button>
            </div>
          </Motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="bg-white px-5 pt-8 pb-6 border-b border-slate-100 sticky top-0 z-10">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">添加档案</h2>
        <p className="text-sm text-slate-500 font-medium mt-1">支持拍照或本地上传，AI 自动解析内容</p>
      </div>

      <div className="p-5 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleFileSelect("camera")}
            className="bg-white rounded-3xl p-6 flex flex-col items-center justify-center gap-3 shadow-sm border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all group"
          >
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
              <Camera className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <span className="font-bold text-slate-700 group-hover:text-blue-600">拍照扫描</span>
          </Motion.button>

          <Motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleFileSelect("album")}
            className="bg-white rounded-3xl p-6 flex flex-col items-center justify-center gap-3 shadow-sm border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all group"
          >
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
              <ImageIcon className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" />
            </div>
            <span className="font-bold text-slate-700 group-hover:text-indigo-600">相册导入</span>
          </Motion.button>
        </div>

        {/* WeChat Import Banner */}
        <Motion.button 
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-3xl p-5 flex items-center justify-between text-white shadow-lg shadow-emerald-500/20 relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-lg leading-tight">微信文件导入</h3>
              <p className="text-emerald-50 text-xs font-medium mt-0.5">支持 PDF / Word / Excel</p>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 text-white/70 relative z-10" />
        </Motion.button>

        {/* Archive Type Selection */}
        <div>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 px-1">
            或选择特定类型上传
          </h3>
          <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
            {[
              { id: "record", label: "门诊病历", icon: Stethoscope, color: "text-blue-500", bg: "bg-blue-50" },
              { id: "lab", label: "检验报告", icon: FileText, color: "text-indigo-500", bg: "bg-indigo-50" },
              { id: "prescription", label: "处方签", icon: FileText, color: "text-emerald-500", bg: "bg-emerald-50" },
              { id: "image", label: "影像报告", icon: ImageIcon, color: "text-purple-500", bg: "bg-purple-50" },
              { id: "other", label: "其他资料", icon: FileText, color: "text-slate-500", bg: "bg-slate-50" },
            ].map((type, idx, arr) => (
              <button
                key={type.id}
                onClick={() => {
                  setSelectedType(type.id as ArchiveType);
                  handleFileSelect("file");
                }}
                className={`w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors active:bg-slate-100 ${
                  idx !== arr.length - 1 ? "border-b border-slate-50" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${type.bg}`}>
                    <type.icon className={`w-5 h-5 ${type.color}`} />
                  </div>
                  <span className="font-bold text-slate-700">{type.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}