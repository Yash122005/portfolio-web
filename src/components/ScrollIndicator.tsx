import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

interface ScrollIndicatorProps {
  motionEnabled: boolean;
  onNavigate: (sectionId: string) => void;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  motionEnabled,
  onNavigate,
}) => {
  const handleDiscoverClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate('about');
  };

  return (
    <motion.div
      initial={motionEnabled ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.82, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-20 mt-auto pt-6 sm:pr-36 flex items-center justify-between gap-4 text-[9px] sm:text-[10px] font-mono-editorial uppercase tracking-[0.14em] text-[#A39D94]"
    >
      <a
        href="#about"
        onClick={handleDiscoverClick}
        className="group inline-flex items-center gap-3.5 text-[#A39D94] hover:text-[#F1EEE7] transition-colors whitespace-nowrap shrink-0"
      >
        <span aria-hidden="true" className="scroll-indicator-line w-[1px] h-7 inline-block" />
        <span>SCROLL TO DISCOVER</span>
        <ArrowDown className="w-3 h-3 text-[#FF8047] transition-transform duration-200 group-hover:translate-y-0.5" />
      </a>

      <span className="hidden md:inline-block text-[#A39D94]/80">
        B.TECH ECE · BIT MESRA
      </span>

      <a
        href="#work"
        onClick={(e) => {
          e.preventDefault();
          onNavigate('work');
        }}
        className="hidden sm:inline-flex items-center gap-1.5 text-[#F1EEE7]/75 hover:text-[#FF8047] transition-colors whitespace-nowrap shrink-0"
      >
        <span>SELECTED WORK INDEX</span>
        <ArrowUpRight className="w-3 h-3 text-[#FF8047]" />
      </a>
    </motion.div>
  );
};
