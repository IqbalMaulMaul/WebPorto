import React, { useRef } from 'react';
import { ExternalLink, ArrowUpRight, Sparkles } from 'lucide-react';
import { GithubIcon } from '../ui/SocialIcons';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-panel rounded-3xl overflow-hidden border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col group cursor-pointer"
      onClick={() => onSelect(project)}
    >
      {/* Cover Image */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-900">
        <img
          src={project.cover_image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d101a] via-transparent to-transparent"></div>

        {project.featured && (
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-[10px] font-mono flex items-center gap-1 backdrop-blur-md">
            <Sparkles className="w-3 h-3" />
            <span>Featured</span>
          </div>
        )}

        <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 rounded-xl bg-slate-900/90 text-slate-200 hover:text-cyan-400 border border-slate-700 transition-all"
              title="Live Demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 rounded-xl bg-slate-900/90 text-slate-200 hover:text-cyan-400 border border-slate-700 transition-all"
              title="GitHub Repository"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>{project.period}</span>
            <span className="text-cyan-400 font-semibold">{project.role}</span>
          </div>

          <h3 className="text-xl font-bold font-sans text-slate-100 group-hover:text-cyan-400 transition-colors flex items-center gap-1">
            <span>{project.title}</span>
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-cyan-400" />
          </h3>

          <p className="text-slate-300 text-xs sm:text-sm font-sans line-clamp-2 mt-2 leading-relaxed">
            {project.summary}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.technologies?.slice(0, 4).map((tech) => (
            <span
              key={tech.id}
              className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-cyan-400/90"
            >
              {tech.name}
            </span>
          ))}
          {(project.technologies?.length || 0) > 4 && (
            <span className="px-2 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-[10px] font-mono text-slate-400">
              +{(project.technologies?.length || 0) - 4}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
