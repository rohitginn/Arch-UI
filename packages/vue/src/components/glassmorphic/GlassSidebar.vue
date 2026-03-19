<script setup lang="ts">
/**
 * GlassSidebar - Premium glassmorphic sidebar component for Vue 3
 * 
 * Features:
 * - Frosted glass backdrop blur effect
 * - Collapsible/expandable
 * - Navigation items with icons
 * - Active state highlighting
 * - Mobile overlay mode
 * - Smooth animations
 */

import { ref, computed } from 'vue';
import { cn } from '@archui/core';

interface SidebarItem {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  active?: boolean;
  badge?: string | number;
  children?: SidebarItem[];
  onClick?: () => void;
}

interface GlassSidebarProps {
  /** Navigation items */
  items?: SidebarItem[];
  /** Collapsed state */
  collapsed?: boolean;
  /** Width when expanded */
  width?: string;
  /** Width when collapsed */
  collapsedWidth?: string;
  /** Show overlay on mobile */
  mobileOverlay?: boolean;
  /** Mobile open state */
  mobileOpen?: boolean;
  /** Additional CSS classes */
  class?: string;
}

const props = withDefaults(defineProps<GlassSidebarProps>(), {
  items: () => [],
  collapsed: false,
  width: '280px',
  collapsedWidth: '72px',
  mobileOverlay: true,
  mobileOpen: false,
});

const emit = defineEmits<{
  (e: 'update:collapsed', value: boolean): void;
  (e: 'update:mobileOpen', value: boolean): void;
  (e: 'itemClick', item: SidebarItem): void;
}>();

// Local state for expanded items
const expandedItems = ref<Set<string>>(new Set());

// Toggle item expansion
const toggleExpand = (item: SidebarItem) => {
  if (expandedItems.value.has(item.id)) {
    expandedItems.value.delete(item.id);
  } else {
    expandedItems.value.add(item.id);
  }
};

// Handle item click
const handleItemClick = (item: SidebarItem) => {
  if (item.children?.length) {
    toggleExpand(item);
  } else {
    emit('itemClick', item);
    if (item.onClick) item.onClick();
    if (props.mobileOpen) {
      emit('update:mobileOpen', false);
    }
  }
};

// Toggle collapsed
const toggleCollapsed = () => {
  emit('update:collapsed', !props.collapsed);
};

// Close mobile sidebar
const closeMobile = () => {
  emit('update:mobileOpen', false);
};

// Sidebar width
const sidebarWidth = computed(() => {
  return props.collapsed ? props.collapsedWidth : props.width;
});

// Sidebar classes
const sidebarClasses = computed(() => {
  return cn(
    'h-screen',
    'flex',
    'flex-col',
    'backdrop-blur-lg',
    // Light theme - visible background
    'bg-white/60',
    'dark:bg-slate-900/95',
    'border-r',
    'border-white/30',
    'dark:border-white/[0.08]',
    'shadow-[0_8px_32px_rgba(0,0,0,0.1)]',
    'shadow-slate-200/30',
    'dark:shadow-none',
    'transition-all',
    'duration-300',
    'ease-[cubic-bezier(0.25,0.1,0.25,1)]',
    props.class
  );
});
</script>

<template>
  <!-- Mobile overlay -->
  <div
    v-if="mobileOverlay && mobileOpen"
    class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
    @click="closeMobile"
  />

  <!-- Sidebar -->
  <aside
    :class="[
      sidebarClasses,
      // Desktop positioning
      'hidden md:flex',
      // Width transition
    ]"
    :style="{ width: sidebarWidth }"
  >
    <!-- Header -->
    <div
      :class="cn(
        'flex',
        'items-center',
        'justify-between',
        'h-16',
        'px-4',
        'border-b',
        'border-slate-200',
        'dark:border-white/[0.08]'
      )"
    >
      <slot name="header">
        <span
          v-if="!collapsed"
          class="text-lg font-semibold text-slate-900 dark:text-white"
        >
          Menu
        </span>
      </slot>
      
      <!-- Collapse button -->
      <button
        type="button"
        :class="cn(
          'p-2',
          'rounded-lg',
          'text-slate-500',
          'dark:text-white/50',
          'hover:bg-slate-100',
          'dark:hover:bg-white/10',
          'transition-colors'
        )"
        @click="toggleCollapsed"
        :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
      >
        <svg
          class="h-5 w-5 transition-transform duration-300"
          :class="{ 'rotate-180': collapsed }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto p-3 space-y-1">
      <template v-for="item in items" :key="item.id">
        <!-- Item button -->
        <button
          type="button"
          :class="cn(
            'w-full',
            'flex',
            'items-center',
            'gap-3',
            'px-3',
            'py-2.5',
            'rounded-xl',
            'text-left',
            'transition-all',
            'duration-200',
            item.active
              ? [
                  'bg-black/[0.06]',
                  'dark:bg-white/[0.1]',
                  'text-slate-900',
                  'dark:text-white',
                  'shadow-sm',
                ]
              : [
                  'text-slate-600',
                  'dark:text-white/70',
                  'hover:bg-slate-100',
                  'dark:hover:bg-white/[0.06]',
                  'hover:text-slate-900',
                  'dark:hover:text-white',
                ]
          )"
          @click="handleItemClick(item)"
        >
          <!-- Icon slot or default -->
          <span class="flex-shrink-0 w-5 h-5">
            <slot :name="`icon-${item.id}`">
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </slot>
          </span>
          
          <!-- Label -->
          <span
            v-if="!collapsed"
            class="flex-1 text-sm font-medium truncate"
          >
            {{ item.label }}
          </span>
          
          <!-- Badge -->
          <span
            v-if="!collapsed && item.badge"
            :class="cn(
              'px-2',
              'py-0.5',
              'text-xs',
              'font-medium',
              'rounded-full',
              'bg-blue-500/20',
              'text-blue-700',
              'dark:text-blue-300'
            )"
          >
            {{ item.badge }}
          </span>
          
          <!-- Expand arrow -->
          <svg
            v-if="!collapsed && item.children?.length"
            :class="cn(
              'w-4 h-4',
              'transition-transform',
              'duration-200',
              expandedItems.has(item.id) && 'rotate-180'
            )"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        <!-- Children -->
        <div
          v-if="!collapsed && item.children?.length && expandedItems.has(item.id)"
          class="ml-6 mt-1 space-y-1"
        >
          <button
            v-for="child in item.children"
            :key="child.id"
            type="button"
            :class="cn(
              'w-full',
              'flex',
              'items-center',
              'gap-3',
              'px-3',
              'py-2',
              'rounded-lg',
              'text-left',
              'text-sm',
              'transition-colors',
              child.active
                ? 'text-slate-900 dark:text-white bg-black/5 dark:bg-white/5'
                : 'text-slate-500 dark:text-white/50 hover:text-slate-700 dark:hover:text-white/70'
            )"
            @click="handleItemClick(child)"
          >
            {{ child.label }}
          </button>
        </div>
      </template>
    </nav>

    <!-- Footer -->
    <div
      v-if="$slots.footer"
      :class="cn(
        'p-3',
        'border-t',
        'border-slate-200',
        'dark:border-white/[0.08]'
      )"
    >
      <slot name="footer" />
    </div>
  </aside>

  <!-- Mobile sidebar -->
  <aside
    v-if="mobileOpen"
    :class="[
      sidebarClasses,
      'fixed',
      'inset-y-0',
      'left-0',
      'z-50',
      'md:hidden',
      'animate-[slideInLeft_0.3s_ease-out]'
    ]"
    :style="{ width: width }"
  >
    <!-- Same content as desktop -->
    <div class="flex items-center justify-between h-16 px-4 border-b border-slate-200 dark:border-white/[0.08]">
      <slot name="header">
        <span class="text-lg font-semibold text-slate-900 dark:text-white">
          Menu
        </span>
      </slot>
      <button
        type="button"
        class="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
        @click="closeMobile"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <nav class="flex-1 overflow-y-auto p-3 space-y-1">
      <template v-for="item in items" :key="item.id">
        <button
          type="button"
          :class="cn(
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all',
            item.active
              ? 'bg-black/10 dark:bg-white/10 text-slate-900 dark:text-white'
              : 'text-slate-600 dark:text-white/70 hover:bg-slate-100'
          )"
          @click="handleItemClick(item)"
        >
          <span class="flex-shrink-0 w-5 h-5">
            <slot :name="`icon-${item.id}`">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </slot>
          </span>
          <span class="flex-1 text-sm font-medium truncate">{{ item.label }}</span>
        </button>
      </template>
    </nav>
  </aside>
</template>

<style scoped>
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
