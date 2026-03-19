<script setup lang="ts">
/**
 * FeaturesGrid — Card grid of feature items with icons.
 */

import { cn } from '@archui/core';

interface FeatureItem {
  title: string;
  description: string;
}

export interface FeaturesGridProps {
  heading?: string;
  subheading?: string;
  badge?: string;
  features: FeatureItem[];
  columns?: 2 | 3 | 4;
  class?: string;
}

const props = withDefaults(defineProps<FeaturesGridProps>(), {
  columns: 3,
});

const colClasses: Record<number, string> = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-2 lg:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-4',
};
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

    <div :class="cn('grid grid-cols-1 gap-6', colClasses[columns])">
      <div
        v-for="(feature, i) in features"
        :key="i"
        :class="cn(
          'group relative flex flex-col gap-4 p-6 rounded-xl',
          'border border-black/[0.06] bg-white/60 backdrop-blur-sm',
          'dark:border-white/[0.08] dark:bg-white/[0.04]',
          'transition-all duration-300',
          'hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.1)] hover:-translate-y-[2px]',
          'dark:hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.3)] dark:hover:border-white/[0.15]'
        )"
      >
        <div :class="cn(
          'flex items-center justify-center w-10 h-10 rounded-lg',
          'bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400',
          'transition-colors duration-200 group-hover:bg-blue-500/15 dark:group-hover:bg-blue-400/15'
        )">
          <slot :name="`icon-${i}`" />
        </div>

        <h3 class="text-base font-semibold text-slate-900 dark:text-white">{{ feature.title }}</h3>
        <p class="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{{ feature.description }}</p>
      </div>
    </div>
  </SectionWrapper>
</template>

<script lang="ts">
import SectionWrapper from '../shared/SectionWrapper.vue';
import SectionHeading from '../shared/SectionHeading.vue';
</script>
