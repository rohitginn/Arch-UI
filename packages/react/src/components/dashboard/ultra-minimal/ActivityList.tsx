'use client';

/**
 * ActivityList – Ultra-Minimal
 * Clean list of recent activity items with avatar initials.
 */

import * as React from 'react';
import type { ActivityItem } from '../shared/types';
import styles from './ultra-minimal.module.css';

interface ActivityListProps {
    items: ActivityItem[];
    title?: string;
}

export function ActivityList({ items, title = 'Recent Activity' }: ActivityListProps) {
    return (
        <section className={styles.activityCard} aria-label={title}>
            <h3 className={styles.activityTitle}>{title}</h3>
            <ul className={styles.activityList}>
                {items.map((item) => (
                    <li key={item.id} className={styles.activityItem}>
                        <div className={styles.activityAvatar} aria-hidden="true">
                            {item.avatar}
                        </div>
                        <div className={styles.activityContent}>
                            <p className={styles.activityText}>
                                <strong>{item.user}</strong>{' '}
                                <span>{item.action}</span>{' '}
                                <strong>{item.target}</strong>
                            </p>
                            <p className={styles.activityTime}>{item.time}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
