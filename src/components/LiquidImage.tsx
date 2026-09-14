import React, { useId, useRef } from 'react';
import { animate } from 'animejs';

interface LiquidImageProps {
  src?: string;
  videoSrc?: string;
  alt?: string;
  poster?: string;
  className?: string;
  aspectRatio?: string;
  mode?: 'bare' | 'full';
  maxScale?: number;
  objectFit?: 'cover' | 'contain';
  objectPosition?: string;
  placeholderLabel?: string;
  parallaxOffset?: number;
  parallaxScale?: number;
}

export const LiquidImage: React.FC<LiquidImageProps> = ({
  src,
  videoSrc,
  alt = 'Image',
  poster,
  className = '',
  aspectRatio,
  mode = 'full',
  maxScale = 28,
  objectFit = 'cover',
  objectPosition = 'center',
  placeholderLabel,
  parallaxOffset,
  parallaxScale = 1.15
}) => {
  const uniqueId = useId().replace(/[:]/g, '');
  const filterId = `liquid-filter-${uniqueId}`;
  
  const turbulenceRef = useRef<SVGFETurbulenceElement | null>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const animRef = useRef<any>(null);

  const handleMouseEnter = () => {
    if (window.innerWidth <= 768) return; // Desktop only
    if (!displacementRef.current || !turbulenceRef.current) return;

    if (animRef.current) {
      animRef.current.revert?.();
    }

    const state = {
      scale: parseFloat(displacementRef.current.getAttribute('scale') || '1'),
      freq: parseFloat(turbulenceRef.current.getAttribute('baseFrequency') || '0.009')
    };

    animRef.current = animate(state, {
      scale: maxScale,
      freq: 0.022,
      duration: 520,
      ease: 'easeOutElastic(1, 0.5)',
      onRender: () => {
        if (displacementRef.current) {
          displacementRef.current.setAttribute('scale', state.scale.toFixed(2));
        }
        if (turbulenceRef.current) {
          turbulenceRef.current.setAttribute('baseFrequency', state.freq.toFixed(4));
        }
      }
    });
  };

  const handleMouseLeave = () => {
    if (window.innerWidth <= 768) return;
    if (!displacementRef.current || !turbulenceRef.current) return;

    if (animRef.current) {
      animRef.current.revert?.();
    }

    const state = {
      scale: parseFloat(displacementRef.current.getAttribute('scale') || `${maxScale}`),
      freq: parseFloat(turbulenceRef.current.getAttribute('baseFrequency') || '0.022')
    };

    animRef.current = animate(state, {
      scale: 1,
      freq: 0.009,
      duration: 480,
      ease: 'easeOutQuad',
      onRender: () => {
        if (displacementRef.current) {
          displacementRef.current.setAttribute('scale', state.scale.toFixed(2));
        }
        if (turbulenceRef.current) {
          turbulenceRef.current.setAttribute('baseFrequency', state.freq.toFixed(4));
        }
      }
    });
  };

  const isBare = mode === 'bare';

  return (
    <figure
      role="img"
      aria-label={alt}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ aspectRatio }}
      className={`group relative overflow-hidden select-none ${
        isBare ? 'bg-transparent' : 'bg-[#111114]'
      } ${className}`}
    >
      {/* SVG Liquid Filter definition */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency="0.009"
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              ref={displacementRef}
              in="SourceGraphic"
              in2="noise"
              scale="1"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Media: Video or Image with optional Parallax translation */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-auto"
        style={{
          transform: parallaxOffset !== undefined 
            ? `translate3d(0, ${parallaxOffset}px, 0) scale(${parallaxScale})` 
            : undefined,
          willChange: parallaxOffset !== undefined ? 'transform' : undefined,
          transition: 'transform 0.08s ease-out',
        }}
      >
        {videoSrc ? (
          <video
            src={videoSrc}
            poster={poster || src}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{
              filter: `url(#${filterId})`,
              objectFit,
              objectPosition
            }}
            className="w-full h-full block pointer-events-auto"
          />
        ) : src ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            style={{
              filter: `url(#${filterId})`,
              objectFit,
              objectPosition
            }}
            className={`w-full h-full block transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-auto ${
              isBare ? '' : 'filter grayscale contrast-125 group-hover:grayscale-0'
            }`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#17171b] to-[#08080a] text-slate-500 font-mono text-xs uppercase tracking-widest">
            {placeholderLabel || alt}
          </div>
        )}
      </div>

      {/* Non-bare Overlays: Grayscale veil, Accent glow sweep, Vignette */}
      {!isBare && (
        <>
          {/* Subtle color blend veil */}
          <div 
            className="absolute inset-0 bg-[#08080a] mix-blend-color opacity-70 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" 
            aria-hidden="true" 
          />

          {/* Accent glow sweep on hover */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background: 'linear-gradient(120deg, transparent 30%, rgba(255, 59, 29, 0.25) 50%, transparent 70%)'
            }}
            aria-hidden="true"
          />

          {/* Persistent radial vignette */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(120% 120% at 50% 120%, rgba(8,8,10,0.7) 0%, transparent 60%)'
            }}
            aria-hidden="true"
          />
        </>
      )}
    </figure>
  );
};
