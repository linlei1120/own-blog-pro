import React, { useState } from 'react';
import { 
  Settings, 
  LayoutDashboard, 
  User, 
  FolderGit2, 
  BookOpen, 
  Wrench, 
  Database, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  Star,
  ExternalLink,
  X
} from 'lucide-react';
import Markdown from 'react-markdown';
import { usePortfolioData } from '../context/DataContext';
import { ProjectItem, ArticleItem, ToolItem, ProfileData, ProjectCategory, ToolCategory } from '../types';

type AdminTab = 'overview' | 'profile' | 'projects' | 'articles' | 'tools' | 'backup';

export const AdminPage: React.FC = () => {
  const { 
    data, 
    setActivePage, 
    updateProfile, 
    addProject, 
    updateProject, 
    deleteProject, 
    addArticle, 
    updateArticle, 
    deleteArticle, 
    addTool, 
    updateTool, 
    deleteTool, 
    resetToDefaultData, 
    exportDataToJson, 
    importDataFromJson 
  } = usePortfolioData();

  const [currentTab, setCurrentTab] = useState<AdminTab>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // ----------------------------------------------------
  // PROFILE FORM STATE
  // ----------------------------------------------------
  const [profileForm, setProfileForm] = useState<ProfileData>(data.profile);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    showToast('个人资料已成功保存并实时更新！');
  };

  // ----------------------------------------------------
  // PROJECT FORM & MODAL
  // ----------------------------------------------------
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [projectForm, setProjectForm] = useState<Partial<ProjectItem>>({
    title: '',
    tagline: '',
    category: 'fullstack',
    categoryName: '全栈 Web 应用',
    isFeatured: false,
    role: '全栈研发负责人',
    background: '',
    techStack: [],
    achievements: [],
    demoUrl: '',
    githubUrl: '',
    date: '2024',
    status: 'active'
  });
  const [techStackInput, setTechStackInput] = useState('');
  const [achievementsInput, setAchievementsInput] = useState('');

  const openNewProjectModal = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      tagline: '',
      category: 'fullstack',
      categoryName: '全栈 Web 应用',
      isFeatured: false,
      role: '全栈研发负责人',
      background: '',
      techStack: [],
      achievements: [],
      demoUrl: '',
      githubUrl: '',
      date: '2024',
      status: 'active'
    });
    setTechStackInput('');
    setAchievementsInput('');
    setIsProjectModalOpen(true);
  };

  const openEditProjectModal = (p: ProjectItem) => {
    setEditingProject(p);
    setProjectForm(p);
    setTechStackInput(p.techStack.join(', '));
    setAchievementsInput(p.achievements.join('\n'));
    setIsProjectModalOpen(true);
  };

  const handleProjectSave = (e: React.FormEvent) => {
    e.preventDefault();
    const techStack = techStackInput.split(/[,，]/).map(s => s.trim()).filter(Boolean);
    const achievements = achievementsInput.split('\n').map(s => s.trim()).filter(Boolean);

    const categoryNames: Record<ProjectCategory, string> = {
      fullstack: '全栈 Web 应用',
      opensource: '开源开发工具',
      ai: 'AI 智能应用',
      infra: '基础设施与后端',
      mobile: '移动端与应用'
    };

    const projectPayload: ProjectItem = {
      id: editingProject ? editingProject.id : `proj-${Date.now()}`,
      title: projectForm.title || '新项目',
      tagline: projectForm.tagline || '',
      category: (projectForm.category as ProjectCategory) || 'fullstack',
      categoryName: categoryNames[(projectForm.category as ProjectCategory) || 'fullstack'],
      isFeatured: !!projectForm.isFeatured,
      role: projectForm.role || '',
      background: projectForm.background || '',
      techStack: techStack.length ? techStack : ['TypeScript', 'React'],
      achievements: achievements.length ? achievements : ['项目成功交付上线'],
      demoUrl: projectForm.demoUrl,
      githubUrl: projectForm.githubUrl,
      date: projectForm.date || '2024',
      status: (projectForm.status as 'active' | 'archived' | 'incubating') || 'active'
    };

    if (editingProject) {
      updateProject(projectPayload);
      showToast(`项目 "${projectPayload.title}" 更新成功！`);
    } else {
      addProject(projectPayload);
      showToast(`新项目 "${projectPayload.title}" 已添加！`);
    }
    setIsProjectModalOpen(false);
  };

  // ----------------------------------------------------
  // ARTICLE FORM & MODAL
  // ----------------------------------------------------
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<ArticleItem | null>(null);
  const [articleForm, setArticleForm] = useState<Partial<ArticleItem>>({
    title: '',
    slug: '',
    category: '前端架构',
    tags: [],
    publishDate: new Date().toISOString().split('T')[0],
    readingTime: '5 分钟',
    excerpt: '',
    isFeatured: false,
    content: ''
  });
  const [articleTagsInput, setArticleTagsInput] = useState('');

  const openNewArticleModal = () => {
    setEditingArticle(null);
    setArticleForm({
      title: '',
      slug: `post-${Date.now()}`,
      category: '前端架构',
      tags: ['技术总结'],
      publishDate: new Date().toISOString().split('T')[0],
      readingTime: '6 分钟',
      excerpt: '',
      isFeatured: false,
      content: `## 为什么需要深入思考此架构？\n\n在此输入文章背景与思考...\n\n\`\`\`typescript\n// 示例代码\nconst greeting = "Hello Tech World";\nconsole.log(greeting);\n\`\`\`\n\n### 核心总结\n- 关键收获1\n- 关键收获2`
    });
    setArticleTagsInput('React, TypeScript, 架构');
    setIsArticleModalOpen(true);
  };

  const openEditArticleModal = (a: ArticleItem) => {
    setEditingArticle(a);
    setArticleForm(a);
    setArticleTagsInput(a.tags.join(', '));
    setIsArticleModalOpen(true);
  };

  const handleArticleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = articleTagsInput.split(/[,，]/).map(s => s.trim()).filter(Boolean);

    const articlePayload: ArticleItem = {
      id: editingArticle ? editingArticle.id : `art-${Date.now()}`,
      title: articleForm.title || '无标题技术文章',
      slug: articleForm.slug || `post-${Date.now()}`,
      category: articleForm.category || '综合技术',
      tags: tags.length ? tags : ['技术分享'],
      publishDate: articleForm.publishDate || new Date().toISOString().split('T')[0],
      readingTime: articleForm.readingTime || '5 分钟',
      excerpt: articleForm.excerpt || '',
      isFeatured: !!articleForm.isFeatured,
      content: articleForm.content || '暂无内容'
    };

    if (editingArticle) {
      updateArticle(articlePayload);
      showToast(`文章 "${articlePayload.title}" 更新成功！`);
    } else {
      addArticle(articlePayload);
      showToast(`新文章 "${articlePayload.title}" 已发布到知识库！`);
    }
    setIsArticleModalOpen(false);
  };

  // ----------------------------------------------------
  // TOOL FORM & MODAL
  // ----------------------------------------------------
  const [isToolModalOpen, setIsToolModalOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<ToolItem | null>(null);
  const [toolForm, setToolForm] = useState<Partial<ToolItem>>({
    name: '',
    category: 'dev',
    categoryName: '开发利器',
    purpose: '',
    tags: [],
    websiteUrl: '',
    recommendationReason: '',
    iconName: 'Wrench',
    isTopPick: false
  });
  const [toolTagsInput, setToolTagsInput] = useState('');

  const openNewToolModal = () => {
    setEditingTool(null);
    setToolForm({
      name: '',
      category: 'dev',
      categoryName: '开发利器',
      purpose: '',
      tags: [],
      websiteUrl: '',
      recommendationReason: '',
      iconName: 'Wrench',
      isTopPick: false
    });
    setToolTagsInput('Dev, 效率');
    setIsToolModalOpen(true);
  };

  const openEditToolModal = (t: ToolItem) => {
    setEditingTool(t);
    setToolForm(t);
    setToolTagsInput(t.tags.join(', '));
    setIsToolModalOpen(true);
  };

  const handleToolSave = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = toolTagsInput.split(/[,，]/).map(s => s.trim()).filter(Boolean);

    const categoryNames: Record<ToolCategory, string> = {
      dev: '开发利器',
      productivity: '效率与工作流',
      cloud: '基础设施与云',
      ai: 'AI 与前沿探索'
    };

    const toolPayload: ToolItem = {
      id: editingTool ? editingTool.id : `tool-${Date.now()}`,
      name: toolForm.name || '常用工具',
      category: (toolForm.category as ToolCategory) || 'dev',
      categoryName: categoryNames[(toolForm.category as ToolCategory) || 'dev'],
      purpose: toolForm.purpose || '',
      tags: tags.length ? tags : ['工具'],
      websiteUrl: toolForm.websiteUrl || 'https://example.com',
      recommendationReason: toolForm.recommendationReason || '推荐尝试',
      iconName: toolForm.iconName || 'Wrench',
      isTopPick: !!toolForm.isTopPick
    };

    if (editingTool) {
      updateTool(toolPayload);
      showToast(`工具 "${toolPayload.name}" 更新成功！`);
    } else {
      addTool(toolPayload);
      showToast(`新工具 "${toolPayload.name}" 已收录！`);
    }
    setIsToolModalOpen(false);
  };

  // ----------------------------------------------------
  // BACKUP / JSON IMPORT / EXPORT
  // ----------------------------------------------------
  const [importJsonText, setImportJsonText] = useState('');

  const handleExportJson = () => {
    const jsonStr = exportDataToJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dev-brand-portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('完整数据 JSON 文件已成功导出！');
  };

  const handleImportJson = () => {
    if (!importJsonText.trim()) {
      alert('请先粘贴合法的 JSON 数据文本');
      return;
    }
    const success = importDataFromJson(importJsonText);
    if (success) {
      showToast('数据导入成功！页面已全量刷新');
      setImportJsonText('');
    } else {
      alert('JSON 解析失败，请检查格式是否正确');
    }
  };

  const handleResetData = () => {
    if (window.confirm('确定要恢复为系统预置的技术大牛演示数据吗？你所做的本地修改将被重置。')) {
      resetToDefaultData();
      showToast('已重置为默认演示数据！');
    }
  };

  return (
    <div className="space-y-8 pb-20 max-w-6xl mx-auto">
      
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-200 text-xs sm:text-sm font-mono shadow-2xl animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/90 border border-purple-500/30">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-300">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                开发者后台内容管理系统 (CMS)
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-700">
                LOCAL PERSISTENCE
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              修改个人资料、管理项目合集、撰写技术文章与推荐工具，数据即时同步至客户端展示。
            </p>
          </div>
        </div>

        <button
          onClick={() => setActivePage('home')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
        >
          <Eye className="w-4 h-4 text-cyan-400" />
          <span>返回前台主页预览</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'overview', label: '系统概览', icon: <LayoutDashboard className="w-4 h-4" /> },
          { id: 'profile', label: '个人资料与定位', icon: <User className="w-4 h-4" /> },
          { id: 'projects', label: `项目管理 (${data.projects.length})`, icon: <FolderGit2 className="w-4 h-4" /> },
          { id: 'articles', label: `知识库管理 (${data.articles.length})`, icon: <BookOpen className="w-4 h-4" /> },
          { id: 'tools', label: `工具库管理 (${data.tools.length})`, icon: <Wrench className="w-4 h-4" /> },
          { id: 'backup', label: '数据备份与迁移', icon: <Database className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCurrentTab(tab.id as AdminTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              currentTab === tab.id
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/60 shadow-[0_0_12px_rgba(168,85,247,0.15)] font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 1. OVERVIEW TAB */}
      {/* ---------------------------------------------------------------- */}
      {currentTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400 font-mono">已收录项目库</div>
              <div className="text-3xl font-extrabold font-mono text-cyan-400">{data.projects.length}</div>
              <div className="text-[11px] text-slate-500">其中精选推荐：{data.projects.filter(p => p.isFeatured).length} 个</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400 font-mono">知识库沉淀长文</div>
              <div className="text-3xl font-extrabold font-mono text-emerald-400">{data.articles.length}</div>
              <div className="text-[11px] text-slate-500">涵盖前端、Go后端与大模型</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400 font-mono">工程师实用工具</div>
              <div className="text-3xl font-extrabold font-mono text-purple-400">{data.tools.length}</div>
              <div className="text-[11px] text-slate-500">置顶推荐：{data.tools.filter(t => t.isTopPick).length} 款</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400 font-mono">存储持久化机制</div>
              <div className="text-xl font-bold font-mono text-amber-300">本地存储就绪</div>
              <div className="text-[11px] text-emerald-400 font-mono">● 更改自动持久化</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-base font-mono">快捷操作指南 QUICK ACTIONS</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={openNewProjectModal}
                className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-left transition-colors space-y-1"
              >
                <div className="flex items-center gap-2 font-semibold text-cyan-300 text-sm">
                  <Plus className="w-4 h-4" />
                  <span>添加新项目</span>
                </div>
                <div className="text-xs text-slate-400">录入新完成的高价值系统或开源库</div>
              </button>

              <button
                onClick={openNewArticleModal}
                className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-left transition-colors space-y-1"
              >
                <div className="flex items-center gap-2 font-semibold text-emerald-300 text-sm">
                  <Plus className="w-4 h-4" />
                  <span>撰写知识库新博文</span>
                </div>
                <div className="text-xs text-slate-400">支持实时 Markdown 预览与代码高亮</div>
              </button>

              <button
                onClick={openNewToolModal}
                className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-left transition-colors space-y-1"
              >
                <div className="flex items-center gap-2 font-semibold text-purple-300 text-sm">
                  <Plus className="w-4 h-4" />
                  <span>收录新工具</span>
                </div>
                <div className="text-xs text-slate-400">添加日常提升研发效率的宝藏软件</div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* 2. PROFILE TAB */}
      {/* ---------------------------------------------------------------- */}
      {currentTab === 'profile' && (
        <form onSubmit={handleProfileSave} className="space-y-6 bg-slate-900/40 p-6 sm:p-8 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-lg">编辑个人基本信息与 30 秒速览定位</h3>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-[0_0_12px_rgba(6,182,212,0.3)]"
            >
              <Save className="w-4 h-4" />
              <span>保存个人资料</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300">博主姓名</label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300">英文称呼</label>
              <input
                type="text"
                value={profileForm.englishName}
                onChange={(e) => setProfileForm({ ...profileForm, englishName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300">核心头衔 (Title)</label>
            <input
              type="text"
              value={profileForm.title}
              onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300">一句话定位口号 (Tagline)</label>
            <input
              type="text"
              value={profileForm.tagline}
              onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-amber-300">30 秒速览电梯演讲 (Elevator Pitch)</label>
            <textarea
              rows={3}
              value={profileForm.elevatorPitch}
              onChange={(e) => setProfileForm({ ...profileForm, elevatorPitch: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-amber-500/40 text-sm text-slate-100 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300">研发经验年限</label>
              <input
                type="number"
                value={profileForm.experienceYears}
                onChange={(e) => setProfileForm({ ...profileForm, experienceYears: Number(e.target.value) })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300">常驻地点</label>
              <input
                type="text"
                value={profileForm.location}
                onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-emerald-400">当前求职/合作状态</label>
              <input
                type="text"
                value={profileForm.availability}
                onChange={(e) => setProfileForm({ ...profileForm, availability: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-emerald-800/60 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300">联系邮箱 Email</label>
              <input
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300">微信号 WeChat</label>
              <input
                type="text"
                value={profileForm.wechat}
                onChange={(e) => setProfileForm({ ...profileForm, wechat: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300">GitHub 主页链接</label>
              <input
                type="text"
                value={profileForm.github}
                onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300">详细背景长文 (支持换行分段)</label>
            <textarea
              rows={5}
              value={profileForm.detailedBio}
              onChange={(e) => setProfileForm({ ...profileForm, detailedBio: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 font-sans"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            >
              <Save className="w-4 h-4" />
              <span>保存修改</span>
            </button>
          </div>
        </form>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* 3. PROJECTS TAB */}
      {/* ---------------------------------------------------------------- */}
      {currentTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">项目合集库管理</h3>
              <p className="text-xs text-slate-400">管理作品集、调整技术栈与代表作成果指标</p>
            </div>
            <button
              onClick={openNewProjectModal}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-[0_0_12px_rgba(6,182,212,0.25)]"
            >
              <Plus className="w-4 h-4" />
              <span>添加新项目</span>
            </button>
          </div>

          <div className="space-y-3">
            {data.projects.map((proj) => (
              <div
                key={proj.id}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm sm:text-base">{proj.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                      {proj.categoryName}
                    </span>
                    {proj.isFeatured && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/60">
                        首页精选
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1">{proj.tagline}</p>
                  <div className="flex flex-wrap gap-1 pt-1 font-mono text-[10px] text-slate-500">
                    {proj.techStack.map(t => (
                      <span key={t} className="bg-slate-800 px-1.5 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      updateProject({ ...proj, isFeatured: !proj.isFeatured });
                      showToast(`已${proj.isFeatured ? '取消' : '设为'}首页精选！`);
                    }}
                    className={`p-2 rounded-lg text-xs font-mono border transition-colors ${
                      proj.isFeatured
                        ? 'bg-amber-950/40 text-amber-300 border-amber-600/40'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                    title="切换是否为首页精选"
                  >
                    <Star className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => openEditProjectModal(proj)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                    title="编辑项目"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`确定要删除项目 "${proj.title}" 吗？`)) {
                        deleteProject(proj.id);
                        showToast(`项目 "${proj.title}" 已删除！`);
                      }
                    }}
                    className="p-2 rounded-lg bg-red-950/50 hover:bg-red-900/60 text-red-300 border border-red-800/60 transition-colors"
                    title="删除项目"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* 4. ARTICLES TAB */}
      {/* ---------------------------------------------------------------- */}
      {currentTab === 'articles' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">知识库博文文章管理</h3>
              <p className="text-xs text-slate-400">撰写技术复盘、编辑 Markdown 长文与目录</p>
            </div>
            <button
              onClick={openNewArticleModal}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-[0_0_12px_rgba(16,185,129,0.25)]"
            >
              <Plus className="w-4 h-4" />
              <span>撰写新长文</span>
            </button>
          </div>

          <div className="space-y-3">
            {data.articles.map((art) => (
              <div
                key={art.id}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm sm:text-base">{art.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                      {art.category}
                    </span>
                    <span className="text-slate-500 font-mono text-xs">{art.publishDate}</span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1">{art.excerpt}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => openEditArticleModal(art)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                    title="编辑文章"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`确定要删除文章 "${art.title}" 吗？`)) {
                        deleteArticle(art.id);
                        showToast(`文章 "${art.title}" 已删除！`);
                      }
                    }}
                    className="p-2 rounded-lg bg-red-950/50 hover:bg-red-900/60 text-red-300 border border-red-800/60 transition-colors"
                    title="删除文章"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* 5. TOOLS TAB */}
      {/* ---------------------------------------------------------------- */}
      {currentTab === 'tools' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">工具箱收录管理</h3>
              <p className="text-xs text-slate-400">收录高频利器、撰写实战推荐理由与官网外链</p>
            </div>
            <button
              onClick={openNewToolModal}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-xs transition-all shadow-[0_0_12px_rgba(168,85,247,0.25)]"
            >
              <Plus className="w-4 h-4" />
              <span>收录新工具</span>
            </button>
          </div>

          <div className="space-y-3">
            {data.tools.map((tool) => (
              <div
                key={tool.id}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm sm:text-base">{tool.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                      {tool.categoryName}
                    </span>
                    {tool.isTopPick && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/60">
                        精选推荐
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1">{tool.purpose}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      updateTool({ ...tool, isTopPick: !tool.isTopPick });
                      showToast(`已${tool.isTopPick ? '取消' : '设为'}精选推荐！`);
                    }}
                    className={`p-2 rounded-lg text-xs font-mono border transition-colors ${
                      tool.isTopPick
                        ? 'bg-amber-950/40 text-amber-300 border-amber-600/40'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                    title="切换是否为精选推荐"
                  >
                    <Star className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => openEditToolModal(tool)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                    title="编辑工具"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`确定要删除工具 "${tool.name}" 吗？`)) {
                        deleteTool(tool.id);
                        showToast(`工具 "${tool.name}" 已删除！`);
                      }
                    }}
                    className="p-2 rounded-lg bg-red-950/50 hover:bg-red-900/60 text-red-300 border border-red-800/60 transition-colors"
                    title="删除工具"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* 6. BACKUP & RESET TAB */}
      {/* ---------------------------------------------------------------- */}
      {currentTab === 'backup' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <Download className="w-4 h-4 text-cyan-400" />
              <span>01. 导出全量数据备份 (JSON)</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              将当前的所有博主信息、项目合集、知识库长文与工具箱完整打包导出为一个标准 JSON 文件，方便版本归档与跨设备迁移。
            </p>
            <button
              onClick={handleExportJson}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>立即下载导出 JSON 文件</span>
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <Upload className="w-4 h-4 text-emerald-400" />
              <span>02. 导入恢复 JSON 数据</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              将之前导出的 JSON 内容粘贴在下方文本框中，点击确认恢复即可全量覆盖当前数据。
            </p>
            <textarea
              rows={4}
              placeholder="在此处粘贴 JSON 数据文本..."
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={handleImportJson}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>确认解析并导入数据</span>
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-red-950/20 border border-red-900/40 space-y-4">
            <h3 className="text-base font-bold text-red-300 font-mono flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-red-400" />
              <span>03. 恢复初始技术大牛演示数据</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              如果你希望撤销所有测试修改并重置回初始的高质量示例（包含 7 年全栈架构师个人履历、高并发与 AI 开源代表作、深度工程博文及工具），可随时点击下方按钮重置。
            </p>
            <button
              onClick={handleResetData}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-900/60 hover:bg-red-800/80 text-red-200 font-semibold text-xs border border-red-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>重置为默认演示数据</span>
            </button>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* PROJECT MODAL */}
      {/* ---------------------------------------------------------------- */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-950 border border-cyan-500/40 rounded-2xl shadow-2xl p-6 text-slate-200">
            <button
              onClick={() => setIsProjectModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-4">
              {editingProject ? '编辑项目' : '添加新项目'}
            </h3>

            <form onSubmit={handleProjectSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">项目名称</label>
                <input
                  type="text"
                  required
                  value={projectForm.title || ''}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">项目一句话亮点 / Tagline</label>
                <input
                  type="text"
                  value={projectForm.tagline || ''}
                  onChange={(e) => setProjectForm({ ...projectForm, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-400">项目分类</label>
                  <select
                    value={projectForm.category || 'fullstack'}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as ProjectCategory })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                  >
                    <option value="ai">AI 智能应用</option>
                    <option value="fullstack">全栈 Web 应用</option>
                    <option value="infra">基础设施与网关</option>
                    <option value="opensource">开源开发工具</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-400">研发角色 (Role)</label>
                  <input
                    type="text"
                    value={projectForm.role || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">项目背景与解决痛点</label>
                <textarea
                  rows={3}
                  value={projectForm.background || ''}
                  onChange={(e) => setProjectForm({ ...projectForm, background: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">技术栈 (用逗号分隔，如 Go, Next.js, Redis)</label>
                <input
                  type="text"
                  value={techStackInput}
                  onChange={(e) => setTechStackInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">核心成果与量化指标 (每行一项)</label>
                <textarea
                  rows={3}
                  value={achievementsInput}
                  onChange={(e) => setAchievementsInput(e.target.value)}
                  placeholder="单机压测 QPS 达到 8.5 万&#10;GitHub 标星超 3,000"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-400">演示链接 (Demo URL)</label>
                  <input
                    type="text"
                    value={projectForm.demoUrl || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, demoUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-400">开源源码链接 (GitHub)</label>
                  <input
                    type="text"
                    value={projectForm.githubUrl || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={projectForm.isFeatured || false}
                  onChange={(e) => setProjectForm({ ...projectForm, isFeatured: e.target.checked })}
                  className="rounded bg-slate-900 border-slate-800 text-cyan-500 focus:ring-0"
                />
                <label htmlFor="featuredCheck" className="text-xs text-slate-300 font-mono">
                  设为首页精选推荐项目 (Featured Project)
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-900 text-slate-400 text-xs"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                >
                  保存项目
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* ARTICLE MODAL (LIVE MARKDOWN SPLIT PREVIEW) */}
      {/* ---------------------------------------------------------------- */}
      {isArticleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-slate-950 border border-emerald-500/40 rounded-2xl shadow-2xl p-6 text-slate-200">
            <button
              onClick={() => setIsArticleModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-4">
              {editingArticle ? '编辑技术博文' : '撰写新长文'}
            </h3>

            <form onSubmit={handleArticleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-mono text-slate-400">文章标题</label>
                  <input
                    type="text"
                    required
                    value={articleForm.title || ''}
                    onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-400">所属分类</label>
                  <input
                    type="text"
                    value={articleForm.category || ''}
                    onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                    placeholder="如 前端架构 / 后端设计"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-400">标签 (逗号分隔，如 React, TypeScript)</label>
                  <input
                    type="text"
                    value={articleTagsInput}
                    onChange={(e) => setArticleTagsInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-400">预计阅读时长</label>
                  <input
                    type="text"
                    value={articleForm.readingTime || '6 分钟'}
                    onChange={(e) => setArticleForm({ ...articleForm, readingTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">文章摘要 (Excerpt)</label>
                <textarea
                  rows={2}
                  value={articleForm.excerpt || ''}
                  onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>

              {/* Split screen Markdown editor */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-emerald-400">Markdown 源码编辑</label>
                  <textarea
                    rows={12}
                    value={articleForm.content || ''}
                    onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                    className="w-full p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-cyan-400">实时渲染预览</label>
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 h-[260px] overflow-y-auto markdown-content text-xs">
                    <Markdown>{articleForm.content || '*在此输入正文开始预览*'}</Markdown>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsArticleModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-900 text-slate-400 text-xs"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
                >
                  发布 / 更新博文
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* TOOL MODAL */}
      {/* ---------------------------------------------------------------- */}
      {isToolModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-slate-950 border border-purple-500/40 rounded-2xl shadow-2xl p-6 text-slate-200">
            <button
              onClick={() => setIsToolModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-4">
              {editingTool ? '编辑工具' : '收录新工具'}
            </h3>

            <form onSubmit={handleToolSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-400">工具名称</label>
                  <input
                    type="text"
                    required
                    value={toolForm.name || ''}
                    onChange={(e) => setToolForm({ ...toolForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-400">分类</label>
                  <select
                    value={toolForm.category || 'dev'}
                    onChange={(e) => setToolForm({ ...toolForm, category: e.target.value as ToolCategory })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                  >
                    <option value="dev">开发利器</option>
                    <option value="productivity">效率与工作流</option>
                    <option value="cloud">基础设施与云</option>
                    <option value="ai">AI 与前沿探索</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">工具主要用途简述</label>
                <input
                  type="text"
                  value={toolForm.purpose || ''}
                  onChange={(e) => setToolForm({ ...toolForm, purpose: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">博主实战推荐理由</label>
                <textarea
                  rows={3}
                  value={toolForm.recommendationReason || ''}
                  onChange={(e) => setToolForm({ ...toolForm, recommendationReason: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-400">官方网址 (Website URL)</label>
                  <input
                    type="text"
                    value={toolForm.websiteUrl || ''}
                    onChange={(e) => setToolForm({ ...toolForm, websiteUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-400">标签 (逗号分隔)</label>
                  <input
                    type="text"
                    value={toolTagsInput}
                    onChange={(e) => setToolTagsInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="topPickCheck"
                  checked={toolForm.isTopPick || false}
                  onChange={(e) => setToolForm({ ...toolForm, isTopPick: e.target.checked })}
                  className="rounded bg-slate-900 border-slate-800 text-purple-500 focus:ring-0"
                />
                <label htmlFor="topPickCheck" className="text-xs text-slate-300 font-mono">
                  设为精选置顶推荐工具
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsToolModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-900 text-slate-400 text-xs"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-xs"
                >
                  保存工具
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
