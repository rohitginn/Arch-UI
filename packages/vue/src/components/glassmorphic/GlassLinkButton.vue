<script setup lang="ts">
/**
 * GlassLinkButton - Visually a hyperlink but semantically a <button>.
 *
 * No background, no border, no shadow. Text with underline-on-hover.
 * Use for non-navigation actions that should look like links.
 *
 * @example
 * <GlassLinkButton @click="handleCancel">Cancel</GlassLinkButton>
 */

import { computed } from 'vue';
import { cn } from '@archui/core';

interface GlassLinkButtonProps {
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS classes */
  class?: string;
}

const props = withDefaults(defineProps<GlassLinkButtonProps>(), {
  size: 'md',
  disabled: false,
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const sizeClasses: Record<string, string> = {
  sm: 'text-xs gap-1',
  md: 'text-sm gap-1.5',
  lg: 'text-base gap-2',
};

const buttonClasses = computed(() =>
  cn(
    // Base
    'inline-flex items-center justify-center font-medium',
    'bg-transparent border-none shadow-none',
    'cursor-pointer select-none',
    // Underline
    'underline-offset-4 decoration-1',
    'hover:underline',
    // Color
    'text-[var(--glass-accent,#3b82f6)]',
    'hover:text-[var(--glass-accent-hover,#2563eb)]',
    // Transition
    'transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]',
    // Active press
    'active:scale-[0.97] active:transition-transform active:duration-75',
    // Focus ring
    'focus-visible:outline-none',
    'focus-visible:ring-2 focus-visible:ring-offset-2',
    'focus-visible:ring-[var(--glass-accent,#3b82f6)]',
    'focus-visible:ring-offset-[var(--surface-bg,#ffffff)]',
    'dark:focus-visible:ring-offset-[var(--surface-bg,#09090b)]',
    // Disabled
    'disabled:opacity-40 disabled:pointer-events-none disabled:cursor-not-allowed',
    // Size
    sizeClasses[props.size],
    props.class
  )
);

const handleClick = (e: MouseEvent) => {
  if (props.disabled) return;
  emit('click', e);
};
</script>

<template>
  <button
    type="button"
    :class="buttonClasses"
    :disabled="disabled"
    @click="handleClick"
  >
    <span v-if="$slots.leftIcon" class="shrink-0">
      <slot name="leftIcon" />
    </span>
    <span><slot /></span>
    <span v-if="$slots.rightIcon" class="shrink-0">
      <slot name="rightIcon" />
    </span>
  </button>
</template>
