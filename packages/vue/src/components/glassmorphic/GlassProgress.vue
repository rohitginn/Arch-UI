<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@archui/core';

type ProgressColor = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'gradient';

interface Props {
  value?: number;
  max?: number;
  variant?: 'default' | 'glass';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: ProgressColor;
  showValue?: boolean;
  label?: string;
  indeterminate?: boolean;
  animated?: boolean;
  striped?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  max: 100,
  variant: 'default',
  size: 'md',
  color: 'primary',
  animated: false,
  striped: false,
});

const percentage = computed(() => {
  return Math.min(100, Math.max(0, (props.value / props.max) * 100));
});

const containerClasses = computed(() => {
  return cn(
    'relative overflow-hidden rounded-full transition-all duration-300',
    {
      'bg-slate-200 dark:bg-slate-800': props.variant === 'default',
      'bg-white/40 dark:bg-white/10 backdrop-blur-sm border border-white/20': props.variant === 'glass',
    },
    {
      'h-1': props.size === 'xs',
      'h-2': props.size === 'sm',
      'h-3': props.size === 'md',
      'h-4': props.size === 'lg',
      'h-5': props.size === 'xl',
    }
  );
});

const indicatorClasses = computed(() => {
  const colorMap = {
    default: 'bg-slate-900 dark:bg-white',
    primary: 'bg-blue-600 dark:bg-blue-500',
    success: 'bg-emerald-600 dark:bg-emerald-500',
    warning: 'bg-amber-600 dark:bg-amber-500',
    error: 'bg-red-600 dark:bg-red-500',
    gradient: 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500',
  };

  return cn(
    'h-full rounded-full transition-all duration-500 ease-out',
    colorMap[props.color],
    props.striped && 'bg-[length:1rem_1rem] bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)]',
    props.animated && props.striped && 'animate-[progress-stripes_1s_linear_infinite]',
    props.animated && props.color === 'gradient' && !props.striped && 'animate-[gradient-shift_2s_ease_infinite] bg-[length:200%_100%]',
    props.indeterminate && 'w-1/3 animate-[indeterminate_1.5s_ease-in-out_infinite]',
    props.class
  );
});
</script>

<template>
  <div class="w-full space-y-1.5">
    <div v-if="label || showValue" class="flex justify-between items-center text-sm">
      <span v-if="label" class="font-medium text-slate-500 dark:text-slate-400">
        {{ label }}
      </span>
      <span v-if="showValue && !indeterminate" class="text-slate-400 dark:text-slate-500 tabular-nums">
        {{ Math.round(percentage) }}%
      </span>
    </div>

    <div
      role="progressbar"
      :aria-valuenow="indeterminate ? undefined : value"
      :aria-valuemin="0"
      :aria-valuemax="max"
      :aria-label="label"
      :class="containerClasses"
    >
      <div
        :class="indicatorClasses"
        :style="!indeterminate ? { width: `${percentage}%` } : undefined"
      />
    </div>
  </div>
</template>

<style>
@keyframes progress-stripes {
  0% { background-position: 1rem 0; }
  100% { background-position: 0 0; }
}
@keyframes indeterminate {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
}
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
</style>
