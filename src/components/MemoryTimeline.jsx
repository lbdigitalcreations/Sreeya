import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Calendar, Heart, Plus, Sparkles, MapPin, X, Star, Maximize2, Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { audioEngine } from '../services/audioService';

export const MemoryTimeline = ({ friendName = 'Sreenya', initialMemories, onAddMemory }) => {
  const [memories, setMemories] = useState(initialMemories || [
    {
      id: '1',
      date: 'Chapter 1',
      title: 'The First Time I Saw You 👀✨',
      location: 'The First Spark',
      description: 'The exact moment you walked into my world, my heart skipped a beat. A simple glance, but your warmth and radiant presence made you unforgettable. That was the day my crush quietly began.',
      photo: '/1.jpeg',
      photoCaption: 'The First Glance ✨',
      tag: 'First Spark'
    },
    {
      id: '2',
      date: 'Chapter 2',
      title: 'Secret Smiles & Butterfly Feelings 🦋',
      location: 'Every Little Conversation',
      description: 'Whenever you smiled or looked my way, my whole day instantly lit up. I tried so hard to act normal and play it cool, but truth is, having this huge crush on you made every ordinary day feel magical.',
      photo: '/2.jpeg',
      photoCaption: 'That Beautiful Smile ❤️',
      tag: 'Crush Feelings'
    },
    {
      id: '3',
      date: 'Chapter 3',
      title: 'Late Night Talks I Never Wanted To End 🌙',
      location: 'Under The Stars',
      description: 'Talking till 2 AM about life, music, and random jokes that only we understood. Listening to your laugh over the phone, I realized this was no longer just a crush — I was genuinely and deeply falling for you.',
      photo: '/3.jpeg',
      photoCaption: 'Pure Joy & Laughter 🌟',
      tag: 'Falling For You'
    },
    {
      id: '4',
      date: 'Chapter 4',
      title: 'Adoring Everything About You 🌸',
      location: 'In Every Small Detail',
      description: 'Your kindness, your effortless grace, the way you care so deeply about the people around you, and how you light up any room. The more I got to know you, the more I wished I could be the one to hold your hand.',
      photo: '/5.jpeg',
      photoCaption: 'Effortlessly Gorgeous 🚀',
      tag: 'Pure Admiration'
    },
    {
      id: '5',
      date: 'Chapter 5',
      title: 'Wanting To Be Your Safe Place 💖',
      location: 'Through Every Season',
      description: 'In good times and tough days, I always find myself wanting to protect your smile and cheer you on. You bring so much peace and brightness into my life, and standing by you feels so natural.',
      photo: '/6.jpeg',
      photoCaption: 'My Favorite Person 🌸',
      tag: 'Standing By You'
    },
    {
      id: '6',
      date: 'Birthday Wish ✨',
      title: 'To The Girl Who Stole My Heart 🎂',
      location: 'Straight From The Heart',
      description: `Happy Birthday, ${friendName}! You deserve all the laughter, happiness, and beauty this world has to offer today. Celebrating the wonderful person you are will always be my favorite day of the year.`,
      photo: '/7.jpeg',
      photoCaption: 'Celebrating You, Sreenya ❤️',
      tag: 'For Your Birthday'
    },
    {
      id: '7',
      date: 'The Big Question 💍',
      title: 'Taking The Leap: Will You Be Mine? 💍💖',
      location: 'A Question From My Heart',
      description: 'I do not just want to keep this crush inside or admire you from afar anymore. On your special day, with all the courage in my heart: Sreenya, will you hold my hand and let me be yours?',
      photo: '/8.jpeg',
      photoCaption: 'Will You Say Yes? 💍',
      tag: 'The Proposal 💍'
    }
  ]);

  const [proposalAnswer, setProposalAnswer] = useState(null); // null | 'yes' | 'thinking'

  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [tag, setTag] = useState('');

  const openLightbox = (photoUrl, caption) => {
    audioEngine.playSparkleFX();
    setLightboxPhoto({ url: photoUrl, caption });
  };

  // Close lightbox or modal on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (lightboxPhoto) {
          setLightboxPhoto(null);
          audioEngine.playPopFX();
        } else if (isModalOpen) {
          setIsModalOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxPhoto, isModalOpen]);

  const handleCreateMemory = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newMem = {
      id: Date.now().toString(),
      title: title.trim(),
      date: date.trim() || 'New Milestone',
      location: location.trim() || 'Special Memory',
      description: description.trim() || 'A priceless moment worth keeping.',
      photo: photoUrl.trim() || '/1.jpeg',
      photoCaption: title.trim(),
      tag: tag.trim() || 'Memorable'
    };

    setMemories([newMem, ...memories]);
    if (onAddMemory) onAddMemory(newMem);

    setTitle('');
    setDate('');
    setLocation('');
    setDescription('');
    setPhotoUrl('');
    setTag('');
    setIsModalOpen(false);
    audioEngine.playPopFX();
  };

  // Helper to render the Story Text Card (used on Desktop)
  const renderStoryCard = (item) => (
    <div
      className={`glass-card p-6 sm:p-7 rounded-3xl text-left w-full shadow-[0_15px_35px_rgba(0,0,0,0.35)] transition-all ${
        item.tag === 'The Proposal 💍'
          ? 'border-2 border-amber-300 shadow-[0_0_40px_rgba(255,215,0,0.5)] bg-gradient-to-br from-rose-950 via-[#3a0314] to-amber-950/90'
          : item.tag === 'For Your Birthday'
          ? 'border-2 border-amber-300/60 shadow-[0_0_30px_rgba(255,215,0,0.3)] bg-gradient-to-br from-rose-950/80 via-black/50 to-amber-950/40'
          : 'border border-pink-500/30'
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <span
          className={`text-xs font-bold uppercase tracking-widest glass-pill px-3.5 py-1 rounded-full ${
            item.tag === 'The Proposal 💍'
              ? 'text-amber-200 border-amber-300 bg-amber-950/70 shadow-[0_0_15px_rgba(255,215,0,0.4)]'
              : item.tag === 'For Your Birthday'
              ? 'text-amber-300 border-amber-400/40'
              : 'text-pink-300 border-pink-400/30'
          }`}
        >
          {item.date}
        </span>
        {item.tag && (
          <span
            className={`text-xs font-semibold flex items-center gap-1 ${
              item.tag === 'The Proposal 💍'
                ? 'text-amber-200 font-bold'
                : item.tag === 'For Your Birthday'
                ? 'text-amber-200'
                : 'text-amber-300'
            }`}
          >
            {item.tag === 'The Proposal 💍' ? (
              <>💍 {item.tag}</>
            ) : (
              <><Star className="w-3.5 h-3.5 fill-amber-300" /> {item.tag}</>
            )}
          </span>
        )}
      </div>

      <h3 className="font-serif text-2xl font-bold text-white mb-1.5">
        {item.title}
      </h3>

      {item.location && (
        <p className="text-xs text-pink-300/90 font-medium flex items-center gap-1.5 mb-3.5">
          <MapPin className="w-3.5 h-3.5 text-pink-400" /> {item.location}
        </p>
      )}

      <p className="text-pink-100/90 text-sm sm:text-base leading-relaxed font-normal">
        {item.description}
      </p>
    </div>
  );

  // Helper to render the Dedicated Full Photo Frame Card (used on Desktop)
  const renderPhotoCard = (item) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative group cursor-pointer w-full select-none"
      onClick={() => openLightbox(item.photo, item.photoCaption || item.title)}
    >
      {/* Decorative Washi Tape at Top */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-pink-300/50 backdrop-blur-sm border-x border-pink-200/60 rotate-1 z-20 pointer-events-none shadow-sm" />

      {/* Polaroid / Scrapbook Frame with full portrait aspect ratio (head never cut off) */}
      <div className="bg-white/95 p-3.5 sm:p-4 rounded-3xl shadow-[0_20px_45px_rgba(0,0,0,0.45)] border-2 border-pink-200/80 text-gray-900 transition-all duration-300">
        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gray-950 shadow-inner">
          <img
            src={item.photo}
            alt={item.title}
            className="w-full h-full object-cover object-top group-hover:scale-106 transition-transform duration-700"
            onError={(e) => {
              e.target.src = '/1.jpeg';
            }}
          />

          {/* Hover Overlay with Click to Enlarge and Heart */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3.5 text-white">
            <span className="text-xs font-bold flex items-center gap-1.5 text-pink-200 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-md">
              <Maximize2 className="w-3.5 h-3.5 text-pink-300" /> View Full Photo
            </span>
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
          </div>
        </div>

        {/* Polaroid Handwritten Caption */}
        <div className="mt-3 text-center px-2 flex items-center justify-between">
          <p className="font-cursive text-2xl text-[#8B0000] font-bold tracking-wide">
            {item.photoCaption || item.title}
          </p>
          <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
            📸 #{item.id}
          </span>
        </div>
      </div>
    </motion.div>
  );

  // Helper to render Mobile Single Unified Card (perfect mobile ratio, story + polaroid photo with 0 duplicates)
  const renderMobileCard = (item) => (
    <div
      className={`glass-card p-5 rounded-3xl text-left w-full shadow-[0_15px_35px_rgba(0,0,0,0.35)] transition-all ${
        item.tag === 'The Proposal 💍'
          ? 'border-2 border-amber-300 shadow-[0_0_40px_rgba(255,215,0,0.5)] bg-gradient-to-br from-rose-950 via-[#3a0314] to-amber-950/90'
          : item.tag === 'For Your Birthday'
          ? 'border-2 border-amber-300/60 shadow-[0_0_30px_rgba(255,215,0,0.3)] bg-gradient-to-br from-rose-950/80 via-black/50 to-amber-950/40'
          : 'border border-pink-500/30'
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <span
          className={`text-xs font-bold uppercase tracking-widest glass-pill px-3 py-1 rounded-full ${
            item.tag === 'The Proposal 💍'
              ? 'text-amber-200 border-amber-300 bg-amber-950/70 shadow-[0_0_15px_rgba(255,215,0,0.4)]'
              : item.tag === 'For Your Birthday'
              ? 'text-amber-300 border-amber-400/40'
              : 'text-pink-300 border-pink-400/30'
          }`}
        >
          {item.date}
        </span>
        {item.tag && (
          <span
            className={`text-xs font-semibold flex items-center gap-1 ${
              item.tag === 'The Proposal 💍'
                ? 'text-amber-200 font-bold'
                : item.tag === 'For Your Birthday'
                ? 'text-amber-200'
                : 'text-amber-300'
            }`}
          >
            {item.tag === 'The Proposal 💍' ? (
              <>💍 {item.tag}</>
            ) : (
              <><Star className="w-3.5 h-3.5 fill-amber-300" /> {item.tag}</>
            )}
          </span>
        )}
      </div>

      <h3 className="font-serif text-xl font-bold text-white mb-1 leading-snug">
        {item.title}
      </h3>

      {item.location && (
        <p className="text-xs text-pink-300/90 font-medium flex items-center gap-1.5 mb-2.5">
          <MapPin className="w-3.5 h-3.5 text-pink-400 shrink-0" /> {item.location}
        </p>
      )}

      <p className="text-pink-100/90 text-sm leading-relaxed font-normal mb-3.5">
        {item.description}
      </p>

      {/* Polaroid Photo Frame inside Mobile Card */}
      {item.photo && (
        <div
          className="relative bg-white/95 p-3 rounded-2xl shadow-lg border border-pink-200/80 text-gray-900 cursor-pointer group select-none active:scale-[0.99] transition-transform"
          onClick={() => openLightbox(item.photo, item.photoCaption || item.title)}
        >
          {/* Decorative Washi Tape */}
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 h-4 bg-pink-300/50 backdrop-blur-sm border-x border-pink-200/60 rotate-1 z-20 pointer-events-none shadow-sm" />

          {/* Photo Frame (aspect 4/5, object-top so faces are never cropped) */}
          <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-gray-950">
            <img
              src={item.photo}
              alt={item.title}
              className="w-full h-full object-cover object-top"
              loading="lazy"
              onError={(e) => {
                e.target.src = '/1.jpeg';
              }}
            />
            {/* Tap to Enlarge Badge */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-between p-2.5 text-white">
              <span className="text-[11px] font-bold flex items-center gap-1 text-pink-200 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-md">
                <Maximize2 className="w-3 h-3 text-pink-300" /> Tap to view full
              </span>
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            </div>
          </div>

          {/* Handwritten Polaroid Caption */}
          <div className="mt-2 text-center px-1 flex items-center justify-between">
            <p className="font-cursive text-xl text-[#8B0000] font-bold tracking-wide truncate max-w-[75%]">
              {item.photoCaption || item.title}
            </p>
            <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
              📸 #{item.id}
            </span>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <section id="timeline-section" className="relative min-h-[calc(100vh-140px)] flex flex-col justify-center items-center py-8 sm:py-12 px-3 sm:px-4 z-10">
      <div className="max-w-5xl mx-auto w-full">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-pink-300 glass-pill px-3.5 py-1.5 rounded-full inline-block mb-2.5 border border-pink-400/30">
              The Story Of My Feelings 💌 &bull; Falling For You
            </span>
            <h2 className="font-serif text-2xl sm:text-5xl font-bold text-white">
              How I Fell For You, {friendName}
            </h2>
            <p className="text-pink-200/80 text-xs sm:text-base mt-1.5 sm:mt-2">
              From the very first spark to the biggest wish in my heart...
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-gradient-to-r from-[#DC143C] to-[#FF69B4] text-white font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(255,23,68,0.5)] hover:scale-105 active:scale-95 transition-transform cursor-pointer border border-white/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Memory 🌟</span>
          </button>
        </div>

        {/* Responsive Timeline Layout */}
        <div className="relative max-w-5xl mx-auto">

          {/* Central Vertical Line (Visible on Desktop) */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-1 bg-gradient-to-b from-pink-500/50 via-rose-500/60 to-pink-500/40 -translate-x-1/2 rounded-full z-0" />

          {/* Timeline Items */}
          <div className="space-y-6 sm:space-y-16">
            {memories.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="relative w-full"
                >
                  {/* DESKTOP VIEW (md:): Balanced 2-Column alternating layout */}
                  <div className="hidden md:flex items-center w-full justify-between">
                    {/* Glowing Heart Node on Central Line */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-gradient-to-tr from-[#DC143C] to-[#FF69B4] border-4 border-[#130004] shadow-[0_0_18px_rgba(255,23,68,0.9)] z-20 flex items-center justify-center">
                      <Heart className="w-4 h-4 text-white fill-white animate-pulse" />
                    </div>

                    {/* Left Column (md:w-[46%]) */}
                    <div className="w-[46%] pr-4">
                      {isEven ? renderStoryCard(item) : renderPhotoCard(item)}
                    </div>

                    {/* Right Column (md:w-[46%]) */}
                    <div className="w-[46%] pl-4">
                      {isEven ? renderPhotoCard(item) : renderStoryCard(item)}
                    </div>
                  </div>

                  {/* MOBILE VIEW (< md): Single, perfectly proportioned unified card */}
                  <div className="block md:hidden w-full">
                    {renderMobileCard(item)}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* The Grand Birthday Proposal Climax Card */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 sm:mt-18 max-w-3xl mx-auto w-full relative z-20"
        >
          <div className="glass-card p-6 sm:p-10 rounded-3xl border-2 border-amber-300/80 shadow-[0_0_60px_rgba(255,215,0,0.35)] bg-gradient-to-br from-rose-950/95 via-[#2d020e]/95 to-amber-950/80 text-center relative overflow-hidden">
            
            {/* Ambient romantic glows */}
            <div className="absolute -top-16 -right-16 w-52 h-52 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-rose-500/25 rounded-full blur-3xl pointer-events-none" />

            {/* Glowing Proposal Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 text-white font-bold text-xs uppercase tracking-widest mb-4 shadow-[0_0_25px_rgba(255,215,0,0.6)] border border-amber-200/50">
              <Sparkles className="w-4 h-4 text-amber-200 animate-spin-slow" />
              <span>A Question From My Heart &bull; The Proposal 💍</span>
              <Sparkles className="w-4 h-4 text-amber-200 animate-spin-slow" />
            </div>

            <h3 className="font-calligraphy text-4xl sm:text-6xl text-amber-200 leading-tight mb-2 drop-shadow-[0_2px_10px_rgba(255,215,0,0.5)]">
              Will You Be Mine, {friendName}? 💖
            </h3>

            <p className="text-pink-100/90 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-6 font-normal">
              I have kept this crush in my heart for so long, and every conversation has only made my feelings grow stronger. Today, on your special birthday, my only wish is for us to hold hands and start our story together. What do you say? ✨
            </p>

            {proposalAnswer === 'yes' ? (
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-rose-950/90 to-amber-950/80 border-2 border-emerald-400/80 shadow-[0_0_40px_rgba(52,211,153,0.5)] text-center"
              >
                <div className="text-4xl mb-2 animate-bounce">💍 💖 🥂</div>
                <h4 className="font-serif text-2xl sm:text-3xl font-black text-amber-200 mb-1">
                  She Said YES! 🎉✨
                </h4>
                <p className="text-pink-100 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
                  You just made this the happiest birthday and the sweetest beginning of our story together! ❤️
                </p>
              </motion.div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setProposalAnswer('yes');
                    audioEngine.playFireworkFX();
                    audioEngine.playSparkleFX();
                    confetti({
                      particleCount: 220,
                      spread: 100,
                      origin: { y: 0.6 },
                      colors: ['#FF1744', '#FFD700', '#FF69B4', '#FFFFFF', '#DC143C', '#FF1493']
                    });
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full font-extrabold text-sm sm:text-base bg-gradient-to-r from-emerald-500 via-rose-500 to-pink-500 text-white hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,105,180,0.8)] border-2 border-white/60 cursor-pointer flex items-center justify-center gap-2 animate-pulse"
                >
                  <span>Yes, I Will! 💖💍</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setProposalAnswer('thinking');
                    audioEngine.playPopFX();
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-full font-semibold text-xs sm:text-sm bg-white/10 hover:bg-white/20 text-pink-200 hover:text-white border border-white/20 transition-all cursor-pointer"
                >
                  <span>Give Me A Little Time... 🙈</span>
                </button>
              </div>
            )}

            {proposalAnswer === 'thinking' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-xs sm:text-sm text-amber-300 font-medium italic"
              >
                Take all the time in the world, {friendName}... my heart is already cheering for you, always! 🌸✨
              </motion.p>
            )}
          </div>
        </motion.div>

      </div>

      {/* Lightbox Modal for Full Portrait View */}
      <AnimatePresence>
        {lightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none"
            onClick={() => {
              setLightboxPhoto(null);
              audioEngine.playPopFX();
            }}
          >
            {/* Primary Close Button (Top-Right Screen) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxPhoto(null);
                audioEngine.playPopFX();
              }}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-full bg-white/20 hover:bg-white/40 active:scale-95 text-white transition-all z-[110] cursor-pointer border border-white/30 backdrop-blur-md shadow-2xl pointer-events-auto"
              title="Close (Esc)"
              aria-label="Close"
            >
              <X className="w-6 h-6 stroke-[2.5]" />
            </button>

            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              className="relative max-w-3xl w-full glass-card p-4 sm:p-6 rounded-3xl border border-pink-500/40 shadow-[0_0_60px_rgba(255,23,68,0.6)] overflow-hidden flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Secondary Close Button directly on the card */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxPhoto(null);
                  audioEngine.playPopFX();
                }}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-black/70 hover:bg-black/90 active:scale-90 text-white z-40 cursor-pointer border border-white/30 backdrop-blur-md shadow-lg"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="rounded-2xl overflow-hidden max-h-[75vh] flex items-center justify-center bg-black/60 w-full">
                <img
                  src={lightboxPhoto.url}
                  alt={lightboxPhoto.caption}
                  className="max-h-[72vh] w-auto max-w-full object-contain rounded-xl"
                />
              </div>

              {lightboxPhoto.caption && (
                <div className="mt-4 text-center">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    {lightboxPhoto.caption}
                  </h3>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Memory Modal */}
      <AnimatePresence>
        {isModalOpen && (
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
              className="glass-card max-w-lg w-full p-6 sm:p-8 rounded-3xl border border-pink-500/40 shadow-[0_0_50px_rgba(255,23,68,0.5)] max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-amber-300" />
                  <h3 className="font-serif text-xl font-bold text-white">Add Beautiful Memory</h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-pink-900/50 text-pink-300 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateMemory} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-pink-200 mb-1">
                    Memory Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Our College Day Celebration 🎓"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-pink-500/30 text-white placeholder-pink-400/40 focus:outline-none focus:border-pink-400 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-pink-200 mb-1">
                      Date / Chapter
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Chapter 7"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-pink-500/30 text-white placeholder-pink-400/40 focus:outline-none focus:border-pink-400 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-pink-200 mb-1">
                      Location / Tag
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Campus / Trip"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-pink-500/30 text-white placeholder-pink-400/40 focus:outline-none focus:border-pink-400 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-pink-200 mb-1">
                    Description / Note
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe what made this moment so special..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-pink-500/30 text-white placeholder-pink-400/40 focus:outline-none focus:border-pink-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-pink-200 mb-1">
                    Photo URL or File Path (e.g. /8.jpeg)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. /8.jpeg or https://..."
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-pink-500/30 text-white placeholder-pink-400/40 focus:outline-none focus:border-pink-400 text-sm"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl glass-pill text-pink-200 text-sm hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-glowing px-6 py-2.5 rounded-xl text-white font-bold text-sm cursor-pointer"
                  >
                    Save Memory 💖
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
