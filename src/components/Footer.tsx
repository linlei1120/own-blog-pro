import React from 'react';
import { usePortfolioData } from '../context/DataContext';

export const Footer: React.FC = () => {
  const { data, setActivePage } = usePortfolioData();

  const socialLinks = [
    { name: 'GitHub', url: data.profile.github || 'https://github.com' },
    { name: 'X / Twitter', url: 'https://x.com' },
    { name: 'LinkedIn', url: 'https://linkedin.com' },
    { name: 'Substack', url: 'https://substack.com' },
  ];

  return (
    <footer className="border-t border-[rgba(243,241,234,0.1)] bg-[#08080a] text-[#807f78] py-12 px-4 sm:px-8 md:px-12 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Signature & Motto */}
        <div className="lg:col-span-6 space-y-2">
          <p className="font-display text-3xl sm:text-4xl uppercase tracking-tight text-[#f3f1ea] leading-none">
            ALEX CHEN · MARCUS VANE
          </p>
          <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#807f78]">
            Designed & built with conviction.
          </p>
        </div>

        {/* Middle: Social Links with expanding accent rule */}
        <nav aria-label="Social" className="lg:col-span-3">
          <ul className="space-y-2.5">
            {socialLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#807f78] hover:text-[#f3f1ea] transition-colors"
                >
                  <span className="w-0 group-hover:w-5 h-[1.5px] bg-[#ff3b1d] transition-all duration-300" />
                  <span>{link.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: Copyright & CMS Entry */}
        <div className="lg:col-span-3 lg:text-right space-y-2">
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#807f78]">
            © 2026 Marcus Vane / Alex Chen.
          </p>
          <p className="text-[11px] font-mono text-[#807f78]">
            All rights reserved.
          </p>
          <button
            onClick={() => {
              setActivePage('admin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-[11px] font-mono text-[#ff3b1d] hover:underline pt-2 block lg:ml-auto"
          >
            → 进入后台管理系统 (CMS)
          </button>
        </div>

      </div>
    </footer>
  );
};
