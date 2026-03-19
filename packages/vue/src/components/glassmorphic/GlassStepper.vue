<script setup lang="ts">
/**
 * GlassStepper - Token-based multi-step progress flow for Vue 3
 */
import { computed } from 'vue';
import { cn } from '@archui/core';

interface StepItem {
  label: string;
  description?: string;
}

interface Props {
  steps: StepItem[];
  activeStep?: number;
  orientation?: 'horizontal' | 'vertical';
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  activeStep: 0,
  orientation: 'horizontal',
});

const emit = defineEmits<{
  (e: 'stepClick', index: number): void;
}>();

const isVertical = computed(() => props.orientation === 'vertical');

const getStatus = (index: number) => {
  if (index < props.activeStep) return 'completed';
  if (index === props.activeStep) return 'active';
  return 'pending';
};
</script>

<template>
  <div :class="cn('flex', isVertical ? 'flex-col' : 'flex-row items-start', props.class)">
    <template v-for="(step, index) in steps" :key="index">
      <div :class="cn('flex shrink-0', isVertical ? 'flex-row items-start gap-3' : 'flex-col items-center gap-2')">
        <button type="button" :class="cn(
          'relative flex items-center justify-center rounded-full h-9 w-9 shrink-0 transition-all duration-300 ease-out outline-none',
          'focus-visible:ring-2 focus-visible:ring-[var(--glass-accent)]/30 focus-visible:ring-offset-2',
          getStatus(index) === 'completed' && 'bg-[var(--glass-success)] text-white shadow-[0_0_12px_var(--glass-success)]',
          getStatus(index) === 'active' && 'bg-[var(--glass-accent)] text-white shadow-[0_0_16px_var(--glass-accent)] animate-pulse',
          getStatus(index) === 'pending' && 'bg-[var(--glass-surface-hover)] text-[var(--glass-text-muted)] border border-[var(--glass-edge)]',
        )" @click="emit('stepClick', index)">
          <svg v-if="getStatus(index) === 'completed'" class="h-4 w-4" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span v-else class="text-xs font-semibold">{{ index + 1 }}</span>
        </button>
        <div :class="cn(isVertical ? 'pt-1' : 'text-center max-w-[100px]')">
          <p
            :class="cn('text-xs font-medium', getStatus(index) === 'pending' ? 'text-[var(--glass-text-muted)]' : 'text-[var(--glass-text-secondary)]')">
            {{ step.label }}
          </p>
          <p v-if="step.description" class="mt-0.5 text-[11px] text-[var(--glass-text-placeholder)] leading-tight">{{
            step.description }}</p>
        </div>
      </div>
      <div v-if="index !== steps.length - 1" :class="cn(
        'relative overflow-hidden rounded-full',
        isVertical ? 'ml-[17px] w-px h-8 my-1' : 'mt-[17px] h-px flex-1 min-w-[24px] mx-2',
        'bg-[var(--glass-divider)]',
      )">
        <div :class="cn(
          'absolute rounded-full bg-[var(--glass-success)]/60 transition-all duration-500 ease-out',
          isVertical ? 'top-0 left-0 w-full' : 'left-0 top-0 h-full',
        )"
          :style="isVertical ? { height: getStatus(index) === 'completed' ? '100%' : getStatus(index) === 'active' ? '50%' : '0%' } : { width: getStatus(index) === 'completed' ? '100%' : getStatus(index) === 'active' ? '50%' : '0%' }" />
      </div>
    </template>
  </div>
</template>
