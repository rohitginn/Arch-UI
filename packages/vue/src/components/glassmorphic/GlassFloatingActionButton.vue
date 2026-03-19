<script setup lang="ts">
/**
 * GlassFloatingActionButton (FAB) - Fixed-position circular action button.
 *
 * Designed for mobile-first UIs, supports an extended mode with a label.
 *
 * @example
 * <GlassFloatingActionButton label="New post" @click="createPost">
 *   <template #icon><Plus /></template>
 * </GlassFloatingActionButton>
 */

import { computed } from 'vue';
import { cn } from '@archui/core';

type FABPosition = 'bottom-right' | 'bottom-left' | 'bottom-center' | 'top-right' | 'top-left';
type FABSize = 'sm' | 'md' | 'lg';

interface GlassFABProps {
  /** Text label (renders extended pill shape) */
  label?: string;
  /** Fixed position on viewport */
  position?: FABPosition;
  /** Button size */
  size?: FABSize;
  /** Visual variant */
  variant?: 'default' | 'primary' | 'secondary' | 'danger' | 'success';
  /** Subtle pulse animation to draw attention */
  pulse?: boolean;
  /** Disable fixed positioning (render inline) */
  inline?: boolean;
  /** Disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  class?: string;
}

const props = withDefaults(defineProps<GlassFABProps>(), {
  position: 'bottom-right',
  size: 'md',
  variant: 'primary',
  pulse: false,
  inline: false,
  disabled: false,
});

defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const positionClasses: Record<FABPosition, string> = {
  'bottom-right': 'fixed bottom-6 right-6',
  'bottom-left': 'fixed bottom-6 left-6',
  'bottom-center': 'fixed bottom-6 left-1/2 -translate-x-1/2',
  'top-right': 'fixed top-6 right-6',
  'top-left': 'fixed top-6 left-6',
};

const sizeMap: Record<FABSize, { button: string; icon: string; label: string }> = {
  sm: { button: 'h-12 min-w-[3rem]', icon: 'h-5 w-5', label: 'text-sm px-4 gap-2' },
  md: { button: 'h-14 min-w-[3.5rem]', icon: 'h-6 w-6', label: 'text-base px-5 gap-2.5' },
  lg: { button: 'h-16 min-w-[4rem]', icon: 'h-7 w-7', label: 'text-lg px-6 gap-3' },
};

const variantClasses: Record<string, string[]> = {
  primary: [
    'bg-blue-600', 'text-white', 'border-blue-700',
    'hover:bg-blue-700', 'hover:border-blue-800',
    'dark:bg-blue-500', 'dark:border-blue-400/30',
    'dark:hover:bg-blue-400', 'dark:hover:border-blue-300/40',
    'focus-visible:ring-blue-500/50',
    'shadow-[0_8px_32px_-4px_rgba(59,130,246,0.5),0_4px_12px_-2px_rgba(59,130,246,0.25)]',
    'dark:shadow-[0_8px_32px_-4px_rgba(59,130,246,0.4),0_4px_12px_-2px_rgba(59,130,246,0.2)]',
  ],
  default: [
    'bg-white/90', 'backdrop-blur-xl', 'text-slate-900', 'border-black/[0.08]',
    'hover:bg-white', 'hover:border-black/[0.12]',
    'dark:bg-white/[0.12]', 'dark:text-white', 'dark:border-white/[0.15]',
    'dark:hover:bg-white/[0.18]', 'dark:hover:border-white/[0.25]',
    'focus-visible:ring-slate-400',
    'shadow-[0_8px_32px_-4px_rgba(0,0,0,0.15),0_4px_12px_-2px_rgba(0,0,0,0.08)]',
    'dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.4),0_4px_12px_-2px_rgba(0,0,0,0.2)]',
  ],
  secondary: [
    'bg-slate-100', 'text-slate-800', 'border-slate-200',
    'hover:bg-slate-200', 'hover:border-slate-300',
    'dark:bg-slate-800', 'dark:text-slate-200', 'dark:border-slate-700',
    'dark:hover:bg-slate-700', 'dark:hover:border-slate-600',
    'focus-visible:ring-slate-400',
    'shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12)]',
    'dark:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.3)]',
  ],
  danger: [
    'bg-red-600', 'text-white', 'border-red-700',
    'hover:bg-red-700', 'hover:border-red-800',
    'dark:bg-red-500', 'dark:border-red-400/30',
    'dark:hover:bg-red-400', 'dark:hover:border-red-300/40',
    'focus-visible:ring-red-500/50',
    'shadow-[0_8px_32px_-4px_rgba(239,68,68,0.4),0_4px_12px_-2px_rgba(239,68,68,0.2)]',
  ],
  success: [
    'bg-emerald-600', 'text-white', 'border-emerald-700',
    'hover:bg-emerald-700', 'hover:border-emerald-800',
    'dark:bg-emerald-500', 'dark:border-emerald-400/30',
    'dark:hover:bg-emerald-400', 'dark:hover:border-emerald-300/40',
    'focus-visible:ring-emerald-500/50',
    'shadow-[0_8px_32px_-4px_rgba(16,185,129,0.4),0_4px_12px_-2px_rgba(16,185,129,0.2)]',
  ],
};

const isExtended = computed(() => !!props.label);

const buttonClasses = computed(() =>
  cn(
    'z-50 inline-flex items-center justify-center',
    'border cursor-pointer select-none',
    'transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
    'active:scale-[0.95] active:transition-transform active:duration-75',
    'hover:-translate-y-1 hover:shadow-2xl',
    // Shape
    isExtended.value ? 'rounded-full' : 'rounded-full',
    // Size
    sizeMap[props.size].button,
    isExtended.value ? sizeMap[props.size].label : '',
    // Position
    !props.inline ? positionClasses[props.position] : '',
    // Variant
    variantClasses[props.variant],
    // Pulse
    props.pulse ? 'animate-[fab-pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]' : '',
    props.class
  )
);
</script>

<template>
  <button
    type="button"
    :class="buttonClasses"
    :disabled="disabled"
    :aria-label="label || 'Action'"
    @click="$emit('click', $event)"
  >
    <span :class="sizeMap[size].icon" class="shrink-0 flex items-center justify-center">
      <slot name="icon">
        <!-- Default plus icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-full w-full"
          aria-hidden="true"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </slot>
    </span>
    <span v-if="label" class="font-medium whitespace-nowrap">{{ label }}</span>
  </button>
</template>

<style scoped>
@keyframes fab-pulse {
  0%, 100% { box-shadow: 0 0 0 0 currentColor; }
  50% { box-shadow: 0 0 0 8px transparent; }
}
</style>
