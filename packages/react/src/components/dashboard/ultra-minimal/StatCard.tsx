'use client';

/**
 * StatCard – Ultra-Minimal
 * Clean, typography-driven stat card with subtle hover state.
 */

import * as React from 'react';
import type { StatCardData } from '../shared/types';
import styles from './ultra-minimal.module.css';

interface StatCardProps {
    data: StatCardData;
}

export function StatCard({ data }: StatCardProps) {
    const trendClass =
        data.trend === 'up'
            ? styles.trendUp
            : data.trend === 'down'
                ? styles.trendDown
                : styles.trendNeutral;

    const trendArrow =
        data.trend === 'up' ? '↑' : data.trend === 'down' ? '↓' : '→';

    return (
        <article className={styles.statCard} aria-label={`${data.label}: ${data.value}`}>
            <span className={styles.statCardIcon} aria-hidden="true">
                {data.icon}
            </span>
            <p className={styles.statCardLabel}>{data.label}</p>
            <p className={styles.statCardValue}>{data.value}</p>
            <span className={`${styles.statCardChange} ${trendClass}`}>
                {trendArrow} {data.change}
            </span>
        </article>
    );
}
