<script setup lang="ts">
import { cn } from '@archui/core';

interface GlassDockItemProps {
  active?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<GlassDockItemProps>(), {
  active: false,
});
</script>

<template>
  <div
    :class="cn(
      // Light theme - visible background
      'group relative flex aspect-square h-10 w-10 items-center justify-center rounded-xl',
      'bg-slate-100 dark:bg-white/[0.08] shadow-sm',
      'border border-slate-200/50 dark:border-transparent',
      'transition-all duration-200',
      'hover:-translate-y-2 hover:scale-110 hover:bg-slate-200 dark:hover:bg-white/[0.15]',
      'hover:shadow-lg hover:border-slate-300 dark:hover:border-white/[0.1]',
      'cursor-pointer',
      props.active && 'bg-slate-200 dark:bg-white/20 shadow-md border-slate-300',
      props.class
    )"
  >
    <slot />
    
    <!-- Reflection/Active Dot -->
    <div 
      v-if="active" 
      class="absolute -bottom-2 h-1 w-1 rounded-full bg-slate-500 dark:bg-white" 
    />
  </div>
</template>
