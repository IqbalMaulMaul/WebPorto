import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** A single scoped owner for entrances, scroll choreography and their cleanup. */
export function useStudioMotion() {
  useEffect(() => {
    const root = document.querySelector('main');
    if (!root) return;
    const media = gsap.matchMedia(root);
    let disposed = false;

    media.add({ motion: '(prefers-reduced-motion: no-preference)', reduced: '(prefers-reduced-motion: reduce)', desktop: '(min-width: 640px)' }, context => {
      if (!context.conditions?.motion) {
        // CSS duration changes alone don't stop a transition already in flight.
        root.getAnimations({ subtree: true }).forEach(animation => animation.cancel());
        return;
      }
      const desktop = context.conditions.desktop;
      const reveals = new Map<Element, gsap.core.Animation>();
      const seen = new WeakSet<Element>();
      let refreshTimer = 0;
      const refresh = () => {
        window.clearTimeout(refreshTimer);
        refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 100);
      };

      // Late-loaded projects share this context, including route/preference cleanup.
      const discover = context.add('discover', () => {
        root.querySelectorAll('.section-heading, .work-surface, .about-portrait, .timeline-row').forEach(element => {
          if (seen.has(element)) return;
          seen.add(element);
          const heading = element.matches('.section-heading');
          const tween = gsap.fromTo(element, heading
            ? { y: 48, clipPath: 'inset(0 0 100% 0)' }
            : { y: desktop ? 92 : 48, opacity: 0.2, rotationX: desktop ? 8 : 0, transformPerspective: 1200 }, {
            y: 0, opacity: 1, rotationX: 0, ...(heading ? { clipPath: 'inset(0 0 0% 0)' } : {}),
            duration: 1.15, ease: 'power4.out', immediateRender: false,
            clearProps: heading ? 'transform,opacity,clipPath' : 'transform,opacity',
            scrollTrigger: { trigger: element, start: 'top 92%', once: true },
          });
          reveals.set(element, tween);
        });
        refresh();
      });
      discover();
      const mutation = new MutationObserver(() => discover());
      mutation.observe(root, { childList: true, subtree: true });

      const study = root.querySelector('.material-stage');
      if (study) {
        const title = gsap.fromTo('.material-copy h2 > span > span', { yPercent: 115, rotation: 8 }, {
          yPercent: 0, rotation: 0, duration: 1.3, stagger: 0.12, ease: 'power4.out', immediateRender: false,
          scrollTrigger: { trigger: study, start: 'top 75%', once: true },
        });
        reveals.set(study, title);
        gsap.fromTo('.material-image', { scale: 1.16, yPercent: -3 }, {
          scale: 1, yPercent: 3, ease: 'none',
          scrollTrigger: { trigger: study, start: 'top bottom', end: 'bottom top', scrub: 1 },
        });
      }
      gsap.fromTo('.portrait-bloom', { rotation: -32, y: 50 }, {
        rotation: 28, y: -45, ease: 'none',
        scrollTrigger: { trigger: '.portrait-composition', start: 'top bottom', end: 'bottom top', scrub: 0.8 },
      });
      gsap.fromTo('.contact-art', { rotation: -18, y: 36 }, {
        rotation: 12, y: -18, ease: 'none',
        scrollTrigger: { trigger: '.contact-section', start: 'top bottom', end: 'bottom bottom', scrub: 0.8 },
      });

      const focus = (event: Event) => reveals.forEach((animation, element) => {
        if (event.target instanceof Node && element.contains(event.target)) animation.progress(1);
      });
      root.addEventListener('focusin', focus);
      root.addEventListener('load', refresh, true);
      document.fonts.ready.then(() => { if (!disposed && !context.isReverted) refresh(); });
      return () => {
        mutation.disconnect();
        window.clearTimeout(refreshTimer);
        root.removeEventListener('load', refresh, true);
        root.removeEventListener('focusin', focus);
        reveals.clear();
      };
    });
    return () => { disposed = true; media.revert(); };
  }, []);
}
