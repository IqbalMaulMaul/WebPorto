import { ArrowUpRight, LockKeyhole } from 'lucide-react';
import type { Project } from '../../types';

export const ProjectLinks = ({ project, showSource = true }: { project: Project; showSource?: boolean }) => (
  <div className="project-links">
    {project.demo_url && <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="project-link project-link--demo" aria-label={`Live Demo: ${project.title} (opens in a new tab)`}>Live Demo <ArrowUpRight size={16} aria-hidden="true" /></a>}
    {showSource && project.github_url && project.repository_visibility !== 'private' && <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="project-link" aria-label={`GitHub: ${project.title} (opens in a new tab)`}>GitHub <ArrowUpRight size={16} aria-hidden="true" /></a>}
    {project.repository_visibility === 'private' ? <span className="project-access"><LockKeyhole size={13} aria-hidden="true" /> Private repository</span> : !project.demo_url && <span className="project-access">{project.demo_note || 'No public demo'}</span>}
  </div>
);
