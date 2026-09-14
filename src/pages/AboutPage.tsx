import React from 'react';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Award, 
  FileText, 
  Download, 
  MapPin, 
  Mail, 
  CheckCircle2, 
  Compass, 
  ShieldCheck, 
  Cpu, 
  Layout, 
  Bot, 
  Cloud,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { usePortfolioData } from '../context/DataContext';
import { LiquidImage } from '../components/LiquidImage';

export const AboutPage: React.FC = () => {
  const { data, setIsResumeModalOpen, setIsQuickSheetOpen } = usePortfolioData();

  const getDirectionIcon = (title: string) => {
    if (title.includes('分布式') || title.includes('架构')) return <Cpu className="w-5 h-5 text-[#ff3b1d]" />;
    if (title.includes('Web') || title.includes('全栈')) return <Layout className="w-5 h-5 text-[#ff6a3d]" />;
    if (title.includes('AI') || title.includes('Agent')) return <Bot className="w-5 h-5 text-[#ff3b1d]" />;
    return <Cloud className="w-5 h-5 text-[#ff6a3d]" />;
  };

  return (
    <div className="space-y-16 pb-20 max-w-5xl mx-auto text-[#f3f1ea]">
      
      {/* 1. Header with Portrait / Title / Quick Actions */}
      <section className="relative pt-6 pb-10 border-b border-[rgba(243,241,234,0.1)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          
          <div className="space-y-4 flex-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-[#807f78]">
              <span className="w-2 h-2 rounded-full bg-[#ff3b1d]" />
              <span>THE STORY & BIO // 个人背景与工程脉络</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#f3f1ea] leading-[0.95]">
              Conviction before consensus.
            </h1>

            <p className="text-base sm:text-lg text-[#807f78] leading-relaxed">
              {data.profile.title} · {data.profile.experienceYears} 年研发与技术带头经历 · 常驻 {data.profile.location}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setIsResumeModalOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ff3b1d] hover:bg-[#ff6a3d] text-[#08080a] font-display text-sm tracking-wider uppercase font-bold shadow-[0_0_20px_rgba(255,59,29,0.3)] transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>查看完整技术履历 (PDF)</span>
              </button>

              <button
                onClick={() => setIsQuickSheetOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#111114] hover:bg-[#17171b] text-[#f3f1ea] border border-[rgba(243,241,234,0.15)] text-xs font-mono uppercase tracking-wider transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#ff3b1d]" />
                <span>30 秒快速评估</span>
              </button>
            </div>
          </div>

          <div className="w-40 sm:w-48 shrink-0">
            <LiquidImage
              src="https://api.getlayers.ai/storage/v1/object/public/public/assets/marcus-vane-6799bd1fb6/hero/portrait.webp"
              alt="Alex Chen Portrait"
              aspectRatio="4/5"
              maxScale={20}
              className="rounded-sm border border-[rgba(243,241,234,0.15)] shadow-2xl"
            />
          </div>

        </div>
      </section>

      {/* 2. Detailed Bio & Engineering Philosophy */}
      <section className="space-y-4">
        <div className="text-xs font-mono text-[#ff3b1d] uppercase tracking-[0.22em] flex items-center gap-2">
          <Compass className="w-4 h-4" />
          <span>01 / ENGINEERING PHILOSOPHY // 详细背景与工程哲学</span>
        </div>
        
        <div className="p-6 sm:p-8 rounded-sm bg-[#111114] border border-[rgba(243,241,234,0.1)] text-sm sm:text-base text-[#c5c4be] leading-relaxed space-y-4">
          <p>
            {data.profile.detailedBio}
          </p>
          <p>
            在我的工程字典里，“可维护性”与“业务落地”永远高于盲目的技术堆叠。任何一行架构代码，不仅要在当下的高并发压测中从容应对，更要在未来的三到五年内，允许后续开发者顺畅迭代与扩展。
          </p>
        </div>
      </section>

      {/* 3. Four Core Technical Directions (Radar & Deep Dive) */}
      <section className="space-y-6">
        <div className="text-xs font-mono text-[#ff3b1d] uppercase tracking-[0.22em] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          <span>02 / TECHNICAL DOMAINS // 4大核心技术方向深度沉淀</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.profile.techDirections.map((dir) => (
            <div
              key={dir.title}
              className="p-6 rounded-sm bg-[#111114] border border-[rgba(243,241,234,0.08)] hover:border-[#ff3b1d] transition-all duration-300 space-y-4 group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-sm bg-[#17171b] border border-[rgba(243,241,234,0.1)] group-hover:border-[#ff3b1d] transition-colors">
                  {getDirectionIcon(dir.title)}
                </div>
                <h3 className="font-display text-xl uppercase tracking-tight text-[#f3f1ea] group-hover:text-[#ff3b1d] transition-colors">
                  {dir.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#807f78] leading-relaxed">
                {dir.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Categorized Skills with Proficiency Bars */}
      <section className="space-y-6">
        <div className="text-xs font-mono text-[#ff3b1d] uppercase tracking-[0.22em] flex items-center gap-2">
          <Award className="w-4 h-4" />
          <span>03 / SKILL RADAR // 分类技能矩阵与掌握深度</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {data.profile.skills.map((cat) => (
            <div
              key={cat.category}
              className="p-6 rounded-sm bg-[#111114] border border-[rgba(243,241,234,0.08)] space-y-4"
            >
              <h4 className="font-display text-lg uppercase tracking-tight text-[#f3f1ea] border-b border-[rgba(243,241,234,0.08)] pb-2">
                {cat.category}
              </h4>

              <div className="space-y-3">
                {cat.list.map((skill) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-[#c5c4be]">{skill.name}</span>
                      <span className="text-[#ff3b1d]">{skill.level}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#17171b] overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#ff3b1d] to-[#ff6a3d] rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Work Experience Timeline */}
      <section className="space-y-6">
        <div className="text-xs font-mono text-[#ff3b1d] uppercase tracking-[0.22em] flex items-center gap-2">
          <Briefcase className="w-4 h-4" />
          <span>04 / TIMELINE // 研发履历与关键成果时间线</span>
        </div>

        <div className="relative border-l-2 border-[#ff3b1d]/40 pl-6 sm:pl-8 space-y-8 ml-2 sm:ml-4">
          {data.profile.careerTimeline.map((item, idx) => (
            <div key={idx} className="relative space-y-2 group">
              <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#08080a] border-2 border-[#ff3b1d] group-hover:bg-[#ff3b1d] transition-colors" />

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h4 className="font-display text-2xl uppercase tracking-tight text-[#f3f1ea] group-hover:text-[#ff3b1d] transition-colors">
                  {item.role} · <span className="text-[#807f78]">{item.company}</span>
                </h4>
                <span className="font-mono text-xs text-[#ff3b1d]">{item.period}</span>
              </div>

              <p className="text-xs sm:text-sm text-[#807f78] leading-relaxed">
                {item.summary}
              </p>

              <div className="p-3 rounded-sm bg-[#111114] border border-[rgba(243,241,234,0.08)] space-y-1">
                <span className="text-[11px] font-mono text-[#ff6a3d] uppercase tracking-wider block">重点成就：</span>
                <ul className="text-xs text-[#c5c4be] space-y-1">
                  {item.achievements.map((h, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#ff3b1d]">▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
