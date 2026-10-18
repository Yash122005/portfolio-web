import React from 'react';
import { motion } from 'motion/react';
import { SKILL_CATEGORIES } from '../data/skills';
import { SectionHeading } from '../components/SectionHeading';

interface SkillsSectionProps {
  motionEnabled: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  motionEnabled,
}) => {
  return (
    <section
      id="skills"
      aria-labelledby="skills-section-heading"
      className="px-[var(--gutter)] py-24 sm:py-32 bg-[#050505] border-t border-[#292724]"
    >
      <div className="max-w-[1320px] mx-auto">
        <SectionHeading
          chapter="03 / CAPABILITIES & STACK"
          metaRight="VERIFIED TECHNOLOGIES · NO SYNTHETIC SCORES"
          title={
            <span id="skills-section-heading">
              Technical <span className="italic text-[#FF8047]">Index</span>
            </span>
          }
          subtitle="A curated inventory of languages, frameworks, and tools actively used across my repositories and coursework."
          motionEnabled={motionEnabled}
        />

        {/* Editorial 4-Row Typographic Index */}
        <div className="mt-14 border-b border-[#292724] divide-y divide-[#292724]">
          {SKILL_CATEGORIES.map((group, idx) => (
            <motion.div
              key={group.index}
              initial={motionEnabled ? { opacity: 0, y: 16 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.55,
                delay: idx * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="py-10 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start"
            >
              {/* Index + Category Heading (5 cols) */}
              <div className="lg:col-span-5">
                <div className="flex items-center gap-2.5 text-[10px] font-mono-editorial uppercase tracking-[0.14em] text-[#A39D94]">
                  <span className="text-[#FF8047]">{group.index}</span>
                  <span aria-hidden="true">/</span>
                  <span>{group.subtitle}</span>
                </div>
                <h3 className="mt-2.5 font-serif-editorial text-[28px] sm:text-[34px] leading-[1.08] text-[#F1EEE7]">
                  {group.title}
                </h3>
                <p className="mt-2.5 text-[14px] leading-[1.65] text-[#A39D94] max-w-[400px]">
                  {group.description}
                </p>
              </div>

              {/* Clean Typographic Skill List (7 cols) */}
              <div className="lg:col-span-7 lg:pt-6">
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-y-3.5 gap-x-6">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-baseline gap-2.5 text-[14px] sm:text-[15px] text-[#F1EEE7]/90 font-normal"
                    >
                      <span
                        aria-hidden="true"
                        className="text-[11px] font-mono-editorial text-[#FF8047]"
                      >
                        /
                      </span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
