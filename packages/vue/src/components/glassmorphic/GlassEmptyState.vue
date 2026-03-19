<script setup lang="ts">
/**
 * GlassEmptyState - Token-based frosted empty state for Vue 3
 */
import { cn } from '@archui/core';

interface Props {
  title?: string;
  description?: string;
  variant?: 'default' | 'bordered';
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Nothing here yet',
  variant: 'default',
});
</script>

<template>
  <div :class="cn(
    'flex flex-col items-center justify-center py-16 px-8 rounded-2xl text-center',
    variant === 'bordered'
      ? 'bg-[var(--glass-bordered-bg)] border border-dashed border-[var(--glass-bordered-border)]'
      : 'bg-[var(--glass-surface-hover)]/40 border border-dashed border-[var(--glass-edge)]',
    props.class,
  )">
    <slot>
      <div class="mb-5 text-[var(--glass-text-placeholder)] animate-[float_4s_ease-in-out_infinite]">
        <slot name="icon">
          <svg class="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </slot>
      </div>
      <h3 class="text-base font-medium text-[var(--glass-text-secondary)] mb-1.5">{{ title }}</h3>
      <p v-if="description" class="text-sm text-[var(--glass-text-muted)] max-w-xs leading-relaxed">{{ description }}
      </p>
      <div v-if="$slots.action" class="mt-5">
        <slot name="action" />
      </div>
    </slot>
  </div>
</template>
