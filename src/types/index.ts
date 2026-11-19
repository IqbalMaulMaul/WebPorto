export interface Technology {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Design' | 'Tools' | 'Core';
  icon_url?: string;
  description?: string;
  sort_order: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  role: string;
  period: string;
  featured: boolean;
  status: 'published' | 'draft';
  demo_url?: string;
  github_url?: string;
  repository_visibility?: 'public' | 'private';
  demo_note?: string;
  cover_image: string;
  screenshots?: string[];
  sort_order: number;
  technologies?: Technology[];
  created_at?: string;
}

export interface Experience {
  id: string;
  title: string;
  organization: string;
  period_start: string;
  period_end: string;
  description: string;
  type: 'education' | 'internship' | 'freelance' | 'organization' | 'project';
  sort_order: number;
  visible: boolean;
}

export interface SocialLink {
  id: string;
  platform: string;
  label: string;
  url: string;
  icon?: string;
  sort_order: number;
  visible: boolean;
}

export interface SiteSetting {
  key: string;
  value: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  message: string;
  created_at?: string;
  status?: 'unread' | 'read' | 'archived';
}
