<script setup lang="ts">
/**
 * GlassCopyButton - Pre-wired clipboard copy button.
 *
 * Shows clipboard icon → checkmark on success → reverts after duration.
 *
 * @example
 * <GlassCopyButton value="npm install @archui/vue" />
 */

import { ref, onUnmounted, computed } from 'vue';
import { cn } from '@archui/core';

interface GlassCopyButtonProps {
  /** Text value to copy */
  value: string;
  /** Visual variant */
  variant?: 'default' | 'ghost' | 'outline' | 'primary';
  /** Button size */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Duration to show copied state (ms) */
  copiedDuration?: number;
  /** Accessible label */
  ariaLabel?: string;
  /** Disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  class?: string;
}

const props = withDefaults(defineProps<GlassCopyButtonProps>(), {
  variant: 'default',
  size: 'sm',
  copiedDuration: 2000,
  ariaLabel: 'Copy to clipboard',
  disabled: false,
});

const emit = defineEmits<{
  (e: 'copied'): void;
}>();

const copied = ref(false);
let timeout: ReturnType<typeof setTimeout> | undefined;

onUnmounted(() => {
  if (timeout) clearTimeout(timeout);
});

const handleCopy = async () => {
  if (props.disabled) return;
  try {
    await navigator.clipboard.writeText(props.value);
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = props.value;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
  copied.value = true;
  emit('copied');
  timeout = setTimeout(() => {
    copied.value = false;
  }, props.copiedDuration);
};

const sizeMap: Record<string, { button: string[]; icon: string }> = {
  xs: { button: ['h-7', 'w-7', 'rounded-lg'], icon: 'h-3.5 w-3.5' },
  sm: { button: ['h-8', 'w-8', 'rounded-lg'], icon: 'h-4 w-4' },
  md: { button: ['h-10', 'w-10', 'rounded-xl'], icon: 'h-5 w-5' },
  lg: { button: ['h-12', 'w-12', 'rounded-xl'], icon: 'h-6 w-6' },
};

const variantClasses: Record<string, string[]> = {
  default: [
    'bg-white/80', 'backdrop-blur-md', 'border-black/[0.08]', 'text-slate-900',
    'hover:bg-white/90', 'hover:border-black/[0.12]', 'hover:-translate-y-[1px]',
    'focus-visible:ring-slate-500/30', 'focus-visible:ring-offset-white',
    'dark:bg-white/[0.08]', 'dark:border-white/[0.12]', 'dark:text-white',
    'dark:hover:bg-white/[0.12]', 'dark:hover:border-white/[0.2]',
    'dark:focus-visible:ring-white/70', 'dark:focus-visible:ring-offset-slate-900',
  ],
  ghost: [
    'bg-transparent', 'border-transparent', 'text-slate-700', 'shadow-none',
    'hover:bg-black/[0.05]', 'hover:text-slate-900',
    'dark:text-slate-300', 'dark:hover:bg-white/[0.1]', 'dark:hover:text-white',
    'focus-visible:ring-slate-400', 'focus-visible:ring-offset-0',
  ],
  outline: [
    'bg-transparent', 'border-slate-300', 'text-slate-700',
    'hover:bg-slate-50', 'hover:border-slate-400', 'hover:-translate-y-[1px]',
    'dark:border-white/20', 'dark:text-white',
    'dark:hover:bg-white/[0.06]', 'dark:hover:border-white/30',
    'focus-visible:ring-slate-400', 'focus-visible:ring-offset-0',
  ],
  primary: [
    'bg-blue-600', 'border-blue-700', 'text-white',
    'hover:bg-blue-700', 'hover:border-blue-800', 'hover:-translate-y-[1px]',
    'focus-visible:ring-blue-500', 'focus-visible:ring-offset-white',
    'dark:bg-blue-500/20', 'dark:border-blue-400/30', 'dark:text-white',
    'dark:hover:bg-blue-500/30', 'dark:hover:border-blue-400/40',
    'dark:focus-visible:ring-blue-400', 'dark:focus-visible:ring-offset-slate-900',
  ],
};

const buttonClasses = computed(() =>
  cn(
    'relative inline-flex items-center justify-center',
    'border cursor-pointer select-none p-0',
    'transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]',
    'dark:backdrop-blur-md',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
    'active:scale-[0.97] active:transition-transform active:duration-75',
    sizeMap[props.size].button,
    variantClasses[props.variant],
    props.class
  )
);

const currentLabel = computed(() => copied.value ? 'Copied!' : props.ariaLabel);
</script>

<template>
  <button
    type="button"
    :class="buttonClasses"
    :disabled="disabled"
    :aria-label="currentLabel"
    @click="handleCopy"
  >
    <!-- Check icon (copied state) -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      :class="[
        sizeMap[size].icon,
        'absolute transition-all duration-200',
        copied ? 'scale-100 opacity-100 text-emerald-500 dark:text-emerald-400' : 'scale-75 opacity-0'
      ]"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>

    <!-- Clipboard icon (idle state) -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      :class="[
        sizeMap[size].icon,
        'transition-all duration-200',
        copied ? 'scale-75 opacity-0' : 'scale-100 opacity-100'
      ]"
      aria-hidden="true"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  </button>
</template>
