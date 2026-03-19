<script setup lang="ts">
/**
 * GlassCard - Premium glassmorphic card component for Vue 3
 * 
 * Features:
 * - Frosted glass backdrop blur effect
 * - Multiple variants (default, bordered, gradient, glow)
 * - Configurable blur intensity
 * - Hover animations with scale and lift
 * - Shine sweep effect on hover
 * - 3D tilt effect (premium micro-interaction)
 * - Full light/dark mode support
 * 
 * @example
 * <GlassCard variant="glow" animated shine>
 *   <h3>Premium Card</h3>
 *   <p>With beautiful glass effect</p>
 * </GlassCard>
 */

import { ref, computed } from 'vue';
import { cn } from '@archui/core';

// Props interface
interface GlassCardProps {
  /** Visual variant */
  variant?: 'default' | 'bordered' | 'gradient' | 'glow';
  /** Blur intensity */
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  /** Padding size */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Enable hover scale and lift animation */
  animated?: boolean;
  /** Show shine sweep effect on hover */
  shine?: boolean;
  /** Enable 3D tilt effect on hover */
  tilt?: boolean;
  /** Maximum tilt angle in degrees */
  tiltMax?: number;
  /** Make the card clickable/interactive */
  interactive?: boolean;
  /** Additional CSS classes */
  class?: string;
}

const props = withDefaults(defineProps<GlassCardProps>(), {
  variant: 'default',
  blur: 'lg',
  size: 'md',
  animated: false,
  shine: false,
  tilt: false,
  tiltMax: 10,
  interactive: false,
});

// Emits
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

// Refs for 3D tilt effect
const cardRef = ref<HTMLDivElement | null>(null);
const tiltX = ref(0);
const tiltY = ref(0);
const isHovering = ref(false);

// Variant classes
const variantClasses = computed(() => {
  const variants = {
    default: [
      // Light theme - Frosted Glass
      'bg-white/70',
      'border-white/40',
      'shadow-[0_4px_24px_-1px_rgba(0,0,0,0.02),0_1px_0_rgba(255,255,255,0.4)_inset]',
      'hover:bg-white/80',
      'hover:shadow-[0_8px_32px_-2px_rgba(0,0,0,0.04),0_1px_0_rgba(255,255,255,0.5)_inset]',
      // Dark theme
      'dark:bg-white/[0.05]',
      'dark:border-white/[0.08]',
      'dark:shadow-[0_2px_4px_rgba(0,0,0,0.08),0_4px_8px_rgba(0,0,0,0.1)]',
      'dark:hover:bg-white/[0.08]',
      'dark:hover:border-white/[0.14]',
    ],
    bordered: [
      // Light theme
      'bg-white',
      'border-2',
      'border-slate-200',
      'shadow-sm',
      'hover:border-slate-300',
      'hover:shadow-md',
      // Dark theme
      'dark:bg-white/[0.04]',
      'dark:border-white/[0.15]',
      'dark:hover:border-white/[0.22]',
    ],
    gradient: [
      // Light theme
      'bg-gradient-to-br',
      'from-white',
      'to-slate-50',
      'border-slate-200',
      'shadow-sm',
      'hover:from-slate-50',
      'hover:to-white',
      'hover:shadow-md',
      // Dark theme
      'dark:from-white/[0.08]',
      'dark:to-white/[0.04]',
      'dark:hover:from-white/[0.12]',
      'dark:hover:to-white/[0.06]',
      'dark:border-white/[0.05]',
    ],
    glow: [
      // Light theme
      'bg-white',
      'border-slate-200',
      'shadow-[0_0_20px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.06)]',
      'hover:shadow-[0_0_32px_rgba(0,0,0,0.12),0_8px_24px_rgba(0,0,0,0.1)]',
      // Dark theme
      'dark:bg-white/[0.06]',
      'dark:border-white/[0.1]',
      'dark:shadow-[0_0_24px_rgba(255,255,255,0.04),0_4px_16px_rgba(0,0,0,0.2)]',
      'dark:hover:shadow-[0_0_40px_rgba(255,255,255,0.08),0_8px_32px_rgba(0,0,0,0.25)]',
    ],
  };
  return variants[props.variant];
});

// Blur classes
const blurClasses = computed(() => {
  const blurs = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
  };
  return blurs[props.blur];
});

// Size classes
const sizeClasses = computed(() => {
  const sizes = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };
  return sizes[props.size];
});

// Combined card classes
const cardClasses = computed(() => {
  return cn(
    // Base classes
    'relative',
    'rounded-2xl',
    'overflow-hidden',
    'border',
    'transition-all',
    'duration-200',
    'ease-out',
    // Variant
    variantClasses.value,
    // Blur
    blurClasses.value,
    // Size
    sizeClasses.value,
    // Animated
    props.animated && [
      'hover:scale-[1.02]',
      'hover:-translate-y-1',
      'active:scale-[0.98]',
    ],
    // Interactive
    props.interactive && [
      'cursor-pointer',
      'select-none',
    ],
    // Shine effect group
    props.shine && 'group',
    // Tilt effect
    props.tilt && 'transform-gpu',
    // Custom classes
    props.class
  );
});

// 3D Tilt effect handlers
const handleMouseMove = (e: MouseEvent) => {
  if (!props.tilt || !cardRef.value) return;
  
  const rect = cardRef.value.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  const mouseX = e.clientX - centerX;
  const mouseY = e.clientY - centerY;
  
  // Calculate rotation (inverted for natural feel)
  tiltX.value = (mouseY / (rect.height / 2)) * -props.tiltMax;
  tiltY.value = (mouseX / (rect.width / 2)) * props.tiltMax;
};

const handleMouseEnter = () => {
  isHovering.value = true;
};

const handleMouseLeave = () => {
  isHovering.value = false;
  tiltX.value = 0;
  tiltY.value = 0;
};

// Tilt transform style
const tiltStyle = computed(() => {
  if (!props.tilt) return {};
  return {
    transform: `perspective(1000px) rotateX(${tiltX.value}deg) rotateY(${tiltY.value}deg)`,
    transition: isHovering.value ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out',
  };
});

// Click handler
const handleClick = (e: MouseEvent) => {
  emit('click', e);
};
</script>

<template>
  <div
    ref="cardRef"
    :class="cardClasses"
    :style="tiltStyle"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
  >
    <!-- Shine overlay effect -->
    <div
      v-if="shine"
      class="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-out pointer-events-none"
      aria-hidden="true"
    />

    <!-- Inner glow effect for glow variant -->
    <div
      v-if="variant === 'glow'"
      class="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"
      aria-hidden="true"
    />

    <!-- Tilt glare effect -->
    <div
      v-if="tilt && isHovering"
      class="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
      :style="{
        background: `radial-gradient(circle at ${50 + tiltY * 2}% ${50 - tiltX * 2}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
        opacity: isHovering ? 1 : 0,
      }"
      aria-hidden="true"
    />

    <!-- Content wrapper -->
    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>
