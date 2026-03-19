<script setup lang="ts">
/**
 * GlassSegmentedControl - Token-based pill-shaped toggle for Vue 3
 */
import { ref, computed, watch, nextTick, onMounted } from 'vue';
import { cn } from '@archui/core';

interface SegmentItem {
  value: string;
  label: string;
  disabled?: boolean;
}

interface Props {
  items: SegmentItem[];
  modelValue?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  fullWidth: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const containerRef = ref<HTMLDivElement | null>(null);
const indicatorStyle = ref<Record<string, string>>({});

const activeValue = computed(() => props.modelValue ?? props.items[0]?.value);

const sizeClasses: Record<string, string> = {
  sm: 'h-8 text-xs px-3',
  md: 'h-9 text-sm px-4',
  lg: 'h-10 text-sm px-5',
};

const updateIndicator = () => {
  nextTick(() => {
    if (!containerRef.value) return;
    const btn = containerRef.value.querySelector(`[data-value="${activeValue.value}"]`) as HTMLElement;
    if (btn) {
      indicatorStyle.value = {
        left: btn.offsetLeft + 'px',
        width: btn.offsetWidth + 'px',
        height: btn.offsetHeight + 'px',
      };
    }
  });
};

watch(activeValue, updateIndicator);
onMounted(updateIndicator);
</script>

<template>
  <div :class="cn(
    'relative inline-flex p-1 rounded-xl',
    'bg-[var(--glass-surface-hover)]/60',
    'border border-[var(--glass-edge)]',
    fullWidth && 'w-full',
    props.class,
  )">
    <div ref="containerRef" :class="cn('relative flex', fullWidth && 'w-full')">
      <div :class="cn(
        'absolute top-0 rounded-lg',
        'transition-all duration-250 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
        'bg-[var(--glass-surface-elevated)]',
        'shadow-[var(--glass-depth-sm)]',
      )" :style="indicatorStyle" />
      <button v-for="item in items" :key="item.value" type="button" :data-value="item.value" :disabled="item.disabled"
        :class="cn(
          'relative z-10 inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 outline-none',
          sizeClasses[size],
          fullWidth && 'flex-1',
          activeValue === item.value ? 'text-[var(--glass-text)]' : 'text-[var(--glass-text-muted)] hover:text-[var(--glass-text-secondary)]',
          item.disabled && 'opacity-40 pointer-events-none',
        )" @click="emit('update:modelValue', item.value)">
        {{ item.label }}
      </button>
    </div>
  </div>
</template>
