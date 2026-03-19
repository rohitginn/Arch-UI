<script setup lang="ts">
/**
 * GlassTagInput - Multi-tag input with Enter/comma to create, X/backspace to remove
 */
import { ref, computed } from 'vue';
import { cn } from '@archui/core';

interface GlassTagInputProps {
  modelValue?: string[];
  placeholder?: string;
  maxTags?: number;
  disabled?: boolean;
  error?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<GlassTagInputProps>(), {
  modelValue: () => [],
  placeholder: 'Add tag…',
  maxTags: Infinity,
  disabled: false,
  error: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
}>();

const inputValue = ref('');
const inputRef = ref<HTMLInputElement | null>(null);

const atLimit = computed(() => props.modelValue.length >= props.maxTags);

const addTag = (raw: string) => {
  const tag = raw.trim();
  if (!tag || props.modelValue.includes(tag) || atLimit.value) return;
  emit('update:modelValue', [...props.modelValue, tag]);
  inputValue.value = '';
};

const removeTag = (idx: number) => {
  const next = [...props.modelValue];
  next.splice(idx, 1);
  emit('update:modelValue', next);
};

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ',') {
    e.preventDefault();
    addTag(inputValue.value);
  } else if (e.key === 'Backspace' && !inputValue.value && props.modelValue.length > 0) {
    removeTag(props.modelValue.length - 1);
  }
};
</script>

<template>
  <div
    :class="cn(
      'flex flex-wrap items-center gap-1.5 rounded-xl px-3 py-2 min-h-[42px] cursor-text transition-colors duration-200',
      'bg-[var(--surface-bg,#ffffff)] dark:bg-[var(--glass-bg-dark,rgba(255,255,255,0.03))]',
      'border',
      error
        ? 'border-[var(--glass-error,#ef4444)] ring-1 ring-[var(--glass-error,#ef4444)]/30'
        : 'border-[var(--surface-border,#e2e8f0)] dark:border-[var(--surface-border,rgba(255,255,255,0.1))] focus-within:border-[var(--accent-primary,#3b82f6)] focus-within:ring-1 focus-within:ring-[var(--accent-primary,#3b82f6)]/30',
      disabled && 'opacity-50 pointer-events-none',
      $props.class,
    )"
    @click="inputRef?.focus()"
  >
    <!-- Tags -->
    <span
      v-for="(tag, idx) in modelValue"
      :key="tag"
      :class="cn(
        'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium',
        'bg-[var(--accent-subtle,#dbeafe)] dark:bg-[var(--accent-subtle,rgba(59,130,246,0.15))]',
        'text-[var(--accent-primary,#3b82f6)]',
      )"
    >
      {{ tag }}
      <button
        v-if="!disabled"
        type="button"
        aria-label="Remove tag"
        class="ml-0.5 rounded-full p-0.5 cursor-pointer
          hover:bg-[var(--accent-primary,#3b82f6)]/20 transition-colors duration-150"
        @click.stop="removeTag(idx)"
      >
        <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </span>

    <!-- Input -->
    <input
      ref="inputRef"
      v-model="inputValue"
      type="text"
      :placeholder="modelValue.length === 0 ? placeholder : ''"
      :disabled="disabled || atLimit"
      class="flex-1 min-w-[80px] bg-transparent text-sm outline-none
        text-[var(--glass-text,#0f172a)] dark:text-[var(--glass-text,#f8fafc)]
        placeholder:text-[var(--glass-text-secondary,#94a3b8)]"
      @keydown="onKeydown"
    />
  </div>
</template>
