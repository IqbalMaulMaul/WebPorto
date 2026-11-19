import type { Technology, Experience, SocialLink } from '../types';

export const INITIAL_TECHNOLOGIES: Technology[] = [
  { id: '1', name: 'React', category: 'Frontend', description: 'Modern UI library dengan Hooks, Context API & Component Driven Design', sort_order: 1 },
  { id: '2', name: 'TypeScript', category: 'Frontend', description: 'Typed JavaScript untuk kontrak data yang handal dan aplikasi enterprise', sort_order: 2 },
  { id: '3', name: 'Three.js', category: 'Frontend', description: 'WebGL 3D rendering library, custom shaders, lights & scene graphs', sort_order: 3 },
  { id: '4', name: 'GSAP', category: 'Frontend', description: 'GreenSock Animation Platform, ScrollTrigger, dan timeline choreography', sort_order: 4 },
  { id: '5', name: 'Tailwind CSS', category: 'Frontend', description: 'Utility-first CSS framework untuk rapid futuristic UI styling', sort_order: 5 },
  { id: '6', name: 'HTML5 / CSS3', category: 'Frontend', description: 'Semantic structure, CSS Grid/Flexbox, dynamic animations', sort_order: 6 },
  { id: '7', name: 'Node.js / Express', category: 'Backend', description: 'Asynchronous JavaScript runtime & REST API architecture', sort_order: 7 },
  { id: '8', name: 'Supabase', category: 'Backend', description: 'Open-source Firebase alternative dengan PostgreSQL, RLS & Auth', sort_order: 8 },
  { id: '9', name: 'Laravel', category: 'Backend', description: 'PHP MVC framework untuk backend APIs & MVC systems', sort_order: 9 },
  { id: '10', name: 'PostgreSQL', category: 'Backend', description: 'Relational database system dengan complex query optimization', sort_order: 10 },
  { id: '11', name: 'Git & GitHub', category: 'Tools', description: 'Version control, branching workflows, PR previews & CI/CD', sort_order: 11 },
  { id: '12', name: 'Figma', category: 'Design', description: 'UI/UX prototyping, design systems & high-fidelity wireframing', sort_order: 12 },
  { id: '13', name: 'Vercel', category: 'Tools', description: 'Edge deployment platform dengan continuous integration & preview URLs', sort_order: 13 },
];

export { GITHUB_PROJECTS as INITIAL_PROJECTS } from './projectCatalog';

export const INITIAL_EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    title: 'S1 Teknik Informatika (Informatics Engineering Student)',
    organization: 'Perguruan Tinggi / Universitas',
    period_start: '2022',
    period_end: 'Sekarang',
    description: 'Fokus pada pengembangan perangkat lunak, algoritma & struktur data, arsitektur web modern, Grafika Komputer (Computer Graphics / 3D Web Rendering), serta sistem basis data terdistribusi.',
    type: 'education',
    sort_order: 1,
    visible: true
  },
  {
    id: 'exp-2',
    title: 'Frontend Developer & 3D Interactive Specialist',
    organization: 'Freelance & Open Source Projects',
    period_start: '2024',
    period_end: 'Sekarang',
    description: 'Mengembangkan aplikasi web modern berbasis React, Three.js, GSAP, dan Tailwind CSS. Berfokus pada micro-interactions, responsive WebGL, dan integrasi backend Supabase.',
    type: 'freelance',
    sort_order: 2,
    visible: true
  },
  {
    id: 'exp-3',
    title: 'Frontend Engineering Intern',
    organization: 'Tech Innovation Studio',
    period_start: '2024',
    period_end: '2025',
    description: 'Berkolaborasi dengan tim UI/UX dan backend developer untuk membangun dashboard interaktif, mengoptimalkan skor Lighthouse hingga 95+, dan mengimplementasikan state management yang scalable.',
    type: 'internship',
    sort_order: 3,
    visible: true
  },
  {
    id: 'exp-4',
    title: 'Koordinator Divisi Software Development',
    organization: 'Himpunan Mahasiswa / Student Computer Society',
    period_start: '2023',
    period_end: '2024',
    description: 'Memimpin pelatihan web development untuk mahasiswa, mengkoordinasi workshop UI/UX & WebGL, dan mengelola repository proyek kelompok.',
    type: 'organization',
    sort_order: 4,
    visible: true
  }
];

export const INITIAL_SOCIALS: SocialLink[] = [
  { id: 'soc-1', platform: 'GitHub', label: 'github.com/iqbalmaulanadhiti', url: 'https://github.com/iqbalmaulanadhiti', icon: 'Github', sort_order: 1, visible: true },
  { id: 'soc-2', platform: 'LinkedIn', label: 'linkedin.com/in/iqbalmaulanadhiti', url: 'https://linkedin.com/in/iqbalmaulanadhiti', icon: 'Linkedin', sort_order: 2, visible: true },
  { id: 'soc-3', platform: 'Email', label: 'iqbal.maulana.dhiti@gmail.com', url: 'mailto:iqbal.maulana.dhiti@gmail.com', icon: 'Mail', sort_order: 3, visible: true },
  { id: 'soc-4', platform: 'Instagram', label: '@iqbalmaulanadhiti', url: 'https://instagram.com', icon: 'Instagram', sort_order: 4, visible: true },
];
