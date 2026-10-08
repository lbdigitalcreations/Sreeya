import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Heart,
  Sparkles,
  Send,
  Flame,
  RefreshCw,
  Mail,
  CheckCircle2,
  Star,
  Loader2,
  Quote,
  MessageSquareHeart,
  Clock
} from 'lucide-react';
import { audioEngine } from '../services/audioService';

// Target emails
export const PRIMARY_EMAIL = 'keshavkarthikeyan03@gmail.com'; // Saved for activation after template is confirmed!
export const TEST_EMAIL = 'lonelyboy44y@gmail.com'; // Currently active for testing

export const GrandFinaleSlide = ({ friendName = 'Sreenya', onRestart }) => {
  const [userWish, setUserWish] = useState('');
  const [senderName, setSenderName] = useState('');
  const [selectedTag, setSelectedTag] = useState('Endless Happiness 🌟');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [lanterns, setLanterns] = useState([]);
  const [storedWishes, setStoredWishes] = useState([]);

  // Load saved wishes from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('birthday_lantern_wishes');
      if (saved) {
        setStoredWishes(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to load wishes from localStorage', e);
    }
  }, []);

  // Trigger continuous fireworks celebration when slide opens
  useEffect(() => {
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

      const particleCount = 45 * (timeLeft / duration);

      // Fireworks bursts from sides
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#FF1744', '#FF69B4', '#FFD700']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#DC143C', '#FFFFFF', '#FF1493']
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  // Send Email Notification via FormSubmit.co (Testing phase: ONLY to TEST_EMAIL lonelyboy44y@gmail.com)
  const sendEmailNotification = async (wishText, fromName, tag) => {
    const formattedDate = new Date().toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'medium'
    });

    const payload = {
      _subject: `🎂 New Sky Lantern Birthday Wish from ${fromName || friendName}! 🏮💌`,
      _template: 'table',
      _captcha: 'false',
      'Sender Name': fromName || `${friendName} (or Secret Admirer)`,
      'Birthday Person': friendName,
      'Blessing Category': tag,
      'Heartfelt Wish': wishText,
      'Date & Time': formattedDate,
      'Ceremony': 'Sky Lantern Released to the Stars ✨🏮'
    };

    try {
      // Send strictly to test email lonelyboy44y@gmail.com
      await fetch(`https://formsubmit.co/ajax/${TEST_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn('Email notification error:', err);
    }
  };

  const handleReleaseLantern = async (e) => {
    e.preventDefault();
    if (!userWish.trim()) return;

    setIsSubmitting(true);
    audioEngine.playFireworkFX();
    audioEngine.playSparkleFX();

    // 1. Trigger sky lantern floating upwards
    const newLantern = {
      id: Date.now(),
      text: userWish.trim(),
      from: senderName.trim() || friendName,
      tag: selectedTag,
      left: `${Math.random() * 70 + 15}%`,
    };
    setLanterns((prev) => [...prev, newLantern]);

    // 2. Trigger celebratory confetti burst
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FF69B4', '#FF1744', '#FFFFFF']
    });

    // 3. Save to localStorage
    const updated = [newLantern, ...storedWishes.slice(0, 5)];
    setStoredWishes(updated);
    try {
      localStorage.setItem('birthday_lantern_wishes', JSON.stringify(updated));
    } catch (err) {
      console.warn(err);
    }

    // 4. Send email notification
    await sendEmailNotification(userWish.trim(), senderName.trim(), selectedTag);

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setUserWish('');
    setSenderName('');

    setTimeout(() => {
      setSubmitSuccess(false);
    }, 6000);
  };

  const handleFireworkClick = () => {
    audioEngine.playFireworkFX();
    confetti({
      particleCount: 160,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#FF1744', '#FFD700', '#FF69B4', '#FFFFFF', '#DC143C']
    });
  };

  return (
    <div className="relative min-h-[calc(100vh-140px)] flex flex-col justify-center items-center py-8 sm:py-12 px-3 sm:px-6 z-10 text-center overflow-hidden select-none">

      {/* Floating Animated Sky Lanterns ascending to the sky */}
      {lanterns.map((lantern) => (
        <motion.div
          key={lantern.id}
          initial={{ y: '100vh', opacity: 0.95, scale: 0.8 }}
          animate={{ y: '-130vh', opacity: 0, scale: 1.25 }}
          transition={{ duration: 14, ease: 'easeOut' }}
          className="absolute z-30 pointer-events-none flex flex-col items-center"
          style={{ left: lantern.left }}
        >
          {/* Glowing Lantern Body */}
          <div className="w-20 sm:w-24 h-24 sm:h-28 bg-gradient-to-t from-amber-500 via-rose-500 to-amber-300 rounded-t-full shadow-[0_0_35px_#FFD700] flex flex-col items-center justify-center p-2 text-white font-bold text-center border-t border-yellow-200">
            <span className="text-[10px] sm:text-xs leading-tight line-clamp-3 drop-shadow-md">
              "{lantern.text}"
            </span>
            <span className="text-[8px] text-amber-200 mt-1 uppercase tracking-wider">
              ~ {lantern.from}
            </span>
          </div>
          {/* Lantern Flame Core */}
          <div className="w-8 h-4 bg-amber-400 rounded-b-md blur-[1px] animate-pulse shadow-[0_0_15px_#FFA500]" />
        </motion.div>
      ))}

      <div className="max-w-4xl mx-auto w-full relative z-10 space-y-8 sm:space-y-10">

        {/* Crown Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-rose-600 text-white font-bold text-xs sm:text-sm shadow-[0_0_30px_rgba(255,210,0,0.8)] border border-amber-200/50"
        >
          <Sparkles className="w-4 h-4 text-amber-200 fill-amber-300 animate-spin-slow" />
          <span className="uppercase tracking-widest font-extrabold">Grand Birthday Celebration</span>
          <Sparkles className="w-4 h-4 text-amber-200 fill-amber-300 animate-spin-slow" />
        </motion.div>

        {/* Main Celebration Heading */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight drop-shadow-[0_10px_40px_rgba(255,23,68,0.9)]"
        >
          Happy Birthday, <br />
          <span className="text-gradient-gold-pink glow-text-gold">
            {friendName}! 🎉
          </span>
        </motion.h1>

        {/* Birthday Message Statement */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="glass-card p-6 sm:p-10 rounded-3xl border border-pink-400/50 shadow-[0_0_60px_rgba(255,23,68,0.5)] inline-block max-w-2xl text-center"
        >
          <p className="font-cursive text-2xl sm:text-4xl text-pink-100 leading-relaxed font-bold">
            "May your days be filled with endless smiles, beautiful moments, and dreams that come true. ❤️"
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-pink-300 text-xs sm:text-sm uppercase tracking-widest font-semibold">
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500 animate-pulse" />
            <span>With All My Love & Warm Wishes Always</span>
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500 animate-pulse" />
          </div>
        </motion.div>

        {/* =========================================================================
            PROPER SKY LANTERN WISH CEREMONY (WITH EMAIL NOTIFICATION)
        ========================================================================= */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="max-w-xl mx-auto w-full glass-card p-6 sm:p-8 rounded-3xl border-2 border-amber-300/80 shadow-[0_0_50px_rgba(255,215,0,0.35)] bg-gradient-to-br from-rose-950/90 via-[#2d020e]/95 to-amber-950/80 text-left relative overflow-hidden"
        >
          {/* Subtle glowing ambient lighting */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-rose-500/25 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-amber-300/30">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-400/50">
                <Flame className="w-5 h-5 text-amber-300 animate-bounce" />
              </div>
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-amber-200">
                  Release A Sky Lantern Wish 🏮
                </h3>
                <p className="text-[11px] text-pink-200/80">
                  Your wish floats into the night sky & notifies the inbox directly!
                </p>
              </div>
            </div>

            <span className="text-xs bg-amber-400/20 text-amber-300 font-bold px-2.5 py-1 rounded-full border border-amber-400/30 shrink-0">
              💌 Direct Notify
            </span>
          </div>

          <form onSubmit={handleReleaseLantern} className="space-y-4">
            
            {/* Sentiment Selector Pills */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-amber-200 mb-1.5">
                Choose Wish Blessing:
              </label>
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  'Endless Happiness 🌟',
                  'True Love & Magic 💖',
                  'Big Dreams 🚀',
                  'Good Health 🌸',
                  'Always Together 💍'
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSelectedTag(tag);
                      audioEngine.playPopFX();
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      selectedTag === tag
                        ? 'bg-amber-400 text-rose-950 font-bold shadow-md scale-105'
                        : 'bg-black/40 text-pink-200 hover:bg-black/60 border border-white/10'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Sender Name (Optional) */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-pink-200 mb-1">
                Your Name / Secret Admirer:
              </label>
              <input
                type="text"
                placeholder={`e.g. ${friendName} (or your secret admirer)`}
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-pink-500/40 text-white placeholder-pink-300/40 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* Wish Textarea */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-pink-200 mb-1">
                Your Heartfelt Birthday Wish / Message:
              </label>
              <textarea
                rows={3}
                required
                placeholder="Write your deepest dream, heartfelt prayer, or special message here..."
                value={userWish}
                onChange={(e) => setUserWish(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-pink-500/40 text-white placeholder-pink-300/40 text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none leading-relaxed"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all cursor-pointer ${
                isSubmitting
                  ? 'bg-gray-700 text-gray-300 cursor-wait'
                  : 'bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 text-white hover:scale-[1.02] active:scale-98 border-2 border-white/50 animate-pulse-glow'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-amber-200" />
                  <span>Releasing Lantern & Sending Notification...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-amber-200" />
                  <span>Release Sky Lantern & Send Wish 🏮✨</span>
                </>
              )}
            </button>
          </form>

          {/* Success Notification Alert */}
          <AnimatePresence>
            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-4 rounded-2xl bg-emerald-950/80 border-2 border-emerald-400/80 text-emerald-100 flex items-start gap-3 shadow-lg"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="text-xs sm:text-sm font-bold text-emerald-200">
                    ✨ Your sky lantern has taken flight into the stars!
                  </p>
                  <p className="text-[11px] text-emerald-300/90 mt-0.5">
                    Test notification successfully dispatched to <span className="font-semibold underline text-white">{TEST_EMAIL}</span>. 💌
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email Info Footer Note */}
          <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-pink-300/80">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-amber-300" />
              Test Mode: <span className="text-amber-200 font-semibold">{TEST_EMAIL}</span>
            </span>
            <span className="text-[10px] text-pink-400/80 italic">Ready for template preview</span>
          </div>
        </motion.div>

        {/* Recently Released Lantern Wishes Display */}
        {storedWishes.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-xl mx-auto w-full text-left"
          >
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Released Lanterns ({storedWishes.length})
              </span>
              <span className="text-[10px] text-pink-300/70">Floating among the stars ✨</span>
            </div>

            <div className="space-y-2">
              {storedWishes.map((w) => (
                <div
                  key={w.id}
                  className="p-3 rounded-2xl bg-black/40 border border-amber-400/30 backdrop-blur-sm flex items-start justify-between gap-3 text-xs text-pink-100"
                >
                  <div>
                    <p className="font-medium italic leading-relaxed text-amber-100">
                      "{w.text}"
                    </p>
                    <p className="text-[10px] text-pink-300 mt-1">
                      From: <span className="font-bold text-white">{w.from}</span> &bull; {w.tag}
                    </p>
                  </div>
                  <span className="text-base shrink-0">🏮</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Final Celebration Actions */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleFireworkClick}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FF1744] to-[#FF69B4] text-white font-bold text-xs sm:text-sm hover:scale-105 active:scale-95 transition-transform flex items-center gap-2 shadow-[0_0_20px_rgba(255,23,68,0.5)] cursor-pointer border border-white/20"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>More Fireworks! 🎆</span>
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="px-6 py-3 rounded-full glass-pill text-pink-200 font-semibold text-xs sm:text-sm hover:text-white hover:border-pink-300 flex items-center gap-2 cursor-pointer transition-all active:scale-95 border border-white/20"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Restart Journey 🔄</span>
          </button>
        </div>

      </div>
    </div>
  );
};
