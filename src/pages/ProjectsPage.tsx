import React, { useState } from 'react';
import { 
  FolderGit2, 
  Search, 
  Filter, 
  Github, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  Calendar, 
  Tag, 
  X,
  ArrowRight,
  Sparkles,
  Inbox
} from 'lucide-react';
import { usePortfolioData } from '../context/DataContext';
import { ProjectItem, ProjectCategory } from '../types';
import { LiquidImage } from '../components/LiquidImage';

export const ProjectsPage: React.FC = () => {
  const { data, selectedProjectId, setSelectedProjectId } = usePortfolioData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: '全部项目 All' },
    { id: 'ai', label: 'AI 智能应用' },
    { id: 'fullstack', label: '全栈 Web' },
    { id: 'infra', label: '基础设施与网关' },
    { id: 'opensource', label: '开源开发工具' },
  ];

  const ventureAssets = [
    'https://api.getlayers.ai/storage/v1/object/public/public/assets/marcus-vane-6799bd1fb6/ventures/venture-01.webp',
    'https://api.getlayers.ai/storage/v1/object/public/public/assets/marcus-vane-6799bd1fb6/ventures/venture-02.webp',
    'https://api.getlayers.ai/storage/v1/object/public/public/assets/marcus-vane-6799bd1fb6/ventures/venture-03.webp',
    'https://api.getlayers.ai/storage/v1/object/public/public/assets/marcus-vane-6799bd1fb6/ventures/venture-04.webp',
  ];

  // Filter logic
  const filteredProjects = data.projects.filter((proj) => {
    const matchesCategory = selectedCategory === 'all' || proj.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery = 
      !query || 
      proj.title.toLowerCase().includes(query) ||
      proj.tagline.toLowerCase().includes(query) ||
      proj.background.toLowerCase().includes(query) ||
      proj.techStack.some(t => t.toLowerCase().includes(query));
    return matchesCategory && matchesQuery;
  });

  const activeProjectModal = selectedProjectId 
    ? data.projects.find(p => p.id === selectedProjectId) 
    : null;

  return (
    <div className="space-y-10 pb-20 text-[#f3f1ea]">
      
      {/* 1. Header */}
      <div className="space-y-3 border-b border-[rgba(243,241,234,0.1)] pb-8">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-[#807f78]">
          <span className="w-2 h-2 rounded-full bg-[#ff3b1d]" />
          <span>PROJECTS PORTFOLIO // 项目合集</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#f3f1ea] leading-[0.95]">
          The work that moved markets.
        </h1>
        <p className="text-sm sm:text-base text-[#807f78] max-w-3xl leading-relaxed">
          每一个项目均源于真实的业务痛点或工程挑战。点击卡片可深入了解项目背景、负责角色、技术栈选型与量化成果。
        </p>
      </div>

      {/* 2. Filter & Search Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#ff3b1d] text-[#08080a] font-bold shadow-[0_0_15px_rgba(255,59,29,0.3)]'
                  : 'bg-[#111114] text-[#807f78] hover:text-[#f3f1ea] border border-[rgba(243,241,234,0.1)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#807f78] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索项目、技术栈 (如 Go, AI)..."
            className="w-full pl-9 pr-4 py-2 rounded-sm bg-[#111114] border border-[rgba(243,241,234,0.15)] text-xs text-[#f3f1ea] placeholder-[#807f78] focus:outline-none focus:border-[#ff3b1d] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#807f78] hover:text-[#f3f1ea]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 3. Project Cards Grid */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 text-center rounded-sm bg-[#111114] border border-[rgba(243,241,234,0.1)] space-y-3">
          <Inbox className="w-10 h-10 text-[#807f78] mx-auto" />
          <div className="text-[#f3f1ea] font-medium font-mono">未找到匹配的项目</div>
          <p className="text-xs text-[#807f78]">试着调整搜索关键词或选择不同的分类标签</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="text-xs text-[#ff3b1d] hover:underline pt-2 font-mono"
          >
            重置筛选条件
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => {
            const assetUrl = ventureAssets[idx % ventureAssets.length];

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProjectId(project.id)}
                className="group cursor-pointer flex flex-col justify-between p-5 rounded-sm bg-[#111114] border border-[rgba(243,241,234,0.1)] hover:border-[#ff3b1d] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  {/* Liquid Preview Image */}
                  <LiquidImage
                    src={assetUrl}
                    alt={project.title}
                    aspectRatio="16/10"
                    maxScale={24}
                    placeholderLabel={project.title}
                    className="rounded-sm"
                  />

                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#ff3b1d] uppercase tracking-wider">
                      {project.categoryName}
                    </span>
                    <span className="text-[#807f78]">{project.date}</span>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl uppercase tracking-tight text-[#f3f1ea] group-hover:text-[#ff3b1d] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#807f78] mt-1.5 leading-relaxed line-clamp-2">
                      {project.tagline}
                    </p>
                  </div>

                  <div className="text-xs text-[#c5c4be] bg-[#17171b] p-2 rounded-sm border border-[rgba(243,241,234,0.08)] font-mono">
                    <span className="text-[#ff3b1d]">角色:</span> {project.role}
                  </div>

                  {/* Key achievements */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#807f78]">
                      核心指标:
                    </div>
                    {project.achievements.slice(0, 2).map((ach, i) => (
                      <div key={i} className="text-xs text-[#f3f1ea] flex items-start gap-1.5 leading-snug">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#ff3b1d] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{ach}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1 pt-1 font-mono text-[10px]">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="px-2 py-0.5 rounded bg-[#17171b] text-[#807f78] border border-[rgba(243,241,234,0.08)]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[rgba(243,241,234,0.1)] flex items-center justify-between text-xs font-mono text-[#807f78] group-hover:text-[#ff3b1d] transition-colors">
                  <span>查看架构详情与源码</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. Project Detail Modal */}
      {activeProjectModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedProjectId(null)}
        >
          <div 
            className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto bg-[#08080a] border border-[#ff3b1d]/40 rounded-sm shadow-2xl p-6 sm:p-8 space-y-6 text-[#f3f1ea]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono text-[#ff3b1d] uppercase tracking-widest">
                  {activeProjectModal.categoryName} · {activeProjectModal.date}
                </span>
                <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-tight text-[#f3f1ea] mt-1">
                  {activeProjectModal.title}
                </h2>
                <p className="text-sm text-[#807f78] mt-1">{activeProjectModal.tagline}</p>
              </div>
              <button
                onClick={() => setSelectedProjectId(null)}
                className="text-[#807f78] hover:text-[#f3f1ea] font-mono text-xs px-2.5 py-1 border border-[rgba(243,241,234,0.15)] rounded"
              >
                ESC / CLOSE
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#807f78] leading-relaxed border-t border-[rgba(243,241,234,0.1)] pt-4">
              <div>
                <span className="font-mono text-[#f3f1ea] block uppercase tracking-wider mb-1">【项目背景与解决痛点】</span>
                <p>{activeProjectModal.background}</p>
              </div>

              <div>
                <span className="font-mono text-[#f3f1ea] block uppercase tracking-wider mb-1">【负责角色与职责分工】</span>
                <p className="text-[#f3f1ea]">{activeProjectModal.role}</p>
              </div>

              <div>
                <span className="font-mono text-[#f3f1ea] block uppercase tracking-wider mb-2">【技术栈选型】</span>
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {activeProjectModal.techStack.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 rounded bg-[#111114] border border-[rgba(243,241,234,0.1)] text-[#ff6a3d]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-mono text-[#f3f1ea] block uppercase tracking-wider mb-2">【量化交付成果】</span>
                <ul className="space-y-2">
                  {activeProjectModal.achievements.map((ach, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[#f3f1ea]">
                      <CheckCircle2 className="w-4 h-4 text-[#ff3b1d] shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[rgba(243,241,234,0.1)]">
              {activeProjectModal.githubUrl && (
                <a
                  href={activeProjectModal.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded bg-[#111114] hover:bg-[#17171b] text-xs font-mono text-[#f3f1ea] border border-[rgba(243,241,234,0.15)] transition-colors"
                >
                  GitHub 代码库 ↗
                </a>
              )}
              {activeProjectModal.demoUrl && (
                <a
                  href={activeProjectModal.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded bg-[#ff3b1d] hover:bg-[#ff6a3d] text-xs font-mono font-bold text-[#08080a] transition-all"
                >
                  在线演示 Demo ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
