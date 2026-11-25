import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import gsap from 'gsap';
import { laptopAssets, laptopPose } from '../components/hero/laptopScene';

type Mode = 'hero' | 'case';
type Controls = { open: () => void; next: () => void; previous: () => void; home: () => void; pause: () => void; settle: () => void };

export function useLaptopDive(rootRef: RefObject<HTMLElement | null>, count: number, active: boolean) {
  const [view, setView] = useState({ mode: 'hero' as Mode, index: 0, busy: false, paused: false });
  const activeRef = useRef(active);
  const controls = useRef<Controls | null>(null);
  useEffect(() => { activeRef.current = active; if (!active) controls.current?.settle(); }, [active]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const frame = root.querySelector<HTMLElement>('.dive-frame')!;
    const video = root.querySelector<HTMLVideoElement>('.dive-transition')!;
    const plate = root.querySelector<HTMLImageElement>('.dive-plate')!;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const context = gsap.context(() => {}, root);
    const controller = new AbortController();
    let mode: Mode = 'hero', index = 0, busy = false, paused = false, disposed = false;
    let epoch = 0, wheelAt = -Infinity, videoFrame = 0, entranceStarted = false, playingDive = false;
    let stopPlayback = () => {};
    let sway: gsap.core.Tween | undefined;
    const q = (selector: string) => root.querySelectorAll<HTMLElement>(selector);
    const motionOff = () => media.matches || paused;
    const publish = () => { if (!disposed) setView({ mode, index, busy, paused }); };
    const valid = (token: number) => !disposed && token === epoch;
    const tween = (target: gsap.TweenTarget, vars: gsap.TweenVars) => {
      let result!: gsap.core.Tween;
      context.add(() => { result = gsap.to(target, { ease: 'power3.out', ...vars, duration: motionOff() ? 0 : vars.duration ?? 0.6 }); });
      return result;
    };
    const set = (selector: string, vars: gsap.TweenVars) => { context.add(() => { gsap.set(q(selector), vars); }); };
    const paint = () => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    const place = (glide = 0) => {
      if (disposed) return;
      const ticket = root.querySelector<HTMLElement>('.dive-ticket')!;
      const desc = root.querySelector<HTMLElement>('.dive-description')!;
      const p = laptopPose(root.clientWidth, root.clientHeight, playingDive ? 'hero' : mode, ticket.offsetHeight, desc.offsetHeight);
      root.style.setProperty('--du', `${p.unit}px`);
      root.style.setProperty('--badge-scale', `${root.clientWidth * 0.27 / 582}`);
      root.style.setProperty('--ticket-height', `${ticket.offsetHeight}px`);
      frame.style.setProperty('--glide', `${motionOff() ? 0 : glide}s`);
      frame.style.transform = `translate(${p.x}px,${p.y}px) scale(${p.scale})`;
      frame.classList.toggle('m-case', mode === 'case');
      frame.classList.toggle('m-fade', p.mobile);
      frame.classList.toggle('d-fade', !p.mobile);
      const word = frame.querySelector<HTMLElement>('.dive-wordmark')!;
      word.style.left = `${p.wordLeft}px`; word.style.width = `${p.wordWidth}px`;
      const badge = frame.querySelector<HTMLElement>('.dive-badge-anchor')!;
      badge.style.left = `${p.badgeLeft}px`; badge.style.top = `${p.badgeTop}px`;
      frame.querySelector<HTMLElement>('.dive-script')!.style.left = `${p.scriptLeft}px`;
    };
    const startSway = () => {
      sway?.kill();
      if (!motionOff() && activeRef.current && mode === 'hero') {
        set('.dive-badge', { rotation: -1.1 });
        sway = tween(q('.dive-badge'), { rotation: 1.1, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      }
    };
    const stop = () => {
      ++epoch; stopPlayback(); sway?.kill();
      context.getTweens().forEach((animation: gsap.core.Tween) => animation.kill());
      video.pause(); cancelAnimationFrame(videoFrame);
    };
    const settle = () => {
      stop(); busy = false; playingDive = false;
      set('.dive-nav-tag', { opacity: 1, y: 0, rotation: 0 });
      set('.dive-hero-content', { opacity: mode === 'hero' ? 1 : 0, y: 0, yPercent: 0, rotation: 0, clipPath: 'inset(0)' });
      set('.dive-plate', { opacity: 1, scale: 1, filter: 'blur(0px)', visibility: mode === 'hero' ? 'visible' : 'hidden' });
      set('.dive-transition,.dive-flash', { opacity: 0 });
      set('.dive-project-panel', { opacity: mode === 'case' ? 1 : 0 });
      set('.dive-caseplate,.dive-screen,.dive-ticket,.dive-description > *,.dive-case-navigation', { opacity: mode === 'case' ? 1 : 0, y: 0, rotation: 0, scale: 1, filter: 'blur(0px)' });
      set('.dive-preview', { opacity: 1, scale: 1 });
      root.dataset.ready = 'true';
      place(); publish(); startSway();
    };
    const heroIn = () => {
      set('.dive-wordmark', { opacity: 0, y: 50, clipPath: 'inset(100% 0 0 0)' });
      set('.dive-script', { opacity: 0, clipPath: 'inset(0 100% 0 0)' });
      set('.dive-badge', { opacity: 0, yPercent: -110, rotation: 6 });
      tween(q('.dive-wordmark'), { opacity: 1, y: 0, clipPath: 'inset(0)', duration: 1.1 });
      tween(q('.dive-script'), { opacity: 1, clipPath: 'inset(0)', duration: 0.9, delay: motionOff() ? 0 : 0.65 });
      tween(q('.dive-badge'), { opacity: 1, yPercent: 0, rotation: 0, duration: 1.35, ease: 'back.out(1.25)', delay: motionOff() ? 0 : 0.25, onComplete: startSway });
      tween(q('.dive-intro,.dive-hint'), { opacity: 1, duration: 0.6, delay: motionOff() ? 0 : 0.75 });
    };
    const caseIn = async (token: number) => {
      set('.dive-project-panel', { opacity: 1 });
      set('.dive-caseplate', { opacity: 1, filter: 'blur(0px)' });
      set('.dive-plate', { visibility: 'hidden' });
      set('.dive-transition', { opacity: 0 });
      set('.dive-screen,.dive-case-navigation', { opacity: 1, y: 0 });
      set('.dive-ticket', { opacity: 0, y: -60, rotation: -6 });
      set('.dive-description > *', { opacity: 0, y: 14 });
      set('.dive-preview', { opacity: 0, scale: 1.04 });
      set('.dive-flash', { opacity: motionOff() ? 0 : 0.35 });
      tween(q('.dive-flash'), { opacity: 0, duration: 0.42 });
      tween(q('.dive-preview'), { opacity: 1, scale: 1, duration: 0.7 });
      await Promise.all([
        tween(q('.dive-description > *'), { opacity: 1, y: 0, stagger: motionOff() ? 0 : 0.045, delay: motionOff() ? 0 : 0.1, duration: 0.45 }),
        tween(q('.dive-ticket'), { opacity: 1, y: 0, rotation: 0, duration: 0.7, ease: 'power3.out' }),
      ]);
      if (valid(token)) { busy = false; publish(); place(); }
    };
    const playDive = () => new Promise<void>(resolve => {
      let finished = false;
      const started = performance.now();
      const finish = () => {
        if (finished) return;
        finished = true; cancelAnimationFrame(videoFrame); video.pause();
        video.removeEventListener('ended', finish); video.removeEventListener('error', finish);
        resolve();
      };
      stopPlayback = finish;
      video.addEventListener('ended', finish); video.addEventListener('error', finish);
      const tick = () => {
        if (disposed || motionOff() || !activeRef.current || performance.now() - started > 8000) return finish();
        const progress = video.duration ? video.currentTime / video.duration : 0;
        if (progress >= 0.995) return finish();
        video.playbackRate = 2;
        videoFrame = requestAnimationFrame(tick);
      };
      video.playbackRate = 2;
      video.play().then(tick).catch(finish);
    });
    const enter = async () => {
      if (busy || !count) return;
      busy = true; const token = ++epoch; sway?.kill(); publish();
      set('.dive-project-panel', { opacity: 0 });
      // A click during the entrance must not let its delayed tweens restore the hero.
      gsap.killTweensOf(q('.dive-hero-content'));
      tween(q('.dive-wordmark'), { opacity: 0, y: -40, duration: 0.38 });
      tween(q('.dive-script,.dive-intro,.dive-hint'), { opacity: 0, duration: 0.3 });
      await tween(q('.dive-badge'), { opacity: 0, yPercent: -110, rotation: -6, duration: 0.33 });
      if (!valid(token)) return;
      playingDive = !motionOff() && video.readyState >= 2;
      mode = 'case'; index = 0; publish(); await paint();
      if (!valid(token)) return;
      if (playingDive) {
        video.currentTime = 0;
        set('.dive-transition', { opacity: 1 });
        await paint(); if (!valid(token)) return;
        set('.dive-plate', { visibility: 'hidden' });
        place();
        await playDive();
      }
      if (valid(token)) {
        playingDive = false;
        place(0.7);
        await caseIn(token);
      }
    };
    const home = async () => {
      if (busy || mode === 'hero') return;
      busy = true; const token = ++epoch; publish();
      tween(q('.dive-ticket,.dive-description > *,.dive-case-navigation'), { opacity: 0, y: -20, duration: 0.3 });
      await tween(q('.dive-screen'), { opacity: 0, duration: 0.3 });
      if (!valid(token)) return;
      mode = 'hero'; publish(); place(0.9);
      set('.dive-plate', { visibility: 'visible', scale: motionOff() ? 1 : 1.12, filter: motionOff() ? 'none' : 'blur(8px)' });
      tween(q('.dive-caseplate'), { opacity: 0, filter: motionOff() ? 'none' : 'blur(12px)', duration: 0.8 });
      heroIn();
      await tween(q('.dive-plate'), { scale: 1, filter: 'blur(0px)', duration: 1.1 });
      if (valid(token)) { busy = false; publish(); place(); }
    };
    const swap = async (next: number) => {
      if (busy || !count) return;
      if (next < 0) return home();
      busy = true; const token = ++epoch; publish();
      tween(q('.dive-ticket'), { opacity: 0, y: -40, rotation: 4, duration: 0.38 });
      tween(q('.dive-description > *'), { opacity: 0, y: -10, duration: 0.3 });
      await tween(q('.dive-preview'), { opacity: 0, duration: 0.35 });
      if (!valid(token)) return;
      index = next % count; publish(); await paint();
      if (valid(token)) { place(0.45); await caseIn(token); }
    };
    controls.current = {
      open: () => { if (mode === 'hero') void enter(); },
      next: () => { if (mode === 'hero') void enter(); else void swap(index + 1); },
      previous: () => { if (mode === 'case') void swap(index - 1); },
      home: () => { void home(); },
      pause: () => { paused = !paused; settle(); },
      settle,
    };
    const canReturnHome = (target: EventTarget | null) => {
      if (!activeRef.current || mode !== 'case' || busy || Math.abs(root.getBoundingClientRect().top) > 1) return false;
      // Let a nested project panel finish scrolling up before leaving the showcase.
      for (let element = target instanceof Element ? target : null; element && element !== root; element = element.parentElement) {
        if (element.scrollTop > 1 && /(auto|scroll)/.test(getComputedStyle(element).overflowY)) return false;
      }
      return true;
    };
    const wheel = (event: WheelEvent) => {
      if (!activeRef.current || event.ctrlKey || event.metaKey) return;
      if (mode === 'case') {
        if (event.deltaY <= -18 && Math.abs(event.deltaY) > Math.abs(event.deltaX) && canReturnHome(event.target)) {
          event.preventDefault();
          wheelAt = performance.now();
          void home();
        }
        return;
      }
      event.preventDefault();
      if (busy || Math.abs(event.deltaY) < 18 || performance.now() - wheelAt < 900) return;
      wheelAt = performance.now();
      if (event.deltaY > 0) controls.current?.next(); else controls.current?.previous();
    };
    const key = (event: KeyboardEvent) => {
      if (!activeRef.current || event.ctrlKey || event.metaKey || event.altKey || (event.target instanceof Element && event.target.closest('input,textarea,select,[contenteditable="true"]'))) return;
      if (mode === 'case') {
        if (event.code === 'Escape' && !busy) controls.current?.home();
        else if (['ArrowUp', 'PageUp', 'Home'].includes(event.code) && canReturnHome(event.target)) {
          event.preventDefault();
          void home();
        }
        return;
      }
      if (event.code === 'Space' && event.target instanceof Element && event.target.closest('button,a')) return;
      if (['ArrowDown', 'ArrowRight', 'PageDown', 'Space'].includes(event.code)) { event.preventDefault(); controls.current?.next(); }
      if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(event.code)) { event.preventDefault(); controls.current?.previous(); }
      if (event.code === 'Escape' && !busy) controls.current?.home();
    };
    let touch: { x: number; y: number } | null = null;
    const down = (event: PointerEvent) => { if (mode === 'hero' && event.pointerType === 'touch' && event.isPrimary) touch = { x: event.clientX, y: event.clientY }; };
    const up = (event: PointerEvent) => {
      if (!touch || !activeRef.current || mode === 'case') { touch = null; return; }
      const dx = touch.x - event.clientX, dy = touch.y - event.clientY; touch = null;
      const distance = Math.abs(dx) > Math.abs(dy) ? dx : dy;
      if (Math.abs(distance) >= 40) { if (distance > 0) controls.current?.next(); else controls.current?.previous(); }
    };
    const cancelTouch = () => { touch = null; };
    let returnTouch: { x: number; y: number } | null = null;
    const returnTouchStart = (event: TouchEvent) => {
      returnTouch = event.touches.length === 1 && canReturnHome(event.target)
        ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
    };
    const returnTouchMove = (event: TouchEvent) => {
      if (!returnTouch || event.touches.length !== 1) { returnTouch = null; return; }
      const dx = event.touches[0].clientX - returnTouch.x;
      const dy = event.touches[0].clientY - returnTouch.y;
      if (dy < -10 || Math.abs(dx) > 40) { returnTouch = null; return; }
      if (dy >= 40 && dy > Math.abs(dx) && canReturnHome(event.target)) {
        if (event.cancelable) event.preventDefault();
        returnTouch = null;
        void home();
      }
    };
    const returnTouchEnd = () => { returnTouch = null; };
    const swing = () => { if (!busy && mode === 'hero' && !motionOff()) { sway?.kill(); tween(q('.dive-badge'), { keyframes: [{ rotation: -6 }, { rotation: 4 }, { rotation: -2 }, { rotation: 0 }], duration: 1.4, onComplete: startSway }); } };
    const visibility = () => { if (document.hidden) { settle(); sway?.pause(); } else startSway(); };
    root.addEventListener('wheel', wheel, { passive: false });
    root.addEventListener('pointerdown', down); root.addEventListener('pointerup', up); root.addEventListener('pointercancel', cancelTouch);
    root.addEventListener('touchstart', returnTouchStart, { passive: true });
    root.addEventListener('touchmove', returnTouchMove, { passive: false });
    root.addEventListener('touchend', returnTouchEnd); root.addEventListener('touchcancel', returnTouchEnd);
    const badgeHits = q('.dive-badge-hit'); badgeHits.forEach(hit => hit.addEventListener('pointerenter', swing));
    window.addEventListener('keydown', key); media.addEventListener('change', settle); document.addEventListener('visibilitychange', visibility);
    const resize = new ResizeObserver(() => place()); resize.observe(root); resize.observe(root.querySelector('.dive-ticket')!); resize.observe(root.querySelector('.dive-description')!);
    place(); set('.dive-caseplate,.dive-screen,.dive-ticket,.dive-description > *,.dive-case-navigation', { opacity: 0 });
    const entrance = () => {
      if (disposed || entranceStarted) return;
      entranceStarted = true; root.dataset.ready = 'true';
      if (busy || mode !== 'hero') return;
      if (motionOff() || !activeRef.current) return settle();
      set('.dive-nav-tag', { opacity: 0, y: -40, rotation: -4 });
      tween(q('.dive-nav-tag'), { opacity: 1, y: 0, rotation: 0, duration: 0.7, stagger: 0.08, ease: 'back.out(1.5)' });
      heroIn();
    };
    const imageReady = plate.complete ? Promise.resolve() : new Promise<void>(resolve => { plate.addEventListener('load', () => resolve(), { once: true, signal: controller.signal }); plate.addEventListener('error', () => resolve(), { once: true, signal: controller.signal }); });
    const entranceTimeout = window.setTimeout(entrance, 2500);
    Promise.all([document.fonts.ready, imageReady]).then(entrance);
    // Local media supports normal streaming/range requests without downloading a Blob first.
    if (!media.matches) { video.src = laptopAssets.transition; video.load(); }
    return () => {
      disposed = true; stop(); controls.current = null; controller.abort(); window.clearTimeout(entranceTimeout);
      resize.disconnect(); context.revert(); video.removeAttribute('src'); video.load();
      root.removeEventListener('wheel', wheel); root.removeEventListener('pointerdown', down); root.removeEventListener('pointerup', up); root.removeEventListener('pointercancel', cancelTouch);
      root.removeEventListener('touchstart', returnTouchStart); root.removeEventListener('touchmove', returnTouchMove);
      root.removeEventListener('touchend', returnTouchEnd); root.removeEventListener('touchcancel', returnTouchEnd);
      badgeHits.forEach(hit => hit.removeEventListener('pointerenter', swing));
      window.removeEventListener('keydown', key); media.removeEventListener('change', settle); document.removeEventListener('visibilitychange', visibility);
    };
  }, [rootRef, count]);
  return { ...view, open: () => controls.current?.open(), next: () => controls.current?.next(), previous: () => controls.current?.previous(), home: () => controls.current?.home(), pause: () => controls.current?.pause() };
}
