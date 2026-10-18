import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Award, Code2, Layers } from 'lucide-react';
import { ProjectItem } from '../data/projects';

interface ProjectCardProps {
  project: ProjectItem;
  motionEnabled: boolean;
  onInspect: (project: ProjectItem) => void;
}

const ProjectSchematicPlate: React.FC<{ project: ProjectItem }> = ({ project }) => {
  const [imgFailed, setImgFailed] = useState(false);

  if (project.imageUrl && !imgFailed) {
    return (
      <div className="relative w-full h-full overflow-hidden bg-[#0A0A09]">
        <img
          src={project.imageUrl}
          alt={`${project.title} interface preview`}
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
          className="w-full h-full object-cover object-top filter grayscale contrast-125 opacity-80 group-hover:scale-[1.02] group-hover:grayscale-0 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0A0908] flex flex-col justify-between p-6 sm:p-8">
      {/* Subtle architectural background grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(241,238,231,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(241,238,231,0.07) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 72% 28%, rgba(255,128,71,0.18) 0%, rgba(16,16,16,0.2) 48%, #0A0908 90%)',
        }}
      />

      {/* Top Plate Telemetry */}
      <div className="relative z-10 flex items-center justify-between gap-4 text-[10px] font-mono-editorial uppercase tracking-[0.14em] text-[#A39D94]">
        <span>PLATE {project.index} · {project.schematicType.toUpperCase()}</span>
        <span className="text-[#FF8047]">{project.year}</span>
      </div>

      {/* Central Bespoke Architectural Diagram */}
      <div className="relative z-10 my-auto py-6 flex items-center justify-center">
        {project.schematicType === 'biometric-ai' && (
          <svg viewBox="0 0 480 220" className="w-full max-w-[420px] h-auto" fill="none">
            <rect x="16" y="20" width="190" height="180" rx="8" stroke="#292724" strokeWidth="1.5" fill="#101010" />
            <circle cx="111" cy="95" r="42" stroke="#FF8047" strokeWidth="1.5" strokeDasharray="4 4" />
            <circle cx="111" cy="95" r="24" stroke="#F1EEE7" strokeOpacity="0.45" strokeWidth="1.2" />
            <path d="M55 162 H167" stroke="#292724" strokeWidth="1.5" />
            <path d="M55 176 H135" stroke="#FF8047" strokeOpacity="0.7" strokeWidth="1.5" />
            <rect x="234" y="20" width="230" height="82" rx="8" stroke="#292724" strokeWidth="1.5" fill="#101010" />
            <path d="M254 68 L282 48 L310 74 L342 42 L374 64 L406 38 L440 58" stroke="#FF8047" strokeWidth="2" />
            <rect x="234" y="118" width="230" height="82" rx="8" stroke="#292724" strokeWidth="1.5" fill="#101010" />
            <path d="M254 146 H390 M254 166 H428 M254 184 H340" stroke="#F1EEE7" strokeOpacity="0.35" strokeWidth="1.5" />
          </svg>
        )}

        {project.schematicType === 'marketplace-rbac' && (
          <svg viewBox="0 0 480 220" className="w-full max-w-[420px] h-auto" fill="none">
            <rect x="24" y="34" width="120" height="152" rx="8" stroke="#292724" strokeWidth="1.5" fill="#101010" />
            <rect x="180" y="20" width="120" height="180" rx="8" stroke="#FF8047" strokeOpacity="0.75" strokeWidth="1.5" fill="#131110" />
            <rect x="336" y="34" width="120" height="152" rx="8" stroke="#292724" strokeWidth="1.5" fill="#101010" />
            <path d="M144 110 H180 M300 110 H336" stroke="#FF8047" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="84" cy="82" r="18" stroke="#F1EEE7" strokeOpacity="0.5" strokeWidth="1.5" />
            <circle cx="240" cy="82" r="22" stroke="#FF8047" strokeWidth="1.75" />
            <circle cx="396" cy="82" r="18" stroke="#F1EEE7" strokeOpacity="0.5" strokeWidth="1.5" />
            <path d="M52 132 H116 M204 132 H276 M364 132 H428" stroke="#F1EEE7" strokeOpacity="0.35" strokeWidth="1.5" />
          </svg>
        )}

        {project.schematicType === 'resume-graph' && (
          <svg viewBox="0 0 480 220" className="w-full max-w-[420px] h-auto" fill="none">
            <rect x="28" y="24" width="144" height="172" rx="6" stroke="#292724" strokeWidth="1.5" fill="#101010" />
            <path d="M52 56 H148 M52 78 H132 M52 100 H148 M52 122 H116 M52 144 H140" stroke="#F1EEE7" strokeOpacity="0.4" strokeWidth="1.5" />
            <path d="M172 110 C215 110, 215 62, 258 62 M172 110 C215 110, 215 158, 258 158" stroke="#FF8047" strokeWidth="1.75" />
            <rect x="258" y="32" width="194" height="60" rx="6" stroke="#FF8047" strokeOpacity="0.8" strokeWidth="1.5" fill="#131110" />
            <rect x="258" y="128" width="194" height="60" rx="6" stroke="#292724" strokeWidth="1.5" fill="#101010" />
            <path d="M280 62 H420 M280 158 H396" stroke="#F1EEE7" strokeOpacity="0.55" strokeWidth="1.5" />
          </svg>
        )}

        {(project.schematicType === 'institutional-grid' ||
          project.schematicType === 'api-topology' ||
          project.schematicType === 'exchange-matrix') && (
          <svg viewBox="0 0 480 220" className="w-full max-w-[420px] h-auto" fill="none">
            <rect x="24" y="22" width="432" height="176" rx="8" stroke="#292724" strokeWidth="1.5" fill="#101010" />
            <line x1="24" y1="60" x2="456" y2="60" stroke="#292724" strokeWidth="1.5" />
            <line x1="168" y1="60" x2="168" y2="198" stroke="#292724" strokeWidth="1.5" />
            <circle cx="48" cy="41" r="4" fill="#FF8047" />
            <circle cx="64" cy="41" r="4" fill="#292724" />
            <path d="M52 94 H140 M52 118 H124 M52 142 H134" stroke="#F1EEE7" strokeOpacity="0.35" strokeWidth="1.5" />
            <rect x="196" y="84" width="232" height="88" rx="6" stroke="#FF8047" strokeOpacity="0.65" strokeWidth="1.5" fill="#141210" />
            <path d="M220 116 H392 M220 140 H336" stroke="#F1EEE7" strokeOpacity="0.6" strokeWidth="1.5" />
          </svg>
        )}
      </div>

      {/* Bottom Plate Stack Summary */}
      <div className="relative z-10 flex items-center justify-between gap-4 pt-3 border-t border-[#292724]/80 text-[10px] font-mono-editorial text-[#A39D94]">
        <span className="truncate">{project.techStack.slice(0, 4).join(' · ')}</span>
        <span className="inline-flex items-center gap-1 text-[#F1EEE7] group-hover:text-[#FF8047] transition-colors shrink-0">
          <span>INSPECT ARCHITECTURE</span>
          <ArrowUpRight className="w-3 h-3 text-[#FF8047]" />
        </span>
      </div>
    </div>
  );
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  motionEnabled,
  onInspect,
}) => {
  return (
    <motion.article
      initial={motionEnabled ? { opacity: 0, y: 22 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="group py-10 sm:py-14 border-t border-[#292724] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch"
    >
      {/* Left Column: Editorial Narrative & Controls (5 cols) */}
      <div className="lg:col-span-5 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata Line (Zero-Pill Discipline) */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono-editorial uppercase tracking-[0.13em] text-[#A39D94]">
            <span className="text-[#FF8047]">{project.index}</span>
            <span aria-hidden="true">/</span>
            <span>{project.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
          </div>

          <h3 className="mt-4 font-serif-editorial font-normal text-[clamp(2rem,3.4vw,3.25rem)] leading-[1.04] tracking-[-0.02em] text-[#F1EEE7]">
            <button
              type="button"
              onClick={() => onInspect(project)}
              className="text-left hover:text-[#FF8047] transition-colors"
            >
              {project.title}
            </button>
          </h3>

          <p className="mt-1.5 text-[13px] font-mono-editorial text-[#F1EEE7]/75">
            {project.subtitle}
          </p>

          {project.recognition && (
            <p className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-mono-editorial text-[#FF8047]">
              <Award className="w-3.5 h-3.5 shrink-0" />
              <span>{project.recognition}</span>
            </p>
          )}

          <p className="mt-5 text-[15px] leading-[1.7] text-[#A39D94]">
            {project.description}
          </p>

          {/* Unboxed Tech Stack List with Typographic Middle Dots */}
          <div className="mt-6 pt-4 border-t border-[#292724]/70 text-[12px] font-mono-editorial text-[#F1EEE7]/85 leading-[1.8]">
            {project.techStack.map((tech, idx) => (
              <React.Fragment key={tech}>
                <span>{tech}</span>
                {idx < project.techStack.length - 1 && (
                  <span aria-hidden="true" className="mx-2 text-[#FF8047]">
                    ·
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Action Bar: Engineering Notes Modal + Verified Links */}
        <div className="mt-8 pt-4 flex flex-wrap items-center gap-5">
          <button
            type="button"
            onClick={() => onInspect(project)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] bg-[#151413] hover:bg-[#FF8047] text-[#F1EEE7] hover:text-[#050505] border border-[#292724] hover:border-[#FF8047] text-[12px] font-medium transition-colors whitespace-nowrap shrink-0"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Engineering notes</span>
          </button>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-1.5 text-[12px] font-medium text-[#FF8047] hover:text-[#F1EEE7] transition-colors whitespace-nowrap shrink-0"
            >
              <span>{project.liveLabel || 'Live Demo'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          )}

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/code inline-flex items-center gap-1.5 text-[12px] font-medium text-[#A39D94] hover:text-[#F1EEE7] transition-colors whitespace-nowrap shrink-0"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Source Code</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/code:translate-x-0.5 group-hover/code:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* Right Column: Interactive Visual Plate (7 cols) */}
      <div className="lg:col-span-7 flex">
        <button
          type="button"
          onClick={() => onInspect(project)}
          aria-label={`Inspect architecture and case study for ${project.title}`}
          className="w-full min-h-[280px] sm:min-h-[340px] rounded-[16px] border border-[#292724] group-hover:border-[#FF8047]/55 overflow-hidden text-left transition-colors duration-300 relative"
        >
          <ProjectSchematicPlate project={project} />
        </button>
      </div>
    </motion.article>
  );
};
