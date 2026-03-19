<script setup lang="ts">
/**
 * MotionLineChart – Motion-Driven (Vue 3)
 * SVG line chart with draw-on animation on mount.
 * Uses CSS animation + Vue lifecycle for staggered effects.
 */

import { ref, computed, onMounted, nextTick } from 'vue'
import type { ChartDataPoint } from '../shared/types'

const props = withDefaults(defineProps<{
  data: ChartDataPoint[]
  title?: string
}>(), {
  title: 'Revenue Trend'
})

const pathRef = ref<SVGPathElement | null>(null)
const pathLength = ref(2000)
const isMounted = ref(false)
const showArea = ref(false)
const showDots = ref(false)

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

onMounted(async () => {
  await nextTick()

  if (pathRef.value) {
    pathLength.value = pathRef.value.getTotalLength()
  }

  // Stagger: line draws (200ms delay), then area fades, then dots pop
  setTimeout(() => {
    isMounted.value = true
  }, 300)

  setTimeout(() => {
    showArea.value = true
  }, 1200)

  setTimeout(() => {
    showDots.value = true
  }, 1000)
})
</script>

<template>
  <div :class="[$style.chartCard, isMounted && $style.chartCardVisible]">
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
        <g
          v-for="(line, i) in gridLines"
          :key="line.value"
          :class="$style.gridLine"
          :style="{ animationDelay: `${i * 50}ms` }"
        >
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
            :class="$style.axisLabel"
            :style="{ animationDelay: `${800 + i * 30}ms` }"
          >
            {{ p.label }}
          </text>
        </template>

        <!-- Area fill -->
        <path
          :d="areaPath"
          fill="var(--dash-chart-fill)"
          :class="[$style.areaFill, showArea && $style.areaFillVisible]"
        />

        <!-- Line with draw animation -->
        <path
          ref="pathRef"
          :d="linePath"
          fill="none"
          stroke="var(--dash-chart-stroke)"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          :class="[$style.chartLine, isMounted && $style.chartLineAnimated]"
          :style="{
            '--line-length': pathLength,
            strokeDasharray: pathLength,
            strokeDashoffset: isMounted ? 0 : pathLength,
          }"
        />

        <!-- Data points -->
        <circle
          v-for="(p, i) in points"
          :key="`dot-${p.label}`"
          :cx="p.x"
          :cy="p.y"
          r="3.5"
          fill="var(--dash-surface)"
          stroke="var(--dash-chart-stroke)"
          stroke-width="2"
          :class="[$style.dataDot, showDots && $style.dataDotVisible]"
          :style="{ transitionDelay: `${i * 40}ms` }"
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
  transition: border-color var(--dash-transition-fast),
              opacity 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              translate 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: 0;
  translate: 0 20px;
}

.chartCardVisible {
  opacity: 1;
  translate: 0 0;
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

.chartLine {
  transition: stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.chartLineAnimated {
  stroke-dashoffset: 0 !important;
}

.areaFill {
  opacity: 0;
  transition: opacity 600ms cubic-bezier(0.4, 0, 0.2, 1);
}

.areaFillVisible {
  opacity: 1;
}

.dataDot {
  transform: scale(0);
  opacity: 0;
  transition: transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1),
              opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
  transform-box: fill-box;
  transform-origin: center;
}

.dataDotVisible {
  transform: scale(1);
  opacity: 1;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.gridLine {
  opacity: 0;
  animation: fadeIn 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.axisLabel {
  opacity: 0;
  animation: fadeIn 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
</style>
