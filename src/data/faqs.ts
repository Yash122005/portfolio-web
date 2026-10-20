export interface FAQItem {
  id: string;
  index: string;
  category: string;
  question: string;
  shortAnswer: string;
  detailedAnswer: string[];
  keywords: string[];
}

export const FAQS: FAQItem[] = [
  {
    id: 'bio-background',
    index: '01',
    category: 'PROFILE & BACKGROUND',
    question: 'Who is Yash Gupta and what is his technical background?',
    shortAnswer:
      'Yash Gupta is a Full-Stack Developer and Software Engineer pursuing a B.Tech in Electronics & Communication Engineering at Birla Institute of Technology (BIT), Mesra (Class of 2028) with an 8.18 CGPA.',
    detailedAnswer: [
      'Yash is an engineering undergraduate at BIT Mesra who combines strong computer science foundations (Data Structures & Algorithms, Systems Architecture) with modern full-stack web engineering.',
      'He scored in the 97.2 percentile in JEE Main and has solved over 300 algorithmic problems on LeetCode across Dynamic Programming, Graphs, and Trees.',
      'His development work focuses on building resilient web applications, role-isolated marketplace platforms, deterministic generative AI workflows, and smooth 60fps editorial user interfaces.',
    ],
    keywords: [
      'Yash Gupta',
      'BIT Mesra',
      'Full-Stack Developer',
      'Software Engineer',
      'B.Tech ECE',
      'LeetCode',
    ],
  },
  {
    id: 'flagship-projects',
    index: '02',
    category: 'FLAGSHIP PROJECTS',
    question: 'What are Yash Gupta’s notable projects and hackathon wins?',
    shortAnswer:
      'Notable builds include InterviewIQ (1st Place Winner at SDS Hackathon), HirePoint (role-based talent marketplace), Interview Prep Planner (GenAI resume analyzer), and the official Value Education Cell platform at BIT Mesra.',
    detailedAnswer: [
      'InterviewIQ (1st Place · SDS Hack & Forge 2026): An AI-driven technical screening platform featuring real-time biometric and browser integrity telemetry (focus tracking, multi-face webcam detection, clipboard interception) and automated candidate scoring dossiers.',
      'HirePoint: A multi-role hiring marketplace built with React, Supabase PostgreSQL, and Clerk authentication, enforcing strict role-based access control (RBAC) and profile verification pipelines.',
      'Interview Prep Planner: A full-stack career prep engine that extracts resume text against job specifications, enforces strict Zod schema validation over Google Gemini API responses, and generates deterministic day-wise preparation roadmaps.',
      'Value Education Cell — BIT Mesra: The official institutional web platform engineered from scratch using Next.js, TypeScript, Tailwind CSS, and GSAP scroll choreography.',
    ],
    keywords: [
      'InterviewIQ',
      'HirePoint',
      'Interview Prep Planner',
      'Value Education Cell',
      'Hackathon Winner',
      'SDS Hack & Forge',
    ],
  },
  {
    id: 'technical-stack',
    index: '03',
    category: 'TECHNICAL CAPABILITIES',
    question: 'What technologies, languages, and frameworks does Yash Gupta specialize in?',
    shortAnswer:
      'Yash specializes in React, Next.js, TypeScript, Node.js, Express, PostgreSQL, MongoDB, Supabase, Google Gemini API, GSAP, and C++ for algorithms.',
    detailedAnswer: [
      'Frontend Architecture: React, Next.js, TypeScript, JavaScript (ES6+), Tailwind CSS, GSAP, Framer Motion, HTML5, CSS3, and Redux Toolkit.',
      'Backend & Databases: Node.js, Express.js, PostgreSQL (with row-level isolation), MongoDB, Supabase, RESTful API design, JWT, Clerk Auth, and Zod schema validation.',
      'Core & Embedded: C, C++, Python, Data Structures & Algorithms (300+ LeetCode problems), Object-Oriented Programming, ESP32, and Arduino.',
      'AI & Developer Tooling: Google Gemini API integration, Git/GitHub, Docker, Postman, Figma (UI/UX prototyping), and Vercel/Render CI/CD.',
    ],
    keywords: [
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'Supabase',
      'Gemini API',
      'GSAP',
      'Tailwind CSS',
    ],
  },
  {
    id: 'academic-credentials',
    index: '04',
    category: 'EDUCATION & ACADEMICS',
    question: 'What is Yash Gupta’s educational background and academic standing?',
    shortAnswer:
      'Yash is pursuing B.Tech in Electronics and Communication Engineering at Birla Institute of Technology, Mesra (2024–2028) with an 8.18 CGPA.',
    detailedAnswer: [
      'Undergraduate Degree: Bachelor of Technology (B.Tech) in Electronics & Communication Engineering at Birla Institute of Technology (BIT), Mesra, Ranchi, India.',
      'Academic Record: 8.18 CGPA through the 4th semester.',
      'Competitive Exam Ranks: 97.2 Percentile in JEE Main and All India Rank ~25K in JEE Advanced.',
      'Campus Leadership: Web Developer for the Value Education Cell & Vivekananda Study Circle at BIT Mesra.',
    ],
    keywords: [
      'BIT Mesra',
      'Electronics and Communication Engineering',
      'CGPA 8.18',
      'JEE Main 97.2',
      'JEE Advanced',
    ],
  },
  {
    id: 'career-availability',
    index: '05',
    category: 'OPPORTUNITIES & ROLES',
    question: 'Is Yash Gupta available for internships, software engineering roles, or freelance work?',
    shortAnswer:
      'Yes. Yash is actively open to Software Engineering Internships, Full-Stack Developer roles, and high-impact web architecture collaborations.',
    detailedAnswer: [
      'Yash is available for software engineering internships (Summer / Off-Campus), full-stack contractor roles, and engineering collaborations.',
      'He brings proven experience shipping production web applications, architecting RESTful services, integrating generative AI APIs with schema guarantees, and collaborating in team environments.',
      'Inquiries can be sent directly to yashvinodgupta6@gmail.com.',
    ],
    keywords: [
      'Internship',
      'Software Engineer Hiring',
      'Full-Stack Developer Roles',
      'Hire Yash Gupta',
      'Job Opportunities',
    ],
  },
  {
    id: 'profiles-verification',
    index: '06',
    category: 'VERIFIED PROFILES',
    question: 'Where can I inspect Yash Gupta’s source code, verified profiles, and live applications?',
    shortAnswer:
      'All source code and live platforms are publicly verifiable on GitHub (@Yash122005), LinkedIn, LeetCode (@Yash_Gupta1206), and his official portfolio (yashgupta.website).',
    detailedAnswer: [
      'GitHub: https://github.com/Yash122005 — 30+ public repositories featuring full-stack applications, API specifications, and open-source contributions.',
      'LinkedIn: https://www.linkedin.com/in/yash-gupta-8a8594283/ — Verified professional background, hackathon recognitions, and updates.',
      'LeetCode: https://leetcode.com/u/Yash_Gupta1206/ — Public record of 300+ solved data structures and algorithmic challenges.',
      'Official Portfolio: https://yashgupta.website/ — Live case studies, architecture schematics, and interactive project demos.',
    ],
    keywords: [
      'GitHub Yash122005',
      'LinkedIn Yash Gupta',
      'LeetCode Yash_Gupta1206',
      'yashgupta.website',
    ],
  },
];
