import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Calendar, Heart, Sparkles, MapPin, X, Star, Maximize2, Camera, ChevronLeft, ChevronRight, Music, Play, Pause, Volume2 } from 'lucide-react';
import { audioEngine } from '../services/audioService';
import { getAssetUrl } from '../utils/assetHelper';

export const MemoryTimeline = ({ friendName = 'Sreenya', initialMemories, onAddMemory, onNextPage, onPrevPage }) => {
  const [memories, setMemories] = useState(initialMemories || [
    {
      id: '1',
      date: '07/06/2023 📅',
      title: 'The First Day I Asked Her 💌✨',
      location: 'The Very Beginning',
      description: 'The exact date everything began — 07/06/2023. That was the first day I asked you, and from that very moment, you left an impression on my heart that I could never forget.',
      photo: getAssetUrl('timeline_1.jpeg'),
      photoCaption: '07/06/2023 - Where It All Began ✨',
      tag: '07/06/2023 💫'
    },
    {
      id: '2',
      date: 'From The Next Day 🏫',
      title: 'Classroom Split & Becoming Classmates 🎒',
      location: 'Our Classroom',
      description: 'From the very next day, when they started splitting the classrooms, fate worked its magic — you were in my class and became my classmate. Going to class every single day suddenly became the best part of my life.',
      photo: getAssetUrl('timeline_2.jpeg'),
      photoCaption: 'Classmates & Secret Smiles ❤️',
      tag: 'My Classmate 🌸'
    },
    {
      id: '3',
      date: 'A Unique Spark ✨',
      title: 'She Alone Felt Something Different To Me 💖',
      location: 'Deep In My Heart',
      description: 'In a room full of people, she alone felt something completely different to me. Out of everyone, my eyes and my feelings were drawn only to you. There was a unique, quiet magic about you that set you apart from the rest of the world.',
      photo: getAssetUrl('timeline_3.jpeg'),
      photoCaption: 'One In A Million 🌟',
      tag: 'Something Different 💖'
    },
    {
      id: '4',
      date: 'Chapter 4 🌙',
      title: 'Late Night Talks I Never Wanted To End 🌙',
      location: 'Under The Stars',
      description: 'Talking till 2 AM about life, music, and random jokes that only we understood. Listening to your laugh over the phone, I realized this was no longer just a crush — I was genuinely and deeply falling for you.',
      photo: getAssetUrl('timeline_4.jpeg'),
      photoCaption: 'Pure Joy & Sweet Moments 🌸',
      tag: 'Falling For You'
    },
    {
      id: '5',
      date: 'Chapter 5 🌸',
      title: 'Adoring Everything About You 🌸',
      location: 'In Every Small Detail',
      description: 'Your kindness, your effortless grace, the way you care so deeply about the people around you, and how you light up any room. The more I got to know you, the more I wished I could be the one to hold your hand.',
      photo: getAssetUrl('timeline_5.jpeg'),
      photoCaption: 'Effortlessly Gorgeous 🌿',
      tag: 'Pure Admiration'
    },
    {
      id: '6',
      date: 'Chapter 6 💖',
      title: 'Wanting To Be Your Safe Place 💖',
      location: 'Through Every Season',
      description: 'In good times and tough days, I always find myself wanting to protect your smile and cheer you on. You bring so much peace and brightness into my life, and standing by you feels so natural.',
      photo: getAssetUrl('timeline_6.jpeg'),
      photoCaption: 'My Favorite Person 🌸',
      tag: 'Standing By You'
    },
    {
      id: 'vaama-vaama',
      date: '01/10 🎶',
      title: 'Our Song: Vaama Vaama 🎶💖',
      location: 'Airport Memories & Deep In My Heart',
      description: 'Listening to "Vaama Vaama" always brings every single thought and emotion back to you. When the chorus hits at 1:10, time stands still and your smile is the only thing that matters in the whole world.',
      photo: getAssetUrl('timeline_2.jpeg'),
      photoCaption: 'Vaama Vaama Moments ✨',
      tag: '1.10 🎶'
    },
    {
      id: '7',
      date: 'Today, Oct 9th 🎂',
      title: 'To The Girl Who Stole My Heart 🎂',
      location: 'Straight From The Heart',
      description: `Happy Birthday, ${friendName}! You deserve all the laughter, happiness, and beauty this world has to offer today and always. Celebrating the wonderful person you are will always be my favorite day of the year.`,
      photo: getAssetUrl('timeline_7.jpeg'),
      photoCaption: 'Celebrating You, Sreenya ❤️',
      tag: 'Happy Birthday Today! 🎂'
    },
    {
      id: '8',
      date: 'A Lifelong Promise 🌟',
      title: 'Always By Your Side: In Every Chapter 🌟💖',
      location: 'Now & In Every Tomorrow',
      description: 'Through every twist and turn of life, through the quiet days and the brightest celebrations, I promise to always stand by your side. To cheer the loudest for your dreams, protect that beautiful smile of yours, and be someone you can always count on — today, tomorrow, and in every chapter yet to come.',
      photo: getAssetUrl('8.jpeg'),
      photoCaption: 'Always In Your Corner 🌟',
      tag: 'An Everlasting Promise 🌟'
    }
  ]);

  const [isPlayingSong, setIsPlayingSong] = useState(false);

  useEffect(() => {
    const unsub = audioEngine.subscribe((state) => setIsPlayingSong(state));
    return () => {
      unsub();
    };
  }, []);

  const toggleVaamaVaama = (e) => {
    if (e) e.stopPropagation();
    audioEngine.toggleMusic(getAssetUrl('vaama_vaama.mp3'), 70);
  };

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
      photo: photoUrl.trim() ? getAssetUrl(photoUrl.trim()) : getAssetUrl('1.jpeg'),
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
        item.tag === 'An Everlasting Promise 🌟'
          ? 'border-2 border-amber-300 shadow-[0_0_40px_rgba(255,215,0,0.5)] bg-gradient-to-br from-rose-950 via-[#3a0314] to-amber-950/90'
          : item.tag === 'For Your Birthday'
          ? 'border-2 border-amber-300/60 shadow-[0_0_30px_rgba(255,215,0,0.3)] bg-gradient-to-br from-rose-950/80 via-black/50 to-amber-950/40'
          : 'border border-pink-500/30'
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <span
          className={`text-xs font-bold uppercase tracking-widest glass-pill px-3.5 py-1 rounded-full ${
            item.tag === 'An Everlasting Promise 🌟'
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
              item.tag === 'An Everlasting Promise 🌟'
                ? 'text-amber-200 font-bold'
                : item.tag === 'For Your Birthday'
                ? 'text-amber-200'
                : 'text-amber-300'
            }`}
          >
            {item.tag === 'An Everlasting Promise 🌟' ? (
              <>🌟 {item.tag}</>
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

      {item.id === 'vaama-vaama' && (
        <div className="mt-4 pt-3.5 border-t border-pink-500/30 flex items-center gap-3">
          <button
            type="button"
            onClick={toggleVaamaVaama}
            className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center gap-2 cursor-pointer ${
              isPlayingSong
                ? 'bg-gradient-to-r from-[#DC143C] to-[#FF69B4] text-white animate-pulse shadow-[0_0_20px_rgba(255,105,180,0.6)]'
                : 'bg-white/20 hover:bg-white/30 text-white hover:scale-105 active:scale-95'
            }`}
          >
            {isPlayingSong ? (
              <>
                <Pause className="w-4 h-4 fill-white" />
                <span>Pause "Vaama Vaama"</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Play "Vaama Vaama" (from 1:10) 🎶</span>
              </>
            )}
          </button>
        </div>
      )}
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
            src={getAssetUrl(item.photo)}
            alt={item.title}
            className="w-full h-full object-cover object-top group-hover:scale-106 transition-transform duration-700"
            onError={(e) => {
              if (!e.target.dataset.fallbackTried) {
                e.target.dataset.fallbackTried = 'true';
                e.target.src = getAssetUrl('timeline_1.jpeg');
              }
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
        item.tag === 'An Everlasting Promise 🌟'
          ? 'border-2 border-amber-300 shadow-[0_0_40px_rgba(255,215,0,0.5)] bg-gradient-to-br from-rose-950 via-[#3a0314] to-amber-950/90'
          : item.tag === 'For Your Birthday'
          ? 'border-2 border-amber-300/60 shadow-[0_0_30px_rgba(255,215,0,0.3)] bg-gradient-to-br from-rose-950/80 via-black/50 to-amber-950/40'
          : 'border border-pink-500/30'
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <span
          className={`text-xs font-bold uppercase tracking-widest glass-pill px-3 py-1 rounded-full ${
            item.tag === 'An Everlasting Promise 🌟'
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
              item.tag === 'An Everlasting Promise 🌟'
                ? 'text-amber-200 font-bold'
                : item.tag === 'For Your Birthday'
                ? 'text-amber-200'
                : 'text-amber-300'
            }`}
          >
            {item.tag === 'An Everlasting Promise 🌟' ? (
              <>🌟 {item.tag}</>
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
              src={getAssetUrl(item.photo)}
              alt={item.title}
              className="w-full h-full object-cover object-top"
              loading="lazy"
              onError={(e) => {
                if (!e.target.dataset.fallbackTried) {
                  e.target.dataset.fallbackTried = 'true';
                  e.target.src = getAssetUrl('timeline_1.jpeg');
                }
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

      {item.id === 'vaama-vaama' && (
        <div className="mt-3.5 pt-3 border-t border-pink-500/30">
          <button
            type="button"
            onClick={toggleVaamaVaama}
            className={`w-full py-2.5 px-4 rounded-full font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
              isPlayingSong
                ? 'bg-gradient-to-r from-[#DC143C] to-[#FF69B4] text-white animate-pulse'
                : 'bg-white/20 hover:bg-white/30 text-white'
            }`}
          >
            {isPlayingSong ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-white" />
                <span>Pause "Vaama Vaama"</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Play "Vaama Vaama" (from 1:10) 🎶</span>
              </>
            )}
          </button>
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
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-pink-300 glass-pill px-3.5 py-1.5 rounded-full inline-block border border-pink-400/30">
                The Story Of My Feelings 💌 &bull; Falling For You
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/25 to-pink-500/25 border border-amber-300/50 text-amber-200 text-xs font-bold shadow-sm">
                <Calendar className="w-3.5 h-3.5 text-amber-300" />
                <span>Birthday Date: Today (October 9th) 🎂</span>
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-5xl font-bold text-white">
              How I Fell For You, {friendName}
            </h2>
            <p className="text-pink-200/80 text-xs sm:text-base mt-1.5 sm:mt-2">
              From the very first spark to the biggest wish in my heart...
            </p>
          </div>
        </div>

        {/* Romantic Soundtrack Player: Vaama Vaama */}
        <div className="mb-8 sm:mb-12 p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-rose-950/80 via-pink-900/60 to-rose-950/80 border-2 border-pink-500/40 shadow-[0_0_30px_rgba(255,23,68,0.3)] backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-[#DC143C] to-[#FF69B4] flex items-center justify-center text-white shadow-lg shrink-0 ${isPlayingSong ? 'animate-pulse' : ''}`}>
              <Music className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="font-serif font-bold text-white text-base sm:text-lg">
                  Vaama Vaama — Airport Version
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-rose-500/30 text-pink-200 border border-rose-400/40 font-bold">
                  Starts at 1:10 🎶
                </span>
              </div>
              <p className="text-xs text-pink-200/90 mt-0.5">
                The magical melody playing in the background of our story ✨
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleVaamaVaama}
            className={`w-full sm:w-auto px-6 py-2.5 sm:px-7 sm:py-3 rounded-full font-bold text-xs sm:text-sm shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 ${
              isPlayingSong
                ? 'bg-gradient-to-r from-[#DC143C] to-[#FF69B4] text-white border border-pink-300/60 shadow-[0_0_20px_rgba(255,105,180,0.6)] animate-pulse'
                : 'bg-white/15 hover:bg-white/25 text-pink-100 border border-white/25 hover:scale-105 active:scale-95'
            }`}
          >
            {isPlayingSong ? (
              <>
                <Pause className="w-4 h-4 fill-white" />
                <span>Pause Music</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Play "Vaama Vaama" (from 1:10) 🎵</span>
              </>
            )}
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


        {/* Navigation Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          {onPrevPage && (
            <button
              type="button"
              onClick={onPrevPage}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-pink-200 hover:text-white font-medium text-xs sm:text-sm border border-white/15 transition-all cursor-pointer"
            >
              ← Back to Letter 💌
            </button>
          )}

          {onNextPage && (
            <button
              type="button"
              onClick={onNextPage}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500 hover:brightness-110 shadow-[0_0_25px_rgba(255,105,180,0.7)] text-white font-bold text-sm sm:text-base border border-white/25 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Next: Grand Finale & Fireworks 🎆</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

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
                  src={getAssetUrl(lightboxPhoto.url)}
                  alt={lightboxPhoto.caption}
                  className="max-h-[72vh] w-auto max-w-full object-contain rounded-xl"
                  onError={(e) => {
                    if (!e.target.dataset.fallbackTried) {
                      e.target.dataset.fallbackTried = 'true';
                      e.target.src = getAssetUrl('1.jpeg');
                    }
                  }}
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
