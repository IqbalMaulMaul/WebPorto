import React, { useState, useEffect } from 'react';
import { Shield, Plus, Trash2, CheckCircle2, RefreshCw, Eye, EyeOff } from 'lucide-react';
import type { Project, Technology, Experience } from '../../types';
import { getProjects, getTechnologies, getExperiences, isSupabaseConfigured } from '../../lib/supabase';

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'experiences'>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    loadAllData();
  }, []);

  async function loadAllData() {
    const p = await getProjects();
    const t = await getTechnologies();
    const e = await getExperiences();
    setProjects(p);
    setTechnologies(t);
    setExperiences(e);
  }

  const saveProjectsToStorage = (updated: Project[]) => {
    setProjects(updated);
    localStorage.setItem('imd_projects', JSON.stringify(updated));
    showNotice('Data proyek berhasil diperbarui di memori lokal/fallback!');
  };

  const saveExperiencesToStorage = (updated: Experience[]) => {
    setExperiences(updated);
    localStorage.setItem('imd_experiences', JSON.stringify(updated));
    showNotice('Data rekam jejak berhasil diperbarui!');
  };

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3000);
  };

  const toggleProjectStatus = (id: string) => {
    const updated = projects.map((p) =>
      p.id === id ? { ...p, status: (p.status === 'published' ? 'draft' : 'published') as Project['status'] } : p
    );
    saveProjectsToStorage(updated);
  };

  const toggleExperienceVisibility = (id: string) => {
    const updated = experiences.map((exp) =>
      exp.id === id ? { ...exp, visible: !exp.visible } : exp
    );
    saveExperiencesToStorage(updated);
  };

  const deleteProject = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus proyek ini?')) {
      const updated = projects.filter((p) => p.id !== id);
      saveProjectsToStorage(updated);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Admin Header */}
        <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-950/60 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-sans text-slate-100">Owner CMS Dashboard</h1>
              <p className="text-xs font-mono text-slate-400">
                Kelola data Portofolio Iqbal Maulana Dhiti ({isSupabaseConfigured ? 'Supabase Connected' : 'Local Fallback Mode'})
              </p>
            </div>
          </div>

          <button
            onClick={loadAllData}
            className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono flex items-center gap-2 hover:text-cyan-400"
          >
            <RefreshCw className="w-4 h-4" /> Refresh Data
          </button>
        </div>

        {notice && (
          <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{notice}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeTab === 'projects'
                ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'glass-panel text-slate-400 hover:text-cyan-400'
            }`}
          >
            Proyek ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeTab === 'skills'
                ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'glass-panel text-slate-400 hover:text-cyan-400'
            }`}
          >
            Teknologi ({technologies.length})
          </button>
          <button
            onClick={() => setActiveTab('experiences')}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeTab === 'experiences'
                ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'glass-panel text-slate-400 hover:text-cyan-400'
            }`}
          >
            Rekam Jejak ({experiences.length})
          </button>
        </div>

        {/* Tab Content: Projects */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold font-sans text-slate-100">Daftar Proyek</h2>
              <button
                onClick={() => alert('Fitur tambah proyek baru dapat dilakukan melalui Supabase Studio atau dengan mengedit mockData.ts!')}
                className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-mono text-xs flex items-center gap-1.5 hover:bg-cyan-500 hover:text-black transition-all"
              >
                <Plus className="w-4 h-4" /> Tambah Proyek
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img src={proj.cover_image} alt={proj.title} className="w-16 h-12 rounded-lg object-cover" />
                    <div>
                      <h3 className="text-sm font-bold font-sans text-slate-100">{proj.title}</h3>
                      <p className="text-xs font-mono text-slate-400">{proj.role} — {proj.period}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => toggleProjectStatus(proj.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1 border ${
                        proj.status === 'published'
                          ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400'
                          : 'bg-amber-950/40 border-amber-500/40 text-amber-400'
                      }`}
                    >
                      {proj.status === 'published' ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      <span className="capitalize">{proj.status}</span>
                    </button>

                    <button
                      onClick={() => deleteProject(proj.id)}
                      className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-rose-400 hover:border-rose-500/40"
                      title="Hapus Proyek"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content: Skills */}
        {activeTab === 'skills' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold font-sans text-slate-100">Katalog Teknologi</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {technologies.map((tech) => (
                <div key={tech.id} className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold font-sans text-slate-100">{tech.name}</h4>
                    <span className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                      {tech.category}
                    </span>
                  </div>
                  <p className="text-xs font-sans text-slate-400">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content: Experiences */}
        {activeTab === 'experiences' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold font-sans text-slate-100">Daftar Pengalaman</h2>
            <div className="space-y-3">
              {experiences.map((exp) => (
                <div key={exp.id} className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold font-sans text-slate-100">{exp.title}</h4>
                    <span className="text-xs font-mono text-purple-400">{exp.organization} ({exp.period_start} - {exp.period_end})</span>
                  </div>
                  <button
                    onClick={() => toggleExperienceVisibility(exp.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono border ${
                      exp.visible
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400'
                        : 'bg-slate-900 border-slate-800 text-slate-500'
                    }`}
                  >
                    {exp.visible ? 'Visible' : 'Hidden'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
