import { ref, onMounted, onUnmounted, type Ref } from 'vue';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface UseCountUpOptions {
  /** Animation duration in ms (default: 2000) */
  duration?: number;
  /** Only begin when the element is visible (default: true) */
  triggerOnView?: boolean;
  /** Easing function (default: easeOutCubic) */
  easing?: (t: number) => number;
  /** Decimal places (default: 0) */
  decimals?: number;
  /** Starting value (default: 0) */
  start?: number;
}

/* ------------------------------------------------------------------ */
/*  Composable                                                          */
/* ------------------------------------------------------------------ */

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * useCountUp — animate a number from `start` to `target` via rAF.
 *
 * @example
 * const { value, elRef } = useCountUp(12345, { duration: 2500 });
 * <span ref="elRef">{{ value.toLocaleString() }}</span>
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

  const value = ref(start);
  const elRef: Ref<HTMLElement | null> = ref(null);
  let hasStarted = false;
  let observer: IntersectionObserver | null = null;

  const animate = () => {
    if (hasStarted) return;
    hasStarted = true;

    const startTime = performance.now();
    const delta = target - start;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easing(progress);
      value.value = Number((start + delta * easedProgress).toFixed(decimals));

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  onMounted(() => {
    if (!triggerOnView) {
      animate();
      return;
    }

    const el = elRef.value;
    if (!el) return;

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
          observer?.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
  });

  onUnmounted(() => {
    observer?.disconnect();
  });

  return { value, elRef };
}
