/**
 * useTheme – Manages light/dark theme with localStorage persistence.
 * Applies theme class to document root and CSS variable switching.
 */

import { useState, useEffect, useCallback } from 'react';
import type { Theme } from './types';

const STORAGE_KEY = 'zenlab-dashboard-theme';

export function useTheme(initialTheme?: Theme) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return initialTheme ?? 'light';
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    return stored ?? initialTheme ?? 'light';
  });

  // Sync class on <html> and CSS variables
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const setTheme = useCallback((t: Theme) => setThemeState(t), []);

  return { theme, toggleTheme, setTheme } as const;
}
