import React, { useState } from "react";
import { Link } from "react-router";
import { 
  FileText, 
  Search, 
  ChevronRight, 
  Filter, 
  Activity,
  ShieldCheck,
  Stethoscope,
  Pill,
  Sparkles,
  History,
  TrendingUp,
  Droplet,
  HeartPulse,
  Dna
} from "lucide-react";
import { motion as Motion, AnimatePresence } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Record = {
  id: string;
  title: string;
  date: string;
  category: string;
  hospital: string;
  summary: string;
  aiStatus: "analyzing" | "completed" | "pending";
  tags: string[];
};

const CATEGORIES = ["全部", "门诊病历", "化验报告", "处方记录", "影像检查"];

type HistoryCategory = {
  id: string;
  name: string;
  icon: any;
  count: number;
  lastUpdate: string;
  trend: "up" | "down" | "stable";
  color: string;
  bgColor: string;
};

const HISTORY_CATEGORIES: HistoryCategory[] = [
  { id: "h1", name: "血常规", icon: Droplet, count: 12, lastUpdate: "2026-03-10", trend: "up", color: "text-rose-500", bgColor: "bg-rose-50" },
  { id: "h2", name: "心电图", icon: HeartPulse, count: 5, lastUpdate: "2026-02-15", trend: "stable", color: "text-blue-500", bgColor: "bg-blue-50" },
  { id: "h3", name: "生化全项", icon: Activity, count: 8, lastUpdate: "2026-01-20", trend: "down", color: "text-amber-500", bgColor: "bg-amber-50" },
  { id: "h4", name: "肿瘤标志物", icon: Dna, count: 3, lastUpdate: "2025-11-05", trend: "stable", color: "text-purple-500", bgColor: "bg-purple-50" },
];

const MOCK_RECORDS: Record[] = [
  {
    id: "1",
    title: "血常规检查（带五分类）",
    date: "2026-03-10",
    category: "化验报告",
    hospital: "北京协和医院",
    summary: "白细胞计数偏高，可能存在轻微炎症，建议复查。红细胞压积正常。",
    aiStatus: "completed",
    tags: ["异常指标", "血常规"]
  },
  {
    id: "2",
    title: "内科心血管专家门诊",
    date: "2026-03-05",
    category: "门诊病历",
    hospital: "上海瑞金医院",
    summary: "血压偏高（145/92 mmHg），已开具降压药物，建议低盐饮食。",
    aiStatus: "completed",
    tags: ["高血压", "心内科"]
  },
  {
    id: "3",
    title: "胸部低剂量螺旋CT",
    date: "2026-02-20",
    category: "影像检查",
    hospital: "北京协和医院",
    summary: "双肺未见明显异常实质性病变，胸膜正常。",
    aiStatus: "completed",
    tags: ["放射科", "体检"]
  },
  {
    id: "4",
    title: "降压药及护胃药处方",
    date: "2026-02-15",
    category: "处方记录",
    hospital: "上海瑞金医院",
    summary: "苯磺酸氨氯地平片、奥美拉唑肠溶胶囊。",
    aiStatus: "pending",
    tags: ["长期用药"]
  }
];

export function Records() {
  const [viewMode, setViewMode] = useState<"regular" | "history">("regular");
  const [activeCategory, setActiveCategory] = useState("全部");
  const [isScanning, setIsScanning] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Auto-stop scanning animation for demo purposes
  React.useEffect(() => {
    const timer = setTimeout(() => setIsScanning(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const filteredRecords = MOCK_RECORDS.filter(r => {
    const matchesCategory = activeCategory === "全部" || r.category === activeCategory;
    const matchesSearch = !searchQuery || 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      r.hospital.toLowerCase().includes(searchQuery.toLowerCase()) || 
      r.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50 pt-2 pb-24 font-sans">
      
      {/* Header Section with Mode Switch */}
      <div className="px-6 mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[28px] font-bold text-slate-900 tracking-tight">健康档案</h2>
          
          {/* Highlighted View Mode Switcher - Icon Only */}
          <button 
            onClick={() => setViewMode(viewMode === "regular" ? "history" : "regular")}
            className="relative flex items-center justify-center w-10 h-10 bg-white border border-slate-100 shadow-[0_4px_15px_-5px_rgba(37,99,235,0.15)] rounded-2xl transition-all active:scale-95 group overflow-hidden"
            aria-label={viewMode === "regular" ? "切换到指标追溯" : "切换到常规列表"}
          >
            {/* Subtle blue pulse effect behind the icon */}
            <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors" />
            
            <AnimatePresence mode="wait" initial={false}>
              {viewMode === "regular" ? (
                <Motion.div
                  key="history"
                  initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <History size={20} className="text-blue-600 drop-shadow-[0_2px_4px_rgba(37,99,235,0.3)]" strokeWidth={2.5} />
                </Motion.div>
              ) : (
                <Motion.div
                  key="regular"
                  initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -45, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <FileText size={20} className="text-blue-600 drop-shadow-[0_2px_4px_rgba(37,99,235,0.3)]" strokeWidth={2.5} />
                </Motion.div>
              )}
            </AnimatePresence>
            
            {/* Indicator Dot */}
            <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.8)]" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-blue-500" />
          <p className="text-sm text-slate-500 font-medium">
            AI 已加密守护您的 <span className="text-blue-600 font-bold">{MOCK_RECORDS.length}</span> 份医疗记录
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-6 mb-8">
        <div className="relative group z-20">
          <div className="absolute inset-0 bg-blue-500/5 rounded-2xl blur-md group-focus-within:bg-blue-500/10 transition-colors pointer-events-none" />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors z-10" size={18} />
          <input 
            type="text" 
            placeholder="搜索病历、化验单、医院或病症..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="relative w-full bg-white border border-slate-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] rounded-2xl py-3.5 pl-11 pr-4 text-[13px] font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-200 transition-all z-10"
          />
        </div>
      </div>

      {/* Top AI Highlight Card - Scan lines and glow effect */}
      {viewMode === "regular" && !searchQuery && (
        <div className="px-6 mb-8 relative">
          <Motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-white rounded-[28px] p-6 shadow-[0_12px_40px_-15px_rgba(37,99,235,0.15)] border border-blue-100 overflow-hidden"
          >
          {/* Trust Blue Glow Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          {/* Scan Line Animation */}
          {isScanning && (
            <Motion.div
              animate={{ top: ["-10%", "110%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute left-0 w-full h-12 bg-gradient-to-b from-transparent via-blue-400/20 to-transparent border-b-2 border-blue-400/50 z-0 pointer-events-none"
            />
          )}

          <div className="relative z-10 flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full">
              <Sparkles size={14} className="text-blue-600" />
              <span className="text-xs font-bold text-blue-600 tracking-wide">AI 智能提取中</span>
            </div>
            <span className="text-xs font-semibold text-slate-400">刚刚上传</span>
          </div>

          <div className="relative z-10">
            <h3 className="text-lg font-bold text-slate-800 mb-1">瑞金医院内科检验单.jpg</h3>
            <p className="text-sm text-slate-500 mb-4 line-clamp-1">正在进行 OCR 深度识别与医学术语转换...</p>
            
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <Motion.div 
                initial={{ width: "0%" }}
                animate={{ width: isScanning ? "75%" : "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
              />
            </div>
          </div>
        </Motion.div>
      </div>
      )}

      {/* Filters / Categories - Horizontal Scroll (Only in Regular Mode) */}
      {viewMode === "regular" && (
        <div className="px-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-800 text-lg">档案分类</h3>
            <button className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm border border-slate-100 text-slate-500 active:scale-95 transition-transform">
              <Filter size={16} />
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 -mx-6 px-6">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "whitespace-nowrap px-5 py-2.5 rounded-2xl text-sm font-bold transition-all",
                  activeCategory === category 
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" 
                    : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-100"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="px-6 space-y-4">
        <AnimatePresence mode="popLayout">
          {viewMode === "regular" ? (
            filteredRecords.map((record, index) => {
              const Icon = record.category.includes("病历") ? Stethoscope : record.category.includes("处方") ? Pill : Activity;
              
              return (
                <Motion.div 
                  key={record.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Link 
                    to={`/records/${record.id}`} 
                    className="block bg-white p-5 rounded-[28px] border border-slate-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-10px_rgba(37,99,235,0.12)] hover:border-blue-100 transition-all group relative overflow-hidden"
                  >
                    {/* Subtle hover gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-50/0 group-hover:to-blue-50/50 transition-colors pointer-events-none" />

                    <div className="flex items-start justify-between relative z-10">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <Icon size={22} strokeWidth={2.5} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-[15px] group-hover:text-blue-700 transition-colors">
                            {record.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 font-medium">
                            <span>{record.date}</span>
                            <span className="w-1 h-1 bg-slate-300 rounded-full" />
                            <span className="truncate max-w-[120px]">{record.hospital}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3.5 bg-slate-50 rounded-2xl relative z-10 border border-slate-100/50 group-hover:bg-white transition-colors">
                      <p className="text-[13px] text-slate-600 leading-relaxed line-clamp-2">
                        <span className="font-bold text-slate-700">AI 摘要：</span>
                        {record.summary}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between relative z-10">
                      <div className="flex gap-1.5 flex-wrap">
                        {record.tags.map(tag => (
                          <span 
                            key={tag} 
                            className={cn(
                              "text-[10px] px-2 py-1 rounded-lg font-bold tracking-wide",
                              tag.includes("异常") 
                                ? "bg-red-50 text-red-500" 
                                : "bg-blue-50 text-blue-600"
                            )}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                        <ChevronRight size={16} strokeWidth={2.5} />
                      </div>
                    </div>
                  </Link>
                </Motion.div>
              );
            })
          ) : (
            /* History Trace Mode */
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-800 text-lg">指标追溯</h3>
                <p className="text-xs text-slate-500 font-medium">智能聚合历史数据</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {HISTORY_CATEGORIES.map((cat, index) => {
                  const CatIcon = cat.icon;
                  return (
                    <Motion.div
                      key={cat.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <Link 
                        to={`/records/history/${cat.id}`}
                        className="block bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all group relative overflow-hidden h-full flex flex-col justify-between min-h-[140px]"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110", cat.bgColor, cat.color)}>
                            <CatIcon size={20} strokeWidth={2.5} />
                          </div>
                          {cat.trend !== "stable" && (
                            <div className="bg-slate-50 p-1.5 rounded-full">
                              <TrendingUp size={14} className={cn(cat.trend === "up" ? "text-red-500" : "text-emerald-500", cat.trend === "down" && "rotate-180")} />
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <h4 className="font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">{cat.name}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-400">{cat.count} 份报告</span>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-2 truncate">最后更新: {cat.lastUpdate}</p>
                        </div>
                      </Link>
                    </Motion.div>
                  );
                })}
              </div>

              {/* Highlight specific metric card in history mode */}
              <Motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[28px] p-6 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                <div className="relative z-10 flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <TrendingUp size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold">近期指标异动</h4>
                    <p className="text-xs text-blue-100">AI 发现有 2 项指标偏离基线</p>
                  </div>
                </div>
                <div className="bg-black/10 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-2">
                    <span className="text-sm font-medium text-blue-50">白细胞计数 (WBC)</span>
                    <span className="text-sm font-bold text-white flex items-center gap-1">11.5 <TrendingUp size={12} className="text-red-300"/></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-blue-50">空腹血糖 (GLU)</span>
                    <span className="text-sm font-bold text-white flex items-center gap-1">6.2 <TrendingUp size={12} className="text-amber-300"/></span>
                  </div>
                </div>
              </Motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}