<script setup lang="ts">
/**
 * StatCard – Ultra-Minimal (Vue 3)
 * Clean, typography-driven stat card with subtle hover state.
 */

import type { StatCardData } from '../shared/types'

defineProps<{
  data: StatCardData
}>()
</script>

<template>
  <article :class="$style.statCard" :aria-label="`${data.label}: ${data.value}`">
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
  transition: background var(--dash-transition-fast),
              border-color var(--dash-transition-fast);
}

.statCard:hover {
  background: var(--dash-surface-hover);
  border-color: var(--dash-border);
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
