<script setup lang="ts">
/**
 * GlassPagination - Premium glassmorphic pagination component for Vue 3
 */
import { computed } from 'vue';
import { cn } from '@archui/core';

interface Props {
  totalPages: number;
  currentPage: number;
  siblingCount?: number;
  boundaryCount?: number;
  variant?: 'default' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  siblingCount: 1,
  boundaryCount: 1,
  variant: 'default',
  size: 'md',
});

const emit = defineEmits<{
  (e: 'update:page', page: number): void;
}>();

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

const items = computed(() => {
  const totalNumbers = props.siblingCount * 2 + 3 + props.boundaryCount * 2;

  if (totalNumbers >= props.totalPages) {
    return range(1, props.totalPages);
  }

  const leftSiblingIndex = Math.max(props.currentPage - props.siblingCount, props.boundaryCount + 1);
  const rightSiblingIndex = Math.min(props.currentPage + props.siblingCount, props.totalPages - props.boundaryCount);

  const showLeftEllipsis = leftSiblingIndex > props.boundaryCount + 2;
  const showRightEllipsis = rightSiblingIndex < props.totalPages - props.boundaryCount - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftItemCount = 3 + 2 * props.siblingCount;
    const leftRange = range(1, leftItemCount);
    return [...leftRange, 'ellipsis', ...range(props.totalPages - props.boundaryCount + 1, props.totalPages)];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightItemCount = 3 + 2 * props.siblingCount;
    const rightRange = range(props.totalPages - rightItemCount + 1, props.totalPages);
    return [...range(1, props.boundaryCount), 'ellipsis', ...rightRange];
  }

  return [
    ...range(1, props.boundaryCount),
    'ellipsis',
    ...range(leftSiblingIndex, rightSiblingIndex),
    'ellipsis',
    ...range(props.totalPages - props.boundaryCount + 1, props.totalPages),
  ];
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm': return 'w-8 h-8 text-xs';
    case 'lg': return 'w-12 h-12 text-base';
    default: return 'w-10 h-10 text-sm';
  }
});

const iconSizeClasses = computed(() => {
  switch (props.size) {
    case 'sm': return 'w-3.5 h-3.5';
    case 'lg': return 'w-5 h-5';
    default: return 'w-4 h-4';
  }
});

const containerGap = computed(() => {
  switch (props.size) {
    case 'sm': return 'gap-1';
    case 'lg': return 'gap-2';
    default: return 'gap-1.5';
  }
});

const getItemClasses = (isActive: boolean) => {
  const base = cn(
    'inline-flex items-center justify-center font-medium transition-all duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50'
  );

  const variants = {
    default: cn(
      'rounded-lg',
      'text-slate-600 dark:text-slate-400',
      isActive
        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
        : 'hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white cursor-pointer'
    ),
    outline: cn(
      'rounded-lg border',
      'border-slate-200 dark:border-slate-700',
      'text-slate-600 dark:text-slate-400',
      isActive
        ? 'bg-slate-900 border-slate-900 text-white dark:bg-white dark:border-white dark:text-slate-900 shadow-sm'
        : 'hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer'
    ),
    ghost: cn(
      'rounded-lg',
      'text-slate-600 dark:text-slate-400',
      isActive
        ? 'text-blue-600 dark:text-blue-400 font-semibold'
        : 'hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white cursor-pointer'
    ),
    glass: cn(
      'rounded-lg',
      'bg-white/50 dark:bg-white/5',
      'text-slate-700 dark:text-slate-300',
      'backdrop-blur-sm',
      isActive
        ? 'bg-white dark:bg-white/20 text-slate-900 dark:text-white shadow-sm'
        : 'hover:bg-white/80 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white cursor-pointer'
    ),
  };

  return cn(base, variants[props.variant], sizeClasses.value);
};

const handlePageClick = (page: number | string) => {
  if (typeof page === 'number' && page !== props.currentPage) {
    emit('update:page', page);
  }
};

const handlePrev = () => {
  if (props.currentPage > 1) {
    emit('update:page', props.currentPage - 1);
  }
};

const handleNext = () => {
  if (props.currentPage < props.totalPages) {
    emit('update:page', props.currentPage + 1);
  }
};
</script>

<template>
  <nav role="navigation" aria-label="Pagination" :class="cn('flex items-center', containerGap, props.class)">
    <ul class="flex items-center" :class="containerGap">
      <!-- Prev -->
      <li>
        <button
          type="button"
          aria-label="Go to previous page"
          :disabled="currentPage <= 1"
          :class="cn(getItemClasses(false), 'w-auto px-3')"
          @click="handlePrev"
        >
          <svg :class="iconSizeClasses" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          <span class="ml-1">Previous</span>
        </button>
      </li>

      <!-- Items -->
      <li v-for="(item, index) in items" :key="index">
        <span
          v-if="item === 'ellipsis'"
          aria-hidden="true"
          :class="cn('flex items-center justify-center text-slate-400 dark:text-slate-500', sizeClasses)"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </span>
        <button
          v-else
          type="button"
          :aria-current="item === currentPage ? 'page' : undefined"
          :data-active="item === currentPage"
          :class="getItemClasses(item === currentPage)"
          @click="handlePageClick(item)"
        >
          {{ item }}
        </button>
      </li>

      <!-- Next -->
      <li>
        <button
          type="button"
          aria-label="Go to next page"
          :disabled="currentPage >= totalPages"
          :class="cn(getItemClasses(false), 'w-auto px-3')"
          @click="handleNext"
        >
          <span class="mr-1">Next</span>
          <svg :class="iconSizeClasses" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </li>
    </ul>
  </nav>
</template>
