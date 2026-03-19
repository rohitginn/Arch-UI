<script setup lang="ts">
/**
 * GlassTabs - Premium glassmorphic tabs component for Vue 3
 * 
 * Features:
 * - Animated tab indicator
 * - Multiple variants
 * - Icon support
 * - Lazy loading option
 * - Keyboard navigation
 */

import { ref, computed, watch, onMounted, nextTick } from 'vue';
import { cn } from '@archui/core';

interface Tab {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
}

interface GlassTabsProps {
  /** Tab items */
  tabs: Tab[];
  /** Active tab id */
  modelValue?: string;
  /** Visual variant */
  variant?: 'default' | 'pills' | 'underline' | 'glass' | 'bordered';
  /** Full width tabs */
  fullWidth?: boolean;
  /** Additional CSS classes */
  class?: string;
}

const props = withDefaults(defineProps<GlassTabsProps>(), {
  variant: 'default',
  fullWidth: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'change', tab: Tab): void;
}>();

// Refs
const tabsRef = ref<HTMLDivElement | null>(null);
const indicatorStyle = ref({ left: '0px', width: '0px' });

// Active tab
const activeTab = computed({
  get: () => props.modelValue || props.tabs[0]?.id,
  set: (value: string) => {
    emit('update:modelValue', value);
    const tab = props.tabs.find(t => t.id === value);
    if (tab) emit('change', tab);
  },
});

// Select tab
const selectTab = (tab: Tab) => {
  if (tab.disabled) return;
  activeTab.value = tab.id;
};

// Update indicator position
const updateIndicator = () => {
  nextTick(() => {
    if (!tabsRef.value) return;
    const activeButton = tabsRef.value.querySelector(`[data-tab-id="${activeTab.value}"]`) as HTMLElement;
    if (activeButton) {
      indicatorStyle.value = {
        left: `${activeButton.offsetLeft}px`,
        width: `${activeButton.offsetWidth}px`,
      };
    }
  });
};

// Watch active tab changes
watch(activeTab, updateIndicator);

// Keyboard navigation
const handleKeydown = (e: KeyboardEvent) => {
  const enabledTabs = props.tabs.filter(t => !t.disabled);
  let newIndex = enabledTabs.findIndex(t => t.id === activeTab.value);
  
  switch (e.key) {
    case 'ArrowLeft':
      e.preventDefault();
      newIndex = newIndex > 0 ? newIndex - 1 : enabledTabs.length - 1;
      selectTab(enabledTabs[newIndex]);
      nextTick(() => {
        const newButton = tabsRef.value?.querySelector(`[data-tab-id="${enabledTabs[newIndex].id}"]`) as HTMLElement;
        newButton?.focus();
      });
      break;
    case 'ArrowRight':
      e.preventDefault();
      newIndex = newIndex < enabledTabs.length - 1 ? newIndex + 1 : 0;
      selectTab(enabledTabs[newIndex]);
      nextTick(() => {
        const newButton = tabsRef.value?.querySelector(`[data-tab-id="${enabledTabs[newIndex].id}"]`) as HTMLElement;
        newButton?.focus();
      });
      break;
  }
};

// Tab button classes
const getTabClasses = (tab: Tab) => {
  const isActive = tab.id === activeTab.value;
  
  const variants = {
    default: cn(
      'relative z-10',
      'px-4 py-2',
      'text-sm font-medium',
      'transition-colors duration-200',
      // Fix layout shift
      'before:block before:content-[attr(data-text)] before:font-bold before:h-0 before:invisible before:overflow-hidden',
      tab.disabled
        ? 'opacity-50 cursor-not-allowed'
        : isActive
          ? 'text-slate-900 dark:text-white'
          : 'text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white/80'
    ),
    pills: cn(
      'px-4 py-2',
      'rounded-lg',
      'text-sm font-medium',
      'transition-all duration-200',
      tab.disabled
        ? 'opacity-50 cursor-not-allowed'
        : isActive
          ? 'bg-slate-900 text-white shadow-md dark:bg-white dark:text-slate-900'
          : 'text-slate-700 dark:text-white/60 hover:bg-slate-200 dark:hover:bg-white/10'
    ),
    underline: cn(
      'relative',
      'px-4 py-3',
      'text-sm font-medium',
      'transition-colors duration-200',
      tab.disabled
        ? 'opacity-50 cursor-not-allowed'
        : isActive
          ? 'text-slate-900 dark:text-white'
          : 'text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white/80'
    ),
    glass: cn(
      'relative z-10',
      'px-4 py-2',
      'text-sm font-medium',
      'transition-colors duration-200',
      // Fix layout shift
      'before:block before:content-[attr(data-text)] before:font-bold before:h-0 before:invisible before:overflow-hidden',
      tab.disabled
        ? 'opacity-50 cursor-not-allowed'
        : isActive
          ? 'text-slate-900 dark:text-white font-semibold'
          : 'text-slate-700 dark:text-white/70 hover:text-slate-900 dark:hover:text-white'
    ),
    bordered: cn(
      'relative z-10',
      'px-4 py-2',
      'text-sm font-medium',
      'transition-colors duration-200',
      // Fix layout shift
      'before:block before:content-[attr(data-text)] before:font-bold before:h-0 before:invisible before:overflow-hidden',
      tab.disabled
        ? 'opacity-50 cursor-not-allowed'
        : isActive
          ? 'bg-slate-100 text-slate-900 dark:bg-white/10 dark:text-white font-semibold rounded-lg'
          : 'text-slate-600 dark:text-white/60 hover:text-slate-900 hover:bg-slate-50 dark:hover:text-white dark:hover:bg-white/5 rounded-lg'
    ),
  };
  
  return variants[props.variant];
};

// Container classes
const containerClasses = computed(() => {
  const variants = {
    default: cn(
      'relative',
      'inline-flex',
      'p-1',
      'rounded-xl',
      'bg-slate-100', // Solid light gray
      'dark:bg-white/[0.06]',
      'backdrop-blur-sm',
      'border border-slate-200 dark:border-white/[0.08]'
    ),
    pills: cn(
      'inline-flex gap-1',
      'p-1',
      'rounded-xl',
      'bg-slate-100 dark:bg-transparent', // Solid light gray
      'border border-slate-200 dark:border-transparent'
    ),
    underline: cn(
      'inline-flex',
      'border-b-2 border-slate-200 dark:border-white/10'
    ),
    glass: cn(
      'relative',
      'inline-flex',
      'p-1.5',
      'rounded-xl',
      // Light theme - TINTED for visibility
      'bg-white/70 dark:bg-white/[0.06]',
      'backdrop-blur-md',
      'border border-white/40 dark:border-white/[0.1]',
      'shadow-[0_4px_12px_rgba(0,0,0,0.05),0_1px_0_rgba(255,255,255,0.6)_inset]'
    ),
    bordered: cn(
      'relative',
      'inline-flex',
      'p-1',
      'rounded-xl',
      'bg-white dark:bg-slate-900',
      'border-2 border-slate-200 dark:border-white/[0.15]',
      'shadow-sm'
    ),
  };
  return cn(variants[props.variant] || variants.default, props.fullWidth && 'w-full', props.class);
});

// Lifecycle
onMounted(() => {
  if (props.variant === 'default') {
    updateIndicator();
  }
});
</script>

<template>
  <div>
    <!-- Tab List -->
    <div
      ref="tabsRef"
      :class="containerClasses"
      role="tablist"
    >
      <!-- Animated indicator (for default variant) -->
      <div
        v-if="variant === 'default' || variant === 'glass' || variant === 'bordered'"
        class="absolute top-1 bottom-1 rounded-lg bg-white dark:bg-white/[0.15] shadow-md border border-slate-200/50 dark:border-white/[0.1] transition-all duration-200 ease-out"
        :style="indicatorStyle"
      />
      
      <!-- Tabs -->
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        role="tab"
        :data-tab-id="tab.id"
        :data-text="tab.label"
        :aria-selected="tab.id === activeTab"
        :aria-controls="`tabpanel-${tab.id}`"
        :tabindex="tab.id === activeTab ? 0 : -1"
        :disabled="tab.disabled"
        :class="[
          getTabClasses(tab),
          fullWidth && 'flex-1'
        ]"
        @click="selectTab(tab)"
        @keydown="handleKeydown($event)"
      >
        <span class="flex items-center gap-2">
          <slot :name="`icon-${tab.id}`" />
          {{ tab.label }}
        </span>
        
        <!-- Underline indicator -->
        <span
          v-if="variant === 'underline' && tab.id === activeTab"
          class="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 dark:bg-white"
        />
      </button>
    </div>

    <!-- Tab Panels -->
    <div class="mt-4">
      <template v-for="tab in tabs" :key="tab.id">
        <div
          v-show="tab.id === activeTab"
          :id="`tabpanel-${tab.id}`"
          role="tabpanel"
          :aria-labelledby="tab.id"
        >
          <slot :name="tab.id" />
        </div>
      </template>
    </div>
  </div>
</template>
