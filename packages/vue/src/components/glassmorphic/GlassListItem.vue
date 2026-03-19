<script setup lang="ts">
/**
 * GlassListItem - Individual row inside GlassList
 */
import { cn } from '@archui/core';

interface GlassListItemProps {
  secondary?: string;
  interactive?: boolean;
  active?: boolean;
  disabled?: boolean;
  class?: string;
}

withDefaults(defineProps<GlassListItemProps>(), {
  interactive: false,
  active: false,
  disabled: false,
});

const emit = defineEmits<{
  (e: 'click'): void;
}>();
</script>

<template>
  <li
    :role="interactive ? 'button' : 'listitem'"
    :tabindex="interactive && !disabled ? 0 : undefined"
    :aria-selected="active || undefined"
    :aria-disabled="disabled || undefined"
    :class="cn(
      'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200',
      'text-[var(--glass-text,#0f172a)] dark:text-[var(--glass-text,#f8fafc)]',
      interactive && !disabled && [
        'cursor-pointer',
        'hover:bg-[var(--surface-bg-hover,#f1f5f9)]',
        'dark:hover:bg-[var(--glass-bg-dark-hover,rgba(255,255,255,0.06))]',
      ],
      active && [
        'bg-[var(--accent-subtle,#dbeafe)]',
        'dark:bg-[var(--accent-subtle,rgba(59,130,246,0.15))]',
        'text-[var(--accent-primary,#3b82f6)]',
      ],
      disabled && 'opacity-50 pointer-events-none',
      $props.class,
    )"
    @click="!disabled && emit('click')"
    @keydown.enter="!disabled && emit('click')"
  >
    <span v-if="$slots.leading" class="flex-shrink-0">
      <slot name="leading" />
    </span>
    <span class="flex-1 min-w-0">
      <span class="block truncate text-sm"><slot /></span>
      <span
        v-if="secondary"
        class="block truncate text-xs text-[var(--glass-text-secondary,#475569)] dark:text-[var(--glass-text-secondary,#94a3b8)]"
      >
        {{ secondary }}
      </span>
    </span>
    <span v-if="$slots.trailing" class="flex-shrink-0 text-[var(--glass-text-secondary,#475569)] dark:text-[var(--glass-text-secondary,#94a3b8)]">
      <slot name="trailing" />
    </span>
  </li>
</template>
