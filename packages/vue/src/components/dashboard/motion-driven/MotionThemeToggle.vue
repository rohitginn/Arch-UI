<script setup lang="ts">
/**
 * MotionThemeToggle – Motion-Driven (Vue 3)
 * Animated icon swap with Vue Transition.
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
    <Transition name="icon-swap" mode="out-in">
      <span :key="theme" :class="$style.themeToggleIcon">
        {{ theme === 'light' ? '☀️' : '🌙' }}
      </span>
    </Transition>
  </button>
</template>

<style module>
.themeToggle {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 14px;
  border: 1px solid var(--dash-border);
  background: var(--dash-surface);
  color: var(--dash-text-secondary);
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  overflow: hidden;
  transition: background var(--dash-transition-fast),
              border-color var(--dash-transition-fast),
              transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.themeToggle:hover {
  background: var(--dash-surface-hover);
}

.themeToggle:active {
  transform: scale(0.88);
}

.themeToggleIcon {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<style>
/* Global transition classes for icon swap */
.icon-swap-enter-active,
.icon-swap-leave-active {
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.icon-swap-enter-from {
  opacity: 0;
  transform: translateY(-16px) rotate(-90deg);
}

.icon-swap-leave-to {
  opacity: 0;
  transform: translateY(16px) rotate(90deg);
}
</style>
