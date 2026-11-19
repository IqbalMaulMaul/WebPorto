import { ArrowUpRight } from 'lucide-react';
import { ThreeCanvas } from './ThreeCanvas';

export const HeroProfileCard = () => (
  <div className="hero-art fade-in-up">
    <div className="art-topline"><span>EXPERIMENT 001</span><span>FORM & MOTION</span></div>
    <div className="art-stage"><div className="art-halo" /><ThreeCanvas sceneType="hero" /><span className="art-coordinate">[ IMD / CREATIVE DEVELOPMENT ]</span></div>
    <div className="art-profile">
      <img src="/profile.jpg" alt="Iqbal Maulana Dhiti" width="46" height="46" />
      <div><strong>A person behind the pixels.</strong><span>Informatics student & frontend developer</span></div>
      <a href="#about" aria-label="More about Iqbal"><ArrowUpRight size={20} /></a>
    </div>
  </div>
);
