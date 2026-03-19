<script setup lang="ts">
/**
 * GlassToggleGroup - Grouped toggle set with single/multiple select
 */

import { cn } from '@archui/core';

interface GlassToggleGroupProps {
  modelValue: string | string[];
  type?: 'single' | 'multiple';
  class?: string;
}

const props = withDefaults(defineProps<GlassToggleGroupProps>(), {
  type: 'single',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | string[]): void;
}>();

const slots = defineSlots<{ default?(): any }>();

const isSelected = (val: string) => {
  if (props.type === 'multiple') {
    return Array.isArray(props.modelValue) && props.modelValue.includes(val);
  }
  return props.modelValue === val;
};

const toggle = (val: string) => {
  if (props.type === 'multiple') {
    const arr = Array.isArray(props.modelValue) ? [...props.modelValue] : [];
    const idx = arr.indexOf(val);
    if (idx >= 0) arr.splice(idx, 1);
    else arr.push(val);
    emit('update:modelValue', arr);
  } else {
    emit('update:modelValue', props.modelValue === val ? '' : val);
  }
};

defineExpose({ isSelected, toggle });
</script>

<template>
  <div
    role="group"
    :class="cn(
      'inline-flex items-center gap-1 rounded-xl p-1',
      'bg-[var(--surface-bg-hover,#f1f5f9)] dark:bg-[var(--glass-bg-dark,rgba(255,255,255,0.03))]',
      'border border-[var(--surface-border,#e2e8f0)] dark:border-[var(--surface-border,rgba(255,255,255,0.08))]',
      $props.class,
    )"
  >
    <slot :is-selected="isSelected" :toggle="toggle" />
  </div>
</template>
