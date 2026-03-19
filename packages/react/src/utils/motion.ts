'use client';

/**
 * Shared motion utilities for @archui/react
 *
 * Provides:
 * - useMotionSafe() — hook to check if motion is available + respects prefers-reduced-motion
 * - Reusable animation presets for consistent enter/exit animations
 *
 * Motion is an optional peer dependency, so all utilities gracefully
 * degrade to CSS-only when motion is not installed.
 */

import * as React from 'react';

/* ──────────────────────────────────────────────
   Reduced motion detection
   ────────────────────────────────────────────── */

/**
 * Returns true if the user prefers reduced motion.
 * Listens for media query changes and re-renders.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}

/* ──────────────────────────────────────────────
   Animation presets — used by all components
   ────────────────────────────────────────────── */

/** Fade in/out */
export const fadePreset = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.15 },
};

/** Scale + fade (modal, alert) */
export const scalePreset = {
  initial: { opacity: 0, scale: 0.96, y: 8 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: 8 },
  transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
};

/** Slide up (toast, dropdown) */
export const slideUpPreset = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 16 },
  transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
};

/** Slide down (dropdown opening downward) */
export const slideDownPreset = {
  initial: { opacity: 0, y: -8, scaleY: 0.95 },
  animate: { opacity: 1, y: 0, scaleY: 1 },
  exit: { opacity: 0, y: -8, scaleY: 0.95 },
  transition: { duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
};

/** Slide from right (toast / notification) */
export const slideRightPreset = {
  initial: { opacity: 0, x: 80 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 80 },
  transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] },
};

/** Overlay backdrop */
export const overlayPreset = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

/** Spring config for hover/press (fast, snappy) */
export const interactionSpring = { type: 'spring' as const, stiffness: 400, damping: 25 };

/** Returns reduced-motion safe animation props */
export function safeAnimationProps(
  preset: { initial: object; animate: object; exit?: object; transition?: object },
  prefersReduced: boolean
) {
  if (prefersReduced) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: preset.exit ? { opacity: 0 } : undefined,
      transition: { duration: 0.01 },
    };
  }
  return preset;
}
