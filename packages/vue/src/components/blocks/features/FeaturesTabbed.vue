<script setup lang="ts">
/**
 * FeaturesTabbed — Tabs on the left, content panel on the right.
 */

import { ref } from 'vue';
import { cn } from '@archui/core';

interface TabbedFeature {
  label: string;
  title: string;
  description: string;
  image: { src: string; alt: string };
}

export interface FeaturesTabbedProps {
  heading?: string;
  subheading?: string;
  badge?: string;
  features: TabbedFeature[];
  class?: string;
}

const props = defineProps<FeaturesTabbedProps>();
const activeIndex = ref(0);
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

    <div class="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
      <!-- Tab list -->
      <div role="tablist" class="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
        <button
          v-for="(f, i) in features"
          :key="i"
          role="tab"
          :aria-selected="i === activeIndex"
          @click="activeIndex = i"
          :class="cn(
            'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap cursor-pointer select-none transition-all duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
            i === activeIndex
              ? 'bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400 border border-blue-500/20 dark:border-blue-400/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-black/[0.03] dark:hover:bg-white/[0.05] border border-transparent'
          )"
        >
          <slot :name="`tab-icon-${i}`" />
          {{ f.label }}
        </button>
      </div>

      <!-- Content panel -->
      <div role="tabpanel" :key="activeIndex" class="flex flex-col gap-6">
        <div class="flex flex-col gap-3">
          <h3 class="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white">{{ features[activeIndex].title }}</h3>
          <p class="text-base leading-relaxed text-slate-600 dark:text-slate-400 max-w-xl">{{ features[activeIndex].description }}</p>
        </div>
        <div :class="cn(
          'rounded-xl overflow-hidden border border-black/[0.06] dark:border-white/[0.08]',
          'shadow-[0_12px_40px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.35)]',
          'bg-white/60 dark:bg-white/[0.04]'
        )">
          <img :src="features[activeIndex].image.src" :alt="features[activeIndex].image.alt" class="w-full h-auto object-cover" loading="lazy" />
        </div>
      </div>
    </div>
  </SectionWrapper>
</template>

<script lang="ts">
import SectionWrapper from '../shared/SectionWrapper.vue';
import SectionHeading from '../shared/SectionHeading.vue';
</script>
