/**
 * Motion utilities composable for @zenui/vue
 *
 * Uses @vueuse/motion for spring-based animations.
 * Provides reusable animation presets and a reduced-motion hook.
 *
 * @example
 * ```vue
 * <script setup>
 * import { useMotionPresets } from '../composables/useMotion'
 * const { scalePreset, prefersReduced } = useMotionPresets()
 * </script>
 *
 * <template>
 *   <div v-motion="scalePreset.value">Content</div>
 * </template>
 * ```
 */

import { ref, onMounted, onUnmounted, computed } from 'vue';

/**
 * Detects user's prefers-reduced-motion setting.
 * Reactively updates on media query changes.
 */
export function usePrefersReducedMotion() {
  const prefersReduced = ref(false);

  let mediaQuery: MediaQueryList | null = null;

  const handler = (e: MediaQueryListEvent) => {
    prefersReduced.value = e.matches;
  };

  onMounted(() => {
    mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReduced.value = mediaQuery.matches;
    mediaQuery.addEventListener('change', handler);
  });

  onUnmounted(() => {
    mediaQuery?.removeEventListener('change', handler);
  });

  return prefersReduced;
}

/**
 * Returns @vueuse/motion compatible animation presets
 * that automatically respect prefers-reduced-motion.
 */
export function useMotionPresets() {
  const prefersReduced = usePrefersReducedMotion();

  /** Fade in/out */
  const fadePreset = computed(() =>
    prefersReduced.value
      ? { initial: { opacity: 0 }, enter: { opacity: 1, transition: { duration: 10 } } }
      : { initial: { opacity: 0 }, enter: { opacity: 1, transition: { duration: 150 } } }
  );

  /** Scale + fade (modal, popover) */
  const scalePreset = computed(() =>
    prefersReduced.value
      ? { initial: { opacity: 0 }, enter: { opacity: 1, transition: { duration: 10 } } }
      : {
          initial: { opacity: 0, scale: 0.96, y: 8 },
          enter: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 300, damping: 24 },
          },
        }
  );

  /** Slide up (dropdown, toast) */
  const slideUpPreset = computed(() =>
    prefersReduced.value
      ? { initial: { opacity: 0 }, enter: { opacity: 1, transition: { duration: 10 } } }
      : {
          initial: { opacity: 0, y: 16 },
          enter: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 300, damping: 24 },
          },
        }
  );

  /** Slide from right (notification, toast) */
  const slideRightPreset = computed(() =>
    prefersReduced.value
      ? { initial: { opacity: 0 }, enter: { opacity: 1, transition: { duration: 10 } } }
      : {
          initial: { opacity: 0, x: 80 },
          enter: {
            opacity: 1,
            x: 0,
            transition: { type: 'spring', stiffness: 250, damping: 22 },
          },
        }
  );

  /** Overlay backdrop */
  const overlayPreset = computed(() => ({
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: { duration: 200 } },
    leave: { opacity: 0, transition: { duration: 150 } },
  }));

  return {
    prefersReduced,
    fadePreset,
    scalePreset,
    slideUpPreset,
    slideRightPreset,
    overlayPreset,
  };
}
