import { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AppRouter } from './app/router';
import { ShapeDefs } from './components/ui/ShapeDefs';

const RoutePosition = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
};

export const App = () => (
  <BrowserRouter>
    <ShapeDefs />
    <RoutePosition />
    <a href="#main-content" className="skip-link">Skip to content</a>
    <Navbar />
    <main id="main-content" tabIndex={-1}><AppRouter /></main>
    <Footer />
  </BrowserRouter>
);
export default App;

