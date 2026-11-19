import { flushSync } from 'react-dom';

let pending: ViewTransition | null = null;

/** Animate user-triggered layout changes, with an immediate accessible fallback. */
export const transitionUI = (update: () => void) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !document.startViewTransition) {
    update();
    return;
  }
  pending?.skipTransition();
  const transition = document.startViewTransition(() => flushSync(update));
  pending = transition;
  // Replacing an in-progress transition rejects ready with AbortError.
  void transition.ready.catch(() => {});
  void transition.finished.catch(() => {}).finally(() => {
    if (pending === transition) pending = null;
  });
};
