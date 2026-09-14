import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  ArrowLeft, 
  ArrowRight, 
  Share2, 
  Check, 
  Search, 
  ListTree, 
  Inbox
} from 'lucide-react';
import Markdown from 'react-markdown';
import { usePortfolioData } from '../context/DataContext';

export const ArticlesPage: React.FC = () => {
  const { data, selectedArticleId, setSelectedArticleId } = usePortfolioData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Extract all categories and tags
  const categories = useMemo(() => {
    const set = new Set<string>();
    data.articles.forEach(a => set.add(a.category));
    return ['all', ...Array.from(set)];
  }, [data.articles]);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    data.articles.forEach(a => a.tags.forEach(t => set.add(t)));
    return Array.from(set);
  }, [data.articles]);

  // Current active article if in detail view
  const currentArticle = useMemo(() => {
    return selectedArticleId ? data.articles.find(a => a.id === selectedArticleId) : null;
  }, [selectedArticleId, data.articles]);

  // Generate Table of Contents (TOC) from current article content
  const tableOfContents = useMemo(() => {
    if (!currentArticle) return [];
    const lines = currentArticle.content.split('\n');
    const headings: { title: string; level: number; id: string }[] = [];
    lines.forEach((line) => {
      const match = line.match(/^(#{2,3})\s+(.*)$/);
      if (match) {
        const level = match[1].length;
        const rawTitle = match[2].trim();
        const id = rawTitle.toLowerCase().replace(/[^a-zA-Z0-9\u4e00-\u9fa5]+/g, '-');
        headings.push({ title: rawTitle, level, id });
      }
    });
    return headings;
  }, [currentArticle]);

  // Filtered articles list
  const filteredArticles = useMemo(() => {
    return data.articles.filter((art) => {
      const matchesCat = selectedCategory === 'all' || art.category === selectedCategory;
      const matchesTag = selectedTag === 'all' || art.tags.includes(selectedTag);
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery = 
        !query || 
        art.title.toLowerCase().includes(query) || 
        art.excerpt.toLowerCase().includes(query) ||
        art.tags.some(t => t.toLowerCase().includes(query));
      return matchesCat && matchesTag && matchesQuery;
    });
  }, [data.articles, selectedCategory, selectedTag, searchQuery]);

  // Related articles (for detail view)
  const relatedArticles = useMemo(() => {
    if (!currentArticle) return [];
    return data.articles
      .filter(a => a.id !== currentArticle.id)
      .slice(0, 3);
  }, [currentArticle, data.articles]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // ----------------------------------------------------
  // ARTICLE DETAIL VIEW
  // ----------------------------------------------------
  if (currentArticle) {
    return (
      <div className="space-y-12 pb-20 max-w-5xl mx-auto text-[#f3f1ea]">
        
        {/* Navigation bar back to list */}
        <div className="flex items-center justify-between border-b border-[rgba(243,241,234,0.1)] pb-4">
          <button
            onClick={() => setSelectedArticleId(null)}
            className="flex items-center gap-2 text-xs font-mono text-[#ff3b1d] hover:text-[#ff6a3d] transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回知识库文章列表</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#111114] border border-[rgba(243,241,234,0.15)] text-xs text-[#807f78] hover:text-[#f3f1ea] transition-all font-mono"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? '链接已复制' : '分享文章'}</span>
          </button>
        </div>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#807f78]">
            <span className="px-2.5 py-0.5 rounded-full bg-[#ff3b1d]/20 text-[#ff6a3d] border border-[#ff3b1d]/40 uppercase">
              {currentArticle.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#ff3b1d]" />
              {currentArticle.publishDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#ff3b1d]" />
              预计阅读 {currentArticle.readingTime}
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#f3f1ea] leading-[1.05]">
            {currentArticle.title}
          </h1>

          {/* Excerpt Lead */}
          <div className="p-4 sm:p-5 rounded-sm bg-[#111114] border-l-4 border-[#ff3b1d] text-[#c5c4be] text-sm sm:text-base leading-relaxed font-sans">
            {currentArticle.excerpt}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {currentArticle.tags.map((tag) => (
              <span 
                key={tag}
                className="px-2.5 py-1 rounded bg-[#17171b] border border-[rgba(243,241,234,0.08)] text-xs font-mono text-[#807f78]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Main Article Content & Table of Contents layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
          
          {/* Left Column: Markdown Article Body (3 cols) */}
          <div className="lg:col-span-3 bg-[#111114] border border-[rgba(243,241,234,0.1)] p-6 sm:p-10 rounded-sm">
            <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-[#f3f1ea] prose-a:text-[#ff3b1d] prose-code:font-mono prose-code:text-[#ff6a3d] prose-pre:bg-[#08080a] prose-pre:border prose-pre:border-[rgba(243,241,234,0.1)] text-[#c5c4be] leading-relaxed text-sm sm:text-base">
              <Markdown>{currentArticle.content}</Markdown>
            </div>
          </div>

          {/* Right Column: Sticky Table of Contents & Author Card */}
          <div className="lg:col-span-1 space-y-6 sticky top-24">
            {tableOfContents.length > 0 && (
              <div className="p-5 rounded-sm bg-[#111114] border border-[rgba(243,241,234,0.1)] space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#ff3b1d]">
                  <ListTree className="w-3.5 h-3.5" />
                  <span>文章目录 TOC</span>
                </div>
                <nav className="space-y-2 text-xs font-mono">
                  {tableOfContents.map((h, i) => (
                    <div
                      key={i}
                      className={`text-[#807f78] hover:text-[#f3f1ea] transition-colors leading-snug cursor-pointer ${
                        h.level === 3 ? 'pl-3 text-[11px]' : ''
                      }`}
                      onClick={() => {
                        window.scrollTo({ top: 300 + i * 180, behavior: 'smooth' });
                      }}
                    >
                      {h.title}
                    </div>
                  ))}
                </nav>
              </div>
            )}

            {/* Related Recommendations */}
            {relatedArticles.length > 0 && (
              <div className="p-5 rounded-sm bg-[#111114] border border-[rgba(243,241,234,0.1)] space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-[#ff3b1d]">
                  相关推荐阅读
                </div>
                <div className="space-y-3">
                  {relatedArticles.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => setSelectedArticleId(rel.id)}
                      className="group cursor-pointer space-y-1"
                    >
                      <h4 className="text-xs font-semibold text-[#c5c4be] group-hover:text-[#ff3b1d] transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                      <span className="text-[10px] font-mono text-[#807f78]">
                        {rel.publishDate} · {rel.readingTime}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    );
  }

  // ----------------------------------------------------
  // ARTICLE LIST VIEW
  // ----------------------------------------------------
  return (
    <div className="space-y-10 pb-20 text-[#f3f1ea]">
      
      {/* 1. Header */}
      <div className="space-y-3 border-b border-[rgba(243,241,234,0.1)] pb-8">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-[#807f78]">
          <span className="w-2 h-2 rounded-full bg-[#ff3b1d]" />
          <span>KNOWLEDGE BASE // 知识库与技术洞见</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#f3f1ea] leading-[0.95]">
          Field notes from the edge.
        </h1>
        <p className="text-sm sm:text-base text-[#807f78] max-w-3xl leading-relaxed">
          涵盖系统设计、高并发调优、现代前端工程化与 AI Agent 落地思考。以严谨的代码与真实压测数据为证。
        </p>
      </div>

      {/* 2. Controls: Category Pills & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'bg-[#ff3b1d] text-[#08080a] font-bold shadow-[0_0_15px_rgba(255,59,29,0.3)]'
                  : 'bg-[#111114] text-[#807f78] hover:text-[#f3f1ea] border border-[rgba(243,241,234,0.1)]'
              }`}
            >
              {cat === 'all' ? '全部文章 All' : cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#807f78] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索文章、关键词..."
            className="w-full pl-9 pr-4 py-2 rounded-sm bg-[#111114] border border-[rgba(243,241,234,0.15)] text-xs text-[#f3f1ea] placeholder-[#807f78] focus:outline-none focus:border-[#ff3b1d] transition-colors"
          />
        </div>
      </div>

      {/* Tag cloud filter */}
      <div className="flex items-center gap-2 text-xs font-mono text-[#807f78] overflow-x-auto pb-2">
        <span className="shrink-0 text-[#ff3b1d]">快速标签:</span>
        <button
          onClick={() => setSelectedTag('all')}
          className={`px-2 py-0.5 rounded transition-colors ${
            selectedTag === 'all' ? 'text-[#f3f1ea] underline font-bold' : 'hover:text-[#f3f1ea]'
          }`}
        >
          全部
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag === selectedTag ? 'all' : tag)}
            className={`px-2 py-0.5 rounded transition-colors ${
              selectedTag === tag ? 'text-[#ff3b1d] font-bold bg-[#17171b]' : 'hover:text-[#f3f1ea]'
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* 3. Articles List Grid */}
      {filteredArticles.length === 0 ? (
        <div className="p-12 text-center rounded-sm bg-[#111114] border border-[rgba(243,241,234,0.1)] space-y-3">
          <Inbox className="w-10 h-10 text-[#807f78] mx-auto" />
          <div className="text-[#f3f1ea] font-medium font-mono">未检索到相关文章</div>
          <p className="text-xs text-[#807f78]">尝试调整分类或关键词搜索</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedTag('all');
              setSearchQuery('');
            }}
            className="text-xs text-[#ff3b1d] hover:underline pt-2 font-mono"
          >
            清除所有过滤条件
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticleId(article.id)}
              className="group cursor-pointer flex flex-col justify-between p-6 rounded-sm bg-[#111114] border border-[rgba(243,241,234,0.1)] hover:border-[#ff3b1d] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#ff3b1d] uppercase tracking-wider">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-2 text-[#807f78]">
                    <span>{article.publishDate}</span>
                    <span>·</span>
                    <span>{article.readingTime}</span>
                  </div>
                </div>

                <h3 className="font-display text-2xl uppercase tracking-tight text-[#f3f1ea] group-hover:text-[#ff3b1d] transition-colors">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#807f78] leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {article.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#17171b] text-[#807f78] border border-[rgba(243,241,234,0.08)]">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-[rgba(243,241,234,0.1)] flex items-center justify-between text-xs font-mono text-[#807f78] group-hover:text-[#ff3b1d] transition-colors">
                <span>阅读完整文章与架构代码</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      )}

    </div>
  );
};
