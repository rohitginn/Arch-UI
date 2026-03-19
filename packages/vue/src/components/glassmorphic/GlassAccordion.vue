<script setup lang="ts">
import { ref, watch } from 'vue';
import { cn } from '@archui/core';

export interface AccordionItem {
  id: string;
  title: string;
  content?: string;
  disabled?: boolean;
}

interface GlassAccordionProps {
  items: AccordionItem[];
  modelValue?: string | string[];
  type?: 'single' | 'multiple';
  collapsible?: boolean;
  variant?: 'default' | 'separated';
}

const props = withDefaults(defineProps<GlassAccordionProps>(), {
  type: 'single',
  collapsible: true,
  variant: 'default',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | string[]): void;
  (e: 'change', value: string | string[]): void;
}>();

const internalValue = ref<string | string[]>(
  props.modelValue !== undefined ? props.modelValue : (props.type === 'multiple' ? [] : '')
);

watch(() => props.modelValue, (newVal) => {
  if (newVal !== undefined) {
    internalValue.value = newVal;
  }
});

const toggleItem = (id: string, disabled?: boolean) => {
  if (disabled) return;

  let newValue: string | string[];

  if (props.type === 'multiple') {
    const arrValue = Array.isArray(internalValue.value) ? internalValue.value : [];
    if (arrValue.includes(id)) {
      newValue = arrValue.filter(v => v !== id);
    } else {
      newValue = [...arrValue, id];
    }
  } else {
    const strValue = typeof internalValue.value === 'string' ? internalValue.value : '';
    if (strValue === id) {
      newValue = props.collapsible ? '' : strValue;
    } else {
      newValue = id;
    }
  }

  internalValue.value = newValue;
  emit('update:modelValue', newValue);
  emit('change', newValue);
};

const isOpen = (id: string) => {
  if (Array.isArray(internalValue.value)) {
    return internalValue.value.includes(id);
  }
  return internalValue.value === id;
};
</script>

<template>
  <div
    :class="cn(
      'flex flex-col',
      variant === 'separated' 
        ? 'gap-4' 
        : 'rounded-2xl border border-surface-border bg-surface-bg-subtle/50 backdrop-blur-md dark:bg-surface-bg-subtle/10 overflow-hidden',
      $attrs.class as string
    )"
  >
    <div
      v-for="item in items"
      :key="item.id"
      :class="cn(
        'group relative flex flex-col',
        variant === 'default' && 'border-b border-surface-border last:border-b-0',
        variant === 'separated' && 'rounded-2xl border border-surface-border bg-surface-bg-subtle/50 backdrop-blur-md dark:bg-surface-bg-subtle/10',
        item.disabled && 'opacity-50 pointer-events-none'
      )"
    >
      <button
        type="button"
        :disabled="item.disabled"
        :aria-expanded="isOpen(item.id)"
        :class="cn(
          'flex w-full items-center justify-between py-4 px-5 text-left transition-all',
          'text-text-primary font-medium hover:text-text-primary/80',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-bg'
        )"
        @click="toggleItem(item.id, item.disabled)"
      >
        <span class="flex items-center gap-3 w-full">
          <slot :name="`title-${item.id}`">{{ item.title }}</slot>
        </span>
        
        <slot name="icon" :isOpen="isOpen(item.id)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            :class="cn(
              'h-4 w-4 shrink-0 transition-transform duration-300 text-text-muted',
              isOpen(item.id) && 'rotate-180 text-text-primary'
            )"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </slot>
      </button>

      <div
        :class="cn(
          'overflow-hidden text-sm transition-all duration-300 ease-[cubic-bezier(0.87,0,0.13,1)]',
          isOpen(item.id) ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 text-[transparent]'
        )"
        style="display: grid"
      >
        <div class="overflow-hidden pb-4 px-5 text-text-secondary leading-relaxed">
          <slot :name="`content-${item.id}`">{{ item.content }}</slot>
        </div>
      </div>
    </div>
  </div>
</template>
