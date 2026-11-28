import type { Project, Technology } from '../types';

const tech = (name: string, category: Technology['category'] = 'Frontend'): Technology => ({
  id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), name, category, sort_order: 0,
});

// Verified against GitHub and public demos; Celopix added on 28 November 2026.
// Private repository contents and GitHub credentials are never sent to the browser.
export const GITHUB_PROJECTS: Project[] = [
  {
    id: 'github-celopix', slug: 'celopix', title: 'Celopix — Online Photobooth',
    summary: 'Photobooth online untuk mengambil foto, memilih frame, menambahkan filter dan stiker, lalu menyimpan hasilnya.',
    description: 'Celopix menghadirkan pengalaman photobooth langsung di browser tanpa instalasi aplikasi. Pengunjung dapat memilih frame, mengambil foto, menambahkan filter dan stiker, serta menyimpan dan membagikan hasilnya. Dibangun menggunakan Next.js, React, TypeScript, Tailwind CSS, dan Supabase.',
    role: 'Project collaboration', period: '2026', featured: true, status: 'published', sort_order: 0,
    demo_url: 'https://celopix.id/', repository_visibility: 'private',
    cover_image: '/images/projects/celopix.png',
    screenshots: ['/images/projects/celopix.png'],
    technologies: [tech('Next.js'), tech('TypeScript'), tech('React'), tech('Tailwind CSS'), tech('Supabase', 'Backend')],
    created_at: '2026-04-09',
  },
  {
    id: 'github-jualin', slug: 'jualin-shopee-automation', title: 'Jualin — Shopee Automation',
    summary: 'Ekstraksi katalog JakMall, pengaturan margin, dan penyiapan listing Shopee dalam satu alur.',
    description: 'Proof of concept untuk mengolah katalog produk: ekstraksi data, normalisasi, pengaturan margin, review di staging area, dan pembuatan Excel Shopee Mass Upload. Demo membuka antarmuka aplikasi; integrasi seller dan proses otomatisasi bergantung pada konfigurasi layanan.',
    role: 'Web development', period: '2026', featured: true, status: 'published', sort_order: 1,
    demo_url: 'https://automatisasi-shopee-seller.vercel.app',
    github_url: 'https://github.com/IqbalMaulMaul/AutomatisasiShopeeSeller', repository_visibility: 'public',
    cover_image: '/images/projects/jualin.webp',
    technologies: [tech('Next.js'), tech('TypeScript'), tech('React'), tech('Supabase', 'Backend')],
    created_at: '2026-09-02',
  },
  {
    id: 'github-buku-tamu', slug: 'buku-tamu-desa-glapan', title: 'Buku Tamu Digital',
    summary: 'Pencatatan kunjungan Desa Glapan melalui formulir digital, foto selfie, dan panel administrasi.',
    description: 'Aplikasi buku tamu untuk Pemerintah Desa Glapan. Halaman publik menyediakan formulir identitas dan keperluan kunjungan, dengan pengambilan foto selfie. Dibangun menggunakan Next.js, TypeScript, Tailwind CSS, dan Supabase.',
    role: 'Web development', period: '2026', featured: true, status: 'published', sort_order: 2,
    demo_url: 'https://buku-tamu-snowy.vercel.app',
    github_url: 'https://github.com/IqbalMaulMaul/BukuTamu', repository_visibility: 'public',
    cover_image: '/images/projects/buku-tamu.webp',
    technologies: [tech('Next.js'), tech('TypeScript'), tech('Tailwind CSS'), tech('Supabase', 'Backend')],
    created_at: '2026-08-20',
  },
  {
    id: 'github-pertamina', slug: 'pertamina-supply-chain', title: 'Pertamina Supply Chain',
    summary: 'Proyek simulator supply chain dengan antarmuka React dan layanan berbasis .NET.',
    description: 'Proyek simulator supply chain pada repository itppn/pertamina-supply-chain-fe. Antarmukanya menggunakan React dan React Flow, dengan layanan berbasis .NET. Repository bersifat private dan tidak menyediakan demo publik.',
    role: 'Project collaboration', period: '2026', featured: true, status: 'published', sort_order: 3,
    repository_visibility: 'private',
    cover_image: '/images/projects/pertamina.png',
    technologies: [tech('React'), tech('React Flow'), tech('.NET', 'Backend')],
    created_at: '2026-07-02',
  },
  {
    id: 'github-capstone', slug: 'capstone-2', title: 'Capstone 2.0',
    summary: 'Sistem pemesanan dengan panel admin, alur dapur real-time, dan aplikasi mobile.',
    description: 'Proyek kelompok dengan backend Laravel, panel administrasi web, alur pemesanan pelanggan, dan tampilan dapur real-time melalui Laravel Reverb. Repository juga mencakup aplikasi mobile. Deployment yang tercantum di GitHub sedang dijeda; kode sumber tetap dapat dilihat.',
    role: 'Team project', period: '2026', featured: true, status: 'published', sort_order: 4,
    demo_note: 'Demo temporarily unavailable',
    github_url: 'https://github.com/IqbalMaulMaul/Capstone2.0', repository_visibility: 'public',
    cover_image: '/images/projects/capstone-dashboard.png',
    screenshots: ['/images/projects/capstone-dashboard.png', '/images/projects/capstone-orders.png', '/images/projects/capstone-kitchen.png'],
    technologies: [tech('Laravel', 'Backend'), tech('PHP', 'Backend'), tech('Tailwind CSS'), tech('Flutter')],
    created_at: '2026-06-15',
  },
  {
    id: 'github-neuroscan', slug: 'neuroscan-ai', title: 'NeuroScan AI',
    summary: 'Proyek visi komputer untuk klasifikasi citra MRI dengan CNN dan explainable AI.',
    description: 'Proyek perkuliahan Visi Komputer yang mengeksplorasi klasifikasi citra MRI menggunakan CNN, beserta visualisasi Grad-CAM++ dan SHAP. Aplikasi menggunakan Python, Flask, dan TensorFlow. Proyek akademik ini belum memiliki demo publik.',
    role: 'Computer vision coursework', period: '2026', featured: true, status: 'published', sort_order: 5,
    github_url: 'https://github.com/IqbalMaulMaul/brain-tumor-cnn', repository_visibility: 'public',
    cover_image: '/images/projects/neuroscan.png',
    screenshots: ['/images/projects/neuroscan.png'],
    technologies: [tech('Python', 'Backend'), tech('TensorFlow', 'Core'), tech('Flask', 'Backend')],
    created_at: '2026-01-26',
  },
  {
    id: 'github-lima-waktu', slug: 'lima-waktu-pos', title: 'LimaWaktu — Tablet POS',
    summary: 'Aplikasi point of sale untuk pengelolaan menu, transaksi, dan riwayat penjualan.',
    description: 'Aplikasi Tablet POS dengan frontend React dan Vite yang terhubung ke API Laravel. Struktur proyek mencakup dashboard, pengelolaan menu, transaksi, struk, dan riwayat penjualan. Belum ada URL demo publik yang tercantum di repository.',
    role: 'Web development', period: '2026', featured: true, status: 'published', sort_order: 6,
    github_url: 'https://github.com/IqbalMaulMaul/LimaWaktu', repository_visibility: 'public',
    cover_image: '/images/projects/lima-waktu-menu.png',
    screenshots: ['/images/projects/lima-waktu-menu.png', '/images/projects/lima-waktu-checkout.png', '/images/projects/lima-waktu-orders.png'],
    technologies: [tech('React'), tech('JavaScript'), tech('Vite', 'Tools'), tech('Laravel', 'Backend')],
    created_at: '2026-01-19',
  },
];

const legacySlugs = new Set(['nexus-3d-dashboard', 'cyber-portfolio-3d', 'synapse-ai-web-app', 'lumina-e-commerce-3d']);

/** Refresh old starter records without deleting custom projects or overriding CMS edits. */
export function refreshProjectCatalog(records: Project[]): Project[] {
  const hasLegacy = records.some(project => legacySlugs.has(project.slug));
  if (!hasLegacy && !records.some(project => GITHUB_PROJECTS.some(item => item.id === project.id || item.slug === project.slug))) return records;
  const saved = records.filter(project => !legacySlugs.has(project.slug));
  // Add the newly published project to existing catalogs without restoring deleted older entries.
  const additions = GITHUB_PROJECTS.filter(project => (hasLegacy || project.slug === 'celopix') && !saved.some(item => item.id === project.id || item.slug === project.slug));
  if (!hasLegacy && !additions.length) return records;
  return [...saved, ...additions]
    .sort((a, b) => a.sort_order - b.sort_order);
}
