import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../../types';
import { imageSrcSet } from '../../lib/images';
import { ProjectLinks } from './ProjectLinks';

export const ProjectDetailModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [image, setImage] = useState(project.screenshots?.[0] ?? project.cover_image);
  useEffect(() => {
    const dialog = dialogRef.current;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog?.showModal();
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      queueMicrotask(() => { if (opener?.isConnected) opener.focus({ preventScroll: true }); });
    };
  }, []);
  return (
    <dialog ref={dialogRef} className="project-dialog" aria-labelledby="project-dialog-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="dialog-content">
        <header className="dialog-header"><div><span className="section-index">{project.role}</span><h2 id="project-dialog-title">{project.title}</h2></div><button className="icon-button" aria-label="Close project details" onClick={onClose}><X size={22} /></button></header>
        <div className="dialog-body">
          <img className="detail-cover" src={image} srcSet={imageSrcSet(image)} sizes="(max-width: 639px) calc(100vw - 80px), (max-width: 960px) calc(100vw - 96px), 896px" alt={project.title} width="1200" height="675" />
          {project.screenshots && project.screenshots.length > 1 && <div className="gallery-thumbnails">{project.screenshots.map((source, index) => <button key={source} aria-label={`View screenshot ${index + 1}`} aria-pressed={image === source} onClick={() => setImage(source)}><img src={source} alt="" /></button>)}</div>}
          <dl className="project-facts"><div><dt>Role</dt><dd>{project.role}</dd></div><div><dt>Period</dt><dd>{project.period}</dd></div><div><dt>Status</dt><dd>{project.status}</dd></div></dl>
          <p className="project-summary">{project.summary}</p><p className="project-description">{project.description}</p>
          <div className="tag-list">{project.technologies?.map(technology => <span key={technology.id}>{technology.name}</span>)}</div>
          <div className="detail-actions">
            <ProjectLinks project={project} />
            <Link className="link" to={`/projects/${project.slug}`} onClick={onClose}>Project page <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
    </dialog>
  );
};

