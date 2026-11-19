import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import type { Project } from '../../types';
import { getProjectBySlug } from '../../lib/supabase';
import { imageSrcSet } from '../../lib/images';
import { ProjectLinks } from '../../components/projects/ProjectLinks';

export const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [result, setResult] = useState<{ slug: string; project: Project | null } | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const loading = result?.slug !== slug;
  const project = loading ? null : result?.project;
  useEffect(() => {
    let active = true;
    if (slug) getProjectBySlug(slug).then(project => {
      if (active) { setResult({ slug, project }); setImage(null); }
    }).catch(() => { if (active) setResult({ slug, project: null }); });
    window.scrollTo({ top: 0, behavior: 'instant' });
    return () => { active = false; };
  }, [slug]);

  return (
    <div className="detail-page">
      <div className="wrap">
        <Link to="/#projects" className="link"><ArrowLeft size={18} aria-hidden="true" /> Back to projects</Link>
        {loading ? <p className="projects-loading" role="status">Memuat detail proyek...</p> : !project ? <><h1>Proyek Tidak Ditemukan</h1><p>URL proyek yang Anda tuju tidak tersedia.</p></> : <>
          <h1>{project.title}</h1><p className="project-summary">{project.summary}</p>
          <div className="detail-page-body">
            <img src={image ?? project.screenshots?.[0] ?? project.cover_image} srcSet={imageSrcSet(image ?? project.screenshots?.[0] ?? project.cover_image)} sizes="(max-width: 639px) calc(100vw - 48px), (max-width: 1056px) calc(100vw - 96px), 960px" alt={project.title} className="detail-cover" width="1200" height="675" />
            {project.screenshots && project.screenshots.length > 1 && <div className="gallery-thumbnails">{project.screenshots.map((source, index) => <button key={source} onClick={() => setImage(source)} aria-label={`View screenshot ${index + 1}`} aria-pressed={(image ?? project.screenshots?.[0]) === source}><img src={source} alt="" /></button>)}</div>}
            <dl className="project-facts"><div><dt>Role</dt><dd>{project.role}</dd></div><div><dt>Period</dt><dd>{project.period}</dd></div><div><dt>Status</dt><dd>{project.status}</dd></div></dl>
            <h2>About this project</h2><p className="project-description">{project.description}</p>
            <div className="tag-list">{project.technologies?.map(technology => <span key={technology.id}>{technology.name}</span>)}</div>
            <div className="detail-actions">
              <ProjectLinks project={project} />
            </div>
          </div>
        </>}
      </div>
    </div>
  );
};
