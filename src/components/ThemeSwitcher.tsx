import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { usePortfolioData, THEME_OPTIONS } from '../context/DataContext';
import { ThemeMode } from '../types';

export const ThemeSwitcher: React.FC = () => {
  const { themeMode, setThemeMode } = usePortfolioData();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('mousedown', handleOutsideClick);
    }
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  const currentTheme = THEME_OPTIONS.find((t) => t.id === themeMode) || THEME_OPTIONS[0];

  const handleSelectTheme = (mode: ThemeMode) => {
    setThemeMode(mode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Theme Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-full border border-[rgba(243,241,234,0.18)] bg-[#111114] text-[#f3f1ea] hover:border-[var(--accent)] transition-all text-xs font-mono"
        style={{ borderColor: isOpen ? currentTheme.accent : undefined }}
        title="切换全站色彩主题"
        aria-label="Toggle theme selector"
      >
        <div className="flex items-center gap-1.5">
          <span 
            className="w-2.5 h-2.5 rounded-full ring-1 ring-white/20 transition-transform duration-300"
            style={{ backgroundColor: currentTheme.accent }}
          />
          <span className="hidden sm:inline-block font-sans text-xs uppercase tracking-wider text-[#807f78] group-hover:text-[#f3f1ea] transition-colors">
            {currentTheme.name}
          </span>
        </div>
        <Palette className="w-3.5 h-3.5 text-[#807f78] group-hover:text-[var(--accent)] transition-colors" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2.5 w-56 rounded-xl border border-[rgba(243,241,234,0.18)] bg-[#111114]/95 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.5)] p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-widest text-[#807f78] border-b border-[rgba(243,241,234,0.1)] mb-1 flex items-center justify-between">
            <span>THEME PALETTE // 主题配色</span>
            <span style={{ color: currentTheme.accent }}>●</span>
          </div>

          <div className="space-y-1">
            {THEME_OPTIONS.map((theme) => {
              const isSelected = theme.id === themeMode;
              return (
                <button
                  key={theme.id}
                  onClick={() => handleSelectTheme(theme.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all text-xs ${
                    isSelected
                      ? 'bg-[rgba(243,241,234,0.1)] text-[#f3f1ea] font-medium'
                      : 'text-[#807f78] hover:text-[#f3f1ea] hover:bg-[rgba(243,241,234,0.05)]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0 shadow-sm"
                      style={{ backgroundColor: theme.previewColor }}
                    />
                    <div>
                      <div className="text-xs font-sans text-[#f3f1ea] font-medium leading-tight">
                        {theme.name}
                      </div>
                      <div className="text-[10px] font-mono text-[#807f78] uppercase tracking-wider">
                        {theme.enName}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-2 pt-2 border-t border-[rgba(243,241,234,0.1)] px-2 py-1 text-[10px] font-mono text-[#807f78]">
            PERSISTED // 自动本地记忆保存
          </div>
        </div>
      )}
    </div>
  );
};
