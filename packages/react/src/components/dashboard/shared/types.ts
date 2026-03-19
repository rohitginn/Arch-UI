/**
 * Dashboard Shared Types
 * Common interfaces used across both ultra-minimal and motion-driven variants.
 */

export interface StatCardData {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  avatar: string;
}

export type Theme = 'light' | 'dark';
