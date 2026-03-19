'use client';

/**
 * MotionStatCard – Motion-Driven
 * Card entrance animation on load.
 * Hover scale + subtle elevation shift.
 */

import * as React from 'react';
import { motion } from 'motion/react';
import type { StatCardData } from '../shared/types';
import styles from './motion-driven.module.css';

interface MotionStatCardProps {
    data: StatCardData;
    /** Index for staggered entrance */
    index?: number;
}

export function MotionStatCard({ data, index = 0 }: MotionStatCardProps) {
    const trendClass =
        data.trend === 'up'
            ? styles.trendUp
            : data.trend === 'down'
                ? styles.trendDown
                : styles.trendNeutral;

    const trendArrow =
        data.trend === 'up' ? '↑' : data.trend === 'down' ? '↓' : '→';

    return (
        <motion.article
            className={styles.statCard}
            aria-label={`${data.label}: ${data.value}`}
            // Entrance animation
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.4,
                delay: index * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            // Hover microinteraction
            whileHover={{
                scale: 1.02,
                boxShadow: 'var(--dash-shadow-lg)',
                transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
            }}
            whileTap={{ scale: 0.98 }}
        >
            <span className={styles.statCardIcon} aria-hidden="true">
                {data.icon}
            </span>
            <p className={styles.statCardLabel}>{data.label}</p>
            <p className={styles.statCardValue}>{data.value}</p>
            <span className={`${styles.statCardChange} ${trendClass}`}>
                {trendArrow} {data.change}
            </span>
        </motion.article>
    );
}
