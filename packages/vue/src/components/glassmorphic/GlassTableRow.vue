<script setup lang="ts">
import { cn } from '@archui/core';
defineProps<{ class?: string }>();
</script>
<template>
  <div role="row" :class="cn('contents group', $props.class)">
    <slot />
  </div>
</template>
