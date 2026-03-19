<script setup lang="ts">
/**
 * GlassList / GlassListItem - Structured list with leading/trailing slots
 */
import { cn } from '@archui/core';

interface GlassListProps {
  variant?: 'default' | 'bordered' | 'divided';
  spacing?: 'sm' | 'md' | 'lg';
  ordered?: boolean;
  class?: string;
}

withDefaults(defineProps<GlassListProps>(), {
  variant: 'default',
  spacing: 'md',
  ordered: false,
});

const spacingMap: Record<string, string> = {
  sm: 'gap-1',
  md: 'gap-2',
  lg: 'gap-3',
};
</script>

<template>
  <component
    :is="ordered ? 'ol' : 'ul'"
    role="list"
    :class="cn(
      'flex flex-col',
      spacingMap[spacing],
      variant === 'bordered' && [
        'rounded-xl border p-1',
        'border-[var(--surface-border,#e2e8f0)]',
        'dark:border-[var(--surface-border,rgba(255,255,255,0.1))]',
        'bg-[var(--surface-bg,#ffffff)]',
        'dark:bg-[var(--glass-bg-dark,rgba(255,255,255,0.03))]',
      ],
      variant === 'divided' && 'divide-y divide-[var(--surface-border,#e2e8f0)] dark:divide-[var(--surface-border,rgba(255,255,255,0.08))]',
      $props.class,
    )"
  >
    <slot />
  </component>
</template>
