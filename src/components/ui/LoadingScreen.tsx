import { useEffect, useState } from 'react';

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fade = window.setTimeout(() => setLeaving(true), reduced ? 0 : 350);
    const done = window.setTimeout(onComplete, reduced ? 0 : 650);
    return () => { clearTimeout(fade); clearTimeout(done); };
  }, [onComplete]);
  return <div className={`intro-screen ${leaving ? 'intro-leaving' : ''}`} aria-hidden="true"><span>IMD<span className="text-cyan-300">.</span></span><div className="intro-line" /></div>;
};
