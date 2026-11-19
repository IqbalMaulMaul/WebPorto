import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** One owner for section reveals, with route/unmount cleanup. */
export const initScrollReveals = (root: HTMLElement) => {
  const media = gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)', () => {
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.scroll-reveal', root).forEach(element => {
        gsap.fromTo(element, { autoAlpha: 0, y: 24 }, {
          autoAlpha: 1, y: 0, duration: 0.75, ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 93%', once: true },
        });
      });
    }, root);
    return () => context.revert();
  });
  return () => media.revert();
};
