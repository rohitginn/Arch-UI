'use client';

/**
 * MotionDrivenDashboard – Microinteraction-Focused
 *
 * Design philosophy:
 * - Motion guides attention, never distracts
 * - Short, intentional animations with ease-out / spring curves
 * - Card entrance animation on load
 * - Hover scale + elevation on stat cards
 * - Chart line draw animation on mount
 * - Button tap animation
 * - Theme toggle animated transition
 * - List row hover motion
 *
 * Requires: motion (Framer Motion) >= 11 as peer dependency.
 */

import * as React from 'react';
import { motion } from 'motion/react';
import '../shared/dashboard-tokens.css';
import styles from './motion-driven.module.css';

import { useTheme } from '../shared/use-theme';
import { statCards, chartData, recentActivity } from '../shared/mock-data';

import { MotionThemeToggle } from './MotionThemeToggle';
import { MotionStatCard } from './MotionStatCard';
import { MotionLineChart } from './MotionLineChart';
import { MotionActivityList } from './MotionActivityList';

export function MotionDrivenDashboard() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={styles.dashboard} data-theme={theme}>
            <div className={styles.container}>
                {/* Header */}
                <motion.header
                    className={styles.header}
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <div className={styles.headerLeft}>
                        <h1>Dashboard</h1>
                        <p>Welcome back. Here's your overview.</p>
                    </div>
                    <MotionThemeToggle theme={theme} onToggle={toggleTheme} />
                </motion.header>

                {/* Stat Cards */}
                <div className={styles.statsGrid}>
                    {statCards.map((card, i) => (
                        <MotionStatCard key={card.id} data={card} index={i} />
                    ))}
                </div>

                {/* Chart + Activity */}
                <div className={styles.contentGrid}>
                    <MotionLineChart data={chartData} title="Revenue Trend" />
                    <MotionActivityList items={recentActivity} />
                </div>
            </div>
        </div>
    );
}

MotionDrivenDashboard.displayName = 'MotionDrivenDashboard';
