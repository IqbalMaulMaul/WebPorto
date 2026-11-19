import { ArrowUpRight, Code2, Box, GraduationCap } from 'lucide-react';

export const AboutSection = () => (
  <section id="about" className="page-section about-section" aria-labelledby="about-title">
    <div className="wrap">
      <div className="section-heading"><span className="section-index">01 / About</span><h2 id="about-title">The person behind<br />the interface.</h2></div>
      <div className="about-layout">
        <div className="about-copy">
          <h3>Curious mind. Creative builder.</h3>
          <p>Always learning. Always building. I like making complex things feel simple.</p>
          <p>I'm Iqbal Maulana Dhiti, an Informatics student based in Indonesia. I explore the space between frontend engineering and creative interaction.</p>
          <p>From responsive interfaces to small experiments with 3D, I enjoy building experiences that are useful, considered, and a pleasure to explore.</p>
          <div className="about-disciplines">
            {[{ icon: Code2, title: 'Frontend engineering', text: 'Clear structure. Thoughtful details.' }, { icon: Box, title: 'Creative development', text: 'Exploring depth, interaction, and motion.' }, { icon: GraduationCap, title: 'Learning by building', text: 'Informatics, experiments, and new ideas.' }].map(({ icon: Icon, title, text }) => <div key={title}><Icon size={20} aria-hidden="true" /><div><strong>{title}</strong><span>{text}</span></div></div>)}
          </div>
          <a href="#contact" className="link">Let's build something together <ArrowUpRight size={18} aria-hidden="true" /></a>
        </div>
        <div className="portrait-composition"><div className="about-portrait frame"><img src="/profile.jpg" srcSet="/images/profile-mobile.webp 600w, /profile.jpg 768w" sizes="(max-width: 639px) calc(100vw - 90px), (max-width: 1023px) 65vw, 42vw" alt="Iqbal Maulana Dhiti speaking at an event" width="800" height="1000" loading="lazy" /><div className="portrait-name"><span>Iqbal Maulana Dhiti</span><ArrowUpRight size={24} aria-hidden="true" /></div></div><img className="portrait-bloom" src="/images/chrome-bloom.webp" srcSet="/images/chrome-bloom-mobile.webp 256w, /images/chrome-bloom.webp 384w" sizes="(max-width: 639px) 116px, (max-width: 1023px) 200px, 180px" alt="" aria-hidden="true" width="512" height="512" loading="lazy" decoding="async" /></div>
      </div>
    </div>
  </section>
);

