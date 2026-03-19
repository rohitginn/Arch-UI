<script setup lang="ts">
/**
 * GlassCarousel - Premium glassmorphic carousel component for Vue 3
 *
 * Features:
 * - Smooth slide transitions
 * - Dot indicators & navigation arrows
 * - Auto-play with configurable interval
 * - Keyboard navigation
 * - Full accessibility (ARIA carousel pattern)
 */

import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { cn } from '@archui/core';

interface CarouselSlide {
  id: string;
  label?: string;
}

interface GlassCarouselProps {
  slides: CarouselSlide[];
  modelValue?: number;
  autoPlay?: boolean;
  interval?: number;
  loop?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<GlassCarouselProps>(), {
  autoPlay: false,
  interval: 5000,
  loop: true,
  showArrows: true,
  showDots: true,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
  (e: 'change', index: number): void;
}>();

const internalIndex = ref(props.modelValue ?? 0);
const isAnimating = ref(false);
let timer: ReturnType<typeof setInterval> | undefined;

watch(() => props.modelValue, (newVal) => {
  if (newVal !== undefined) internalIndex.value = newVal;
});

const totalSlides = computed(() => props.slides.length);

const goTo = (idx: number) => {
  if (isAnimating.value) return;
  let next = idx;
  if (props.loop) {
    next = ((idx % totalSlides.value) + totalSlides.value) % totalSlides.value;
  } else {
    next = Math.max(0, Math.min(idx, totalSlides.value - 1));
  }
  isAnimating.value = true;
  internalIndex.value = next;
  emit('update:modelValue', next);
  emit('change', next);
  setTimeout(() => { isAnimating.value = false; }, 500);
};

const goNext = () => goTo(internalIndex.value + 1);
const goPrev = () => goTo(internalIndex.value - 1);

// Auto-play
const startAutoPlay = () => {
  if (!props.autoPlay || totalSlides.value <= 1) return;
  timer = setInterval(goNext, props.interval);
};
const stopAutoPlay = () => { clearInterval(timer); };

onMounted(startAutoPlay);
onUnmounted(stopAutoPlay);
watch(() => props.autoPlay, (val) => { stopAutoPlay(); if (val) startAutoPlay(); });

// Keyboard
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
  if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
};
</script>

<template>
  <div
    role="region"
    aria-roledescription="carousel"
    aria-label="Image carousel"
    tabindex="0"
    :class="cn(
      'group relative w-full overflow-hidden rounded-2xl',
      'border border-surface-border bg-surface-bg-subtle/50 backdrop-blur-md dark:bg-surface-bg-subtle/10',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-focus',
      props.class
    )"
    @keydown="handleKeydown"
  >
    <!-- Slide track -->
    <div
      class="flex transition-transform duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
      :style="{ transform: `translateX(-${internalIndex * 100}%)` }"
    >
      <div
        v-for="(slide, i) in slides"
        :key="slide.id"
        role="group"
        aria-roledescription="slide"
        :aria-label="`Slide ${i + 1} of ${totalSlides}`"
        class="w-full flex-shrink-0"
      >
        <slot :name="slide.id" :slide="slide" :index="i" />
      </div>
    </div>

    <!-- Navigation arrows -->
    <template v-if="showArrows && totalSlides > 1">
      <button
        type="button"
        :disabled="!loop && internalIndex === 0"
        aria-label="Previous slide"
        :class="cn(
          'absolute left-3 top-1/2 -translate-y-1/2 z-20',
          'flex items-center justify-center w-10 h-10 rounded-full',
          'bg-surface-bg/70 backdrop-blur-md border border-surface-border',
          'text-text-primary shadow-lg',
          'transition-all duration-200',
          'hover:bg-surface-bg hover:scale-110',
          'opacity-0 group-hover:opacity-100',
          'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-focus'
        )"
        @click="goPrev"
      >
        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        type="button"
        :disabled="!loop && internalIndex === totalSlides - 1"
        aria-label="Next slide"
        :class="cn(
          'absolute right-3 top-1/2 -translate-y-1/2 z-20',
          'flex items-center justify-center w-10 h-10 rounded-full',
          'bg-surface-bg/70 backdrop-blur-md border border-surface-border',
          'text-text-primary shadow-lg',
          'transition-all duration-200',
          'hover:bg-surface-bg hover:scale-110',
          'opacity-0 group-hover:opacity-100',
          'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-focus'
        )"
        @click="goNext"
      >
        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </template>

    <!-- Dot indicators -->
    <div v-if="showDots && totalSlides > 1"
      class="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2"
    >
      <button
        v-for="(_, i) in slides"
        :key="i"
        type="button"
        :aria-label="`Go to slide ${i + 1}`"
        :class="cn(
          'rounded-full transition-all duration-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-focus',
          i === internalIndex
            ? 'w-6 h-2 bg-text-primary'
            : 'w-2 h-2 bg-text-muted hover:bg-text-secondary'
        )"
        @click="goTo(i)"
      />
    </div>
  </div>
</template>
