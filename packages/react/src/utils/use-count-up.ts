'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface UseCountUpOptions {
  /** Animation duration in milliseconds (default: 2000) */
  duration?: number;
  /** Start animating when ref is in viewport (default: true) */
  triggerOnView?: boolean;
  /** Easing function (default: easeOutCubic) */
  easing?: (t: number) => number;
  /** Decimal places (default: 0) */
  decimals?: number;
  /** Starting value (default: 0) */
  start?: number;
}

/* ------------------------------------------------------------------ */
/*  Default easing                                                      */
/* ------------------------------------------------------------------ */

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/* ------------------------------------------------------------------ */
/*  Hook                                                                */
/* ------------------------------------------------------------------ */

/**
 * useCountUp — Animate a number from `start` to `target` using rAF.
 *
 * Returns:
 *  - `value`: the current display number (updates each frame)
 *  - `ref`: attach to the DOM element to trigger on viewport entry
 *
 * @example
 * const { value, ref } = useCountUp(12345, { duration: 2500 });
 * return <span ref={ref}>{value.toLocaleString()}</span>;
 */
export function useCountUp(
  target: number,
  options: UseCountUpOptions = {}
) {
  const {
    duration = 2000,
    triggerOnView = true,
    easing = easeOutCubic,
    decimals = 0,
    start = 0,
  } = options;

  const [value, setValue] = useState(start);
  const ref = useRef<HTMLElement | null>(null);
  const hasStarted = useRef(false);

  const animate = useCallback(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const startTime = performance.now();
    const delta = target - start;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easing(progress);
      const current = start + delta * easedProgress;

      setValue(Number(current.toFixed(decimals)));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [target, start, duration, easing, decimals]);

  useEffect(() => {
    if (!triggerOnView) {
      animate();
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animate, triggerOnView]);

  return { value, ref };
}
