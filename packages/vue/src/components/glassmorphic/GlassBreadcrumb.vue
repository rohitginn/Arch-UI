<script setup lang="ts">
/**
 * GlassBreadcrumb - Premium glassmorphic breadcrumb navigation
 * 
 * Features:
 * - Frosted glass container with shiny border
 * - 3D inset effect on items
 * - Animated separators
 * - Responsive truncation
 */

import { computed } from 'vue';
import { cn } from '@archui/core';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
}

interface GlassBreadcrumbProps {
  /** Breadcrumb items */
  items: BreadcrumbItem[];
  /** Separator type */
  separator?: 'chevron' | 'slash' | 'arrow';
  /** Visual variant */
  variant?: 'default' | 'glass' | 'minimal';
  /** Show home icon for first item */
  showHomeIcon?: boolean;
  /** Maximum items to show (rest will be collapsed) */
  maxItems?: number;
  /** Additional CSS classes */
  class?: string;
}

const props = withDefaults(defineProps<GlassBreadcrumbProps>(), {
  separator: 'chevron',
  variant: 'default',
  showHomeIcon: true,
  maxItems: 0,
});

const emit = defineEmits<{
  (e: 'navigate', item: BreadcrumbItem, index: number): void;
}>();

// Container classes
const containerClasses = computed(() => {
  const variants = {
    default: [
      'inline-flex',
      'items-center',
      'gap-1',
      'px-4',
      'py-2',
      'rounded-xl',
      // Light theme - visible background and border
      'bg-white/70 backdrop-blur-sm',
      'dark:bg-white/[0.08]',
      'border',
      'border-white/40',
      'dark:border-white/[0.1]',
      'shadow-[0_2px_4px_rgba(0,0,0,0.02),0_1px_0_rgba(255,255,255,0.5)_inset]',
      'dark:shadow-none',
    ],
    glass: [
      'inline-flex',
      'items-center',
      'gap-1',
      'px-4',
      'py-2.5',
      'rounded-2xl',
      // Light theme - visible
      'bg-white',
      'dark:bg-slate-900/90',
      'backdrop-blur-2xl',
      'border',
      'border-slate-200',
      'dark:border-white/[0.12]',
      'shadow-lg shadow-slate-200/40',
      'dark:shadow-black/30',
    ],
    minimal: [
      'inline-flex',
      'items-center',
      'gap-1',
    ],
  };
  
  return cn(variants[props.variant], props.class);
});

// Item classes
const getItemClasses = (isLast: boolean) => {
  return cn(
    'px-2',
    'py-1',
    'rounded-lg',
    'text-sm',
    'font-medium',
    'transition-all',
    'duration-200',
    isLast
      ? [
          // Current/last item
          'text-slate-900',
          'dark:text-white',
          'bg-slate-100',
          'dark:bg-white/[0.08]',
          'shadow-sm',
          'dark:shadow-none',
        ]
      : [
          // Clickable items
          'text-slate-600',
          'dark:text-white/70',
          'hover:text-slate-900',
          'dark:hover:text-white',
          'hover:bg-slate-100',
          'dark:hover:bg-white/[0.1]',
          'cursor-pointer',
        ]
  );
};

// Separator classes
const separatorClasses = computed(() => {
  return cn(
    'text-slate-400',
    'dark:text-white/30',
    'mx-0.5',
    'select-none'
  );
});

// Visible items (with truncation support)
const visibleItems = computed(() => {
  if (props.maxItems <= 0 || props.items.length <= props.maxItems) {
    return props.items.map((item, index) => ({ item, index, isEllipsis: false }));
  }
  
  const first = { item: props.items[0], index: 0, isEllipsis: false };
  const ellipsis = { item: { label: '...', href: undefined as string | undefined }, index: -1, isEllipsis: true };
  const visibleCount = Math.max(0, props.maxItems - 2);
  const lastItems = visibleCount > 0 ? props.items.slice(-visibleCount).map((item, i) => ({
    item,
    index: props.items.length - visibleCount + i,
    isEllipsis: false,
  })) : [];
  
  return [first, ellipsis, ...lastItems];
});

// Handle click
const handleClick = (item: BreadcrumbItem, index: number) => {
  if (index >= 0) {
    emit('navigate', item, index);
  }
};
</script>

<template>
  <nav :class="containerClasses" aria-label="Breadcrumb">
    <template v-for="(entry, i) in visibleItems" :key="i">
      <!-- Separator -->
      <span v-if="i > 0" :class="separatorClasses" aria-hidden="true">
        <svg v-if="separator === 'chevron'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <span v-else-if="separator === 'slash'">/</span>
        <span v-else-if="separator === 'arrow'">→</span>
      </span>
      
      <!-- Breadcrumb item -->
      <template v-if="entry.isEllipsis">
        <span class="px-2 py-1 text-slate-400 dark:text-white/40">...</span>
      </template>
      <template v-else>
        <a
          v-if="entry.item.href && entry.index < items.length - 1"
          :href="entry.item.href"
          :class="getItemClasses(entry.index === items.length - 1)"
          @click.prevent="handleClick(entry.item, entry.index)"
        >
          <!-- Home icon for first item -->
          <svg v-if="showHomeIcon && entry.index === 0" class="w-4 h-4 mr-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          {{ entry.item.label }}
        </a>
        <span
          v-else
          :class="getItemClasses(entry.index === items.length - 1)"
        >
          <!-- Home icon for first item -->
          <svg v-if="showHomeIcon && entry.index === 0" class="w-4 h-4 mr-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          {{ entry.item.label }}
        </span>
      </template>
    </template>
  </nav>
</template>
