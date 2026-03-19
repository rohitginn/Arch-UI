<script setup lang="ts">
/**
 * GlassSplitButton - Button with primary action + dropdown toggle.
 *
 * Combines a main action button with a chevron toggle that opens a
 * glassmorphic dropdown menu.
 *
 * @example
 * <GlassSplitButton
 *   label="Save"
 *   :menu-items="[{ key: 'draft', label: 'Save as draft' }, { key: 'template', label: 'Save as template' }]"
 *   @action="handleSave"
 *   @menu-select="handleMenuSelect"
 * />
 */

import { ref, computed, onMounted, onUnmounted } from 'vue';
import { cn } from '@archui/core';

interface SplitButtonMenuItem {
  key: string;
  label: string;
  disabled?: boolean;
  danger?: boolean;
}

interface GlassSplitButtonProps {
  /** Primary action label */
  label: string;
  /** Dropdown menu items */
  menuItems: SplitButtonMenuItem[];
  /** Visual variant */
  variant?: 'default' | 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Loading state */
  loading?: boolean;
  /** Disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  class?: string;
}

const props = withDefaults(defineProps<GlassSplitButtonProps>(), {
  variant: 'default',
  size: 'md',
  loading: false,
  disabled: false,
});

const emit = defineEmits<{
  (e: 'action'): void;
  (e: 'menuSelect', item: SplitButtonMenuItem): void;
}>();

const open = ref(false);
const focusedIndex = ref(-1);
const wrapperRef = ref<HTMLDivElement | null>(null);

const toggle = () => {
  open.value = !open.value;
  if (open.value) focusedIndex.value = 0;
};

const selectItem = (item: SplitButtonMenuItem) => {
  if (item.disabled) return;
  emit('menuSelect', item);
  open.value = false;
};

// Close on outside click
const onOutsideClick = (e: MouseEvent) => {
  if (!wrapperRef.value?.contains(e.target as Node)) {
    open.value = false;
    focusedIndex.value = -1;
  }
};

const onEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && open.value) {
    open.value = false;
    focusedIndex.value = -1;
  }
};

onMounted(() => {
  document.addEventListener('mousedown', onOutsideClick);
  document.addEventListener('keydown', onEscape);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', onOutsideClick);
  document.removeEventListener('keydown', onEscape);
});

const handleMenuKeyDown = (e: KeyboardEvent) => {
  const enabledItems = props.menuItems.filter((i) => !i.disabled);
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    focusedIndex.value = (focusedIndex.value + 1) % enabledItems.length;
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    focusedIndex.value =
      focusedIndex.value <= 0 ? enabledItems.length - 1 : focusedIndex.value - 1;
  } else if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    const enabled = enabledItems[focusedIndex.value];
    if (enabled) selectItem(enabled);
  }
};

/* ------------------------------------------------------------------ */
/*  Variant maps                                                       */
/* ------------------------------------------------------------------ */

const wrapperVariants: Record<string, string[]> = {
  default: [
    'bg-white/80', 'backdrop-blur-md', 'border-black/[0.08]',
    'shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08)]',
    'dark:bg-white/[0.08]', 'dark:border-white/[0.12]',
    'dark:shadow-[0_2px_10px_-2px_rgba(0,0,0,0.3)]',
  ],
  primary: [
    'bg-blue-600', 'border-blue-700',
    'shadow-[0_2px_8px_-2px_rgba(59,130,246,0.4)]',
    'dark:bg-blue-500/90', 'dark:border-blue-400/30',
  ],
  secondary: [
    'bg-slate-100', 'border-slate-200',
    'dark:bg-slate-800', 'dark:border-slate-700',
  ],
  danger: [
    'bg-red-600', 'border-red-700',
    'shadow-[0_2px_8px_-2px_rgba(239,68,68,0.4)]',
    'dark:bg-red-500/90', 'dark:border-red-400/30',
  ],
  success: [
    'bg-emerald-600', 'border-emerald-700',
    'shadow-[0_2px_8px_-2px_rgba(16,185,129,0.4)]',
    'dark:bg-emerald-500/90', 'dark:border-emerald-400/30',
  ],
  outline: [
    'bg-transparent', 'border-slate-300',
    'dark:border-white/20',
  ],
};

const actionVariants: Record<string, string> = {
  default: 'text-slate-900 hover:bg-black/[0.05] dark:text-white dark:hover:bg-white/[0.08]',
  primary: 'text-white hover:bg-blue-700 dark:hover:bg-blue-600',
  secondary: 'text-slate-800 hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-slate-700',
  danger: 'text-white hover:bg-red-700 dark:hover:bg-red-600',
  success: 'text-white hover:bg-emerald-700 dark:hover:bg-emerald-600',
  outline: 'text-slate-700 hover:bg-slate-50 dark:text-white dark:hover:bg-white/[0.06]',
};

const dividerVariants: Record<string, string> = {
  default: 'bg-black/[0.1] dark:bg-white/[0.15]',
  primary: 'bg-blue-800/30 dark:bg-blue-300/20',
  secondary: 'bg-slate-300 dark:bg-slate-600',
  danger: 'bg-red-800/30 dark:bg-red-300/20',
  success: 'bg-emerald-800/30 dark:bg-emerald-300/20',
  outline: 'bg-slate-300 dark:bg-white/20',
};

const sizeMap: Record<string, { wrapper: string; action: string; toggle: string; icon: string }> = {
  sm: { wrapper: 'h-8 text-sm', action: 'px-3', toggle: 'px-1.5', icon: 'h-3.5 w-3.5' },
  md: { wrapper: 'h-10 text-sm', action: 'px-4', toggle: 'px-2', icon: 'h-4 w-4' },
  lg: { wrapper: 'h-12 text-base', action: 'px-5', toggle: 'px-2.5', icon: 'h-5 w-5' },
};

const wrapperClasses = computed(() =>
  cn(
    'inline-flex items-center rounded-xl overflow-hidden border',
    'transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]',
    sizeMap[props.size].wrapper,
    wrapperVariants[props.variant],
    props.disabled && 'opacity-50 pointer-events-none',
    props.class
  )
);

const sharedBtnBase =
  'inline-flex items-center justify-center h-full cursor-pointer select-none ' +
  'transition-colors duration-150 outline-none ' +
  'focus-visible:ring-2 focus-visible:ring-inset ' +
  'disabled:opacity-50 disabled:pointer-events-none';
</script>

<template>
  <div ref="wrapperRef" class="relative inline-flex">
    <div :class="wrapperClasses">
      <!-- Primary action -->
      <button
        type="button"
        :class="cn(sharedBtnBase, sizeMap[size].action, actionVariants[variant], 'gap-2 font-medium rounded-l-[inherit]')"
        :disabled="disabled || loading"
        @click="emit('action')"
      >
        <svg
          v-if="loading"
          :class="cn(sizeMap[size].icon, 'animate-spin')"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="12" cy="12" r="10"
            stroke="currentColor" stroke-width="3"
            stroke-dasharray="60" stroke-dashoffset="15"
            stroke-linecap="round"
            class="opacity-40"
          />
        </svg>
        <slot name="icon" v-else />
        {{ label }}
      </button>

      <!-- Divider -->
      <span :class="cn('w-px self-stretch', dividerVariants[variant])" aria-hidden="true" />

      <!-- Dropdown toggle -->
      <button
        type="button"
        :class="cn(sharedBtnBase, sizeMap[size].toggle, actionVariants[variant], 'rounded-r-[inherit]')"
        :disabled="disabled"
        aria-haspopup="true"
        :aria-expanded="open"
        aria-label="More options"
        @click="toggle"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          :class="cn(sizeMap[size].icon, 'transition-transform duration-200', open && 'rotate-180')"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
    </div>

    <!-- Dropdown menu -->
    <ul
      v-if="open"
      role="menu"
      @keydown="handleMenuKeyDown"
      :class="cn(
        'absolute top-full right-0 mt-1 z-50 min-w-[180px]',
        'rounded-xl overflow-hidden py-1',
        'backdrop-blur-xl border',
        'bg-white/80 border-white/40',
        'shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1),0_0_0_1px_rgba(255,255,255,0.5)_inset]',
        'dark:bg-black/60 dark:border-white/10',
        'dark:shadow-[0_10px_40px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1)_inset]'
      )"
    >
      <li
        v-for="item in menuItems"
        :key="item.key"
        role="menuitem"
        :tabindex="menuItems.filter(i => !i.disabled).indexOf(item) === focusedIndex ? 0 : -1"
        :aria-disabled="item.disabled || undefined"
        :class="cn(
          'flex items-center gap-3 w-full px-4 py-2.5 text-sm',
          'cursor-pointer select-none outline-none',
          'transition-colors duration-150',
          item.danger
            ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10'
            : 'text-slate-700 dark:text-slate-300 hover:bg-black/[0.04] dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white',
          menuItems.filter(i => !i.disabled).indexOf(item) === focusedIndex &&
            (item.danger ? 'bg-red-50 dark:bg-red-500/10' : 'bg-black/[0.04] dark:bg-white/10'),
          item.disabled && 'opacity-50 pointer-events-none'
        )"
        @click="selectItem(item)"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>
