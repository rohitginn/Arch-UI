<script setup lang="ts">
/**
 * GlassToggle - On/off toggle button for toolbars
 */
import { cn } from '@archui/core';

interface GlassToggleProps {
  pressed?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  class?: string;
}

withDefaults(defineProps<GlassToggleProps>(), {
  pressed: false,
  disabled: false,
  size: 'md',
});

const emit = defineEmits<{
  (e: 'update:pressed', value: boolean): void;
}>();

const sizeMap: Record<string, string> = {
  sm: 'h-7 px-2 text-xs',
  md: 'h-9 px-3 text-sm',
  lg: 'h-11 px-4 text-base',
};
</script>

<template>
  <button
    type="button"
    role="switch"
    :aria-pressed="pressed"
    :disabled="disabled"
    :class="cn(
      'inline-flex items-center justify-center rounded-lg font-medium cursor-pointer',
      'transition-all duration-200',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary,#3b82f6)] focus-visible:ring-offset-2',
      sizeMap[size],
      pressed
        ? 'bg-[var(--accent-subtle,#dbeafe)] dark:bg-[var(--accent-subtle,rgba(59,130,246,0.15))] text-[var(--accent-primary,#3b82f6)] border border-[var(--accent-primary,#3b82f6)]/30'
        : [
            'bg-transparent text-[var(--glass-text-secondary,#475569)] dark:text-[var(--glass-text-secondary,#94a3b8)]',
            'border border-[var(--surface-border,#e2e8f0)] dark:border-[var(--surface-border,rgba(255,255,255,0.1))]',
            'hover:bg-[var(--surface-bg-hover,#f1f5f9)] dark:hover:bg-[var(--glass-bg-dark-hover,rgba(255,255,255,0.06))]',
          ],
      disabled && 'opacity-40 cursor-not-allowed',
      $props.class,
    )"
    @click="!disabled && emit('update:pressed', !pressed)"
  >
    <slot />
  </button>
</template>
