<script setup lang="ts">
/**
 * GlassAlert - Premium glassmorphic alert component for Vue 3
 */

import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { cn } from '@archui/core';

interface GlassAlertProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  dismissible?: boolean;
  autoDismiss?: number;
  showIcon?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<GlassAlertProps>(), {
  variant: 'default',
  size: 'md',
  dismissible: false,
  autoDismiss: 0,
  showIcon: true,
});

const emit = defineEmits<{
  (e: 'dismiss'): void;
}>();

const isVisible = ref(true);
let dismissTimer: number | null = null;

const dismiss = () => {
  isVisible.value = false;
  emit('dismiss');
};

const variantClasses = computed(() => {
  const variants = {
    default: {
      container: 'bg-white/60 dark:bg-black/20 border-black/10 dark:border-white/10 text-slate-900 dark:text-slate-100',
      icon: 'text-slate-600 dark:text-slate-400',
    },
    info: {
      container: 'bg-blue-50/60 dark:bg-blue-500/10 border-blue-200/50 dark:border-blue-400/20 text-blue-900 dark:text-blue-100',
      icon: 'text-blue-600 dark:text-blue-400',
    },
    success: {
      container: 'bg-emerald-50/60 dark:bg-emerald-500/10 border-emerald-200/50 dark:border-emerald-400/20 text-emerald-900 dark:text-emerald-100',
      icon: 'text-emerald-600 dark:text-emerald-400',
    },
    warning: {
      container: 'bg-amber-50/60 dark:bg-amber-500/10 border-amber-200/50 dark:border-amber-400/20 text-amber-900 dark:text-amber-100',
      icon: 'text-amber-600 dark:text-amber-400',
    },
    error: {
      container: 'bg-red-50/60 dark:bg-red-500/10 border-red-200/50 dark:border-red-400/20 text-red-900 dark:text-red-100',
      icon: 'text-red-600 dark:text-red-400',
    },
    glass: {
      container: 'bg-white/40 dark:bg-white/10 border-white/40 dark:border-white/20 text-slate-900 dark:text-white shadow-sm',
      icon: 'text-slate-600 dark:text-slate-300',
    }
  };
  return variants[props.variant];
});

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'p-3 text-sm gap-2',
    md: 'p-4 text-sm gap-3',
    lg: 'p-5 text-base gap-4',
  };
  return sizes[props.size];
});

const iconSizeClasses = computed(() => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };
  return sizes[props.size];
});

const alertClasses = computed(() => {
  return cn(
    'relative w-full rounded-xl flex items-start border backdrop-blur-md transition-all duration-300',
    variantClasses.value.container,
    sizeClasses.value,
    props.class
  );
});

const iconPaths = computed(() => {
  const icons = {
    default: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    error: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
    glass: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  };
  return icons[props.variant];
});

const clearAutoDismiss = () => {
  if (dismissTimer) {
    clearTimeout(dismissTimer);
    dismissTimer = null;
  }
};

const setupAutoDismiss = () => {
  clearAutoDismiss();
  if (props.autoDismiss > 0 && isVisible.value) {
    dismissTimer = window.setTimeout(() => {
      dismiss();
    }, props.autoDismiss);
  }
};

onMounted(setupAutoDismiss);
watch(() => props.autoDismiss, setupAutoDismiss);
onUnmounted(clearAutoDismiss);
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-2 scale-95"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-active-class="transition-all duration-300 ease-out"
    leave-from-class="opacity-100 scale-95"
    leave-to-class="opacity-0 scale-95"
  >
    <div v-if="isVisible" :class="alertClasses" role="alert" aria-live="polite">
      <!-- Icon -->
      <div v-if="showIcon" :class="cn('shrink-0 mt-0.5', variantClasses.icon)">
        <slot name="icon">
          <svg
            :class="iconSizeClasses"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              :d="iconPaths"
            />
          </svg>
        </slot>
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <h5
          v-if="title"
          :class="cn('font-semibold', props.size === 'sm' ? 'text-sm mb-0.5' : props.size === 'md' ? 'text-sm mb-1' : 'text-base mb-1')"
        >
          {{ title }}
        </h5>
        <div
          v-if="description || $slots.default"
          :class="cn('opacity-90', props.size === 'sm' ? 'text-xs' : props.size === 'md' ? 'text-sm' : 'text-sm')"
        >
          <slot>{{ description }}</slot>
        </div>
      </div>

      <!-- Dismiss button -->
      <button
        v-if="dismissible"
        type="button"
        :class="cn(
          'shrink-0 rounded-md p-1 -mr-1 -mt-1',
          'opacity-60 hover:opacity-100',
          'transition-colors duration-200',
          'hover:bg-black/5 dark:hover:bg-white/10',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2'
        )"
        @click="dismiss"
        aria-label="Dismiss alert"
      >
        <svg
          :class="iconSizeClasses"
          style="width: 1em; height: 1em; font-size: 80%"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </Transition>
</template>
