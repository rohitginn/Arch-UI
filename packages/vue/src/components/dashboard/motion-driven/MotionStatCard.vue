<script setup lang="ts">
/**
 * MotionStatCard – Motion-Driven (Vue 3)
 * Card entrance animation on mount + hover scale microinteraction.
 * Uses CSS animations triggered via onMounted.
 */

import { ref, onMounted, computed } from 'vue'
import type { StatCardData } from '../shared/types'

const props = withDefaults(defineProps<{
  data: StatCardData
  index?: number
}>(), {
  index: 0
})

const isVisible = ref(false)
const isHovered = ref(false)

onMounted(() => {
  // Staggered entrance delay
  setTimeout(() => {
    isVisible.value = true
  }, props.index * 80)
})

const cardStyle = computed(() => ({
  transitionDelay: isVisible.value ? '0ms' : `${props.index * 80}ms`,
  transform: isHovered.value ? 'scale(1.02)' : 'scale(1)',
  boxShadow: isHovered.value ? 'var(--dash-shadow-lg)' : 'var(--dash-shadow-sm)',
}))
</script>

<template>
  <article
    :class="[$style.statCard, isVisible && $style.visible]"
    :style="cardStyle"
    :aria-label="`${data.label}: ${data.value}`"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <span :class="$style.statCardIcon" aria-hidden="true">{{ data.icon }}</span>
    <p :class="$style.statCardLabel">{{ data.label }}</p>
    <p :class="$style.statCardValue">{{ data.value }}</p>
    <span
      :class="[
        $style.statCardChange,
        data.trend === 'up' ? $style.trendUp :
        data.trend === 'down' ? $style.trendDown :
        $style.trendNeutral
      ]"
    >
      {{ data.trend === 'up' ? '↑' : data.trend === 'down' ? '↓' : '→' }}
      {{ data.change }}
    </span>
  </article>
</template>

<style module>
.statCard {
  padding: 24px;
  border-radius: 16px;
  background: var(--dash-surface);
  border: 1px solid var(--dash-border-subtle);
  cursor: default;
  will-change: transform, box-shadow;
  transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1),
              border-color var(--dash-transition-fast),
              opacity 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              translate 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: 0;
  translate: 0 24px;
}

.statCard:hover {
  border-color: var(--dash-border);
}

.statCard:active {
  transform: scale(0.98) !important;
}

.visible {
  opacity: 1;
  translate: 0 0;
}

.statCardIcon {
  font-size: 20px;
  margin-bottom: 16px;
  display: block;
}

.statCardLabel {
  font-size: 13px;
  font-weight: 500;
  color: var(--dash-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin: 0 0 8px;
}

.statCardValue {
  font-size: 30px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--dash-text);
  margin: 0 0 8px;
  font-variant-numeric: tabular-nums;
}

.statCardChange {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 6px;
}

.trendUp {
  color: var(--dash-success);
  background: var(--dash-success-soft);
}

.trendDown {
  color: var(--dash-error);
  background: var(--dash-error-soft);
}

.trendNeutral {
  color: var(--dash-text-muted);
  background: var(--dash-border-subtle);
}
</style>
