<script setup lang="ts">
/**
 * GlassRating - Premium glassmorphic star rating for Vue 3
 *
 * Features:
 * - Interactive star selection with hover preview
 * - Half-star support
 * - Keyboard navigation (arrows, home, end)
 * - Read-only and disabled modes
 * - Golden glow on filled stars
 * - Full ARIA slider semantics
 */

import { ref, computed, watch } from 'vue';
import { cn } from '@archui/core';

interface GlassRatingProps {
  modelValue?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  allowHalf?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  activeColor?: string;
  inactiveColor?: string;
  label?: string;
  showValue?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<GlassRatingProps>(), {
  max: 5,
  size: 'md',
  allowHalf: false,
  readOnly: false,
  disabled: false,
  activeColor: 'text-amber-400',
  inactiveColor: 'text-text-muted',
  label: 'Rating',
  showValue: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
  (e: 'change', value: number): void;
}>();

const internalValue = ref(props.modelValue ?? 0);
const hoverValue = ref<number | null>(null);

watch(() => props.modelValue, (newVal) => {
  if (newVal !== undefined) internalValue.value = newVal;
});

const displayValue = computed(() => hoverValue.value !== null ? hoverValue.value : internalValue.value);

const sizeClasses: Record<string, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-7 h-7',
};
const gapClasses: Record<string, string> = {
  sm: 'gap-0.5',
  md: 'gap-1',
  lg: 'gap-1.5',
};

const handleClick = (starValue: number) => {
  if (props.readOnly || props.disabled) return;
  const newValue = internalValue.value === starValue ? 0 : starValue;
  internalValue.value = newValue;
  emit('update:modelValue', newValue);
  emit('change', newValue);
};

const handleMouseEnter = (starValue: number) => {
  if (props.readOnly || props.disabled) return;
  hoverValue.value = starValue;
};

const handleMouseLeave = () => { hoverValue.value = null; };

const handleKeydown = (e: KeyboardEvent) => {
  if (props.readOnly || props.disabled) return;
  const step = props.allowHalf ? 0.5 : 1;
  let newValue = internalValue.value;
  if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
    e.preventDefault(); newValue = Math.min(props.max, internalValue.value + step);
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
    e.preventDefault(); newValue = Math.max(0, internalValue.value - step);
  } else if (e.key === 'Home') {
    e.preventDefault(); newValue = 0;
  } else if (e.key === 'End') {
    e.preventDefault(); newValue = props.max;
  }
  if (newValue !== internalValue.value) {
    internalValue.value = newValue;
    emit('update:modelValue', newValue);
    emit('change', newValue);
  }
};

const isFilled = (i: number) => displayValue.value >= i;
const isHalf = (i: number) => props.allowHalf && !isFilled(i) && displayValue.value >= i - 0.5;
</script>

<template>
  <div
    role="slider"
    :aria-label="label"
    :aria-valuenow="internalValue"
    :aria-valuemin="0"
    :aria-valuemax="max"
    :tabindex="readOnly || disabled ? -1 : 0"
    :class="cn(
      'inline-flex items-center',
      gapClasses[size],
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-bg rounded-md',
      props.class
    )"
    @keydown="handleKeydown"
    @mouseleave="handleMouseLeave"
  >
    <button
      v-for="i in max"
      :key="i"
      type="button"
      :disabled="disabled"
      tabindex="-1"
      :class="cn(
        'relative transition-all duration-150 focus:outline-none',
        !readOnly && !disabled && 'cursor-pointer hover:scale-125 active:scale-95',
        disabled && 'cursor-not-allowed opacity-50',
        readOnly && 'cursor-default'
      )"
      @click="handleClick(allowHalf ? i - 0.5 : i)"
      @mouseenter="handleMouseEnter(i)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        :class="cn(
          sizeClasses[size],
          'transition-colors duration-200',
          (isFilled(i) || isHalf(i)) ? activeColor : inactiveColor,
          isFilled(i) && 'drop-shadow-[0_0_4px_rgba(251,191,36,0.4)]'
        )"
        :fill="isFilled(i) ? 'currentColor' : 'none'"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    </button>

    <span
      v-if="showValue"
      :class="cn(
        'ml-2 tabular-nums font-medium text-text-secondary',
        size === 'sm' && 'text-xs',
        size === 'md' && 'text-sm',
        size === 'lg' && 'text-base'
      )"
    >
      {{ allowHalf ? internalValue.toFixed(1) : internalValue.toFixed(0) }}
    </span>
  </div>
</template>
