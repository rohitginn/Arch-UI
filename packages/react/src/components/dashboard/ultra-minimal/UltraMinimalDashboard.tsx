'use client';

/**
 * UltraMinimalDashboard – Apple-Style
 *
 * Design philosophy:
 * - Calm, spacious, neutral, premium
 * - Content-focused, typography-first
 * - No heavy shadows, very subtle borders
 * - Transitions only (150–200ms), no unnecessary animations
 * - Gentle hover states, soft background fade
 */

import * as React from 'react';
import '../shared/dashboard-tokens.css';
import styles from './ultra-minimal.module.css';

import { useTheme } from '../shared/use-theme';
import { statCards, chartData, recentActivity } from '../shared/mock-data';

import { ThemeToggle } from './ThemeToggle';
import { StatCard } from './StatCard';
import { MiniLineChart } from './MiniLineChart';
import { ActivityList } from './ActivityList';

export function UltraMinimalDashboard() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={styles.dashboard} data-theme={theme}>
            <div className={styles.container}>
                {/* Header */}
                <header className={styles.header}>
                    <div className={styles.headerLeft}>
                        <h1>Dashboard</h1>
                        <p>Welcome back. Here's your overview.</p>
                    </div>
                    <ThemeToggle theme={theme} onToggle={toggleTheme} />
                </header>

                {/* Stat Cards */}
                <div className={styles.statsGrid}>
                    {statCards.map((card) => (
                        <StatCard key={card.id} data={card} />
                    ))}
                </div>

                {/* Chart + Activity */}
                <div className={styles.contentGrid}>
                    <MiniLineChart data={chartData} title="Revenue Trend" />
                    <ActivityList items={recentActivity} />
                </div>
            </div>
        </div>
    );
}

UltraMinimalDashboard.displayName = 'UltraMinimalDashboard';
