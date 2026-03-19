<script setup lang="ts">
/**
 * GlassDropdown - Premium glassmorphic dropdown for Vue 3
 * 
 * Features:
 * - Frosted glass backdrop blur
 * - Click or hover trigger
 * - Multiple positions
 * - Keyboard navigation
 * - Click outside to close
 */

import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { cn } from '@archui/core';

interface DropdownItem {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  divider?: boolean;
  onClick?: () => void;
}

interface GlassDropdownProps {
  /** Dropdown items */
  items?: DropdownItem[];
  /** Trigger mode */
  trigger?: 'click' | 'hover';
  /** Dropdown position */
  position?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS classes */
  class?: string;
}

const props = withDefaults(defineProps<GlassDropdownProps>(), {
  items: () => [],
  trigger: 'click',
  position: 'bottom-start',
  disabled: false,
});

const emit = defineEmits<{
  (e: 'select', item: DropdownItem): void;
  (e: 'open'): void;
  (e: 'close'): void;
}>();

// Refs
const triggerRef = ref<HTMLDivElement | null>(null);
const dropdownRef = ref<HTMLDivElement | null>(null);
const isOpen = ref(false);
const focusedIndex = ref(-1);

// Toggle dropdown
const toggle = () => {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    emit('open');
    nextTick(() => focusedIndex.value = 0);
  } else {
    emit('close');
  }
};

const open = () => {
  if (props.disabled || isOpen.value) return;
  isOpen.value = true;
  emit('open');
};

const close = () => {
  if (!isOpen.value) return;
  isOpen.value = false;
  focusedIndex.value = -1;
  emit('close');
};

// Handle item select
const selectItem = (item: DropdownItem) => {
  if (item.disabled || item.divider) return;
  emit('select', item);
  if (item.onClick) item.onClick();
  close();
};

// Keyboard navigation
const handleKeydown = (e: KeyboardEvent) => {
  if (!isOpen.value) return;
  
  const enabledItems = props.items.filter(i => !i.disabled && !i.divider);
  
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();
      focusedIndex.value = (focusedIndex.value + 1) % enabledItems.length;
      break;
    case 'ArrowUp':
      e.preventDefault();
      focusedIndex.value = focusedIndex.value <= 0 ? enabledItems.length - 1 : focusedIndex.value - 1;
      break;
    case 'Enter':
    case ' ':
      e.preventDefault();
      if (focusedIndex.value >= 0) {
        selectItem(enabledItems[focusedIndex.value]);
      }
      break;
    case 'Escape':
      e.preventDefault();
      close();
      break;
  }
};

// Click outside handler
const handleClickOutside = (e: MouseEvent) => {
  if (!triggerRef.value?.contains(e.target as Node) && 
      !dropdownRef.value?.contains(e.target as Node)) {
    close();
  }
};

// Position classes
const positionClasses = computed(() => {
  const positions = {
    'bottom-start': 'top-full left-0 mt-2',
    'bottom-end': 'top-full right-0 mt-2',
    'top-start': 'bottom-full left-0 mb-2',
    'top-end': 'bottom-full right-0 mb-2',
  };
  return positions[props.position];
});

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <div class="relative inline-block" :class="props.class">
    <!-- Trigger -->
    <div
      ref="triggerRef"
      @click="trigger === 'click' && toggle()"
      @mouseenter="trigger === 'hover' && open()"
      @mouseleave="trigger === 'hover' && close()"
    >
      <slot name="trigger">
        <button
          type="button"
          :class="cn(
            'px-4 py-2 rounded-xl',
            'bg-slate-100 dark:bg-white/[0.1]',
            'border border-slate-200 dark:border-transparent',
            'hover:bg-slate-200 dark:hover:bg-white/[0.15]',
            'transition-colors duration-200',
            disabled && 'opacity-50 cursor-not-allowed'
          )"
        >
          Options
        </button>
      </slot>
    </div>

    <!-- Dropdown menu -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 scale-95 translate-y-1"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-1"
    >
      <div
        v-if="isOpen"
        ref="dropdownRef"
        :class="cn(
          'absolute z-50',
          positionClasses,
          'min-w-[200px]',
          'p-1.5',
          'rounded-xl',
          'backdrop-blur-xl',
          // Light theme - visible background (TINTED)
          'bg-white/70',
          'dark:bg-slate-900/95',
          'border border-white/40 dark:border-white/[0.1]',
          'shadow-[0_8px_32px_rgba(0,0,0,0.12)]',
          'dark:shadow-2xl dark:shadow-black/30'
        )"
        @mouseenter="trigger === 'hover' && open()"
        @mouseleave="trigger === 'hover' && close()"
      >
        <template v-for="(item, index) in items" :key="item.id">
          <!-- Divider -->
          <div
            v-if="item.divider"
            class="my-1 h-px bg-black/10 dark:bg-white/10"
          />
          
          <!-- Item -->
          <button
            v-else
            type="button"
            :class="cn(
              'w-full',
              'flex items-center gap-3',
              'px-3 py-2',
              'rounded-lg',
              'text-left text-sm',
              'transition-colors duration-150',
              item.disabled
                ? 'opacity-50 cursor-not-allowed'
                : [
                    'hover:bg-slate-100 dark:hover:bg-white/[0.08]',
                    focusedIndex === index && 'bg-slate-100 dark:bg-white/[0.08]'
                  ],
              'text-slate-900 dark:text-white/90'
            )"
            :disabled="item.disabled"
            @click="selectItem(item)"
          >
            <slot :name="`icon-${item.id}`" />
            <span>{{ item.label }}</span>
          </button>
        </template>
        
        <!-- Custom content slot -->
        <slot />
      </div>
    </Transition>
  </div>
</template>
