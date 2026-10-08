import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Send, Flame, Award, RefreshCw, X, Gift } from 'lucide-react';
import { audioEngine } from '../services/audioService';

export const GrandFinale = ({ friendName, isOpen, onClose }) => {
  const [userWish, setUserWish] = useState('');
  const [lanterns, setLanterns] = useState([]);
  const [wishReleased, setWishReleased] = useState(false);

  // Trigger continuous fireworks & confetti rain when modal opens
  useEffect(() => {
    if (!isOpen) return;

    audioEngine.playSparkleFX();
    audioEngine.playFireworkFX();

    const duration = 6 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Fireworks bursts from sides
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#FF1744', '#FF69B4', '#FFD700'] });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#DC143C', '#FFFFFF', '#FF1493'] });
    }, 350);

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleReleaseLantern = (e) => {
    e.preventDefault();
    if (!userWish.trim()) return;

    audioEngine.playFireworkFX();
    audioEngine.playSparkleFX();

    const newLantern = {
      id: Date.now(),
      text: userWish,
      left: `${Math.random() * 80 + 10}%`,
    };

    setLanterns((prev) => [...prev, newLantern]);
    setWishReleased(true);
    setUserWish('');

    // Confetti burst for wish release
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FF69B4', '#FF1744']
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#130004]/95 backdrop-blur-xl overflow-y-auto flex flex-col items-center justify-between p-4 sm:p-8"
      >
        {/* Ambient Fireworks Glow Background */}
        <div className="absolute inset-0 bg-radial-gradient from-pink-600/30 via-red-900/20 to-black pointer-events-none" />

        {/* Close Modal Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-3 rounded-full bg-pink-950/80 text-pink-300 hover:text-white border border-pink-500/40 z-50 hover:rotate-90 transition-all cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Floating Sky Lanterns Released */}
        {lanterns.map((lantern) => (
          <motion.div
            key={lantern.id}
            initial={{ y: '100vh', opacity: 0.9, scale: 0.8 }}
            animate={{ y: '-120vh', opacity: 0, scale: 1.2 }}
            transition={{ duration: 12, ease: 'easeOut' }}
            className="absolute z-20 pointer-events-none flex flex-col items-center"
            style={{ left: lantern.left }}
          >
            <div className="w-16 h-20 bg-gradient-to-t from-amber-500 via-rose-500 to-amber-300 rounded-t-full shadow-[0_0_30px_#FFD700] flex items-center justify-center p-2 text-[10px] text-white font-bold text-center">
              {lantern.text.slice(0, 20)}...
            </div>
            <div className="w-6 h-3 bg-amber-400 rounded-b-md blur-[1px] animate-pulse" />
          </motion.div>
        ))}

        <div className="max-w-4xl mx-auto text-center my-auto relative z-10 space-y-8 pt-10">
          {/* Crown Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-rose-600 text-white font-bold text-sm shadow-[0_0_30px_rgba(255,210,0,0.8)]"
          >
            <Sparkles className="w-5 h-5 text-amber-200 fill-amber-300 animate-spin-slow" />
            <span className="uppercase tracking-widest">Grand Birthday Celebration</span>
            <Sparkles className="w-5 h-5 text-amber-200 fill-amber-300 animate-spin-slow" />
          </motion.div>

          {/* Main Celebration Heading */}
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight drop-shadow-[0_10px_40px_rgba(255,23,68,0.9)]"
          >
            Happy Birthday, <br />
            <span className="text-gradient-gold-pink glow-text-gold">
              {friendName}! 🎉
            </span>
          </motion.h1>

          {/* Mandatory Emotional Statement */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glass-card p-6 sm:p-10 rounded-3xl border border-pink-400/50 shadow-[0_0_60px_rgba(255,23,68,0.6)] inline-block max-w-2xl"
          >
            <p className="font-cursive text-3xl sm:text-5xl text-pink-100 leading-snug font-bold">
              "You deserve all the happiness in this world! ❤️"
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-pink-300 text-xs sm:text-sm uppercase tracking-widest font-semibold">
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500 animate-pulse" />
              <span>With All My Love & Best Wishes Always</span>
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500 animate-pulse" />
            </div>
          </motion.div>

          {/* Wishing Sky Lantern Feature */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-md mx-auto glass-pill p-6 rounded-3xl border border-amber-400/40"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Flame className="w-5 h-5 text-amber-300 animate-bounce" />
              <h3 className="font-serif text-lg font-bold text-amber-200">Release a Sky Lantern Wish</h3>
            </div>

            <form onSubmit={handleReleaseLantern} className="flex flex-col gap-3">
              <input
                type="text"
                required
                placeholder="Type your dream or wish here..."
                value={userWish}
                onChange={(e) => setUserWish(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/70 border border-pink-500/40 text-white placeholder-pink-300/40 text-sm focus:outline-none focus:border-amber-400 text-center"
              />
              <button
                type="submit"
                className="btn-glowing w-full py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,215,0,0.5)] cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Fly Lantern Into The Sky 🏮</span>
              </button>
            </form>

            {wishReleased && (
              <p className="text-xs text-amber-300 font-semibold mt-3 animate-pulse">
                ✨ Your sky lantern is now floating among the stars! ✨
              </p>
            )}
          </motion.div>

          {/* Bottom Action Controls */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                audioEngine.playFireworkFX();
                confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
              }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FF1744] to-[#FF69B4] text-white font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_20px_rgba(255,23,68,0.5)] cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>More Fireworks! 🎆</span>
            </button>

            <button
              onClick={onClose}
              className="px-6 py-3 rounded-full glass-pill text-pink-200 font-semibold text-sm hover:text-white hover:border-pink-300 cursor-pointer"
            >
              Back to Celebration
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
