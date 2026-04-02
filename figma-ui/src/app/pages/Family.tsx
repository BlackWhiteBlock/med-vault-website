import React, { useState } from "react";
import { 
  Users, 
  Plus, 
  ChevronRight, 
  UserPlus, 
  QrCode, 
  ShieldCheck, 
  Heart, 
  Calendar,
  MoreVertical,
  Edit2
} from "lucide-react";
import { motion as Motion, AnimatePresence } from "motion/react";
import { useOutletContext } from "react-router";

type Member = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  age: string;
  lastVisit: string;
  condition?: string;
};

const MOCK_MEMBERS: Member[] = [
  { 
    id: "1", 
    name: "我 (张三)", 
    role: "本人", 
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    age: "35岁",
    lastVisit: "2026-03-12",
    condition: "高血压关注中"
  },
  { 
    id: "2", 
    name: "王小明", 
    role: "长子", 
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
    age: "8岁",
    lastVisit: "2026-02-28",
    condition: "季节性过敏"
  },
  { 
    id: "3", 
    name: "张大爷", 
    role: "父亲", 
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    age: "68岁",
    lastVisit: "2026-03-05",
    condition: "糖尿病复诊"
  },
];

export function Family() {
  const { currentMember } = useOutletContext<{ currentMember: Member }>();
  const [activeTab, setActiveTab] = useState<"list" | "shared">("list");

  return (
    <div className="p-4 space-y-6 max-w-lg mx-auto pb-24 h-full bg-slate-50">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">家庭档案库</h2>
        <button className="bg-blue-600 text-white p-2 rounded-xl shadow-lg shadow-blue-200 active:scale-90 transition-all">
          <Plus size={20} />
        </button>
      </div>

      {/* Stats Summary */}
      <section className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-around text-center">
        <div>
           <p className="text-2xl font-bold text-slate-900">{MOCK_MEMBERS.length}</p>
           <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">总成员</p>
        </div>
        <div className="w-px h-8 bg-slate-100" />
        <div>
           <p className="text-2xl font-bold text-slate-900">42</p>
           <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">总档案</p>
        </div>
        <div className="w-px h-8 bg-slate-100" />
        <div>
           <p className="text-2xl font-bold text-slate-900">3</p>
           <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">待识别</p>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-xl">
        <button 
          onClick={() => setActiveTab("list")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Users size={16} /> 成员列表
        </button>
        <button 
          onClick={() => setActiveTab("shared")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'shared' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <ShieldCheck size={16} /> 共享权限
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'list' ? (
          <Motion.div 
            key="list"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="space-y-4"
          >
            {MOCK_MEMBERS.map((m, i) => (
              <Motion.div 
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`bg-white p-4 rounded-3xl border transition-all flex items-center gap-4 group ${
                  currentMember.id === m.id ? 'border-blue-200 ring-4 ring-blue-50/50 shadow-sm' : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className="relative">
                  <img src={m.avatar} className="w-16 h-16 rounded-2xl object-cover" />
                  {currentMember.id === m.id && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 border-2 border-white rounded-full flex items-center justify-center text-white">
                      <Heart size={10} fill="currentColor" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-800 truncate">{m.name}</h4>
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">{m.role}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-slate-400 text-xs">
                    <span>{m.age}</span>
                    <span className="w-1 h-1 bg-slate-200 rounded-full" />
                    <span>最近就诊 {m.lastVisit}</span>
                  </div>
                  {m.condition && (
                    <div className="mt-2 text-[10px] text-blue-600 bg-blue-50/50 px-2 py-0.5 rounded-md inline-block">
                      健康提示：{m.condition}
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                   <button className="p-2 text-slate-300 hover:text-slate-500 transition-colors">
                     <Edit2 size={18} />
                   </button>
                   <button className="p-2 text-slate-300 hover:text-slate-500 transition-colors">
                     <ChevronRight size={18} />
                   </button>
                </div>
              </Motion.div>
            ))}

            <button className="w-full flex items-center justify-center gap-2 bg-slate-50 border-2 border-dashed border-slate-200 p-4 rounded-3xl text-slate-400 font-medium hover:bg-slate-100 hover:border-slate-300 transition-all group">
               <UserPlus size={20} className="group-hover:scale-110 transition-transform" />
               添加新成员或扫码绑定
            </button>
          </Motion.div>
        ) : (
          <Motion.div 
            key="shared"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="space-y-6"
          >
             <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-3xl text-white shadow-xl shadow-blue-200">
               <div className="flex items-center justify-between mb-4">
                  <div className="bg-white/20 p-2 rounded-xl">
                    <QrCode size={24} />
                  </div>
                  <button className="text-xs bg-white/20 px-3 py-1 rounded-full font-bold">更新二维码</button>
               </div>
               <h3 className="text-xl font-bold">家庭共享码</h3>
               <p className="text-sm opacity-80 mt-1 leading-relaxed">
                 对方扫码并输入您的共享密码后，即可共同管理或查看所有成员档案。
               </p>
               <div className="mt-6 flex items-center gap-3 bg-white/10 p-4 rounded-2xl border border-white/20">
                  <ShieldCheck size={20} className="text-blue-200" />
                  <div className="flex-1">
                    <p className="text-[10px] opacity-70 uppercase font-bold tracking-widest">共享密码</p>
                    <p className="text-lg font-mono font-bold tracking-widest">**** 8291</p>
                  </div>
                  <button className="text-xs font-bold bg-white text-blue-600 px-3 py-1.5 rounded-lg active:scale-95 transition-all">复制</button>
               </div>
             </div>

             <div className="space-y-3">
               <h4 className="font-bold text-slate-800 text-sm px-1">当前共享中的用户</h4>
               {[
                 { id: 'doc-1', name: "李医生 (主治)", role: "受邀查看者", status: "有效期至 2026-06" },
                 { id: 'spouse-1', name: "陈芳 (配偶)", role: "管理员", status: "永久有效" }
               ].map((user) => (
                 <div key={user.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                      <Users size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-800 text-sm">{user.name}</p>
                      <p className="text-[10px] text-slate-400">{user.role} • {user.status}</p>
                    </div>
                    <button className="text-slate-300 hover:text-red-500 transition-colors">
                      <MoreVertical size={16} />
                    </button>
                 </div>
               ))}
             </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
