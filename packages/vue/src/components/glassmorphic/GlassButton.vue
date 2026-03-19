<script setup lang="ts">
/**
 * GlassButton - Premium glassmorphic button component for Vue 3
 * 
 * Features:
 * - Frosted glass backdrop blur effect
 * - Multiple color variants (default, primary, secondary, success, warning, danger, ghost, outline)
 * - Configurable sizes
 * - Loading state with spinner
 * - Optional glow effect with colored variants
 * - Magnetic cursor effect (follows mouse)
 * - Ripple click effect
 * - Full light/dark mode support
 * 
 * @example
 * <GlassButton variant="primary" glow magnetic ripple>
 *   Click me
 * </GlassButton>
 */

import { ref, computed } from 'vue';
import { cn } from '@archui/core';

// Props interface
interface GlassButtonProps {
  /** Visual variant */
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'outline' | 'solid';
  /** Button size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon' | 'icon-sm' | 'icon-lg';
  /** Enable glow effect */
  glow?: boolean;
  /** Full width button */
  fullWidth?: boolean;
  /** Show loading spinner */
  loading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Enable magnetic cursor effect */
  magnetic?: boolean;
  /** Enable ripple effect on click */
  ripple?: boolean;
  /** Enable shimmer border animation on hover */
  shimmer?: boolean;
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
  /** Additional CSS classes */
  class?: string;
}

const props = withDefaults(defineProps<GlassButtonProps>(), {
  variant: 'default',
  size: 'md',
  glow: false,
  fullWidth: false,
  loading: false,
  disabled: false,
  magnetic: false,
  ripple: false,
  shimmer: false,
  type: 'button',
});

import { onUnmounted } from 'vue';

// Emits
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

// Refs
const buttonRef = ref<HTMLButtonElement | null>(null);
const ripples = ref<Array<{ x: number; y: number; id: number }>>([]);
const magneticOffset = ref({ x: 0, y: 0 });
const rippleTimeouts = ref<Set<ReturnType<typeof setTimeout>>>(new Set());

// Cleanup ripple timeouts on unmount
onUnmounted(() => {
  rippleTimeouts.value.forEach((timeout) => clearTimeout(timeout));
  rippleTimeouts.value.clear();
});

// Variant classes - SOLID light theme, GLASS dark theme (matching React)
const variantClasses = computed(() => {
  const variants = {
    // DEFAULT: Solid white in light, glass in dark
    default: [
      // Light theme - Frosted glass with refined borders
      'bg-white/80',
      'backdrop-blur-md',
      'border-black/[0.08]',
      'text-slate-900',
      'shadow-[0_2px_4px_rgba(0,0,0,0.02),0_1px_0_rgba(255,255,255,0.5)_inset]',
      'hover:bg-white/90',
      'hover:border-black/[0.12]',
      'hover:shadow-[0_4px_12px_rgba(0,0,0,0.05),0_1px_0_rgba(255,255,255,0.6)_inset]',
      'hover:-translate-y-[1px]',
      'active:bg-white',

      'focus-visible:ring-slate-500/30',
      'focus-visible:ring-offset-white',
      // Dark theme - Glass effect with explicit white text
      'dark:bg-white/[0.08]',
      'dark:border-white/[0.12]',
      'dark:text-white',
      'dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]',
      'dark:hover:bg-white/[0.12]',
      'dark:hover:border-white/[0.2]',
      'dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.08)]',
      'dark:focus-visible:ring-white/70',
      'dark:focus-visible:ring-offset-slate-900',
    ],
    // PRIMARY: Solid blue in light, translucent blue in dark
    primary: [
      // Light theme - Solid blue with white text
      'bg-blue-600',
      'border-blue-700',
      'text-btn-on-color',
      'shadow-sm',
      'shadow-blue-600/20',
      'hover:bg-blue-700',
      'hover:border-blue-800',
      'hover:shadow-lg',
      'hover:shadow-blue-600/30',
      'hover:-translate-y-[1px]',
      'active:bg-blue-800',
      'focus-visible:ring-blue-500',
      'focus-visible:ring-offset-white',
      // Dark theme - Translucent blue glass with white text
      'dark:bg-blue-500/20',
      'dark:border-blue-400/30',
      'dark:text-btn-on-color',
      'dark:hover:bg-blue-500/30',
      'dark:hover:border-blue-400/40',
      'dark:hover:shadow-[0_4px_16px_rgba(59,130,246,0.3)]',
      'dark:focus-visible:ring-blue-400',
      'dark:focus-visible:ring-offset-slate-900',
    ],
    // SECONDARY: Solid purple in light, translucent purple in dark
    secondary: [
      // Light theme - Solid purple with white text
      'bg-purple-600',
      'border-purple-700',
      'text-btn-on-color',
      'shadow-sm',
      'shadow-purple-600/20',
      'hover:bg-purple-700',
      'hover:border-purple-800',
      'hover:shadow-lg',
      'hover:shadow-purple-600/30',
      'hover:-translate-y-[1px]',
      'active:bg-purple-800',
      'focus-visible:ring-purple-500',
      'focus-visible:ring-offset-white',
      // Dark theme - Translucent purple glass with white text
      'dark:bg-purple-500/20',
      'dark:border-purple-400/30',
      'dark:text-btn-on-color',
      'dark:hover:bg-purple-500/30',
      'dark:hover:border-purple-400/40',
      'dark:hover:shadow-[0_4px_16px_rgba(168,85,247,0.3)]',
      'dark:focus-visible:ring-purple-400',
      'dark:focus-visible:ring-offset-slate-900',
    ],
    // SUCCESS: Solid green in light, translucent green in dark
    success: [
      // Light theme - Solid green with white text
      'bg-green-600',
      'border-green-700',
      'text-btn-on-color',
      'shadow-sm',
      'shadow-green-600/20',
      'hover:bg-green-700',
      'hover:border-green-800',
      'hover:shadow-lg',
      'hover:shadow-green-600/30',
      'hover:-translate-y-[1px]',
      'active:bg-green-800',
      'focus-visible:ring-green-500',
      'focus-visible:ring-offset-white',
      // Dark theme - Translucent green glass with white text
      'dark:bg-green-500/20',
      'dark:border-green-400/30',
      'dark:text-btn-on-color',
      'dark:hover:bg-green-500/30',
      'dark:hover:border-green-400/40',
      'dark:hover:shadow-[0_4px_16px_rgba(34,197,94,0.3)]',
      'dark:focus-visible:ring-green-400',
      'dark:focus-visible:ring-offset-slate-900',
    ],
    // WARNING: Solid amber in light, translucent amber in dark
    warning: [
      // Light theme - Solid amber with dark text for high contrast
      'bg-amber-500',
      'border-amber-600',
      'text-btn-warning',
      'shadow-sm',
      'shadow-amber-500/20',
      'hover:bg-amber-600',
      'hover:border-amber-700',
      'hover:shadow-lg',
      'hover:shadow-amber-500/30',
      'hover:-translate-y-[1px]',
      'active:bg-amber-700',
      'focus-visible:ring-amber-500',
      'focus-visible:ring-offset-white',
      // Dark theme - Translucent amber glass with light text
      'dark:bg-amber-500/20',
      'dark:border-amber-400/30',
      'dark:text-btn-warning',
      'dark:hover:bg-amber-500/30',
      'dark:hover:border-amber-400/40',
      'dark:hover:shadow-[0_4px_16px_rgba(245,158,11,0.3)]',
      'dark:focus-visible:ring-amber-400',
      'dark:focus-visible:ring-offset-slate-900',
    ],
    // DANGER: Solid red in light, translucent red in dark
    danger: [
      // Light theme - Solid red with white text
      'bg-red-600',
      'border-red-700',
      'text-btn-on-color',
      'shadow-sm',
      'shadow-red-600/20',
      'hover:bg-red-700',
      'hover:border-red-800',
      'hover:shadow-lg',
      'hover:shadow-red-600/30',
      'hover:-translate-y-[1px]',
      'active:bg-red-800',
      'focus-visible:ring-red-500',
      'focus-visible:ring-offset-white',
      // Dark theme - Translucent red glass with white text
      'dark:bg-red-500/20',
      'dark:border-red-400/30',
      'dark:text-btn-on-color',
      'dark:hover:bg-red-500/30',
      'dark:hover:border-red-400/40',
      'dark:hover:shadow-[0_4px_16px_rgba(239,68,68,0.3)]',
      'dark:focus-visible:ring-red-400',
      'dark:focus-visible:ring-offset-slate-900',
    ],
    // GHOST: Minimal styling, visible on hover
    ghost: [
      // Light theme with explicit muted text
      'bg-transparent',
      'border-transparent',
      'text-btn-muted',
      'shadow-none',
      'hover:bg-slate-100',
      'hover:text-btn-default',
      'active:bg-slate-200',
      'focus-visible:ring-slate-500',
      'focus-visible:ring-offset-white',
      // Dark theme with explicit light text
      'dark:text-btn-muted',
      'dark:hover:bg-white/[0.08]',
      'dark:hover:text-btn-default',
      'dark:active:bg-white/[0.12]',
      'dark:focus-visible:ring-white/70',
      'dark:focus-visible:ring-offset-slate-900',
    ],
    // OUTLINE: Clear border, transparent background
    outline: [
      // Light theme - Visible border with explicit text
      'bg-transparent',
      'border-slate-300',
      'text-btn-muted',
      'hover:bg-slate-50',
      'hover:border-slate-400',
      'hover:text-btn-default',
      'hover:-translate-y-[1px]',
      'active:bg-slate-100',
      'focus-visible:ring-slate-500',
      'focus-visible:ring-offset-white',
      // Dark theme with explicit white text
      'dark:border-white/20',
      'dark:text-btn-default',
      'dark:hover:bg-white/[0.06]',
      'dark:hover:border-white/30',
      'dark:active:bg-white/[0.1]',
      'dark:focus-visible:ring-white/70',
      'dark:focus-visible:ring-offset-slate-900',
    ],
    // SOLID: Fully opaque, inverted in dark mode
    solid: [
      // Light theme - Dark background with white text
      'bg-slate-900',
      'border-slate-900',
      'text-btn-on-color',
      'shadow-sm',
      'hover:bg-slate-800',
      'hover:shadow-md',
      'hover:-translate-y-[1px]',
      'active:bg-slate-950',
      'focus-visible:ring-slate-500',
      'focus-visible:ring-offset-white',
      // Dark theme - Light background with dark text
      'dark:bg-white',
      'dark:border-white',
      'dark:text-btn-default',
      'dark:hover:bg-slate-100',
      'dark:active:bg-slate-200',
      'dark:focus-visible:ring-white/70',
      'dark:focus-visible:ring-offset-slate-900',
    ],
  };
  return variants[props.variant];
});

// Size classes - matched to React
const sizeClasses = computed(() => {
  const sizes = {
    sm: ['h-8', 'px-3.5', 'text-sm', 'gap-1.5', 'rounded-lg'],
    md: ['h-10', 'px-5', 'text-sm', 'gap-2', 'rounded-xl'],
    lg: ['h-12', 'px-7', 'text-base', 'gap-2.5', 'rounded-xl'],
    xl: ['h-14', 'px-9', 'text-lg', 'gap-3', 'rounded-2xl'],
    icon: ['h-10', 'w-10', 'rounded-xl'],
    'icon-sm': ['h-8', 'w-8', 'rounded-lg'],
    'icon-lg': ['h-12', 'w-12', 'rounded-xl'],
  };
  return sizes[props.size];
});

// Glow classes
const glowClasses = computed(() => {
  if (!props.glow) return [];
  
  const glowVariants: Record<string, string[]> = {
    default: [
      'shadow-[0_0_20px_rgba(0,0,0,0.15)]',
      'hover:shadow-[0_0_30px_rgba(0,0,0,0.25)]',
      'dark:shadow-[0_0_20px_rgba(255,255,255,0.15)]',
      'dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]',
    ],
    primary: [
      'shadow-[0_0_20px_rgba(59,130,246,0.3)]',
      'hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]',
    ],
    secondary: [
      'shadow-[0_0_20px_rgba(147,51,234,0.3)]',
      'hover:shadow-[0_0_30px_rgba(147,51,234,0.5)]',
    ],
    success: [
      'shadow-[0_0_20px_rgba(34,197,94,0.3)]',
      'hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]',
    ],
    warning: [
      'shadow-[0_0_20px_rgba(245,158,11,0.3)]',
      'hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]',
    ],
    danger: [
      'shadow-[0_0_20px_rgba(239,68,68,0.3)]',
      'hover:shadow-[0_0_30px_rgba(239,68,68,0.5)]',
    ],
    ghost: [],
    outline: [],
  };
  
  return glowVariants[props.variant] || glowVariants.default;
});

// Combined button classes
const buttonClasses = computed(() => {
  return cn(
    // Base classes
    'relative',
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'rounded-xl',
    'border',
    'cursor-pointer',
    'select-none',
    // Transition - specified easing curve
    'transition-all',
    'duration-200',
    'ease-[cubic-bezier(0.4,0,0.2,1)]',
    // Dark theme gets glassmorphism only
    'dark:backdrop-blur-md',
    // Focus styles - base (colors defined per variant)
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-offset-2',
    // Disabled styles
    'disabled:opacity-50',
    'disabled:pointer-events-none',
    'disabled:cursor-not-allowed',
    // Active press effect
    'active:scale-[0.97]',
    'active:transition-transform',
    'active:duration-75',
    // Variant
    variantClasses.value,
    // Size
    sizeClasses.value,
    // Glow
    glowClasses.value,
    // Full width
    props.fullWidth && 'w-full',
    // Stacking context isolation - ensures z-index works correctly
    'isolate',
    // Magnetic 
    props.magnetic && 'will-change-transform',
    // Ripple overflow
    props.ripple && 'overflow-hidden',
    // Shimmer
    props.shimmer && 'group overflow-hidden',
    // Custom classes
    props.class
  );
});

// Magnetic effect handlers
const handleMouseMove = (e: MouseEvent) => {
  if (!props.magnetic || !buttonRef.value) return;
  
  const rect = buttonRef.value.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  
  magneticOffset.value = {
    x: x * 0.15,
    y: y * 0.15,
  };
};

const handleMouseLeave = () => {
  magneticOffset.value = { x: 0, y: 0 };
};

// Magnetic transform style
const magneticStyle = computed(() => {
  if (!props.magnetic) return {};
  return {
    transform: `translate(${magneticOffset.value.x}px, ${magneticOffset.value.y}px)`,
  };
});

// Ripple effect with cleanup
const addRipple = (e: MouseEvent) => {
  if (!props.ripple || !buttonRef.value) return;
  
  const rect = buttonRef.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const id = Date.now();
  
  ripples.value.push({ x, y, id });
  
  const timeout = setTimeout(() => {
    ripples.value = ripples.value.filter((r) => r.id !== id);
    rippleTimeouts.value.delete(timeout);
  }, 600);
  rippleTimeouts.value.add(timeout);
};

// Click handler
const handleClick = (e: MouseEvent) => {
  if (props.disabled || props.loading) return;
  
  addRipple(e);
  emit('click', e);
};

// Computed disabled state
const isDisabled = computed(() => props.disabled || props.loading);
</script>

<template>
  <button
    ref="buttonRef"
    :type="type"
    :class="buttonClasses"
    :style="magneticStyle"
    :disabled="isDisabled"
    :aria-disabled="isDisabled || undefined"
    :aria-busy="loading || undefined"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
  >
    <!-- Decorative Layer: Ripple effects - z-0 to render below content -->
    <span
      v-for="ripple in ripples"
      :key="ripple.id"
      class="absolute z-0 rounded-full bg-white/40 dark:bg-white/30 animate-[ripple_0.6s_ease-out] pointer-events-none"
      :style="{
        left: `${ripple.x}px`,
        top: `${ripple.y}px`,
        width: '0',
        height: '0',
        transform: 'translate(-50%, -50%)',
      }"
    />

    <!-- Decorative Layer: Shimmer border effect - z-0 to render below content -->
    <div
      v-if="shimmer"
      class="absolute z-0 inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <div
        class="absolute inset-0"
        style="background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%); background-size: 200% 100%; animation: shimmer 1.5s infinite linear;"
      />
    </div>

    <!-- Content Layer: z-10 wrapper ensures all content renders above decorative layers -->
    <span class="relative z-10 inline-flex items-center justify-center gap-[inherit]">
      <!-- Loading spinner -->
      <svg
        v-if="loading"
        class="animate-spin h-4 w-4"
        :class="{ 'mr-2': $slots.default }"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
        role="presentation"
      >
        <circle
          class="opacity-20"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="3"
        />
        <path
          class="opacity-80"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>

      <!-- Left icon slot -->
      <span v-if="!loading && $slots.leftIcon" class="shrink-0">
        <slot name="leftIcon" />
      </span>

      <!-- Default content -->
      <slot />

      <!-- Right icon slot -->
      <span v-if="!loading && $slots.rightIcon" class="shrink-0">
        <slot name="rightIcon" />
      </span>
    </span>
  </button>
</template>

<style scoped>
@keyframes ripple {
  to {
    width: 200px;
    height: 200px;
    opacity: 0;
  }
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
