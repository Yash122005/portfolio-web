import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

interface HeroActionsProps {
  motionEnabled: boolean;
  onNavigate: (sectionId: string) => void;
}

export const HeroActions: React.FC<HeroActionsProps> = ({
  motionEnabled,
  onNavigate,
}) => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onNavigate(id);
  };

  return (
    <motion.div
      initial={motionEnabled ? { opacity: 0, y: 14 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
      className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-5 sm:gap-7 pointer-events-auto"
    >
      {/* Primary CTA: Explore my work */}
      <a
        href="#work"
        onClick={(e) => handleScroll(e, 'work')}
        className="editorial-cta-sheen group inline-flex items-center gap-5 px-6 py-3.5 rounded-full bg-[#0D0C0BD9] hover:bg-[#FF8047] text-[#F1EEE7] hover:text-[#050505] border border-[#F1EEE7]/28 hover:border-[#FF8047] backdrop-blur-md text-[13px] font-medium tracking-[0.01em] transition-all duration-200 shadow-[0_8px_28px_rgba(0,0,0,0.55)] whitespace-nowrap shrink-0"
      >
        <span>Explore my work</span>
        <ArrowDown className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5" />
      </a>

      {/* Secondary Link: Start a conversation */}
      <a
        href="#contact"
        onClick={(e) => handleScroll(e, 'contact')}
        className="group inline-flex items-center gap-2 py-2 text-[13px] font-medium text-[#FF8047] hover:text-[#F1EEE7] transition-colors duration-200 whitespace-nowrap shrink-0"
      >
        <span>Start a conversation</span>
        <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </motion.div>
  );
};
