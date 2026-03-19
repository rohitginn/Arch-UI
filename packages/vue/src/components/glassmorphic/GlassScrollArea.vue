<script setup lang="ts">
/**
 * GlassScrollArea - Custom scrollbar replacement
 */
import { cn } from '@archui/core';

interface GlassScrollAreaProps {
  orientation?: 'vertical' | 'horizontal' | 'both';
  maxHeight?: string;
  class?: string;
}

withDefaults(defineProps<GlassScrollAreaProps>(), {
  orientation: 'vertical',
  maxHeight: '400px',
});
</script>

<template>
  <div
    :class="cn(
      'relative',
      orientation === 'horizontal' ? 'overflow-x-auto overflow-y-hidden' :
      orientation === 'both' ? 'overflow-auto' : 'overflow-y-auto overflow-x-hidden',
      '[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2',
      '[&::-webkit-scrollbar-track]:bg-transparent',
      '[&::-webkit-scrollbar-thumb]:rounded-full',
      '[&::-webkit-scrollbar-thumb]:bg-[var(--surface-border,#cbd5e1)]',
      'dark:[&::-webkit-scrollbar-thumb]:bg-[rgba(255,255,255,0.15)]',
      '[&::-webkit-scrollbar-thumb:hover]:bg-[var(--glass-text-secondary,#94a3b8)]',
      'dark:[&::-webkit-scrollbar-thumb:hover]:bg-[rgba(255,255,255,0.25)]',
      $props.class,
    )"
    :style="{ maxHeight: orientation !== 'horizontal' ? maxHeight : undefined }"
  >
    <slot />
  </div>
</template>
