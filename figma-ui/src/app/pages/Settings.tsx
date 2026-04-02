import React, { useState, useEffect } from "react";
import { 
  User, 
  Bell, 
  Shield, 
  Database, 
  Share2, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  Moon, 
  Globe, 
  CreditCard,
  Smartphone,
  Users,
  ArrowLeft,
  Plus,
  Trash2,
  CheckCircle2,
  HeartPulse
} from "lucide-react";
import { motion as Motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Member } from "../types";

export function Settings() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeView, setActiveView] = useState<"main" | "members">("main");
  const [members, setMembers] = useState<Member[]>([]);
  const [currentMemberId, setCurrentMemberId] = useState("1");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", relation: "" });

  useEffect(() => {
    if (activeView === "members") {
      const membersData = JSON.parse(localStorage.getItem("members") || "[]");
      setMembers(membersData.length > 0 ? membersData : [{ id: "1", name: "张三", relation: "本人" }]);
      setCurrentMemberId(localStorage.getItem("currentMemberId") || "1");
    }
  }, [activeView]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    toast.info("已安全退出登录");
    navigate("/login");
  };

  const sections = [
    {
      title: "个人中心",
      items: [
        { icon: User, label: "基本信息", value: "张三", onClick: () => {} },
        { icon: Smartphone, label: "绑定手机", value: "138 **** 9012", onClick: () => {} },
        { icon: CreditCard, label: "我的订阅", value: "专业版 (永久)", onClick: () => {} },
      ]
    },
    {
      title: "家庭管理",
      items: [
        { icon: Users, label: "成员管理", value: "多人档案", onClick: () => setActiveView("members") },
      ]
    },
    {
      title: "应用设置",
      items: [
        { icon: Bell, label: "消息与提醒", value: "已开启", onClick: () => {} },
        { icon: Shield, label: "隐私与安全", value: "", onClick: () => {} },
        { icon: Database, label: "数据存储管理", value: "已使用 240MB", onClick: () => {} },
        { icon: Share2, label: "分享保护设置", value: "密码+有效期", onClick: () => {} },
      ]
    },
    {
      title: "通用",
      items: [
        { icon: Moon, label: "深色模式", value: isDarkMode ? "已开启" : "已关闭", toggle: true },
        { icon: Globe, label: "语言选择", value: "简体中文", onClick: () => {} },
        { icon: HelpCircle, label: "帮助与反馈", value: "", onClick: () => {} },
      ]
    }
  ];

  const handleAddMember = () => {
    if (!newMember.name || !newMember.relation) {
      toast.error("请填写完整信息");
      return;
    }
    const member: Member = {
      id: Date.now().toString(),
      name: newMember.name,
      relation: newMember.relation,
      gender: "",
      birthday: "",
      bloodType: "",
      allergies: ""
    };
    const updated = [...members, member];
    localStorage.setItem("members", JSON.stringify(updated));
    setMembers(updated);
    setShowAddForm(false);
    setNewMember({ name: "", relation: "" });
    toast.success("成员添加成功");
  };

  const handleDeleteMember = (id: string) => {
    if (id === "1") {
      toast.error("不能删除本人");
      return;
    }
    const updated = members.filter((m) => m.id !== id);
    localStorage.setItem("members", JSON.stringify(updated));
    setMembers(updated);
    
    if (currentMemberId === id) {
      localStorage.setItem("currentMemberId", "1");
      setCurrentMemberId("1");
    }
    toast.success("成员已删除");
  };

  const handleSwitchMember = (id: string) => {
    localStorage.setItem("currentMemberId", id);
    setCurrentMemberId(id);
    toast.success("已切换当前成员");
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-[80px] opacity-40 -z-10"></div>
      
      <AnimatePresence mode="wait">
        {activeView === "main" && (
          <Motion.div 
            key="main"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-5 space-y-6 max-w-lg mx-auto"
          >
            <div className="pt-4 pb-2">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">设置与更多</h2>
            </div>

            {/* User Card */}
            <section className="bg-gradient-to-br from-blue-600 to-indigo-600 p-6 rounded-[2rem] shadow-xl shadow-blue-600/20 flex items-center gap-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
                <HeartPulse size={120} />
              </div>
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" 
                className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white/20 shadow-lg"
              />
              <div className="flex-1 relative z-10">
                <h3 className="font-bold text-lg text-white leading-tight">张三</h3>
                <p className="text-xs text-blue-100 mt-1">ID: 82910472</p>
                <div className="mt-2 flex gap-2">
                    <span className="text-[10px] bg-white/20 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full font-bold">PRO 会员</span>
                    <span className="text-[10px] bg-emerald-400/20 backdrop-blur-md text-emerald-100 px-2.5 py-0.5 rounded-full font-bold">已认证</span>
                </div>
              </div>
              <ChevronRight size={20} className="text-white/50 relative z-10" />
            </section>

            {/* Sections */}
            <div className="space-y-6">
              {sections.map((section, sIdx) => (
                <div key={section.title} className="space-y-3">
                  <h4 className="text-[11px] font-bold tracking-widest text-slate-400 px-2">{section.title}</h4>
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    {section.items.map((item, iIdx) => (
                      <div 
                        key={item.label}
                        className={`flex items-center justify-between p-4 active:bg-slate-50 transition-colors ${
                          iIdx !== section.items.length - 1 ? 'border-b border-slate-50' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500">
                            <item.icon size={18} />
                          </div>
                          <span className="text-sm font-bold text-slate-700">{item.label}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {item.toggle ? (
                            <button 
                              onClick={() => setIsDarkMode(!isDarkMode)}
                              className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${isDarkMode ? 'bg-blue-600' : 'bg-slate-200'}`}
                            >
                              <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${isDarkMode ? 'translate-x-5' : 'translate-x-0'}`} />
                            </button>
                          ) : (
                            <button onClick={item.onClick} className="flex items-center gap-2">
                              <span className="text-xs font-medium text-slate-400">{item.value}</span>
                              <ChevronRight size={16} className="text-slate-300" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-white border border-rose-100 p-4 rounded-3xl text-rose-500 font-bold hover:bg-rose-50 transition-colors mt-4 mb-8 shadow-sm active:scale-95"
            >
              <LogOut size={20} /> 退出当前账号
            </button>

            <div className="text-center space-y-1 pb-8">
              <p className="text-[10px] text-slate-400 font-bold">医案通 V2.0.4</p>
              <p className="text-[10px] text-slate-300">Intelligent Health Archive</p>
            </div>
          </Motion.div>
        )}

        {activeView === "members" && (
          <Motion.div 
            key="members"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="p-5 max-w-lg mx-auto h-full"
          >
            <div className="flex items-center justify-between mb-6 pt-4">
              <button 
                onClick={() => setActiveView("main")} 
                className="w-10 h-10 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-sm hover:bg-slate-50 transition-colors"
              >
                <ArrowLeft size={20} className="text-slate-700" />
              </button>
              <h2 className="text-xl font-bold text-slate-900">家庭成员管理</h2>
              <button 
                onClick={() => setShowAddForm(!showAddForm)} 
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-md shadow-blue-500/20 text-white active:scale-95 transition-all"
              >
                <Plus size={20} />
              </button>
            </div>

            <AnimatePresence>
              {showAddForm && (
                <Motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mb-6"
                >
                  <div className="bg-white p-5 rounded-3xl border border-blue-100 shadow-lg shadow-blue-500/5 space-y-4">
                    <h3 className="font-bold text-slate-800">添加新成员</h3>
                    <div>
                      <label className="text-xs font-bold text-slate-500 mb-1.5 block">姓名</label>
                      <input 
                        type="text" 
                        value={newMember.name}
                        onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        placeholder="输入成员姓名"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 mb-1.5 block">与本人关系</label>
                      <input 
                        type="text" 
                        value={newMember.relation}
                        onChange={(e) => setNewMember({...newMember, relation: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        placeholder="例如：父亲、配偶、子女"
                      />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button 
                        onClick={() => setShowAddForm(false)}
                        className="flex-1 py-3 bg-slate-50 text-slate-600 rounded-xl font-bold hover:bg-slate-100 transition-colors"
                      >
                        取消
                      </button>
                      <button 
                        onClick={handleAddMember}
                        className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
                      >
                        确认添加
                      </button>
                    </div>
                  </div>
                </Motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-3">
              {members.map((member) => (
                <div 
                  key={member.id} 
                  className={`bg-white rounded-3xl p-4 border transition-all flex items-center justify-between ${
                    currentMemberId === member.id ? 'border-blue-500 shadow-md shadow-blue-500/10' : 'border-slate-100 shadow-sm'
                  }`}
                >
                  <div 
                    className="flex items-center gap-4 flex-1 cursor-pointer"
                    onClick={() => handleSwitchMember(member.id)}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold ${
                      currentMemberId === member.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900">{member.name}</h4>
                        {currentMemberId === member.id && (
                          <span className="bg-blue-50 text-blue-600 text-[10px] px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
                            <CheckCircle2 size={10} /> 当前
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">关系：{member.relation}</p>
                    </div>
                  </div>
                  
                  {member.id !== "1" && (
                    <button 
                      onClick={() => handleDeleteMember(member.id)}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center bg-blue-50 rounded-2xl p-4 border border-blue-100">
               <p className="text-xs text-blue-600 font-medium">
                 切换家庭成员后，应用内的数据和档案展示将自动切换至所选成员。
               </p>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}