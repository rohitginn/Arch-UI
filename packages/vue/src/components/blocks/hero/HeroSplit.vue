<script setup lang="ts">
/**
 * HeroSplit — Two-column hero with copy left and image right (or reversed).
 */

import { cn } from '@archui/core';

export interface HeroSplitProps {
  badge?: string;
  heading: string;
  subheading: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  image: { src: string; alt: string };
  imageRotation?: number;
  reversed?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<HeroSplitProps>(), {
  imageRotation: 3,
  reversed: false,
});
</script>

<template>
  <SectionWrapper padding="hero" :class="props.class">
    <template #background><slot name="background" /></template>

    <div
      :class="cn(
        'grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center',
        reversed && 'lg:[direction:rtl] lg:[&>*]:[direction:ltr]'
      )"
    >
      <!-- Copy -->
      <div class="flex flex-col gap-6">
        <span
          v-if="badge"
          :class="cn(
            'inline-flex self-start items-center',
            'rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase',
            'bg-blue-500/10 text-blue-600 border border-blue-500/20',
            'dark:bg-blue-400/10 dark:text-blue-400 dark:border-blue-400/20'
          )"
        >{{ badge }}</span>

        <h1 :class="cn('text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1]', 'text-slate-900 dark:text-white')">
          {{ heading }}
        </h1>

        <p :class="cn('text-lg lg:text-xl leading-relaxed max-w-lg', 'text-slate-600 dark:text-slate-400')">
          {{ subheading }}
        </p>

        <div class="flex flex-wrap gap-4 mt-2">
          <a
            :href="primaryCta.href"
            :class="cn(
              'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium',
              'bg-blue-600 text-white border border-blue-700',
              'hover:bg-blue-700 hover:-translate-y-[1px]',
              'active:scale-[0.97] active:transition-transform active:duration-75',
              'shadow-[0_2px_8px_-2px_rgba(59,130,246,0.5)] transition-all duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
              'dark:bg-blue-500 dark:border-blue-400/30 dark:hover:bg-blue-400'
            )"
          >{{ primaryCta.label }}</a>

          <a
            v-if="secondaryCta"
            :href="secondaryCta.href"
            :class="cn(
              'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium',
              'bg-transparent border border-slate-300 text-slate-700',
              'hover:bg-slate-50 hover:border-slate-400 hover:-translate-y-[1px]',
              'active:scale-[0.97] active:transition-transform active:duration-75 transition-all duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2',
              'dark:border-white/20 dark:text-white dark:hover:bg-white/[0.06] dark:hover:border-white/30'
            )"
          >{{ secondaryCta.label }}</a>
        </div>
      </div>

      <!-- Image -->
      <div class="flex justify-center lg:justify-end">
        <div
          :class="cn(
            'relative rounded-2xl overflow-hidden',
            'border border-white/40 dark:border-white/10',
            'shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]',
            'dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]',
            'bg-white/60 dark:bg-white/[0.06] backdrop-blur-sm transition-transform duration-500'
          )"
          :style="{ transform: `rotate(${imageRotation}deg)` }"
        >
          <img
            :src="image.src"
            :alt="image.alt"
            class="w-full h-auto max-w-md lg:max-w-lg object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </SectionWrapper>
</template>

<script lang="ts">
import SectionWrapper from '../shared/SectionWrapper.vue';
</script>
