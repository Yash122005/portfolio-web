export interface SocialLinkItem {
  id: string;
  label: string;
  handle: string;
  url: string;
  description: string;
}

export const OWNER_PROFILE = {
  name: 'Yash Gupta',
  firstName: 'Yash',
  lastName: 'Gupta',
  role: 'Full-Stack Developer & Software Engineer',
  institution: 'B.Tech ECE @ BIT Mesra (2024–2028)',
  location: 'India · BIT Mesra, Ranchi / Azamgarh',
  email: 'yashvinodgupta6@gmail.com',
  tagline: 'I build thoughtful digital experiences and explore technology through code.',
  heroTopLeft: 'ENGINEER. BUILDER. DEVELOPER.',
  heroTopRight: 'BASED IN INDIA · BUILDING FOR THE WEB',
  heroSideIndex: '01 / PRESENCE',
  heroSideThemes: ['FULL-STACK ARCHITECTURE', 'AI-DRIVEN SYSTEMS', 'CREATIVE ENGINEERING'],
  defaultPortraitPath: '/images/yash-portrait.webp',
  fallbackPortraitPath: '/images/yash-portrait.png',
  resumeUrl: 'https://drive.google.com/file/d/1WZaYpbm0SQVhPN-S4k4ihizEh8WqHaxi/view?usp=sharing',
  existingPortfolioUrl: 'https://yashgupta.website/',
};

export const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    id: 'github',
    label: 'GitHub',
    handle: '@Yash122005',
    url: 'https://github.com/Yash122005',
    description: 'Source code, full-stack repositories & commit history',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'yash-gupta-8a8594283',
    url: 'https://www.linkedin.com/in/yash-gupta-8a8594283/',
    description: 'Professional network, hackathons & academic updates',
  },
  {
    id: 'leetcode',
    label: 'LeetCode',
    handle: '@Yash_Gupta1206',
    url: 'https://leetcode.com/u/Yash_Gupta1206/',
    description: '300+ solved problems across Dynamic Programming, Graphs & Trees',
  },
  {
    id: 'resume',
    label: 'Curriculum Vitae',
    handle: 'PDF Dossier',
    url: 'https://drive.google.com/file/d/1WZaYpbm0SQVhPN-S4k4ihizEh8WqHaxi/view?usp=sharing',
    description: 'Verified education, engineering experience & technical stack',
  },
];
