import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Sparkles, FileText, ArrowUpRight } from 'lucide-react';
import { FAQS } from '../data/faqs';
import { SectionHeading } from '../components/SectionHeading';

interface FAQSectionProps {
  motionEnabled: boolean;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ motionEnabled }) => {
  // First item open by default for immediate preview and crawler engagement
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'bio-background': true,
  });

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-section-heading"
      itemScope
      itemType="https://schema.org/FAQPage"
      className="px-[var(--gutter)] py-24 sm:py-32 bg-[#050505] border-t border-[#292724]"
    >
      <div className="max-w-[1320px] mx-auto">
        <SectionHeading
          chapter="04 / KNOWLEDGE BASE & FAQ"
          metaRight="AEO-OPTIMIZED · DIRECT ANSWERS"
          title={
            <span id="faq-section-heading">
              Frequently <span className="italic text-[#FF8047]">Asked</span> Questions
            </span>
          }
          subtitle="Authoritative answers, verified background, and direct technical facts curated for recruiters, collaborators, and search engines."
          motionEnabled={motionEnabled}
        />

        {/* AI Answer Engine Utility Banner */}
        <motion.div
          initial={motionEnabled ? { opacity: 0, y: 16 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 p-4 sm:p-5 rounded-[14px] bg-[#0E0D0C] border border-[#292724] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3 text-[13px] text-[#A39D94]">
            <span className="p-2 rounded-[8px] bg-[#FF8047]/10 text-[#FF8047] shrink-0">
              <Sparkles className="w-4 h-4" />
            </span>
            <span>
              <strong className="text-[#F1EEE7] font-medium">Answer Engine Optimized:</strong>{' '}
              Structured with Schema.org JSON-LD and markdown manifests for AI search models.
            </span>
          </div>
          <a
            href="/llms.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-[12px] font-mono-editorial text-[#FF8047] hover:text-[#F1EEE7] px-3 py-1.5 rounded-[8px] border border-[#FF8047]/30 hover:border-[#FF8047] transition-colors shrink-0"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>View llms.txt</span>
            <ArrowUpRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>

        {/* Accordion List */}
        <div className="mt-12 border-b border-[#292724] divide-y divide-[#292724]">
          {FAQS.map((faq, idx) => {
            const isOpen = Boolean(openIds[faq.id]);
            const questionId = `faq-q-${faq.id}`;
            const answerId = `faq-a-${faq.id}`;

            return (
              <motion.article
                key={faq.id}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
                initial={motionEnabled ? { opacity: 0, y: 14 } : false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="py-6 sm:py-8 transition-colors duration-200 group"
              >
                <button
                  type="button"
                  id={questionId}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => toggleItem(faq.id)}
                  className="w-full text-left flex items-start justify-between gap-4 sm:gap-8 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <span className="text-[12px] font-mono-editorial text-[#FF8047] mt-1 shrink-0 tabular-nums">
                      {faq.index}
                    </span>
                    <div>
                      <div className="text-[10px] font-mono-editorial uppercase tracking-[0.14em] text-[#A39D94] mb-1.5">
                        {faq.category}
                      </div>
                      <h3
                        itemProp="name"
                        className="font-serif-editorial text-[22px] sm:text-[26px] leading-[1.25] text-[#F1EEE7] group-hover:text-[#FF8047] transition-colors"
                      >
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  <span
                    className={`mt-1.5 p-2 rounded-full border border-[#292724] text-[#A39D94] group-hover:border-[#FF8047] group-hover:text-[#FF8047] transition-all duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 bg-[#FF8047]/10 text-[#FF8047] border-[#FF8047]/40' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={answerId}
                      role="region"
                      aria-labelledby={questionId}
                      itemScope
                      itemProp="acceptedAnswer"
                      itemType="https://schema.org/Answer"
                      initial={motionEnabled ? { opacity: 0, height: 0 } : false}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={motionEnabled ? { opacity: 0, height: 0 } : undefined}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div
                        itemProp="text"
                        className="pt-6 pl-7 sm:pl-12 max-w-[940px] space-y-4"
                      >
                        <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#F1EEE7]/90 font-medium bg-[#11100F] p-4 rounded-[10px] border border-[#292724]/70">
                          {faq.shortAnswer}
                        </p>

                        <div className="space-y-2.5 text-[14px] sm:text-[15px] leading-[1.7] text-[#A39D94]">
                          {faq.detailedAnswer.map((para, pIdx) => (
                            <p key={pIdx}>{para}</p>
                          ))}
                        </div>

                        {/* Keyword / Entity Tags */}
                        <div className="pt-2 flex flex-wrap gap-2">
                          {faq.keywords.map((kw) => (
                            <span
                              key={kw}
                              className="text-[10px] font-mono-editorial uppercase tracking-[0.1em] px-2.5 py-1 rounded-[6px] bg-[#161514] text-[#A39D94] border border-[#292724]"
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
