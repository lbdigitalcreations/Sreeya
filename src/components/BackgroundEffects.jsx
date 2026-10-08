import React, { useMemo } from 'react';

export const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background color */}
      <div className="absolute inset-0 bg-[#A4133C]" />

      {/* Twinkling Sparkles Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ff69b4_1px,transparent_1px)] [background-size:32px_32px] opacity-20" />
    </div>
  );
};
