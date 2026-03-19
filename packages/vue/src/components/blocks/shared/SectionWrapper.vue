<script setup lang="ts">
/**
 * SectionWrapper — consistent padding, background slot, and container
 * max-width for every block section.
 *
 * @example
 * <SectionWrapper padding="hero">
 *   <template #background><BackgroundBeams /></template>
 *   <HeroCentered ... />
 * </SectionWrapper>
 */

import { computed } from 'vue';
import { cn } from '@archui/core';

type SectionPadding = 'none' | 'compact' | 'default' | 'hero';

interface SectionWrapperProps {
  /** Remove the max-width container, allow full bleed */
  fullWidth?: boolean;
  /** Vertical padding preset */
  padding?: SectionPadding;
  /** HTML id for scroll-to anchoring */
  id?: string;
  /** Additional CSS classes */
  class?: string;
}

const props = withDefaults(defineProps<SectionWrapperProps>(), {
  fullWidth: false,
  padding: 'default',
});

const paddingClasses: Record<SectionPadding, string> = {
  none: '',
  compact: 'py-10 lg:py-16',
  default: 'py-16 lg:py-24',
  hero: 'py-20 lg:py-32',
};

const sectionClasses = computed(() =>
  cn('relative w-full overflow-hidden', paddingClasses[props.padding], props.class)
);

const containerClasses = computed(() =>
  cn('relative z-10', !props.fullWidth && 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8')
);
</script>

<template>
  <section :id="id" :class="sectionClasses">
    <!-- Background layer -->
    <div v-if="$slots.background" class="absolute inset-0 z-0" aria-hidden="true">
      <slot name="background" />
    </div>

    <!-- Content layer -->
    <div :class="containerClasses">
      <slot />
    </div>
  </section>
</template>
