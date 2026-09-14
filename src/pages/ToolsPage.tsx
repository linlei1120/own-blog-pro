import React, { useState } from 'react';
import { 
  Wrench, 
  Search, 
  ExternalLink, 
  Star, 
  Sparkles, 
  Terminal, 
  Zap, 
  Box, 
  Send, 
  PenTool, 
  FileText, 
  Database,
  Inbox
} from 'lucide-react';
import { usePortfolioData } from '../context/DataContext';

export const ToolsPage: React.FC = () => {
  const { data } = usePortfolioData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: '全部工具 All' },
    { id: 'dev', label: '开发利器 Dev' },
    { id: 'productivity', label: '效率与设计 Workflow' },
    { id: 'cloud', label: '基础设施与云 Cloud' },
    { id: 'ai', label: 'AI 与前沿探索 AI' },
  ];

  const getToolIcon = (name: string) => {
    if (name.includes('Cursor') || name.includes('VS Code')) return <Terminal className="w-5 h-5 text-[#ff3b1d]" />;
    if (name.includes('Raycast')) return <Zap className="w-5 h-5 text-[#ff6a3d]" />;
    if (name.includes('Docker') || name.includes('OrbStack')) return <Box className="w-5 h-5 text-[#ff3b1d]" />;
    if (name.includes('v0') || name.includes('AI')) return <Sparkles className="w-5 h-5 text-[#ff6a3d]" />;
    if (name.includes('Bruno') || name.includes('Postman')) return <Send className="w-5 h-5 text-[#ff3b1d]" />;
    if (name.includes('Figma')) return <PenTool className="w-5 h-5 text-[#ff6a3d]" />;
    if (name.includes('Obsidian')) return <FileText className="w-5 h-5 text-[#ff3b1d]" />;
    return <Database className="w-5 h-5 text-[#ff6a3d]" />;
  };

  const filteredTools = data.tools.filter((tool) => {
    const matchesCat = selectedCategory === 'all' || tool.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery = 
      !query || 
      tool.name.toLowerCase().includes(query) || 
      tool.purpose.toLowerCase().includes(query) ||
      tool.recommendationReason.toLowerCase().includes(query) ||
      tool.tags.some(t => t.toLowerCase().includes(query));
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-10 pb-20 text-[#f3f1ea]">
      
      {/* Header */}
      <div className="space-y-3 border-b border-[rgba(243,241,234,0.1)] pb-8">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-[#807f78]">
          <span className="w-2 h-2 rounded-full bg-[#ff3b1d]" />
          <span>TOOLBOX // 效率与生产力军火库</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#f3f1ea] leading-[0.95]">
          Curated weapons of choice.
        </h1>
        <p className="text-sm sm:text-base text-[#807f78] max-w-3xl leading-relaxed">
          精选日常开发、工程架构、设计与 AI 探索中使用频率最高的核心利器。包含真实使用体会与官方直达链接。
        </p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
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

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#807f78] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索工具名、用途 (如 Docker)..."
            className="w-full pl-9 pr-4 py-2 rounded-sm bg-[#111114] border border-[rgba(243,241,234,0.15)] text-xs text-[#f3f1ea] placeholder-[#807f78] focus:outline-none focus:border-[#ff3b1d] transition-colors"
          />
        </div>
      </div>

      {/* Grid of Tools */}
      {filteredTools.length === 0 ? (
        <div className="p-12 text-center rounded-sm bg-[#111114] border border-[rgba(243,241,234,0.1)] space-y-3">
          <Inbox className="w-10 h-10 text-[#807f78] mx-auto" />
          <div className="text-[#f3f1ea] font-medium font-mono">未找到相关工具</div>
          <p className="text-xs text-[#807f78]">试着调整搜索关键词或选择其他分类</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="group flex flex-col justify-between p-6 rounded-sm bg-[#111114] border border-[rgba(243,241,234,0.1)] hover:border-[#ff3b1d] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-sm bg-[#17171b] border border-[rgba(243,241,234,0.08)] group-hover:border-[#ff3b1d] transition-colors">
                      {getToolIcon(tool.name)}
                    </div>
                    <div>
                      <h3 className="font-display text-xl uppercase tracking-tight text-[#f3f1ea] group-hover:text-[#ff3b1d] transition-colors flex items-center gap-1.5">
                        <span>{tool.name}</span>
                        {tool.isTopPick && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b1d]" title="博主重点力荐" />
                        )}
                      </h3>
                      <span className="text-[11px] font-mono text-[#807f78] uppercase tracking-wider">
                        {tool.categoryName}
                      </span>
                    </div>
                  </div>

                  <a
                    href={tool.websiteUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="p-1.5 rounded text-[#807f78] hover:text-[#ff3b1d] hover:bg-[#17171b] transition-colors"
                    title="访问官方网站"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-xs text-[#c5c4be] leading-relaxed">
                  {tool.purpose}
                </p>

                {tool.recommendationReason && (
                  <div className="p-3 rounded-sm bg-[#17171b] border-l-2 border-[#ff3b1d] text-xs text-[#807f78] leading-relaxed font-mono">
                    <span className="text-[#ff3b1d] block font-semibold mb-0.5">博主推荐理由：</span>
                    {tool.recommendationReason}
                  </div>
                )}

                <div className="flex flex-wrap gap-1 pt-1 font-mono text-[10px]">
                  {tool.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded bg-[#17171b] text-[#807f78] border border-[rgba(243,241,234,0.08)]">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-[rgba(243,241,234,0.1)]">
                <a
                  href={tool.websiteUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-between text-xs font-mono text-[#807f78] group-hover:text-[#ff3b1d] transition-colors"
                >
                  <span>直达官网链接</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
