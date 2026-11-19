import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../../types';
import { getProjects } from '../../lib/supabase';
import { INITIAL_PROJECTS } from '../../lib/mockData';
import { ProjectLinks } from '../projects/ProjectLinks';
import { imageSrcSet } from '../../lib/images';
import { ProjectDetailModal } from '../projects/ProjectDetailModal';

export const FeaturedProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let active = true;
    getProjects().then(data => {
      if (active) setProjects(data.filter(project => project.status === 'published'));
    }).catch(() => { if (active) { setProjects(INITIAL_PROJECTS.filter(project => project.status === 'published')); setFailed(true); } }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  return (
    <section id="projects" className="page-section projects-section" aria-labelledby="projects-title">
      <div className="wrap">
        <div className="section-heading heading-row"><div><span className="section-index">03 / Projects</span><h2 id="projects-title">Selected work.</h2></div><span className="project-total">{String(projects.length).padStart(2, '0')} projects</span></div>
        {loading ? <div className="projects-loading" role="status">Loading projects…</div> : projects.length ? <div className="project-grid">
          {projects.map((project, index) => <article key={project.id} className="card work-card">
            <div className="work-surface">
            <button className="work-image m-zoom" onClick={() => setActiveProject(project)} aria-label={`View ${project.title}`}><img src={project.cover_image} srcSet={imageSrcSet(project.cover_image)} sizes="(max-width: 639px) calc(100vw - 72px), (max-width: 1023px) calc((100vw - 104px) / 2), 680px" alt={project.title} loading="lazy" decoding="async" width="900" height="600" /></button>
            <div className="work-meta"><span>0{index + 1} / {project.role}</span><span>{project.period}</span></div>
            <h3><button onClick={() => setActiveProject(project)}>{project.title}</button></h3>
            <p>{project.summary}</p>
            <div className="tag-list">{project.technologies?.map(technology => <span key={technology.id}>{technology.name}</span>)}</div>
            <ProjectLinks project={project} />
            </div>
            <button className="work-open" onClick={() => setActiveProject(project)} aria-label={`Open details for ${project.title}`}><ArrowUpRight size={30} aria-hidden="true" /></button>
          </article>)}
        </div> : <p className="projects-loading" role="status">{failed ? 'Projects could not be loaded. Please refresh to try again.' : 'No published projects yet.'}</p>}
      </div>
      {activeProject && <ProjectDetailModal key={activeProject.id} project={activeProject} onClose={() => setActiveProject(null)} />}
    </section>
  );
};

