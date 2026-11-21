import { createClient } from '@supabase/supabase-js';
import type { Project, Technology, Experience, SocialLink, ContactMessage } from '../types';
import { INITIAL_PROJECTS, INITIAL_TECHNOLOGIES, INITIAL_EXPERIENCES, INITIAL_SOCIALS } from './mockData';
import { GITHUB_PROJECTS, refreshProjectCatalog } from './projectCatalog';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const getProjects = async (): Promise<Project[]> => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*, project_technologies(technology:technologies(*))')
        .order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) {
        const projects = data as unknown as (Project & { project_technologies: { technology: Technology | null }[] })[];
        return refreshProjectCatalog(projects.map(({ project_technologies, ...project }) => {
          const linked = project_technologies.map(link => link.technology).filter((technology): technology is Technology => technology !== null);
          // Existing catalog projects may be seeded before their technology relations.
          const technologies = linked.length ? linked : GITHUB_PROJECTS.find(item => item.slug === project.slug)?.technologies ?? [];
          return { ...project, technologies };
        }));
      }
    } catch (e) {
      console.warn('Supabase fetch failed, loading local projects fallback.', e);
    }
  }
  const local = localStorage.getItem('imd_projects');
  if (local) {
    try {
      const records = JSON.parse(local);
      if (Array.isArray(records)) return refreshProjectCatalog(records);
    } catch {}
  }
  return INITIAL_PROJECTS;
};

export const getProjectBySlug = async (slug: string): Promise<Project | null> => {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) || null;
};

export const getTechnologies = async (): Promise<Technology[]> => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('technologies')
        .select('*')
        .order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data as Technology[];
    } catch (e) {
      console.warn('Supabase fetch failed, loading local tech fallback.', e);
    }
  }
  const local = localStorage.getItem('imd_technologies');
  if (local) {
    try { return JSON.parse(local); } catch {}
  }
  return INITIAL_TECHNOLOGIES;
};

export const getExperiences = async (): Promise<Experience[]> => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data as Experience[];
    } catch (e) {
      console.warn('Supabase fetch failed, loading local experiences fallback.', e);
    }
  }
  const local = localStorage.getItem('imd_experiences');
  if (local) {
    try { return JSON.parse(local); } catch {}
  }
  return INITIAL_EXPERIENCES;
};

export const getSocialLinks = async (): Promise<SocialLink[]> => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('social_links')
        .select('*')
        .order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data as SocialLink[];
    } catch (e) {
      console.warn('Supabase fetch failed, loading local socials fallback.', e);
    }
  }
  return INITIAL_SOCIALS;
};

export const submitContactMessage = async (msg: ContactMessage): Promise<{ success: boolean; message: string }> => {
  if (supabase) {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([{ name: msg.name, email: msg.email, message: msg.message, status: 'unread' }]);
      if (error) throw error;
      return { success: true, message: 'Pesan Anda telah terkirim melalui Supabase backend!' };
    } catch (err: unknown) {
      console.error('Contact submission error:', err);
    }
  }

  const existingMsgs = JSON.parse(localStorage.getItem('imd_contact_messages') || '[]');
  existingMsgs.push({ ...msg, id: Date.now().toString(), created_at: new Date().toISOString(), status: 'unread' });
  localStorage.setItem('imd_contact_messages', JSON.stringify(existingMsgs));

  return { success: true, message: 'Pesan Anda berhasil diterima dan disimpan (Mode Lokal/Fallback)!' };
};
