<script setup lang="ts">
/**
 * GlassLoadingButton — GlassButton with integrated loading arc spinner.
 *
 * Animation is a smooth SVG arc rotation — not a border trick or bounce.
 * Width locks when loading begins so layout doesn't shift.
 *
 * @example
 * <GlassLoadingButton :is-loading="saving" loading-text="Saving…" variant="solid">
 *   Save changes
 * </GlassLoadingButton>
 */
import { ref, computed, watch, nextTick } from 'vue';
import { cn } from '@archui/core';

interface Props {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'outline' | 'solid';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon' | 'icon-sm' | 'icon-lg';
  isLoading?: boolean;
  loadingText?: string;
  spinnerPosition?: 'left' | 'right' | 'replace';
  disabled?: boolean;
  glow?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  isLoading: false,
  spinnerPosition: 'left',
  disabled: false,
  glow: false,
  fullWidth: false,
  type: 'button',
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const buttonRef = ref<HTMLButtonElement | null>(null);
const lockedWidth = ref<number | undefined>(undefined);
const isDisabled = computed(() => props.disabled || props.isLoading);

/* Lock button width when loading begins */
watch(
  () => props.isLoading,
  async (loading) => {
    if (loading && buttonRef.value) {
      await nextTick();
      lockedWidth.value = Math.ceil(buttonRef.value.getBoundingClientRect().width);
    } else {
      lockedWidth.value = undefined;
    }
  }
);

const spinnerSizeMap: Record<string, string> = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-[18px] h-[18px]',
  xl: 'w-5 h-5',
  icon: 'w-4 h-4',
  'icon-sm': 'w-3.5 h-3.5',
  'icon-lg': 'w-[18px] h-[18px]',
};

const spinnerClass = computed(() => spinnerSizeMap[props.size ?? 'md'] ?? 'w-4 h-4');

/* ---- Variant → class maps (mirrors GlassButton exactly) ---- */
const variantClasses: Record<string, string> = {
  default: [
    'bg-white/80 backdrop-blur-md border-black/[0.08] text-slate-900',
    'shadow-[0_2px_4px_rgba(0,0,0,0.02),0_1px_0_rgba(255,255,255,0.5)_inset]',
    'hover:bg-white/90 hover:border-black/[0.12] hover:-translate-y-[1px]',
    'hover:shadow-[0_4px_12px_rgba(0,0,0,0.05),0_1px_0_rgba(255,255,255,0.6)_inset]',
    'focus-visible:ring-slate-500/30 focus-visible:ring-offset-white',
    'dark:bg-white/[0.08] dark:border-white/[0.12] dark:text-white',
    'dark:hover:bg-white/[0.12] dark:hover:border-white/[0.2]',
  ].join(' '),
  primary: [
    'bg-primary border-primary text-primary-foreground',
    'shadow-[0_2px_8px_rgba(var(--primary),0.25),0_1px_0_rgba(255,255,255,0.2)_inset]',
    'hover:bg-primary/90 hover:-translate-y-[1px]',
    'hover:shadow-[0_4px_16px_rgba(var(--primary),0.4)]',
    'focus-visible:ring-primary',
    'dark:bg-primary/80 dark:border-primary/50',
  ].join(' '),
  secondary: [
    'bg-secondary/80 backdrop-blur-sm border-secondary/20 text-secondary-foreground',
    'shadow-sm hover:bg-secondary/90 hover:-translate-y-[1px]',
    'dark:bg-secondary/40 dark:border-secondary/50',
  ].join(' '),
  danger: [
    'bg-destructive border-destructive text-destructive-foreground',
    'hover:bg-destructive/90 hover:-translate-y-[1px]',
    'dark:bg-destructive/40 dark:border-destructive/50',
  ].join(' '),
  success: [
    'bg-emerald-600 border-emerald-700 text-white',
    'hover:bg-emerald-700 hover:-translate-y-[1px]',
    'dark:bg-emerald-500/20 dark:border-emerald-400/30 dark:text-emerald-50',
  ].join(' '),
  warning: [
    'bg-amber-500 border-amber-600 text-white',
    'hover:bg-amber-600 hover:-translate-y-[1px]',
    'dark:bg-amber-500/20 dark:border-amber-400/30 dark:text-amber-50',
  ].join(' '),
  ghost: [
    'bg-transparent border-transparent text-slate-700 dark:text-slate-300',
    'hover:bg-black/[0.05] hover:text-slate-900',
    'dark:hover:bg-white/[0.1] dark:hover:text-white',
  ].join(' '),
  outline: [
    'bg-transparent border-black/[0.15] text-slate-900',
    'hover:bg-black/[0.04] hover:border-black/[0.3] hover:-translate-y-[1px]',
    'dark:border-white/[0.2] dark:text-white dark:hover:bg-white/[0.1]',
  ].join(' '),
  solid: [
    'bg-slate-900 border-slate-900 text-white shadow-md',
    'hover:bg-slate-800 hover:shadow-lg hover:-translate-y-[1px]',
    'dark:bg-white dark:border-white dark:text-slate-900 dark:hover:bg-slate-200',
  ].join(' '),
};

const sizeClasses: Record<string, string> = {
  sm: 'h-8 px-3.5 text-xs font-semibold gap-1.5 rounded-lg',
  md: 'h-10 px-5 text-sm font-medium gap-2 rounded-xl',
  lg: 'h-12 px-7 text-base font-medium gap-2.5 rounded-xl',
  xl: 'h-14 px-9 text-lg font-medium gap-3 rounded-2xl',
  icon: 'h-10 w-10 rounded-xl p-0 justify-center',
  'icon-sm': 'h-8 w-8 rounded-lg p-0 justify-center',
  'icon-lg': 'h-12 w-12 rounded-xl p-0 justify-center',
};

const buttonClass = computed(() =>
  cn(
    /* Base */
    'relative inline-flex items-center justify-center font-medium border cursor-pointer select-none',
    'transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]',
    'dark:backdrop-blur-md',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
    'active:scale-[0.97] active:transition-transform active:duration-75',
    /* Variant */
    variantClasses[props.variant],
    /* Size */
    sizeClasses[props.size],
    /* Loading cursor */
    props.isLoading && 'cursor-wait',
    /* Full width */
    props.fullWidth && 'w-full',
    /* Glow */
    props.glow && [
      'shadow-[0_0_20px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.1)]',
      'hover:shadow-[0_0_30px_rgba(0,0,0,0.15),0_4px_12px_rgba(0,0,0,0.08)]',
    ],
    props.class
  )
);
</script>

<template>
  <style>
    @keyframes glb-spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes glb-appear {
      from { opacity: 0; transform: scale(0.7); }
      to   { opacity: 1; transform: scale(1); }
    }
  </style>

  <button
    ref="buttonRef"
    :type="type"
    :disabled="isDisabled"
    :aria-busy="isLoading"
    :aria-disabled="isDisabled"
    :class="buttonClass"
    :style="lockedWidth != null ? { minWidth: `${lockedWidth}px` } : {}"
    @click="(e) => !isDisabled && emit('click', e)"
  >
    <!-- Spinner LEFT -->
    <template v-if="spinnerPosition === 'left'">
      <svg
        v-if="isLoading"
        :class="cn(spinnerClass, 'shrink-0')"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style="animation: glb-appear 180ms cubic-bezier(0.4,0,0.2,1) both"
      >
        <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.25" />
        <circle
          cx="8" cy="8" r="6"
          stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-dasharray="37.7" stroke-dashoffset="28"
          style="transform-origin: 8px 8px; animation: glb-spin 0.9s linear infinite"
        />
      </svg>
      <slot />
    </template>

    <!-- Spinner RIGHT -->
    <template v-else-if="spinnerPosition === 'right'">
      <slot />
      <svg
        v-if="isLoading"
        :class="cn(spinnerClass, 'shrink-0')"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style="animation: glb-appear 180ms cubic-bezier(0.4,0,0.2,1) both"
      >
        <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.25" />
        <circle
          cx="8" cy="8" r="6"
          stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-dasharray="37.7" stroke-dashoffset="28"
          style="transform-origin: 8px 8px; animation: glb-spin 0.9s linear infinite"
        />
      </svg>
    </template>

    <!-- Spinner REPLACE -->
    <template v-else>
      <template v-if="isLoading">
        <svg
          :class="cn(spinnerClass, 'shrink-0')"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style="animation: glb-appear 180ms cubic-bezier(0.4,0,0.2,1) both"
        >
          <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.25" />
          <circle
            cx="8" cy="8" r="6"
            stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-dasharray="37.7" stroke-dashoffset="28"
            style="transform-origin: 8px 8px; animation: glb-spin 0.9s linear infinite"
          />
        </svg>
        <span
          v-if="loadingText"
          style="animation: glb-appear 180ms cubic-bezier(0.4,0,0.2,1) both"
        >
          {{ loadingText }}
        </span>
      </template>
      <template v-else>
        <slot />
      </template>
    </template>
  </button>
</template>
