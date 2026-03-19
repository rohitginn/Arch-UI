/**
 * Dashboard Examples (Vue)
 *
 * Two dashboard variants demonstrating different interaction philosophies:
 *
 * 1. Ultra-Minimal (Apple-style) – Calm, spacious, content-focused.
 * 2. Motion-Driven – Enhanced microinteractions using Vue 3 transitions.
 *
 * Both share the same mock data, CSS custom properties, and theme composable.
 */

// Shared
export type { StatCardData, ChartDataPoint, ActivityItem, Theme } from './shared'
export { statCards, chartData, recentActivity, useTheme } from './shared'

// Ultra-Minimal variant
export {
  UltraMinimalDashboard,
  ThemeToggle,
  StatCard,
  MiniLineChart,
  ActivityList,
} from './ultra-minimal'

// Motion-Driven variant
export {
  MotionDrivenDashboard,
  MotionThemeToggle,
  MotionStatCard,
  MotionLineChart,
  MotionActivityList,
} from './motion-driven'
