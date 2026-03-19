<script setup lang="ts">
/**
 * GlassNavbar - Premium glassmorphic navigation bar for Vue 3
 * 
 * Features:
 * - Frosted glass with shiny top border
 * - 3D inset shadows on nav links
 * - Full width with max-w-7xl inner container
 * - Rounded container design
 * - Apple-style pill nav links
 */

import { ref, computed, onMounted, onUnmounted } from 'vue';
import { cn } from '@archui/core';

interface NavItem {
  label: string;
  href?: string;
  active?: boolean;
  onClick?: () => void;
}

interface GlassNavbarProps {
  /** Navigation items */
  items?: NavItem[];
  /** Sticky positioning */
  sticky?: boolean;
  /** Show backdrop blur when scrolled */
  blurOnScroll?: boolean;
  /** Visual variant */
  variant?: 'default' | 'floating' | 'solid';
  /** Additional CSS classes */
  class?: string;
}

const props = withDefaults(defineProps<GlassNavbarProps>(), {
  items: () => [],
  sticky: true,
  blurOnScroll: true,
  variant: 'default',
});

const emit = defineEmits<{
  (e: 'itemClick', item: NavItem, index: number): void;
}>();

// Refs
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

// Handle scroll
const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

// Toggle mobile menu
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// Handle item click
const handleItemClick = (item: NavItem, index: number) => {
  emit('itemClick', item, index);
  if (item.onClick) item.onClick();
  isMobileMenuOpen.value = false;
};

// Navbar outer wrapper classes (full width)
const wrapperClasses = computed(() => {
  return cn(
    'w-full',
    'z-50',
    'transition-all',
    'duration-300',
    props.sticky && 'sticky top-0',
    props.class
  );
});

// Inner navbar container classes (with glass effect)
const navbarClasses = computed(() => {
  const showGlass = isScrolled.value || !props.blurOnScroll;
  
  const variants = {
    default: showGlass ? [
      // Glass effect with TINTED background for contrast against white page
      'relative',
      'bg-white/70',
      'dark:bg-black/60',
      'backdrop-blur-md',
      // Visible borders
      'border',
      'border-white/40',
      'dark:border-white/[0.1]',
      // Shadow
      'shadow-[0_4px_12px_rgba(0,0,0,0.05),0_1px_0_rgba(255,255,255,0.6)_inset]',
      'dark:shadow-black/30',
      'rounded-2xl',
    ] : [
      'bg-transparent',
      'rounded-2xl',
    ],
    floating: [
      'relative',
      'bg-slate-50/90', // Tinted for visibility
      'dark:bg-black/80',
      'backdrop-blur-2xl',
      'border',
      'border-slate-200',
      'dark:border-white/[0.12]',
      'shadow-xl',
      'shadow-slate-300/40',
      'dark:shadow-black/50',
      'rounded-2xl',
    ],
    solid: [
      'bg-slate-50', // Solid tint
      'dark:bg-slate-900',
      'border',
      'border-slate-200',
      'dark:border-slate-800',
      'shadow-sm',
      'rounded-2xl',
    ],
  };
  
  return cn(variants[props.variant]);
});

// Nav link classes with 3D effect
const getNavLinkClasses = (item: NavItem) => {
  return cn(
    'px-4',
    'py-2',
    'rounded-xl',
    'text-sm',
    'font-medium',
    'transition-all',
    'duration-200',
    item.active
      ? [
          // Active state with 3D inset effect
          'bg-slate-900',
          'dark:bg-white',
          'text-white',
          'dark:text-slate-900',
          'shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3),inset_0_-2px_4px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.3)]',
          'dark:shadow-[0_4px_12px_-2px_rgba(255,255,255,0.2),inset_0_-2px_4px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.8)]',
        ]
      : [
          // Inactive state - USE BLACK FOR MAX CONTRAST
          'text-black', // Changed from text-slate-700
          'dark:text-white/80',
          'hover:bg-slate-100', // Darker hover
          'dark:hover:bg-white/10',
          'hover:shadow-sm',
        ]
  );
};

// Lifecycle
onMounted(() => {
  if (props.blurOnScroll) {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div :class="wrapperClasses">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
      <nav :class="navbarClasses">
        <div class="flex items-center justify-between h-14 px-4">
          <!-- Brand/Logo -->
          <div class="flex-shrink-0">
            <slot name="brand">
              <span class="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                Brand
              </span>
            </slot>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-1">
            <template v-for="(item, index) in items" :key="index">
              <a
                :href="item.href || '#'"
                :class="getNavLinkClasses(item)"
                @click.prevent="handleItemClick(item, index)"
              >
                {{ item.label }}
              </a>
            </template>
          </div>

          <!-- Actions slot -->
          <div class="hidden md:flex items-center space-x-2">
            <slot name="actions" />
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button
              type="button"
              :class="cn(
                'p-2',
                'rounded-xl',
                'text-slate-600',
                'dark:text-white/70',
                'hover:bg-slate-100',
                'dark:hover:bg-white/10',
                'transition-colors',
                'duration-200'
              )"
              @click="toggleMobileMenu"
              aria-label="Toggle menu"
            >
              <svg
                v-if="!isMobileMenuOpen"
                class="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                v-else
                class="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </div>

    <!-- Mobile menu -->
    <div
      v-if="isMobileMenuOpen"
      :class="cn(
        'md:hidden',
        'mx-4',
        'mt-2',
        'p-4',
        'rounded-2xl',
        'backdrop-blur-2xl',
        // Light theme - solid visible background and border
        'bg-white',
        'dark:bg-slate-900/95',
        'border',
        'border-slate-200',
        'dark:border-white/[0.1]',
        'shadow-xl',
        'shadow-slate-200/50',
        'dark:shadow-black/30',
        'animate-[slideDown_0.2s_ease-out]'
      )"
    >
      <div class="space-y-1">
        <template v-for="(item, index) in items" :key="index">
          <a
            :href="item.href || '#'"
            :class="getNavLinkClasses(item)"
            @click.prevent="handleItemClick(item, index)"
          >
            {{ item.label }}
          </a>
        </template>
      </div>
      
      <!-- Mobile actions -->
      <div class="pt-4 border-t border-slate-200 dark:border-white/[0.08] mt-4">
        <slot name="mobileActions">
          <slot name="actions" />
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
