<script setup lang="ts">
/**
 * MotionDrivenDashboard – Microinteraction-Focused (Vue 3)
 *
 * Design philosophy:
 * - Motion guides attention, never distracts
 * - Short, intentional animations with ease-out curves
 * - Card entrance animation on load
 * - Hover scale + elevation on stat cards
 * - Chart line draw animation on mount
 * - Theme toggle animated transition
 * - List row hover motion
 *
 * Uses Vue 3 built-in Transition system + CSS animations.
 * No external motion library required.
 */

import { ref, onMounted } from 'vue'
import '../shared/dashboard-tokens.css'
import { useTheme } from '../shared/use-theme'
import { statCards, chartData, recentActivity } from '../shared/mock-data'

import MotionThemeToggle from './MotionThemeToggle.vue'
import MotionStatCard from './MotionStatCard.vue'
import MotionLineChart from './MotionLineChart.vue'
import MotionActivityList from './MotionActivityList.vue'

const { theme, toggleTheme } = useTheme()

const headerVisible = ref(false)

onMounted(() => {
  // Small delay for header entrance
  setTimeout(() => {
    headerVisible.value = true
  }, 50)
})
</script>

<template>
  <div :class="$style.dashboard" :data-theme="theme">
    <div :class="$style.container">
      <!-- Header -->
      <header :class="[$style.header, headerVisible && $style.headerVisible]">
        <div :class="$style.headerLeft">
          <h1>Dashboard</h1>
          <p>Welcome back. Here's your overview.</p>
        </div>
        <MotionThemeToggle :theme="theme" @toggle="toggleTheme" />
      </header>

      <!-- Stat Cards -->
      <div :class="$style.statsGrid">
        <MotionStatCard
          v-for="(card, i) in statCards"
          :key="card.id"
          :data="card"
          :index="i"
        />
      </div>

      <!-- Chart + Activity -->
      <div :class="$style.contentGrid">
        <MotionLineChart :data="chartData" title="Revenue Trend" />
        <MotionActivityList :items="recentActivity" />
      </div>
    </div>
  </div>
</template>

<style module>
.dashboard {
  min-height: 100vh;
  background: var(--dash-bg);
  color: var(--dash-text);
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter',
    'Segoe UI', Roboto, sans-serif;
  transition: background 400ms cubic-bezier(0.4, 0, 0.2, 1),
              color 400ms cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px;
}

@media (min-width: 768px) {
  .container {
    padding: 56px 40px;
  }
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 48px;
  opacity: 0;
  translate: 0 -12px;
  transition: opacity 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              translate 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.headerVisible {
  opacity: 1;
  translate: 0 0;
}

.headerLeft h1 {
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 1.2;
  color: var(--dash-text);
  margin: 0;
}

.headerLeft p {
  font-size: 14px;
  color: var(--dash-text-muted);
  margin: 6px 0 0;
  font-weight: 400;
}

.statsGrid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-bottom: 40px;
}

@media (min-width: 640px) {
  .statsGrid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .statsGrid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.contentGrid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 1024px) {
  .contentGrid {
    grid-template-columns: 2fr 1fr;
  }
}
</style>
