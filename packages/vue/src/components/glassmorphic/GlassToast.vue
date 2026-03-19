<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import { cn } from '@archui/core';

interface Props {
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info' | 'glass';
  duration?: number;
  closable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  closable: true,
});

const emit = defineEmits<{
  (e: 'close'): void;
}>();

let timer: number | null = null;

onMounted(() => {
  if (props.duration && props.duration > 0) {
    timer = window.setTimeout(() => {
      emit('close');
    }, props.duration);
  }
});

onUnmounted(() => {
  if (timer) clearTimeout(timer);
});

const variantClasses = computed(() => {
  const variants = {
    default: 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100',
    success: 'bg-emerald-50/90 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100',
    error: 'bg-red-50/90 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-900 dark:text-red-100',
    warning: 'bg-amber-50/90 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100',
    info: 'bg-blue-50/90 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100',
    glass: 'bg-white/60 dark:bg-black/40 border-white/40 dark:border-white/10 text-slate-900 dark:text-white backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)]',
  };
  return variants[props.variant];
});

const iconColorClasses = computed(() => {
  const colors = {
    default: 'text-slate-500 dark:text-slate-400',
    success: 'text-emerald-600 dark:text-emerald-400',
    error: 'text-red-600 dark:text-red-400',
    warning: 'text-amber-600 dark:text-amber-400',
    info: 'text-blue-600 dark:text-blue-400',
    glass: 'text-slate-500 dark:text-slate-300',
  };
  return colors[props.variant];
});

const iconPaths = computed(() => {
  const paths = {
    default: null,
    success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    error: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
    warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    glass: null,
  };
  return paths[props.variant];
});
</script>

<template>
  <div :class="cn('relative flex items-start gap-3 p-4 rounded-xl shadow-lg border backdrop-blur-sm transition-all overflow-hidden', variantClasses)" role="alert">
    <!-- Icon -->
    <div v-if="iconPaths || $slots.icon" :class="cn('flex-shrink-0 mt-0.5', iconColorClasses)">
      <slot name="icon">
        <svg v-if="iconPaths" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="iconPaths" />
        </svg>
      </slot>
    </div>

    <!-- Content -->
    <div class="flex-1 min-w-0">
      <p v-if="title" class="font-semibold text-sm leading-tight">{{ title }}</p>
      <p v-if="description" :class="cn('text-sm opacity-90', title ? 'mt-1' : 'leading-tight')">
        {{ description }}
      </p>
      <div v-if="$slots.action" class="mt-3">
        <slot name="action" />
      </div>
    </div>

    <!-- Close button -->
    <button
      v-if="closable"
      @click="emit('close')"
      :class="cn('flex-shrink-0 p-1 -mt-1 -mr-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500')"
      aria-label="Close notification"
    >
      <svg class="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Progress bar for duration -->
    <div
      v-if="duration && duration > 0"
      :class="cn('absolute bottom-0 left-0 h-1 bg-current opacity-20', 'animate-[toast-progress_linear_forwards]')"
      :style="{ animationDuration: `${duration}ms` }"
    />
  </div>
</template>

<style>
@keyframes toast-progress {
  from { width: 100%; }
  to { width: 0%; }
}
</style>
