<script lang="ts">
import SectionWrapper from '../shared/SectionWrapper.vue';
import SectionHeading from '../shared/SectionHeading.vue';
</script>

<script setup lang="ts">
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface Testimonial {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  avatar?: string;
  rating?: number;
}

export interface TestimonialsGridProps {
  heading?: string;
  subheading?: string;
  testimonials: Testimonial[];
  columns?: 2 | 3;
}

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */

withDefaults(defineProps<TestimonialsGridProps>(), {
  heading: undefined,
  subheading: undefined,
  columns: 3,
});
</script>

<template>
  <SectionWrapper padding="default">
    <template v-if="$slots.background" #background>
      <slot name="background" />
    </template>

    <SectionHeading
      v-if="heading || subheading"
      :heading="heading"
      :subheading="subheading"
      align="center"
      class="mb-12"
    />

    <div
      :class="cn(
        'grid gap-6',
        columns === 2 && 'md:grid-cols-2 max-w-4xl mx-auto',
        columns === 3 && 'md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto'
      )"
    >
      <div
        v-for="(t, i) in testimonials"
        :key="i"
        :class="cn(
          'flex flex-col rounded-2xl p-6',
          'border border-[var(--glass-edge)]',
          'bg-[var(--glass-surface)] backdrop-blur-md',
          'transition-all duration-300',
          'hover:-translate-y-1 hover:shadow-lg'
        )"
      >
        <!-- Rating -->
        <div v-if="t.rating" class="flex gap-0.5 mb-3">
          <svg
            v-for="si in 5"
            :key="si"
            :class="cn('h-4 w-4', si <= t.rating! ? 'text-amber-400' : 'text-[var(--glass-text)]/20')"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>

        <!-- Quote -->
        <blockquote class="flex-1 text-sm leading-relaxed text-[var(--glass-text)]/80 mb-4">
          &ldquo;{{ t.quote }}&rdquo;
        </blockquote>

        <!-- Author -->
        <div class="flex items-center gap-3">
          <img
            v-if="t.avatar"
            :src="t.avatar"
            :alt="t.name"
            class="h-10 w-10 rounded-full object-cover ring-2 ring-[var(--glass-edge)]"
          />
          <div
            v-else
            class="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--glass-accent)]/10 text-sm font-semibold text-[var(--glass-accent)]"
          >
            {{ t.name.charAt(0) }}
          </div>
          <div>
            <div class="text-sm font-semibold text-[var(--glass-text)]">{{ t.name }}</div>
            <div v-if="t.role || t.company" class="text-xs text-[var(--glass-text)]/50">
              {{ t.role }}{{ t.role && t.company ? ' · ' : '' }}{{ t.company }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </SectionWrapper>
</template>
