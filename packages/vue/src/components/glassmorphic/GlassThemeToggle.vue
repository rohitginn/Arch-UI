<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { cn } from '@archui/core';

interface GlassThemeToggleProps {
  initialTheme?: 'light' | 'dark';
  class?: string;
}

const props = withDefaults(defineProps<GlassThemeToggleProps>(), {
  initialTheme: 'light',
});

const theme = ref<'light' | 'dark'>(props.initialTheme);

onMounted(() => {
  // Sync with document on mount if needed, or rely on internal state
  if (document.documentElement.classList.contains('dark')) {
      theme.value = 'dark';
  }
});

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  
  if (theme.value === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};
</script>

<template>
  <button
    @click="toggleTheme"
    :class="cn(
      'group relative flex h-10 w-10 items-center justify-center rounded-xl',
      // Light theme - visible background and border
      'bg-white/60 dark:bg-white/[0.06]',
      'backdrop-blur-md',
      'border border-black/[0.08] dark:border-white/[0.08]',
      'shadow-sm',
      'transition-all duration-300',
      'hover:bg-white/80 dark:hover:bg-white/[0.1]',
      'hover:shadow-md',
      'hover:-translate-y-0.5',
      'active:scale-95',
      props.class
    )"
    aria-label="Toggle theme"
  >
    <!-- Sun Icon -->
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      :class="cn(
        'h-[1.2rem] w-[1.2rem] transition-all duration-300 absolute text-amber-500',
        theme === 'dark' ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
      )"
    >
      <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
    </svg>

    <!-- Moon Icon -->
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      :class="cn(
        'h-[1.2rem] w-[1.2rem] transition-all duration-300 absolute text-blue-400',
        theme === 'light' ? 'scale-0 -rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
      )"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
    </svg>
  </button>
</template>
