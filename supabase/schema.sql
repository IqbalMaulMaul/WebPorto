-- ===================================================
-- Supabase SQL Schema for 3D Portfolio Iqbal Maulana Dhiti
-- Based on PRD & SDD Section 8 & 9
-- ===================================================

-- 1. Technologies Table
CREATE TABLE IF NOT EXISTS public.technologies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Frontend', 'Backend', 'Design', 'Tools', 'Core')),
  icon_url TEXT,
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  role TEXT NOT NULL,
  period TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'draft')),
  demo_url TEXT,
  github_url TEXT,
  repository_visibility TEXT DEFAULT 'public',
  demo_note TEXT,
  cover_image TEXT NOT NULL,
  screenshots TEXT[] DEFAULT '{}',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Project Technologies (Junction Table)
CREATE TABLE IF NOT EXISTS public.project_technologies (
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  technology_id UUID REFERENCES public.technologies(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, technology_id)
);

-- 4. Experiences Table
CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  period_start TEXT NOT NULL,
  period_end TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('education', 'internship', 'freelance', 'organization', 'project')),
  sort_order INT DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Social Links Table
CREATE TABLE IF NOT EXISTS public.social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL,
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  sort_order INT DEFAULT 0,
  visible BOOLEAN DEFAULT true
);

-- 6. Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- 7. Contact Messages Table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) Policies
ALTER TABLE public.technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Public READ policies (for published records)
CREATE POLICY "Public technologies read access" ON public.technologies FOR SELECT USING (true);
CREATE POLICY "Public projects read access" ON public.projects FOR SELECT USING (status = 'published');
CREATE POLICY "Public project_technologies read access" ON public.project_technologies FOR SELECT USING (true);
CREATE POLICY "Public experiences read access" ON public.experiences FOR SELECT USING (visible = true);
CREATE POLICY "Public social_links read access" ON public.social_links FOR SELECT USING (visible = true);
CREATE POLICY "Public site_settings read access" ON public.site_settings FOR SELECT USING (true);

-- Contact messages INSERT policy for anonymous visitors
CREATE POLICY "Public can submit contact messages" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- Authenticated Admin full CRUD policies
CREATE POLICY "Admin full access projects" ON public.projects FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access technologies" ON public.technologies FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access project_technologies" ON public.project_technologies FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access experiences" ON public.experiences FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access social_links" ON public.social_links FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access site_settings" ON public.site_settings FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access contact_messages" ON public.contact_messages FOR ALL TO authenticated USING (true);
