<script setup lang="ts">
/**
 * GlassTooltip - Token-based frosted glass tooltip for Vue 3
 */
import { ref, onUnmounted } from 'vue';
import { cn } from '@archui/core';

type GlassVariant = 'default' | 'solid' | 'bordered';

interface Props {
  content?: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  variant?: GlassVariant;
  class?: string;
  disabled?: boolean;
}

const variantSurface: Record<GlassVariant, string> = {
  default: 'bg-[var(--glass-surface)] backdrop-blur-xl shadow-[var(--glass-depth-sm)]',
  solid: 'bg-[var(--glass-solid-bg)] backdrop-blur-2xl shadow-[var(--glass-solid-shadow)]',
  bordered: 'bg-[var(--glass-bordered-bg)] backdrop-blur-lg shadow-[var(--glass-bordered-shadow)]',
};
const variantBorder: Record<GlassVariant, string> = {
  default: 'border border-[var(--glass-edge)]',
  solid: 'border border-[var(--glass-solid-border)]',
  bordered: 'border border-[var(--glass-bordered-border)]',
};

const props = withDefaults(defineProps<Props>(), {
  content: '',
  placement: 'top',
  delay: 200,
  variant: 'default',
  disabled: false,
});

const visible = ref(false);
let showTimer: ReturnType<typeof setTimeout> | undefined;
let hideTimer: ReturnType<typeof setTimeout> | undefined;

const placementClasses: Record<string, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

const arrowClasses: Record<string, string> = {
  top: 'top-full left-1/2 -translate-x-1/2 border-t-[var(--glass-surface)] border-l-transparent border-r-transparent border-b-transparent',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-[var(--glass-surface)] border-l-transparent border-r-transparent border-t-transparent',
  left: 'left-full top-1/2 -translate-y-1/2 border-l-[var(--glass-surface)] border-t-transparent border-b-transparent border-r-transparent',
  right: 'right-full top-1/2 -translate-y-1/2 border-r-[var(--glass-surface)] border-t-transparent border-b-transparent border-l-transparent',
};

const show = () => {
  if (props.disabled) return;
  clearTimeout(hideTimer);
  showTimer = setTimeout(() => { visible.value = true; }, props.delay);
};

const hide = () => {
  clearTimeout(showTimer);
  visible.value = false;
};

onUnmounted(() => {
  clearTimeout(showTimer);
  clearTimeout(hideTimer);
});
</script>

<template>
  <div class="relative inline-flex" @mouseenter="show" @mouseleave="hide" @focus="show" @blur="hide">
    <slot />
    <Transition enter-active-class="transition-all duration-150" enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100" leave-active-class="transition-all duration-100"
      leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
      <div v-if="visible" :class="cn('absolute z-50 pointer-events-none', placementClasses[placement])" role="tooltip">
        <div :class="cn(
          'relative px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap',
          variantSurface[variant],
          variantBorder[variant],
          'text-[var(--glass-text)]',
          props.class,
        )">
          <slot name="content">{{ content }}</slot>
          <span :class="cn('absolute w-0 h-0 border-[5px]', arrowClasses[placement])" />
        </div>
      </div>
    </Transition>
  </div>
</template>
