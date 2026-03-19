<script setup lang="ts">
import { ref } from 'vue';
import { cn } from '@archui/core';

interface GlassSpotlightCardProps {
  /** Mode of the spotlight */
  mode?: 'after' | 'before';
  /** Spotlight color */
  from?: string;
  /** Spotlight size in pixels */
  size?: number;
  /** Additional CSS classes */
  class?: string;
}

const props = withDefaults(defineProps<GlassSpotlightCardProps>(), {
  mode: 'before',
  from: 'rgba(255,255,255,0.2)',
  size: 300,
});

const divRef = ref<HTMLDivElement | null>(null);
const position = ref({ x: 0, y: 0 });
const opacity = ref(0);

const handleMouseMove = (e: MouseEvent) => {
  if (!divRef.value) return;

  const rect = divRef.value.getBoundingClientRect();
  position.value = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
};

const handleMouseEnter = () => {
  opacity.value = 1;
};

const handleMouseLeave = () => {
  opacity.value = 0;
};
</script>

<template>
  <div
    ref="divRef"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    :class="cn(
      'overflow-hidden rounded-xl border border-white/40 bg-white/60 dark:border-white/[0.1] dark:bg-white/[0.06]',
      'backdrop-blur-md transition-all duration-300 ease-out',
      'hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.05)]',
      props.class
    )"
  >
    <div
      class="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
      :style="{
        opacity,
        background: `radial-gradient(${size}px circle at ${position.x}px ${position.y}px, ${from}, transparent 80%)`,
      }"
    />
    <slot />
  </div>
</template>
