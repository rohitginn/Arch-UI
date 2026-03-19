<script setup lang="ts">
/**
 * GlassColorSwatch - Clickable color chip with clipboard copy
 */
import { ref, computed } from 'vue';
import { cn } from '@archui/core';

interface GlassColorSwatchProps {
  color: string;
  label?: string;
  selected?: boolean;
  size?: 'sm' | 'md' | 'lg';
  class?: string;
}

const props = withDefaults(defineProps<GlassColorSwatchProps>(), {
  selected: false,
  size: 'md',
});

const emit = defineEmits<{
  (e: 'click', color: string): void;
}>();

const justCopied = ref(false);

const sizeMap: Record<string, string> = {
  sm: 'h-6 w-6 rounded-md',
  md: 'h-8 w-8 rounded-lg',
  lg: 'h-10 w-10 rounded-xl',
};

const handleClick = async () => {
  try {
    await navigator.clipboard.writeText(props.color);
    justCopied.value = true;
    setTimeout(() => (justCopied.value = false), 1500);
  } catch { /* noop */ }
  emit('click', props.color);
};

const showCheck = computed(() => props.selected || justCopied.value);
</script>

<template>
  <button
    type="button"
    :title="color"
    :class="cn(
      'inline-flex items-center justify-center cursor-pointer border-2 transition-all duration-200',
      'hover:scale-110 hover:shadow-lg',
      'active:scale-95',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary,#3b82f6)] focus-visible:ring-offset-2',
      sizeMap[size],
      selected
        ? 'border-[var(--accent-primary,#3b82f6)] shadow-md'
        : 'border-[var(--surface-border,#e2e8f0)] dark:border-[rgba(255,255,255,0.15)]',
      $props.class,
    )"
    :style="{ backgroundColor: color }"
    @click="handleClick"
  >
    <svg
      v-if="showCheck"
      class="h-3.5 w-3.5 drop-shadow-md"
      :class="color.toLowerCase().includes('fff') || color.toLowerCase().includes('f8f') ? 'text-gray-800' : 'text-white'"
      fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  </button>
</template>
