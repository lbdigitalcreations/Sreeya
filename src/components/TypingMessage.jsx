import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, RefreshCw, Quote, Calendar } from 'lucide-react';
import { audioEngine } from '../services/audioService';

export const TypingMessage = ({ friendName = 'Sreenya', customMessage, onNextPage, onPrevPage }) => {
  const defaultLetter = customMessage || `Hey Sreenya,

Happy Birthday! 

I was thinking about what to write here, and honestly, I just wanted to keep it real with you. 

I don't think you realize how easy it is to talk to you, or how much I look forward to the times we actually get to talk. Even on boring or stressful days, whenever you're around, things just feel way more fun. Your smile, the random jokes, the little moments — they stick with me a lot more than you probably think.

I've had feelings for you for a while now. I never wanted to make anything awkward between us or put any pressure on you, but since today is all about celebrating you, I just wanted you to know how special you genuinely are to me.

I hope today is full of good food, good people, and everything that makes you happy. You deserve the absolute best year ahead.

Have the happiest birthday, Sreenya! ❤️🎂`;

  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const contentContainerRef = useRef(null);

  // Typewriter effect
  useEffect(() => {
    if (currentIndex < defaultLetter.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + defaultLetter[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
        
        // Auto scroll down smoothly as typing proceeds
        if (contentContainerRef.current) {
          contentContainerRef.current.scrollTop = contentContainerRef.current.scrollHeight;
        }
      }, 30);
      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [currentIndex, defaultLetter]);

  const handleRestartTyping = () => {
    setDisplayedText('');
    setCurrentIndex(0);
    setIsTyping(true);
    if (contentContainerRef.current) {
      contentContainerRef.current.scrollTop = 0;
    }
    audioEngine.playSparkleFX();
  };

  const paragraphs = displayedText.split('\n\n');

  return (
    <section className="relative min-h-[calc(100vh-140px)] flex flex-col justify-center items-center py-4 px-3 sm:px-6 z-10">
      <div className="max-w-4xl mx-auto w-full">

        {/* Section Header */}
        <div className="text-center mb-4">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-1.5">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs sm:text-sm font-bold uppercase tracking-widest text-pink-300 glass-pill px-4 py-1 rounded-full inline-block"
            >
              From The Heart 💌
            </motion.span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/25 to-pink-500/25 border border-amber-300/50 text-amber-200 text-xs font-bold shadow-sm">
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              <span>Birthday Date: Today, October 9th 🎂</span>
            </span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-2xl sm:text-3xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,23,68,0.6)]"
          >
            Special Birthday Message
          </motion.h2>
        </div>

        {/* Orbiting Animated Hearts Container */}
        <div className="relative">

          {/* Orbiting Glowing Hearts */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-400 font-bold pointer-events-none select-none z-20"
              style={{
                top: `${(i * 18) % 90}%`,
                left: i % 2 === 0 ? '-14px' : 'auto',
                right: i % 2 !== 0 ? '-14px' : 'auto',
              }}
              animate={{
                scale: [1, 1.3, 1],
                y: [0, -12, 0],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              ♥
            </motion.div>
          ))}

          {/* Glassmorphic Love Letter Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 sm:p-8 rounded-3xl border border-pink-400/30 relative shadow-[0_0_50px_rgba(255,23,68,0.35)]"
          >

            {/* Glowing Rose Gradient Backdrop */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-gradient-to-br from-pink-600/30 to-red-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between mb-4 pb-3 border-b border-pink-400/20">
              <div className="flex items-center gap-2.5">
                <Quote className="w-5 h-5 sm:w-7 sm:h-7 text-pink-300 opacity-80 shrink-0" />
                <span className="font-cursive text-2xl sm:text-3xl text-pink-100">A Letter for {friendName}</span>
              </div>
              <button
                onClick={handleRestartTyping}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-xs font-semibold text-pink-200 hover:text-white hover:border-pink-300 transition-colors cursor-pointer shrink-0"
                title="Replay Typing Animation"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isTyping ? 'animate-spin' : ''}`} />
                <span>Replay</span>
              </button>
            </div>

            {/* Full text content - No internal scrollbar */}
            <div 
              ref={contentContainerRef}
              className="w-full"
            >
              {paragraphs.map((paragraph, index) => (
                <p 
                  key={index}
                  className="mb-3.5 leading-relaxed text-sm sm:text-base md:text-[17px] text-pink-50 tracking-wide font-normal drop-shadow-sm"
                >
                  {paragraph}
                  {isTyping && index === paragraphs.length - 1 && (
                    <span className="inline-block w-2.5 h-5 bg-pink-400 ml-1.5 animate-pulse rounded-full align-middle" />
                  )}
                </p>
              ))}
            </div>

            {/* Letter Footer */}
            <div className="mt-6 pt-4 border-t border-pink-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-pink-300 text-xs sm:text-sm font-semibold">
                <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Written with infinite warmth & care</span>
              </div>

              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-500 fill-pink-500 animate-pulse" />
                <span className="font-serif text-base sm:text-lg font-bold text-white">With Warm Wishes ❤️</span>
              </div>
            </div>

            {/* Letter Navigation Actions */}
            <div className="mt-6 pt-4 border-t border-pink-500/20 flex flex-wrap items-center justify-between gap-3">
              {onPrevPage && (
                <button
                  type="button"
                  onClick={onPrevPage}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-pink-200 hover:text-white font-medium text-xs sm:text-sm border border-white/15 transition-all cursor-pointer"
                >
                  ← Back to Gallery 📷
                </button>
              )}

              <button
                type="button"
                onClick={handleRestartTyping}
                className="w-full sm:w-auto px-4 py-2 rounded-full text-pink-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Replay Typing</span>
              </button>

              {onNextPage && (
                <button
                  type="button"
                  onClick={onNextPage}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500 hover:brightness-110 shadow-[0_0_20px_rgba(255,105,180,0.6)] text-white font-bold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer"
                >
                  Next: Memory Timeline 📖 →
                </button>
              )}
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
};

