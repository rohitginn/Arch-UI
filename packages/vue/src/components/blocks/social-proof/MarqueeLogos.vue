<script lang="ts">
import SectionWrapper from '../shared/SectionWrapper.vue';
</script>

<script setup lang="ts">
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface LogoItem {
  src: string;
  alt: string;
  href?: string;
}

export interface MarqueeLogosProps {
  logos: LogoItem[];
  speed?: 'slow' | 'normal' | 'fast';
  pauseOnHover?: boolean;
  direction?: 'left' | 'right';
  heading?: string;
}

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */

const props = withDefaults(defineProps<MarqueeLogosProps>(), {
  speed: 'normal',
  pauseOnHover: true,
  direction: 'left',
  heading: undefined,
});

const speedMap = { slow: '60s', normal: '40s', fast: '20s' } as const;
const duration = speedMap[props.speed];
</script>

<template>
  <SectionWrapper padding="compact">
    <template v-if="$slots.background" #background>
      <slot name="background" />
    </template>

    <p
      v-if="heading"
      class="text-center text-sm font-medium text-[var(--glass-text)]/50 mb-8 uppercase tracking-wider"
    >
      {{ heading }}
    </p>

    <div
      class="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
    >
      <div
        :class="cn(
          'flex w-max gap-12 items-center',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )"
        :style="{
          animation: `marquee-scroll ${duration} linear infinite`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }"
      >
        <template v-for="(logo, index) in [...logos, ...logos]" :key="index">
          <a
            v-if="logo.href"
            :href="logo.href"
            target="_blank"
            rel="noopener noreferrer"
            class="shrink-0"
          >
            <img
              :src="logo.src"
              :alt="logo.alt"
              class="h-8 md:h-10 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-200 grayscale hover:grayscale-0"
              loading="lazy"
            />
          </a>
          <div v-else class="shrink-0">
            <img
              :src="logo.src"
              :alt="logo.alt"
              class="h-8 md:h-10 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-200 grayscale hover:grayscale-0"
              loading="lazy"
            />
          </div>
        </template>
      </div>
    </div>
  </SectionWrapper>
</template>

<style scoped>
@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
</style>
