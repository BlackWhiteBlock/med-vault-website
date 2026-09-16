import React from "react";
import { Link, Outlet } from "react-router";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";
import { AppIconSvg } from "../pages/LogoPage";
import { useLaunchNotice } from "./LaunchNoticeProvider";
import { useHomeSectionNav } from "../hooks/useHomeSectionNav";

export function Layout() {
  const { showPartnerNotice } = useLaunchNotice();
  const { goToHomeSection } = useHomeSectionNav();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "核心功能", sectionId: "features" as const },
    { name: "使用场景", sectionId: "scenarios" as const },
    { name: "产品原则", sectionId: "principles" as const },
    { name: "隐私安全", sectionId: "privacy" as const },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 max-w-6xl flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-blue-600 font-semibold text-xl tracking-tight"
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0">
              <AppIconSvg shadow={false} />
            </div>
            医案通
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <button
                key={link.name}
                type="button"
                className="cursor-pointer border-0 bg-transparent p-0 hover:text-blue-600 transition-colors"
                onClick={() => goToHomeSection(link.sectionId)}
              >
                {link.name}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button
              type="button"
              variant="ghost"
              className="hidden lg:inline-flex"
              onClick={showPartnerNotice}
            >
              合作咨询
            </Button>
            <Button asChild>
              <Link to="/download">立即体验</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-slate-600 p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-lg p-6 flex flex-col gap-4 md:hidden"
            >
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  type="button"
                  className="w-full cursor-pointer border-0 bg-transparent py-2 text-left text-lg font-medium text-slate-800 border-b border-slate-50"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    goToHomeSection(link.sectionId);
                  }}
                >
                  {link.name}
                </button>
              ))}
              <div className="flex flex-col gap-3 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-center"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    showPartnerNotice();
                  }}
                >
                  合作咨询
                </Button>
                <Button asChild className="w-full justify-center">
                  <Link to="/download" onClick={() => setIsMobileMenuOpen(false)}>
                    立即体验
                  </Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
        <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-white font-semibold text-xl mb-6">
              <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 opacity-90 grayscale-[0.2]">
                <AppIconSvg shadow={false} />
              </div>
              医案通
            </div>
            <p className="max-w-xs text-sm leading-relaxed">
              医案通，让分散的医疗资料变成可长期使用的个人健康档案。致力于帮助个人与家庭更高效地管理健康资料。
            </p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-6">产品与服务</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  type="button"
                  className="cursor-pointer border-0 bg-transparent p-0 hover:text-blue-400 transition-colors"
                  onClick={() => goToHomeSection("features")}
                >
                  核心功能
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="cursor-pointer border-0 bg-transparent p-0 hover:text-blue-400 transition-colors"
                  onClick={() => goToHomeSection("scenarios")}
                >
                  使用场景
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="cursor-pointer border-0 bg-transparent p-0 hover:text-blue-400 transition-colors"
                  onClick={() => goToHomeSection("principles")}
                >
                  产品原则
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-6">支持与联系</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  type="button"
                  className="cursor-pointer border-0 bg-transparent p-0 hover:text-blue-400 transition-colors"
                  onClick={() => goToHomeSection("privacy")}
                >
                  隐私与安全
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="cursor-pointer border-0 bg-transparent p-0 hover:text-blue-400 transition-colors"
                  onClick={showPartnerNotice}
                >
                  合作咨询
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 max-w-6xl mt-16 pt-8 border-t border-slate-800 text-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-slate-500">
            <p className="text-slate-400">© 2026 医案通 (Yi An Tong). All rights reserved.</p>
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-slate-300 transition-colors"
            >
              苏ICP备19061575号-5
            </a>
            <a
              href="https://beian.mps.gov.cn/#/query/webSearch?code=32010602012550"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 hover:text-slate-300 transition-colors"
            >
              <svg
                viewBox="0 0 20 20"
                className="h-3.5 w-3.5 shrink-0 fill-current opacity-80"
                aria-hidden="true"
              >
                <path d="M10 0L1.5 3.5v5.2c0 5.3 3.6 10.2 8.5 11.3 4.9-1.1 8.5-6 8.5-11.3V3.5L10 0zm0 2.2 6.5 2.7v3.8c0 4.1-2.7 7.9-6.5 8.9-3.8-1-6.5-4.8-6.5-8.9V4.9L10 2.2z" />
                <path d="M9.2 11.8 6.6 9.2l1.1-1.1 1.5 1.5 3.4-3.4 1.1 1.1-4.5 4.5z" />
              </svg>
              苏公网安备32010602012550号
            </a>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>让每个人都拥有一份完整的个人医疗档案</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
