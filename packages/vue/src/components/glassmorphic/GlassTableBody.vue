<script setup lang="ts">
import { cn } from '@archui/core';
defineProps<{ class?: string }>();
</script>
<template>
  <div role="rowgroup" :class="cn('relative divide-y divide-surface-border/50', $props.class)">
    <slot />
  </div>
</template>
