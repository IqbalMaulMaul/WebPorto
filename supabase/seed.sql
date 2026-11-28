-- ===================================================
-- Supabase Seed Data for 3D Portfolio Iqbal Maulana Dhiti
-- Jalankan file ini di Supabase SQL Editor setelah menjalankan schema.sql
-- ===================================================

-- 1. Seed Technologies
INSERT INTO public.technologies (name, category, description, sort_order) VALUES
('React', 'Frontend', 'Modern UI library dengan Hooks, Context API & Component Driven Design', 1),
('TypeScript', 'Frontend', 'Typed JavaScript untuk kontrak data yang handal dan aplikasi enterprise', 2),
('Three.js', 'Frontend', 'WebGL 3D rendering library, custom shaders, lights & scene graphs', 3),
('GSAP', 'Frontend', 'GreenSock Animation Platform, ScrollTrigger, dan timeline choreography', 4),
('Tailwind CSS', 'Frontend', 'Utility-first CSS framework untuk rapid futuristic UI styling', 5),
('HTML5 / CSS3', 'Frontend', 'Semantic structure, CSS Grid/Flexbox, dynamic animations', 6),
('Node.js / Express', 'Backend', 'Asynchronous JavaScript runtime & REST API architecture', 7),
('Supabase', 'Backend', 'Open-source Firebase alternative dengan PostgreSQL, RLS & Auth', 8),
('Laravel', 'Backend', 'PHP MVC framework untuk backend APIs & MVC systems', 9),
('PostgreSQL', 'Backend', 'Relational database system dengan complex query optimization', 10),
('Git & GitHub', 'Tools', 'Version control, branching workflows, PR previews & CI/CD', 11),
('Figma', 'Design', 'UI/UX prototyping, design systems & high-fidelity wireframing', 12),
('Vercel', 'Tools', 'Edge deployment platform dengan continuous integration & preview URLs', 13)
ON CONFLICT DO NOTHING;

-- 2. Seed Projects
INSERT INTO public.projects (slug, title, summary, description, role, period, featured, status, demo_url, github_url, repository_visibility, demo_note, cover_image, screenshots, sort_order) VALUES
(
  'jualin-shopee-automation',
  'Jualin — Shopee Automation',
  'Ekstraksi katalog JakMall, pengaturan margin, dan penyiapan listing Shopee dalam satu alur.',
  'Proof of concept untuk mengolah katalog produk: ekstraksi data, normalisasi, pengaturan margin, review di staging area, dan pembuatan Excel Shopee Mass Upload. Demo membuka antarmuka aplikasi; integrasi seller dan proses otomatisasi bergantung pada konfigurasi layanan.',
  'Web development',
  '2026',
  true,
  'published',
  'https://automatisasi-shopee-seller.vercel.app',
  'https://github.com/IqbalMaulMaul/AutomatisasiShopeeSeller',
  'public',
  NULL,
  '/images/projects/jualin.webp',
  '{}',
  1
),
(
  'buku-tamu-desa-glapan',
  'Buku Tamu Digital',
  'Pencatatan kunjungan Desa Glapan melalui formulir digital, foto selfie, dan panel administrasi.',
  'Aplikasi buku tamu untuk Pemerintah Desa Glapan. Halaman publik menyediakan formulir identitas dan keperluan kunjungan, dengan pengambilan foto selfie. Dibangun menggunakan Next.js, TypeScript, Tailwind CSS, dan Supabase.',
  'Web development',
  '2026',
  true,
  'published',
  'https://buku-tamu-snowy.vercel.app',
  'https://github.com/IqbalMaulMaul/BukuTamu',
  'public',
  NULL,
  '/images/projects/buku-tamu.webp',
  '{}',
  2
),
(
  'pertamina-supply-chain',
  'Pertamina Supply Chain',
  'Proyek simulator supply chain dengan antarmuka React dan layanan berbasis .NET.',
  'Proyek simulator supply chain pada repository itppn/pertamina-supply-chain-fe. Antarmukanya menggunakan React dan React Flow, dengan layanan berbasis .NET. Repository bersifat private dan tidak menyediakan demo publik.',
  'Project collaboration',
  '2026',
  true,
  'published',
  NULL,
  NULL,
  'private',
  NULL,
  '/images/projects/pertamina.png',
  '{}',
  3
),
(
  'capstone-2',
  'Capstone 2.0',
  'Sistem pemesanan dengan panel admin, alur dapur real-time, dan aplikasi mobile.',
  'Proyek kelompok dengan backend Laravel, panel administrasi web, alur pemesanan pelanggan, dan tampilan dapur real-time melalui Laravel Reverb. Repository juga mencakup aplikasi mobile. Deployment yang tercantum di GitHub sedang dijeda; kode sumber tetap dapat dilihat.',
  'Team project',
  '2026',
  true,
  'published',
  NULL,
  'https://github.com/IqbalMaulMaul/Capstone2.0',
  'public',
  'Demo temporarily unavailable',
  '/images/projects/capstone-dashboard.png',
  '{"/images/projects/capstone-dashboard.png", "/images/projects/capstone-orders.png", "/images/projects/capstone-kitchen.png"}',
  4
),
(
  'neuroscan-ai',
  'NeuroScan AI',
  'Proyek visi komputer untuk klasifikasi citra MRI dengan CNN dan explainable AI.',
  'Proyek perkuliahan Visi Komputer yang mengeksplorasi klasifikasi citra MRI menggunakan CNN, beserta visualisasi Grad-CAM++ dan SHAP. Aplikasi menggunakan Python, Flask, dan TensorFlow. Proyek akademik ini belum memiliki demo publik.',
  'Computer vision coursework',
  '2026',
  true,
  'published',
  NULL,
  'https://github.com/IqbalMaulMaul/brain-tumor-cnn',
  'public',
  NULL,
  '/images/projects/neuroscan.png',
  '{"/images/projects/neuroscan.png"}',
  5
),
(
  'lima-waktu-pos',
  'LimaWaktu — Tablet POS',
  'Aplikasi point of sale untuk pengelolaan menu, transaksi, dan riwayat penjualan.',
  'Aplikasi Tablet POS dengan frontend React dan Vite yang terhubung ke API Laravel. Struktur proyek mencakup dashboard, pengelolaan menu, transaksi, struk, dan riwayat penjualan. Belum ada URL demo publik yang tercantum di repository.',
  'Web development',
  '2026',
  true,
  'published',
  NULL,
  'https://github.com/IqbalMaulMaul/LimaWaktu',
  'public',
  NULL,
  '/images/projects/lima-waktu-menu.png',
  '{"/images/projects/lima-waktu-menu.png", "/images/projects/lima-waktu-checkout.png", "/images/projects/lima-waktu-orders.png"}',
  6
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  summary = EXCLUDED.summary,
  description = EXCLUDED.description,
  role = EXCLUDED.role,
  period = EXCLUDED.period,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  demo_url = EXCLUDED.demo_url,
  github_url = EXCLUDED.github_url,
  repository_visibility = EXCLUDED.repository_visibility,
  demo_note = EXCLUDED.demo_note,
  cover_image = EXCLUDED.cover_image,
  screenshots = EXCLUDED.screenshots,
  sort_order = EXCLUDED.sort_order;

-- 3. Seed Experiences
INSERT INTO public.experiences (title, organization, period_start, period_end, description, type, sort_order, visible) VALUES
(
  'S1 Teknik Informatika (Informatics Engineering Student)',
  'Perguruan Tinggi / Universitas',
  '2022',
  'Sekarang',
  'Fokus pada pengembangan perangkat lunak, algoritma & struktur data, arsitektur web modern, Grafika Komputer (Computer Graphics / 3D Web Rendering), serta sistem basis data terdistribusi.',
  'education',
  1,
  true
),
(
  'Frontend Developer & 3D Interactive Specialist',
  'Freelance & Open Source Projects',
  '2024',
  'Sekarang',
  'Mengembangkan aplikasi web modern berbasis React, Three.js, GSAP, dan Tailwind CSS. Berfokus pada micro-interactions, responsive WebGL, dan integrasi backend Supabase.',
  'freelance',
  2,
  true
),
(
  'Frontend Engineering Intern',
  'Tech Innovation Studio',
  '2024',
  '2025',
  'Berkolaborasi dengan tim UI/UX dan backend developer untuk membangun dashboard interaktif, mengoptimalkan skor Lighthouse hingga 95+, dan mengimplementasikan state management yang scalable.',
  'internship',
  3,
  true
),
(
  'Koordinator Divisi Software Development',
  'Himpunan Mahasiswa / Student Computer Society',
  '2023',
  '2024',
  'Memimpin pelatihan web development untuk mahasiswa, mengkoordinasi workshop UI/UX & WebGL, dan mengelola repository proyek kelompok.',
  'organization',
  4,
  true
)
ON CONFLICT DO NOTHING;

-- 4. Seed Social Links
INSERT INTO public.social_links (platform, label, url, icon, sort_order, visible) VALUES
('GitHub', 'github.com/IqbalMaulMaul', 'https://github.com/IqbalMaulMaul', 'Github', 1, true),
('LinkedIn', 'linkedin.com/in/iqbal-maulana-dhiti-537a173b2', 'https://www.linkedin.com/in/iqbal-maulana-dhiti-537a173b2/', 'Linkedin', 2, true),
('Email', 'iqbalmaulanadhiti05@gmail.com', 'mailto:iqbalmaulanadhiti05@gmail.com', 'Mail', 3, true),
('Instagram', '@ibalmaumau', 'https://www.instagram.com/ibalmaumau/', 'Instagram', 4, true)
ON CONFLICT DO NOTHING;
