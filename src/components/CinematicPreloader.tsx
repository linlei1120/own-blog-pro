import React, { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';

interface CinematicPreloaderProps {
  onComplete: () => void;
  brandText?: string;
}

export const CinematicPreloader: React.FC<CinematicPreloaderProps> = ({
  onComplete,
  brandText = 'ALEX CHEN · MARCUS VANE'
}) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const labelsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Prevent scrolling while preloader is active
    document.body.style.overflow = 'hidden';

    const counter = { val: 0 };
    
    // Anime.js count-up animation 0 -> 100
    const countAnim = animate(counter, {
      val: 100,
      duration: 1800,
      ease: 'cubicBezier(0.25, 1, 0.5, 1)',
      onRender: () => {
        setProgress(Math.floor(counter.val));
      }
    });

    countAnim.then(() => {
      setProgress(100);

      // Fade out labels
      if (labelsRef.current) {
        animate(labelsRef.current, {
          opacity: [1, 0],
          duration: 280,
          ease: 'easeOutQuad'
        });
      }

      // Delay 200ms, then wipe whole preloader upward
      setTimeout(() => {
        if (containerRef.current) {
          animate(containerRef.current, {
            translateY: ['0%', '-100%'],
            duration: 650,
            ease: 'cubicBezier(0.22, 1, 0.36, 1)'
          }).then(() => {
            document.body.style.overflow = '';
            setIsDone(true);
            onComplete();
          });
        }
      }, 200);
    });

    return () => {
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  const handleSkip = () => {
    if (containerRef.current) {
      animate(containerRef.current, {
        translateY: ['0%', '-100%'],
        duration: 400,
        ease: 'cubicBezier(0.22, 1, 0.36, 1)'
      }).then(() => {
        document.body.style.overflow = '';
        setIsDone(true);
        onComplete();
      });
    }
  };

  if (isDone) return null;

  return (
    <aside
      ref={containerRef}
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[100] flex flex-col justify-between p-6 sm:p-12 md:p-16 bg-[#08080a] text-[#f3f1ea] select-none pointer-events-auto"
    >
      {/* Top right quick skip button */}
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#ff3b1d] animate-pulse" />
          <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#807f78] uppercase">
            INITIALIZING TECHNICAL BRAND ENGINE
          </span>
        </div>

        <button
          onClick={handleSkip}
          className="text-[11px] font-mono tracking-wider uppercase text-[#807f78] hover:text-[#ff3b1d] transition-colors px-3 py-1 rounded border border-[#232328] hover:border-[#ff3b1d]"
        >
          SKIP INTRO [ESC]
        </button>
      </div>

      {/* Bottom labels bar */}
      <div
        ref={labelsRef}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 w-full"
      >
        <div className="space-y-1">
          <div className="text-2xl sm:text-3xl md:text-4xl font-display uppercase tracking-tight text-[#f3f1ea]">
            {brandText}
          </div>
          <div className="text-xs sm:text-sm font-sans text-[#807f78] tracking-widest uppercase">
            FOUNDER · OPERATOR · ARCHITECT
          </div>
        </div>

        <div className="flex items-baseline font-display text-6xl sm:text-8xl md:text-9xl tracking-tighter text-[#f3f1ea] tabular-nums leading-none">
          <span>{progress.toString().padStart(2, '0')}</span>
          <span className="text-[#ff3b1d] ml-1 text-5xl sm:text-7xl md:text-8xl">%</span>
        </div>
      </div>
    </aside>
  );
};
