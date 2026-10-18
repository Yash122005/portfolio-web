import React from 'react';
import { motion } from 'motion/react';

interface SectionHeadingProps {
  chapter: string;
  metaRight: string;
  title: React.ReactNode;
  subtitle?: string;
  motionEnabled: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  chapter,
  metaRight,
  title,
  subtitle,
  motionEnabled,
}) => {
  return (
    <div className="w-full">
      {/* Top Editorial Rule + Metadata Row */}
      <div className="pt-5 border-t border-[#292724] flex items-center justify-between gap-4 text-[10px] font-mono-editorial uppercase tracking-[0.15em] text-[#A39D94]">
        <span className="text-[#F1EEE7]/90">{chapter}</span>
        <span className="hidden sm:inline-block text-[#A39D94]">{metaRight}</span>
      </div>

      {/* Main Section Title & Lead */}
      <motion.div
        initial={motionEnabled ? { opacity: 0, y: 18 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10 sm:mt-14 flex flex-col lg:flex-row lg:items-end justify-between gap-6"
      >
        <h2
          className="font-serif-editorial font-normal text-[clamp(2.5rem,5.4vw,5.25rem)] leading-[0.98] tracking-[-0.03em] text-[#F1EEE7] max-w-[18ch]"
          style={{ textWrap: 'balance' }}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="max-w-[460px] text-[15px] sm:text-[16px] leading-[1.65] text-[#A39D94]">
            {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  );
};
