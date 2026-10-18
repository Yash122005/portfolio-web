import React, { useState } from 'react';
import { motion } from 'motion/react';
import { OWNER_PROFILE } from '../data/socialLinks';

interface PortraitTreatmentProps {
  motionEnabled: boolean;
  parallaxOffset: { x: number; y: number };
  customPortraitDataUrl: string | null;
}

export const PortraitTreatment: React.FC<PortraitTreatmentProps> = ({
  motionEnabled,
  parallaxOffset,
  customPortraitDataUrl,
}) => {
  const [sourceIndex, setSourceIndex] = useState<number>(0);
  const [imageError, setImageError] = useState<boolean>(false);

  const sources = [
    OWNER_PROFILE.defaultPortraitPath,
    OWNER_PROFILE.fallbackPortraitPath,
  ];

  const activeSrc = customPortraitDataUrl || sources[sourceIndex];
  const isCustomUpload = Boolean(customPortraitDataUrl);

  const handleImageError = () => {
    if (!customPortraitDataUrl && sourceIndex < sources.length - 1) {
      setSourceIndex((prev) => prev + 1);
    } else {
      setImageError(true);
    }
  };

  return (
    <div
      className="pointer-events-none select-none absolute inset-x-0 top-[82px] sm:top-[76px] md:top-[64px] bottom-0 z-10 flex justify-center items-start overflow-hidden"
      aria-hidden="true"
    >
      {/* Layer 4: Warm Ambient Rim Lighting */}
      <motion.div
        initial={motionEnabled ? { opacity: 0, scale: 0.92 } : false}
        animate={{
          opacity: 1,
          scale: 1,
          x: motionEnabled ? parallaxOffset.x * -0.8 : 0,
          y: motionEnabled ? parallaxOffset.y * -0.8 : 0,
        }}
        transition={{
          opacity: { duration: 1.0, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
          scale: { duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
          x: { duration: 0.35, ease: 'easeOut' },
          y: { duration: 0.35, ease: 'easeOut' },
        }}
        className="portrait-rim-glow absolute top-[2%] w-[340px] h-[380px] sm:w-[480px] sm:h-[520px] md:w-[620px] md:h-[640px] rounded-full blur-2xl"
      />

      {/* Layer 5 & 6: Monochrome Portrait + Halftone Texture Overlay */}
      <motion.div
        initial={motionEnabled ? { opacity: 0, y: 24, scale: 0.985 } : false}
        animate={{
          opacity: 1,
          y: motionEnabled ? parallaxOffset.y : 0,
          x: motionEnabled ? parallaxOffset.x : 0,
          scale: 1,
        }}
        transition={{
          opacity: { duration: 0.95, delay: 0.28, ease: [0.16, 1, 0.3, 1] },
          y: { duration: 0.45, ease: 'easeOut' },
          x: { duration: 0.45, ease: 'easeOut' },
          scale: { duration: 1.0, delay: 0.28, ease: [0.16, 1, 0.3, 1] },
        }}
        className="relative w-[330px] sm:w-[430px] md:w-[540px] lg:w-[600px] aspect-[4/5] max-h-[76vh] flex items-start justify-center portrait-seamless-mask"
      >
        {!imageError ? (
          <img
            src={activeSrc}
            alt="Editorial monochrome portrait of Yash Gupta"
            referrerPolicy="no-referrer"
            onError={handleImageError}
            className={`w-full h-full object-contain object-top ${
              isCustomUpload ? 'portrait-raw-filter' : ''
            }`}
          />
        ) : (
          /* Non-identifying architectural monochrome bust silhouette fallback */
          <div className="w-full h-full flex flex-col items-center justify-center bg-[radial-gradient(circle_at_55%_28%,rgba(255,128,71,0.22),transparent_62%)]">
            <svg
              viewBox="0 0 400 500"
              className="w-[82%] h-[82%] opacity-85"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="rimGlow" cx="62%" cy="28%" r="55%">
                  <stop offset="0%" stopColor="#FF8047" stopOpacity="0.65" />
                  <stop offset="55%" stopColor="#F1EEE7" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#050505" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="bustTone" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E6E1D8" stopOpacity="0.85" />
                  <stop offset="55%" stopColor="#6E6A63" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#050505" stopOpacity="0" />
                </linearGradient>
              </defs>
              <circle cx="212" cy="155" r="115" fill="url(#rimGlow)" />
              <ellipse cx="200" cy="150" rx="68" ry="82" fill="url(#bustTone)" />
              <path
                d="M70 430 C82 308, 138 265, 200 265 C262 265, 318 308, 330 430 Z"
                fill="url(#bustTone)"
              />
              <path
                d="M205 68 C246 70, 270 105, 268 152 C266 192, 248 220, 232 232"
                stroke="#FF8047"
                strokeWidth="3.5"
                strokeLinecap="round"
                opacity="0.85"
              />
            </svg>
          </div>
        )}

        {/* Layer 6: Subtle Halftone Stipple Matrix */}
        <div className="halftone-overlay absolute inset-0 pointer-events-none" />

        {/* Subtle Rim Highlight Accent on Upper Right Edge when custom image is uploaded */}
        {isCustomUpload && (
          <div
            className="absolute inset-0 pointer-events-none mix-blend-screen"
            style={{
              background:
                'radial-gradient(circle at 68% 22%, rgba(255, 128, 71, 0.36) 0%, transparent 45%)',
            }}
          />
        )}

        {/* Deep lower-shoulder shadow scrim so the overlapping serif name has crisp contrast */}
        <div
          className="absolute inset-x-0 bottom-0 h-[54%] pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(5, 5, 5, 0.58) 46%, rgba(5, 5, 5, 0.94) 84%, #050505 100%)',
          }}
        />
      </motion.div>
    </div>
  );
};
