<script setup lang="ts">
/**
 * GlassExpandButton - Circular plus/minus toggle button.
 *
 * Rotates the plus icon 180° and cross-fades to minus for the expanded state.
 *
 * @example
 * <GlassExpandButton v-model:expanded="showDetails" />
 */

import { computed } from 'vue';
import { cn } from '@archui/core';

interface GlassExpandButtonProps {
  /** Controlled expanded state */
  expanded?: boolean;
  /** Visual variant */
  variant?: 'default' | 'ghost' | 'outline' | 'primary';
  /** Button size */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Accessible label for collapsed state */
  expandLabel?: string;
  /** Accessible label for expanded state */
  collapseLabel?: string;
  /** Disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  class?: string;
}

const props = withDefaults(defineProps<GlassExpandButtonProps>(), {
  expanded: false,
  variant: 'default',
  size: 'md',
  expandLabel: 'Expand',
  collapseLabel: 'Collapse',
  disabled: false,
});

const emit = defineEmits<{
  (e: 'update:expanded', value: boolean): void;
}>();

const toggle = () => {
  if (!props.disabled) {
    emit('update:expanded', !props.expanded);
  }
};

const sizeMap: Record<string, { button: string; icon: string }> = {
  xs: { button: 'h-7 w-7', icon: 'h-3.5 w-3.5' },
  sm: { button: 'h-8 w-8', icon: 'h-4 w-4' },
  md: { button: 'h-10 w-10', icon: 'h-5 w-5' },
  lg: { button: 'h-12 w-12', icon: 'h-6 w-6' },
};

const variantClasses: Record<string, string[]> = {
  default: [
    'bg-white/80', 'backdrop-blur-md', 'border-black/[0.08]', 'text-slate-900',
    'hover:bg-white/90', 'hover:border-black/[0.12]', 'hover:-translate-y-[1px]',
    'focus-visible:ring-slate-500/30', 'focus-visible:ring-offset-white',
    'dark:bg-white/[0.08]', 'dark:border-white/[0.12]', 'dark:text-white',
    'dark:hover:bg-white/[0.12]', 'dark:hover:border-white/[0.2]',
    'dark:focus-visible:ring-white/70', 'dark:focus-visible:ring-offset-slate-900',
  ],
  ghost: [
    'bg-transparent', 'border-transparent', 'text-slate-700', 'shadow-none',
    'hover:bg-black/[0.05]', 'hover:text-slate-900',
    'dark:text-slate-300', 'dark:hover:bg-white/[0.1]', 'dark:hover:text-white',
    'focus-visible:ring-slate-400', 'focus-visible:ring-offset-0',
  ],
  outline: [
    'bg-transparent', 'border-slate-300', 'text-slate-700',
    'hover:bg-slate-50', 'hover:border-slate-400', 'hover:-translate-y-[1px]',
    'dark:border-white/20', 'dark:text-white',
    'dark:hover:bg-white/[0.06]', 'dark:hover:border-white/30',
    'focus-visible:ring-slate-400', 'focus-visible:ring-offset-0',
  ],
  primary: [
    'bg-blue-600', 'border-blue-700', 'text-white',
    'hover:bg-blue-700', 'hover:border-blue-800', 'hover:-translate-y-[1px]',
    'focus-visible:ring-blue-500', 'focus-visible:ring-offset-white',
    'dark:bg-blue-500/20', 'dark:border-blue-400/30', 'dark:text-white',
    'dark:hover:bg-blue-500/30', 'dark:hover:border-blue-400/40',
    'dark:focus-visible:ring-blue-400', 'dark:focus-visible:ring-offset-slate-900',
  ],
};

const buttonClasses = computed(() =>
  cn(
    'relative inline-flex items-center justify-center rounded-full',
    'border cursor-pointer select-none p-0',
    'transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]',
    'dark:backdrop-blur-md',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
    'active:scale-[0.97] active:transition-transform active:duration-75',
    sizeMap[props.size].button,
    variantClasses[props.variant],
    props.class
  )
);

const currentLabel = computed(() =>
  props.expanded ? props.collapseLabel : props.expandLabel
);
</script>

<template>
  <button
    type="button"
    :class="buttonClasses"
    :disabled="disabled"
    :aria-label="currentLabel"
    :aria-expanded="expanded"
    @click="toggle"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      :class="[
        sizeMap[size].icon,
        'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
        expanded ? 'rotate-180' : 'rotate-0'
      ]"
      aria-hidden="true"
    >
      <!-- Horizontal bar (always visible) -->
      <line x1="5" y1="12" x2="19" y2="12" />
      <!-- Vertical bar (collapses on expanded) -->
      <line
        x1="12"
        y1="5"
        x2="12"
        y2="19"
        :class="[
          'origin-center transition-all duration-300',
          expanded ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        ]"
      />
    </svg>
  </button>
</template>
