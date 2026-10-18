import React, { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { OWNER_PROFILE } from '../data/socialLinks';
import { computeParallaxOffset } from '../utils/portfolioLogic';
import { PortraitTreatment } from './PortraitTreatment';
import { HeroMetadata } from './HeroMetadata';
import { HeroActions } from './HeroActions';
import { ScrollIndicator } from './ScrollIndicator';

interface EditorialHeroProps {
  motionEnabled: boolean;
  onNavigate: (sectionId: string) => void;
  customPortraitDataUrl: string | null;
}

export const EditorialHero: React.FC<EditorialHeroProps> = ({
  motionEnabled,
  onNavigate,
  customPortraitDataUrl,
}) => {
  const [parallax, setParallax] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (!motionEnabled || e.pointerType === 'touch') return;
      const rect = e.currentTarget.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setParallax(computeParallaxOffset(normX, normY, 5, motionEnabled));
    },
    [motionEnabled]
  );

  const handlePointerLeave = useCallback(() => {
    setParallax({ x: 0, y: 0 });
  }, []);

  return (
    <section
      id="top"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-label="Introduction and Editorial Portrait"
      className="relative min-h-[100svh] lg:min-h-[860px] max-h-[1150px] pt-[98px] sm:pt-[110px] pb-7 px-[var(--gutter)] flex flex-col justify-between overflow-hidden bg-[#050505] isolate"
    >
      {/* Layer 2: Faint Vertical Grid Lines */}
      <div
        aria-hidden="true"
        className="editorial-grid-lines pointer-events-none absolute inset-x-[var(--gutter)] top-[88px] bottom-0 z-0 border-x border-[#F1EEE7]/[0.055]"
      />

      {/* Layer 3: Subtle Radial Vignette & Restrained Film Grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_38%,transparent_25%,#050505_86%)]"
      />
      <div aria-hidden="true" className="editorial-grain absolute inset-0 z-0" />

      {/* Layer 7: Upper & Side Hero Metadata */}
      <HeroMetadata motionEnabled={motionEnabled} />

      {/* Layers 4, 5, 6: Ambient Rim Glow + Monochrome Portrait + Halftone Overlay */}
      <PortraitTreatment
        motionEnabled={motionEnabled}
        parallaxOffset={parallax}
        customPortraitDataUrl={customPortraitDataUrl}
      />

      {/* Layers 8 & 9: Oversized Serif Name Overlapping Portrait + Tagline + CTAs */}
      <div className="relative z-20 my-auto pt-[210px] sm:pt-[260px] md:pt-[290px] lg:pt-[310px] flex flex-col items-center text-center pointer-events-none max-w-[1200px] mx-auto w-full">
        {/* Stage 5: Clipped Line Reveal for Main Name */}
        <h1 className="font-serif-editorial font-normal tracking-[-0.045em] leading-[0.9] text-[#F1EEE7] text-[clamp(3.6rem,11.4vw,11.2rem)] drop-shadow-[0_14px_44px_rgba(0,0,0,0.92)] select-none">
          <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
            <motion.span
              initial={motionEnabled ? { y: '105%', opacity: 0 } : false}
              animate={{ y: '0%', opacity: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.42,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="block"
            >
              {OWNER_PROFILE.firstName}{' '}
              <span className="italic font-normal text-[#F4EFE6]">
                {OWNER_PROFILE.lastName}
              </span>
            </motion.span>
          </span>
        </h1>

        {/* Stage 6: Supporting Tagline */}
        <motion.p
          initial={motionEnabled ? { opacity: 0, y: 14 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.56, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 sm:mt-5 max-w-[540px] text-[15px] sm:text-[17px] md:text-[18px] leading-[1.6] text-[#F1EEE7]/82 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]"
          style={{ textWrap: 'balance' }}
        >
          {OWNER_PROFILE.tagline}
        </motion.p>

        {/* Stage 7: Hero Calls to Action */}
        <HeroActions motionEnabled={motionEnabled} onNavigate={onNavigate} />
      </div>

      {/* Stage 8 / Layer 10: Bottom Scroll Indicator */}
      <ScrollIndicator motionEnabled={motionEnabled} onNavigate={onNavigate} />
    </section>
  );
};
