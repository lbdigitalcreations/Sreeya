import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Heart, Cake, Image, MessageSquare, Sparkles, Home, Calendar } from 'lucide-react';
import { audioEngine } from '../services/audioService';

export const Navbar = ({ friendName, currentPage, totalPages, onNavigatePage }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsub = audioEngine.subscribe((state) => setIsPlaying(state));
    return () => {
      unsub();
    };
  }, []);

  const toggleMusic = () => {
    audioEngine.toggleMusic();
  };

  const navLinks = [
    { page: 1, name: 'Home', icon: Home },
    { page: 2, name: 'Cake', icon: Cake },
    { page: 3, name: 'Gallery', icon: Image },
    { page: 4, name: 'Letter', icon: MessageSquare },
    { page: 5, name: 'Fireworks', icon: Sparkles },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-30 transition-all duration-500 bg-transparent py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Title */}
        <button
          onClick={() => onNavigatePage(1)}
          className="flex items-center gap-2 group text-left cursor-pointer"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#DC143C] via-[#FF1744] to-[#FF69B4] flex items-center justify-center shadow-[0_0_15px_rgba(255,23,68,0.8)] group-hover:scale-110 transition-transform">
            <Heart className="w-5 h-5 text-white fill-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-serif text-base sm:text-xl font-bold bg-gradient-to-r from-white via-pink-200 to-pink-400 bg-clip-text text-transparent">
                {friendName}'s Day
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/30 to-pink-500/30 border border-amber-300/40 text-amber-200 text-[10px] sm:text-[11px] font-bold shadow-sm">
                <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-300" />
                <span>Tomorrow, Oct 9th</span>
              </span>
            </div>
            <span className="text-[10px] block text-pink-400/80 uppercase tracking-widest font-semibold">
              Page {currentPage} of {totalPages}
            </span>
          </div>
        </button>

        {/* Chapter Quick Jump Pills (Desktop / Tablet) */}
        <nav className="hidden md:flex items-center gap-1 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 shadow-md">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.page}
                onClick={() => onNavigatePage(link.page)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#DC143C] to-[#FF69B4] text-white shadow-[0_0_12px_rgba(255,23,68,0.5)] scale-105'
                    : 'text-pink-200/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls (Music + Settings) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Music Button */}
          <button
            onClick={toggleMusic}
            title={isPlaying ? "Mute Background Music" : "Play Birthday Song"}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full font-medium text-xs sm:text-sm transition-all shadow-lg border cursor-pointer ${
              isPlaying
                ? 'bg-gradient-to-r from-[#DC143C] to-[#FF69B4] text-white border-pink-300/60 shadow-[0_0_20px_rgba(255,105,180,0.6)] animate-pulse'
                : 'bg-black/30 text-pink-200 border-white/20 hover:border-pink-300 hover:text-white'
            }`}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-white animate-bounce" />
                <span className="hidden sm:inline">Music ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-pink-300" />
                <span className="hidden sm:inline">Play Music 🎵</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
