<script setup lang="ts">
/**
 * GlassFormField - Label + control + helper/error text wrapper
 */
import { computed } from 'vue';
import { cn } from '@archui/core';

interface GlassFormFieldProps {
  label?: string;
  htmlFor?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  class?: string;
}

const props = defineProps<GlassFormFieldProps>();

const fieldId = computed(() => props.htmlFor || `field-${Math.random().toString(36).slice(2, 9)}`);
const descId = computed(() => `${fieldId.value}-desc`);
const hasMessage = computed(() => !!props.error || !!props.helperText);
</script>

<template>
  <div :class="cn('flex flex-col gap-1.5', $props.class)">
    <!-- Label -->
    <label
      v-if="label"
      :for="fieldId"
      :class="cn(
        'text-sm font-medium',
        error
          ? 'text-[var(--glass-error,#ef4444)]'
          : 'text-[var(--glass-text,#0f172a)] dark:text-[var(--glass-text,#f8fafc)]',
      )"
    >
      {{ label }}
      <span v-if="required" class="ml-0.5 text-[var(--glass-error,#ef4444)]">*</span>
    </label>

    <!-- Control slot -->
    <slot :field-id="fieldId" :desc-id="hasMessage ? descId : undefined" :has-error="!!error" />

    <!-- Helper / Error text -->
    <p
      v-if="hasMessage"
      :id="descId"
      :class="cn(
        'text-xs',
        error
          ? 'text-[var(--glass-error,#ef4444)]'
          : 'text-[var(--glass-text-secondary,#475569)] dark:text-[var(--glass-text-secondary,#94a3b8)]',
      )"
    >
      {{ error || helperText }}
    </p>
  </div>
</template>
