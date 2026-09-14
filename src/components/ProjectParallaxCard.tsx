import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Layers, Scan } from 'lucide-react';
import { ProjectItem } from '../types';
import { LiquidImage } from './LiquidImage';

interface ProjectParallaxCardProps {
  project: ProjectItem;
  index: number;
  assetUrl: string;
  isOffset: boolean;
  onClick: () => void;
}

export const ProjectParallaxCard: React.FC<ProjectParallaxCardProps> = ({
  project,
  index,
  assetUrl,
  isOffset,
  onClick
}) => {
  const cardRef = useRef<HTMLElement | null>(null);
  const [parallaxY, setParallaxY] = useState(0);
  const [depthNormalized, setDepthNormalized] = useState(0);

  useEffect(() => {
    let rafId: number;
    let lastY = 0;

    const updateParallax = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only calculate if the card is in or near the viewport
      if (rect.bottom >= -100 && rect.top <= windowHeight + 100) {
        const cardCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        // Normalized progress: -1 (near top of viewport) to +1 (near bottom of viewport)
        const progress = Math.max(-1.5, Math.min(1.5, (cardCenter - viewportCenter) / (windowHeight / 2)));
        
        // Asymmetrical shift factor: even cards shift ~24px, odd (offset) cards shift ~34px
        const maxShift = isOffset ? 34 : 24;
        const targetY = -progress * maxShift;

        if (Math.abs(targetY - lastY) > 0.3) {
          lastY = targetY;
          setParallaxY(Math.round(targetY * 10) / 10);
          setDepthNormalized(Math.round((-progress) * 100) / 100);
        }
      }
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateParallax);
    };

    // Run initial calculation
    updateParallax();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Also attach to smooth scroll engine (Lenis) if present
    const lenis = (window as any).lenis;
    if (lenis && typeof lenis.on === 'function') {
      lenis.on('scroll', handleScroll);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (lenis && typeof lenis.off === 'function') {
        lenis.off('scroll', handleScroll);
      }
    };
  }, [isOffset]);

  const formattedIndex = index < 9 ? `0${index + 1}` : `${index + 1}`;

  return (
    <article
      ref={cardRef}
      onClick={onClick}
      className={`group cursor-pointer flex flex-col justify-between relative ${
        isOffset ? 'md:mt-20' : ''
      }`}
    >
      {/* Visual Image Frame with Liquid Shader & Scroll-Based Parallax */}
      <div className="relative rounded-sm overflow-hidden border border-[rgba(243,241,234,0.1)] group-hover:border-[#ff3b1d] transition-colors duration-500 bg-[#0d0d10]">
        
        {/* Liquid Image with internal parallax translation */}
        <LiquidImage
          src={assetUrl}
          alt={project.title}
          aspectRatio="16/11"
          maxScale={28}
          parallaxOffset={parallaxY}
          parallaxScale={1.16}
          placeholderLabel={project.title}
          className="w-full"
        />

        {/* HUD Tech Overlays: Parallax Depth Indicator & Viewport Crosshairs */}
        <div className="absolute inset-0 pointer-events-none p-3.5 flex flex-col justify-between z-20">
          {/* Top HUD Row: Index & Real-time Parallax Shift Monitor */}
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-widest bg-[rgba(8,8,10,0.85)] backdrop-blur-md text-[#f3f1ea] border border-[rgba(243,241,234,0.15)] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b1d] animate-pulse" />
              <span>SYS // {formattedIndex}</span>
            </span>

            <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider bg-[rgba(8,8,10,0.85)] backdrop-blur-md text-[#807f78] group-hover:text-[#ff3b1d] border border-[rgba(243,241,234,0.15)] group-hover:border-[#ff3b1d]/40 transition-colors flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-[#ff3b1d]" />
              <span className="tabular-nums">
                Z-SHIFT {parallaxY > 0 ? `+${parallaxY.toFixed(0)}` : parallaxY.toFixed(0)}PX
              </span>
            </span>
          </div>

          {/* Bottom HUD Row: Optical Coordinate & Scan Target */}
          <div className="flex items-end justify-between opacity-75 group-hover:opacity-100 transition-opacity">
            <div className="text-[9px] font-mono text-[#807f78] bg-[rgba(8,8,10,0.7)] px-2 py-0.5 rounded backdrop-blur-sm border border-[rgba(243,241,234,0.1)]">
              DEPTH RATIO: {depthNormalized > 0 ? `+${depthNormalized.toFixed(2)}` : depthNormalized.toFixed(2)}
            </div>

            <div className="w-7 h-7 rounded-full bg-[rgba(8,8,10,0.8)] border border-[rgba(243,241,234,0.2)] group-hover:border-[#ff3b1d] group-hover:bg-[#ff3b1d] text-[#807f78] group-hover:text-[#08080a] flex items-center justify-center transition-all duration-300">
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* Futuristic Corner Tech Accents */}
        <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-[#ff3b1d]/40 pointer-events-none" />
        <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-[#ff3b1d]/40 pointer-events-none" />
        <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-[#ff3b1d]/40 pointer-events-none" />
        <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-[#ff3b1d]/40 pointer-events-none" />
      </div>

      {/* Project Metadata Row */}
      <div className="pt-5 border-t border-[rgba(243,241,234,0.1)] mt-5 flex items-start justify-between gap-4">
        <div className="space-y-1.5 flex-1">
          <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-[#f3f1ea] group-hover:text-[#ff3b1d] transition-colors flex items-center gap-2">
            <span>{project.title}</span>
            <span className="text-xs font-mono text-[#807f78] group-hover:text-[#ff3b1d] transition-colors">
              ↗
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-[#807f78] line-clamp-2 leading-relaxed">
            {project.tagline || project.background}
          </p>
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#807f78] pt-1 flex items-center gap-2">
            <span className="text-[#ff3b1d]">●</span>
            <span>{project.categoryName}</span>
            <span>·</span>
            <span>{project.role}</span>
          </div>
        </div>

        <div className="text-right shrink-0">
          <div className="text-xs font-mono text-[#807f78] uppercase tracking-wider">
            {project.date}
          </div>
          <div className="mt-1 text-xs font-mono font-semibold uppercase tracking-wider text-[#ff3b1d]">
            {project.achievements[0] ? project.achievements[0].slice(0, 18) : 'ACTIVE'}
          </div>
        </div>
      </div>
    </article>
  );
};
