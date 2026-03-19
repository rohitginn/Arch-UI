<script setup lang="ts">
/**
 * MiniLineChart – Ultra-Minimal (Vue 3)
 * Pure SVG line chart — no external chart library.
 * Clean Apple-style trend line rendered from data.
 */

import { computed } from 'vue'
import type { ChartDataPoint } from '../shared/types'

const props = withDefaults(defineProps<{
  data: ChartDataPoint[]
  title?: string
}>(), {
  title: 'Revenue Trend'
})

const viewBoxWidth = 600
const viewBoxHeight = 240
const paddingX = 40
const paddingY = 24
const chartWidth = viewBoxWidth - paddingX * 2
const chartHeight = viewBoxHeight - paddingY * 2

const maxValue = computed(() => Math.max(...props.data.map(d => d.value)))
const minValue = computed(() => Math.min(...props.data.map(d => d.value)))
const range = computed(() => maxValue.value - minValue.value || 1)

const points = computed(() =>
  props.data.map((d, i) => ({
    x: paddingX + (i / (props.data.length - 1)) * chartWidth,
    y: paddingY + chartHeight - ((d.value - minValue.value) / range.value) * chartHeight,
    label: d.name,
    value: d.value,
  }))
)

const linePath = computed(() =>
  points.value.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
)

const areaPath = computed(() =>
  `${linePath.value} L ${points.value[points.value.length - 1].x} ${paddingY + chartHeight} L ${points.value[0].x} ${paddingY + chartHeight} Z`
)

const gridLines = computed(() =>
  Array.from({ length: 5 }, (_, i) => ({
    y: paddingY + (i / 4) * chartHeight,
    value: Math.round(maxValue.value - (i / 4) * range.value).toLocaleString(),
  }))
)
</script>

<template>
  <div :class="$style.chartCard">
    <h3 :class="$style.chartTitle">{{ title }}</h3>
    <div :class="$style.chartWrapper">
      <svg
        :viewBox="`0 0 ${viewBoxWidth} ${viewBoxHeight}`"
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        role="img"
        :aria-label="`${title} chart showing data over time`"
      >
        <!-- Grid lines -->
        <g v-for="line in gridLines" :key="line.value">
          <line
            :x1="paddingX"
            :y1="line.y"
            :x2="viewBoxWidth - paddingX"
            :y2="line.y"
            stroke="var(--dash-chart-grid)"
            stroke-width="1"
          />
          <text
            :x="paddingX - 8"
            :y="line.y + 3"
            text-anchor="end"
            fill="var(--dash-text-muted)"
            font-size="9"
            font-family="inherit"
          >
            {{ line.value }}
          </text>
        </g>

        <!-- X-axis labels -->
        <template v-for="(p, i) in points" :key="`label-${p.label}`">
          <text
            v-if="i % 2 === 0"
            :x="p.x"
            :y="viewBoxHeight - 4"
            text-anchor="middle"
            fill="var(--dash-text-muted)"
            font-size="9"
            font-family="inherit"
          >
            {{ p.label }}
          </text>
        </template>

        <!-- Area fill -->
        <path :d="areaPath" fill="var(--dash-chart-fill)" />

        <!-- Line -->
        <path
          :d="linePath"
          fill="none"
          stroke="var(--dash-chart-stroke)"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />

        <!-- Data points -->
        <circle
          v-for="p in points"
          :key="`dot-${p.label}`"
          :cx="p.x"
          :cy="p.y"
          r="3"
          fill="var(--dash-surface)"
          stroke="var(--dash-chart-stroke)"
          stroke-width="2"
        />
      </svg>
    </div>
  </div>
</template>

<style module>
.chartCard {
  padding: 28px;
  border-radius: 16px;
  background: var(--dash-surface);
  border: 1px solid var(--dash-border-subtle);
  transition: background var(--dash-transition-fast),
              border-color var(--dash-transition-fast);
}

.chartTitle {
  font-size: 16px;
  font-weight: 600;
  color: var(--dash-text);
  margin: 0 0 24px;
  letter-spacing: -0.01em;
}

.chartWrapper {
  width: 100%;
  height: 280px;
}
</style>
