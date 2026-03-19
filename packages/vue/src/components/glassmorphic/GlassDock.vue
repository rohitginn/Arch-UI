<script setup lang="ts">
import { cn } from '@archui/core';

interface GlassDockProps {
  class?: string;
  position?: 'bottom' | 'top';
}

const props = withDefaults(defineProps<GlassDockProps>(), {
  position: 'bottom',
});
</script>

<template>
  <div
    :class="cn(
      'mx-auto flex h-16 items-end gap-4 rounded-2xl px-4 pb-3',
      // Light theme - visible background and border
      'bg-white/50 dark:bg-slate-900/50',
      'backdrop-blur-2xl border border-white/40 dark:border-white/10',
      'shadow-xl shadow-black/5 dark:shadow-black/30',
      'transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-900/95',
      props.class
    )"
  >
    <slot />
  </div>
</template>
