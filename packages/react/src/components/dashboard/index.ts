/**
 * Dashboard Examples
 *
 * Two dashboard variants demonstrating different interaction philosophies:
 *
 * 1. Ultra-Minimal (Apple-style) – Calm, spacious, content-focused.
 *    No animations beyond subtle CSS transitions.
 *
 * 2. Motion-Driven – Enhanced microinteractions using Framer Motion.
 *    Card entrances, chart draw animation, hover scale effects.
 *
 * Both share the same mock data, CSS custom properties, and theme hook.
 */

// Shared
export type { StatCardData, ChartDataPoint, ActivityItem, Theme } from './shared';
export { statCards, chartData, recentActivity, useTheme } from './shared';

// Ultra-Minimal variant
export {
  UltraMinimalDashboard,
  ThemeToggle,
  StatCard,
  MiniLineChart,
  ActivityList,
} from './ultra-minimal';

// Motion-Driven variant
export {
  MotionDrivenDashboard,
  MotionThemeToggle,
  MotionStatCard,
  MotionLineChart,
  MotionActivityList,
} from './motion-driven';
