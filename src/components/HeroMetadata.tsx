import React from 'react';
import { motion } from 'motion/react';
import { OWNER_PROFILE } from '../data/socialLinks';

interface HeroMetadataProps {
  motionEnabled: boolean;
}

export const HeroMetadata: React.FC<HeroMetadataProps> = ({ motionEnabled }) => {
  return (
    <>
      {/* Stage 3: Upper Left & Upper Right Editorial Metadata */}
      <div className="relative z-20 flex items-center justify-between gap-4 pt-2 text-[9px] sm:text-[10px] font-mono-editorial uppercase tracking-[0.14em] text-[#A39D94]">
        <motion.div
          initial={motionEnabled ? { opacity: 0, y: 8 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2.5"
        >
          <span
            aria-hidden="true"
            className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF8047]"
          />
          <span>{OWNER_PROFILE.heroTopLeft}</span>
        </motion.div>

        <motion.div
          initial={motionEnabled ? { opacity: 0, y: 8 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="hidden sm:block text-right text-[#A39D94]"
        >
          <span>{OWNER_PROFILE.heroTopRight}</span>
        </motion.div>
      </div>

      {/* Left Side Chapter Presence Note (Desktop Editorial Detail) */}
      <motion.aside
        aria-label="Editorial chapter note"
        initial={motionEnabled ? { opacity: 0, x: -10 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.65, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex flex-col gap-10 absolute left-[var(--gutter)] top-[37%] z-20 pointer-events-none font-mono-editorial text-[9px] uppercase tracking-[0.15em] text-[#A39D94]/85"
      >
        <div className="flex flex-col gap-2">
          <span className="text-[#FF8047]">{OWNER_PROFILE.heroSideIndex}</span>
          <span className="text-[#FF8047] text-[18px] leading-none font-light">+</span>
        </div>
        <div className="flex flex-col gap-1.5 leading-[1.75]">
          {OWNER_PROFILE.heroSideThemes.map((theme) => (
            <span key={theme}>{theme}</span>
          ))}
        </div>
      </motion.aside>
    </>
  );
};
