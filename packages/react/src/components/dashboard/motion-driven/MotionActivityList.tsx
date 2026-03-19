'use client';

/**
 * MotionActivityList – Motion-Driven
 * Staggered row entrance + hover translateX microinteraction.
 */

import * as React from 'react';
import { motion } from 'motion/react';
import type { ActivityItem } from '../shared/types';
import styles from './motion-driven.module.css';

interface MotionActivityListProps {
    items: ActivityItem[];
    title?: string;
}

const listVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.5,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: -12 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

export function MotionActivityList({
    items,
    title = 'Recent Activity',
}: MotionActivityListProps) {
    return (
        <motion.section
            className={styles.activityCard}
            aria-label={title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            <h3 className={styles.activityTitle}>{title}</h3>
            <motion.ul
                className={styles.activityList}
                variants={listVariants}
                initial="hidden"
                animate="visible"
            >
                {items.map((item) => (
                    <motion.li
                        key={item.id}
                        className={styles.activityItem}
                        variants={itemVariants}
                        whileHover={{
                            x: 4,
                            transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] },
                        }}
                    >
                        <motion.div
                            className={styles.activityAvatar}
                            aria-hidden="true"
                            whileHover={{ scale: 1.08 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            {item.avatar}
                        </motion.div>
                        <div className={styles.activityContent}>
                            <p className={styles.activityText}>
                                <strong>{item.user}</strong>{' '}
                                <span>{item.action}</span>{' '}
                                <strong>{item.target}</strong>
                            </p>
                            <p className={styles.activityTime}>{item.time}</p>
                        </div>
                    </motion.li>
                ))}
            </motion.ul>
        </motion.section>
    );
}
