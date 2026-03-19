<script setup lang="ts">
/**
 * ThemeToggle – Ultra-Minimal (Vue 3)
 * Simple sun/moon icon swap with 150ms crossfade.
 */

import type { Theme } from '../shared/types'

defineProps<{
  theme: Theme
}>()

const emit = defineEmits<{
  toggle: []
}>()
</script>

<template>
  <button
    :class="$style.themeToggle"
    :aria-label="`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`"
    type="button"
    @click="emit('toggle')"
  >
    {{ theme === 'light' ? '☀️' : '🌙' }}
  </button>
</template>

<style module>
.themeToggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid var(--dash-border);
  background: var(--dash-surface);
  color: var(--dash-text-secondary);
  cursor: pointer;
  transition: background var(--dash-transition-fast),
              border-color var(--dash-transition-fast),
              transform var(--dash-transition-fast);
  font-size: 18px;
  line-height: 1;
}

.themeToggle:hover {
  background: var(--dash-surface-hover);
}

.themeToggle:active {
  transform: scale(0.95);
}
</style>
