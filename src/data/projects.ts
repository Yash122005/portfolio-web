export type ProjectCategory = 'all' | 'ai-fullstack' | 'systems-backend' | 'web-motion';

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel: string;
  year: string;
  featured: boolean;
  recognition?: string;
  description: string;
  problem: string;
  architecture: string;
  highlights: string[];
  challenges: string;
  learnings: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  liveLabel?: string;
  imageUrl?: string;
  schematicType: 'biometric-ai' | 'marketplace-rbac' | 'resume-graph' | 'institutional-grid' | 'api-topology' | 'exchange-matrix';
}

export const PROJECT_CATEGORIES: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All Selected Work' },
  { id: 'ai-fullstack', label: 'AI & Full-Stack' },
  { id: 'systems-backend', label: 'Systems & Backend' },
  { id: 'web-motion', label: 'Web & Interactive' },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'interview-iq',
    index: '01',
    title: 'InterviewIQ',
    subtitle: 'AI-Powered Remote Assessment & Integrity Platform',
    category: 'ai-fullstack',
    categoryLabel: 'AI & Full-Stack Architecture',
    year: '2026',
    featured: true,
    recognition: '1st Place Winner · SDS Hackathon (Hack & Forge)',
    description:
      'A full-stack AI-driven interview platform enabling engineering teams to conduct structured remote technical assessments with real-time integrity telemetry and automated candidate evaluation reports.',
    problem:
      'Unproctored remote technical screening suffers from signal loss, manual grading bottlenecks, and lack of real-time integrity verification across browser and webcam streams.',
    architecture:
      'Built on a React client and Express/Node.js REST architecture backed by MongoDB and ImageKit media pipelines, pairing AI question synthesis with real-time client integrity observers.',
    highlights: [
      'Real-time integrity telemetry covering clipboard/copy-paste interception, multi-face webcam detection, and window/tab focus tracking.',
      'Dynamic role-specific question synthesis and contextual answer evaluation powered by AI APIs.',
      'Recruiter command center with one-click candidate invites, live session status, and automated PDF evaluation dossier generation.',
    ],
    challenges:
      'Synchronizing continuous browser focus and multi-face webcam event observers alongside live interview prompts without introducing frame drops on candidate hardware.',
    learnings:
      'Designed non-blocking telemetry queues, deterministic candidate scoring rubrics, and automated PDF report generation.',
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'ImageKit', 'AI APIs'],
    githubUrl: 'https://github.com/Yash122005/AI_INTERVIEWER',
    liveUrl: 'https://ai-interviewer-eight-navy.vercel.app/',
    liveLabel: 'Live Platform',
    imageUrl: '/images/project-ai-interviewer.png',
    schematicType: 'biometric-ai',
  },
  {
    id: 'hire-point',
    index: '02',
    title: 'HirePoint',
    subtitle: 'Role-Based Talent & Service Marketplace',
    category: 'systems-backend',
    categoryLabel: 'Multi-Tenant Systems & Auth',
    year: '2026',
    featured: true,
    description:
      'A multi-role hiring and service marketplace connecting recruiters and clients with verified candidates through multi-step onboarding, Clerk authentication, and PostgreSQL row-level isolation.',
    problem:
      'Two-sided hiring portals require strict permission boundaries between candidates, recruiters, and administrators while keeping onboarding and application tracking frictionless.',
    architecture:
      'Engineered with React, Tailwind CSS, Clerk identity management, and Supabase PostgreSQL with serverless storage for resumes and verification records.',
    highlights: [
      'Granular role-based access control (RBAC) isolating recruiter, candidate, and administrator workflows.',
      'Multi-step verification and approval pipeline before profiles or job listings enter the public marketplace.',
      'Real-time application state tracking and persistent document storage backed by Supabase and PostgreSQL.',
    ],
    challenges:
      'Enforcing consistent role-level authorization policies across client routes and database queries during multi-step onboarding transitions.',
    learnings:
      'Deepened fluency in PostgreSQL schema design, Clerk session claims, and multi-role state architecture.',
    techStack: ['React', 'Supabase', 'PostgreSQL', 'Clerk', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Yash122005/HirePoint',
    liveUrl: 'https://hire-point-fs27.vercel.app/',
    imageUrl: '/images/project-hirepoint.png',
    liveLabel: 'Live Platform',
    schematicType: 'marketplace-rbac',
  },
  {
    id: 'interview-prep-planner',
    index: '03',
    title: 'Interview Prep Planner',
    subtitle: 'Schema-Enforced GenAI Resume Analyzer & Roadmap Engine',
    category: 'ai-fullstack',
    categoryLabel: 'AI & Full-Stack Architecture',
    year: '2026',
    featured: true,
    description:
      'A full-stack preparation engine that parses candidate resume PDFs against target job descriptions, computes compatibility scores, categorizes skill gaps by severity, and outputs structured day-by-day study plans.',
    problem:
      'Candidates preparing for technical roles rarely receive quantitative feedback on specific resume gaps or structured daily study plans tailored to a target job description.',
    architecture:
      'Structured as a 4-layer React frontend (UI, hooks, context, services) paired with an Express.js + MongoDB backend using JWT cookie auth, token blacklisting, and Zod-validated Gemini API outputs.',
    highlights: [
      'Automated PDF resume extraction and semantic comparison against target job descriptions with percentage match scoring.',
      'Strict Zod schema validation over Gemini API responses to guarantee deterministic JSON structures for technical/behavioral questions and day-wise roadmaps.',
      'Hardened Express.js authentication featuring HTTP-only JWT cookies and token blacklisting.',
    ],
    challenges:
      'Guaranteeing 100% deterministic JSON schema compliance from generative model responses across varied resume formats.',
    learnings:
      'Mastered Zod schema enforcement for structured LLM pipelines and clean 4-layer React frontend separation.',
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Gemini API', 'Zod', 'JWT'],
    githubUrl: 'https://github.com/Yash122005/Interview-Prep-Planner',
    liveUrl: 'https://resume-analyser1-85v2.vercel.app/',
    imageUrl: '/images/project-resume-analyser.png',
    liveLabel: 'Live Platform',
    schematicType: 'resume-graph',
  },


  {
    id: 'vec-bit-mesra',
    index: '04',
    title: 'Value Education Cell — BIT Mesra',
    subtitle: 'Official Institutional Web Platform & Digital Archive',
    category: 'web-motion',
    categoryLabel: 'Web Architecture & Motion',
    year: '2025',
    featured: true,
    recognition: 'Official Campus Platform · BIT Mesra',
    description:
      'The official web platform built from scratch for the Value Education Cell (VEC) and Vivekananda Study Circle at Birla Institute of Technology, Mesra, combining Next.js static generation with choreographed GSAP motion.',
    problem:
      'The campus cell required an authoritative, fast-loading digital home to publish initiatives, faculty advisories, and event archives across mobile and desktop devices.',
    architecture:
      'Architected with Next.js, TypeScript, Tailwind CSS, and GSAP scroll choreography, utilizing static site generation and asset optimization for rapid load performance.',
    highlights: [
      'Designed and engineered end-to-end as Web Developer for the Value Education Cell at BIT Mesra.',
      'Choreographed scroll-triggered transitions and editorial typography using GSAP and Tailwind CSS.',
      'Next.js static generation and responsive layout optimization achieving high Lighthouse performance.',
    ],
    challenges:
      'Balancing rich institutional photography and GSAP timeline animations while preserving sub-second initial paint on mobile networks.',
    learnings:
      'Refined production Next.js static generation workflows, semantic accessibility, and restrained motion choreography.',
    techStack: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'GSAP'],
    githubUrl: 'https://github.com/Yash122005/Value-Education-Cell---BITM',
    liveUrl: 'https://value-education-cell-bitm.vercel.app/',
    imageUrl: '/images/project-vec-bitm.png',
    liveLabel: 'Live Website',
    schematicType: 'institutional-grid',
  },
  {
    id: 'spotify-backend-api',
    index: '05',
    title: 'Music Streaming REST Backend',
    subtitle: 'Authenticated Media API & Postman Specification',
    category: 'systems-backend',
    categoryLabel: 'REST API & Backend Engineering',
    year: '2025',
    featured: false,
    description:
      'A complete backend architecture for audio streaming, playlist management, and user authentication with documented and verified Postman API collections.',
    problem:
      'Media streaming backends require clean relational/document modeling for tracks, albums, user libraries, and role-protected endpoints.',
    architecture:
      'Node.js and Express.js service layer with modular controller/route separation and comprehensive Postman API documentation.',
    highlights: [
      'RESTful endpoints for track metadata, playlist curation, and user session management.',
      'Published interactive Postman documentation covering request schemas, auth headers, and status codes.',
    ],
    challenges:
      'Designing clean pagination and query filtering for nested playlist and track collections.',
    learnings:
      'Strengthened API contract documentation and modular Express middleware patterns.',
    techStack: ['Node.js', 'Express.js', 'MongoDB', 'REST API', 'Postman'],
    githubUrl: 'https://github.com/Yash122005/Spotify-backend-',
    liveUrl: 'https://documenter.getpostman.com/view/46428929/2sBXwqqVsv',
    liveLabel: 'API Documentation',
    schematicType: 'api-topology',
  },
  {
    id: 'currency-converter',
    index: '06',
    title: 'Real-Time FX Exchange Utility',
    subtitle: 'Live Currency Conversion Interface',
    category: 'web-motion',
    categoryLabel: 'Frontend & API Integration',
    year: '2025',
    featured: false,
    description:
      'A responsive React web utility integrating live foreign-exchange rate feeds for instantaneous multi-currency conversion and base-pair swapping.',
    problem:
      'Providing zero-latency currency conversion with resilient asynchronous rate fetching and clean numerical formatting.',
    architecture:
      'Single-page React application with custom exchange-rate hooks, debounced input handling, and responsive CSS layout.',
    highlights: [
      'Live exchange-rate synchronization with instant base/target currency inversion.',
      'Clean tabular numeric display and mobile-first control ergonomics.',
    ],
    challenges:
      'Handling asynchronous rate updates smoothly without input jitter.',
    learnings:
      'Practiced custom React hooks for external API state and accessible form controls.',
    techStack: ['React', 'JavaScript', 'REST API', 'CSS3'],
    githubUrl: 'https://github.com/Yash122005/Currency-Convertor/tree/main/src',
    liveUrl: 'https://currency-convertor-tau-livid.vercel.app/',
    liveLabel: 'Live Utility',
    imageUrl: '/images/project-currency.png',
    schematicType: 'exchange-matrix',
  },
];
