import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Heart,
  X,
  Maximize2,
  Sparkles,
  Camera,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCw,
  Film,
  Layers,
  Star,
  Quote,
  Eye,
  MessageSquareHeart,
  Send,
  Compass,
  Calendar
} from 'lucide-react';
import { audioEngine } from '../services/audioService';
import { getAssetUrl } from '../utils/assetHelper';

export const PhotoGallery = ({ friendName = 'Sreenya', initialPhotos, onAddPhoto, onNextPage, onPrevPage }) => {
  const [photos, setPhotos] = useState(initialPhotos || [
    {
      id: '1',
      url: getAssetUrl('1.jpeg'),
      title: 'The Cutest Pout & Smile',
      caption: 'The Beautiful Smile ✨',
      date: 'Precious Moments',
      category: 'candid',
      badge: '100% Adorable 🥰',
      rotation: '-rotate-2',
      likes: 42,
      note: 'You do not even have to try to look breathtaking. Even when you are making funny faces and teasing, you are the most adorable person I know. This picture never fails to make me smile.'
    },
    {
      id: '3',
      url: getAssetUrl('3.jpeg'),
      title: 'Gentle, Dreamy Eyes',
      caption: 'Unforgettable Days 🌟',
      date: 'Sweet Times',
      category: 'candid',
      badge: 'Those Eyes ✨',
      rotation: '-rotate-3',
      likes: 51,
      note: 'Those eyes hold so much warmth and quiet depth. Looking at this photo feels like listening to your favorite calm acoustic song on a rainy evening — total peace.'
    },
    {
      id: '4',
      url: getAssetUrl('4.jpeg'),
      title: 'The Day I Felt A Crush On You',
      caption: 'I Feel A Crush On You 💘',
      date: 'Sweetest Beginning',
      category: 'favorite',
      badge: 'Crush On You 💓',
      rotation: 'rotate-2',
      likes: 68,
      note: 'The very first moment I saw you smiling like this in your white saree, my heart skipped a beat. That was the exact second my crush began. No matter where life takes you, remember this: the one person is always waiting for you with all my love.'
    },
    {
      id: '5',
      url: getAssetUrl('5.jpeg'),
      title: 'Breezy & Carefree Spirit',
      caption: 'Crazy Fun & Joy 🎉',
      date: 'Forever Best',
      category: 'favorite',
      badge: 'Effortless Charm 🌿',
      rotation: '-rotate-1',
      likes: 60,
      note: 'Running your hand through your hair with the wind in your face. There is a wild, joyful freedom about you here that makes my heart race every time I see it.'
    },
    {
      id: '6',
      url: getAssetUrl('6.jpeg'),
      title: 'Subtle Charm & Confidence',
      caption: 'Making Every Day Magical 🌸',
      date: 'Special Bond',
      category: 'favorite',
      badge: 'Subtle Magic 🖤',
      rotation: 'rotate-3',
      likes: 48,
      note: 'That gentle, knowing smile in the black jacket. You have this quiet charm that makes everyone around you feel comfortable, but to me, you stand out from the entire crowd.'
    },
    {
      id: '7',
      url: getAssetUrl('7.jpeg'),
      title: 'Contagious, Unfiltered Laughter',
      caption: 'Heart Full of Dreams 💖',
      date: 'Unbreakable Journey',
      category: 'candid',
      badge: 'Pure Joy 🌸',
      rotation: '-rotate-2',
      likes: 53,
      note: 'Hearing you laugh out loud is my absolute favorite sound in the world. If I could do one thing for the rest of my life, it would be finding reasons to make you laugh like this.'
    },
    {
      id: '8',
      url: getAssetUrl('8.jpeg'),
      title: 'Fairy In The Enchanted Woods',
      caption: 'Unfiltered & Real Moments 📸',
      date: 'True Happiness',
      category: 'radiance',
      badge: 'Goddess Vibe 🍃',
      rotation: 'rotate-2',
      likes: 39,
      note: 'Like a scene out of a classic poetry book. Standing in traditional wear surrounded by lush green trees, looking up with that serene hope. Breathtaking doesn’t even begin to cover it.'
    },
    {
      id: '9',
      url: getAssetUrl('9.jpeg'),
      title: 'Quiet Wonder & Lost In Thought',
      caption: 'Sweetest Adventures 🌺',
      date: 'Best Companion',
      category: 'favorite',
      badge: 'Lost In Thought 💫',
      rotation: '-rotate-3',
      likes: 47,
      note: 'Lost in your own thoughts, gazing gently into the distance. You have no idea how captivating you look in moments when you do not even realize anyone is watching you.'
    },
    {
      id: '10',
      url: getAssetUrl('10.jpeg'),
      title: 'The Birthday Queen',
      caption: 'Celebrating You Today 🎂',
      date: 'Birthday Special',
      category: 'radiance',
      badge: 'Birthday Star 🎂',
      rotation: 'rotate-1',
      likes: 64,
      note: 'The star of today and every single day. Seeing you celebrate another year of life is such a gift. May your life be as radiant, colorful, and sweet as you make mine.'
    },
    {
      id: '11',
      url: getAssetUrl('11.jpeg'),
      title: 'Blooming Toward The Future',
      caption: 'To A Year That Blooms 🌷',
      date: 'Golden Chapter Ahead',
      category: 'radiance',
      badge: 'Golden Chapter 🌷',
      rotation: '-rotate-2',
      likes: 59,
      note: 'Stepping into your future with elegance and strength. Whatever dreams you chase, I will always be right here cheering for you with all my heart and adoration.'
    }
  ]);

  // Gallery View Modes: 'scrapbook' | 'cinema' | 'wall'
  const [viewMode, setViewMode] = useState('scrapbook');

  // Filter Categories: 'all' | 'candid' | 'radiance' | 'favorite'
  const [activeFilter, setActiveFilter] = useState('all');

  // Flipped card IDs: Empty by default so all cards show the Memory Note first (as in screenshot), flipping reveals the photo!
  const [flippedToPhotoIds, setFlippedToPhotoIds] = useState(new Set());

  // Flip all cards to photos or back to memories
  const handleFlipAll = () => {
    audioEngine.playSparkleFX();
    if (flippedToPhotoIds.size >= photos.length) {
      setFlippedToPhotoIds(new Set());
    } else {
      setFlippedToPhotoIds(new Set(photos.map((p) => p.id)));
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  // Flip / Unflip single Card to reveal photo / memory note
  const handleToggleFlip = (e, photoId) => {
    if (e && e.stopPropagation) e.stopPropagation();
    audioEngine.playSparkleFX();
    setFlippedToPhotoIds((prev) => {
      const next = new Set(prev);
      if (next.has(photoId)) {
        next.delete(photoId);
      } else {
        next.add(photoId);
      }
      return next;
    });
  };

  // Slideshow State
  const [cinemaIndex, setCinemaIndex] = useState(0);
  const [isPlayingCinema, setIsPlayingCinema] = useState(false);

  // Lightbox Modal
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);
  const [lightboxShowNote, setLightboxShowNote] = useState(false);

  // Add Photo Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newNote, setNewNote] = useState('');
  const [newDate, setNewDate] = useState('');

  // Likes & Floating Heart bursts
  const [likedPhotoIds, setLikedPhotoIds] = useState(new Set());
  const [floatingHearts, setFloatingHearts] = useState([]);

  // Auto-play cinema slideshow
  useEffect(() => {
    let timer = null;
    if (viewMode === 'cinema' && isPlayingCinema) {
      timer = setInterval(() => {
        setCinemaIndex((prev) => (prev + 1) % photos.length);
      }, 4000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [viewMode, isPlayingCinema, photos.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeLightboxIndex !== null) {
        if (e.key === 'Escape') {
          setActiveLightboxIndex(null);
          audioEngine.playPopFX();
        } else if (e.key === 'ArrowLeft') {
          setActiveLightboxIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
        } else if (e.key === 'ArrowRight') {
          setActiveLightboxIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
        }
      } else if (viewMode === 'cinema') {
        if (e.key === 'ArrowLeft') {
          setCinemaIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
        } else if (e.key === 'ArrowRight') {
          setCinemaIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, viewMode, photos.length]);

  // Heart Reaction with particle burst
  const handleToggleLike = (e, photoId) => {
    e.stopPropagation();
    audioEngine.playPopFX();

    // Spawn floating heart particle
    const heartId = Date.now() + Math.random();
    setFloatingHearts((prev) => [
      ...prev,
      {
        id: heartId,
        x: (Math.random() - 0.5) * 60,
        emoji: ['💖', '❤️', '✨', '🥰', '🌸'][Math.floor(Math.random() * 5)]
      }
    ]);
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== heartId));
    }, 1200);

    setLikedPhotoIds((prev) => {
      const next = new Set(prev);
      if (next.has(photoId)) {
        next.delete(photoId);
      } else {
        next.add(photoId);
        // Micro confetti on first like
        confetti({
          particleCount: 25,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#FF1744', '#FF69B4', '#FFD700']
        });
      }
      return next;
    });
  };

  const handleOpenLightbox = (index) => {
    audioEngine.playSparkleFX();
    setActiveLightboxIndex(index);
    setLightboxShowNote(false);
  };

  const handlePrevLightbox = (e) => {
    e.stopPropagation();
    setActiveLightboxIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
    audioEngine.playSparkleFX();
  };

  const handleNextLightbox = (e) => {
    e.stopPropagation();
    setActiveLightboxIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
    audioEngine.playSparkleFX();
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newPhotoUrl.trim()) return;

    const newPhoto = {
      id: Date.now().toString(),
      url: newPhotoUrl.trim(),
      title: newCaption.trim() || 'Precious Memory',
      caption: newCaption.trim() || 'Precious Memory',
      note: newNote.trim() || 'A priceless moment etched forever in my heart.',
      date: newDate.trim() || 'Birthday Album',
      category: 'favorite',
      badge: 'New Memory ✨',
      rotation: ['rotate-2', '-rotate-2', 'rotate-3', '-rotate-3'][Math.floor(Math.random() * 4)],
      likes: 1
    };

    setPhotos([newPhoto, ...photos]);
    if (onAddPhoto) onAddPhoto(newPhoto);

    setNewPhotoUrl('');
    setNewCaption('');
    setNewNote('');
    setNewDate('');
    setIsAddModalOpen(false);
    audioEngine.playPopFX();
  };

  // Filtered photos list
  const filteredPhotos = photos.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  const activePhoto = activeLightboxIndex !== null ? photos[activeLightboxIndex] : null;
  const cinemaPhoto = photos[cinemaIndex] || photos[0];

  return (
    <section className="relative min-h-[calc(100vh-140px)] flex flex-col justify-center items-center py-8 sm:py-12 px-3 sm:px-6 z-10 select-none">
      <div className="max-w-6xl mx-auto w-full">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4 sm:gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-pink-300 glass-pill px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 border border-pink-400/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Memory Scrapbook &bull; {photos.length} Captured Moments</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/25 to-pink-500/25 border border-amber-300/50 text-amber-200 text-xs font-bold shadow-sm">
                <Calendar className="w-3.5 h-3.5 text-amber-300" />
                <span>Birthday Date: Today (October 9th) 🎂</span>
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {friendName}'s Photo Gallery 💖
            </h2>
            <p className="text-pink-200/80 text-xs sm:text-base mt-1.5 max-w-xl">
              Every snapshot tells a story of your beauty, your laughter, and the reasons I fell for you.
            </p>
          </div>
        </div>

        {/* Innovative Control Bar: View Modes & Category Filters */}
        <div className="glass-card p-3 sm:p-4 rounded-3xl mb-8 border border-pink-500/30 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* View Modes Toggle */}
          <div className="flex items-center bg-black/40 p-1.5 rounded-2xl border border-white/10 w-full sm:w-auto justify-around sm:justify-start">
            <button
              onClick={() => {
                setViewMode('scrapbook');
                audioEngine.playPopFX();
              }}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                viewMode === 'scrapbook'
                  ? 'bg-gradient-to-r from-rose-600 to-pink-500 text-white shadow-md'
                  : 'text-pink-200 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Polaroids</span>
            </button>

            <button
              onClick={() => {
                setViewMode('cinema');
                setIsPlayingCinema(true);
                audioEngine.playSparkleFX();
              }}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                viewMode === 'cinema'
                  ? 'bg-gradient-to-r from-rose-600 to-pink-500 text-white shadow-md'
                  : 'text-pink-200 hover:text-white'
              }`}
            >
              <Film className="w-4 h-4" />
              <span>Cinema Reel 🎬</span>
            </button>

            <button
              onClick={() => {
                setViewMode('wall');
                audioEngine.playPopFX();
              }}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                viewMode === 'wall'
                  ? 'bg-gradient-to-r from-rose-600 to-pink-500 text-white shadow-md'
                  : 'text-pink-200 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Love Wall ✨</span>
            </button>
          </div>

          {/* Filter Pills & Flip All Button (For Scrapbook & Wall Modes) */}
          {viewMode !== 'cinema' && (
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none flex-wrap justify-end">
              {/* Flip All Toggle Button in Scrapbook */}
              {viewMode === 'scrapbook' && (
                <button
                  type="button"
                  onClick={handleFlipAll}
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 text-white shadow-md hover:scale-105 active:scale-95 flex items-center gap-1.5 border border-white/20"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>
                    {flippedToPhotoIds.size >= photos.length
                      ? 'Flip All to Memories 💌'
                      : 'Flip All to Photos 📸'}
                  </span>
                </button>
              )}

              {[
                { id: 'all', label: `All (${photos.length})` },
                { id: 'candid', label: '🌸 Candid & Cute' },
                { id: 'radiance', label: '🤍 Angelic & Saree' },
                { id: 'favorite', label: '✨ Top Favorites' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    setActiveFilter(f.id);
                    audioEngine.playSparkleFX();
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeFilter === f.id
                      ? 'bg-white text-rose-900 shadow-md font-bold'
                      : 'bg-white/10 text-pink-200 hover:bg-white/20 border border-white/10'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Animated Feature: The One Person Is Always Waiting For You */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative mb-8 rounded-3xl overflow-hidden p-[2px] bg-gradient-to-r from-pink-500 via-rose-500 via-amber-300 to-pink-500 shadow-[0_0_35px_rgba(255,23,68,0.4)]"
        >
          {/* Shimmer background animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-rose-600/30 via-pink-500/20 to-amber-500/30 animate-pulse pointer-events-none" />

          {/* Floating animated particles within banner */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-sm select-none opacity-60"
                initial={{
                  x: `${15 + i * 15}%`,
                  y: '100%',
                  opacity: 0,
                  scale: 0.6
                }}
                animate={{
                  y: ['100%', '-20%'],
                  opacity: [0, 0.8, 0],
                  scale: [0.6, 1.2, 0.8],
                  x: [`${15 + i * 15}%`, `${12 + i * 15 + (i % 2 === 0 ? 5 : -5)}%`]
                }}
                transition={{
                  duration: 4 + i * 0.7,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: 'easeInOut'
                }}
              >
                {['💖', '✨', '🌸', '💫', '❤️', '💌'][i]}
              </motion.span>
            ))}
          </div>

          <div className="relative bg-gradient-to-r from-[#2A0617]/95 via-[#3D0A23]/95 to-[#240515]/95 backdrop-blur-xl p-4 sm:p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-5 border border-pink-300/30">
            {/* Animated Beacon & Text */}
            <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
              <div className="relative shrink-0">
                {/* Expanding pulsing ripple ring */}
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                  className="absolute -inset-2 rounded-2xl bg-pink-500/40 blur-sm pointer-events-none"
                />

                <motion.div
                  animate={{
                    scale: [1, 1.12, 1],
                    rotate: [0, 3, -3, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-rose-500 via-pink-600 to-amber-400 p-[2px] shadow-lg flex items-center justify-center text-3xl select-none"
                >
                  <div className="w-full h-full rounded-2xl bg-black/50 flex items-center justify-center backdrop-blur-sm">
                    <motion.span
                      animate={{ scale: [1, 1.25, 1] }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                    >
                      💖
                    </motion.span>
                  </div>
                </motion.div>
              </div>

              <div className="space-y-1">
                {/* Header Tag */}
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500/30 to-pink-500/30 border border-amber-300/50 text-amber-200 text-[11px] font-bold tracking-wider uppercase">
                    <Sparkles className="w-3 h-3 text-amber-300 animate-spin" />
                    <span>A Constant Promise</span>
                  </span>
                  <span className="text-pink-300/80 text-xs hidden sm:inline">&bull; Always In My Heart</span>
                </div>

                {/* Animated Glowing Title */}
                <motion.h3
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(255,105,180,0.6)',
                      '0 0 35px rgba(255,215,0,0.8)',
                      '0 0 20px rgba(255,105,180,0.6)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="font-serif text-xl sm:text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-200 to-amber-200 leading-tight"
                >
                  "The one person is always waiting for you."
                </motion.h3>

                {/* Romantic Message */}
                <p className="text-xs sm:text-sm text-pink-100/90 font-sans max-w-xl leading-relaxed">
                  No matter where your path leads, no matter how busy the days become — there is always one person whose heart remains your safest home, waiting patiently with unconditional warmth, admiration, and love. ✨
                </p>
              </div>
            </div>

            {/* Interactive Love Button */}
            <div className="shrink-0 flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  confetti({
                    particleCount: 50,
                    spread: 75,
                    origin: { y: 0.4 },
                    colors: ['#FF1744', '#FF69B4', '#FFD700', '#FFFFFF']
                  });
                  audioEngine.playSparkleFX();
                }}
                className="px-4 py-2.5 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(255,23,68,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer border border-white/20 whitespace-nowrap"
              >
                <Heart className="w-4 h-4 fill-white animate-pulse" />
                <span>Feel The Love 💌</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Scrapbook Mode Sub-header helper */}
        {viewMode === 'scrapbook' && (
          <div className="mb-5 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-pink-400/30 text-xs text-pink-200 shadow-sm backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>
                {flippedToPhotoIds.size >= photos.length
                  ? 'Showing photo memories — Tap any card to read its secret thought! 💌'
                  : 'Our secret memory thoughts — Tap any card to flip & reveal the photo! 📸✨'}
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            </span>
          </div>
        )}

        {/* =========================================================================
            VIEW MODE 1: POLAROID SCRAPBOOK WITH 3D FLIP LOVE-NOTE EFFECT
        ========================================================================= */}
        {viewMode === 'scrapbook' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredPhotos.map((photo, index) => {
              const isLiked = likedPhotoIds.has(photo.id);
              const isShowingPhoto = flippedToPhotoIds.has(photo.id);
              const currentLikes = photo.likes + (isLiked ? 1 : 0);

              return (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                  className={`group relative cursor-pointer ${photo.rotation} hover:rotate-0 hover:scale-[1.02] transition-all duration-300`}
                  style={{ perspective: '1200px' }}
                  onClick={(e) => handleToggleFlip(e, photo.id)}
                >
                  {/* Decorative Pastel Washi Tape */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 sm:w-20 h-5 bg-gradient-to-r from-amber-200/80 via-pink-200/80 to-rose-200/80 backdrop-blur-sm border-x border-pink-300/60 rotate-1 z-30 pointer-events-none shadow-sm" />

                  {/* 3D Flipping Card Container */}
                  <div
                    className="relative w-full rounded-3xl transition-transform duration-700 ease-in-out shadow-[0_15px_35px_rgba(0,0,0,0.35)]"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: isShowingPhoto ? 'rotateY(180deg)' : 'rotateY(0deg)',
                      minHeight: '410px'
                    }}
                  >
                    {/* FRONT SIDE (Default): Secret Thought / Memory Letter (matching user's screenshot) */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-3xl bg-[#FFFDF9] text-gray-900 p-2.5 sm:p-3.5 border-2 border-amber-300/90 flex flex-col justify-between overflow-hidden"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden'
                      }}
                    >
                      <div className="h-full flex flex-col justify-between p-2.5 sm:p-3 bg-[#FFF9ED] rounded-2xl border border-amber-200 shadow-inner">
                        <div className="flex-1 flex flex-col">
                          {/* Top Stamp matching screenshot */}
                          <div className="flex items-center justify-between pb-2 border-b border-amber-300/40 mb-2">
                            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-rose-950 bg-rose-100/90 px-2.5 py-0.5 rounded border border-rose-200 flex items-center gap-1 shadow-xs">
                              <span>💌 SECRET MEMORY NOTE</span>
                            </span>
                            <span className="text-xs">❤️</span>
                          </div>

                          <h4 className="font-serif text-sm sm:text-base font-extrabold text-rose-950 mb-2 leading-snug tracking-tight">
                            {photo.title || photo.caption}
                          </h4>

                          <div className="flex-1 bg-white/90 p-3 sm:p-3.5 rounded-xl border border-amber-200/90 shadow-xs flex items-center overflow-y-auto max-h-[200px] scrollbar-none my-1">
                            <p className="font-sans text-xs sm:text-[13px] md:text-sm text-slate-800 leading-relaxed font-normal tracking-normal select-text">
                              <Quote className="w-3.5 h-3.5 text-rose-500 inline mr-1.5 -mt-1 shrink-0" />
                              {photo.note}
                            </p>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-amber-300/40 flex items-center justify-between mt-2.5">
                          <button
                            type="button"
                            onClick={(e) => handleToggleFlip(e, photo.id)}
                            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-transform active:scale-95"
                          >
                            <RotateCw className="w-3.5 h-3.5" />
                            <span>Flip To See Photo 📸</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* BACK SIDE (Revealed upon Flip): Authentic Polaroid Photo */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-3xl bg-[#FFFDF9] text-gray-900 p-2.5 sm:p-3.5 border-2 border-pink-200/90 flex flex-col justify-between overflow-hidden"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      {/* Top Badge & Number */}
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-[10px] sm:text-xs font-bold text-rose-700 bg-rose-100/90 px-2.5 py-0.5 rounded-full border border-rose-200 ${photo.id === '4' ? 'ring-2 ring-rose-400 animate-pulse' : ''}`}>
                          {photo.badge || `#${index + 1}`}
                        </span>
                        <span className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase">
                          #{index + 1}
                        </span>
                      </div>

                      {/* Photo Image Frame */}
                      <div
                        className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gray-950 shadow-inner group-hover:shadow-md cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenLightbox(photos.findIndex((p) => p.id === photo.id));
                        }}
                      >
                        <img
                          src={getAssetUrl(photo.url)}
                          alt={photo.caption}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          onError={(e) => {
                            if (!e.target.dataset.fallbackTried) {
                              e.target.dataset.fallbackTried = 'true';
                              e.target.src = getAssetUrl('1.jpeg');
                            }
                          }}
                        />

                        {/* Hover Enlarge Badge */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-2 text-white">
                          <span className="text-[10px] font-bold flex items-center gap-1 text-pink-200 bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-md">
                            <Maximize2 className="w-3 h-3 text-pink-300" /> Tap to enlarge
                          </span>
                        </div>
                      </div>

                      {/* Polaroid Caption & Action Footer */}
                      <div className="mt-1.5 text-center">
                        <p className="font-sans text-xs sm:text-sm text-rose-950 font-bold leading-tight line-clamp-1">
                          {photo.caption}
                        </p>

                        <div className="mt-1.5 pt-1.5 border-t border-pink-100 flex items-center justify-between gap-1 text-xs">
                          {/* Read Note Flip Button */}
                          <button
                            type="button"
                            onClick={(e) => handleToggleFlip(e, photo.id)}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 text-[11px] font-bold border border-rose-200/80 transition-colors cursor-pointer"
                            title="Read secret thought"
                          >
                            <MessageSquareHeart className="w-3 h-3 text-rose-500" />
                            <span>Read Note 💌</span>
                          </button>

                          {/* Like Reaction Button */}
                          <button
                            type="button"
                            onClick={(e) => handleToggleLike(e, photo.id)}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-pink-50 hover:bg-pink-100 text-rose-600 text-[11px] font-bold border border-pink-200 transition-colors cursor-pointer"
                          >
                            <Heart
                              className={`w-3.5 h-3.5 ${
                                isLiked ? 'text-rose-500 fill-rose-500 animate-pulse' : 'text-gray-400'
                              }`}
                            />
                            <span>{currentLikes}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* =========================================================================
            VIEW MODE 2: CINEMATIC SLIDESHOW / PROJECTOR REEL
        ========================================================================= */}
        {viewMode === 'cinema' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full"
          >
            <div className="glass-card p-4 sm:p-8 rounded-3xl border border-pink-500/40 shadow-[0_0_60px_rgba(255,23,68,0.35)] relative overflow-hidden">
              
              {/* Background ambient glow */}
              <div className="absolute -top-20 -left-20 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-amber-600/20 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                
                {/* Cinema Main Stage (Photo Aspect) */}
                <div className="lg:col-span-7 flex flex-col items-center justify-center">
                  <div
                    className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 bg-black cursor-pointer group"
                    onClick={() => handleOpenLightbox(cinemaIndex)}
                  >
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={cinemaPhoto.id}
                        src={getAssetUrl(cinemaPhoto.url)}
                        alt={cinemaPhoto.caption}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.7 }}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          if (!e.target.dataset.fallbackTried) {
                            e.target.dataset.fallbackTried = 'true';
                            e.target.src = getAssetUrl('1.jpeg');
                          }
                        }}
                      />
                    </AnimatePresence>

                    {/* Badge Stamp on Cinema Image */}
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold border border-white/20">
                      {cinemaPhoto.badge || `Memory #${cinemaIndex + 1}`}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-between p-4 text-white">
                      <span className="text-xs font-bold text-pink-200 flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">
                        <Maximize2 className="w-3.5 h-3.5 text-pink-300" /> Tap to view full size
                      </span>
                      <span className="text-xs font-semibold text-white/80">
                        {cinemaIndex + 1} / {photos.length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cinema Story Details & Controls */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-5 text-left">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-300 glass-pill px-3 py-1 rounded-full inline-block mb-3 border border-amber-300/40">
                      Chapter Highlight &bull; {cinemaPhoto.date}
                    </span>

                    <h3 className="font-serif text-2xl sm:text-4xl font-extrabold text-white mb-2 leading-tight">
                      {cinemaPhoto.title || cinemaPhoto.caption}
                    </h3>

                    <div className="border-l-4 border-rose-400 pl-4 py-2.5 my-4 bg-white/10 rounded-r-2xl backdrop-blur-md shadow-inner">
                      <p className="font-sans text-sm sm:text-base md:text-lg text-rose-50 leading-relaxed font-normal">
                        <Quote className="w-4 h-4 text-amber-300 inline mr-2 -mt-1" />
                        {cinemaPhoto.note}
                      </p>
                    </div>
                  </div>

                  {/* Interactive Slideshow Playback Controls */}
                  <div className="pt-2 border-t border-pink-500/20">
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setCinemaIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
                            audioEngine.playSparkleFX();
                          }}
                          className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                          title="Previous Photo"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setIsPlayingCinema(!isPlayingCinema);
                            audioEngine.playPopFX();
                          }}
                          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                        >
                          {isPlayingCinema ? (
                            <>
                              <Pause className="w-4 h-4 fill-white" />
                              <span>Pause Reel</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 fill-white" />
                              <span>Play Reel</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setCinemaIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
                            audioEngine.playSparkleFX();
                          }}
                          className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                          title="Next Photo"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Like in Cinema */}
                      <button
                        type="button"
                        onClick={(e) => handleToggleLike(e, cinemaPhoto.id)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-600/30 hover:bg-rose-600/50 border border-rose-500/50 text-pink-100 text-xs font-bold transition-all cursor-pointer"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            likedPhotoIds.has(cinemaPhoto.id)
                              ? 'text-rose-500 fill-rose-500 animate-pulse'
                              : 'text-white'
                          }`}
                        />
                        <span>
                          {cinemaPhoto.likes + (likedPhotoIds.has(cinemaPhoto.id) ? 1 : 0)} Likes
                        </span>
                      </button>
                    </div>

                    {/* Thumbnail Filmstrip Navigation */}
                    <div className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-none">
                      {photos.map((p, idx) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => {
                            setCinemaIndex(idx);
                            audioEngine.playSparkleFX();
                          }}
                          className={`relative w-12 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                            cinemaIndex === idx
                              ? 'border-amber-400 scale-105 shadow-md ring-2 ring-amber-300/50'
                              : 'border-white/30 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={getAssetUrl(p.url)} alt={p.caption} className="w-full h-full object-cover object-top" />
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </motion.div>
        )}

        {/* =========================================================================
            VIEW MODE 3: ROMANTIC LOVE WALL / MASONRY COLLAGE
        ========================================================================= */}
        {viewMode === 'wall' && (
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
            {filteredPhotos.map((photo, index) => {
              const isLiked = likedPhotoIds.has(photo.id);
              const currentLikes = photo.likes + (isLiked ? 1 : 0);

              return (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="break-inside-avoid glass-card p-3 rounded-3xl border border-pink-400/40 shadow-xl hover:scale-[1.02] transition-transform cursor-pointer relative overflow-hidden group"
                  onClick={() => handleOpenLightbox(photos.findIndex((p) => p.id === photo.id))}
                >
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-black mb-2.5">
                    <img
                      src={getAssetUrl(photo.url)}
                      alt={photo.caption}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        if (!e.target.dataset.fallbackTried) {
                          e.target.dataset.fallbackTried = 'true';
                          e.target.src = getAssetUrl('1.jpeg');
                        }
                      }}
                    />
                    <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-amber-200 border border-white/20">
                      {photo.badge}
                    </div>
                  </div>

                  <p className="font-serif text-sm sm:text-base font-bold text-white leading-snug">
                    {photo.title || photo.caption}
                  </p>
                  <p className="font-sans text-xs sm:text-sm text-pink-100/90 mt-1.5 leading-relaxed line-clamp-3">
                    "{photo.note}"
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-pink-500/20 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-pink-300 font-semibold">{photo.date}</span>
                    <button
                      type="button"
                      onClick={(e) => handleToggleLike(e, photo.id)}
                      className="flex items-center gap-1 text-pink-200 hover:text-white"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isLiked ? 'text-rose-500 fill-rose-500' : 'text-white/60'
                        }`}
                      />
                      <span className="text-[11px] font-bold">{currentLikes}</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Gallery Bottom Note & Sweet Compliment Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 glass-card p-6 sm:p-8 rounded-3xl border border-pink-400/30 text-center max-w-2xl mx-auto shadow-xl"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              To The Prettiest Girl In Every Frame
            </h3>
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
          </div>
          <p className="text-pink-100/90 text-sm sm:text-base leading-relaxed">
            "No camera could ever truly capture just how bright, kind, and wonderful you are in person. These are just small glimpses of the million reasons you have my heart." ❤️
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                confetti({
                  particleCount: 80,
                  spread: 80,
                  origin: { y: 0.6 },
                  colors: ['#FF1744', '#FFD700', '#FF69B4', '#FFFFFF']
                });
                audioEngine.playSparkleFX();
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-500 text-white font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer"
            >
              Shower Love With Confetti 🎉
            </button>

            {onPrevPage && (
              <button
                type="button"
                onClick={onPrevPage}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-pink-200 hover:text-white font-medium text-xs sm:text-sm border border-white/15 transition-all cursor-pointer"
              >
                ← Back to Cake 🎂
              </button>
            )}

            {onNextPage && (
              <button
                type="button"
                onClick={onNextPage}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500 hover:brightness-110 shadow-[0_0_20px_rgba(255,105,180,0.6)] text-white font-bold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer"
              >
                Next: Special Letter 💌 →
              </button>
            )}
          </div>
        </motion.div>

      </div>

      {/* Floating Animated Hearts particles when liked */}
      {floatingHearts.map((h) => (
        <motion.div
          key={h.id}
          initial={{ opacity: 1, y: 0, scale: 0.8 }}
          animate={{ opacity: 0, y: -90, scale: 1.5, x: h.x }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="fixed bottom-24 left-1/2 pointer-events-none text-3xl z-50 select-none"
        >
          {h.emoji}
        </motion.div>
      ))}

      {/* =========================================================================
          FULL-SCREEN CINEMATIC LIGHTBOX MODAL (WITH NOTE & THUMBNAILS)
      ========================================================================= */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/94 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none"
            onClick={() => {
              setActiveLightboxIndex(null);
              audioEngine.playPopFX();
            }}
          >
            {/* Primary Viewport Close Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveLightboxIndex(null);
                audioEngine.playPopFX();
              }}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-full bg-white/20 hover:bg-white/40 active:scale-95 text-white transition-all z-[120] cursor-pointer border border-white/30 backdrop-blur-md shadow-2xl pointer-events-auto"
              title="Close (Esc)"
              aria-label="Close"
            >
              <X className="w-6 h-6 stroke-[2.5]" />
            </button>

            {/* Prev Photo Button */}
            <button
              type="button"
              onClick={handlePrevLightbox}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all hover:scale-110 active:scale-90 z-[110] cursor-pointer border border-white/20 backdrop-blur-md pointer-events-auto"
              title="Previous photo"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Next Photo Button */}
            <button
              type="button"
              onClick={handleNextLightbox}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all hover:scale-110 active:scale-90 z-[110] cursor-pointer border border-white/20 backdrop-blur-md pointer-events-auto"
              title="Next photo"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Modal Card */}
            <motion.div
              key={activePhoto.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl w-full glass-card p-3 sm:p-6 rounded-3xl border border-pink-500/40 shadow-[0_0_60px_rgba(255,23,68,0.6)] overflow-hidden flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Secondary Close Button on card corner */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLightboxIndex(null);
                  audioEngine.playPopFX();
                }}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-black/70 hover:bg-black/90 active:scale-90 text-white transition-all z-40 cursor-pointer border border-white/30 backdrop-blur-md shadow-lg"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo Display */}
              <div className="rounded-2xl overflow-hidden max-h-[60vh] sm:max-h-[66vh] flex items-center justify-center bg-black/70 w-full relative">
                <img
                  src={getAssetUrl(activePhoto.url)}
                  alt={activePhoto.caption}
                  className="max-h-[58vh] sm:max-h-[64vh] w-auto max-w-full object-contain rounded-xl"
                  onError={(e) => {
                    if (!e.target.dataset.fallbackTried) {
                      e.target.dataset.fallbackTried = 'true';
                      e.target.src = getAssetUrl('1.jpeg');
                    }
                  }}
                />

                {/* Badge Stamp */}
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-amber-200 text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                  {activePhoto.badge}
                </div>
              </div>

              {/* Lightbox Information & Love Note Drawer */}
              <div className="mt-3 w-full flex flex-col gap-2 px-2 sm:px-4 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-serif text-lg sm:text-2xl font-bold text-white">
                      {activePhoto.title || activePhoto.caption}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-pink-300 font-medium uppercase tracking-widest">
                      {activePhoto.date} &bull; Photo {activeLightboxIndex + 1} of {photos.length}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Toggle Note Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setLightboxShowNote(!lightboxShowNote);
                        audioEngine.playSparkleFX();
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-500/20 hover:bg-pink-500/40 border border-pink-400/40 text-pink-200 text-xs font-bold transition-all cursor-pointer"
                    >
                      <MessageSquareHeart className="w-3.5 h-3.5 text-pink-300" />
                      <span>{lightboxShowNote ? 'Hide Note' : 'Read Note 💌'}</span>
                    </button>

                    {/* Like button in Lightbox */}
                    <button
                      type="button"
                      onClick={(e) => handleToggleLike(e, activePhoto.id)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-600/30 hover:bg-rose-600/50 border border-rose-500/40 text-pink-200 text-xs font-bold transition-all cursor-pointer"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                          likedPhotoIds.has(activePhoto.id) ? 'text-rose-500 fill-rose-500' : 'text-white'
                        }`}
                      />
                      <span>
                        {activePhoto.likes + (likedPhotoIds.has(activePhoto.id) ? 1 : 0)} Likes
                      </span>
                    </button>
                  </div>
                </div>

                {/* Expandable Love Note in Lightbox */}
                {lightboxShowNote && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3.5 sm:p-4 rounded-2xl bg-black/85 border border-pink-400/50 text-white text-xs sm:text-sm font-sans leading-relaxed shadow-xl"
                  >
                    <div className="flex items-start gap-2.5">
                      <Quote className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                      <p className="font-medium text-pink-50 leading-relaxed">{activePhoto.note}</p>
                    </div>
                  </motion.div>
                )}

                {/* Bottom Thumbnails Strip */}
                <div className="flex items-center gap-1.5 overflow-x-auto pt-2 scrollbar-none">
                  {photos.map((p, idx) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setActiveLightboxIndex(idx)}
                      className={`relative w-10 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        activeLightboxIndex === idx
                          ? 'border-pink-400 scale-105 ring-2 ring-pink-400/50'
                          : 'border-white/20 opacity-50 hover:opacity-100'
                      }`}
                    >
                      <img src={getAssetUrl(p.url)} alt={p.caption} className="w-full h-full object-cover object-top" />
                    </button>
                  ))}
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Custom Photo Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-card max-w-lg w-full p-6 sm:p-8 rounded-3xl border border-pink-500/40 shadow-[0_0_50px_rgba(255,23,68,0.5)]"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Camera className="w-6 h-6 text-pink-400" />
                  <h3 className="font-serif text-xl font-bold text-white">Add Photo to Album</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-pink-900/50 text-pink-300 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-pink-200 mb-1">
                    Photo Image URL or Path (e.g. /1.jpeg)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. /2.jpeg or image URL"
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-pink-500/30 text-white placeholder-pink-400/40 focus:outline-none focus:border-pink-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-pink-200 mb-1">
                    Title & Caption
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Beautiful Smile"
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-pink-500/30 text-white placeholder-pink-400/40 focus:outline-none focus:border-pink-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-pink-200 mb-1">
                    Romantic Note / Memory
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Why this photo is so special to you..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-pink-500/30 text-white placeholder-pink-400/40 focus:outline-none focus:border-pink-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-pink-200 mb-1">
                    Date or Tag
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Precious Memories"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-pink-500/30 text-white placeholder-pink-400/40 focus:outline-none focus:border-pink-400 text-sm"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-pink-500/20">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-pink-200 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#DC143C] to-[#FF69B4] text-white font-bold text-xs shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  >
                    Add to Scrapbook ✨
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
