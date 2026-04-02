import { useNavigate, Link } from "react-router";
import {
  User,
  Users,
  Shield,
  FileText,
  HelpCircle,
  Settings,
  LogOut,
  ChevronRight,
  Cloud,
  Bell,
} from "lucide-react";

export default function ProfilePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (confirm("确定要退出登录吗？")) {
      localStorage.removeItem("isLoggedIn");
      navigate("/login");
    }
  };

  const menuSections = [
    {
      title: "账户与成员",
      items: [
        { icon: Users, label: "成员管理", path: "/members", badge: null },
        { icon: User, label: "个人信息", path: "#", badge: null },
      ],
    },
    {
      title: "数据与安全",
      items: [
        { icon: Cloud, label: "云端备份", path: "#", badge: "未开启" },
        { icon: Shield, label: "隐私与安全", path: "#", badge: null },
        { icon: Bell, label: "通知设置", path: "#", badge: null },
      ],
    },
    {
      title: "帮助与反馈",
      items: [
        { icon: FileText, label: "用户协议", path: "#", badge: null },
        { icon: FileText, label: "隐私政策", path: "#", badge: null },
        { icon: HelpCircle, label: "帮助中心", path: "#", badge: null },
        { icon: Settings, label: "关于医案通", path: "#", badge: "V1.0" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-card to-accent/5 px-4 pt-6 pb-8">
        <h2 className="font-semibold text-center mb-6">我的</h2>

        {/* User Info Card */}
        <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-semibold">
              我
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">
                {localStorage.getItem("userPhone")?.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2") || "用户"}
              </h3>
              <p className="text-sm text-muted-foreground">
                已保护 {JSON.parse(localStorage.getItem("archives") || "[]").length} 份档案
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="px-4 py-6 space-y-6">
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 px-2">
              {section.title}
            </h3>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                const isLink = item.path.startsWith("/");

                const content = (
                  <div className="flex items-center gap-4 px-4 py-4 hover:bg-secondary/50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="flex-1 font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="text-xs text-muted-foreground px-2 py-1 rounded bg-secondary">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  </div>
                );

                return (
                  <div key={itemIndex}>
                    {isLink ? (
                      <Link to={item.path}>{content}</Link>
                    ) : (
                      <button className="w-full text-left" onClick={() => {}}>
                        {content}
                      </button>
                    )}
                    {itemIndex < section.items.length - 1 && (
                      <div className="border-b border-border mx-4" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-card border border-border text-destructive font-medium hover:bg-destructive/5 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>退出登录</span>
        </button>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground py-6">
          <p>医案通 · 您的个人医疗档案中枢</p>
          <p className="mt-1">让健康管理更简单</p>
        </div>
      </div>
    </div>
  );
}
