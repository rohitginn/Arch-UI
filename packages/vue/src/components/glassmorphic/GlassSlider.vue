<script setup lang="ts">
/**
 * GlassSlider - Range input with glass styling
 */
import { computed, ref } from 'vue';
import { cn } from '@archui/core';

interface GlassSliderProps {
  modelValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  showTooltip?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<GlassSliderProps>(), {
  modelValue: 0,
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  showTooltip: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();

const hovering = ref(false);
const pct = computed(() => ((props.modelValue - props.min) / (props.max - props.min)) * 100);

const onInput = (e: Event) => {
  const val = Number((e.target as HTMLInputElement).value);
  emit('update:modelValue', val);
};
</script>

<template>
  <div
    :class="cn('relative w-full group', disabled && 'opacity-40', $props.class)"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <!-- Tooltip -->
    <div
      v-if="showTooltip && hovering && !disabled"
      class="absolute -top-8 px-2 py-0.5 rounded-md text-xs font-medium pointer-events-none
        bg-[var(--glass-text,#0f172a)] dark:bg-[var(--glass-text,#f8fafc)]
        text-white dark:text-[#0f172a] transition-opacity duration-150"
      :style="{ left: `${pct}%`, transform: 'translateX(-50%)' }"
    >
      {{ modelValue }}
    </div>

    <!-- Track background -->
    <div class="relative h-2 w-full rounded-full bg-[var(--surface-bg-hover,#e2e8f0)] dark:bg-[rgba(255,255,255,0.08)]">
      <!-- Fill -->
      <div
        class="absolute h-full rounded-full bg-[var(--accent-primary,#3b82f6)] transition-all duration-100"
        :style="{ width: `${pct}%` }"
      />
    </div>

    <!-- Native range input (invisible, overlaid) -->
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      :disabled="disabled"
      :class="cn(
        'absolute inset-0 w-full h-2 opacity-0 cursor-pointer',
        disabled && 'cursor-not-allowed',
      )"
      @input="onInput"
    />

    <!-- Custom thumb (visual only) -->
    <div
      class="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full pointer-events-none
        bg-[var(--accent-primary,#3b82f6)] border-2 border-white dark:border-[#1e1e1e]
        shadow-md transition-transform duration-150
        group-hover:scale-110"
      :style="{ left: `calc(${pct}% - 8px)` }"
    />
  </div>
</template>
