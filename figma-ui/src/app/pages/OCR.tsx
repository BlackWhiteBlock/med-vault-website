import React, { useState, useRef, useEffect } from "react";
import { 
  ScanText, 
  Sparkles,
  Image as ImageIcon, 
  Upload, 
  X, 
  CheckCircle2, 
  FileText, 
  AlertCircle,
  RefreshCw,
  Scan,
  Maximize2
} from "lucide-react";
import { motion as Motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function OCR() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setIsScanning(false);
      setScanResult(null);
    }
  };

  const startScan = () => {
    if (!file) return;
    setIsScanning(true);
    setProgress(0);
    
    // Simulate scan progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        title: "心脏彩超检查报告 (识别建议)",
        date: "2026-03-14",
        hospital: "识别中...",
        doctor: "张医生 (签名识别)",
        data: [
          { label: "检查项目", value: "超声心动图" },
          { label: "左室射血分数 (LVEF)", value: "62%", normal: true },
          { label: "二尖瓣返流", value: "轻度", normal: false },
          { label: "心包积液", value: "无", normal: true },
        ],
        summary: "心功能整体正常，二尖瓣有轻微返流，建议定期复查。"
      });
      toast.success("识别成功！已自动提取关键数据。");
    }, 3000);
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setIsScanning(false);
    setScanResult(null);
    setProgress(0);
  };

  return (
    <div className="p-4 space-y-6 max-w-lg mx-auto pb-24 h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">OCR 智能识别</h2>
        {preview && !isScanning && (
          <button onClick={reset} className="text-slate-400 hover:text-slate-600 transition-colors">
            <RefreshCw size={18} />
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!preview ? (
          <Motion.div 
            key="upload"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-4"
          >
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="group aspect-[4/3] bg-white border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 text-blue-100 opacity-20 group-hover:opacity-40 transition-opacity">
                 <Sparkles size={64} />
              </div>
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform relative">
                 <ScanText size={32} />
                 <Motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 -right-1"
                 >
                    <Sparkles size={14} className="text-blue-600 fill-blue-600" />
                 </Motion.div>
              </div>
              <div className="text-center z-10">
                <p className="font-semibold text-slate-800">AI 智能分析识别</p>
                <p className="text-xs text-slate-400 mt-1">拍摄或上传，AI 自动结构化数据</p>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <button 
                 onClick={() => fileInputRef.current?.click()}
                 className="flex items-center justify-center gap-2 bg-slate-100 p-4 rounded-2xl text-slate-600 font-medium active:scale-95 transition-all"
               >
                 <ImageIcon size={18} /> 从相册选择
               </button>
               <button 
                 onClick={() => fileInputRef.current?.click()}
                 className="flex items-center justify-center gap-2 bg-slate-100 p-4 rounded-2xl text-slate-600 font-medium active:scale-95 transition-all"
               >
                 <Upload size={18} /> 上传 PDF
               </button>
            </div>
          </Motion.div>
        ) : (
          <Motion.div 
            key="preview"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Preview Card */}
            <div className="relative aspect-[4/3] bg-slate-200 rounded-3xl overflow-hidden shadow-inner ring-1 ring-slate-100">
              <img src={preview} className="w-full h-full object-cover" alt="Preview" />
              {isScanning && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex flex-col items-center justify-center text-white">
                  <Motion.div 
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-0.5 bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.8)] z-10"
                  />
                  <div className="flex flex-col items-center gap-3">
                    <Scan className="animate-pulse" size={48} />
                    <div className="text-center">
                      <p className="font-bold text-lg">正在智能识别中...</p>
                      <p className="text-sm opacity-80">{progress}%</p>
                    </div>
                  </div>
                </div>
              )}
              {!isScanning && !scanResult && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startScan}
                    className="group bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-xl shadow-blue-500/30 transition-all flex items-center gap-2 overflow-hidden relative"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      开启 AI 智能分析 <Sparkles size={18} />
                    </span>
                    <Motion.div 
                      className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"
                      animate={{ x: ['100%', '-100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </Motion.button>
                </div>
              )}
            </div>

            {/* Scan Results */}
            <AnimatePresence>
              {scanResult && (
                <Motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lg text-slate-900">{scanResult.title}</h3>
                      <button className="text-slate-400"><Maximize2 size={16} /></button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-y-3 border-y border-slate-50 py-4">
                      {scanResult.data.map((item: any) => (
                        <div key={item.label}>
                          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{item.label}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="font-semibold text-slate-800">{item.value}</span>
                            {item.normal === true && <CheckCircle2 size={14} className="text-emerald-500" />}
                            {item.normal === false && <AlertCircle size={14} className="text-amber-500" />}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                       <p className="text-xs font-bold text-slate-400">AI 智能总结</p>
                       <p className="text-sm text-slate-600 leading-relaxed bg-blue-50/50 p-3 rounded-2xl border border-blue-100/50 italic">
                         “{scanResult.summary}”
                       </p>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button className="flex-1 bg-slate-100 text-slate-600 font-bold py-3 rounded-2xl active:scale-95 transition-all">
                        存入草稿
                      </button>
                      <button className="flex-[2] bg-blue-600 text-white font-bold py-3 rounded-2xl shadow-lg shadow-blue-200 active:scale-95 transition-all">
                        确认归档
                      </button>
                    </div>
                  </div>
                </Motion.div>
              )}
            </AnimatePresence>
          </Motion.div>
        )}
      </AnimatePresence>

      {!preview && (
        <section className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4">
           <h3 className="font-bold text-slate-800 flex items-center gap-2">
             <FileText size={18} className="text-blue-500" />
             识别贴士
           </h3>
           <ul className="space-y-3">
             {[
               "光线充足，拍摄清晰不反光",
               "尽量放平纸张，避免折痕",
               "完整拍摄边缘，包含医院公章"
             ].map((tip, i) => (
               <li key={i} className="flex items-center gap-2 text-sm text-slate-500">
                 <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                 {tip}
               </li>
             ))}
           </ul>
        </section>
      )}
    </div>
  );
}
