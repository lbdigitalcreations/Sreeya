import React from 'react';
import { Heart, ExternalLink, Sparkles } from 'lucide-react';
import { getAssetUrl } from '../utils/assetHelper';

export const Footer = () => {
  return (
    <footer className="w-full relative z-20 py-8 px-4 border-t border-white/10 bg-black/30 backdrop-blur-md mt-auto">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        {/* Brand & Logo */}
        <a
          href="https://lbdigitalcreations.in"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3.5 hover:opacity-95 transition-all cursor-pointer"
        >
          <div className="relative">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-pink-400/50 shadow-[0_0_15px_rgba(255,105,180,0.4)] group-hover:border-pink-300 group-hover:scale-105 transition-all bg-black/40">
              <img
                src={getAssetUrl('logo.jpeg')}
                alt="LB Digital Creations Logo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-tr from-[#DC143C] to-[#FF69B4] flex items-center justify-center border border-white/40 shadow-sm">
              <Sparkles className="w-2.5 h-2.5 text-white" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 justify-center sm:justify-start">
              <span className="text-[11px] uppercase tracking-widest text-pink-300/80 font-semibold">
                Designed & Crafted by
              </span>
            </div>
            <div className="flex items-center gap-1.5 justify-center sm:justify-start group-hover:text-pink-200 transition-colors">
              <span className="font-serif font-bold text-base sm:text-lg bg-gradient-to-r from-white via-pink-200 to-rose-300 bg-clip-text text-transparent">
                LB Digital Creations
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-pink-300 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </div>
        </a>

        {/* Link & Love Note */}
        <div className="flex flex-col sm:items-end items-center gap-1">
          <a
            href="https://lbdigitalcreations.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-pink-100 bg-white/10 hover:bg-white/20 border border-white/15 transition-all shadow-sm hover:border-pink-400/50"
          >
            <span>Visit lbdigitalcreations.in</span>
            <ExternalLink className="w-3 h-3 text-pink-300" />
          </a>
          <p className="text-[11px] text-pink-300/60 flex items-center gap-1 mt-1">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline animate-pulse" />
            <span>for unforgettable celebrations</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
