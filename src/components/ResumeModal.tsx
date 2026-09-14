import React from 'react';
import { X, Printer, Mail, Github, MapPin, Briefcase, GraduationCap, Award, ExternalLink } from 'lucide-react';
import { usePortfolioData } from '../context/DataContext';

export const ResumeModal: React.FC = () => {
  const { data, isResumeModalOpen, setIsResumeModalOpen } = usePortfolioData();

  if (!isResumeModalOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150"
      onClick={() => setIsResumeModalOpen(false)}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#08080a] border border-[#ff3b1d]/40 rounded-sm shadow-2xl text-[#f3f1ea]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Control Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#111114]/95 border-b border-[rgba(243,241,234,0.1)] backdrop-blur">
          <div className="flex items-center gap-2 text-[#ff3b1d] font-mono text-xs font-semibold uppercase tracking-wider">
            <span>RESUME // 个人技术履历标准版</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#ff3b1d]/20 hover:bg-[#ff3b1d] text-[#ff6a3d] hover:text-[#08080a] border border-[#ff3b1d]/40 text-xs font-bold transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>打印 / 另存为 PDF</span>
            </button>
            <button
              onClick={() => setIsResumeModalOpen(false)}
              className="p-1.5 rounded-sm text-[#807f78] hover:text-[#f3f1ea] hover:bg-[#17171b] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Body */}
        <div className="p-6 sm:p-10 space-y-8 bg-[#08080a] text-[#f3f1ea] font-sans print:bg-white print:text-black print:p-0">
          
          {/* Resume Header */}
          <div className="border-b border-[rgba(243,241,234,0.1)] pb-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h1 className="text-3xl font-display uppercase tracking-tight text-[#f3f1ea]">
                {data.profile.name} <span className="text-xl font-normal text-[#807f78]">({data.profile.englishName})</span>
              </h1>
              <span className="text-[#ff3b1d] font-mono text-sm font-medium">
                {data.profile.title}
              </span>
            </div>

            <p className="text-[#807f78] text-sm mt-2 max-w-2xl leading-relaxed">
              {data.profile.tagline}。{data.profile.elevatorPitch}
            </p>

            {/* Contacts Bar */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-xs text-[#807f78] font-mono">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[#ff3b1d]" />
                {data.profile.email}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#ff3b1d]" />
                常驻地点：{data.profile.location}
              </span>
              <span className="flex items-center gap-1">
                <Github className="w-3.5 h-3.5 text-[#ff3b1d]" />
                {data.profile.github}
              </span>
              <span className="text-emerald-400">
                求职状态：{data.profile.availability}
              </span>
            </div>
          </div>

          {/* Section: Core Skills */}
          <div className="space-y-3">
            <h2 className="text-sm font-mono font-bold text-[#ff3b1d] uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>核心技术栈与专业能力</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-sm bg-[#111114] border border-[rgba(243,241,234,0.08)] space-y-1">
                <div className="font-semibold text-[#f3f1ea]">后端与高并发分布式系统</div>
                <div className="text-[#807f78] font-mono">Go (Gin / gRPC), Node.js, Redis, Kafka, PostgreSQL, Docker, K8s</div>
              </div>
              <div className="p-3 rounded-sm bg-[#111114] border border-[rgba(243,241,234,0.08)] space-y-1">
                <div className="font-semibold text-[#f3f1ea]">现代 Web 全栈与前沿工程化</div>
                <div className="text-[#807f78] font-mono">React 19, Next.js, TypeScript, Tailwind CSS, Vite, Zustand, D3.js</div>
              </div>
              <div className="p-3 rounded-sm bg-[#111114] border border-[rgba(243,241,234,0.08)] space-y-1">
                <div className="font-semibold text-[#f3f1ea]">AI 大模型应用与工程化</div>
                <div className="text-[#807f78] font-mono">LangChain, Agent 规划调度, RAG 检索增强, 向量数据库 Milvus, Function Calling</div>
              </div>
              <div className="p-3 rounded-sm bg-[#111114] border border-[rgba(243,241,234,0.08)] space-y-1">
                <div className="font-semibold text-[#f3f1ea]">工程效能与研发领导力</div>
                <div className="text-[#807f78] font-mono">微前端架构升级, 跨部门技术标准制定, CI/CD 自动化流水线, 研发梯队培养</div>
              </div>
            </div>
          </div>

          {/* Section: Work Experience Timeline */}
          <div className="space-y-4">
            <h2 className="text-sm font-mono font-bold text-[#ff3b1d] uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>工作与项目管理经历</span>
            </h2>
            <div className="space-y-4">
              {data.profile.careerTimeline.map((item, idx) => (
                <div key={idx} className="border-l-2 border-[#ff3b1d]/40 pl-4 space-y-1 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="font-bold text-sm text-[#f3f1ea]">{item.role} · {item.company}</span>
                    <span className="font-mono text-[#807f78]">{item.period}</span>
                  </div>
                  <p className="text-[#807f78] leading-relaxed pt-0.5">{item.summary}</p>
                  <ul className="list-disc list-inside text-[#f3f1ea] space-y-0.5 pt-1">
                    {item.achievements.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Representative Projects */}
          <div className="space-y-4">
            <h2 className="text-sm font-mono font-bold text-[#ff3b1d] uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>代表性重点架构项目</span>
            </h2>
            <div className="space-y-3">
              {data.projects.slice(0, 3).map((proj) => (
                <div key={proj.id} className="p-3.5 rounded-sm bg-[#111114] border border-[rgba(243,241,234,0.08)] text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#f3f1ea] text-sm">{proj.title}</span>
                    <span className="font-mono text-[#ff3b1d]">{proj.role}</span>
                  </div>
                  <p className="text-[#807f78]">{proj.background}</p>
                  <div className="font-mono text-[11px] text-[#ff6a3d]">
                    核心指标：{proj.achievements.join('；')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Education */}
          <div className="space-y-2 border-t border-[rgba(243,241,234,0.1)] pt-4">
            <h2 className="text-sm font-mono font-bold text-[#ff3b1d] uppercase tracking-wider flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>教育背景</span>
            </h2>
            <div className="flex items-center justify-between text-xs text-[#807f78]">
              <span className="text-[#f3f1ea] font-medium">软件工程学士 · 重点大学计算机系</span>
              <span className="font-mono">2013 - 2017</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
