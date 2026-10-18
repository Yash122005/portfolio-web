import React from 'react';
import { Sparkles, Pause } from 'lucide-react';

interface MotionToggleProps {
  motionEnabled: boolean;
  onToggle: () => void;
}

export const MotionToggle: React.FC<MotionToggleProps> = ({
  motionEnabled,
  onToggle,
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={!motionEnabled}
      aria-label={
        motionEnabled
          ? 'Motion is enabled. Click to disable nonessential animations'
          : 'Motion is disabled. Click to enable animations'
      }
      className="fixed bottom-4 right-4 sm:bottom-5 sm:right-6 z-40 inline-flex items-center gap-2 px-3 py-2 rounded-[8px] bg-[#0E0D0CEB] hover:bg-[#161513] border border-[#F1EEE7]/15 hover:border-[#FF8047]/60 backdrop-blur-md text-[10px] font-mono-editorial uppercase tracking-[0.12em] text-[#A39D94] hover:text-[#F1EEE7] transition-colors shadow-[0_8px_24px_rgba(0,0,0,0.65)] whitespace-nowrap shrink-0"
    >
      {motionEnabled ? (
        <Sparkles className="w-3 h-3 text-[#FF8047]" aria-hidden="true" />
      ) : (
        <Pause className="w-3 h-3 text-[#A39D94]" aria-hidden="true" />
      )}
      <span>Motion: {motionEnabled ? 'On' : 'Off'}</span>
    </button>
  );
};
