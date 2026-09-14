import React, { useState } from 'react';
import { Sparkles, Terminal, ArrowUpRight, Menu, X, Shield } from 'lucide-react';
import { usePortfolioData, THEME_OPTIONS } from '../context/DataContext';
import { ThemeSwitcher } from './ThemeSwitcher';

export const Navbar: React.FC = () => {
  const { activePage, setActivePage, setIsElevatorOpen, setIsResumeOpen, themeMode, setThemeMode } = usePortfolioData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: '主页 HOME' },
    { id: 'about', label: '履历 STORY' },
    { id: 'projects', label: '项目 VENTURES' },
    { id: 'articles', label: '知识库 KNOWLEDGE' },
    { id: 'tools', label: '工具箱 STACK' },
  ];

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId as any);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 pointer-events-none transition-all duration-300 backdrop-blur-md bg-[#08080a]/85 border-b border-[rgba(243,241,234,0.08)]">
        <nav className="pointer-events-auto max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 md:px-12 py-4">
          
          {/* Brand Logo with Monogram Badge */}
          <button
            onClick={() => handleNavClick('home')}
            className="group flex items-center gap-3 text-left focus:outline-none"
          >
            <div className="grid place-items-center w-10 h-10 rounded-full border border-[rgba(243,241,234,0.22)] bg-[#111114] text-[#f3f1ea] font-display text-lg font-bold tracking-tight transition-all duration-300 group-hover:border-[#ff3b1d] group-hover:text-[#ff3b1d] group-hover:scale-105">
              AC
            </div>
            <div className="flex flex-col">
              <span className="font-display tracking-tight text-base text-[#f3f1ea] uppercase group-hover:text-[#ff3b1d] transition-colors">
                ALEX CHEN
              </span>
              <span className="hidden sm:inline-block text-[10px] font-sans text-[#807f78] uppercase tracking-[0.22em] -mt-1 font-medium">
                FOUNDER · ARCHITECT · OPERATOR
              </span>
            </div>
          </button>

          {/* Desktop Nav Items with Accent Underline */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((item) => {
              const isActive = activePage === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`relative py-1 text-xs uppercase font-medium tracking-[0.18em] transition-colors ${
                      isActive ? 'text-[#f3f1ea]' : 'text-[#807f78] hover:text-[#f3f1ea]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`absolute bottom-0 left-0 h-[1.5px] bg-[#ff3b1d] transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 hover:w-full'
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Theme Switcher */}
            <ThemeSwitcher />

            {/* 30s Elevator Pitch Button */}
            <button
              onClick={() => setIsElevatorOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-[#ff3b1d]/15 text-[#ff6a3d] border border-[#ff3b1d]/40 hover:bg-[#ff3b1d] hover:text-[#08080a] transition-all duration-300 shadow-[0_0_15px_rgba(255,59,29,0.2)]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>30秒快速评估</span>
            </button>

            {/* Resume Button */}
            <button
              onClick={() => setIsResumeOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans text-[#f3f1ea] border border-[rgba(243,241,234,0.15)] hover:border-[#f3f1ea] hover:bg-[#17171b] transition-all"
            >
              <span>个人简历</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#807f78]" />
            </button>

            {/* Admin CMS Button */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`p-2 rounded-full border transition-all ${
                activePage === 'admin'
                  ? 'bg-[#ff3b1d] text-[#08080a] border-[#ff3b1d]'
                  : 'bg-[#111114] text-[#807f78] border-[rgba(243,241,234,0.15)] hover:text-[#f3f1ea] hover:border-[#807f78]'
              }`}
              title="后台内容管理系统 CMS"
            >
              <Shield className="w-4 h-4" />
            </button>

            {/* Mobile Burger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 rounded-lg text-[#f3f1ea] hover:text-[#ff3b1d] transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Fullscreen Slide-Down Panel */}
      {mobileMenuOpen && (
        <aside
          aria-label="Mobile navigation"
          className="fixed inset-0 z-40 bg-[#08080a] flex flex-col justify-center px-8 py-16 lg:hidden animate-in fade-in duration-300"
        >
          <div className="space-y-6 max-w-sm mx-auto w-full">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#807f78]">
              NAVIGATION INDEX // 导航索引
            </div>

            <ul className="space-y-4">
              {navLinks.map((item, idx) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className="flex items-baseline gap-4 w-full text-left group"
                  >
                    <span className="font-mono text-xs text-[#ff3b1d]">
                      0{idx + 1}
                    </span>
                    <span className="font-display text-3xl sm:text-4xl uppercase tracking-tight text-[#f3f1ea] group-hover:text-[#ff3b1d] group-hover:translate-x-2 transition-all">
                      {item.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="pt-6 border-t border-[rgba(243,241,234,0.1)] space-y-4">
              {/* Mobile Theme Selector */}
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#807f78] mb-2">
                  THEME COLOR // 主题配色
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {THEME_OPTIONS.map((t) => {
                    const isSelected = t.id === themeMode;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setThemeMode(t.id)}
                        className={`flex items-center gap-2 p-2 rounded-lg border text-xs text-left transition-all ${
                          isSelected
                            ? 'bg-[#17171b] text-[#f3f1ea]'
                            : 'border-[rgba(243,241,234,0.1)] bg-[#111114] text-[#807f78] hover:border-[rgba(243,241,234,0.25)]'
                        }`}
                        style={{ borderColor: isSelected ? t.accent : undefined }}
                      >
                        <span
                          className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                          style={{ backgroundColor: t.previewColor }}
                        />
                        <span className="truncate">{t.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsElevatorOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#ff3b1d] text-[#08080a] font-display text-lg tracking-wide uppercase font-bold shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                <span>30 秒求职与合作评估</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsResumeOpen(true);
                }}
                className="w-full py-2.5 rounded-xl bg-[#111114] border border-[rgba(243,241,234,0.15)] text-[#f3f1ea] text-xs font-mono uppercase tracking-wider"
              >
                查看完整技术履历 (PDF/打印)
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};
