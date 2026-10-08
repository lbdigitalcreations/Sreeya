import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export const BackgroundEffects = () => {
  // Generate random floating hearts with different speeds, sizes, and paths
  const hearts = useMemo(() => {
    return Array.from({ length: 65 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 96 + 2}%`,
      size: Math.random() * 26 + 14,
      duration: Math.random() * 7 + 6,
      delay: Math.random() * 6,
      color: ['#FF1744', '#FF4D6D', '#FF758F', '#FF8FA3', '#FFB3C1', '#FF0054', '#E63946'][i % 7],
      rotate: Math.random() * 60 - 30,
    }));
  }, []);

  // Glowing ambient light orbs with lighter red / rose tints
  const lightOrbs = useMemo(() => {
    return [
      { top: '5%', left: '10%', size: '450px', color: 'rgba(255, 77, 109, 0.45)' },
      { top: '35%', right: '5%', size: '550px', color: 'rgba(255, 137, 157, 0.4)' },
      { top: '65%', left: '20%', size: '500px', color: 'rgba(255, 0, 84, 0.35)' },
    ];
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 100% matched single background without dark color shifts */}
      <div className="absolute inset-0 bg-[#A4133C]" />

      {/* Floating Hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute font-sans select-none drop-shadow-[0_0_10px_rgba(255,23,68,0.8)]"
          style={{
            left: heart.left,
            bottom: '-10%',
            fontSize: `${heart.size}px`,
            color: heart.color,
          }}
          animate={{
            y: ['0vh', '-125vh'],
            x: ['0px', `${Math.sin(heart.id) * 40}px`, `${Math.cos(heart.id) * -30}px`, '0px'],
            rotate: [heart.rotate, heart.rotate + 360],
            opacity: [0, 0.85, 0.85, 0],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: 'linear',
          }}
        >
          ♥
        </motion.div>
      ))}

      {/* Twinkling Sparkles Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ff69b4_1px,transparent_1px)] [background-size:32px_32px] opacity-20" />
    </div>
  );
};
