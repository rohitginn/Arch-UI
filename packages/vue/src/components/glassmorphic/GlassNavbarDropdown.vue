<script setup lang="ts">
import { ref } from 'vue';
import { cn } from '@archui/core';
import GlassNavbar from './GlassNavbar.vue';

interface DropdownItem {
  title: string;
  href: string;
  description?: string;
}

interface NavItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

interface Props {
  items: NavItem[];
}

defineProps<Props>();
const activeDropdown = ref<number | null>(null);

const handleMouseEnter = (index: number) => {
  activeDropdown.value = index;
};

const handleMouseLeave = () => {
  activeDropdown.value = null;
};
</script>

<template>
  <GlassNavbar class="overflow-visible">
    <template #default>
      <div 
        v-for="(item, index) in items" 
        :key="index"
        class="relative group"
        @mouseenter="handleMouseEnter(index)"
        @mouseleave="handleMouseLeave"
      >
        <!-- Main Link -->
        <a
          :href="item.href || '#'"
          :class="cn(
            'flex items-center gap-1 px-3.5 py-2 text-[13px] font-medium rounded-full transition-all duration-200',
            'text-slate-900 dark:text-white/90',
            'hover:bg-slate-100 dark:hover:bg-white/[0.1]',
            activeDropdown === index && 'bg-slate-100 dark:bg-white/[0.1]'
          )"
        >
          {{ item.label }}
          <svg 
            v-if="item.dropdown" 
            xmlns="http://www.w3.org/2000/svg" 
            width="12" height="12" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
            :class="cn(
              'transition-transform duration-200',
              activeDropdown === index && 'rotate-180'
            )"
          >
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </a>

        <!-- Dropdown Menu -->
        <div
          v-if="item.dropdown"
          :class="cn(
            'absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-2 rounded-2xl',
            // Light theme - TINTED background for visibility against white
            'bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-2xl',
            'border border-slate-200 dark:border-white/10',
            // Stronger shadow
            'shadow-2xl shadow-slate-300/50 dark:shadow-black/30',
            'transition-all duration-200 origin-top',
            activeDropdown === index 
              ? 'opacity-100 translate-y-0 visible' 
              : 'opacity-0 -translate-y-2 invisible pointer-events-none'
          )"
        >
          <div class="grid gap-1">
            <a
              v-for="(subItem, subIndex) in item.dropdown"
              :key="subIndex"
              :href="subItem.href"
              class="block p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            >
              <div class="text-sm font-medium text-slate-900 dark:text-white">
                {{ subItem.title }}
              </div>
              <div v-if="subItem.description" class="text-xs text-slate-500 dark:text-white/60 mt-0.5 line-clamp-2">
                {{ subItem.description }}
              </div>
            </a>
          </div>
        </div>
      </div>
    </template>
  </GlassNavbar>
</template>
