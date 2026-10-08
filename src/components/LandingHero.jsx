import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart, Sparkles, RotateCcw, Volume2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../services/audioService';
import { HeartBlossomTree } from './HeartBlossomTree';
import { BowArrowIntro } from './BowArrowIntro';

export const LandingHero = ({ friendName = 'Sreenya', onOpenSurprise, customMessage, onCardUnlocked }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [showGiftBoxModal, setShowGiftBoxModal] = useState(false);

  // Triggered when arrow hits heart in BowArrowIntro
  const handleArrowShootComplete = () => {
    setIsOpened(true);
    if (onCardUnlocked) onCardUnlocked();
    fireCelebrationConfetti();
  };

  const handleReplayShoot = (e) => {
    if (e) e.stopPropagation();
    setIsOpened(false);
    audioEngine.playSparkleFX();
  };

  const fireCelebrationConfetti = () => {
    // Center burst
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#FF1744', '#FFD700', '#FF69B4', '#FFF0F5', '#FF85A1'],
    });

    // Left cannon
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 70,
        origin: { x: 0.1, y: 0.65 },
        colors: ['#FFD700', '#FF69B4', '#FF1744', '#FFFFFF'],
      });
    }, 250);

    // Right cannon
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 70,
        origin: { x: 0.9, y: 0.65 },
        colors: ['#FFD700', '#FF69B4', '#FF1744', '#FFFFFF'],
      });
    }, 400);
  };

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8 overflow-hidden z-10 select-none">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center relative">

        {/* Top Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 glass-pill px-5 py-2 rounded-full mb-6 shadow-[0_0_20px_rgba(255,23,68,0.4)]"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-pink-200 uppercase">
            {isOpened ? '✨ Birthday Card Unlocked ✨' : '🏹 Aim At The Heart To Begin ✨'}
          </span>
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
        </motion.div>

        {/* Main Content Area: Stage 1 Bow & Arrow VS Stage 2 Unboxed Card */}
        <div className="w-full flex flex-col items-center justify-center min-h-[460px]">
          <AnimatePresence mode="wait">
            {!isOpened ? (
              /* ================= 1. BOW & ARROW TARGETING HEART (MATCHING INSTAGRAM REEL) ================= */
              <motion.div
                key="bow-arrow-stage"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85, y: -30 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-2xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EF] to-[#F5ECE2] rounded-3xl p-2.5 sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6),0_0_40px_rgba(255,105,180,0.25)] border-2 sm:border-4 border-[#FDE047]/60 flex flex-col items-center relative overflow-hidden"
              >
                {/* Vintage filigrees */}
                <div className="absolute top-2 left-2 text-[#D97706] opacity-40 text-xs sm:text-sm font-serif pointer-events-none">❧</div>
                <div className="absolute top-2 right-2 text-[#D97706] opacity-40 text-xs sm:text-sm font-serif pointer-events-none">☙</div>
                <div className="absolute bottom-2 left-2 text-[#D97706] opacity-40 text-xs sm:text-sm font-serif pointer-events-none">❧</div>
                <div className="absolute bottom-2 right-2 text-[#D97706] opacity-40 text-xs sm:text-sm font-serif pointer-events-none">☙</div>

                {/* Inner border dash */}
                <div className="absolute inset-2 sm:inset-4 rounded-2xl border border-dashed border-[#F472B6]/30 pointer-events-none" />

                {/* Interactive Bow and Arrow Targeting Heart Component */}
                <BowArrowIntro
                  friendName={friendName}
                  onShootComplete={handleArrowShootComplete}
                />
              </motion.div>
            ) : (
              /* ================= 2. UNLOCKED GREETING CARD (MATCHING INSTAGRAM REEL) ================= */
              <motion.div
                key="gift-card-opened"
                initial={{ opacity: 0, scale: 0.7, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{
                  duration: 0.8,
                  type: 'spring',
                  damping: 18,
                  stiffness: 100,
                }}
                className="w-full flex flex-col items-center"
              >
                {/* The Romantic Greeting Card from the Reel */}
                <div className="relative w-full max-w-4xl rounded-3xl bg-gradient-to-br from-[#FFFDF9] via-[#FFF5F8] to-[#FFE8EF] text-gray-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6),0_0_40px_rgba(255,105,180,0.35)] border-2 sm:border-4 border-[#FDE047]/60 p-4 sm:p-8 md:p-10 overflow-hidden">

                  {/* Corner Golden Filigree Accents */}
                  <div className="absolute top-2 left-2 text-[#F59E0B] opacity-60 text-sm sm:text-lg font-serif">❧</div>
                  <div className="absolute top-2 right-2 text-[#F59E0B] opacity-60 text-sm sm:text-lg font-serif">☙</div>
                  <div className="absolute bottom-2 left-2 text-[#F59E0B] opacity-60 text-sm sm:text-lg font-serif">❧</div>
                  <div className="absolute bottom-2 right-2 text-[#F59E0B] opacity-60 text-sm sm:text-lg font-serif">☙</div>

                  {/* Top Inner Delicate Gold Border Line */}
                  <div className="absolute inset-2.5 sm:inset-4 rounded-2xl border border-dashed border-[#F472B6]/40 pointer-events-none" />

                  {/* Two Column Layout on Desktop: Wishes on Left, Heart Balloon Tree on Right */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center relative z-10">

                    {/* LEFT COLUMN: Calligraphy Greeting & Wishes */}
                    <div className="md:col-span-6 flex flex-col justify-center text-center md:text-left space-y-3 sm:space-y-4 px-1 sm:px-4">
                      
                      {/* Sub-header matching Reel: "... make it count" */}
                      <motion.div
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xs sm:text-sm font-serif italic text-[#A4133C]/70 tracking-widest uppercase"
                      >
                        ... make it count
                      </motion.div>

                      {/* Calligraphy Script Heading matching reel */}
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                      >
                        <h2 className="font-calligraphy text-4xl sm:text-6xl md:text-7xl text-[#9F1239] leading-tight drop-shadow-[0_2px_4px_rgba(255,182,193,0.6)]">
                          Happy Birthday
                        </h2>
                        <h3 className="font-serif text-xl sm:text-3xl font-extrabold text-[#BE185D] mt-0.5 sm:mt-1 tracking-wide">
                          {friendName} ✨
                        </h3>
                      </motion.div>

                      {/* Reel Tagline: "here's to a year that blooms" */}
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.55 }}
                        className="font-serif italic text-base sm:text-lg text-[#C9184A] font-medium"
                      >
                        here's to a year that blooms
                      </motion.p>

                      {/* Sweet Wishes Text */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="text-gray-700 text-sm sm:text-base leading-relaxed space-y-2 font-medium"
                      >
                        {customMessage ? (
                          <p className="italic text-gray-800 bg-white/70 p-3.5 rounded-xl border border-pink-100 shadow-sm">
                            "{customMessage}"
                          </p>
                        ) : (
                          <>
                            <p>
                              May your life blossom with endless happiness, radiant laughter, and unforgettable adventures. 🌸
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600">
                              Never stop dreaming big and shining bright. Today and always, you deserve all the magic the universe has to offer! ❤️✨
                            </p>
                          </>
                        )}
                      </motion.div>

                      {/* Ribbon Stamp & Sound Notice */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className="pt-2 flex items-center justify-center md:justify-start gap-3"
                      >
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#BE123C]/80 bg-[#FFF1F2] px-3.5 py-1.5 rounded-full border border-[#FECDD3]">
                          <Volume2 className="w-3.5 h-3.5 text-[#E11D48] animate-pulse" />
                          <span>Birthday Melody Playing 🎵</span>
                        </div>
                      </motion.div>
                    </div>

                    {/* RIGHT COLUMN: The Blooming Heart-Shaped Tree from Reel */}
                    <div className="md:col-span-6 flex flex-col items-center justify-center">
                      <div className="w-full relative">
                        <HeartBlossomTree isBloomed={true} />
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Action Bar */}
                  <div className="mt-6 pt-5 border-t border-pink-200/60 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
                    <button
                      onClick={handleReplayShoot}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-[#9F1239] bg-white/80 hover:bg-white border border-[#FDA4AF] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Shoot Arrow Again 🏹</span>
                    </button>

                    <button
                      onClick={onOpenSurprise}
                      className="w-full sm:w-auto px-8 py-3 rounded-full text-sm sm:text-base font-bold text-white bg-gradient-to-r from-[#E11D48] via-[#FF1744] to-[#F43F5E] hover:brightness-110 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_0_20px_rgba(255,23,68,0.5)]"
                    >
                      <span>Next: Birthday Cake & Wish 🎂</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
