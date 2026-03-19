<script setup lang="ts">
/**
 * SectionHeading — Reusable heading + subheading pair with optional badge.
 *
 * @example
 * <SectionHeading heading="Features" subheading="Everything you need." badge="New" />
 */

import { computed } from 'vue';
import { cn } from '@archui/core';

interface SectionHeadingProps {
  heading: string;
  subheading?: string;
  badge?: string;
  align?: 'center' | 'left';
  class?: string;
}

const props = withDefaults(defineProps<SectionHeadingProps>(), {
  align: 'center',
});

const containerClasses = computed(() =>
  cn(
    'mb-12 lg:mb-16',
    props.align === 'center' && 'text-center',
    props.align === 'left' && 'text-left',
    props.class
  )
);
</script>

<template>
  <div :class="containerClasses">
    <!-- Badge pill -->
    <span
      v-if="badge"
      :class="cn(
        'inline-flex items-center mb-4',
        'rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase',
        'bg-blue-500/10 text-blue-600 border border-blue-500/20',
        'dark:bg-blue-400/10 dark:text-blue-400 dark:border-blue-400/20'
      )"
    >
      {{ badge }}
    </span>

    <!-- Heading -->
    <h2
      :class="cn(
        'text-3xl lg:text-4xl font-bold tracking-tight',
        'text-slate-900 dark:text-white'
      )"
    >
      {{ heading }}
    </h2>

    <!-- Subheading -->
    <p
      v-if="subheading"
      :class="cn(
        'mt-4 text-lg leading-relaxed',
        'text-slate-600 dark:text-slate-400',
        'max-w-2xl',
        align === 'center' && 'mx-auto'
      )"
    >
      {{ subheading }}
    </p>
  </div>
</template>
