import { ArrowUpRight, ArrowDown } from 'lucide-react';

export const MaterialStudy = () => (
  <section className="material-section page-section" id="playground" aria-labelledby="material-title">
    <div className="wrap">
      <div className="material-stage">
        <img className="material-image" src="/images/studio-material-study.webp" srcSet="/images/studio-material-study-mobile.webp 960w, /images/studio-material-study.webp 1280w" sizes="(max-width: 639px) 160vw, 95vw" alt="Chrome and jade glass sculptures on ivory architectural platforms" width="1280" height="853" loading="lazy" decoding="async" />
        <div className="material-copy">
          <span className="section-index">Visual playground</span>
          <h2 id="material-title"><span><span>Code.</span></span><span><span>Form.</span></span><span><span>Motion.</span></span></h2>
          <a className="material-link link" href="#projects">Explore the projects <ArrowUpRight size={20} aria-hidden="true" /></a>
        </div>
        <div className="material-footer" aria-hidden="true"><span>Chrome / Glass / Form</span><span>Keep exploring <ArrowDown size={15} /></span></div>
      </div>
    </div>
  </section>
);
