import React, { useState } from "react";
import { 
  Smartphone, 
  Shield, 
  Globe,
  ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { motion } from "motion/react";

export function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length !== 11) {
      toast.error("请输入正确的手机号");
      return;
    }
    localStorage.setItem("isLoggedIn", "true");
    toast.success("欢迎回来，登录成功！");
    navigate("/");
  };

  const sendCode = () => {
    if (phone.length !== 11) return;
    setIsSending(true);
    toast.info("验证码已发送至您的手机");
    setTimeout(() => setIsSending(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-8 max-w-lg mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex flex-col justify-center gap-12"
      >
        <div className="space-y-4 text-center">
           <div className="w-20 h-20 bg-blue-600 rounded-3xl mx-auto flex items-center justify-center text-white shadow-xl shadow-blue-200">
             <Shield size={40} />
           </div>
           <h1 className="text-3xl font-bold text-slate-900 tracking-tight">医案通</h1>
           <p className="text-slate-500">让每一份医疗资料都有序归档</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
           <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1">手机号</label>
                <div className="relative">
                   <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                   <input 
                     type="tel" 
                     placeholder="请输入手机号" 
                     value={phone}
                     onChange={e => setPhone(e.target.value)}
                     className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 transition-all outline-hidden font-medium"
                   />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1">验证码</label>
                <div className="flex gap-3">
                   <div className="relative flex-1">
                      <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="6位验证码" 
                        value={code}
                        onChange={e => setCode(e.target.value)}
                        className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 transition-all outline-hidden font-medium"
                      />
                   </div>
                   <button 
                     type="button"
                     onClick={sendCode}
                     disabled={isSending || phone.length !== 11}
                     className="bg-slate-100 text-slate-600 px-4 rounded-2xl text-sm font-bold active:scale-95 disabled:opacity-50 transition-all whitespace-nowrap"
                   >
                     {isSending ? '发送中...' : '获取验证码'}
                   </button>
                </div>
              </div>
           </div>

           <button 
             type="submit"
             className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-200 active:scale-95 transition-all mt-4"
           >
             立即登录
           </button>
        </form>

        <div className="text-center space-y-4">
           <div className="flex items-center gap-4 text-slate-300">
             <div className="flex-1 h-px bg-slate-100" />
             <span className="text-[10px] font-bold uppercase tracking-widest">第三方登录</span>
             <div className="flex-1 h-px bg-slate-100" />
           </div>
           <div className="flex justify-center gap-6">
              <button className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors">
                <Globe size={20} />
              </button>
              <button className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors">
                <Shield size={20} />
              </button>
           </div>
        </div>
      </motion.div>

      <p className="text-center text-[10px] text-slate-400 leading-relaxed px-4 py-8 mt-auto">
        登录即表示您同意 <span className="text-blue-600 font-bold underline cursor-pointer">《用户协议》</span> 和 <span className="text-blue-600 font-bold underline cursor-pointer">《隐私权政策》</span>，我们将严格保护您的医疗隐私数据。
      </p>
    </div>
  );
}
