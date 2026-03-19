<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@archui/core';

interface GlassShineBorderProps {
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  color?: string | string[];
  class?: string;
}

const props = withDefaults(defineProps<GlassShineBorderProps>(), {
  borderRadius: 12,
  borderWidth: 1,
  duration: 8,
  color: '#3b82f6',
});

const styles = computed(() => ({
  '--border-radius': `${props.borderRadius}px`,
  '--border-width': `${props.borderWidth}px`,
  '--duration': `${props.duration}s`,
  '--shine-color': Array.isArray(props.color) ? props.color.join(',') : props.color,
  animation: `shine ${props.duration}s linear infinite`
}));
</script>

<template>
  <div
    :class="cn(
      // Light theme - visible background
      'relative min-h-[60px] w-full overflow-hidden rounded-[--border-radius] bg-white/60 p-[--border-width] dark:bg-slate-900',
      'backdrop-blur-xl transition-all shadow-sm',
      props.class
    )"
    :style="{
       '--border-radius': `${borderRadius}px`,
       '--border-width': `${borderWidth}px`
    }"
  >
    <!-- Moving Gradient -->
    <div
      :class="cn(
        'absolute inset-0 z-0 h-full w-full rounded-[--border-radius]',
        'bg-[conic-gradient(transparent_20%,var(--shine-color)_100%)]'
      )"
      :style="styles"
    />
    
    <!-- Mask Background -->
    <div class="absolute inset-[--border-width] z-10 rounded-[calc(var(--border-radius)-var(--border-width))] bg-white dark:bg-slate-900" />
    
    <!-- Content -->
    <div class="relative z-20 h-full w-full">
      <slot />
    </div>
  </div>
</template>

<style scoped>
@keyframes shine {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
