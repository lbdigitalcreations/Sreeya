import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Wind, Heart, Gift, Award, ArrowRight, ChevronRight, Lock, Unlock, Calendar } from 'lucide-react';
import { audioEngine } from '../services/audioService';

export const CakeSurprise = ({ friendName, candlesBlown, onBlowCandles, onNextPage, onPrevPage }) => {
  const [messageRevealed, setMessageRevealed] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isCounting, setIsCounting] = useState(false);

  // Trigger rich colorful confetti burst
  const fireConfetti = () => {
    audioEngine.playPopFX();

    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        colors: ['#FF1744', '#FF69B4', '#DC143C', '#FFD700', '#FFFFFF', '#FF1493']
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  // 5-Second Countdown Logic
  const handleStartCountdown = () => {
    if (candlesBlown || isCounting) return;

    setIsCounting(true);
    setCountdown(5);
    audioEngine.playSparkleFX();
  };

  useEffect(() => {
    let timer = null;
    if (isCounting) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsCounting(false);
            if (onBlowCandles) onBlowCandles();
            audioEngine.playBlowFX();
            fireConfetti();
            return 0;
          } else {
            audioEngine.playSparkleFX();
            return prev - 1;
          }
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isCounting, onBlowCandles]);

  const handleRevealMessage = () => {
    fireConfetti();
    setMessageRevealed(true);
  };

  return (
    <section className="relative min-h-[calc(100vh-140px)] flex flex-col justify-center items-center py-12 px-4 z-10">
      <div className="max-w-5xl mx-auto w-full">

        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs sm:text-sm font-bold uppercase tracking-widest text-pink-400 glass-pill px-4 py-1.5 rounded-full inline-block"
            >
              Make A Wish ✨
            </motion.span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500/25 to-pink-500/25 border border-amber-300/50 text-amber-200 text-xs font-bold shadow-sm">
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              <span>Birthday Date: Today (October 9th) 🎂</span>
            </span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl sm:text-5xl font-bold text-white mb-2"
          >
            The Magical Birthday Cake 🎂
          </motion.h2>
          <p className="text-pink-200 text-sm sm:text-base max-w-xl mx-auto">
            Close your eyes, make a heartfelt wish, and blow out the candles!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Interactive Birthday Cake SVG Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="lg:col-span-6 glass-card p-4 sm:p-10 rounded-3xl text-center relative flex flex-col items-center justify-center border border-pink-500/30 shadow-[0_0_50px_rgba(255,23,68,0.3)] overflow-hidden"
          >
            {/* Glowing background aura behind cake */}
            <div className="absolute inset-0 bg-radial-gradient from-pink-600/20 via-rose-900/10 to-transparent rounded-3xl pointer-events-none" />

            {/* Prominent, cinematic countdown overlay with progress ring */}
            <AnimatePresence mode="wait">
              {isCounting && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm z-30 rounded-3xl flex flex-col items-center justify-center p-4 pointer-events-none"
                >
                  <motion.div
                    key={countdown}
                    initial={{ scale: 0.3, opacity: 0, rotate: -20 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 1.4, opacity: 0, rotate: 20 }}
                    transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                    className="relative flex flex-col items-center"
                  >
                    {/* Glowing circular backdrop for the number */}
                    <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-pink-500 flex items-center justify-center shadow-[0_0_60px_rgba(255,215,0,0.8)] border-4 border-yellow-200 animate-pulse">
                      <span className="font-serif text-6xl sm:text-8xl font-black text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
                        {countdown}
                      </span>
                    </div>

                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="mt-4 px-6 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-lg text-center"
                    >
                      <p className="text-sm sm:text-base font-extrabold text-amber-200 tracking-wider uppercase">
                        🌟 Make a wish, {friendName}! 🌟
                      </p>
                      <p className="text-xs text-pink-100 font-medium">
                        Get ready to blow out the candles... 💨
                      </p>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Animated SVG Cake */}
            <div className="relative my-4 w-64 sm:w-80 h-72 flex items-end justify-center">

              {/* Cake Stand Plate */}
              <div className="absolute bottom-0 w-72 sm:w-88 h-6 bg-gradient-to-r from-pink-300 via-white to-pink-200 rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.4)] border border-pink-100" />

              {/* Bottom Tier (Red Crimson with Gold Beads) */}
              <div className="absolute bottom-6 w-60 sm:w-72 h-24 bg-gradient-to-r from-[#8B0000] via-[#DC143C] to-[#8B0000] rounded-2xl shadow-xl flex items-center justify-around border-t-4 border-pink-400/40">
                <div className="w-full flex justify-around px-4">
                  {[...Array(6)].map((_, i) => (
                    <Heart key={i} className="w-5 h-5 text-pink-300 fill-pink-400/80 animate-pulse" />
                  ))}
                </div>
              </div>

              {/* Middle Tier (Cherry Pink with Cream Drips) */}
              <div className="absolute bottom-28 w-48 sm:w-56 h-20 bg-gradient-to-r from-[#FF1744] via-[#FF69B4] to-[#FF1744] rounded-xl shadow-lg border-t-4 border-white/60">
                <div className="w-full h-4 bg-white/80 rounded-b-xl flex justify-between px-2">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-3 h-5 bg-white rounded-b-full shadow-sm" />
                  ))}
                </div>
              </div>

              {/* Top Tier (Soft Pink with Strawberry Frosting & Custom Cake Text) */}
              <div className="absolute bottom-44 w-36 sm:w-44 h-16 bg-gradient-to-r from-[#FF69B4] via-[#FFB6C1] to-[#FF69B4] rounded-lg shadow-md border-t-4 border-pink-200 flex items-center justify-center">
                <div className="text-[11px] sm:text-xs font-extrabold text-[#8B0000] tracking-wider text-center leading-tight px-1 uppercase drop-shadow-sm">
                  CHEERS TURN 19
                </div>
              </div>

              {/* Candles & Flames */}
              <div className="absolute bottom-60 w-36 flex justify-around items-end z-20">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="relative flex flex-col items-center group cursor-pointer" onClick={handleStartCountdown}>

                    {/* Candle Flame with dynamic flickering and wind gust reaction */}
                    <AnimatePresence>
                      {!candlesBlown && (
                        <motion.div
                          exit={{
                            opacity: 0,
                            scale: 0,
                            y: -25,
                            transition: { duration: 0.35, ease: 'easeOut' }
                          }}
                          className={`relative flex flex-col items-center mb-1 ${
                            isCounting ? 'flame-wind' : ''
                          }`}
                        >
                          {/* Outer burning halo */}
                          <div className={`w-4 sm:w-5 h-7 sm:h-9 bg-gradient-to-t from-red-600 via-amber-400 to-yellow-100 rounded-full flame-anim ${
                            isCounting ? 'brightness-150 scale-110' : ''
                          }`} />
                          {/* Inner white-hot spark center */}
                          <div className="absolute bottom-1 w-1.5 h-3.5 bg-white rounded-full blur-[0.3px]" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Realistic wispy smoke plume when blown */}
                    {candlesBlown && (
                      <div className="absolute -top-12 flex flex-col items-center pointer-events-none">
                        <div
                          className="animate-smoke-puff w-4 h-8 bg-gradient-to-t from-gray-200/60 to-transparent rounded-full filter blur-[1px]"
                          style={{ animationDelay: `${index * 150}ms` }}
                        />
                        <div
                          className="animate-smoke-puff w-3 h-6 bg-gradient-to-t from-pink-100/40 to-transparent rounded-full filter blur-[1.5px] -mt-4"
                          style={{ animationDelay: `${index * 180 + 100}ms` }}
                        />
                      </div>
                    )}

                    {/* Black Wick with hot ember glow */}
                    <div className="w-0.5 h-2 bg-neutral-900 rounded-t-full relative">
                      {candlesBlown && (
                        <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
                      )}
                    </div>

                    {/* Candle Stick */}
                    <div className="w-3 h-11 bg-gradient-to-b from-white via-pink-200 to-rose-400 rounded-t-sm shadow-inner border-x border-pink-300" />
                  </div>
                ))}
              </div>

              {/* Wind Gust Blow Effect when user blows */}
              <AnimatePresence>
                {isCounting && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: -60 }}
                    animate={{ opacity: 0.85, scale: [1, 1.2, 1], x: [-30, 20, -30] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute bottom-64 text-2xl select-none pointer-events-none drop-shadow-[0_0_15px_#fff]"
                  >
                    💨 🌬️
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Candle Blow Action Button */}
            <div className="mt-6 flex items-center justify-center gap-2 sm:gap-3 w-full">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleStartCountdown}
                disabled={candlesBlown || isCounting}
                className={`flex items-center justify-center gap-2 sm:gap-2.5 px-4 sm:px-7 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-base transition-all shadow-xl cursor-pointer ${
                  candlesBlown
                    ? 'bg-emerald-800/90 text-emerald-100 border border-emerald-400/80 shadow-[0_0_20px_rgba(52,211,153,0.4)] cursor-default'
                    : isCounting
                    ? 'bg-amber-500 text-black border-2 border-yellow-200 animate-pulse scale-105'
                    : 'bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 text-white animate-pulse-glow border-2 border-white/50 shadow-[0_0_30px_rgba(255,105,180,0.8)]'
                }`}
              >
                <Wind className={`w-4 h-4 sm:w-5 sm:h-5 ${isCounting ? 'animate-spin' : 'animate-bounce'}`} />
                <span className="whitespace-nowrap">
                  {candlesBlown
                    ? 'Candles Blown! ✨'
                    : isCounting
                    ? `Countdown: ${countdown}s... Wish!`
                    : '🎂 Click to Blow The Candles 💨'}
                </span>
              </motion.button>

              <button
                onClick={fireConfetti}
                className="p-2.5 sm:p-3 rounded-full glass-pill hover:bg-pink-500/30 text-pink-200 hover:text-white transition-all cursor-pointer hover:scale-105 active:scale-95 shrink-0"
                title="Pop Confetti Again!"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
              </button>
            </div>
          </motion.div>

          {/* Surprise Reveal Card & Page Navigation */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-8 rounded-3xl border border-pink-500/30 relative overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-[#FF1744] to-[#FF69B4]">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    A Note For You, {friendName}
                  </h3>
                  <p className="text-xs text-rose-200">
                    Straight from the heart ❤️
                  </p>
                </div>
              </div>

              <div className="text-white text-base sm:text-lg leading-relaxed mb-6 space-y-4 font-normal">
                <p className="drop-shadow-sm">
                  Happy Birthday, Sreenya! Honestly, you have this crazy ability to turn any normal day into a good one. Whenever you smile or we get to talk, my day just instantly gets better — probably more than you even realize.
                </p>
                <p className="text-pink-200 font-medium text-sm sm:text-base border-l-2 border-pink-400 pl-3 italic">
                  {candlesBlown
                    ? "✨ Wish granted! Your candles are blown. Whenever you're ready, click below to see your photos & special letter!"
                    : isCounting
                    ? `Close your eyes quick (${countdown}s)... make that one wish from your heart!`
                    : "Close your eyes, make the biggest wish for your year ahead, and blow them out! ✨"}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {candlesBlown ? (
                  <button
                    onClick={onNextPage}
                    className="w-full py-4 rounded-2xl font-black text-base flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 text-white hover:scale-[1.02] active:scale-98 cursor-pointer border-2 border-white/50 shadow-[0_0_30px_rgba(255,105,180,0.8)] animate-pulse"
                  >
                    <Unlock className="w-5 h-5 text-amber-200 animate-bounce" />
                    <span>Unlocked! Go to Photo Gallery →</span>
                  </button>
                ) : (
                  <button
                    onClick={onNextPage}
                    disabled
                    className="w-full py-4 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 bg-black/40 text-pink-300/60 border border-white/10 opacity-70 cursor-not-allowed shadow-none"
                  >
                    <Lock className="w-4 h-4 text-pink-400/60" />
                    <span>Blow The Candles on the Cake First 🎂</span>
                  </button>
                )}

                <button
                  onClick={handleRevealMessage}
                  className="w-full py-2.5 rounded-2xl text-pink-200 hover:text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/15 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
                  <span>Pop Confetti Blast 💌</span>
                </button>

                {onPrevPage && (
                  <button
                    type="button"
                    onClick={onPrevPage}
                    className="w-full py-2 rounded-2xl text-pink-200/80 hover:text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <span>← Back to Birthday Card</span>
                  </button>
                )}
              </div>
            </motion.div>

            {/* Quick Notice Banner */}
            {!candlesBlown && (
              <div className="p-4 rounded-2xl bg-[#38000b]/80 border border-pink-500/30 text-center text-xs text-pink-200 font-semibold flex items-center justify-center gap-2">
                <Lock className="w-4 h-4 text-pink-400" />
                <span>
                  {isCounting
                    ? `Countdown running (${countdown}s)... wish in progress!`
                    : 'Click "Blow The Candles" to start 5-second wish countdown! 🕯️'}
                </span>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
