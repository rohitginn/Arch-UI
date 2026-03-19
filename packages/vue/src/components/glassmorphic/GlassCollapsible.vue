<script setup lang="ts">
/**
 * GlassCollapsible - Single-panel show/hide with animated height
 */
import { ref, watch, nextTick } from 'vue';
import { cn } from '@archui/core';

interface GlassCollapsibleProps {
  open?: boolean;
  defaultOpen?: boolean;
  disabled?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<GlassCollapsibleProps>(), {
  open: undefined,
  defaultOpen: false,
  disabled: false,
});

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void;
}>();

const internalOpen = ref(props.defaultOpen);
const isControlled = props.open !== undefined;
const isOpen = ref(isControlled ? props.open : internalOpen.value);

watch(
  () => props.open,
  (v) => { if (v !== undefined) isOpen.value = v; },
);

const contentRef = ref<HTMLElement | null>(null);
const contentHeight = ref('0px');

const toggle = () => {
  if (props.disabled) return;
  const next = !isOpen.value;
  if (!isControlled) {
    internalOpen.value = next;
    isOpen.value = next;
  }
  emit('update:open', next);
};

watch(isOpen, async (val) => {
  await nextTick();
  if (contentRef.value) {
    contentHeight.value = val ? `${contentRef.value.scrollHeight}px` : '0px';
  }
}, { immediate: true });
</script>

<template>
  <div :class="cn('', $props.class)">
    <!-- Trigger slot -->
    <slot name="trigger" :open="isOpen" :toggle="toggle">
      <button
        type="button"
        :disabled="disabled"
        :aria-expanded="isOpen"
        class="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium cursor-pointer
          text-[var(--glass-text,#0f172a)] dark:text-[var(--glass-text,#f8fafc)]
          hover:bg-[var(--surface-bg-hover,#f1f5f9)] dark:hover:bg-[var(--glass-bg-dark-hover,rgba(255,255,255,0.06))]
          disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
        @click="toggle"
      >
        <span>Toggle</span>
        <svg
          class="h-4 w-4 transition-transform duration-300"
          :class="{ 'rotate-180': isOpen }"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </slot>

    <!-- Collapsible content -->
    <div
      class="overflow-hidden transition-[max-height] duration-300 ease-in-out"
      :style="{ maxHeight: contentHeight }"
    >
      <div ref="contentRef">
        <slot :open="isOpen" />
      </div>
    </div>
  </div>
</template>
