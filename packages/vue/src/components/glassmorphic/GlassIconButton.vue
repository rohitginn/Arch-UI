<script setup lang="ts">
/**
 * GlassIconButton - Square button with a single centered icon, no label.
 *
 * Built on top of GlassButton with icon sizing pre-applied.
 * Always requires an `aria-label` for accessibility compliance.
 *
 * @example
 * <GlassIconButton aria-label="Search" size="md" variant="default">
 *   <SearchIcon />
 * </GlassIconButton>
 */

import { computed } from 'vue';
import { cn } from '@archui/core';

interface GlassIconButtonProps {
  /** Accessible label — REQUIRED */
  ariaLabel: string;
  /** Visual variant */
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'outline' | 'solid';
  /** Button size */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Enable glow effect */
  glow?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Additional CSS classes */
  class?: string;
}

const props = withDefaults(defineProps<GlassIconButtonProps>(), {
  variant: 'default',
  size: 'md',
  glow: false,
  disabled: false,
  loading: false,
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const sizeMap: Record<string, { button: string[]; icon: string }> = {
  xs: { button: ['h-7', 'w-7', 'rounded-lg'], icon: 'h-3.5 w-3.5' },
  sm: { button: ['h-8', 'w-8', 'rounded-lg'], icon: 'h-4 w-4' },
  md: { button: ['h-10', 'w-10', 'rounded-xl'], icon: 'h-5 w-5' },
  lg: { button: ['h-12', 'w-12', 'rounded-xl'], icon: 'h-6 w-6' },
};

// Variant classes — mirrors GlassButton Vue variant system
const variantClasses: Record<string, string[]> = {
  default: [
    'bg-white/80', 'backdrop-blur-md', 'border-black/[0.08]', 'text-slate-900',
    'shadow-[0_2px_4px_rgba(0,0,0,0.02),0_1px_0_rgba(255,255,255,0.5)_inset]',
    'hover:bg-white/90', 'hover:border-black/[0.12]',
    'hover:shadow-[0_4px_12px_rgba(0,0,0,0.05),0_1px_0_rgba(255,255,255,0.6)_inset]',
    'hover:-translate-y-[1px]',
    'focus-visible:ring-slate-500/30', 'focus-visible:ring-offset-white',
    'dark:bg-white/[0.08]', 'dark:border-white/[0.12]', 'dark:text-white',
    'dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]',
    'dark:hover:bg-white/[0.12]', 'dark:hover:border-white/[0.2]',
    'dark:focus-visible:ring-white/70', 'dark:focus-visible:ring-offset-slate-900',
  ],
  primary: [
    'bg-blue-600', 'border-blue-700', 'text-white',
    'shadow-sm', 'shadow-blue-600/20',
    'hover:bg-blue-700', 'hover:border-blue-800', 'hover:-translate-y-[1px]',
    'focus-visible:ring-blue-500', 'focus-visible:ring-offset-white',
    'dark:bg-blue-500/20', 'dark:border-blue-400/30', 'dark:text-white',
    'dark:hover:bg-blue-500/30', 'dark:hover:border-blue-400/40',
    'dark:focus-visible:ring-blue-400', 'dark:focus-visible:ring-offset-slate-900',
  ],
  ghost: [
    'bg-transparent', 'border-transparent', 'text-slate-700', 'shadow-none',
    'hover:bg-black/[0.05]', 'hover:text-slate-900',
    'focus-visible:ring-slate-400', 'focus-visible:ring-offset-0',
    'dark:text-slate-300', 'dark:hover:bg-white/[0.1]', 'dark:hover:text-white',
  ],
  outline: [
    'bg-transparent', 'border-slate-300', 'text-slate-700',
    'hover:bg-slate-50', 'hover:border-slate-400', 'hover:-translate-y-[1px]',
    'focus-visible:ring-slate-400', 'focus-visible:ring-offset-0',
    'dark:border-white/20', 'dark:text-white',
    'dark:hover:bg-white/[0.06]', 'dark:hover:border-white/30',
    'dark:focus-visible:ring-white/70', 'dark:focus-visible:ring-offset-slate-900',
  ],
  danger: [
    'bg-red-600', 'border-red-700', 'text-white',
    'shadow-sm', 'shadow-red-600/20',
    'hover:bg-red-700', 'hover:border-red-800', 'hover:-translate-y-[1px]',
    'focus-visible:ring-red-500', 'focus-visible:ring-offset-white',
    'dark:bg-red-500/20', 'dark:border-red-400/30', 'dark:text-white',
    'dark:hover:bg-red-500/30', 'dark:hover:border-red-400/40',
    'dark:focus-visible:ring-red-400', 'dark:focus-visible:ring-offset-slate-900',
  ],
  secondary: [
    'bg-purple-600', 'border-purple-700', 'text-white',
    'shadow-sm', 'shadow-purple-600/20',
    'hover:bg-purple-700', 'hover:border-purple-800', 'hover:-translate-y-[1px]',
    'focus-visible:ring-purple-500', 'focus-visible:ring-offset-white',
    'dark:bg-purple-500/20', 'dark:border-purple-400/30', 'dark:text-white',
    'dark:hover:bg-purple-500/30', 'dark:hover:border-purple-400/40',
    'dark:focus-visible:ring-purple-400', 'dark:focus-visible:ring-offset-slate-900',
  ],
  success: [
    'bg-green-600', 'border-green-700', 'text-white',
    'shadow-sm', 'shadow-green-600/20',
    'hover:bg-green-700', 'hover:border-green-800', 'hover:-translate-y-[1px]',
    'focus-visible:ring-green-500', 'focus-visible:ring-offset-white',
    'dark:bg-green-500/20', 'dark:border-green-400/30', 'dark:text-white',
    'dark:hover:bg-green-500/30', 'dark:hover:border-green-400/40',
    'dark:focus-visible:ring-green-400', 'dark:focus-visible:ring-offset-slate-900',
  ],
  warning: [
    'bg-amber-500', 'border-amber-600', 'text-white',
    'shadow-sm', 'shadow-amber-500/20',
    'hover:bg-amber-600', 'hover:border-amber-700', 'hover:-translate-y-[1px]',
    'focus-visible:ring-amber-500', 'focus-visible:ring-offset-white',
    'dark:bg-amber-500/20', 'dark:border-amber-400/30', 'dark:text-white',
    'dark:hover:bg-amber-500/30', 'dark:hover:border-amber-400/40',
    'dark:focus-visible:ring-amber-400', 'dark:focus-visible:ring-offset-slate-900',
  ],
  solid: [
    'bg-slate-900', 'border-slate-900', 'text-white', 'shadow-sm',
    'hover:bg-slate-800', 'hover:shadow-md', 'hover:-translate-y-[1px]',
    'focus-visible:ring-slate-500', 'focus-visible:ring-offset-white',
    'dark:bg-white', 'dark:border-white', 'dark:text-slate-900',
    'dark:hover:bg-slate-100',
    'dark:focus-visible:ring-white/70', 'dark:focus-visible:ring-offset-slate-900',
  ],
};

const buttonClasses = computed(() =>
  cn(
    // Base
    'relative inline-flex items-center justify-center',
    'border cursor-pointer select-none p-0',
    'transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]',
    'dark:backdrop-blur-md',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
    'active:scale-[0.97] active:transition-transform active:duration-75',
    // Size
    sizeMap[props.size].button,
    // Variant
    variantClasses[props.variant],
    props.class
  )
);

const iconClasses = computed(() => sizeMap[props.size].icon);

const isDisabled = computed(() => props.disabled || props.loading);

const handleClick = (e: MouseEvent) => {
  if (isDisabled.value) return;
  emit('click', e);
};
</script>

<template>
  <button
    type="button"
    :class="buttonClasses"
    :disabled="isDisabled"
    :aria-label="ariaLabel"
    :aria-disabled="isDisabled || undefined"
    :aria-busy="loading || undefined"
    @click="handleClick"
  >
    <!-- Loading spinner -->
    <svg
      v-if="loading"
      class="animate-spin"
      :class="iconClasses"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle class="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
      <path class="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>

    <!-- Icon slot -->
    <span v-else :class="[iconClasses, 'shrink-0 [&>svg]:h-full [&>svg]:w-full']">
      <slot />
    </span>
  </button>
</template>
