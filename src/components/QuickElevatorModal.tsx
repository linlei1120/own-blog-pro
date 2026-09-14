import React, { useState } from 'react';
import { 
  X, 
  Zap, 
  UserCheck, 
  Cpu, 
  Award, 
  Briefcase, 
  FileText, 
  CheckCircle2, 
  Copy, 
  ExternalLink,
  Download,
  Sparkles
} from 'lucide-react';
import { usePortfolioData } from '../context/DataContext';

export const QuickElevatorModal: React.FC = () => {
  const { data, isQuickSheetOpen, setIsQuickSheetOpen, setActivePage, setIsResumeModalOpen } = usePortfolioData();
  const [copied, setCopied] = useState(false);

  if (!isQuickSheetOpen) return null;

  const copyContact = () => {
    navigator.clipboard.writeText(`姓名: ${data.profile.name} | 邮箱: ${data.profile.email} | 微信: ${data.profile.wechat}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setIsQuickSheetOpen(false)}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#08080a] border border-[#ff3b1d]/40 rounded-sm shadow-[0_0_50px_rgba(255,59,29,0.2)] text-[#f3f1ea] p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={() => setIsQuickSheetOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-sm text-[#807f78] hover:text-[#f3f1ea] hover:bg-[#17171b] transition-colors"
          aria-label="关闭"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Badge */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#ff3b1d]/20 border border-[#ff3b1d]/40 text-[#ff6a3d]">
            <Zap className="w-3.5 h-3.5 text-[#ff3b1d]" />
            30 秒速览评估卡片 · Recruiter & Partner Fast Sheet
          </span>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-0.5 rounded-full">
            ● {data.profile.availability}
          </span>
        </div>

        {/* Headline */}
        <div className="mb-6">
          <h2 className="text-3xl sm:text-4xl font-display uppercase tracking-tight text-[#f3f1ea] flex items-center gap-3">
            <span>{data.profile.name}</span>
            <span className="text-base sm:text-lg font-normal text-[#807f78] font-mono">
              ({data.profile.englishName})
            </span>
          </h2>
          <p className="text-sm sm:text-base font-semibold text-[#ff3b1d] mt-0.5">
            {data.profile.title} · {data.profile.experienceYears} 年研发与技术带头经历 · 常驻 {data.profile.location}
          </p>
        </div>

        {/* 30s Core Elevator Pitch Box */}
        <div className="p-4 sm:p-5 rounded-sm bg-[#111114] border border-[rgba(243,241,234,0.1)] mb-6">
          <div className="text-xs font-mono uppercase tracking-wider text-[#ff3b1d] mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>核心电梯演讲 ELEVATOR PITCH</span>
          </div>
          <p className="text-sm sm:text-base text-[#f3f1ea] font-medium leading-relaxed">
            "{data.profile.elevatorPitch}"
          </p>
        </div>

        {/* Four Quadrants: 博主是谁、擅长什么、做过什么、能提供什么价值 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          
          {/* Q1: 博主是谁 (Who I am) */}
          <div className="p-4 rounded-sm bg-[#111114] border border-[rgba(243,241,234,0.08)] space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#ff3b1d]">
              <UserCheck className="w-4 h-4" />
              <span className="font-bold">01 / 博主是谁 (WHO AM I)</span>
            </div>
            <p className="text-xs sm:text-sm text-[#807f78] leading-relaxed">
              7年一线全栈架构师与技术负责人，曾主导亿级流量电商架构改造与 AI 智能知识库研发。推崇第一性原理与简洁可维护性，兼具前瞻技术敏锐度与扎实落地能力。
            </p>
          </div>

          {/* Q2: 擅长什么 (Core Competencies) */}
          <div className="p-4 rounded-sm bg-[#111114] border border-[rgba(243,241,234,0.08)] space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#ff3b1d]">
              <Cpu className="w-4 h-4" />
              <span className="font-bold">02 / 核心擅长 (WHAT I EXCEL AT)</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-xs">
              {['分布式高并发架构', 'Next.js/React 前端工程化', 'Go 高性能后端', '大模型 RAG/Agent', '云原生 DevOps'].map((item) => (
                <span key={item} className="px-2 py-0.5 rounded bg-[#17171b] border border-[rgba(243,241,234,0.1)] text-[#f3f1ea]">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Q3: 做过什么 (Track Record) */}
          <div className="p-4 rounded-sm bg-[#111114] border border-[rgba(243,241,234,0.08)] space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#ff3b1d]">
              <Briefcase className="w-4 h-4" />
              <span className="font-bold">03 / 做过什么 (WHAT I'VE BUILT)</span>
            </div>
            <ul className="text-xs text-[#807f78] space-y-1.5">
              <li className="flex items-start gap-1.5">
                <span className="text-[#ff3b1d]">▸</span>
                <span>主导自研分布式网关，单机压测 QPS 8.5W+，P99 延迟 &lt; 1.8ms</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#ff3b1d]">▸</span>
                <span>从0到1研发 Agent 智能问答系统，RAG 检索召回率提升至 91.4%</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#ff3b1d]">▸</span>
                <span>主导开源组件库，GitHub 累计收获 3,200+ Stars 与多团队采用</span>
              </li>
            </ul>
          </div>

          {/* Q4: 能提供什么价值 (Value Proposition) */}
          <div className="p-4 rounded-sm bg-[#111114] border border-[rgba(243,241,234,0.08)] space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#ff3b1d]">
              <Award className="w-4 h-4" />
              <span className="font-bold">04 / 能提供什么价值 (VALUE PROPOSITION)</span>
            </div>
            <ul className="text-xs text-[#807f78] space-y-1.5">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#ff3b1d] shrink-0 mt-0.5" />
                <span>技术攻坚：快速攻克疑难性能瓶颈与未知技术领域架构选型</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#ff3b1d] shrink-0 mt-0.5" />
                <span>团队带头：赋能工程规范、CI/CD 自动化与代码审查文化落地</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#ff3b1d] shrink-0 mt-0.5" />
                <span>业务闭环：深刻理解商业目标，不做脱离业务的无用技术自嗨</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Fast Action Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[rgba(243,241,234,0.1)]">
          
          <div className="flex items-center gap-2 text-xs font-mono text-[#807f78] w-full sm:w-auto justify-between sm:justify-start">
            <span>邮箱: {data.profile.email}</span>
            <button
              onClick={copyContact}
              className="p-1.5 rounded hover:bg-[#17171b] text-[#f3f1ea] hover:text-[#ff3b1d] transition-colors"
              title="复制联系信息"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
            {copied && <span className="text-emerald-400 text-xs font-sans">已复制！</span>}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                setIsQuickSheetOpen(false);
                setIsResumeModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-sm bg-[#111114] hover:bg-[#17171b] text-xs font-medium text-[#f3f1ea] border border-[rgba(243,241,234,0.15)] transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-[#ff3b1d]" />
              <span>查看完整技术履历</span>
            </button>

            <button
              onClick={() => {
                setIsQuickSheetOpen(false);
                setActivePage('projects');
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-sm bg-[#ff3b1d] hover:bg-[#ff6a3d] text-xs font-bold text-[#08080a] transition-all shadow-[0_0_15px_rgba(255,59,29,0.3)]"
            >
              <span>查验项目代码与成果</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
