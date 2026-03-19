'use client';

import * as React from 'react';

/** Options for the useInView hook */
export interface UseInViewOptions {
  /** Trigger once and stay revealed */
  once?: boolean;
  /** Root margin for the intersection observer */
  rootMargin?: string;
  /** Threshold */
  threshold?: number;
}

/**
 * useInView — Returns a [ref, inView] tuple.
 * Uses IntersectionObserver to track whether the element is visible.
 *
 * @example
 * const [ref, inView] = useInView({ once: true });
 * <div ref={ref} className={inView ? 'opacity-100' : 'opacity-0'} />
 */
export function useInView<T extends Element = HTMLDivElement>(
  options: UseInViewOptions = {}
): [React.RefCallback<T>, boolean] {
  const { once = true, rootMargin = '0px 0px -60px 0px', threshold = 0.1 } = options;
  const [inView, setInView] = React.useState(false);
  const observerRef = React.useRef<IntersectionObserver | null>(null);
  const elementRef = React.useRef<T | null>(null);

  const setRef = React.useCallback(
    (node: T | null) => {
      if (elementRef.current && observerRef.current) {
        observerRef.current.unobserve(elementRef.current);
      }
      elementRef.current = node;

      if (!node) return;

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once && observerRef.current) {
              observerRef.current.disconnect();
            }
          } else if (!once) {
            setInView(false);
          }
        },
        { rootMargin, threshold }
      );
      observerRef.current.observe(node);
    },
    [once, rootMargin, threshold]
  );

  React.useEffect(() => {
    return () => observerRef.current?.disconnect();
  }, []);

  return [setRef, inView];
}

/**
 * useCountUp — Animates a number from 0 to `target` when `trigger` is true.
 * Uses requestAnimationFrame with easeOutExpo — smooth deceleration, no bounce.
 *
 * @example
 * const count = useCountUp(12847, inView, 1800);
 */
export function useCountUp(
  target: number,
  trigger: boolean,
  duration = 1600
): number {
  const [count, setCount] = React.useState(0);
  const rafRef = React.useRef<number>(0);
  const startRef = React.useRef<number>(0);
  const hasRun = React.useRef(false);

  React.useEffect(() => {
    if (!trigger || hasRun.current) return;
    hasRun.current = true;

    const easeOutExpo = (t: number) =>
      t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

    const animate = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);

      setCount(Math.round(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [trigger, target, duration]);

  return count;
}

/**
 * CSS class helper for stagger-reveal animations.
 * Each child gets a CSS custom property `--stagger` set by index.
 *
 * Animation: items translate up from 24px + clip-path reveal.
 * No opacity-only fades. No bounce.
 *
 * @example
 * <ul>
 *   {items.map((item, i) => (
 *     <li key={i} style={staggerStyle(i)} className={inView ? 'anim-reveal' : 'anim-hidden'}>
 */
export function staggerStyle(index: number, baseDelay = 0): React.CSSProperties {
  return {
    '--stagger': String(index),
    transitionDelay: `${baseDelay + index * 60}ms`,
  } as React.CSSProperties;
}
