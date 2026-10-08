import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { CakeSurprise } from './components/CakeSurprise';
import { PhotoGallery } from './components/PhotoGallery';
import { TypingMessage } from './components/TypingMessage';
import { MemoryTimeline } from './components/MemoryTimeline';
import { GrandFinaleSlide } from './components/GrandFinaleSlide';
import { GrandFinale } from './components/GrandFinale';
import { CustomizerModal } from './components/CustomizerModal';
import { BackgroundEffects } from './components/BackgroundEffects';

const TOTAL_PAGES = 6;

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [friendName, setFriendName] = useState('Sreenya');
  const [customMessage, setCustomMessage] = useState('');
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [showGrandFinale, setShowGrandFinale] = useState(false);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [cardUnlocked, setCardUnlocked] = useState(false);

  const [showBlowPrompt, setShowBlowPrompt] = useState(false);

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

  const handleSaveCustom = ({ name, message }) => {
    if (name) setFriendName(name);
    if (message !== undefined) setCustomMessage(message);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <LandingHero
            friendName={friendName}
            customMessage={customMessage}
            onOpenSurprise={() => navigatePage(2)}
            onCardUnlocked={() => setCardUnlocked(true)}
          />
        );
      case 2:
        return (
          <CakeSurprise
            friendName={friendName}
            candlesBlown={candlesBlown}
            onBlowCandles={() => setCandlesBlown(true)}
            onNextPage={() => navigatePage(3)}
          />
        );
      case 3:
        return (
          <PhotoGallery
            friendName={friendName}
            onNextPage={() => navigatePage(4)}
          />
        );
      case 4:
        return (
          <TypingMessage
            friendName={friendName}
            customMessage={customMessage}
            onNextPage={() => navigatePage(5)}
          />
        );
      case 5:
        return (
          <MemoryTimeline
            friendName={friendName}
            onNextPage={() => navigatePage(6)}
          />
        );
      case 6:
        return (
          <GrandFinaleSlide
            friendName={friendName}
            onRestart={() => navigatePage(1)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#A4133C] text-white relative overflow-x-hidden">
      <BackgroundEffects />

      <Navbar
        friendName={friendName}
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        onNavigatePage={navigatePage}
        onOpenCustomizer={() => setShowCustomizer(true)}
      />

      <main className="pt-20 pb-36 sm:pt-16 sm:pb-28">
        {renderPage()}
      </main>

      {/* Floating Animated Prompt when Next clicked early */}
      {showBlowPrompt && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce max-w-[90vw]">
          <div className="bg-gradient-to-r from-amber-500 via-rose-600 to-pink-600 text-white font-bold px-5 py-2.5 rounded-full shadow-[0_0_30px_rgba(255,105,180,0.9)] border-2 border-white/60 flex items-center gap-2 text-xs sm:text-base text-center">
            <span>🎂 Click "Blow The Candles" below to make your wish first! ✨</span>
          </div>
        </div>
      )}

      {/* Bottom Floating Navigation Controls */}
      {(currentPage > 1 || cardUnlocked) && (
        <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 sm:gap-4 bg-black/60 sm:bg-black/35 backdrop-blur-md px-3 py-2 sm:px-6 sm:py-3 rounded-full border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.4)] max-w-[95vw] w-max select-none">
          {currentPage > 1 && (
            <button
              onClick={() => navigatePage(currentPage - 1)}
              className="flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold text-white bg-white/15 hover:bg-white/25 border border-white/20 transition-all active:scale-95 cursor-pointer whitespace-nowrap"
            >
              ← <span className="hidden sm:inline">Previous</span><span className="sm:hidden">Back</span>
            </button>
          )}

          <span className="text-[11px] sm:text-xs tracking-wider uppercase font-semibold text-pink-300/90 px-1 sm:px-2 whitespace-nowrap">
            {currentPage}/{TOTAL_PAGES}
          </span>

          {currentPage < TOTAL_PAGES ? (
            <button
              onClick={() => navigatePage(currentPage + 1)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold text-white transition-all active:scale-95 cursor-pointer whitespace-nowrap ${
                currentPage === 2 && !candlesBlown
                  ? 'bg-gradient-to-r from-gray-600 to-gray-700 opacity-70 hover:opacity-90'
                  : 'bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500 hover:brightness-110 shadow-[0_0_20px_rgba(255,105,180,0.7)]'
              }`}
            >
              {currentPage === 1 && <span>Next: Cake →</span>}
              {currentPage === 2 && (candlesBlown ? <span>Next: Photos →</span> : <span>Blow Candles First 🎂</span>)}
              {currentPage === 3 && <span>Next: Letter →</span>}
              {currentPage === 4 && <span>Next: Timeline →</span>}
              {currentPage === 5 && <span>Next: Finale 🎆 →</span>}
            </button>
          ) : (
            <button
              onClick={() => navigatePage(1)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:brightness-110 shadow-[0_0_15px_rgba(168,85,247,0.6)] transition-all active:scale-95 cursor-pointer whitespace-nowrap"
            >
              ↺ Restart
            </button>
          )}
        </div>
      )}

      <GrandFinale
        friendName={friendName}
        isOpen={showGrandFinale}
        onClose={() => setShowGrandFinale(false)}
      />

      <CustomizerModal
        isOpen={showCustomizer}
        onClose={() => setShowCustomizer(false)}
        currentName={friendName}
        currentMessage={customMessage}
        onSave={handleSaveCustom}
      />
    </div>
  );
}

export default App;
