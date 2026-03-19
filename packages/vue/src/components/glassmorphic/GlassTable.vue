<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@archui/core';

interface Props {
  variant?: 'default' | 'subtle';
  compact?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  compact: false,
});

const tableClasses = computed(() => {
  return cn(
    'w-full text-left border-collapse grid isolation-isolate',
    props.variant === 'subtle' ? 'text-text-secondary text-sm' : 'text-text-primary',
    props.compact ? 'gap-y-0.5' : 'gap-y-1',
    props.class
  );
});
</script>

<template>
  <div role="table" :class="tableClasses" style="grid-template-columns: 1fr">
    <slot />
  </div>
</template>
