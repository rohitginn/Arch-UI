<script setup lang="ts">
/**
 * GlassCircularProgress - Determinate / indeterminate circular indicator
 */
import { computed } from 'vue';
import { cn } from '@archui/core';

interface GlassCircularProgressProps {
  value?: number;
  size?: number;
  strokeWidth?: number;
  showValue?: boolean;
  label?: string;
  color?: 'accent' | 'success' | 'warning' | 'error';
  class?: string;
}

const props = withDefaults(defineProps<GlassCircularProgressProps>(), {
  value: undefined,
  size: 48,
  strokeWidth: 4,
  showValue: false,
  color: 'accent',
});

const indeterminate = computed(() => props.value === undefined);
const radius = computed(() => (props.size - props.strokeWidth) / 2);
const circumference = computed(() => 2 * Math.PI * radius.value);
const progress = computed(() =>
  indeterminate.value ? 0.25 : Math.min(Math.max(props.value ?? 0, 0), 100) / 100,
);
const offset = computed(() => circumference.value * (1 - progress.value));

const colorMap: Record<string, { track: string; indicator: string }> = {
  accent: {
    track: 'stroke-[var(--accent-subtle,#dbeafe)] dark:stroke-[rgba(255,255,255,0.08)]',
    indicator: 'stroke-[var(--accent-primary,#3b82f6)]',
  },
  success: {
    track: 'stroke-emerald-100 dark:stroke-[rgba(255,255,255,0.08)]',
    indicator: 'stroke-[var(--glass-success,#22c55e)]',
  },
  warning: {
    track: 'stroke-amber-100 dark:stroke-[rgba(255,255,255,0.08)]',
    indicator: 'stroke-[var(--glass-warning,#f59e0b)]',
  },
  error: {
    track: 'stroke-red-100 dark:stroke-[rgba(255,255,255,0.08)]',
    indicator: 'stroke-[var(--glass-error,#ef4444)]',
  },
};

const colors = computed(() => colorMap[props.color] || colorMap.accent);
const displayValue = computed(() => `${Math.round(progress.value * 100)}%`);
</script>

<template>
  <div
    role="progressbar"
    :aria-valuemin="0"
    :aria-valuemax="100"
    :aria-valuenow="indeterminate ? undefined : Math.round(progress * 100)"
    :class="cn('relative inline-flex items-center justify-center', $props.class)"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <svg
      :viewBox="`0 0 ${size} ${size}`"
      :class="cn(indeterminate && 'animate-spin', 'transition-transform duration-300')"
      :style="{ width: `${size}px`, height: `${size}px` }"
    >
      <!-- Track -->
      <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        fill="none"
        :stroke-width="strokeWidth"
        :class="colors.track"
      />
      <!-- Indicator -->
      <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        fill="none"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        :class="cn(colors.indicator, 'transition-all duration-500 ease-out')"
        :style="{
          strokeDasharray: circumference,
          strokeDashoffset: offset,
          transform: 'rotate(-90deg)',
          transformOrigin: '50% 50%',
        }"
      />
    </svg>
    <!-- Center content -->
    <span
      v-if="(showValue || label) && !indeterminate"
      :class="cn(
        'absolute text-xs font-semibold',
        'text-[var(--glass-text,#0f172a)] dark:text-[var(--glass-text,#f8fafc)]',
      )"
    >
      {{ label ?? displayValue }}
    </span>
  </div>
</template>
