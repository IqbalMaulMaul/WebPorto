import { useEffect, useRef } from 'react';

/** Optional pointer accent; retains the native cursor and avoids a render loop. */
export const CustomCursor = () => {
  const accent = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = accent.current;
    if (!element || !window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;
    const move = (event: PointerEvent) => {
      element.style.opacity = '0.35';
      element.style.transform = `translate3d(${event.clientX - 12}px, ${event.clientY - 12}px, 0)`;
    };
    const hide = () => { element.style.opacity = '0'; };
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', hide);
    return () => { window.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', hide); };
  }, []);
  return <div ref={accent} aria-hidden="true" style={{ position: 'fixed', top: 0, left: 0, width: 24, height: 24, border: '1px solid #78dfd0', borderRadius: '50%', pointerEvents: 'none', zIndex: 60, opacity: 0, transition: 'transform 100ms ease-out, opacity 150ms' }} />;
};
