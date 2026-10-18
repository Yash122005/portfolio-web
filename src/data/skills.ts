export interface SkillCategory {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
}

export interface MilestoneItem {
  period: string;
  title: string;
  organization: string;
  detail: string;
  tag: string;
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    index: '01',
    title: 'Frontend Architecture & Motion',
    subtitle: 'INTERFACES · DESIGN SYSTEMS · CHOREOGRAPHY',
    description:
      'Component-driven web interfaces engineered for visual restraint, fluid responsiveness, and 60fps interaction.',
    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript (ES6+)',
      'Tailwind CSS',
      'GSAP',
      'Framer Motion',
      'HTML5 & CSS3',
      'Redux Toolkit',
      'Radix UI & ShadCN UI',
    ],
  },
  {
    index: '02',
    title: 'Backend, APIs & Data Systems',
    subtitle: 'SERVICES · PERSISTENCE · AUTHENTICATION',
    description:
      'Scalable server-side applications, RESTful APIs, relational and document databases, and role-based identity flows.',
    skills: [
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'MongoDB',
      'SQL',
      'Supabase',
      'REST APIs',
      'JWT & Clerk Auth',
      'Zod Schema Validation',
      'ImageKit',
    ],
  },
  {
    index: '03',
    title: 'Core Languages & Problem Solving',
    subtitle: 'ALGORITHMS · EMBEDDED · FOUNDATIONS',
    description:
      'Strong foundations in data structures, algorithmic problem solving (300+ LeetCode problems), and hardware-adjacent programming.',
    skills: [
      'C',
      'C++',
      'Python',
      'Data Structures & Algorithms',
      'Object-Oriented Programming',
      'ESP32 & Arduino',
      'Embedded Systems',
    ],
  },
  {
    index: '04',
    title: 'AI Integration, Tooling & Design',
    subtitle: 'GENAI PIPELINES · DEVOPS · UI/UX',
    description:
      'Structured LLM integrations, version control, API verification, and interface prototyping from wireframe to production.',
    skills: [
      'Google Gemini API',
      'Git & GitHub',
      'Docker',
      'Postman',
      'Figma (UI/UX & Prototyping)',
      'Vercel & Render Deployment',
    ],
  },
];

export const VERIFIED_MILESTONES: MilestoneItem[] = [
  {
    period: '2024 — 2028',
    title: 'B.Tech in Electronics & Communication Engineering',
    organization: 'Birla Institute of Technology (BIT), Mesra',
    detail: 'CGPA: 8.18 (till 4th Semester) · JEE Main 97.2 Percentile · JEE Advanced Rank 25K.',
    tag: 'EDUCATION',
  },
  {
    period: 'APR 2025 — PRESENT',
    title: 'Web Developer',
    organization: 'Value Education Cell, BIT Mesra',
    detail: 'Architected and deployed the official campus web platform using Next.js, TypeScript, Tailwind CSS, and GSAP.',
    tag: 'EXPERIENCE',
  },
  {
    period: '2026',
    title: '1st Place Winner — SDS Hackathon (Hack & Forge)',
    organization: 'Birla Institute of Technology, Mesra',
    detail: 'Secured 1st position among competing teams by building InterviewIQ, an AI interview platform with real-time integrity monitoring.',
    tag: 'RECOGNITION',
  },
  {
    period: '2026',
    title: '2nd Runner-Up — Ad-Venture (E-Summit Flagship)',
    organization: 'Entrepreneurship Development Cell, BIT Mesra',
    detail: 'Recognized on the podium at the flagship E-Summit competition alongside solving 300+ DSA problems on LeetCode.',
    tag: 'RECOGNITION',
  },
];

export const PROOF_METRICS = [
  {
    value: '300',
    suffix: '+',
    label: ' algorithmic problems solved on LeetCode',
    meta: 'DSA · C++ & JAVASCRIPT',
  },
  {
    value: '1st',
    suffix: ' Place',
    label: ' winner at SDS Hackathon (Hack & Forge)',
    meta: 'INTERVIEWIQ PLATFORM',
  },
  {
    value: '8.18',
    suffix: ' CGPA',
    label: ' B.Tech ECE at BIT Mesra (2024–2028)',
    meta: 'ACADEMIC STANDING',
  },
  {
    value: '30',
    suffix: '+',
    label: ' public repositories & full-stack builds on GitHub',
    meta: 'OPEN SOURCE & WEB',
  },
];
