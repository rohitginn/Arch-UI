<script setup lang="ts">
import { cn } from '@archui/core';
defineProps<{ class?: string }>();
</script>
<template>
  <div role="cell" :class="cn('px-4 py-3 align-middle transition-colors group-hover:bg-surface-primary/10', $props.class)">
    <slot />
  </div>
</template>
