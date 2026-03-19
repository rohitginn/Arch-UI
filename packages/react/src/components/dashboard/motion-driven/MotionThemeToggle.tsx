'use client';

/**
 * MotionThemeToggle – Motion-Driven
 * Animated sun/moon icon swap with spring physics.
 */

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Theme } from '../shared/types';
import styles from './motion-driven.module.css';

interface MotionThemeToggleProps {
    theme: Theme;
    onToggle: () => void;
}

export function MotionThemeToggle({ theme, onToggle }: MotionThemeToggleProps) {
    return (
        <motion.button
            className={styles.themeToggle}
            onClick={onToggle}
            whileTap={{ scale: 0.88 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            type="button"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={theme}
                    className={styles.themeToggleIcon}
                    initial={{ y: -20, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 20, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                >
                    {theme === 'light' ? '☀️' : '🌙'}
                </motion.span>
            </AnimatePresence>
        </motion.button>
    );
}
