<script setup lang="ts">
/**
 * FeaturesAlternating — Full-width rows alternating image left/right.
 */

import { cn } from '@archui/core';

interface AlternatingFeature {
  title: string;
  description: string;
  image: { src: string; alt: string };
  bullets?: string[];
}

export interface FeaturesAlternatingProps {
  heading?: string;
  subheading?: string;
  badge?: string;
  features: AlternatingFeature[];
  class?: string;
}

const props = defineProps<FeaturesAlternatingProps>();
</script>

<template>
  <SectionWrapper :class="props.class">
    <template #background><slot name="background" /></template>

    <SectionHeading
      v-if="heading || subheading"
      :heading="heading!"
      :subheading="subheading"
      :badge="badge"
    />

    <div class="flex flex-col gap-20 lg:gap-28">
      <div
        v-for="(feature, i) in features"
        :key="i"
        :class="cn(
          'grid grid-cols-1 lg:grid-cols-2 gap-12 items-center',
          i % 2 !== 0 && 'lg:[direction:rtl] lg:[&>*]:[direction:ltr]'
        )"
      >
        <div class="flex flex-col gap-4">
          <h3 class="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{{ feature.title }}</h3>
          <p class="text-lg leading-relaxed text-slate-600 dark:text-slate-400">{{ feature.description }}</p>
          <ul v-if="feature.bullets?.length" class="mt-4 flex flex-col gap-3">
            <li
              v-for="(bullet, bi) in feature.bullets"
              :key="bi"
              class="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300"
            >
              <svg class="mt-0.5 h-5 w-5 shrink-0 text-emerald-500 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              {{ bullet }}
            </li>
          </ul>
        </div>

        <div :class="cn(
          'rounded-2xl overflow-hidden border border-black/[0.06] dark:border-white/[0.08]',
          'shadow-[0_16px_50px_-12px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_50px_-12px_rgba(0,0,0,0.4)]',
          'bg-white/60 dark:bg-white/[0.04]'
        )">
          <img :src="feature.image.src" :alt="feature.image.alt" class="w-full h-auto object-cover" loading="lazy" />
        </div>
      </div>
    </div>
  </SectionWrapper>
</template>

<script lang="ts">
import SectionWrapper from '../shared/SectionWrapper.vue';
import SectionHeading from '../shared/SectionHeading.vue';
</script>
