<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@archui/core';

interface GlassSpinnerProps {
  variant?: 'ring' | 'dots' | 'pulse' | 'bars' | 'orbit';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'default' | 'primary' | 'white' | 'current';
  label?: string;
  class?: string;
}

const props = withDefaults(defineProps<GlassSpinnerProps>(), {
  variant: 'ring',
  size: 'md',
  color: 'primary',
  label: 'Loading...'
});

const sizeClasses = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

const colorClasses = {
  default: 'text-slate-500 dark:text-slate-400',
  primary: 'text-blue-600 dark:text-blue-400',
  white: 'text-white',
  current: 'text-current',
};

const spinnerClasses = computed(() => {
  return cn(
    'inline-flex items-center justify-center',
    sizeClasses[props.size],
    props.class
  );
});

const activeColor = computed(() => colorClasses[props.color]);
</script>

<template>
  <!-- Ring -->
  <div v-if="variant === 'ring'" :class="spinnerClasses" role="status" :aria-label="label">
    <svg :class="cn('animate-spin', activeColor)" viewBox="0 0 24 24" fill="none">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
    <span class="sr-only">{{ label }}</span>
  </div>

  <!-- Dots -->
  <div v-else-if="variant === 'dots'" :class="cn(spinnerClasses, 'gap-1', props.class)" role="status" :aria-label="label">
    <span v-for="i in 3" :key="i" :class="cn('w-1.5 h-1.5 rounded-full animate-bounce bg-current', activeColor)" :style="{ animationDelay: `${(i-1) * 0.15}s`, animationDuration: '0.6s' }" />
    <span class="sr-only">{{ label }}</span>
  </div>

  <!-- Pulse -->
  <div v-else-if="variant === 'pulse'" :class="spinnerClasses" role="status" :aria-label="label">
    <span :class="cn('w-full h-full rounded-full animate-ping bg-current opacity-75', activeColor)" />
    <span class="sr-only">{{ label }}</span>
  </div>

  <!-- Bars -->
  <div v-else-if="variant === 'bars'" :class="cn(spinnerClasses, 'gap-0.5 items-end', props.class)" role="status" :aria-label="label">
    <span v-for="i in 4" :key="i" :class="cn('w-1 rounded-sm bg-current animate-[bars_1.2s_ease-in-out_infinite]', activeColor)" :style="{ animationDelay: `${(i-1) * 0.1}s`, height: '60%' }" />
    <span class="sr-only">{{ label }}</span>
  </div>

  <!-- Orbit -->
  <div v-else-if="variant === 'orbit'" :class="cn(spinnerClasses, 'relative', props.class)" role="status" :aria-label="label">
    <span :class="cn('absolute w-full h-full rounded-full border-2 border-current opacity-20', activeColor)" />
    <span :class="cn('absolute w-2 h-2 rounded-full bg-current animate-[orbit_1s_linear_infinite] top-0 left-1/2 -translate-x-1/2 origin-[50%_calc(50%+var(--spinner-size)/2)]', activeColor)" style="--spinner-size: 100%" />
    <span class="sr-only">{{ label }}</span>
  </div>
</template>

<style>
@keyframes bars {
  0%, 40%, 100% { transform: scaleY(0.4); }
  20% { transform: scaleY(1); }
}
@keyframes orbit {
  0% { transform: translateX(-50%) rotate(0deg) translateY(-50%); }
  100% { transform: translateX(-50%) rotate(360deg) translateY(-50%); }
}
</style>
