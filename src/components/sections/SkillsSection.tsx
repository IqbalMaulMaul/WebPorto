import { useState } from 'react';
import {
  HTML5Logo, CSS3Logo, JSLogo, ReactLogo, TailwindLogo,
  ThreeJSLogo, GSAPLogo, LaravelLogo, MySQLLogo, SupabaseLogo,
  GitLogo, FigmaLogo
} from '../ui/TechLogos';
import { transitionUI } from '../../animations/transition';

const ALL_SKILLS = [
  { id: 'html', name: 'HTML5', category: 'Frontend', icon: HTML5Logo },
  { id: 'css', name: 'CSS3', category: 'Frontend', icon: CSS3Logo },
  { id: 'js', name: 'JavaScript', category: 'Frontend', icon: JSLogo },
  { id: 'react', name: 'React', category: 'Frontend', icon: ReactLogo },
  { id: 'tailwind', name: 'Tailwind', category: 'Frontend', icon: TailwindLogo },
  { id: 'threejs', name: 'Three.js', category: 'Frontend', icon: ThreeJSLogo },
  { id: 'gsap', name: 'GSAP', category: 'Frontend', icon: GSAPLogo },
  { id: 'laravel', name: 'Laravel', category: 'Backend', icon: LaravelLogo },
  { id: 'mysql', name: 'MySQL', category: 'Backend', icon: MySQLLogo },
  { id: 'supabase', name: 'Supabase', category: 'Backend', icon: SupabaseLogo },
  { id: 'git', name: 'Git', category: 'Tools', icon: GitLogo },
  { id: 'figma', name: 'Figma', category: 'Design', icon: FigmaLogo },
];

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Design', 'Tools'];

export const SkillsSection = () => {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? ALL_SKILLS : ALL_SKILLS.filter(skill => skill.category === active);
  return (
    <section id="skills" className="page-section skills-section" aria-labelledby="skills-title">
      <div className="wrap">
        <div className="section-heading heading-row"><div><span className="section-index">03 / Skills</span><h2 id="skills-title">Tools of the trade.</h2></div><p className="section-note">Frontend engineering.<br />Creative development.</p></div>
        <div className="skill-filters" role="group" aria-label="Filter skills by category">{CATEGORIES.map(category => <button key={category} className="filter-button" aria-pressed={active === category} onClick={() => { if (active !== category) transitionUI(() => setActive(category)); }}>{category}</button>)}</div>
        <div className="skills-grid">{filtered.map(({ id, name, category, icon: Icon }) => <div className="skill-tile" key={id} style={{ viewTransitionName: `skill-${id}` }}><Icon className="tech-icon" /><div><h3>{name}</h3><span>{category}</span></div></div>)}</div>
        <p className="skill-count" role="status">{filtered.length} tools listed{active !== 'All' ? ` in ${active}` : ''}</p>
      </div>
    </section>
  );
};
