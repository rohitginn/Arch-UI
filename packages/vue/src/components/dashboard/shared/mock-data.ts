/**
 * Dashboard Mock Data (Vue)
 * Shared static dataset for all dashboard variants.
 */

import type { StatCardData, ChartDataPoint, ActivityItem } from './types'

export const statCards: StatCardData[] = [
  {
    id: 'users',
    label: 'Total Users',
    value: '12,847',
    change: '+12.5%',
    trend: 'up',
    icon: '👤',
  },
  {
    id: 'revenue',
    label: 'Revenue',
    value: '$48,352',
    change: '+8.2%',
    trend: 'up',
    icon: '💰',
  },
  {
    id: 'orders',
    label: 'Orders',
    value: '3,642',
    change: '-2.4%',
    trend: 'down',
    icon: '📦',
  },
  {
    id: 'conversion',
    label: 'Conversion',
    value: '3.24%',
    change: '+0.8%',
    trend: 'up',
    icon: '📈',
  },
]

export const chartData: ChartDataPoint[] = [
  { name: 'Jan', value: 4200 },
  { name: 'Feb', value: 3800 },
  { name: 'Mar', value: 5100 },
  { name: 'Apr', value: 4600 },
  { name: 'May', value: 5400 },
  { name: 'Jun', value: 6200 },
  { name: 'Jul', value: 5800 },
  { name: 'Aug', value: 7100 },
  { name: 'Sep', value: 6800 },
  { name: 'Oct', value: 7400 },
  { name: 'Nov', value: 8200 },
  { name: 'Dec', value: 9100 },
]

export const recentActivity: ActivityItem[] = [
  {
    id: '1',
    user: 'Sarah Chen',
    action: 'completed',
    target: 'Q4 Revenue Report',
    time: '2 min ago',
    avatar: 'SC',
  },
  {
    id: '2',
    user: 'Alex Rivera',
    action: 'updated',
    target: 'User Analytics Dashboard',
    time: '15 min ago',
    avatar: 'AR',
  },
  {
    id: '3',
    user: 'Jordan Blake',
    action: 'deployed',
    target: 'Production v2.4.1',
    time: '1 hr ago',
    avatar: 'JB',
  },
  {
    id: '4',
    user: 'Maya Patel',
    action: 'reviewed',
    target: 'Design System Updates',
    time: '3 hr ago',
    avatar: 'MP',
  },
  {
    id: '5',
    user: 'Liam Foster',
    action: 'merged',
    target: 'Feature/auth-flow',
    time: '5 hr ago',
    avatar: 'LF',
  },
]
