import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { CakeSurprise } from './components/CakeSurprise';
import { PhotoGallery } from './components/PhotoGallery';
import { TypingMessage } from './components/TypingMessage';
import { MemoryTimeline } from './components/MemoryTimeline';
import { GrandFinaleSlide } from './components/GrandFinaleSlide';
import { Footer } from './components/Footer';
import { BackgroundEffects } from './components/BackgroundEffects';
import { MusicPromptModal } from './components/MusicPromptModal';
import { audioEngine } from './services/audioService';

const TOTAL_PAGES = 6;

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [friendName] = useState('Sreenya');
  const [customMessage] = useState('');
  const [candlesBlown, setCandlesBlown] = useState(false);

  const [showBlowPrompt, setShowBlowPrompt] = useState(false);
  const [showMusicPrompt, setShowMusicPrompt] = useState(true);

  const handleAcceptMusic = () => {
    audioEngine.startMusic();
    audioEngine.playSparkleFX();
    setShowMusicPrompt(false);
  };

  const handleDeclineMusic = () => {
    setShowMusicPrompt(false);
  };

  const navigatePage = (page) => {
    // If trying to advance past cake without blowing candles, show polite prompt instead of alert
    if (currentPage === 2 && page > 2 && !candlesBlown) {
      setShowBlowPrompt(true);
      setTimeout(() => setShowBlowPrompt(false), 3500);
      return;
    }
    if (page >= 1 && page <= TOTAL_PAGES) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <LandingHero
            friendName={friendName}
            customMessage={customMessage}
            onOpenSurprise={() => navigatePage(2)}
          />
        );
      case 2:
        return (
          <CakeSurprise
            friendName={friendName}
            candlesBlown={candlesBlown}
            onBlowCandles={() => setCandlesBlown(true)}
            onNextPage={() => navigatePage(3)}
            onPrevPage={() => navigatePage(1)}
          />
        );
      case 3:
        return (
          <PhotoGallery
            friendName={friendName}
            onNextPage={() => navigatePage(4)}
            onPrevPage={() => navigatePage(2)}
          />
        );
      case 4:
        return (
          <TypingMessage
            friendName={friendName}
            customMessage={customMessage}
            onNextPage={() => navigatePage(5)}
            onPrevPage={() => navigatePage(3)}
          />
        );
      case 5:
        return (
          <MemoryTimeline
            friendName={friendName}
            onNextPage={() => navigatePage(6)}
            onPrevPage={() => navigatePage(4)}
          />
        );
      case 6:
        return (
          <GrandFinaleSlide
            friendName={friendName}
            onRestart={() => navigatePage(1)}
            onPrevPage={() => navigatePage(5)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#A4133C] text-white relative overflow-x-hidden flex flex-col">
      <BackgroundEffects />

      <Navbar
        friendName={friendName}
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        onNavigatePage={navigatePage}
      />

      <main className="pt-20 pb-12 sm:pt-16 sm:pb-12 flex-1">
        {renderPage()}
      </main>

      <Footer />

      {/* Floating Animated Prompt when Next clicked early */}
      {showBlowPrompt && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce max-w-[90vw]">
          <div className="bg-gradient-to-r from-amber-500 via-rose-600 to-pink-600 text-white font-bold px-5 py-2.5 rounded-full shadow-[0_0_30px_rgba(255,105,180,0.9)] border-2 border-white/60 flex items-center gap-2 text-xs sm:text-base text-center">
            <span>🎂 Click "Blow The Candles" below to make your wish first! ✨</span>
          </div>
        </div>
      )}

      {/* Entry Modal Asking To Play Background Music */}
      <MusicPromptModal
        isOpen={showMusicPrompt}
        friendName={friendName}
        onAccept={handleAcceptMusic}
        onDecline={handleDeclineMusic}
      />
    </div>
  );
}

export default App;
