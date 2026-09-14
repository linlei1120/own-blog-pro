import React, { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import { 
  ArrowUpRight, 
  Sparkles, 
  ExternalLink, 
  FolderGit2, 
  BookOpen, 
  Wrench, 
  Quote, 
  CheckCircle,
  FileText,
  Clock,
  ArrowRight
} from 'lucide-react';
import { usePortfolioData } from '../context/DataContext';
import { LiquidImage } from '../components/LiquidImage';
import { ProjectParallaxCard } from '../components/ProjectParallaxCard';
import { animateLetters, animateWords, observeInView } from '../utils/animation';
import { ProjectItem } from '../types';

export const HomePage: React.FC = () => {
  const { data, setActivePage, setIsElevatorOpen, setIsResumeOpen } = usePortfolioData();

  // Refs for Anime.js animations
  const nameLine1Ref = useRef<HTMLSpanElement | null>(null);
  const nameLine2Ref = useRef<HTMLSpanElement | null>(null);
  const rolesRef = useRef<HTMLDivElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const scrollCueRef = useRef<HTMLDivElement | null>(null);

  // Hero Initial Scroll Parallax states
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const heroPortraitWrapperRef = useRef<HTMLDivElement | null>(null);
  const heroNameWrapperRef = useRef<HTMLDivElement | null>(null);
  const heroRolesWrapperRef = useRef<HTMLDivElement | null>(null);
  const [heroParallaxY, setHeroParallaxY] = useState(0);

  // Listen to scroll for hero depth parallax
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const heroHeight = heroSectionRef.current?.offsetHeight || window.innerHeight;

          if (scrollY <= heroHeight * 1.3) {
            // Calculate proportional offsets for depth planes
            // 1. Portrait moves downward slightly slower than scroll (0.28x rate) creating foreground relief
            const portraitOffset = scrollY * 0.28;
            // 2. Giant typography sinks into background (0.14x rate) with slight scale down
            const nameOffset = scrollY * 0.14;
            const nameScale = Math.max(0.92, 1 - (scrollY / heroHeight) * 0.1);
            // 3. Header text and cues float up and fade
            const rolesOpacity = Math.max(0, 1 - (scrollY / (heroHeight * 0.55)));
            const rolesOffset = scrollY * -0.15;

            if (heroPortraitWrapperRef.current) {
              heroPortraitWrapperRef.current.style.transform = `translate3d(-50%, ${portraitOffset}px, 0)`;
            }
            if (heroNameWrapperRef.current) {
              heroNameWrapperRef.current.style.transform = `translate3d(0, ${nameOffset}px, 0) scale(${nameScale})`;
            }
            if (heroRolesWrapperRef.current) {
              heroRolesWrapperRef.current.style.opacity = `${rolesOpacity}`;
              heroRolesWrapperRef.current.style.transform = `translate3d(0, ${rolesOffset}px, 0)`;
            }

            setHeroParallaxY(scrollY * 0.2);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Also attach to window.lenis if present
    const lenis = (window as unknown as { lenis?: { on: (event: string, cb: () => void) => void; off: (event: string, cb: () => void) => void } }).lenis;
    if (lenis && typeof lenis.on === 'function') {
      lenis.on('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (lenis && typeof lenis.off === 'function') {
        lenis.off('scroll', handleScroll);
      }
    };
  }, []);

  // Voices (Testimonials) state
  const voices = [
    {
      id: '01',
      name: 'Elena Cardoso',
      role: 'Managing Partner, Meridian Ventures',
      image: 'https://api.getlayers.ai/storage/v1/object/public/public/assets/marcus-vane-6799bd1fb6/voices/voice-01.webp',
      quote: 'Marcus saw the market three years before the rest of us. Betting alongside him changed the trajectory of my entire career.'
    },
    {
      id: '02',
      name: 'David Okonkwo',
      role: 'Founder & CEO, Cadence Health',
      image: 'https://api.getlayers.ai/storage/v1/object/public/public/assets/marcus-vane-6799bd1fb6/voices/voice-02.webp',
      quote: 'He doesn\'t just write checks — he gets in the trenches at 6am and refuses to leave until the impossible part is solved.'
    },
    {
      id: '03',
      name: 'Priya Nandakumar',
      role: 'CEO, Northwind Energy',
      image: 'https://api.getlayers.ai/storage/v1/object/public/public/assets/marcus-vane-6799bd1fb6/voices/voice-03.webp',
      quote: 'The most demanding mentor I\'ve ever had, and the only reason our company survived its first winter. Relentless, generous, right.'
    }
  ];

  const [activeVoiceIndex, setActiveVoiceIndex] = useState(0);
  const activeVoice = voices[activeVoiceIndex];
  const quoteTextRef = useRef<HTMLParagraphElement | null>(null);

  // Selected project for quick architecture drawer
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Venture images from asset bucket
  const ventureAssets = [
    'https://api.getlayers.ai/storage/v1/object/public/public/assets/marcus-vane-6799bd1fb6/ventures/venture-01.webp',
    'https://api.getlayers.ai/storage/v1/object/public/public/assets/marcus-vane-6799bd1fb6/ventures/venture-02.webp',
    'https://api.getlayers.ai/storage/v1/object/public/public/assets/marcus-vane-6799bd1fb6/ventures/venture-03.webp',
    'https://api.getlayers.ai/storage/v1/object/public/public/assets/marcus-vane-6799bd1fb6/ventures/venture-04.webp',
  ];

  // 1. Initial Hero reveal using anime.js
  useEffect(() => {
    const timer = setTimeout(() => {
      // Giant name letter-by-letter reveal
      if (nameLine1Ref.current) {
        animateLetters(nameLine1Ref.current, { delay: 100, stagger: 52, duration: 900 });
      }
      if (nameLine2Ref.current) {
        animateLetters(nameLine2Ref.current, { delay: 340, stagger: 52, duration: 900 });
      }

      // Stacked role words line-by-line reveal
      if (rolesRef.current) {
        const lines = rolesRef.current.querySelectorAll('.role-line');
        lines.forEach((line, i) => {
          animate(line, {
            translateY: ['110%', '0%'],
            opacity: [0, 1],
            duration: 760,
            delay: 400 + i * 80,
            ease: 'cubicBezier(0.16, 1, 0.3, 1)'
          });
        });
      }

      // Description slide up
      if (descRef.current) {
        animate(descRef.current, {
          translateY: [18, 0],
          opacity: [0, 1],
          duration: 650,
          delay: 600,
          ease: 'cubicBezier(0.16, 1, 0.3, 1)'
        });
      }

      // Scroll cue reveal
      if (scrollCueRef.current) {
        animate(scrollCueRef.current, {
          opacity: [0, 1],
          duration: 800,
          delay: 900,
          ease: 'easeOutQuad'
        });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  // 2. Re-trigger word-by-word reveal when active voice changes
  useEffect(() => {
    if (quoteTextRef.current) {
      animateWords(quoteTextRef.current, `“${activeVoice.quote}”`, {
        stagger: 22,
        duration: 520
      });
    }
  }, [activeVoiceIndex]);

  return (
    <div className="space-y-24 md:space-y-36 pb-24 text-[#f3f1ea]">
      
      {/* ============================================================ */}
      {/* 1. CINEMATIC HERO SECTION                                     */}
      {/* ============================================================ */}
      <section 
        id="top" 
        ref={heroSectionRef}
        className="relative min-h-[92vh] sm:min-h-[96vh] flex flex-col justify-between overflow-hidden pt-24 sm:pt-28 pb-8"
      >
        {/* Top row: Role words on left, Description on right */}
        <div 
          ref={heroRolesWrapperRef}
          className="relative z-30 flex flex-col sm:flex-row items-start justify-between gap-6 sm:gap-12 px-2 sm:px-4 transition-transform duration-75 will-change-transform"
        >
          {/* Left: 4 stacked display role words */}
          <div ref={rolesRef} className="flex flex-col font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#f3f1ea] leading-[1.05]">
            <div className="overflow-hidden"><span className="role-line block opacity-0">FOUNDER</span></div>
            <div className="overflow-hidden"><span className="role-line block opacity-0">INVESTOR</span></div>
            <div className="overflow-hidden"><span className="role-line block opacity-0">OPERATOR</span></div>
            <div className="overflow-hidden"><span className="role-line block text-[#ff3b1d] opacity-0">CONTRARIAN</span></div>
          </div>

          {/* Right: Pitch statement & 30s evaluation badge */}
          <div className="max-w-md sm:text-right space-y-4">
            <p ref={descRef} className="text-sm sm:text-base text-[#807f78] leading-relaxed opacity-0">
              I start companies and build high-concurrency architectures that shouldn't be possible — then make them inevitable. 7+ years of fullstack & distributed systems engineering.
            </p>

            <div className="flex sm:justify-end items-center gap-3">
              <button
                onClick={() => setIsElevatorOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold bg-[#ff3b1d] text-[#08080a] hover:bg-[#ff6a3d] transition-all duration-300 shadow-[0_0_20px_rgba(255,59,29,0.3)] group"
              >
                <Sparkles className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                <span>30秒快速评估博主价值</span>
              </button>

              <button
                onClick={() => setIsResumeOpen(true)}
                className="text-xs font-mono text-[#807f78] hover:text-[#f3f1ea] px-3 py-2 border border-[rgba(243,241,234,0.15)] rounded-full hover:border-[#f3f1ea] transition-colors"
              >
                在线简历
              </button>
            </div>
          </div>
        </div>

        {/* Center: Cutout Portrait composited behind giant name */}
        <div 
          ref={heroPortraitWrapperRef}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 h-[72vh] sm:h-[84vh] w-[88vw] sm:w-[50vw] lg:w-[38vw] pointer-events-none flex items-end justify-center will-change-transform"
        >
          <LiquidImage
            src="https://api.getlayers.ai/storage/v1/object/public/public/assets/marcus-vane-6799bd1fb6/hero/portrait.webp"
            videoSrc="https://api.getlayers.ai/storage/v1/object/public/public/assets/marcus-vane-6799bd1fb6/hero/hero.mp4"
            poster="https://api.getlayers.ai/storage/v1/object/public/public/assets/marcus-vane-6799bd1fb6/hero/portrait.webp"
            alt="Marcus Vane / Alex Chen Portrait"
            mode="bare"
            maxScale={30}
            parallaxOffset={heroParallaxY * 0.4}
            parallaxScale={1.03}
            objectFit="cover"
            objectPosition="center bottom"
            className="w-full h-full"
          />
        </div>

        {/* Foreground giant name <h1>: Two stacked lines in front of portrait with Parallax Depth */}
        <div 
          ref={heroNameWrapperRef}
          className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center select-none pointer-events-none pb-2 will-change-transform transition-transform duration-75"
        >
          <h1 className="flex flex-col items-center font-display uppercase tracking-tighter text-[#ff3b1d] leading-[0.76] text-center w-full">
            <span 
              ref={nameLine1Ref} 
              className="block text-[22vw] sm:text-[18vw] lg:text-[16vw] overflow-hidden drop-shadow-[0_10px_30px_rgba(255,59,29,0.15)]"
            >
              MARCUS
            </span>
            <span 
              ref={nameLine2Ref} 
              className="block text-[22vw] sm:text-[18vw] lg:text-[16vw] overflow-hidden -mt-[2vw] drop-shadow-[0_10px_30px_rgba(255,59,29,0.2)]"
            >
              VANE
            </span>
          </h1>
        </div>

        {/* Gradient base: melts portrait & name into page canvas */}
        <div 
          className="absolute inset-x-0 bottom-0 z-20 h-40 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--background) 85%)' }}
        />

        {/* Scroll cue (bottom left) */}
        <div 
          ref={scrollCueRef}
          className="relative z-30 flex items-center gap-3 pt-6 text-[11px] font-mono tracking-[0.22em] uppercase text-[#807f78] opacity-0"
        >
          <div className="w-8 h-[1.5px] bg-[#ff3b1d]" />
          <span>SCROLL TO EXPLORE // 向下滚动探索</span>
        </div>
      </section>


      {/* ============================================================ */}
      {/* 2. INFINITE MARQUEE TRACK                                    */}
      {/* ============================================================ */}
      <section aria-label="Operating principles" className="overflow-hidden border-y border-[rgba(243,241,234,0.1)] py-6 sm:py-8 bg-[#08080a]">
        <div className="animate-marquee select-none">
          {[1, 2].map((loopIdx) => (
            <div key={loopIdx} className="flex items-center flex-nowrap shrink-0">
              {['BUILD BOLD', 'SCALE RELENTLESSLY', 'THINK IN DECADES', 'BET ON PEOPLE', 'SHIP THE FUTURE'].map((phrase) => (
                <div key={`${loopIdx}-${phrase}`} className="flex items-center">
                  <span className="font-display text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#f3f1ea] px-6">
                    {phrase}
                  </span>
                  <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#ff3b1d] mx-2 shrink-0" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>


      {/* ============================================================ */}
      {/* 3. THE STORY / PRINCIPLES                                    */}
      {/* ============================================================ */}
      <section id="story" className="py-8 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Heading & Vision */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-[#807f78]">
              <span className="w-2 h-2 rounded-full bg-[#ff3b1d]" />
              <span>THE STORY // 架构与创业哲学</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#f3f1ea] leading-[0.95] max-w-lg">
              Conviction is a competitive advantage.
            </h2>

            <p className="text-sm sm:text-base text-[#807f78] leading-relaxed max-w-lg">
              For seven years I've backed the version of the future most people couldn't see yet. From low-level distributed protocols to AI Agent automated pipelines, the through-line never changed: find the hard problem everyone avoids, assemble the team nobody else could, and out-stubborn the doubt.
            </p>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={() => setActivePage('about')}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#ff3b1d] hover:text-[#ff6a3d] group"
              >
                <span>阅读完整履历与技术经历</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: 4 Operating Principles */}
          <div className="lg:col-span-6 space-y-2 divide-y divide-[rgba(243,241,234,0.1)]">
            {[
              {
                num: '01',
                title: 'Move before it\'s obvious',
                text: 'The best opportunities look like mistakes right up until they look inevitable. I commit while the room is still hesitating.'
              },
              {
                num: '02',
                title: 'Hire founders, not employees',
                text: 'I build teams of people who would start their own thing — then give them a reason not to. Ownership compounds faster than talent alone.'
              },
              {
                num: '03',
                title: 'Distribution is the product',
                text: 'Genius unshipped is a hobby. Every venture is engineered around how it reaches the people it was built for.'
              },
              {
                num: '04',
                title: 'Play the long game loudly',
                text: 'Patience and ambition are not opposites. I think in decades and act with urgency every single day.'
              },
            ].map((principle) => (
              <div 
                key={principle.num}
                className="pt-6 pb-6 grid grid-cols-[auto_1fr] gap-6 items-start group"
              >
                <div className="font-mono text-xl sm:text-2xl font-bold text-[#ff3b1d] group-hover:scale-110 transition-transform">
                  {principle.num}
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight text-[#f3f1ea] group-hover:text-[#ff3b1d] transition-colors">
                    {principle.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#807f78] leading-relaxed">
                    {principle.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ============================================================ */}
      {/* 4. SELECTED VENTURES (PROJECTS)                              */}
      {/* ============================================================ */}
      <section id="ventures" className="py-8 sm:py-16">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[rgba(243,241,234,0.1)] pb-8 mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-[#807f78]">
              <span className="w-2 h-2 rounded-full bg-[#ff3b1d]" />
              <span>SELECTED VENTURES // 精选代表作</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#f3f1ea] leading-[0.95]">
              The work that moved markets.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#111114] border border-[rgba(243,241,234,0.12)] text-[11px] font-mono text-[#807f78]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b1d] animate-pulse" />
              <span>SCROLL PARALLAX ACTIVE // 滚动视差已激活</span>
            </div>

            <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#807f78]">
              0{data.projects.length} / PROJECTS
            </span>
            <button
              onClick={() => setActivePage('projects')}
              className="text-xs font-mono text-[#ff3b1d] hover:text-[#ff6a3d] flex items-center gap-1"
            >
              <span>查看全部合集</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2-Column Asymmetric Grid with Staggered Offsets & Scroll-Based Parallax */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14">
          {data.projects.slice(0, 4).map((project, index) => {
            const isOffset = index % 2 === 1;
            const assetUrl = ventureAssets[index % ventureAssets.length];

            return (
              <ProjectParallaxCard
                key={project.id}
                project={project}
                index={index}
                assetUrl={assetUrl}
                isOffset={isOffset}
                onClick={() => setSelectedProject(project)}
              />
            );
          })}
        </div>
      </section>


      {/* ============================================================ */}
      {/* 5. IMPACT (BY THE NUMBERS)                                   */}
      {/* ============================================================ */}
      <section id="impact" className="py-8 sm:py-16">
        
        <div className="space-y-3 mb-10">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-[#807f78]">
            <span className="w-2 h-2 rounded-full bg-[#ff3b1d]" />
            <span>BY THE NUMBERS // 关键量化指标</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#f3f1ea] leading-[1]">
            Two decades, measured.
          </h2>
        </div>

        {/* 4 Stat Metric Blocks with Hover Transition */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-[rgba(243,241,234,0.1)]">
          {[
            { value: '4', label: 'Companies founded & exited / 核心高可用系统从0到1交付' },
            { value: '$3.2B', label: 'Enterprise value created / 压测单机 QPS 8.5W+ 零雪崩' },
            { value: '120M+', label: 'People served / 开源生态 GitHub Stars 累计超 1.5万' },
            { value: '2,400', label: 'Jobs created / 带领多梯队工程研发团队跨周期交付' }
          ].map((stat, i) => (
            <div
              key={stat.value}
              className={`p-6 sm:p-8 flex flex-col justify-between gap-4 border-b border-[rgba(243,241,234,0.1)] ${
                i > 0 ? 'sm:border-l border-[rgba(243,241,234,0.1)]' : ''
              } group hover:bg-[#111114] transition-colors`}
            >
              <dd className="font-display text-5xl sm:text-6xl lg:text-7xl text-[#f3f1ea] group-hover:text-[#ff3b1d] transition-colors tracking-tight">
                {stat.value}
              </dd>
              <dt className="text-xs font-mono uppercase tracking-wider text-[#807f78] leading-relaxed">
                {stat.label}
              </dt>
            </div>
          ))}
        </div>
      </section>


      {/* ============================================================ */}
      {/* 6. VOICES (TESTIMONIALS WITH WORD-BY-WORD ANIME.JS)          */}
      {/* ============================================================ */}
      <section id="voices" className="py-8 sm:py-16">
        
        <div className="space-y-3 mb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-[#807f78]">
            <span className="w-2 h-2 rounded-full bg-[#ff3b1d]" />
            <span>VOICES // 同行评价与行业背书</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#f3f1ea] leading-[1]">
            What they say.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Selector list of 3 voices (Left) */}
          <div className="lg:col-span-5 divide-y divide-[rgba(243,241,234,0.1)] border-y border-[rgba(243,241,234,0.1)]">
            {voices.map((v, idx) => {
              const isActive = activeVoiceIndex === idx;
              return (
                <button
                  key={v.id}
                  onClick={() => setActiveVoiceIndex(idx)}
                  onMouseEnter={() => setActiveVoiceIndex(idx)}
                  className={`w-full py-6 flex items-start justify-between gap-4 text-left transition-all ${
                    isActive ? 'opacity-100' : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-xs ${isActive ? 'text-[#ff3b1d]' : 'text-[#807f78]'}`}>
                        {v.id}
                      </span>
                      <span className={`font-display text-2xl uppercase tracking-tight ${isActive ? 'text-[#f3f1ea]' : 'text-[#807f78]'}`}>
                        {v.name}
                      </span>
                    </div>
                    <div className="text-xs font-mono uppercase tracking-wider text-[#807f78] pl-7">
                      {v.role}
                    </div>
                  </div>

                  <div 
                    className={`h-[1.5px] self-center bg-[#ff3b1d] transition-all duration-300 ${
                      isActive ? 'w-10 opacity-100' : 'w-0 opacity-0'
                    }`} 
                  />
                </button>
              );
            })}
          </div>

          {/* Featured panel with Portrait & Animated Quote (Right) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-8 items-start p-8 rounded-sm bg-[#111114] border border-[rgba(243,241,234,0.1)]">
            {/* Quote container with Anime.js word reveal */}
            <div className="space-y-6 order-2 sm:order-1">
              <Quote className="w-8 h-8 text-[#ff3b1d] opacity-60" />
              
              <p
                ref={quoteTextRef}
                className="font-sans text-xl sm:text-2xl font-medium leading-snug text-[#f3f1ea] min-h-[110px]"
              >
                “{activeVoice.quote}”
              </p>

              <div className="pt-4 border-t border-[rgba(243,241,234,0.1)] text-xs font-mono uppercase tracking-wider text-[#807f78]">
                <span className="text-[#f3f1ea] font-bold">{activeVoice.name}</span> — {activeVoice.role}
              </div>
            </div>

            {/* Liquid Portrait corresponding to active voice */}
            <div className="w-full sm:w-44 shrink-0 order-1 sm:order-2">
              <LiquidImage
                src={activeVoice.image}
                alt={activeVoice.name}
                aspectRatio="4/5"
                maxScale={22}
                className="rounded-sm border border-[rgba(243,241,234,0.15)] shadow-xl"
              />
            </div>
          </div>

        </div>
      </section>


      {/* ============================================================ */}
      {/* 7. KNOWLEDGE BASE & TOOLBOX PREVIEWS                         */}
      {/* ============================================================ */}
      <section className="py-8 border-t border-[rgba(243,241,234,0.1)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Latest Articles */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-[#807f78]">
                <BookOpen className="w-3.5 h-3.5 text-[#ff3b1d]" />
                <span>KNOWLEDGE // 最新技术文章</span>
              </div>
              <button
                onClick={() => setActivePage('articles')}
                className="text-xs font-mono text-[#ff3b1d] hover:underline"
              >
                全部文章 →
              </button>
            </div>

            <div className="space-y-3">
              {data.articles.slice(0, 3).map((art) => (
                <div
                  key={art.id}
                  onClick={() => setActivePage('articles')}
                  className="p-5 rounded-sm bg-[#111114] border border-[rgba(243,241,234,0.08)] hover:border-[#ff3b1d] cursor-pointer transition-all group space-y-2"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-[#807f78]">
                    <span className="text-[#ff3b1d]">{art.category}</span>
                    <span>{art.publishDate}</span>
                  </div>
                  <h4 className="font-display text-lg uppercase tracking-tight text-[#f3f1ea] group-hover:text-[#ff3b1d] transition-colors">
                    {art.title}
                  </h4>
                  <p className="text-xs text-[#807f78] line-clamp-1">
                    {art.excerpt}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Curated Toolbox */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-[#807f78]">
                <Wrench className="w-3.5 h-3.5 text-[#ff3b1d]" />
                <span>TOOLBOX // 工程师武器库</span>
              </div>
              <button
                onClick={() => setActivePage('tools')}
                className="text-xs font-mono text-[#ff3b1d] hover:underline"
              >
                全部工具 →
              </button>
            </div>

            <div className="space-y-3">
              {data.tools.slice(0, 3).map((tool) => (
                <div
                  key={tool.id}
                  className="p-5 rounded-sm bg-[#111114] border border-[rgba(243,241,234,0.08)] flex items-center justify-between gap-4 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-lg uppercase tracking-tight text-[#f3f1ea] group-hover:text-[#ff3b1d] transition-colors">
                        {tool.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#17171b] text-[#807f78]">
                        {tool.categoryName}
                      </span>
                    </div>
                    <p className="text-xs text-[#807f78] line-clamp-1">{tool.purpose}</p>
                  </div>

                  <a
                    href={tool.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded bg-[#17171b] hover:bg-[#ff3b1d] text-[#807f78] hover:text-[#08080a] transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* ============================================================ */}
      {/* 8. CONTACT / LET'S BUILD                                     */}
      {/* ============================================================ */}
      <section id="contact" className="pt-12 sm:pt-20 border-t border-[rgba(243,241,234,0.1)] space-y-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-[#807f78]">
            <span className="w-2 h-2 rounded-full bg-[#ff3b1d]" />
            <span>LET'S BUILD // 商务合作与技术咨询</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#f3f1ea] leading-[0.95] max-w-2xl">
            Have something the world says can't be done?
          </h2>
          <p className="text-sm sm:text-base text-[#807f78] max-w-lg leading-relaxed">
            That's usually where I start. I read every message I'm sent. Whether it's high-concurrency systems, AI agent workflows, or strategic leadership, feel free to reach out.
          </p>
        </div>

        {/* Email with Hover Spring translateX(14px) and color shift */}
        <div className="pt-4">
          <a
            href={`mailto:${data.profile.email}`}
            className="group inline-flex items-center gap-3 font-sans text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f3f1ea] hover:text-[#ff3b1d] transition-all duration-300 hover:translate-x-3.5"
          >
            <span>{data.profile.email}</span>
            <span className="text-[#ff3b1d] group-hover:translate-x-1 transition-transform">↗</span>
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-6">
          <button
            onClick={() => setIsElevatorOpen(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#ff3b1d] text-[#08080a] font-display text-base tracking-wide uppercase font-bold shadow-[0_0_25px_rgba(255,59,29,0.3)] hover:bg-[#ff6a3d] transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>打开 30 秒评估报告卡</span>
          </button>

          <button
            onClick={() => setIsResumeOpen(true)}
            className="px-6 py-3 rounded-full bg-[#111114] border border-[rgba(243,241,234,0.15)] text-[#f3f1ea] font-mono text-xs uppercase tracking-wider hover:border-[#f3f1ea] transition-all"
          >
            查看标准版简历 (PDF导出)
          </button>
        </div>
      </section>

      {/* ============================================================ */}
      {/* ARCHITECTURE DETAIL MODAL (WHEN A PROJECT CARD IS CLICKED)    */}
      {/* ============================================================ */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#08080a] border border-[#ff3b1d]/40 rounded-sm p-6 sm:p-8 space-y-6 text-[#f3f1ea]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono text-[#ff3b1d] uppercase tracking-widest">
                  {selectedProject.categoryName} · {selectedProject.date}
                </span>
                <h3 className="font-display text-3xl sm:text-4xl uppercase tracking-tight text-[#f3f1ea] mt-1">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-[#807f78] hover:text-[#f3f1ea] font-mono text-xs px-2.5 py-1 border border-[rgba(243,241,234,0.15)] rounded"
              >
                ESC / CLOSE
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#807f78] leading-relaxed border-t border-[rgba(243,241,234,0.1)] pt-4">
              <div>
                <span className="font-mono text-[#f3f1ea] block uppercase tracking-wider mb-1">【系统背景与痛点】</span>
                <p>{selectedProject.background}</p>
              </div>

              <div>
                <span className="font-mono text-[#f3f1ea] block uppercase tracking-wider mb-1">【研发职责与角色】</span>
                <p className="text-[#f3f1ea]">{selectedProject.role}</p>
              </div>

              <div>
                <span className="font-mono text-[#f3f1ea] block uppercase tracking-wider mb-2">【技术栈支撑】</span>
                <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                  {selectedProject.techStack.map((tech) => (
                    <span key={tech} className="px-2 py-1 rounded bg-[#17171b] border border-[rgba(243,241,234,0.1)] text-[#ff6a3d]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-mono text-[#f3f1ea] block uppercase tracking-wider mb-2">【量化成果与指标】</span>
                <ul className="space-y-1.5">
                  {selectedProject.achievements.map((ach, i) => (
                    <li key={i} className="flex items-center gap-2 text-[#f3f1ea]">
                      <CheckCircle className="w-3.5 h-3.5 text-[#ff3b1d] shrink-0" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[rgba(243,241,234,0.1)]">
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded bg-[#17171b] hover:bg-[#232328] text-xs font-mono text-[#f3f1ea] transition-colors"
                >
                  GitHub 代码库 ↗
                </a>
              )}
              {selectedProject.demoUrl && (
                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded bg-[#ff3b1d] hover:bg-[#ff6a3d] text-xs font-mono font-bold text-[#08080a] transition-colors"
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
