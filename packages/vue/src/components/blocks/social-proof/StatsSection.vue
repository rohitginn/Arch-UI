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

export interface StatItem {
  value: number | string;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export interface StatsSectionProps {
  heading?: string;
  subheading?: string;
  stats: StatItem[];
  animated?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */

const props = withDefaults(defineProps<StatsSectionProps>(), {
  heading: undefined,
  subheading: undefined,
  animated: true,
});

/* ------------------------------------------------------------------ */
/*  Count-up logic                                                      */
/* ------------------------------------------------------------------ */

const displayValues = ref<(number | string)[]>(
  props.stats.map((s) => (typeof s.value === 'number' && props.animated ? 0 : s.value))
);

const containerRef = ref<HTMLDivElement | null>(null);
let observer: IntersectionObserver | undefined;
let hasAnimated = false;

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function animateCountUp() {
  if (hasAnimated) return;
  hasAnimated = true;

  props.stats.forEach((stat, i) => {
    if (typeof stat.value !== 'number') return;

    const target = stat.value;
    const decimals = stat.decimals ?? 0;
    const duration = 2000;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const current = easeOut(progress) * target;
      displayValues.value[i] = Number(current.toFixed(decimals));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  });
}

onMounted(() => {
  if (!props.animated || !containerRef.value) return;

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) animateCountUp();
    },
    { threshold: 0.3 }
  );

  observer.observe(containerRef.value);
});

onUnmounted(() => {
  observer?.disconnect();
});

const gridClasses = computed(() =>
  cn(
    'grid gap-6 mx-auto max-w-5xl',
    props.stats.length <= 2 && 'md:grid-cols-2',
    props.stats.length === 3 && 'md:grid-cols-3',
    props.stats.length >= 4 && 'md:grid-cols-2 lg:grid-cols-4'
  )
);
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

    <div ref="containerRef" :class="gridClasses">
      <div
        v-for="(stat, i) in stats"
        :key="i"
        :class="cn(
          'flex flex-col items-center rounded-2xl p-6 md:p-8',
          'border border-[var(--glass-edge)]',
          'bg-[var(--glass-surface)] backdrop-blur-md',
          'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'
        )"
      >
        <div class="text-4xl md:text-5xl font-bold text-[var(--glass-text)] mb-2">
          {{ stat.prefix }}{{ displayValues[i] }}{{ stat.suffix }}
        </div>
        <div class="text-sm text-[var(--glass-text)]/60 font-medium">
          {{ stat.label }}
        </div>
      </div>
    </div>
  </SectionWrapper>
</template>
