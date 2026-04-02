import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { 
  ChevronLeft, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Activity,
  Calendar,
  AlertCircle,
  Building,
  FileImage
} from "lucide-react";
import { motion as Motion } from "motion/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mock Data
const METRIC_DATA = [
  { date: "10-01", wbc: 6.5, rbc: 4.8, hospital: "市第一人民医院" },
  { date: "11-15", wbc: 7.2, rbc: 4.7, hospital: "仁济医院" },
  { date: "01-10", wbc: 8.9, rbc: 4.9, hospital: "市中心医院" },
  { date: "02-20", wbc: 11.5, rbc: 4.6, hospital: "市第一人民医院" },
  { date: "03-10", wbc: 9.8, rbc: 4.8, hospital: "省级三甲医院" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-[0_8px_30px_-5px_rgba(37,99,235,0.2)] border border-blue-100/50">
        <p className="text-[11px] font-bold text-slate-500 mb-2">{label}</p>
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-xl font-extrabold text-blue-600 leading-none">{payload[0].value}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-600 bg-slate-50 px-2 py-1 rounded-lg">
          <Building size={12} className="text-slate-400" />
          <span className="font-medium">{data.hospital}</span>
        </div>
      </div>
    );
  }
  return null;
};

const HISTORY_METRICS = [
  { id: "m1", name: "白细胞计数", abbr: "WBC", current: 9.8, unit: "10^9/L", min: 3.5, max: 9.5, status: "high" },
  { id: "m2", name: "红细胞计数", abbr: "RBC", current: 4.8, unit: "10^12/L", min: 4.3, max: 5.8, status: "normal" },
  { id: "m3", name: "血红蛋白", abbr: "HGB", current: 145, unit: "g/L", min: 130, max: 175, status: "normal" },
  { id: "m4", name: "血小板计数", abbr: "PLT", current: 210, unit: "10^9/L", min: 125, max: 350, status: "normal" },
  { id: "m5", name: "中性粒细胞比率", abbr: "NEUT%", current: 75.2, unit: "%", min: 40, max: 75, status: "high" },
];

export default function MetricHistoryPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [activeMetric, setActiveMetric] = useState(HISTORY_METRICS[0]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans pb-10">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-4 py-3 flex items-center gap-3">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-full text-slate-600 active:scale-95 transition-transform"
        >
          <ChevronLeft size={20} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-slate-800 leading-tight">血常规指标追溯</h1>
          <p className="text-xs text-slate-500">共收录 12 份历史报告</p>
        </div>
      </header>

      {/* Main Chart Area */}
      <div className="p-6">
        <div className="bg-white rounded-[28px] p-6 shadow-[0_12px_40px_-15px_rgba(37,99,235,0.15)] border border-blue-100">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-slate-800">{activeMetric.name}</h2>
                <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-md">{activeMetric.abbr}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className={cn(
                  "text-3xl font-extrabold tracking-tight",
                  activeMetric.status === "high" ? "text-red-500" : 
                  activeMetric.status === "low" ? "text-amber-500" : "text-slate-800"
                )}>
                  {activeMetric.current}
                </span>
                <span className="text-sm font-medium text-slate-400">{activeMetric.unit}</span>
              </div>
            </div>
            
            {activeMetric.status !== "normal" && (
              <div className="bg-red-50 px-3 py-2 mt-1 rounded-xl flex items-center gap-1.5 border border-red-100 h-fit">
                <AlertCircle size={14} className="text-red-500" />
                <span className="text-xs font-bold text-red-600">偏高</span>
              </div>
            )}
          </div>

          {/* Chart */}
          <div className="h-48 w-full -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={METRIC_DATA} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#94a3b8' }} 
                  dy={10}
                />
                <YAxis 
                  domain={['dataMin - 1', 'dataMax + 1']} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                  width={30}
                />
                <Tooltip 
                  content={<CustomTooltip />}
                  cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <ReferenceLine y={activeMetric.max} stroke="#fca5a5" strokeDasharray="3 3" />
                <ReferenceLine y={activeMetric.min} stroke="#fcd34d" strokeDasharray="3 3" />
                <Line 
                  type="monotone" 
                  dataKey="wbc" // Simplified for demo to always use wbc curve
                  stroke={activeMetric.status === "normal" ? "#3b82f6" : "#ef4444"} 
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
                  activeDot={{ r: 6, strokeWidth: 0, fill: activeMetric.status === "normal" ? "#2563eb" : "#dc2626" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
            <span className="text-xs text-slate-500">参考区间: {activeMetric.min} - {activeMetric.max}</span>
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-50 px-2 py-1 rounded-lg">
              <Calendar size={12} />
              <span>近 6 个月</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics List */}
      <div className="px-6 flex-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800 text-lg">全部检验指标</h3>
          <Link 
            to={`/records/history/${categoryId || 'blood'}/originals`}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl transition-colors active:scale-95 border border-blue-100/50 shadow-sm shadow-blue-500/10"
          >
            <FileImage size={14} />
            <span className="text-xs font-bold">查看原件</span>
          </Link>
        </div>
        <div className="space-y-3">
          {HISTORY_METRICS.map((metric, index) => (
            <Motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <button 
                onClick={() => setActiveMetric(metric)}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-2xl border transition-all text-left",
                  activeMetric.id === metric.id 
                    ? "bg-blue-50/50 border-blue-200 shadow-sm" 
                    : "bg-white border-slate-100 hover:border-blue-100 hover:bg-slate-50"
                )}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-slate-800">{metric.name}</span>
                    <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{metric.abbr}</span>
                  </div>
                  <span className="text-xs text-slate-500">参考: {metric.min}-{metric.max}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className={cn(
                      "font-bold text-lg leading-none flex items-center gap-1 justify-end",
                      metric.status === "high" ? "text-red-500" : 
                      metric.status === "low" ? "text-amber-500" : "text-slate-800"
                    )}>
                      {metric.current}
                      {metric.status === "high" && <TrendingUp size={14} strokeWidth={3} />}
                      {metric.status === "low" && <TrendingDown size={14} strokeWidth={3} />}
                      {metric.status === "normal" && <Minus size={14} className="text-slate-300" />}
                    </div>
                    <span className="text-[10px] text-slate-400">{metric.unit}</span>
                  </div>
                </div>
              </button>
            </Motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
