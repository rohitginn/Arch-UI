<script lang="ts">
import SectionWrapper from '../shared/SectionWrapper.vue';
import SectionHeading from '../shared/SectionHeading.vue';
</script>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface CarouselTestimonial {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  avatar?: string;
}

export interface TestimonialsCarouselProps {
  heading?: string;
  subheading?: string;
  testimonials: CarouselTestimonial[];
  autoPlay?: number;
}

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */

const props = withDefaults(defineProps<TestimonialsCarouselProps>(), {
  heading: undefined,
  subheading: undefined,
  autoPlay: 0,
});

/* ------------------------------------------------------------------ */
/*  State                                                               */
/* ------------------------------------------------------------------ */

const active = ref(0);
const count = computed(() => props.testimonials.length);
const current = computed(() => props.testimonials[active.value]);

function prev() {
  active.value = (active.value - 1 + count.value) % count.value;
}

function next() {
  active.value = (active.value + 1) % count.value;
}

let timer: ReturnType<typeof setInterval> | undefined;

onMounted(() => {
  if (props.autoPlay > 0 && count.value > 1) {
    timer = setInterval(next, props.autoPlay);
  }
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
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

    <div v-if="current" class="relative mx-auto max-w-3xl">
      <!-- Card -->
      <div
        :key="active"
        :class="cn(
          'rounded-2xl border border-[var(--glass-edge)] p-8 md:p-12',
          'bg-[var(--glass-surface)] backdrop-blur-md',
          'text-center',
          'animate-[fadeInUp_0.4s_ease-out]'
        )"
      >
        <!-- Quote icon -->
        <svg class="mx-auto mb-6 h-8 w-8 text-[var(--glass-accent)]/30" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
        </svg>

        <blockquote class="text-lg md:text-xl leading-relaxed text-[var(--glass-text)]/80 mb-8">
          &ldquo;{{ current.quote }}&rdquo;
        </blockquote>

        <!-- Author -->
        <div class="flex flex-col items-center gap-3">
          <img
            v-if="current.avatar"
            :src="current.avatar"
            :alt="current.name"
            class="h-12 w-12 rounded-full object-cover ring-2 ring-[var(--glass-edge)]"
          />
          <div
            v-else
            class="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--glass-accent)]/10 text-base font-semibold text-[var(--glass-accent)]"
          >
            {{ current.name.charAt(0) }}
          </div>
          <div>
            <div class="text-sm font-semibold text-[var(--glass-text)]">{{ current.name }}</div>
            <div v-if="current.role || current.company" class="text-xs text-[var(--glass-text)]/50">
              {{ current.role }}{{ current.role && current.company ? ' · ' : '' }}{{ current.company }}
            </div>
          </div>
        </div>
      </div>

      <!-- Prev / Next -->
      <template v-if="count > 1">
        <button
          type="button"
          aria-label="Previous testimonial"
          :class="cn(
            'absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-14',
            'flex h-10 w-10 items-center justify-center rounded-full',
            'border border-[var(--glass-edge)] bg-[var(--glass-surface)] backdrop-blur-md',
            'text-[var(--glass-text)] transition-all duration-200',
            'hover:shadow-lg',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--glass-accent)]'
          )"
          @click="prev"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          type="button"
          aria-label="Next testimonial"
          :class="cn(
            'absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-14',
            'flex h-10 w-10 items-center justify-center rounded-full',
            'border border-[var(--glass-edge)] bg-[var(--glass-surface)] backdrop-blur-md',
            'text-[var(--glass-text)] transition-all duration-200',
            'hover:shadow-lg',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--glass-accent)]'
          )"
          @click="next"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Dots -->
        <div class="mt-6 flex justify-center gap-2">
          <button
            v-for="(_, di) in testimonials"
            :key="di"
            type="button"
            :aria-label="`Go to testimonial ${di + 1}`"
            :class="cn(
              'h-2 rounded-full transition-all duration-200',
              di === active
                ? 'w-6 bg-[var(--glass-accent)]'
                : 'w-2 bg-[var(--glass-text)]/20 hover:bg-[var(--glass-text)]/40'
            )"
            @click="active = di"
          />
        </div>
      </template>
    </div>
  </SectionWrapper>
</template>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
