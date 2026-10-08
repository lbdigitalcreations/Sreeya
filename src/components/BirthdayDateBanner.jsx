import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Sparkles, Heart } from 'lucide-react';

export const BirthdayDateBanner = ({ friendName = 'Sreenya' }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00',
    isBirthdayToday: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      // Target midnight: Start of October 9th
      const currentYear = now.getFullYear();
      let targetDate = new Date(currentYear, 9, 9, 0, 0, 0); // Month is 0-indexed: 9 = October

      // Check if today is already October 9th
      if (now.getMonth() === 9 && now.getDate() === 9) {
        setTimeLeft({
          hours: '00',
          minutes: '00',
          seconds: '00',
          isBirthdayToday: true,
        });
        return;
      }

      // If we are past Oct 9 in the current year, set to next year
      if (now > targetDate && now.getMonth() >= 9 && now.getDate() > 9) {
        targetDate = new Date(currentYear + 1, 9, 9, 0, 0, 0);
      }

      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({
          hours: '00',
          minutes: '00',
          seconds: '00',
          isBirthdayToday: true,
        });
      } else {
        const totalHours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setTimeLeft({
          hours: String(totalHours).padStart(2, '0'),
          minutes: String(minutes).padStart(2, '0'),
          seconds: String(seconds).padStart(2, '0'),
          isBirthdayToday: false,
        });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto mb-5 px-2"
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-black/50 via-[#4A041E]/80 to-black/50 backdrop-blur-md border-2 border-[#FDE047]/60 shadow-[0_0_30px_rgba(255,215,0,0.25)] p-3 sm:p-4 text-white">
        {/* Shimmer light bar across top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-300 to-transparent animate-pulse" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          {/* Left: Birthday Date Information */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-pink-500 flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.6)] shrink-0 border border-amber-200">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-amber-300 font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
                <span>Special Announcement</span>
              </div>
              <h4 className="font-serif text-sm sm:text-base font-bold text-white drop-shadow-sm">
                {timeLeft.isBirthdayToday ? (
                  <span className="text-pink-200">🎉 Today is {friendName}'s Birthday! (October 9th) 🎂</span>
                ) : (
                  <span>
                    Birthday Date: <strong className="text-amber-300 underline decoration-pink-400 decoration-2 underline-offset-2">Tomorrow, October 9th</strong> 🎂
                  </span>
                )}
              </h4>
            </div>
          </div>

          {/* Right: Live Countdown Pill */}
          {!timeLeft.isBirthdayToday ? (
            <div className="flex items-center gap-2 bg-black/40 border border-white/20 rounded-xl px-3 py-1.5 shadow-inner">
              <Clock className="w-4 h-4 text-pink-400 animate-pulse" />
              <div className="flex items-center gap-1 font-mono font-bold text-xs sm:text-sm">
                <div className="flex flex-col items-center">
                  <span className="bg-white/10 px-1.5 py-0.5 rounded text-amber-200">{timeLeft.hours}</span>
                  <span className="text-[8px] text-pink-200/70 uppercase">hrs</span>
                </div>
                <span className="text-pink-400">:</span>
                <div className="flex flex-col items-center">
                  <span className="bg-white/10 px-1.5 py-0.5 rounded text-amber-200">{timeLeft.minutes}</span>
                  <span className="text-[8px] text-pink-200/70 uppercase">min</span>
                </div>
                <span className="text-pink-400">:</span>
                <div className="flex flex-col items-center">
                  <span className="bg-white/10 px-1.5 py-0.5 rounded text-amber-200">{timeLeft.seconds}</span>
                  <span className="text-[8px] text-pink-200/70 uppercase">sec</span>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-pink-300 hidden md:inline ml-1">
                to Midnight ✨
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-xs shadow-[0_0_15px_rgba(255,105,180,0.6)] animate-pulse">
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>Happy Birthday {friendName}! 💖</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
