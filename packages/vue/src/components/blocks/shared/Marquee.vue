<script setup lang="ts">
/**
 * Marquee — CSS-only infinite horizontal scroll.
 *
 * @example
 * <Marquee speed="fast" pause-on-hover>
 *   <img v-for="l in logos" :key="l.alt" :src="l.src" :alt="l.alt" class="h-8 mx-8" />
 * </Marquee>
 */

import { computed } from 'vue';
import { cn } from '@archui/core';

type MarqueeSpeed = 'slow' | 'normal' | 'fast';
type MarqueeDirection = 'left' | 'right';

interface MarqueeProps {
  speed?: MarqueeSpeed;
  direction?: MarqueeDirection;
  pauseOnHover?: boolean;
  fade?: boolean;
  repeat?: number;
  class?: string;
}

const props = withDefaults(defineProps<MarqueeProps>(), {
  speed: 'normal',
  direction: 'left',
  pauseOnHover: true,
  fade: true,
  repeat: 2,
});

const speedMap: Record<MarqueeSpeed, number> = {
  slow: 60,
  normal: 40,
  fast: 20,
};

const duration = computed(() => `${speedMap[props.speed]}s`);
const animDir = computed(() => (props.direction === 'left' ? 'normal' : 'reverse'));
const copies = computed(() => Array.from({ length: props.repeat + 1 }));
</script>

<template>
  <div :class="cn('group relative flex w-full overflow-hidden', props.class)">
    <!-- Gradient fade overlays -->
    <template v-if="fade">
      <div
        class="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-24 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-24 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent"
        aria-hidden="true"
      />
    </template>

    <!-- Scrolling tracks -->
    <div
      v-for="(_, i) in copies"
      :key="i"
      :class="cn(
        'flex shrink-0 items-center gap-4',
        'animate-[marquee_var(--marquee-duration)_linear_infinite]',
        pauseOnHover && 'group-hover:[animation-play-state:paused]'
      )"
      :style="{ '--marquee-duration': duration, animationDirection: animDir }"
      :aria-hidden="i > 0 ? 'true' : undefined"
    >
      <slot />
    </div>
  </div>
</template>
