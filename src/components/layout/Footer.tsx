import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => (
  <footer className="site-footer">
    <div className="wrap footer-inner">
      <div><Link className="brand" to="/">IMD<span className="brand-period">.</span></Link><p className="footer-note">© {new Date().getFullYear()} Iqbal Maulana Dhiti. Made with intention.</p></div>
      <div className="footer-links">
        <a href="https://github.com/iqbalmaulanadhiti" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={16} aria-hidden="true" /></a>
        <a href="https://linkedin.com/in/iqbalmaulanadhiti" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={16} aria-hidden="true" /></a>
        <button onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}>Back to top <ArrowUp size={16} aria-hidden="true" /></button>
      </div>
    </div>
  </footer>
);

