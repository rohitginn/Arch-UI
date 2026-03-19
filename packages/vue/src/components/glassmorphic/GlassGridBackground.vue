<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@archui/core';

interface GlassGridBackgroundProps {
  /** Pattern variant */
  variant?: 'grid' | 'dot';
  /** Grid/Dot size in px */
  size?: number;
  /** Pattern color */
  color?: string;
  /** Additional classes */
  class?: string;
}

const props = withDefaults(defineProps<GlassGridBackgroundProps>(), {
  variant: 'grid',
  size: 16,
});

const styles = computed(() => ({
  backgroundSize: `${props.size}px ${props.size}px`,
  '--bg-pattern': props.color ? props.color : 'currentColor',
  opacity: props.color ? 1 : 0.4,
}));

const bgClass = computed(() => 
  props.variant === 'dot'
    ? 'bg-[radial-gradient(var(--bg-pattern)_1px,transparent_1px)]'
    : 'bg-[linear-gradient(to_right,var(--bg-pattern)_1px,transparent_1px),linear-gradient(to_bottom,var(--bg-pattern)_1px,transparent_1px)]'
);
</script>

<template>
  <div
    :class="cn(
      'relative flex h-full w-full items-center justify-center bg-white dark:bg-black overflow-hidden',
      props.class
    )"
  >
    <!-- Pattern Layer -->
    <div 
      :class="cn('absolute inset-0 h-full w-full', bgClass)"
      :style="styles"
    >
      <div class="absolute inset-0 dark:hidden" :style="{ color: color || '#e5e7eb' }" />
      <div class="absolute inset-0 hidden dark:block" :style="{ color: color || '#1f2937' }" />
    </div>
      
    <!-- Radial Fade -->
    <div class="pointer-events-none absolute inset-0 bg-white/50 dark:bg-black/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

    <!-- Content -->
    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>
