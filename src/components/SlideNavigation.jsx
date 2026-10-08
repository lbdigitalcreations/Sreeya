import React from 'react';
import { ChevronLeft, ChevronRight, Lock, RefreshCw } from 'lucide-react';
import { audioEngine } from '../services/audioService';

export const SlideNavigation = ({ currentPage, totalPages, isNextLocked, onNext, onBack, onNavigatePage }) => {
  const handleNextClick = () => {
    audioEngine.playPopFX();
    onNext();
  };

  const handleBackClick = () => {
    audioEngine.playPopFX();
    onBack();
  };

  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 px-4 pointer-events-none">
      <div className="max-w-xl mx-auto glass-pill px-4 sm:px-6 py-2.5 rounded-full border border-pink-500/40 shadow-[0_10px_30px_rgba(139,0,0,0.6)] backdrop-blur-xl flex items-center justify-between pointer-events-auto">

        {/* Back Button */}
        {currentPage > 1 ? (
          <button
            onClick={handleBackClick}
            className="flex items-center gap-1 px-3 sm:px-4 py-1.5 rounded-full bg-black/40 hover:bg-pink-900/60 text-pink-200 hover:text-white font-semibold text-xs sm:text-sm border border-pink-500/30 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        ) : (
          <div className="w-16 sm:w-20" /> // Spacer for alignment
        )}

        {/* Center Page Indicator Dots & Counter */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              const isActive = currentPage === pageNum;
              const isLockedDot = pageNum > 2 && isNextLocked;
              return (
                <button
                  key={pageNum}
                  onClick={() => {
                    audioEngine.playPopFX();
                    onNavigatePage(pageNum);
                  }}
                  className={`rounded-full transition-all cursor-pointer flex items-center justify-center ${
                    isActive
                      ? 'w-6 sm:w-8 h-2.5 bg-gradient-to-r from-[#FF1744] to-[#FF69B4] shadow-[0_0_10px_#FF1744]'
                      : isLockedDot
                      ? 'w-2.5 h-2.5 bg-pink-950/80 border border-pink-700/60 opacity-60'
                      : 'w-2.5 h-2.5 bg-pink-900/60 hover:bg-pink-400/80'
                  }`}
                  title={isLockedDot ? "Blow candles first to unlock!" : `Go to Page ${pageNum}`}
                />
              );
            })}
          </div>

          <span className="text-[11px] font-bold tracking-widest text-pink-300 uppercase">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        {/* Next / Restart Button */}
        {currentPage < totalPages ? (
          <button
            onClick={handleNextClick}
            className={`flex items-center gap-1 px-3 sm:px-5 py-1.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
              isNextLocked
                ? 'bg-[#2b000a]/90 text-pink-300/50 border-pink-900/50 opacity-70 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#DC143C] via-[#FF1744] to-[#FF69B4] text-white shadow-[0_0_15px_rgba(255,23,68,0.6)] hover:scale-105 cursor-pointer border-pink-300/40'
            }`}
          >
            <span>Next</span>
            {isNextLocked ? (
              <Lock className="w-3.5 h-3.5 text-pink-400/70" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        ) : (
          <button
            onClick={() => {
              audioEngine.playSparkleFX();
              onNavigatePage(1);
            }}
            className="flex items-center gap-1 px-3 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-600 text-white font-bold text-xs sm:text-sm shadow-[0_0_15px_rgba(255,215,0,0.6)] hover:scale-105 transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Restart</span>
          </button>
        )}

      </div>
    </div>
  );
};
