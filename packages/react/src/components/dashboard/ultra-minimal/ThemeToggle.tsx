'use client';

/**
 * ThemeToggle – Ultra-Minimal
 * Simple sun/moon icon swap with 150ms crossfade.
 */

import * as React from 'react';
import type { Theme } from '../shared/types';
import styles from './ultra-minimal.module.css';

interface ThemeToggleProps {
    theme: Theme;
    onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
    return (
        <button
            className={styles.themeToggle}
            onClick={onToggle}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            type="button"
        >
            {theme === 'light' ? '☀️' : '🌙'}
        </button>
    );
}
