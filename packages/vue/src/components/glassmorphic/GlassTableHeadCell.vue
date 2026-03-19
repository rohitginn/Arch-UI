<script setup lang="ts">
import { cn } from '@archui/core';
defineProps<{ class?: string }>();
</script>
<template>
  <div role="columnheader" :class="cn('px-4 py-3 align-middle font-semibold text-text-primary/70 tracking-tightest', $props.class)">
    <slot />
  </div>
</template>
