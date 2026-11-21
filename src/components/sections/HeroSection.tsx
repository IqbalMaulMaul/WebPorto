import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getProjects } from '../../lib/supabase';
import { INITIAL_PROJECTS } from '../../lib/mockData';
import { useLaptopDive } from '../../hooks/useLaptopDive';
import { laptopAssets } from '../hero/laptopScene';
import { ProjectLinks } from '../projects/ProjectLinks';
import '../../laptop-dive.css';

const Wordmark = ({ mobile = false }: { mobile?: boolean }) => (
  <svg className={`dive-wordmark dive-hero-content ${mobile ? 'dive-mobile-wordmark' : ''}`} viewBox="0 0 1440 260" preserveAspectRatio="none" aria-hidden="true">
    <defs><linearGradient id={mobile ? 'dive-mobile-ink' : 'dive-ink'} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" /><stop offset=".5" stopColor="#f1f5f3" stopOpacity=".9" /><stop offset="1" stopColor="#d7e6de" stopOpacity=".28" /></linearGradient></defs>
    <text x="14" y="214" textLength="1412" lengthAdjust="spacingAndGlyphs" fill={`url(#${mobile ? 'dive-mobile-ink' : 'dive-ink'})`}>IQBAL</text>
  </svg>
);
const Badge = () => (
  <div className="dive-badge dive-hero-content" aria-hidden="true">
    <img src={laptopAssets.badge} alt="" width="582" height="1030" />
    <div className="dive-badge-card">
      <h4>DEVELOPER<br />CARD</h4><span className="dive-badge-year">2026</span>
      <p className="dive-badge-role">FRONTEND DEVELOPER</p>
      <img className="dive-badge-photo" src="/images/profile-mobile.webp" alt="" width="92" height="112" />
      <div className="dive-badge-row"><span>NAME</span><b>Iqbal Maulana Dhiti</b></div>
      <div className="dive-badge-row"><span>BASED IN</span><b>Indonesia</b></div>
      <div className="dive-badge-row"><span>IG</span><b>@iqbalmsdhiti</b></div>
      <div className="dive-badge-row dive-badge-email"><span>EMAIL</span><b>iqbalmaulanadhiti@gmail.com</b></div>
    </div>
    <div className="dive-badge-hit" />
  </div>
);

export const HeroSection = () => {
  const root = useRef<HTMLElement>(null);
  const escaping = useRef(false);
  const [active, setActive] = useState(() => !location.hash || location.hash === '#hero');
  const [projects, setProjects] = useState(() => INITIAL_PROJECTS.filter(project => project.status === 'published'));
  const [assetError, setAssetError] = useState(false);
  const [failedCover, setFailedCover] = useState<string>();
  const dive = useLaptopDive(root, projects.length, active);
  const project = projects[dive.index];
  const coverError = failedCover === project?.id;

  useEffect(() => {
    let alive = true;
    getProjects().then(items => { if (alive) setProjects(items.filter(item => item.status === 'published')); }).catch(() => {});
    return () => { alive = false; };
  }, []);
  useEffect(() => {
    document.body.classList.toggle('dive-active', active);
    document.body.classList.toggle('dive-scroll-locked', active && dive.mode === 'hero');
    return () => document.body.classList.remove('dive-active', 'dive-scroll-locked');
  }, [active, dive.mode]);
  useEffect(() => {
    let initial = true;
    const observer = new IntersectionObserver(([entry]) => {
      if (initial && location.hash && location.hash !== '#hero') { initial = false; return; }
      initial = false;
      if (entry.intersectionRatio < 0.1) { escaping.current = false; setActive(false); }
      else if (entry.intersectionRatio >= 0.94 && !escaping.current) setActive(true);
    }, { threshold: [0, 0.1, 0.94] });
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  const leave = (id: string) => {
    escaping.current = true; setActive(false);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const section = document.getElementById(id);
      section?.scrollIntoView({ behavior: 'instant', block: 'start' });
      const heading = section?.querySelector<HTMLElement>('h2');
      heading?.setAttribute('tabindex', '-1'); heading?.focus({ preventScroll: true });
    }));
  };

  return (
    <section ref={root} id="hero" className="laptop-dive" data-mode={dive.mode} data-busy={dive.busy} data-active={active} data-paused={dive.paused} data-ready="false" data-asset-error={assetError} aria-labelledby="hero-title" aria-roledescription="interactive portfolio introduction">
      <h1 id="hero-title" className="sr-only">Iqbal Maulana Dhiti</h1>
      <div className="dive-stage" aria-hidden="true">
        <div className="dive-frame">
          <img className="dive-plate" src={laptopAssets.plate} alt="" width="1440" height="956" fetchPriority="high" onError={() => setAssetError(true)} />
          <Wordmark />
          <img className="dive-cut" src={laptopAssets.cut} alt="" width="1440" height="956" />
          <div className="dive-badge-anchor"><Badge /></div>
          <span className="dive-script dive-hero-content">frontend developer</span>
          <video className="dive-transition" muted playsInline preload="auto" disablePictureInPicture />
          <img className="dive-caseplate" src={laptopAssets.casePlate} alt="" width="1440" height="956" onError={() => setAssetError(true)} />
          <div className="dive-screen">
            {project && !coverError && <div className={`dive-preview ${project.screenshots && project.screenshots.length > 1 ? 'dive-preview--gallery' : ''}`}>
              {(project.screenshots && project.screenshots.length > 1 ? project.screenshots.slice(0, 3) : [project.cover_image]).map(source => <img key={source} src={source} alt="" onError={() => setFailedCover(project.id)} />)}
            </div>}
            {project && coverError && <div className="dive-cover-fallback">{project.title}</div>}
            <div className="dive-flash" />
          </div>
        </div>
      </div>
      <div className="dive-ui">
        <nav className="dive-nav" aria-label="Studio navigation">
          <button className="dive-nav-tag dive-tag-studio" data-selected={dive.mode === 'hero'} onClick={dive.home} disabled={dive.busy}>my studio</button>
          <button className="dive-nav-tag dive-tag-work" data-selected={dive.mode === 'case'} onClick={dive.open} disabled={dive.busy || !projects.length}>portfolio <ArrowUpRight size={15} /></button>
          <button className="dive-nav-tag dive-tag-contact" onClick={() => leave('contact')}>contacts</button>
          <button className="dive-nav-tag dive-tag-discuss" onClick={() => leave('contact')}>discuss a project <ArrowUpRight size={15} /></button>
          <button className="dive-centre-logo" onClick={dive.home} disabled={dive.busy} aria-label="Return to my studio">IMD.</button>
        </nav>
        <div className="dive-mobile-art" aria-hidden="true"><Wordmark mobile /><span className="dive-script dive-mobile-script dive-hero-content">frontend developer</span><div className="dive-mobile-badge"><div className="dive-badge-scale"><Badge /></div></div></div>
        <div className="dive-intro dive-hero-content" inert={dive.busy || dive.mode !== 'hero'}>
          <span className="dive-availability"><i /> Available for opportunities</span>
          <h2>Iqbal Maulana Dhiti<span>Frontend developer.</span></h2>
          <p>I build thoughtful interfaces and interactive web experiences — where clean code meets a little imagination.</p>
          <div className="dive-intro-footer"><span>Based in Indonesia</span><button onClick={() => leave('about')}>A little about me <ArrowUpRight size={15} /></button></div>
        </div>
        <button className="dive-hint dive-hero-content" onClick={dive.open} disabled={dive.busy || !projects.length}><span className="dive-drip" />scroll into the work <ArrowDown size={14} /></button>
        <div className="dive-case-ui" inert={dive.busy || dive.mode !== 'case'}>
          <div className="dive-project-panel">
          {project ? <>
            <article className="dive-ticket" aria-live="polite" aria-atomic="true">
              <i /><i /><i /><i />
              <span className="dive-ticket-eyebrow">Selected project / {String(dive.index + 1).padStart(2, '0')}</span>
              <h2>{project.title}</h2>
              <div className="dive-ticket-rows"><span>{project.role}</span>{!!project.technologies?.length && <span>{project.technologies.slice(0, 3).map(item => item.name).join(' / ')}</span>}<span>{project.period}</span></div>
            </article>
            <div className="dive-description">
              <span className="dive-description-key">// selected work</span>
              <p>{project.summary}</p>
              <ProjectLinks project={project} showSource={false} />
              <span className="dive-case-count">{String(dive.index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
              <div className="dive-description-actions"><Link to={`/projects/${project.slug}`} className="dive-detail-link">View project <ArrowUpRight size={16} /></Link><button className="dive-full-portfolio" onClick={() => leave('projects')}>All projects <ArrowUpRight size={14} /></button></div>
            </div>
          </> : <><div className="dive-ticket"><h2>Projects</h2></div><div className="dive-description">Explore the full portfolio below.</div></>}
          <div className="dive-case-navigation">
            <button className={`dive-case-button dive-previous ${dive.index === 0 ? 'dim' : ''}`} onClick={dive.previous} disabled={dive.busy} aria-label={dive.index === 0 ? 'Return to my studio' : 'Previous project'}><span><ArrowLeft /></span><b>Previous</b></button>
            <button className="dive-case-button dive-next" onClick={dive.next} disabled={dive.busy || !projects.length} aria-label="Next project"><span><ArrowRight /></span><b>Next</b></button>
          </div>
          </div>
        </div>
        <div className="dive-utilities">
          <button className="dive-motion-toggle" onClick={dive.pause} aria-label={dive.paused ? 'Enable hero motion' : 'Pause hero motion'} aria-pressed={dive.paused}>{dive.paused ? <Play size={15} /> : <Pause size={15} />}</button>
          <button className="dive-profile-link" onClick={() => leave('about')}>Profile <ArrowUpRight size={14} /></button>
        </div>
        {assetError && <p className="dive-asset-notice" role="status">Studio artwork unavailable. Your projects and profile are still accessible.</p>}
        <span className="sr-only" role="status">{dive.busy ? 'Changing studio view' : dive.mode === 'case' ? `Project ${dive.index + 1} of ${projects.length}` : 'Studio introduction. Use portfolio to explore or profile to continue reading.'}</span>
      </div>
    </section>
  );
};
