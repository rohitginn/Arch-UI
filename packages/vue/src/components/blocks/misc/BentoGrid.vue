<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface BentoGridItem {
  title: string;
  description?: string;
  image?: string;
  span?: { cols: 1 | 2; rows: 1 | 2 };
  className?: string;
}

export interface BentoGridProps {
  items: BentoGridItem[];
  columns?: 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
}

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */

const props = withDefaults(defineProps<BentoGridProps>(), {
  columns: 3,
  gap: 'md',
});

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

const colsMap: Record<number, string> = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4' };
const gapMap: Record<string, string> = { sm: 'gap-3', md: 'gap-5', lg: 'gap-8' };

const gridClass = computed(() =>
  cn('grid auto-rows-[minmax(180px,1fr)] grid-cols-1', colsMap[props.columns], gapMap[props.gap]),
);

function cellClass(item: BentoGridItem) {
  return cn(
    'group relative flex flex-col overflow-hidden rounded-2xl',
    'border border-[var(--glass-edge)]',
    'bg-[var(--glass-surface)] backdrop-blur-md',
    'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg',
    item.span?.cols === 2 ? 'md:col-span-2' : '',
    item.span?.rows === 2 ? 'md:row-span-2' : '',
    item.className,
  );
}
</script>

<template>
  <div :class="gridClass">
    <div v-for="(item, i) in items" :key="i" :class="cellClass(item)">
      <!-- Image card -->
      <template v-if="item.image">
        <div class="relative flex-1 overflow-hidden">
          <img
            :src="item.image"
            :alt="item.title"
            class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div class="absolute bottom-0 p-5">
            <slot :name="`icon-${i}`" />
            <h3 class="text-sm font-semibold text-white">{{ item.title }}</h3>
            <p v-if="item.description" class="mt-1 text-xs text-white/70 line-clamp-2">{{ item.description }}</p>
          </div>
        </div>
      </template>

      <!-- Non-image card -->
      <template v-else>
        <div class="flex flex-1 flex-col p-6">
          <slot :name="`icon-${i}`" />
          <h3 class="text-sm font-semibold text-[var(--glass-text)]">{{ item.title }}</h3>
          <p v-if="item.description" class="mt-2 text-xs text-[var(--glass-text)]/60 line-clamp-3">{{ item.description }}</p>
          <div v-if="$slots[`content-${i}`]" class="mt-auto pt-4">
            <slot :name="`content-${i}`" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
