<script setup lang="ts">
/**
 * HeroMinimal — Maximum whitespace, just typography and a single CTA.
 */

import { cn } from '@archui/core';

export interface HeroMinimalProps {
  heading: string;
  subheading?: string;
  cta?: { label: string; href: string };
  class?: string;
}

const props = defineProps<HeroMinimalProps>();
</script>

<template>
  <SectionWrapper padding="hero" :class="cn('py-32 lg:py-48', props.class)">
    <template #background><slot name="background" /></template>

    <div class="flex flex-col items-center text-center max-w-4xl mx-auto">
      <h1 :class="cn('text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]', 'text-slate-900 dark:text-white')">
        {{ heading }}
      </h1>

      <p
        v-if="subheading"
        :class="cn('mt-8 text-xl lg:text-2xl leading-relaxed max-w-xl', 'text-slate-500 dark:text-slate-400')"
      >{{ subheading }}</p>

      <a
        v-if="cta"
        :href="cta.href"
        :class="cn(
          'mt-12 inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-sm font-medium',
          'bg-slate-900 text-white hover:bg-slate-800 hover:-translate-y-[1px]',
          'active:scale-[0.97] active:transition-transform active:duration-75 transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2',
          'dark:bg-white dark:text-slate-900 dark:hover:bg-white/90'
        )"
      >{{ cta.label }}</a>
    </div>
  </SectionWrapper>
</template>

<script lang="ts">
import SectionWrapper from '../shared/SectionWrapper.vue';
</script>
