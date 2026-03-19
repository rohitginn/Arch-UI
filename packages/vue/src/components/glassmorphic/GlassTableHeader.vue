<script setup lang="ts">
import { cn } from '@archui/core';
defineProps<{ class?: string }>();
</script>
<template>
  <div role="rowgroup" :class="cn('sticky top-0 z-20 backdrop-blur-md bg-surface-primary/50 border-b border-surface-border', $props.class)">
    <slot />
  </div>
</template>
