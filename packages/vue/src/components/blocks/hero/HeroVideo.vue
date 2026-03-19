<script setup lang="ts">
/**
 * HeroVideo — Full-viewport hero with looping background video.
 */

import { cn } from '@archui/core';

export interface HeroVideoProps {
  heading: string;
  subheading?: string;
  videoSrc: string;
  poster?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  overlayOpacity?: number;
  class?: string;
}

const props = withDefaults(defineProps<HeroVideoProps>(), {
  overlayOpacity: 50,
});
</script>

<template>
  <section :class="cn('relative w-full min-h-screen flex items-center justify-center overflow-hidden', props.class)">
    <video
      autoplay muted loop playsinline
      :poster="poster"
      class="absolute inset-0 w-full h-full object-cover"
      aria-hidden="true"
    >
      <source :src="videoSrc" type="video/mp4" />
    </video>

    <div class="absolute inset-0 bg-black" :style="{ opacity: overlayOpacity / 100 }" aria-hidden="true" />

    <div class="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h1 :class="cn('text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.08] text-white')">
        {{ heading }}
      </h1>

      <p v-if="subheading" class="mt-6 text-lg lg:text-xl leading-relaxed max-w-2xl text-white/80">
        {{ subheading }}
      </p>

      <div class="flex flex-wrap justify-center gap-4 mt-10">
        <a
          v-if="primaryCta"
          :href="primaryCta.href"
          :class="cn(
            'inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-sm font-medium',
            'bg-white text-slate-900 hover:bg-white/90 hover:-translate-y-[1px]',
            'active:scale-[0.97] active:transition-transform active:duration-75',
            'shadow-[0_4px_20px_-4px_rgba(255,255,255,0.3)] transition-all duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black'
          )"
        >{{ primaryCta.label }}</a>

        <a
          v-if="secondaryCta"
          :href="secondaryCta.href"
          :class="cn(
            'inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-sm font-medium',
            'bg-transparent border border-white/30 text-white',
            'hover:bg-white/10 hover:border-white/50 hover:-translate-y-[1px]',
            'active:scale-[0.97] active:transition-transform active:duration-75 transition-all duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black'
          )"
        >{{ secondaryCta.label }}</a>
      </div>
    </div>
  </section>
</template>
