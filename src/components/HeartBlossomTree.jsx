import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export const HeartBlossomTree = ({ isBloomed = true, onBloomComplete }) => {
  // Generate mathematically placed heart-shaped balloon petals
  const petals = useMemo(() => {
    const list = [];
    let id = 0;

    // Palette inspired by the reel: soft yellows, peaches, blossom pinks, corals, deep rubies
    const colors = [
      { fill: '#FEF08A', stroke: '#FDE047', shadow: 'rgba(254, 240, 138, 0.6)' }, // pastel yellow
      { fill: '#FDE047', stroke: '#EAB308', shadow: 'rgba(253, 224, 71, 0.6)' },  // warm gold
      { fill: '#FED7AA', stroke: '#FB923C', shadow: 'rgba(254, 215, 170, 0.6)' }, // soft peach
      { fill: '#FDBA74', stroke: '#F97316', shadow: 'rgba(253, 186, 116, 0.6)' }, // coral peach
      { fill: '#FBCFE8', stroke: '#F472B6', shadow: 'rgba(251, 207, 232, 0.6)' }, // light pink
      { fill: '#F472B6', stroke: '#EC4899', shadow: 'rgba(244, 114, 182, 0.7)' }, // blossom pink
      { fill: '#FDA4AF', stroke: '#FB7185', shadow: 'rgba(253, 164, 175, 0.7)' }, // rose pink
      { fill: '#FB7185', stroke: '#F43F5E', shadow: 'rgba(251, 113, 133, 0.7)' }, // vibrant coral
      { fill: '#F43F5E', stroke: '#E11D48', shadow: 'rgba(244, 63, 94, 0.8)' },   // raspberry
      { fill: '#BE185D', stroke: '#9D174D', shadow: 'rgba(190, 24, 93, 0.8)' },   // deep magenta
    ];

    // Center of the heart canopy in SVG coordinates
    const centerX = 250;
    const centerY = 165;
    const heartScale = 7.8;

    // 1. Boundary ring of the heart (high density)
    const boundaryCount = 68;
    for (let i = 0; i < boundaryCount; i++) {
      const t = (i / boundaryCount) * 2 * Math.PI;
      // Parametric heart formula
      const rawX = 16 * Math.pow(Math.sin(t), 3);
      const rawY = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

      // Add slight organic variation
      const jitterRadius = 0.94 + Math.random() * 0.12;
      const x = centerX + rawX * heartScale * jitterRadius;
      const y = centerY + rawY * heartScale * jitterRadius;
      const radius = 9 + Math.random() * 7;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const delay = 0.3 + Math.random() * 1.2;

      list.push({
        id: id++,
        x,
        y,
        radius,
        color,
        delay,
        isHeart: Math.random() > 0.55,
        rotation: Math.random() * 40 - 20,
      });
    }

    // 2. Interior filling rings of the heart
    const interiorRings = [0.8, 0.65, 0.5, 0.35, 0.2];
    interiorRings.forEach((rScale, ringIdx) => {
      const count = Math.floor(boundaryCount * rScale * 0.75);
      for (let i = 0; i < count; i++) {
        const t = (i / count) * 2 * Math.PI;
        const rawX = 16 * Math.pow(Math.sin(t), 3);
        const rawY = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

        const jitter = (Math.random() - 0.5) * 8;
        const x = centerX + rawX * heartScale * rScale + jitter;
        const y = centerY + rawY * heartScale * rScale + jitter;
        const radius = 8 + Math.random() * 8;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const delay = 0.2 + ringIdx * 0.15 + Math.random() * 0.8;

        list.push({
          id: id++,
          x,
          y,
          radius,
          color,
          delay,
          isHeart: Math.random() > 0.5,
          rotation: Math.random() * 40 - 20,
        });
      }
    });

    // 3. Dense center cluster
    for (let i = 0; i < 22; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 26;
      list.push({
        id: id++,
        x: centerX + Math.cos(angle) * dist,
        y: centerY + 10 + Math.sin(angle) * dist,
        radius: 10 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: 0.1 + Math.random() * 0.6,
        isHeart: true,
        rotation: Math.random() * 30 - 15,
      });
    }

    return list;
  }, []);

  // Falling petals that drift down gently to the ground
  const fallingPetals = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      startX: 160 + Math.random() * 180,
      startY: 120 + Math.random() * 140,
      endX: 120 + Math.random() * 260,
      endY: 340 + Math.random() * 30,
      size: 6 + Math.random() * 8,
      duration: 3.2 + Math.random() * 2.5,
      delay: 1.2 + Math.random() * 4,
      color: ['#FDE047', '#FDA4AF', '#F472B6', '#FB7185', '#FEF08A'][i % 5],
      rotation: Math.random() * 360,
    }));
  }, []);

  return (
    <div className="relative w-full max-w-[500px] mx-auto aspect-[500/390] select-none">
      <svg
        viewBox="0 0 500 390"
        className="w-full h-full overflow-visible drop-shadow-[0_10px_25px_rgba(255,105,180,0.25)]"
      >
        <defs>
          {/* Trunk & Bark Gradients */}
          <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A2E18" />
            <stop offset="50%" stopColor="#2E1808" />
            <stop offset="100%" stopColor="#1F0E04" />
          </linearGradient>

          <linearGradient id="branchGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#3E200C" />
            <stop offset="100%" stopColor="#5C3317" />
          </linearGradient>

          {/* Golden Ambient Glow for Heart Canopy */}
          <radialGradient id="canopyGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 235, 205, 0.45)" />
            <stop offset="60%" stopColor="rgba(255, 182, 193, 0.25)" />
            <stop offset="100%" stopColor="rgba(255, 192, 203, 0)" />
          </radialGradient>

          {/* Soft Ground Shadow Gradient */}
          <radialGradient id="treeShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(80, 20, 35, 0.45)" />
            <stop offset="70%" stopColor="rgba(80, 20, 35, 0.15)" />
            <stop offset="100%" stopColor="rgba(80, 20, 35, 0)" />
          </radialGradient>

          {/* Heart Balloon Shape Definition */}
          <g id="miniHeartDef">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              transform="scale(0.7) translate(-12, -12)"
            />
          </g>
        </defs>

        {/* Ambient Warm Golden Halo behind the heart canopy */}
        <circle
          cx="250"
          cy="165"
          r="140"
          fill="url(#canopyGlow)"
          className="pointer-events-none"
        />

        {/* Ground Base / Soft Shadow */}
        <ellipse
          cx="250"
          cy="365"
          rx="110"
          ry="14"
          fill="url(#treeShadow)"
        />

        {/* Natural Tree Trunk & Main Branches */}
        <motion.g
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: isBloomed ? 1 : 0, opacity: isBloomed ? 1 : 0 }}
          transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ transformOrigin: '250px 365px' }}
        >
          {/* Main Trunk Base with root flare */}
          <path
            d="M236 365 C236 345, 243 310, 244 265 C244 235, 243 205, 245 185 C246 175, 254 175, 255 185 C257 205, 256 235, 256 265 C257 310, 264 345, 264 365 Z"
            fill="url(#trunkGrad)"
          />

          {/* Root flare on ground */}
          <path
            d="M230 367 Q245 358 250 362 Q255 358 270 367 Q250 371 230 367 Z"
            fill="#2E1808"
          />

          {/* Left Main Bough branching into canopy */}
          <path
            d="M246 235 C235 220, 218 205, 205 180 C198 168, 190 155, 185 140"
            fill="none"
            stroke="url(#branchGrad)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M220 205 C210 185, 208 170, 215 150"
            fill="none"
            stroke="url(#branchGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M205 180 C190 182, 175 175, 168 160"
            fill="none"
            stroke="url(#branchGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Right Main Bough branching into canopy */}
          <path
            d="M254 235 C265 220, 282 205, 295 180 C302 168, 310 155, 315 140"
            fill="none"
            stroke="url(#branchGrad)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M280 205 C290 185, 292 170, 285 150"
            fill="none"
            stroke="url(#branchGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M295 180 C310 182, 325 175, 332 160"
            fill="none"
            stroke="url(#branchGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Center Upper Crown Twigs */}
          <path
            d="M248 185 C245 160, 240 145, 235 125"
            fill="none"
            stroke="url(#branchGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M252 185 C255 160, 260 145, 265 125"
            fill="none"
            stroke="url(#branchGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M250 150 Q250 130 250 110"
            fill="none"
            stroke="url(#branchGrad)"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </motion.g>

        {/* 130+ Heart Balloon Blossoms forming the Heart Shape */}
        <g id="heartCanopyGroup">
          {petals.map((petal) => (
            <motion.g
              key={petal.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={
                isBloomed
                  ? {
                      scale: [0, 1.25, 1],
                      opacity: [0, 1, 1],
                    }
                  : { scale: 0, opacity: 0 }
              }
              transition={{
                duration: 0.85,
                delay: petal.delay,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              style={{
                transformOrigin: `${petal.x}px ${petal.y}px`,
              }}
            >
              {/* Petal/Balloon body */}
              {petal.isHeart ? (
                // Heart-shaped balloon
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill={petal.color.fill}
                  stroke={petal.color.stroke}
                  strokeWidth="0.8"
                  transform={`translate(${petal.x - (petal.radius * 0.95)}, ${
                    petal.y - (petal.radius * 0.95)
                  }) scale(${(petal.radius * 1.9) / 24}) rotate(${petal.rotation} 12 12)`}
                  filter={`drop-shadow(0 2px 4px ${petal.color.shadow})`}
                />
              ) : (
                // Round balloon / blossom bulb with 3D specular highlight
                <g>
                  <circle
                    cx={petal.x}
                    cy={petal.y}
                    r={petal.radius}
                    fill={petal.color.fill}
                    stroke={petal.color.stroke}
                    strokeWidth="0.75"
                    filter={`drop-shadow(0 2px 5px ${petal.color.shadow})`}
                  />
                  {/* Glossy highlight for 3D balloon effect */}
                  <ellipse
                    cx={petal.x - petal.radius * 0.35}
                    cy={petal.y - petal.radius * 0.35}
                    rx={petal.radius * 0.3}
                    ry={petal.radius * 0.2}
                    fill="rgba(255, 255, 255, 0.75)"
                    transform={`rotate(-30 ${petal.x - petal.radius * 0.35} ${petal.y - petal.radius * 0.35})`}
                  />
                </g>
              )}
            </motion.g>
          ))}
        </g>

        {/* Continuous Soft Falling Heart Petals */}
        {isBloomed &&
          fallingPetals.map((fp) => (
            <motion.path
              key={`fall-${fp.id}`}
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill={fp.color}
              initial={{
                x: fp.startX,
                y: fp.startY,
                opacity: 0,
                scale: 0.2,
                rotate: fp.rotation,
              }}
              animate={{
                x: [fp.startX, fp.startX + 25, fp.startX - 15, fp.endX],
                y: [fp.startY, fp.startY + 60, fp.startY + 140, fp.endY],
                opacity: [0, 0.9, 0.9, 0],
                scale: [0.4, (fp.size / 24) * 1.5, (fp.size / 24) * 1.5, 0.2],
                rotate: [fp.rotation, fp.rotation + 180, fp.rotation + 360],
              }}
              transition={{
                duration: fp.duration,
                repeat: Infinity,
                delay: fp.delay,
                ease: 'easeInOut',
              }}
              className="pointer-events-none drop-shadow-[0_2px_4px_rgba(255,20,147,0.4)]"
            />
          ))}

        {/* Ground fallen petals accumulation */}
        {isBloomed && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1.5 }}
          >
            {[-60, -45, -30, -15, 0, 15, 30, 45, 60, 75].map((offset, idx) => (
              <circle
                key={`ground-${idx}`}
                cx={250 + offset + (Math.sin(idx) * 15)}
                cy={366 + (Math.cos(idx) * 4)}
                r={3 + (idx % 3)}
                fill={idx % 2 === 0 ? '#FB7185' : '#FEF08A'}
                opacity={0.7}
              />
            ))}
          </motion.g>
        )}
      </svg>
    </div>
  );
};
