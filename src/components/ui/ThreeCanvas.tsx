import { useEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCw, RotateCcw, MoveHorizontal } from 'lucide-react';
import type { OrbitalScene } from '../../three/scenes/OrbitalScene';
import type { StudioForm } from '../../three/scenes/StudioForms';

interface ThreeCanvasProps {
  sceneType: 'hero' | 'about' | 'skills' | 'terrain';
  className?: string;
  fallbackVisual?: React.ReactNode;
  controls?: boolean;
}

export const ThreeCanvas = ({ sceneType, className = '', fallbackVisual, controls = false }: ThreeCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<OrbitalScene | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'fallback'>('loading');
  const [paused, setPaused] = useState(false);
  const [form, setForm] = useState<StudioForm>('orbit');
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let active = true;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      import('../../three/scenes/OrbitalScene').then(({ OrbitalScene }) => {
        if (!active) return;
        sceneRef.current = new OrbitalScene(container, () => { if (active) setStatus('fallback'); }, sceneType === 'skills');
        if (sceneRef.current.available) setStatus('ready');
      }).catch(() => { if (active) setStatus('fallback'); });
    }, { rootMargin: '160px' });
    observer.observe(container);
    return () => { active = false; observer.disconnect(); sceneRef.current?.destroy(); sceneRef.current = null; };
  }, [sceneType]);

  useEffect(() => { sceneRef.current?.setPaused(paused); }, [paused, status]);
  useEffect(() => { sceneRef.current?.setForm(form); }, [form, status]);

  return (
    <div className={`three-visual ${className}`}>
      <div className="three-art" role="img" aria-label={`Interactive ${form} sculpture, mint geometric forms and ivory display podiums`}>
        <div ref={containerRef} className="three-mount" style={{ opacity: status === 'ready' ? 1 : 0 }} />
        <div className="orbital-fallback" aria-hidden="true" style={{ opacity: status === 'ready' ? 0 : 1 }}>
          {fallbackVisual ?? <img src="/images/podium-sculptures.webp" srcSet="/images/podium-sculptures-mobile.webp 600w, /images/podium-sculptures.webp 900w" sizes="(max-width: 639px) calc(100vw - 60px), 50vw" alt="" width="900" height="600" decoding="async" />}
        </div>
      </div>
      {controls && status === 'ready' && <><div className="form-switcher" role="group" aria-label="Choose a 3D sculpture">{(['orbit', 'bloom', 'flow'] as const).map(option => <button key={option} type="button" aria-pressed={form === option} onClick={() => setForm(option)}>{option}</button>)}</div><div className="scene-hint" aria-hidden="true"><MoveHorizontal size={16} /> Drag to rotate</div><div className="scene-controls" role="group" aria-label="3D sculpture controls">
        {!reduced && <button className="icon-button" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Resume 3D animation' : 'Pause 3D animation'} aria-pressed={paused} title={paused ? 'Resume animation' : 'Pause animation'}>{paused ? <Play size={18} /> : <Pause size={18} />}</button>}
        <button className="icon-button" onClick={() => sceneRef.current?.rotate()} aria-label="Rotate sculpture" title="Rotate sculpture"><RotateCw size={18} /></button>
        <button className="icon-button" onClick={() => sceneRef.current?.reset()} aria-label="Reset sculpture" title="Reset sculpture"><RotateCcw size={18} /></button>
      </div></>}
    </div>
  );
};

