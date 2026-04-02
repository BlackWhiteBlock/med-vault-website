import { Home, Search, Share2, Settings, Plus, Files } from "lucide-react";
import { Link, useLocation } from "react-router";
import { motion as Motion } from "motion/react";

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "首页", icon: Home },
    { path: "/records", label: "档案", icon: Files },
    { path: "/upload", label: "上传", icon: Plus, special: true },
    { path: "/share", label: "分享", icon: Share2 },
    { path: "/settings", label: "设置", icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      <div className="pointer-events-auto bg-white/90 backdrop-blur-2xl border-t border-slate-100/80 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] pb-[env(safe-area-inset-bottom)]">
        <div className="flex justify-around items-center h-[68px] px-2 max-w-md mx-auto relative">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            if (item.special) {
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative flex flex-col items-center justify-center h-full group px-4 z-20"
                >
                  <Motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute -top-7 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-[1.2rem] shadow-lg shadow-blue-500/30 flex items-center justify-center text-white border-[3px] border-white z-10"
                  >
                    <Icon className="w-6 h-6" strokeWidth={2.5} />
                  </Motion.div>
                  <span className={`text-[10px] mt-7 font-bold transition-colors ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
                    {item.label}
                  </span>
                </Link>
              );
            }

            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative flex flex-col items-center justify-center flex-1 h-full w-full group outline-none"
              >
                <div className="flex flex-col items-center justify-center gap-1.5 w-full h-full relative">
                  <Motion.div
                    animate={{ 
                      y: isActive ? -2 : 0,
                      color: isActive ? "#2563eb" : "#94a3b8" 
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="flex flex-col items-center gap-1 relative z-10"
                  >
                    <Icon 
                      className="w-[22px] h-[22px]" 
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    <span className="text-[10px] font-bold tracking-wide">
                      {item.label}
                    </span>
                  </Motion.div>

                  {/* Active Indicator */}
                  {isActive && (
                    <Motion.div 
                      layoutId="bottom-nav-indicator"
                      className="absolute top-1 w-10 h-10 bg-blue-50 rounded-full -z-0"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}