<script setup lang="ts">
/**
 * GlassBadge - Premium glassmorphic badge component for Vue 3
 */

import { computed } from 'vue';
import { cn } from '@archui/core';

interface GlassBadgeProps {
  label?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  dotColor?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  pulse?: boolean;
  closable?: boolean;
  pill?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<GlassBadgeProps>(), {
  variant: 'default',
  size: 'md',
  dot: false,
  pulse: false,
  closable: false,
  pill: true,
});

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const variantClasses = computed(() => {
  const variants = {
    default: [
      'bg-white/80 dark:bg-white/10',
      'border-black/5 dark:border-white/15',
      'text-slate-800 dark:text-white',
      'shadow-sm',
    ],
    primary: [
      'bg-blue-500/10 dark:bg-blue-500/20',
      'text-blue-700 dark:text-blue-300',
      'border-blue-500/20 dark:border-blue-400/30',
    ],
    secondary: [
      'bg-purple-500/10 dark:bg-purple-500/20',
      'text-purple-700 dark:text-purple-300',
      'border-purple-500/20 dark:border-purple-400/30',
    ],
    success: [
      'bg-emerald-500/10 dark:bg-emerald-500/20',
      'text-emerald-700 dark:text-emerald-300',
      'border-emerald-500/20 dark:border-emerald-400/30',
    ],
    warning: [
      'bg-amber-500/10 dark:bg-amber-500/20',
      'text-amber-800 dark:text-amber-300',
      'border-amber-500/20 dark:border-amber-400/30',
    ],
    error: [
      'bg-red-500/10 dark:bg-red-500/20',
      'text-red-700 dark:text-red-300',
      'border-red-500/20 dark:border-red-400/30',
    ],
    outline: [
      'bg-transparent',
      'border-black/15 dark:border-white/20',
      'text-slate-700 dark:text-slate-200',
    ],
    glass: [
      'bg-white/40 dark:bg-white/[0.08]',
      'border-white/40 dark:border-white/10',
      'text-slate-900 dark:text-white',
      'shadow-sm backdrop-blur-md',
    ],
  };
  return variants[props.variant];
});

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  };
  return sizes[props.size];
});

const dotColorClasses = computed(() => {
  const colors = {
    default: 'bg-slate-500 dark:bg-slate-400',
    primary: 'bg-blue-500 dark:bg-blue-400',
    secondary: 'bg-purple-500 dark:bg-purple-400',
    success: 'bg-emerald-500 dark:bg-emerald-400',
    warning: 'bg-amber-500 dark:bg-amber-400',
    error: 'bg-red-500 dark:bg-red-400',
  };
  const activeDotColor = props.dotColor || (props.variant === 'glass' || props.variant === 'outline' ? 'default' : props.variant);
  return colors[activeDotColor as keyof typeof colors];
});

const badgeClasses = computed(() => {
  return cn(
    'inline-flex items-center gap-1.5',
    'font-medium',
    'backdrop-blur-sm',
    'border',
    'transition-all duration-200',
    props.pill ? 'rounded-full' : 'rounded-md',
    sizeClasses.value,
    variantClasses.value,
    props.class
  );
});

const handleClose = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
  emit('close');
};
</script>

<template>
  <span :class="badgeClasses">
    <!-- Dot indicator -->
    <span v-if="dot" class="relative flex h-1.5 w-1.5 shrink-0">
      <span
        v-if="pulse"
        :class="cn('absolute inline-flex h-full w-full animate-ping rounded-full opacity-75', dotColorClasses)"
      />
      <span
        :class="cn('relative inline-flex h-1.5 w-1.5 rounded-full', dotColorClasses)"
      />
    </span>
    
    <!-- Icon -->
    <span v-if="$slots.icon" class="shrink-0">
      <slot name="icon"></slot>
    </span>
    
    <!-- Label -->
    <span v-if="label || $slots.default">
      <slot>{{ label }}</slot>
    </span>
    
    <!-- Close button -->
    <button
      v-if="closable"
      type="button"
      :class="cn(
        'ml-0.5 -mr-1 p-0.5 rounded-full shrink-0',
        'hover:bg-black/10 dark:hover:bg-white/20',
        'transition-colors duration-150 outline-none',
        'focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-1'
      )"
      @click="handleClose"
      aria-label="Remove badge"
    >
      <svg
        class="w-3 h-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </span>
</template>
