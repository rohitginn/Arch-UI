<script setup lang="ts">
/**
 * GlassKbd - Keyboard shortcut keycap display
 */
import { computed } from 'vue';
import { cn } from '@archui/core';

interface GlassKbdProps {
  keys: string | string[];
  separator?: string;
  size?: 'sm' | 'md' | 'lg';
  class?: string;
}

const props = withDefaults(defineProps<GlassKbdProps>(), {
  separator: '+',
  size: 'md',
});

const keyArray = computed(() =>
  Array.isArray(props.keys) ? props.keys : [props.keys]
);

const sizeClasses = computed(() => {
  const map: Record<string, string> = {
    sm: 'min-w-[20px] h-5 px-1 text-[10px]',
    md: 'min-w-[24px] h-6 px-1.5 text-[11px]',
    lg: 'min-w-[28px] h-7 px-2 text-xs',
  };
  return map[props.size] || map.md;
});
</script>

<template>
  <span :class="cn('inline-flex items-center gap-1', $props.class)">
    <template v-for="(key, idx) in keyArray" :key="idx">
      <span
        v-if="idx > 0"
        class="text-[var(--glass-text-secondary,#475569)] dark:text-[var(--glass-text-secondary,#94a3b8)] text-[10px]"
      >
        {{ separator }}
      </span>
      <kbd
        :class="cn(
          'inline-flex items-center justify-center rounded-md font-mono font-medium',
          'bg-[var(--surface-bg-hover,#f1f5f9)] dark:bg-[rgba(255,255,255,0.08)]',
          'text-[var(--glass-text-secondary,#475569)] dark:text-[var(--glass-text-secondary,#94a3b8)]',
          'border border-[var(--surface-border,#e2e8f0)] dark:border-[rgba(255,255,255,0.12)]',
          'shadow-[0_1px_0_1px_var(--surface-border,#cbd5e1)] dark:shadow-[0_1px_0_1px_rgba(0,0,0,0.3)]',
          sizeClasses,
        )"
      >
        {{ key }}
      </kbd>
    </template>
  </span>
</template>
