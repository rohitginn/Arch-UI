<script setup lang="ts">
/**
 * GlassCommandBar - Persistent floating toolbar for power-user shortcuts
 */
import { cn } from '@archui/core';

interface CommandBarAction {
  id: string;
  label: string;
  shortcut?: string[];
  disabled?: boolean;
}

interface GlassCommandBarProps {
  actions: CommandBarAction[];
  context?: string;
  position?: 'bottom' | 'top';
  class?: string;
}

withDefaults(defineProps<GlassCommandBarProps>(), {
  position: 'bottom',
});

const emit = defineEmits<{
  (e: 'action', id: string): void;
}>();
</script>

<template>
  <div
    role="toolbar"
    aria-label="Command bar"
    :class="cn(
      'fixed left-1/2 -translate-x-1/2 z-50',
      'flex items-center gap-2 rounded-2xl px-4 py-2',
      'bg-[var(--surface-bg,#ffffff)]/90 backdrop-blur-xl',
      'dark:bg-[var(--surface-bg-hover,rgba(20,20,20,0.9))]',
      'border border-[var(--surface-border,#e2e8f0)]',
      'dark:border-[var(--surface-border,rgba(255,255,255,0.1))]',
      'shadow-2xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]',
      position === 'bottom' && 'bottom-6',
      position === 'top' && 'top-6',
      $props.class,
    )"
  >
    <!-- Context -->
    <template v-if="context">
      <span class="text-sm font-medium text-[var(--glass-text,#0f172a)] dark:text-[var(--glass-text,#f8fafc)] whitespace-nowrap">
        {{ context }}
      </span>
      <span class="h-5 w-px bg-[var(--surface-border,#e2e8f0)] dark:bg-[var(--surface-border,rgba(255,255,255,0.1))]" />
    </template>

    <!-- Actions -->
    <button
      v-for="action in actions"
      :key="action.id"
      type="button"
      :disabled="action.disabled"
      :title="action.label"
      :class="cn(
        'flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-medium cursor-pointer',
        'transition-all duration-200',
        'text-[var(--glass-text,#0f172a)] dark:text-[var(--glass-text,#f8fafc)]',
        'hover:bg-[var(--surface-bg-hover,#f1f5f9)]',
        'dark:hover:bg-[var(--glass-bg-dark-hover,rgba(255,255,255,0.06))]',
        'active:scale-[0.97] active:transition-transform active:duration-75',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent',
      )"
      @click="emit('action', action.id)"
    >
      <slot :name="`icon-${action.id}`" />
      <span>{{ action.label }}</span>
      <span v-if="action.shortcut" class="ml-1 flex gap-0.5">
        <kbd
          v-for="(key, i) in action.shortcut"
          :key="i"
          :class="cn(
            'inline-flex items-center justify-center min-w-[20px] h-5 px-1 rounded text-[10px] font-mono',
            'bg-[var(--surface-bg-active,#e2e8f0)] dark:bg-[rgba(255,255,255,0.08)]',
            'text-[var(--glass-text-secondary,#475569)] dark:text-[var(--glass-text-secondary,#94a3b8)]',
          )"
        >
          {{ key }}
        </kbd>
      </span>
    </button>
  </div>
</template>
