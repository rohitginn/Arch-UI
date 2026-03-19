<script setup lang="ts">
/**
 * GlassPanel - Premium glassmorphic panel component for Vue 3
 * 
 * Features:
 * - Frosted glass backdrop blur
 * - Header with title and actions
 * - Collapsible content
 * - Multiple visual variants
 * - Loading state overlay
 */

import { ref, computed } from 'vue';
import { cn } from '@archui/core';

interface GlassPanelProps {
  /** Panel title */
  title?: string;
  /** Panel description/subtitle */
  description?: string;
  /** Visual variant */
  variant?: 'default' | 'bordered' | 'glow';
  /** Blur intensity */
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  /** Collapsible panel */
  collapsible?: boolean;
  /** Initial collapsed state */
  defaultCollapsed?: boolean;
  /** Loading state */
  loading?: boolean;
  /** No padding on content */
  noPadding?: boolean;
  /** Additional CSS classes */
  class?: string;
}

const props = withDefaults(defineProps<GlassPanelProps>(), {
  variant: 'default',
  blur: 'lg',
  collapsible: false,
  defaultCollapsed: false,
  loading: false,
  noPadding: false,
});

// Collapsed state
const isCollapsed = ref(props.defaultCollapsed);

const toggleCollapse = () => {
  if (props.collapsible) {
    isCollapsed.value = !isCollapsed.value;
  }
};

// Variant classes
const variantClasses = computed(() => {
  const variants = {
    default: [
      // Light theme - visible background and border
      'bg-white/70 backdrop-blur-xl',
      'border-white/40',
      'shadow-[0_8px_32px_rgba(0,0,0,0.05)]',
      'dark:bg-white/[0.06]',
      'dark:border-white/[0.08]',
    ],
    bordered: [
      // Light theme
      'bg-white dark:bg-white/[0.03]',
      'border-2 border-slate-200 dark:border-white/[0.1]',
    ],
    glow: [
      // Light theme
      'bg-white dark:bg-white/[0.06]',
      'border-slate-200 dark:border-white/[0.1]',
      'shadow-lg shadow-slate-200/50 dark:shadow-[0_0_30px_rgba(255,255,255,0.05)]',
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

// Panel classes
const panelClasses = computed(() => {
  return cn(
    'relative',
    'rounded-2xl',
    'border',
    'overflow-hidden',
    'transition-all',
    'duration-200',
    blurClasses.value,
    variantClasses.value,
    props.class
  );
});
</script>

<template>
  <div :class="panelClasses">
    <!-- Loading overlay -->
    <div
      v-if="loading"
      :class="cn(
        'absolute inset-0 z-20',
        'flex items-center justify-center',
        'bg-white/50 dark:bg-black/50',
        'backdrop-blur-sm'
      )"
    >
      <svg
        class="animate-spin h-8 w-8 text-slate-600 dark:text-white/70"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>

    <!-- Header -->
    <div
      v-if="title || $slots.header || $slots.actions"
      :class="cn(
        'flex items-center justify-between',
        'px-6 py-4',
        'border-b border-slate-200 dark:border-white/[0.08]',
        collapsible && 'cursor-pointer hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-colors'
      )"
      @click="toggleCollapse"
    >
      <div class="flex-1">
        <slot name="header">
          <h3
            v-if="title"
            class="text-lg font-semibold text-slate-900 dark:text-white"
          >
            {{ title }}
          </h3>
          <p
            v-if="description"
            class="mt-0.5 text-sm text-slate-500 dark:text-white/50"
          >
            {{ description }}
          </p>
        </slot>
      </div>
      
      <!-- Actions or collapse icon -->
      <div class="flex items-center gap-2">
        <slot name="actions" />
        
        <svg
          v-if="collapsible"
          :class="cn(
            'w-5 h-5',
            'text-slate-400 dark:text-white/40',
            'transition-transform duration-200',
            isCollapsed && 'rotate-180'
          )"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>

    <!-- Content -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-[2000px]"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 max-h-[2000px]"
      leave-to-class="opacity-0 max-h-0"
    >
      <div
        v-show="!isCollapsed"
        :class="cn(!noPadding && 'p-6')"
      >
        <slot />
      </div>
    </Transition>

    <!-- Footer -->
    <div
      v-if="$slots.footer"
      :class="cn(
        'px-6 py-4',
        'border-t border-slate-200 dark:border-white/[0.08]',
        'bg-slate-50 dark:bg-white/[0.03]'
      )"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
