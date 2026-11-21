import { useEffect, useRef, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const links = [{ name: 'Experience', id: 'experience' }, { name: 'About', id: 'about' }, { name: 'Skills', id: 'skills' }, { name: 'Projects', id: 'projects' }];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDialogElement>(null);
  const location = useLocation();
  const href = (id: string) => location.pathname === '/' ? `#${id}` : `/#${id}`;

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-15% 0px -65% 0px' });
    document.querySelectorAll('main > section[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    const dialog = menu.current;
    const opener = toggle.current;
    if (!open || !dialog) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previous;
      opener?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Link className="brand" to="/" aria-label="Iqbal Maulana Dhiti home"><span className="brand-mark" aria-hidden="true">i</span>IMD<span className="brand-period">.</span></Link>
        <nav className="nav__links" aria-label="Main navigation">{links.map(link => <a key={link.id} href={href(link.id)} aria-current={location.pathname === '/' && active === link.id ? 'location' : undefined}>{link.name}</a>)}</nav>
        <div className="nav-actions">
          <a className="btn btn--secondary nav-cta" href={href('contact')}>Contact me <ArrowUpRight size={16} aria-hidden="true" /></a>
          <button ref={toggle} className="icon-button menu-toggle" onClick={() => setOpen(true)} aria-label="Open navigation" aria-expanded={open} aria-controls="mobile-navigation"><Menu size={22} /></button>
        </div>
      </div>
      {open && <dialog ref={menu} id="mobile-navigation" className="mobile-menu" aria-label="Navigation menu" onCancel={() => setOpen(false)}>
        <div className="mobile-menu-top"><span className="brand">IMD.</span><button className="icon-button" onClick={() => setOpen(false)} aria-label="Close navigation"><X size={24} /></button></div>
        <nav aria-label="Mobile navigation">{[...links, { name: 'Contact', id: 'contact' }].map((link, i) => <a key={link.id} href={href(link.id)} style={{ animationDelay: `${i * 35}ms` }} onClick={() => setOpen(false)}><span>0{i + 1}</span>{link.name}<ArrowUpRight aria-hidden="true" /></a>)}</nav>
      </dialog>}
    </header>
  );
};

