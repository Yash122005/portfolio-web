import React, { useState } from 'react';
import { ScrollRevealText } from '../components/ScrollRevealText';

interface TextScrambleSectionProps {
  motionEnabled: boolean;
  /** Customizable eyebrow text */
  eyebrow?: string;
  /** Customizable main heading text */
  mainHeading?: string;
  /** Customizable supporting statement */
  supportingStatement?: string;
  /** Customizable secondary heading */
  secondaryHeading?: string;
  /** Customizable closing statement */
  closingStatement?: string;
}

export const TextScrambleSection: React.FC<TextScrambleSectionProps> = ({
  motionEnabled,
  eyebrow = 'A LITTLE ABOUT ME',
  mainHeading = 'I BUILD DIGITAL EXPERIENCES.',
  supportingStatement = 'Turning ideas into thoughtful interfaces through code, creativity, and motion.',
  secondaryHeading = 'DESIGN MEETS ENGINEERING.',
  closingStatement = 'Scroll to discover what comes next.',
}) => {
  const [useGlyphVariant, setUseGlyphVariant] = useState<boolean>(false);

  return (
    <section
      id="manifesto"
      aria-label="Editorial manifesto and creative statement"
      className="relative px-[var(--gutter)] py-28 sm:py-36 md:py-44 bg-[#050505] border-t border-[#292724] overflow-hidden isolate"
    >
      {/* Editorial Watermark & Background Grid Accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(255,128,71,0.06),transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 right-6 font-mono-editorial text-[140px] sm:text-[200px] font-bold text-[#F1EEE7]/[0.015] select-none leading-none"
      >
        01
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto flex flex-col gap-16 sm:gap-20 md:gap-24">
        {/* Stage 1: Eyebrow + Variant Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#292724] pb-6">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="inline-block w-2 h-2 rounded-full bg-[#FF8047] animate-pulse"
            />
            <ScrollRevealText
              as="p"
              text={eyebrow}
              reducedMotion={!motionEnabled}
              scrambleRotation={45}
              scrambleDistance={18}
              stagger={0.015}
              start="top 90%"
              end="top 65%"
              className="font-mono-editorial text-[11px] sm:text-[12px] uppercase tracking-[0.2em] text-[#FF8047]"
            />
          </div>

          {/* Interactive Technical Glyph Mode Toggle */}
          <div className="flex items-center gap-2 text-[10px] font-mono-editorial uppercase tracking-[0.14em]">
            <span className="text-[#A39D94]">Scramble Mode:</span>
            <button
              type="button"
              onClick={() => setUseGlyphVariant(!useGlyphVariant)}
              className={`px-2.5 py-1 rounded border transition-all ${
                useGlyphVariant
                  ? 'border-[#FF8047] text-[#FF8047] bg-[#FF8047]/10'
                  : 'border-[#292724] text-[#A39D94] hover:border-[#A39D94]'
              }`}
            >
              {useGlyphVariant ? '◈ Technical Glyphs: ON' : '◇ Spatial Transforms'}
            </button>
          </div>
        </div>

        {/* Stage 2: Main Heroic Statement (Large Headline Scramble Reveal) */}
        <div className="max-w-[1080px]">
          <ScrollRevealText
            as="h2"
            text={mainHeading}
            highlightWords={['DIGITAL', 'EXPERIENCES.']}
            highlightClassName="text-[#F1EEE7] italic font-normal"
            reducedMotion={!motionEnabled}
            characterScramble={useGlyphVariant}
            scrambleRotation={88}
            scrambleDistance={42}
            stagger={0.022}
            start="top 82%"
            end="center 42%"
            scrub={1.2}
            blur={true}
            className="font-serif-editorial text-[clamp(2.5rem,7vw,6.5rem)] font-normal leading-[1.0] tracking-[-0.035em] text-[#F1EEE7]"
          />
        </div>

        {/* Stage 3: Supporting Statement */}
        <div className="max-w-[760px] pl-2 sm:pl-6 border-l-2 border-[#FF8047]/30">
          <ScrollRevealText
            as="p"
            text={supportingStatement}
            highlightWords={['code,', 'creativity,', 'motion.']}
            highlightClassName="text-[#FF8047] font-medium"
            reducedMotion={!motionEnabled}
            characterScramble={useGlyphVariant}
            scrambleRotation={55}
            scrambleDistance={24}
            stagger={0.012}
            start="top 85%"
            end="center 50%"
            scrub={1}
            blur={true}
            className="font-sans-editorial text-[18px] sm:text-[22px] md:text-[26px] leading-[1.6] text-[#A39D94]"
          />
        </div>

        {/* Stage 4: Secondary Heading & Closing Directive */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-[#292724] items-baseline">
          <div className="md:col-span-8">
            <ScrollRevealText
              as="h3"
              text={secondaryHeading}
              highlightWords={['ENGINEERING.']}
              highlightClassName="text-[#FF8047]"
              reducedMotion={!motionEnabled}
              characterScramble={useGlyphVariant}
              scrambleRotation={70}
              scrambleDistance={32}
              stagger={0.018}
              start="top 88%"
              end="center 52%"
              scrub={1}
              blur={true}
              className="font-serif-editorial text-[30px] sm:text-[44px] md:text-[52px] leading-[1.1] tracking-[-0.025em] text-[#F1EEE7]"
            />
          </div>

          <div className="md:col-span-4 flex items-center justify-start md:justify-end gap-2 text-[#FF8047]">
            <ScrollRevealText
              as="p"
              text={closingStatement}
              reducedMotion={!motionEnabled}
              scrambleRotation={40}
              scrambleDistance={16}
              stagger={0.014}
              start="top 90%"
              end="bottom 70%"
              scrub={1}
              blur={false}
              className="font-mono-editorial text-[11px] sm:text-[12px] uppercase tracking-[0.16em] text-[#FF8047]"
            />
            <span aria-hidden="true" className="text-[16px] leading-none animate-bounce">
              ↓
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
