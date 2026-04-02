import { useState } from "react";
import { useNavigate } from "react-router";
import { FileHeart, Phone, Sparkles, Zap } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleSendCode = () => {
    if (!phone || phone.length !== 11) {
      alert("请输入正确的手机号");
      return;
    }
    setCodeSent(true);
    setCountdown(60);
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleLogin = () => {
    if (!code || code.length !== 6) {
      alert("请输入6位验证码");
      return;
    }
    
    // Simulate login
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userPhone", phone);
    
    // Initialize default member if not exists
    const members = localStorage.getItem("members");
    if (!members) {
      const defaultMember = {
        id: "1",
        name: "本人",
        relation: "本人",
        gender: "",
        birthday: "",
        bloodType: "",
        allergies: "",
      };
      localStorage.setItem("members", JSON.stringify([defaultMember]));
      localStorage.setItem("currentMemberId", "1");
    }
    
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-background"></div>
      
      {/* Animated circles */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <div className="w-full max-w-md">
          {/* Logo and Title */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-3xl blur-xl opacity-60"></div>
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-accent">
                <FileHeart className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-2">
              医案通
            </h1>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Sparkles className="w-4 h-4 text-accent" />
              <p className="text-base">AI 驱动的智能健康管理</p>
              <Sparkles className="w-4 h-4 text-accent" />
            </div>
          </div>

          {/* Login Form */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl blur-xl"></div>
            
            <div className="relative bg-card/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-primary/20">
              <div className="flex items-center gap-2 mb-6">
                <Zap className="w-5 h-5 text-accent" />
                <h2 className="text-xl font-semibold">快速登录</h2>
              </div>
              
              {/* Phone Input */}
              <div className="mb-4">
                <label className="block text-sm mb-2 text-foreground/80">手机号</label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary transition-colors" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
                    placeholder="请输入手机号"
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-input bg-input-background/50 backdrop-blur-sm focus:outline-none focus:border-primary focus:bg-input-background transition-all"
                    maxLength={11}
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
                </div>
              </div>

              {/* Verification Code Input */}
              <div className="mb-6">
                <label className="block text-sm mb-2 text-foreground/80">验证码</label>
                <div className="flex gap-3">
                  <div className="relative flex-1 group">
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      placeholder="请输入6位验证码"
                      className="w-full px-4 py-3.5 rounded-2xl border-2 border-input bg-input-background/50 backdrop-blur-sm focus:outline-none focus:border-primary focus:bg-input-background transition-all"
                      maxLength={6}
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                  <button
                    onClick={handleSendCode}
                    disabled={countdown > 0 || !phone || phone.length !== 11}
                    className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-secondary to-muted text-foreground font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-muted hover:to-secondary transition-all whitespace-nowrap border border-border"
                  >
                    {countdown > 0 ? `${countdown}s` : codeSent ? "重发" : "发送"}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                className="relative w-full py-4 rounded-2xl overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <span className="relative font-semibold text-white flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  登录 / 注册
                </span>
              </button>

              {/* Agreement */}
              <p className="text-xs text-muted-foreground text-center mt-6 leading-relaxed">
                登录即表示同意
                <a href="#" className="text-primary hover:text-accent transition-colors">《用户协议》</a>
                和
                <a href="#" className="text-primary hover:text-accent transition-colors">《隐私政策》</a>
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-2">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">AI 智能</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-2">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <p className="text-xs text-muted-foreground">极速识别</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-success/10 border border-success/20 flex items-center justify-center mx-auto mb-2">
                <FileHeart className="w-6 h-6 text-success" />
              </div>
              <p className="text-xs text-muted-foreground">安全可靠</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        .delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
    </div>
  );
}