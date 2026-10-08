import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../services/audioService';

export const BowArrowIntro = ({ onShootComplete, friendName = 'Sreenya' }) => {
  // State: 'idle' | 'pulling' | 'flying' | 'hit'
  const [stage, setStage] = useState('idle');
  const [pullProgress, setPullProgress] = useState(0); // 0 to 1
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(0);
  const dragStartX = useRef(0);
  const containerRef = useRef(null);

  // SVG Coordinate Constants (viewBox 0 0 600 700)
  // Heart Target Center
  const targetX = 350;
  const targetY = 190;

  // Bow Center Anchor
  const bowX = 200;
  const bowY = 500;

  // Vector from Bow to Target Heart
  const dx = targetX - bowX; // 150
  const dy = targetY - bowY; // -310
  const distance = Math.hypot(dx, dy); // ~344
  const angleRad = Math.atan2(dy, dx); // radians
  const angleDeg = (angleRad * 180) / Math.PI; // approx -64.2 deg

  // Unit vector along shoot direction & perpendicular vector
  const ux = dx / distance;
  const uy = dy / distance;
  const perpX = -uy;
  const perpY = ux;

  // Bow dimensions
  const bowSpan = 90; // half-span of bow limb
  const maxPullDistance = 55; // pixels of pullback

  // Current arrow position during pull back
  const currentPullPx = pullProgress * maxPullDistance;
  const arrowNockX = bowX - ux * currentPullPx;
  const arrowNockY = bowY - uy * currentPullPx;

  // Arrow length
  const arrowLength = 110;
  const arrowTipX = arrowNockX + ux * arrowLength;
  const arrowTipY = arrowNockY + uy * arrowLength;

  // Bow tips (rest position)
  const tip1X = bowX + perpX * bowSpan;
  const tip1Y = bowY + perpY * bowSpan;
  const tip2X = bowX - perpX * bowSpan;
  const tip2Y = bowY - perpY * bowSpan;

  // Fire the arrow sequence
  const executeShot = useCallback(() => {
    if (stage === 'flying' || stage === 'hit') return;

    setStage('flying');
    audioEngine.playArrowReleaseFX();

    // After flight duration, trigger heart impact
    setTimeout(() => {
      setStage('hit');
      audioEngine.playHeartHitFX();
      if (!audioEngine.isPlaying) {
        audioEngine.startMusic();
      }

      // Confetti burst
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { x: targetX / 600, y: targetY / 700 },
        colors: ['#FF1744', '#FFD700', '#FF85A1', '#FFF0F5', '#FF4D6D'],
      });

      // Allow celebrations to bloom, then transition to landing card
      setTimeout(() => {
        if (onShootComplete) onShootComplete();
      }, 1000);
    }, 420);
  }, [stage, onShootComplete, targetX, targetY]);

  // Click or Tap to trigger full shot animation automatically
  const handleQuickShoot = () => {
    if (stage !== 'idle') return;
    // Animate pull then release
    setStage('pulling');
    audioEngine.playBowPullFX();
    let p = 0;
    const interval = setInterval(() => {
      p += 0.2;
      if (p >= 1) {
        clearInterval(interval);
        setPullProgress(1);
        setTimeout(() => {
          executeShot();
        }, 120);
      } else {
        setPullProgress(p);
      }
    }, 40);
  };

  // Pointer drag event handlers for authentic pull & release
  const handlePointerDown = (e) => {
    if (stage !== 'idle') return;
    setIsDragging(true);
    setStage('pulling');
    dragStartX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    dragStartY.current = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    audioEngine.playBowPullFX();
  };

  const handlePointerMove = (e) => {
    if (!isDragging || stage !== 'pulling') return;
    const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const currentY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

    // Movement projected opposite to shooting direction (down & back)
    const diffX = currentX - dragStartX.current;
    const diffY = currentY - dragStartY.current;
    // Pull back vector is (-ux, -uy)
    const projectedPull = -(diffX * ux + diffY * uy);
    const progress = Math.min(Math.max(projectedPull / 80, 0), 1);
    setPullProgress(progress);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (pullProgress > 0.3) {
      executeShot();
    } else {
      // Released too early, snap back to rest
      setPullProgress(0);
      setStage('idle');
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
      className="relative w-full max-w-xl mx-auto flex flex-col items-center justify-center select-none py-1 sm:py-6 px-2 sm:px-4"
    >
      {/* Top Header Text matching the Instagram Reel */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-1 sm:mb-4 z-20 flex flex-col items-center"
      >
        <p className="font-serif italic text-xl sm:text-3xl text-[#5F4842] tracking-wide drop-shadow-sm font-medium">
          a little something, for you
        </p>
        <div className="mt-1.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/95 border border-rose-300 text-rose-900 text-[11px] sm:text-xs font-bold shadow-sm">
          <Calendar className="w-3.5 h-3.5 text-rose-600" />
          <span>Birthday Date: <strong>Today (October 9th)</strong> 🎂</span>
        </div>
      </motion.div>

      {/* Main Interactive SVG Canvas */}
      <div className="relative w-full aspect-[600/640] max-w-[330px] sm:max-w-[480px] flex items-center justify-center">
        {/* Soft Background Warm Halo for the Target Heart */}
        <div
          className="absolute rounded-full pointer-events-none transition-all duration-700"
          style={{
            left: `${(targetX / 600) * 100}%`,
            top: `${(targetY / 700) * 100}%`,
            transform: 'translate(-50%, -50%)',
            width: stage === 'hit' ? '280px' : '190px',
            height: stage === 'hit' ? '280px' : '190px',
            background:
              stage === 'hit'
                ? 'radial-gradient(circle, rgba(255, 77, 109, 0.5) 0%, rgba(255, 182, 193, 0.2) 60%, transparent 80%)'
                : 'radial-gradient(circle, rgba(255, 143, 171, 0.35) 0%, rgba(255, 194, 209, 0.15) 60%, transparent 80%)',
            filter: 'blur(16px)',
          }}
        />

        <svg
          viewBox="0 0 600 700"
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* Heart 3D Gradient */}
            <radialGradient id="heartGradient" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#FF85A1" />
              <stop offset="30%" stopColor="#FF3366" />
              <stop offset="75%" stopColor="#D90429" />
              <stop offset="100%" stopColor="#9B001E" />
            </radialGradient>

            {/* Specular Highlight Gradient */}
            <linearGradient id="specularGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#FFC2D1" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* Wooden Bow Limb Gradient */}
            <linearGradient id="woodBowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8A4822" />
              <stop offset="50%" stopColor="#5E2C10" />
              <stop offset="100%" stopColor="#3C1A06" />
            </linearGradient>

            {/* Arrow Gold Shaft Gradient */}
            <linearGradient id="arrowShaftGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4A2E16" />
              <stop offset="50%" stopColor="#A0693B" />
              <stop offset="100%" stopColor="#4A2E16" />
            </linearGradient>

            {/* Drop Shadow for Target Heart */}
            <filter id="heartShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="rgba(180, 20, 50, 0.35)" />
            </filter>
          </defs>

          {/* ================= 1. TARGET HEART (Top Center) ================= */}
          <g transform={`translate(${targetX}, ${targetY})`}>
            {/* Floating and Beating Heart container */}
            <motion.g
              animate={
                stage === 'hit'
                  ? {
                      scale: [1, 1.45, 0.95, 1.2, 1],
                      rotate: [0, -6, 6, -3, 0],
                    }
                  : {
                      scale: [1, 1.07, 1],
                      y: [0, -8, 0],
                    }
              }
              transition={
                stage === 'hit'
                  ? { duration: 0.6, times: [0, 0.25, 0.5, 0.75, 1] }
                  : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }
              }
              filter="url(#heartShadow)"
            >
              {/* Outer Pulsing Aura Ring */}
              <circle
                r="64"
                fill="none"
                stroke="rgba(255, 105, 180, 0.4)"
                strokeWidth="2"
                strokeDasharray="4 6"
                className="animate-spin-slow opacity-60"
              />

              {/* Plump 3D Heart Path */}
              <path
                d="M 0 -22 C -24 -62 -72 -42 -72 6 C -72 44 -26 78 0 102 C 26 78 72 44 72 6 C 72 -42 24 -62 0 -22 Z"
                fill="url(#heartGradient)"
              />

              {/* Specular 3D Reflection Highlight Curve */}
              <path
                d="M -12 -12 C -24 -36 -50 -26 -48 6 C -46 26 -28 44 -12 56"
                fill="none"
                stroke="url(#specularGlow)"
                strokeWidth="6"
                strokeLinecap="round"
                opacity="0.8"
              />

              {/* Center Sparkle Pin */}
              <circle cx="-28" cy="-8" r="3.5" fill="#FFFFFF" opacity="0.9" />

              {/* Target Aim Reticle (Subtle elegant golden dots) */}
              {stage === 'idle' && (
                <circle
                  cx="0"
                  cy="20"
                  r="7"
                  fill="none"
                  stroke="#FFE4E6"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                  opacity="0.7"
                />
              )}
            </motion.g>

            {/* Burst of Hearts / Sparkles on Impact */}
            {stage === 'hit' && (
              <g>
                {[...Array(12)].map((_, i) => {
                  const angle = (i / 12) * Math.PI * 2;
                  const dist = 75 + (i % 3) * 25;
                  return (
                    <motion.g
                      key={i}
                      initial={{ scale: 0, opacity: 1, x: 0, y: 20 }}
                      animate={{
                        scale: [0, 1.2, 0.8],
                        opacity: [1, 1, 0],
                        x: Math.cos(angle) * dist,
                        y: Math.sin(angle) * dist + 20,
                      }}
                      transition={{ duration: 0.9, delay: i * 0.03, ease: 'easeOut' }}
                    >
                      <path
                        d="M 0 -4 C -3 -9 -9 -6 -9 0 C -9 6 -3 10 0 14 C 3 10 9 6 9 0 C 9 -6 3 -9 0 -4 Z"
                        fill={['#FF1744', '#FF69B4', '#FFD700', '#F43F5E'][i % 4]}
                        transform="scale(0.9)"
                      />
                    </motion.g>
                  );
                })}
              </g>
            )}
          </g>

          {/* ================= 2. TRAJECTORY PREVIEW LINE ================= */}
          {(stage === 'pulling' || pullProgress > 0) && (
            <line
              x1={arrowTipX}
              y1={arrowTipY}
              x2={targetX}
              y2={targetY + 20}
              stroke="rgba(255, 105, 180, 0.45)"
              strokeWidth="2"
              strokeDasharray="5 7"
              className="animate-pulse"
            />
          )}

          {/* ================= 3. BOW & STRING (Bottom Left) ================= */}
          <g>
            {/* The Wooden Bow Limb (Graceful Curve) */}
            {/* Control point pulls outward slightly */}
            <path
              d={`M ${tip1X} ${tip1Y} Q ${bowX + ux * 22} ${bowY + uy * 22} ${tip2X} ${tip2Y}`}
              fill="none"
              stroke="url(#woodBowGrad)"
              strokeWidth="7"
              strokeLinecap="round"
              filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))"
            />

            {/* Inner Bow Accent Highlight Line */}
            <path
              d={`M ${tip1X} ${tip1Y} Q ${bowX + ux * 22} ${bowY + uy * 22} ${tip2X} ${tip2Y}`}
              fill="none"
              stroke="#DDA15E"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.5"
            />

            {/* Golden Bow Tips / Nocks */}
            <circle cx={tip1X} cy={tip1Y} r="4.5" fill="#D4AF37" stroke="#5E2C10" strokeWidth="1" />
            <circle cx={tip2X} cy={tip2Y} r="4.5" fill="#D4AF37" stroke="#5E2C10" strokeWidth="1" />

            {/* The Bowstring: Flexes back into a V-shape when pulled */}
            <path
              d={
                stage === 'flying' || stage === 'hit'
                  ? `M ${tip1X} ${tip1Y} L ${tip2X} ${tip2Y}`
                  : `M ${tip1X} ${tip1Y} Q ${arrowNockX} ${arrowNockY} ${tip2X} ${tip2Y}`
              }
              fill="none"
              stroke="#F8F9FA"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.95"
            />
          </g>

          {/* ================= 4. THE ARROW ================= */}
          {/* A. Loaded / Pulling State Arrow */}
          {(stage === 'idle' || stage === 'pulling') && (
            <g
              className="cursor-pointer transition-transform"
              onPointerDown={handlePointerDown}
              onClick={handleQuickShoot}
            >
              {/* Invisible thicker stroke for easy touch/mouse grab */}
              <line
                x1={arrowNockX}
                y1={arrowNockY}
                x2={arrowTipX}
                y2={arrowTipY}
                stroke="transparent"
                strokeWidth="35"
              />

              {/* Arrow Wooden Shaft */}
              <line
                x1={arrowNockX}
                y1={arrowNockY}
                x2={arrowTipX}
                y2={arrowTipY}
                stroke="url(#arrowShaftGrad)"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Arrowhead (Golden Metallic Triangle pointing at angle) */}
              <polygon
                points={`
                  ${arrowTipX + ux * 18},${arrowTipY + uy * 18}
                  ${arrowTipX + perpX * 7 - ux * 4},${arrowTipY + perpY * 7 - uy * 4}
                  ${arrowTipX - perpX * 7 - ux * 4},${arrowTipY - perpY * 7 - uy * 4}
                `}
                fill="#FFD700"
                stroke="#B8860B"
                strokeWidth="1.2"
              />

              {/* Arrow Fletching (Red/Pink Feathers at nock) */}
              <path
                d={`
                  M ${arrowNockX} ${arrowNockY}
                  L ${arrowNockX - ux * 16 + perpX * 9} ${arrowNockY - uy * 16 + perpY * 9}
                  L ${arrowNockX - ux * 6 + perpX * 2} ${arrowNockY - uy * 6 + perpY * 2}
                  Z
                `}
                fill="#FF1744"
              />
              <path
                d={`
                  M ${arrowNockX} ${arrowNockY}
                  L ${arrowNockX - ux * 16 - perpX * 9} ${arrowNockY - uy * 16 - perpY * 9}
                  L ${arrowNockX - ux * 6 - perpX * 2} ${arrowNockY - uy * 6 - perpY * 2}
                  Z
                `}
                fill="#FF1744"
              />
            </g>
          )}

          {/* B. Flying Arrow (Moving swiftly from bow to target heart) */}
          {stage === 'flying' && (
            <motion.g
              initial={{
                x: 0,
                y: 0,
              }}
              animate={{
                x: targetX - bowX - ux * 30,
                y: targetY - bowY + 20 - uy * 30,
              }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {/* Arrow Shaft */}
              <line
                x1={bowX}
                y1={bowY}
                x2={bowX + ux * arrowLength}
                y2={bowY + uy * arrowLength}
                stroke="#5E2C10"
                strokeWidth="4"
              />

              {/* Arrowhead */}
              <polygon
                points={`
                  ${bowX + ux * (arrowLength + 18)},${bowY + uy * (arrowLength + 18)}
                  ${bowX + ux * (arrowLength - 4) + perpX * 7},${bowY + uy * (arrowLength - 4) + perpY * 7}
                  ${bowX + ux * (arrowLength - 4) - perpX * 7},${bowY + uy * (arrowLength - 4) - perpY * 7}
                `}
                fill="#FFD700"
                stroke="#B8860B"
                strokeWidth="1.2"
              />

              {/* Fletching */}
              <polygon
                points={`
                  ${bowX},${bowY}
                  ${bowX - ux * 14 + perpX * 8},${bowY - uy * 14 + perpY * 8}
                  ${bowX - ux * 6},${bowY - uy * 6}
                `}
                fill="#FF1744"
              />
              <polygon
                points={`
                  ${bowX},${bowY}
                  ${bowX - ux * 14 - perpX * 8},${bowY - uy * 14 - perpY * 8}
                  ${bowX - ux * 6},${bowY - uy * 6}
                `}
                fill="#FF1744"
              />

              {/* Trailing sparkle particles behind flying arrow */}
              {[...Array(4)].map((_, idx) => (
                <circle
                  key={idx}
                  cx={bowX - ux * (idx * 20)}
                  cy={bowY - uy * (idx * 20)}
                  r={3.5 - idx * 0.7}
                  fill="#FFD700"
                  opacity={0.8 - idx * 0.2}
                />
              ))}
            </motion.g>
          )}

          {/* C. Hit Arrow (Arrow stuck inside heart) */}
          {stage === 'hit' && (
            <motion.g
              initial={{ scale: 0.95 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.25 }}
            >
              {/* Stuck Arrow Shaft protruding from heart */}
              <line
                x1={targetX - ux * 75}
                y1={targetY + 20 - uy * 75}
                x2={targetX + ux * 15}
                y2={targetY + 20 + uy * 15}
                stroke="#5E2C10"
                strokeWidth="4"
              />

              {/* Feathers */}
              <polygon
                points={`
                  ${targetX - ux * 75},${targetY + 20 - uy * 75}
                  ${targetX - ux * 88 + perpX * 8},${targetY + 20 - uy * 88 + perpY * 8}
                  ${targetX - ux * 80},${targetY + 20 - uy * 80}
                `}
                fill="#FF1744"
              />
              <polygon
                points={`
                  ${targetX - ux * 75},${targetY + 20 - uy * 75}
                  ${targetX - ux * 88 - perpX * 8},${targetY + 20 - uy * 88 - perpY * 8}
                  ${targetX - ux * 80},${targetY + 20 - uy * 80}
                `}
                fill="#FF1744"
              />
            </motion.g>
          )}
        </svg>
      </div>

      {/* Bottom Subtitle / Instruction matching Reel: "PULL & RELEASE" */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-2 flex flex-col items-center gap-2 cursor-pointer z-20 select-none"
        onClick={handleQuickShoot}
      >
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#7A6158] uppercase hover:text-[#5F4842] transition-colors">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span>{stage === 'hit' ? 'Target Struck with Love ✨' : 'PULL & RELEASE'}</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
        </div>
      </motion.div>
    </div>
  );
};
