import React from 'react';
import { Terminal, Home, BookOpen, ArrowLeft } from 'lucide-react';
import { usePortfolioData } from '../context/DataContext';

export const NotFoundPage: React.FC = () => {
  const { setActivePage } = usePortfolioData();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-mono text-2xl font-bold shadow-[0_0_30px_rgba(6,182,212,0.2)]">
        404
      </div>

      <div className="space-y-2 max-w-md">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
          PAGE NOT FOUND // 页面不存在
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          你访问的路径可能已被重构、迁移或暂未开放。请通过下方快捷导航返回主要功能模块。
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          onClick={() => setActivePage('home')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
        >
          <Home className="w-4 h-4" />
          <span>返回技术主页</span>
        </button>

        <button
          onClick={() => setActivePage('articles')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-medium text-xs border border-slate-700 transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          <span>查看知识库</span>
        </button>
      </div>
    </div>
  );
};
