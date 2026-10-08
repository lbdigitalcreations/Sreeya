import React from 'react';
import { Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full relative z-20 py-4 px-4 text-center border-t border-white/10 bg-black/20 backdrop-blur-sm mt-auto">
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-1.5 text-xs text-pink-200/80">
        <span>Made with</span>
        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse inline" />
        <span>by</span>
        <a
          href="https://lbdigitalcreations.in"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-white hover:text-pink-300 transition-colors underline decoration-pink-400/50 underline-offset-2 cursor-pointer"
        >
          LB Digital Creations
        </a>
      </div>
    </footer>
  );
};
