import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Volume2, VolumeX, Sparkles, Heart, Play, X } from 'lucide-react';

export const MusicPromptModal = ({ isOpen, friendName = 'Sreenya', onAccept, onDecline }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none"
      >
        <motion.div
          initial={{ scale: 0.85, y: 25, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.85, y: 25, opacity: 0 }}
          transition={{ type: 'spring', damping: 22, stiffness: 260 }}
          className="relative max-w-md w-full rounded-3xl bg-gradient-to-br from-[#2D0A14] via-[#4A0E1F] to-[#1F040C] border-2 border-pink-400/40 p-6 sm:p-8 text-center text-white shadow-[0_0_60px_rgba(255,23,68,0.5),0_20px_40px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          {/* Subtle Ambient Background Glow */}
          <div className="absolute -top-16 -left-16 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onDecline}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-pink-200 hover:text-white transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Animated Music Badge Icon */}
          <div className="relative mx-auto mb-5 w-20 h-20">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#DC143C] via-[#FF1744] to-[#FF69B4] animate-ping opacity-25" />
            <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-[#DC143C] via-[#FF1744] to-[#FF69B4] flex items-center justify-center shadow-[0_0_30px_rgba(255,23,68,0.8)] border-2 border-white/40">
              <Music className="w-9 h-9 text-white animate-bounce" />
            </div>
            <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-amber-400 text-gray-900 shadow-md">
              <Sparkles className="w-3.5 h-3.5 fill-gray-900" />
            </div>
          </div>

          {/* Headline */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-200 text-xs font-semibold mb-2">
            <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
            <span>Birthday Experience</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
            Play Birthday Music? 🎶
          </h3>

          <p className="text-pink-100/90 text-sm sm:text-base leading-relaxed mb-4">
            Would you like to turn on the background music for <span className="text-amber-300 font-bold">{friendName}</span>'s special day?
          </p>

          {/* Song Info Pill */}
          <div className="mb-6 p-2.5 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center gap-2 text-xs text-pink-200">
            <Volume2 className="w-4 h-4 text-amber-300 shrink-0" />
            <span>Now Playing: <strong className="text-white">Vaama Vaama</strong> (Starts at 1:10 🎶)</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onAccept}
              className="flex-1 py-3.5 px-5 rounded-2xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-[#DC143C] via-[#FF1744] to-[#FF69B4] shadow-[0_0_25px_rgba(255,23,68,0.7)] hover:shadow-[0_0_35px_rgba(255,23,68,0.9)] hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/30"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Yes, Play Music! 🎵</span>
            </button>

            <button
              type="button"
              onClick={onDecline}
              className="py-3 px-4 rounded-2xl font-medium text-xs sm:text-sm text-pink-200/80 hover:text-white bg-white/10 hover:bg-white/20 active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-white/10"
            >
              <VolumeX className="w-4 h-4" />
              <span>No, Keep Muted</span>
            </button>
          </div>

          <p className="mt-4 text-[11px] text-pink-300/60">
            You can always toggle music anytime using the top button 🎵
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
