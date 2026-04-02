import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  Share2,
  MoreVertical,
  Activity,
  FileText,
  Calendar,
  MapPin,
  Pill,
  CheckCircle2,
  AlertCircle,
  Stethoscope,
  Sparkles,
  Search,
  ScanSearch,
  Clock,
  ChevronRight,
  TrendingUp,
  Download
} from "lucide-react";
import { motion as Motion } from "motion/react";
import { Archive, ARCHIVE_TYPE_LABELS } from "../types";
import { MOCK_ARCHIVES } from "../utils/mockData";

export default function ArchiveDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [archive, setArchive] = useState<Archive | null>(null);

  useEffect(() => {
    // Try localStorage first, fallback to mock data
    const archivesData = JSON.parse(localStorage.getItem("archives") || "[]");
    let found = archivesData.find((a: Archive) => a.id === id);
    if (!found) {
      found = MOCK_ARCHIVES.find((a) => a.id === id);
    }
    setArchive(found || null);
  }, [id]);

  if (!archive) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
          <Search size={32} />
        </div>
        <p className="text-slate-500 font-medium">未找到相关档案</p>
        <button onClick={() => navigate(-1)} className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full font-medium">返回上一页</button>
      </div>
    );
  }

  const renderLabReport = () => (
    <Motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between px-1 mb-2">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Activity className="text-blue-500" size={18} />
          检验项目分析
        </h3>
        <span className="text-xs text-slate-400">共 {archive.ocrData?.items?.length || 0} 项</span>
      </div>
      
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {archive.ocrData?.items?.map((item, index) => (
          <div 
            key={index}
            className={`p-4 flex items-center justify-between border-b border-slate-50 last:border-0 ${
              item.isAbnormal ? "bg-rose-50/50" : "hover:bg-slate-50 transition-colors"
            }`}
          >
            <div className="flex-1 min-w-0 pr-4">
              <div className="flex items-center gap-2 mb-1">
                <span className={`font-semibold ${item.isAbnormal ? "text-rose-700" : "text-slate-800"}`}>
                  {item.name}
                </span>
                {item.isAbnormal && (
                  <span className="flex items-center gap-1 text-[10px] bg-rose-100 text-rose-600 px-1.5 py-0.5 rounded-sm font-medium">
                    <TrendingUp size={10} /> 偏高
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <span>参考值: {item.referenceRange || "-"}</span>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`text-lg font-bold ${item.isAbnormal ? "text-rose-600" : "text-slate-900"}`}>
                {item.value}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">{item.unit || ""}</div>
            </div>
          </div>
        ))}
      </div>
      
      {archive.ocrData?.items?.some(i => i.isAbnormal) && (
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3">
          <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={18} />
          <div>
            <h4 className="text-sm font-bold text-amber-800 mb-1">AI 指标提醒</h4>
            <p className="text-xs text-amber-700/80 leading-relaxed">检测到部分指标异常，请结合医生建议进行复查或调整用药。注意保持良好作息。</p>
          </div>
        </div>
      )}
    </Motion.div>
  );

  const renderPrescription = () => (
    <Motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between px-1 mb-2">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Pill className="text-emerald-500" size={18} />
          处方用药清单
        </h3>
        <span className="text-xs text-slate-400">共 {archive.ocrData?.prescription?.length || 0} 种</span>
      </div>

      <div className="space-y-3">
        {archive.ocrData?.prescription?.map((med, index) => (
          <div key={index} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 hover:border-emerald-100 transition-colors group">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-bold text-slate-800 group-hover:text-emerald-600 transition-colors text-lg mb-1">
                  {med.name}
                </h4>
                <div className="flex items-center gap-2 text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md inline-flex">
                  <CheckCircle2 size={12} />
                  <span>AI已核对用量</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 bg-slate-50 rounded-2xl p-3">
              <div>
                <span className="block text-[10px] text-slate-400 mb-0.5">单次用量</span>
                <span className="text-sm font-semibold text-slate-700">{med.dosage || "-"}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 mb-0.5">频次</span>
                <span className="text-sm font-semibold text-slate-700">{med.frequency || "-"}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 mb-0.5">疗程</span>
                <span className="text-sm font-semibold text-slate-700">{med.duration || "-"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3 items-center">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
          <Clock className="text-blue-600" size={20} />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-blue-800 mb-0.5">智能用药提醒</h4>
          <p className="text-xs text-blue-600/80">已为您自动添加到日程表，按时服药更安心。</p>
        </div>
        <button className="bg-white text-blue-600 text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">
          查看
        </button>
      </div>
    </Motion.div>
  );

  const renderMedicalRecord = () => (
    <Motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between px-1 mb-2">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Stethoscope className="text-indigo-500" size={18} />
          门诊诊断与记录
        </h3>
      </div>
      
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 space-y-5">
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">诊断结果 (AI提取)</h4>
          <div className="bg-indigo-50 text-indigo-700 p-3 rounded-2xl text-sm font-semibold border border-indigo-100/50">
            {archive.ocrData?.diagnosis || "暂无明确诊断信息"}
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-50">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">主诉</h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-2xl">
              患者自述头晕、伴随轻微咳嗽持续三天，无发热现象。
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">医生建议</h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-2xl">
              注意休息，多喝水。如症状加重请及时复诊。遵医嘱服药。
            </p>
          </div>
        </div>
      </div>
    </Motion.div>
  );

  const renderImagingReport = () => (
    <Motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between px-1 mb-2">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <ScanSearch className="text-purple-500" size={18} />
          影像检查结果
        </h3>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="aspect-video bg-slate-900 relative overflow-hidden group">
           {/* Placeholder for X-Ray/CT Image */}
           <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center" />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
           <div className="absolute bottom-4 left-4 right-4 text-white">
             <div className="flex items-center gap-2 mb-1">
               <span className="bg-purple-500 px-2 py-0.5 rounded text-[10px] font-bold">AI 智能扫描</span>
             </div>
             <p className="text-sm font-medium">胸部CT平扫（低剂量）</p>
           </div>
        </div>

        <div className="p-5">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">影像所见与诊断</h4>
          <div className="bg-purple-50 text-purple-800 p-4 rounded-2xl text-sm leading-relaxed border border-purple-100">
            {archive.ocrData?.diagnosis || "双肺纹理清晰，未见明显实质性病变。心影大小形态如常。双侧胸腔未见积液。"}
          </div>
        </div>
      </div>
    </Motion.div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="px-4 py-3 flex items-center justify-between max-w-lg mx-auto">
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1 flex justify-center">
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase px-3 py-1 bg-slate-100 rounded-full">
              {ARCHIVE_TYPE_LABELS[archive.type] || "医疗档案"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-full text-slate-600 hover:bg-slate-100 transition-colors">
              <Share2 size={18} />
            </button>
            <button className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-full text-slate-600 hover:bg-slate-100 transition-colors">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-lg mx-auto w-full p-4 space-y-6">
        {/* Title Card */}
        <Motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100"
        >
          <h1 className="text-2xl font-bold text-slate-900 leading-tight mb-4">{archive.title}</h1>
          
          <div className="space-y-3">
            <div className="flex items-center text-sm text-slate-600">
              <MapPin size={16} className="text-slate-400 w-6 shrink-0" />
              <span>{archive.hospital} {archive.department && `· ${archive.department}`}</span>
            </div>
            <div className="flex items-center text-sm text-slate-600">
              <Calendar size={16} className="text-slate-400 w-6 shrink-0" />
              <span>就诊时间：{archive.date}</span>
            </div>
            {archive.ocrData?.doctorName && (
              <div className="flex items-center text-sm text-slate-600">
                <Stethoscope size={16} className="text-slate-400 w-6 shrink-0" />
                <span>主治医生：{archive.ocrData.doctorName}</span>
              </div>
            )}
          </div>

          {archive.tags && archive.tags.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-50 flex gap-2 flex-wrap">
              {archive.tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 bg-slate-50 text-slate-500 rounded-lg text-[10px] font-medium border border-slate-100">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </Motion.div>

        {/* OCR/AI Source Info Bar */}
        <Motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between bg-blue-600 text-white px-4 py-3 rounded-2xl shadow-md shadow-blue-200"
        >
          <div className="flex items-center gap-2">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-100"></span>
            </div>
            <span className="text-sm font-medium">数据由 AI 智能提取</span>
          </div>
          <button className="text-xs bg-white/20 hover:bg-white/30 transition-colors px-3 py-1 rounded-full flex items-center gap-1">
            <FileText size={12} />
            查看原件
          </button>
        </Motion.div>

        {/* Dynamic Content Based on Archive Type */}
        {archive.type === "lab_report" && renderLabReport()}
        {archive.type === "prescription" && renderPrescription()}
        {archive.type === "medical_record" && renderMedicalRecord()}
        {(archive.type === "imaging_report" || archive.type === "physical_exam") && renderImagingReport()}
      </main>
      
      {/* Floating Action Bar */}
      <div className="fixed bottom-6 left-0 right-0 px-6 z-40 pointer-events-none">
        <div className="max-w-lg mx-auto flex justify-end gap-3 pointer-events-auto">
          <button className="w-14 h-14 bg-white text-slate-700 rounded-full shadow-lg border border-slate-100 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform">
            <Download size={24} />
          </button>
          <button className="h-14 px-6 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-200 flex items-center gap-2 font-medium hover:scale-105 active:scale-95 transition-transform">
            <Stethoscope size={20} />
            问问AI助手
          </button>
        </div>
      </div>
    </div>
  );
}