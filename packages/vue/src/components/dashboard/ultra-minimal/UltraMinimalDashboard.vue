<script setup lang="ts">
/**
 * UltraMinimalDashboard – Apple-Style (Vue 3)
 *
 * Design philosophy:
 * - Calm, spacious, neutral, premium
 * - Content-focused, typography-first
 * - No heavy shadows, very subtle borders
 * - Transitions only (150–200ms)
 */

import '../shared/dashboard-tokens.css'
import { useTheme } from '../shared/use-theme'
import { statCards, chartData, recentActivity } from '../shared/mock-data'

import ThemeToggle from './ThemeToggle.vue'
import StatCard from './StatCard.vue'
import MiniLineChart from './MiniLineChart.vue'
import ActivityList from './ActivityList.vue'

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <div :class="$style.dashboard" :data-theme="theme">
    <div :class="$style.container">
      <!-- Header -->
      <header :class="$style.header">
        <div :class="$style.headerLeft">
          <h1>Dashboard</h1>
          <p>Welcome back. Here's your overview.</p>
        </div>
        <ThemeToggle :theme="theme" @toggle="toggleTheme" />
      </header>

      <!-- Stat Cards -->
      <div :class="$style.statsGrid">
        <StatCard
          v-for="card in statCards"
          :key="card.id"
          :data="card"
        />
      </div>

      <!-- Chart + Activity -->
      <div :class="$style.contentGrid">
        <MiniLineChart :data="chartData" title="Revenue Trend" />
        <ActivityList :items="recentActivity" />
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
  transition: background var(--dash-transition-slow),
              color var(--dash-transition-slow);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
