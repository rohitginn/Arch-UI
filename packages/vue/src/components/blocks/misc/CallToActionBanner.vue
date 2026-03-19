<script setup lang="ts">
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface CallToActionBannerProps {
  heading: string;
  subheading?: string;
  align?: 'center' | 'left';
}

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */

withDefaults(defineProps<CallToActionBannerProps>(), {
  subheading: undefined,
  align: 'center',
});
</script>

<template>
  <section
    :class="cn(
      'relative overflow-hidden rounded-2xl',
      'border border-[var(--glass-edge)]',
      'bg-[var(--glass-surface)] backdrop-blur-xl',
      'px-6 py-16 sm:px-12 sm:py-20',
    )"
  >
    <!-- Background slot -->
    <div v-if="$slots.background" class="absolute inset-0 pointer-events-none" aria-hidden="true">
      <slot name="background" />
    </div>

    <!-- Content -->
    <div
      :class="cn(
        'relative z-10 mx-auto max-w-3xl',
        align === 'center' ? 'text-center' : 'text-left',
      )"
    >
      <h2 class="text-2xl font-bold tracking-tight text-[var(--glass-text)] sm:text-3xl lg:text-4xl">
        {{ heading }}
      </h2>
      <p v-if="subheading" class="mt-4 text-base text-[var(--glass-text)]/60 sm:text-lg">
        {{ subheading }}
      </p>
      <div
        v-if="$slots.actions"
        :class="cn(
          'mt-8 flex flex-wrap gap-4',
          align === 'center' ? 'justify-center' : 'justify-start',
        )"
      >
        <slot name="actions" />
      </div>
    </div>
  </section>
</template>
