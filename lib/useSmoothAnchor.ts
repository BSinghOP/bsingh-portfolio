'use client';

import { useCallback } from 'react';

const NAV_OFFSET = 84;

function animateScrollTo(targetY: number) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 2) return;

  const duration = Math.min(1100, Math.max(500, Math.abs(distance) * 0.45));
  const start = performance.now();
  let cancelled = false;

  const cancel = () => {
    cancelled = true;
  };
  const cancelEvents: (keyof WindowEventMap)[] = ['wheel', 'touchstart', 'keydown'];
  cancelEvents.forEach((ev) => window.addEventListener(ev, cancel, { passive: true, once: true }));

  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const step = (now: number) => {
    if (cancelled) return;
    const t = Math.min(1, (now - start) / duration);
    // 'instant' so the CSS scroll-behavior:smooth fallback doesn't fight the rAF easing
    window.scrollTo({ top: startY + distance * easeInOutCubic(t), behavior: 'instant' });
    if (t < 1) requestAnimationFrame(step);
    else cancelEvents.forEach((ev) => window.removeEventListener(ev, cancel));
  };
  requestAnimationFrame(step);
}

/** Click handler for in-page `#hash` anchors: eased scroll with nav offset.
 *  Falls back to instant jump when prefers-reduced-motion is set. */
export function useSmoothAnchor() {
  return useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const hash = e.currentTarget.getAttribute('href') ?? '';
    if (!hash.startsWith('#')) return;
    e.preventDefault();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.location.hash = hash === '#' ? '' : hash;
      return;
    }

    let targetY = 0;
    if (hash !== '#') {
      const el = document.querySelector(hash);
      if (!el) return;
      targetY = window.scrollY + el.getBoundingClientRect().top - NAV_OFFSET;
    }
    animateScrollTo(Math.max(0, targetY));
    history.pushState(null, '', hash === '#' ? window.location.pathname : hash);
  }, []);
}
