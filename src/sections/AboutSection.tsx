import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Upload, RotateCcw } from 'lucide-react';
import { OWNER_PROFILE } from '../data/socialLinks';
import { VERIFIED_MILESTONES } from '../data/skills';
import { SectionHeading } from '../components/SectionHeading';

interface AboutSectionProps {
  motionEnabled: boolean;
  customPortraitDataUrl: string | null;
  onUpdatePortrait: (dataUrl: string | null) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  motionEnabled,
  customPortraitDataUrl,
  onUpdatePortrait,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUpdatePortrait(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section
      id="about"
      aria-labelledby="about-section-heading"
      className="px-[var(--gutter)] py-24 sm:py-32 bg-[#050505] border-t border-[#292724]"
    >
      <div className="max-w-[1320px] mx-auto">
        <SectionHeading
          chapter="02 / THE PERSON BEHIND THE WORK"
          metaRight="BIT MESRA · FULL-STACK & EMBEDDED"
          title={
            <span id="about-section-heading">
              Engineering with{' '}
              <span className="italic text-[#FF8047]">clarity</span> and intent.
            </span>
          }
          subtitle="Bridging full-stack software architecture, AI-powered product workflows, and electronics engineering fundamentals."
          motionEnabled={motionEnabled}
        />

        {/* Two-Column Editorial Narrative & Provenance */}
        <div className="mt-14 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Biography & Engineering Philosophy (6 cols) */}
          <motion.div
            initial={motionEnabled ? { opacity: 0, y: 20 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <p className="font-serif-editorial text-[24px] sm:text-[29px] leading-[1.35] text-[#F1EEE7]">
              I am Yash Gupta, a full-stack developer and B.Tech Electronics
              &amp; Communication Engineering undergraduate at Birla Institute of
              Technology, Mesra (2024–2028).
            </p>

            <p className="text-[15px] sm:text-[16px] leading-[1.75] text-[#A39D94]">
              My work centers on turning complex technical problems into fast,
              dependable web applications. Whether architecting real-time
              integrity monitoring for remote technical interviews, designing
              role-isolated hiring marketplaces with PostgreSQL and Clerk, or
              enforcing deterministic Zod schemas over generative AI outputs, I
              care deeply about clean systems and tactile user interfaces.
            </p>

            <p className="text-[15px] sm:text-[16px] leading-[1.75] text-[#A39D94]">
              Alongside full-stack development, my background in Electronics
              &amp; Communication Engineering informs a disciplined approach to
              data structures (300+ problems solved on LeetCode), embedded
              systems (ESP32 and Arduino), and low-latency software design.
            </p>

            {/* Unboxed Metadata Fact Grid */}
            <div className="pt-6 border-t border-[#292724] grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11px] font-mono-editorial uppercase tracking-[0.12em] text-[#A39D94]">
              <div>
                <span className="block text-[#F1EEE7]">INSTITUTION</span>
                <span>BIT Mesra, Ranchi (CGPA 8.18)</span>
              </div>
              <div>
                <span className="block text-[#F1EEE7]">PRIMARY FOCUS</span>
                <span>Full-Stack Web · GenAI · DSA</span>
              </div>
              <div>
                <span className="block text-[#F1EEE7]">CAMPUS ROLE</span>
                <span>Web Developer, Value Education Cell</span>
              </div>
              <div>
                <span className="block text-[#F1EEE7]">BASE</span>
                <span>Azamgarh / Ranchi, India</span>
              </div>
            </div>

            {/* Verified Resume Link + Portrait Slot Control */}
            <div className="pt-4 flex flex-wrap items-center gap-5">
              <a
                href={OWNER_PROFILE.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-[10px] bg-[#101010] hover:bg-[#FF8047] text-[#F1EEE7] hover:text-[#050505] border border-[#292724] hover:border-[#FF8047] text-[13px] font-medium transition-colors whitespace-nowrap shrink-0"
              >
                <span>Read Curriculum Vitae (PDF)</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleFileChange}
                className="sr-only"
                aria-label="Upload custom hero portrait image"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-[10px] bg-[#101010] hover:border-[#FF8047]/60 text-[#A39D94] hover:text-[#F1EEE7] border border-[#292724] text-[12px] font-mono-editorial uppercase tracking-[0.1em] transition-colors whitespace-nowrap shrink-0"
              >
                <Upload className="w-3.5 h-3.5 text-[#FF8047]" />
                <span>Replace Hero Portrait</span>
              </button>

              {customPortraitDataUrl && (
                <button
                  type="button"
                  onClick={() => onUpdatePortrait(null)}
                  className="inline-flex items-center gap-1.5 text-[11px] font-mono-editorial uppercase tracking-[0.1em] text-[#FF8047] hover:text-[#F1EEE7] transition-colors whitespace-nowrap shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Default Portrait</span>
                </button>
              )}
            </div>
            <p className="text-[11px] font-mono-editorial text-[#A39D94]/70">
              Portrait slot reads from{' '}
              <code className="text-[#F1EEE7]/90">public/images/yash-portrait.webp</code>{' '}
              or can be previewed live using &ldquo;Replace Hero Portrait&rdquo;.
            </p>
          </motion.div>

          {/* Right Column: Verified Academic & Engineering Provenance (6 cols) */}
          <motion.div
            initial={motionEnabled ? { opacity: 0, y: 20 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.65,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:col-span-6 rounded-[16px] bg-[#101010] border border-[#292724] p-6 sm:p-9"
          >
            <div className="flex items-center justify-between pb-5 border-b border-[#292724] text-[10px] font-mono-editorial uppercase tracking-[0.14em] text-[#A39D94]">
              <span className="text-[#F1EEE7]">VERIFIED CHRONOLOGY</span>
              <span className="text-[#FF8047]">2024 — PRESENT</span>
            </div>

            <div className="divide-y divide-[#292724]">
              {VERIFIED_MILESTONES.map((item) => (
                <article key={item.title} className="py-6 first:pt-6 last:pb-2">
                  <div className="flex items-center justify-between gap-2 text-[10px] font-mono-editorial uppercase tracking-[0.14em] text-[#A39D94]">
                    <span>{item.period}</span>
                    <span className="text-[#FF8047]">{item.tag}</span>
                  </div>
                  <h3 className="mt-2 font-serif-editorial text-[23px] sm:text-[25px] leading-[1.15] text-[#F1EEE7]">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 text-[12px] font-mono-editorial text-[#F1EEE7]/75">
                    {item.organization}
                  </p>
                  <p className="mt-2.5 text-[14px] leading-[1.65] text-[#A39D94]">
                    {item.detail}
                  </p>
                </article>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
