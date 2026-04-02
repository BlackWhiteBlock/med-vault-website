import React from "react";
import { Search, ChevronRight, TrendingUp, Calendar, Clock, Activity, FileText } from "lucide-react";
import { motion } from "motion/react";
import { Link, useOutletContext } from "react-router";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

const MOCK_STATS = [
  { name: '03/01', value: 120 },
  { name: '03/05', value: 132 },
  { name: '03/10', value: 125 },
  { name: '03/12', value: 145 },
  { name: '03/14', value: 128 },
];

const RECENT_RECORDS = [
  { id: "1", title: "血常规检查", date: "2026-03-10", hospital: "北京协和医院", type: "化验单", status: "已识别" },
  { id: "4", title: "胸部CT检查", date: "2026-02-20", hospital: "北京协和医院", type: "检查单", status: "已识别" },
];

export function Dashboard() {
  const { currentMember } = useOutletContext<{ currentMember: any }>();

  return (
    <div className="p-4 space-y-6 max-w-lg mx-auto pb-8">
      {/* Welcome & Search */}
      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">你好, {currentMember.name.split(' ')[0]}</h2>
            <p className="text-slate-500 text-sm">今天有 2 条用药提醒，请注意查收。</p>
          </div>
          <div className="bg-blue-50 p-2 rounded-xl border border-blue-100 flex flex-col items-center">
             <span className="text-[10px] text-blue-600 font-bold">健康分</span>
             <span className="text-xl font-bold text-blue-700">88</span>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="搜索报告、医院或科室..." 
            className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm outline-hidden"
          />
        </div>
      </section>

      {/* Quick Stats Grid */}
      <section className="grid grid-cols-2 gap-4">
        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm min-w-0 h-40 flex flex-col"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-rose-50 rounded-xl text-rose-500">
              <Activity size={18} />
            </div>
            <span className="text-sm font-medium text-slate-500">血压</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-slate-900">128/85</span>
            <span className="text-[10px] text-slate-400">mmHg</span>
          </div>
          <div className="mt-auto h-12 w-full opacity-50 overflow-hidden">
             <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
               <AreaChart data={MOCK_STATS}>
                 <Area type="monotone" dataKey="value" stroke="#F43F5E" fill="#FECDD3" strokeWidth={2} />
               </AreaChart>
             </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm min-w-0 h-40 flex flex-col"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-emerald-50 rounded-xl text-emerald-500">
              <TrendingUp size={18} />
            </div>
            <span className="text-sm font-medium text-slate-500">血糖</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-slate-900">5.8</span>
            <span className="text-[10px] text-slate-400">mmol/L</span>
          </div>
          <div className="mt-auto h-12 w-full opacity-50 overflow-hidden">
             <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
               <AreaChart data={MOCK_STATS.map(s => ({...s, value: s.value / 20}))}>
                 <Area type="monotone" dataKey="value" stroke="#10B981" fill="#D1FAE5" strokeWidth={2} />
               </AreaChart>
             </ResponsiveContainer>
          </div>
        </motion.div>
      </section>

      {/* Main Stats Chart */}
      <section className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm min-w-0">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-800">健康指标趋势</h3>
          <select className="text-xs bg-slate-50 border-none rounded-lg px-2 py-1 outline-hidden text-slate-500">
            <option>最近7天</option>
            <option>最近30天</option>
          </select>
        </div>
        <div className="h-48 w-full overflow-hidden">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
            <LineChart data={MOCK_STATS}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 10, fill: '#94a3b8'}}
                dy={10}
              />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#2563EB" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#2563EB', strokeWidth: 2, stroke: '#fff' }} 
                activeDot={{ r: 6 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Recent Records */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800">最近归档</h3>
          <button className="text-sm text-blue-600 font-medium flex items-center">
            全部报告 <ChevronRight size={14} />
          </button>
        </div>
        <div className="space-y-3">
          {RECENT_RECORDS.map(record => (
            <Link 
              key={record.id}
              to={`/records/${record.id}`}
              className="block group bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4 hover:border-blue-100 hover:bg-slate-50 transition-all"
            >
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors shrink-0">
                <FileText size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-800 truncate text-sm">{record.title}</h4>
                <div className="flex items-center gap-3 mt-1 text-slate-400 text-[10px]">
                  <span className="flex items-center gap-1"><Calendar size={10} /> {record.date}</span>
                  <span className="flex items-center gap-1"><Clock size={10} /> {record.hospital}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  record.status === '已识别' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  {record.status}
                </span>
                <div className="text-[10px] text-slate-400 mt-1">{record.type}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Action Cards */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-4 rounded-3xl text-white shadow-lg shadow-indigo-100">
          <div className="bg-white/20 w-8 h-8 rounded-lg flex items-center justify-center mb-3">
             <Calendar size={18} />
          </div>
          <p className="text-xs opacity-80">下次复诊</p>
          <h4 className="font-bold mt-1">3月28日</h4>
          <p className="text-[10px] opacity-70 mt-0.5">内科 · 华西医院</p>
        </div>
        <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-4 rounded-3xl text-white shadow-lg shadow-orange-100">
          <div className="bg-white/20 w-8 h-8 rounded-lg flex items-center justify-center mb-3">
             <Clock size={18} />
          </div>
          <p className="text-xs opacity-80">待服药物</p>
          <h4 className="font-bold mt-1">阿司匹林</h4>
          <p className="text-[10px] opacity-70 mt-0.5">20:00 · 饭后服用</p>
        </div>
      </section>
    </div>
  );
}
