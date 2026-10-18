import React, { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollRevealTextProps {
  /** The text string to animate */
  text: string;
  /** HTML semantic tag to render */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  /** Classes for layout, font family, size, leading, tracking, colors */
  className?: string;
  /** Optional list of words or phrases to highlight with accent color */
  highlightWords?: string[];
  /** Styling for highlighted words */
  highlightClassName?: string;
  /** Maximum initial rotation in degrees (default: 80) */
  scrambleRotation?: number;
  /** Maximum initial displacement in pixels (default: 32) */
  scrambleDistance?: number;
  /** Character reveal stagger duration in seconds (default: 0.02) */
  stagger?: number;
  /** ScrollTrigger start marker (default: 'top 82%') */
  start?: string;
  /** ScrollTrigger end marker (default: 'center 46%') */
  end?: string;
  /** Scroll scrub smoothing amount in seconds (default: 1) */
  scrub?: boolean | number;
  /** Stagger reveal direction ('start' = LTR, 'end' = RTL, 'center', 'random') */
  direction?: 'start' | 'end' | 'center' | 'random';
  /** Whether to apply subtle character-level blur (default: true) */
  blur?: boolean;
  /** Reduced motion flag to disable large rotations/displacements */
  reducedMotion?: boolean;
  /** Optional technical character cycling variant during reveal */
  characterScramble?: boolean;
  /** Unique ID for accessibility or anchor targeting */
  id?: string;
}

interface CharTransform {
  rotZ: number;
  rotX: number;
  rotY: number;
  dx: number;
  dy: number;
  scale: number;
  opacity: number;
  blur: number;
}

/**
 * Deterministic pseudo-random generator based on character index.
 * Generates stable, reproducible values between renders without flickering.
 */
function getDeterministicTransform(
  char: string,
  index: number,
  total: number,
  maxRot: number,
  maxDist: number
): CharTransform {
  // Linear congruential generator with prime multipliers
  const seed = (index * 9301 + 49297 + char.charCodeAt(0) * 17) % 233280;
  const r1 = seed / 233280;
  const seed2 = (seed * 9301 + 49297) % 233280;
  const r2 = seed2 / 233280;
  const seed3 = (seed2 * 9301 + 49297) % 233280;
  const r3 = seed3 / 233280;
  const seed4 = (seed3 * 9301 + 49297) % 233280;
  const r4 = seed4 / 233280;

  // Alternate rotation direction deterministically with varied amplitude
  const rotDirection = index % 2 === 0 ? 1 : -1;
  const rotZ = rotDirection * (18 + r1 * (maxRot - 18));
  const rotX = (r2 - 0.5) * 40; // Subtle 3D perspective pitch
  const rotY = (r3 - 0.5) * 45; // Subtle 3D perspective yaw

  // Scatter distances
  const dx = (r2 - 0.5) * 2 * maxDist;
  const dy = (r3 - 0.5) * 2 * maxDist;

  // Scale and opacity variations
  const scale = 0.84 + r4 * 0.22;
  const opacity = 0.12 + r1 * 0.38;
  const blur = 2 + r2 * 3.5;

  return { rotZ, rotX, rotY, dx, dy, scale, opacity, blur };
}

const SCRAMBLE_SYMBOLS = '!<>-_\\/[]{}—=+*^?#________';

export const ScrollRevealText: React.FC<ScrollRevealTextProps> = ({
  text,
  as: Component = 'div',
  className = '',
  highlightWords = [],
  highlightClassName = 'text-[#FF8047] italic',
  scrambleRotation = 78,
  scrambleDistance = 30,
  stagger = 0.02,
  start = 'top 84%',
  end = 'center 46%',
  scrub = 1,
  direction = 'start',
  blur = true,
  reducedMotion = false,
  characterScramble = false,
  id,
}) => {
  const containerRef = useRef<HTMLElement>(null);

  // Normalize highlight words for case-insensitive lookup
  const cleanHighlights = useMemo(() => {
    return highlightWords.map((w) => w.trim().toLowerCase());
  }, [highlightWords]);

  // Tokenize text into words while preserving spaces
  const wordsData = useMemo(() => {
    const rawWords = text.split(' ');
    let globalCharIndex = 0;

    return rawWords.map((word, wordIndex) => {
      // Check if current word (stripped of punctuation) matches highlights
      const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '').toLowerCase();
      const isHighlighted = cleanHighlights.includes(cleanWord);

      const chars = Array.from(word).map((char) => {
        const charIdx = globalCharIndex++;
        return {
          char,
          charIndex: charIdx,
          transform: getDeterministicTransform(
            char,
            charIdx,
            text.length,
            scrambleRotation,
            scrambleDistance
          ),
        };
      });

      return {
        word,
        wordIndex,
        isHighlighted,
        chars,
      };
    });
  }, [text, cleanHighlights, scrambleRotation, scrambleDistance]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Isolate all GSAP operations inside a scoped context for clean React StrictMode teardown
    const ctx = gsap.context(() => {
      const charElements = container.querySelectorAll<HTMLElement>('.reveal-char');
      if (charElements.length === 0) return;

      if (reducedMotion) {
        // Reduced Motion: Minimal, dignified opacity fade without disorienting rotations
        gsap.fromTo(
          charElements,
          { opacity: 0.28 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.008,
            scrollTrigger: {
              trigger: container,
              start: start,
              end: end,
              scrub: scrub,
              invalidateOnRefresh: true,
            },
          }
        );
        return;
      }

      // Collect precomputed transforms for each element
      const allTransforms: CharTransform[] = [];
      wordsData.forEach((w) => {
        w.chars.forEach((c) => {
          allTransforms.push(c.transform);
        });
      });

      // Original characters cache for optional character cycling variant
      const originalChars: string[] = [];
      charElements.forEach((el) => {
        originalChars.push(el.getAttribute('data-original-char') || el.innerText);
      });

      // Perspective container
      gsap.set(container, { perspective: 800 });

      // Build Scrubbed Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: start,
          end: end,
          scrub: scrub,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (!characterScramble) return;
            const progress = self.progress;

            // Character Scramble variant: when in mid-transition, flash technical symbols
            charElements.forEach((el, idx) => {
              const orig = originalChars[idx];
              if (progress <= 0.05) {
                // Initial scrambled state
                const sym = SCRAMBLE_SYMBOLS[idx % SCRAMBLE_SYMBOLS.length];
                el.innerText = sym === ' ' ? orig : sym;
              } else if (progress >= 0.95) {
                // Final state - ALWAYS resolve to exact correct letter
                el.innerText = orig;
              } else {
                // Wave threshold based on stagger
                const charThreshold = idx / charElements.length;
                const distance = Math.abs(progress - charThreshold);
                if (distance < 0.12 && Math.random() < 0.35) {
                  el.innerText =
                    SCRAMBLE_SYMBOLS[Math.floor(Math.random() * SCRAMBLE_SYMBOLS.length)];
                } else if (progress > charThreshold) {
                  el.innerText = orig;
                }
              }
            });
          },
        },
      });

      tl.fromTo(
        charElements,
        {
          rotationZ: (i: number) => allTransforms[i]?.rotZ ?? 0,
          rotationX: (i: number) => allTransforms[i]?.rotX ?? 0,
          rotationY: (i: number) => allTransforms[i]?.rotY ?? 0,
          x: (i: number) => allTransforms[i]?.dx ?? 0,
          y: (i: number) => allTransforms[i]?.dy ?? 0,
          scale: (i: number) => allTransforms[i]?.scale ?? 1,
          opacity: (i: number) => allTransforms[i]?.opacity ?? 0.2,
          filter: blur
            ? (i: number) => `blur(${allTransforms[i]?.blur ?? 3}px)`
            : 'none',
        },
        {
          rotationZ: 0,
          rotationX: 0,
          rotationY: 0,
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          filter: blur ? 'blur(0px)' : 'none',
          ease: 'power2.out',
          stagger: {
            each: stagger,
            from: direction,
          },
        }
      );
    }, container);

    return () => {
      ctx.revert(); // Automatically kills all ScrollTriggers & reverts inline transforms
    };
  }, [
    wordsData,
    reducedMotion,
    start,
    end,
    scrub,
    stagger,
    direction,
    blur,
    characterScramble,
  ]);

  return (
    <Component
      ref={containerRef as any}
      id={id}
      className={`relative inline-block select-text transform-gpu ${className}`}
    >
      {/* Screen-reader accessible complete text */}
      <span className="sr-only">{text}</span>

      {/* Visual character elements with strict word wrapping and aria-hidden */}
      <span aria-hidden="true" className="inline leading-[inherit]">
        {wordsData.map((wordItem, wIdx) => (
          <React.Fragment key={wordItem.wordIndex}>
            {/* Word container with inline-block and whitespace-nowrap prevents words breaking midway */}
            <span
              className={`inline-block whitespace-nowrap ${
                wordItem.isHighlighted ? highlightClassName : ''
              }`}
            >
              {wordItem.chars.map((charItem) => (
                <span
                  key={charItem.charIndex}
                  data-original-char={charItem.char}
                  className="reveal-char inline-block will-change-transform transform-gpu"
                  style={{
                    display: 'inline-block',
                    transformOrigin: '50% 50%',
                  }}
                >
                  {charItem.char}
                </span>
              ))}
            </span>

            {/* Natural word spacing */}
            {wIdx < wordsData.length - 1 && (
              <span className="inline-block whitespace-pre"> </span>
            )}
          </React.Fragment>
        ))}
      </span>
    </Component>
  );
};
