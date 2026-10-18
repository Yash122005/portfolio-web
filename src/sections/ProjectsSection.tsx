import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Award, Code2, X, CheckCircle2 } from 'lucide-react';
import {
  PROJECTS,
  PROJECT_CATEGORIES,
  ProjectCategory,
  ProjectItem,
} from '../data/projects';
import { PROOF_METRICS } from '../data/skills';
import { filterProjectsByCategory } from '../utils/portfolioLogic';
import { SectionHeading } from '../components/SectionHeading';
import { ProjectCard } from '../components/ProjectCard';

interface ProjectsSectionProps {
  motionEnabled: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  motionEnabled,
}) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );

  const visibleProjects = filterProjectsByCategory(PROJECTS, activeCategory);

  useEffect(() => {
    if (!selectedProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  return (
    <>
      {/* Full-Width Verified Proof Strip */}
      <section
        aria-label="Verified Engineering and Academic Highlights"
        className="px-[var(--gutter)] py-9 border-y border-[#292724] bg-[#0B0A09]"
      >
        <div className="max-w-[1320px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-[#292724]">
          {PROOF_METRICS.map((metric, idx) => (
            <div
              key={metric.meta}
              className={`${idx > 0 ? 'lg:pl-8' : ''} ${
                idx < PROOF_METRICS.length - 1 ? 'lg:pr-8' : ''
              } flex flex-col justify-between`}
            >
              <span className="text-[10px] font-mono-editorial uppercase tracking-[0.14em] text-[#A39D94]">
                {metric.meta}
              </span>
              <div className="mt-2 font-serif-editorial text-[40px] sm:text-[46px] leading-none tracking-[-0.03em] text-[#F1EEE7] tabular-nums">
                {metric.value}
                <span className="text-[#FF8047] italic font-normal">
                  {metric.suffix}
                </span>
              </div>
              <p className="mt-2 text-[13px] leading-[1.5] text-[#A39D94]">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Selected Work Showcase */}
      <section
        id="work"
        aria-labelledby="selected-work-heading"
        className="px-[var(--gutter)] py-24 sm:py-32 bg-[#050505]"
      >
        <div className="max-w-[1320px] mx-auto">
          <SectionHeading
            chapter="01 / SELECTED WORK"
            metaRight="PRODUCTION SYSTEMS · VERIFIED REPOSITORIES"
            title={
              <span id="selected-work-heading">
                Selected <span className="italic text-[#FF8047]">Work</span>
              </span>
            }
            subtitle="Full-stack platforms, AI assessment architectures, and institutional web systems built from scratch with verifiable source repositories and live deployments."
            motionEnabled={motionEnabled}
          />

          {/* Interactive Category Filter Controls */}
          <div
            role="group"
            aria-label="Filter projects by discipline"
            className="mt-10 mb-6 flex flex-wrap items-center justify-between gap-4"
          >
            <div className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-[12px] bg-[#101010] border border-[#292724]">
              {PROJECT_CATEGORIES.map((cat) => {
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    aria-pressed={isSelected}
                    className={`px-3.5 py-2 rounded-[8px] text-[12px] font-medium transition-colors whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'bg-[#FF8047] text-[#050505]'
                        : 'text-[#A39D94] hover:text-[#F1EEE7]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <span className="text-[11px] font-mono-editorial uppercase tracking-[0.13em] text-[#A39D94]">
              SHOWING {visibleProjects.length} OF {PROJECTS.length} ARCHIVED WORKS
            </span>
          </div>

          {/* Editorial Project List */}
          <div className="mt-4">
            {visibleProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                motionEnabled={motionEnabled}
                onInspect={(proj) => setSelectedProject(proj)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Case Study & Architecture Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-modal-title"
            initial={motionEnabled ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            exit={motionEnabled ? { opacity: 0 } : undefined}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={motionEnabled ? { opacity: 0, y: 20, scale: 0.98 } : false}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={motionEnabled ? { opacity: 0, y: 12 } : undefined}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[820px] max-h-[88vh] overflow-y-auto rounded-[18px] bg-[#101010] border border-[#292724] p-6 sm:p-10 text-[#F1EEE7] shadow-[0_24px_80px_rgba(0,0,0,0.9)]"
            >
              {/* Top Modal Header */}
              <div className="flex items-start justify-between gap-4 pb-6 border-b border-[#292724]">
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-mono-editorial uppercase tracking-[0.14em] text-[#FF8047]">
                    <span>CASE STUDY {selectedProject.index}</span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedProject.categoryLabel}</span>
                  </div>
                  <h3
                    id="case-study-modal-title"
                    className="mt-2 font-serif-editorial text-[34px] sm:text-[42px] leading-[1.02] text-[#F1EEE7]"
                  >
                    {selectedProject.title}
                  </h3>
                  <p className="mt-1 text-[13px] font-mono-editorial text-[#A39D94]">
                    {selectedProject.subtitle}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close engineering notes modal"
                  className="p-2.5 rounded-[10px] bg-[#161514] hover:bg-[#FF8047] text-[#F1EEE7] hover:text-[#050505] border border-[#292724] transition-colors shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="py-6 space-y-6 text-[15px] leading-[1.7] text-[#A39D94]">
                {selectedProject.recognition && (
                  <div className="p-4 rounded-[12px] bg-[#151311] border border-[#FF8047]/35 text-[13px] font-mono-editorial text-[#FF8047] flex items-center gap-2.5">
                    <Award className="w-4 h-4 shrink-0" />
                    <span>{selectedProject.recognition}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-[11px] font-mono-editorial uppercase tracking-[0.14em] text-[#F1EEE7] mb-2">
                      PROBLEM CONTEXT
                    </h4>
                    <p>{selectedProject.problem}</p>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-mono-editorial uppercase tracking-[0.14em] text-[#F1EEE7] mb-2">
                      SYSTEM ARCHITECTURE
                    </h4>
                    <p>{selectedProject.architecture}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#292724]">
                  <h4 className="text-[11px] font-mono-editorial uppercase tracking-[0.14em] text-[#F1EEE7] mb-3">
                    KEY ENGINEERING HIGHLIGHTS
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedProject.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#FF8047] shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#292724] grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-[11px] font-mono-editorial uppercase tracking-[0.14em] text-[#F1EEE7] mb-2">
                      TECHNICAL CHALLENGE
                    </h4>
                    <p className="text-[14px]">{selectedProject.challenges}</p>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-mono-editorial uppercase tracking-[0.14em] text-[#F1EEE7] mb-2">
                      CORE LEARNINGS
                    </h4>
                    <p className="text-[14px]">{selectedProject.learnings}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#292724]">
                  <h4 className="text-[11px] font-mono-editorial uppercase tracking-[0.14em] text-[#F1EEE7] mb-2">
                    VERIFIED STACK
                  </h4>
                  <p className="font-mono-editorial text-[12px] text-[#F1EEE7]/85">
                    {selectedProject.techStack.join(' · ')}
                  </p>
                </div>
              </div>

              {/* Modal Footer Links */}
              <div className="pt-6 border-t border-[#292724] flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-[#FF8047] hover:bg-[#ff9261] text-[#050505] text-[13px] font-medium transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>{selectedProject.liveLabel || 'Open Live Demo'}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-[#161514] hover:bg-[#22201E] text-[#F1EEE7] border border-[#292724] text-[13px] font-medium transition-colors whitespace-nowrap shrink-0"
                  >
                    <Code2 className="w-4 h-4 text-[#FF8047]" />
                    <span>View GitHub Repository</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="text-[12px] font-mono-editorial uppercase tracking-[0.12em] text-[#A39D94] hover:text-[#F1EEE7] transition-colors"
                >
                  Close [ESC]
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
