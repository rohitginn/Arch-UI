'use client';

import * as React from 'react';
import { cn } from '@archui/core';

/**
 * Supported accent themes — single-hue palettes following the Anti-Gradient Manifesto
 */
export type AccentTheme = 'ember' | 'graphite' | 'slate' | 'sage' | 'crimson' | 'dusk' | 'iron';
export type ThemeMode = 'light' | 'dark' | 'system';

export interface GlassRootContextValue {
    mode: 'light' | 'dark';
    accent: AccentTheme;
    setMode: (mode: ThemeMode) => void;
    setAccent: (accent: AccentTheme) => void;
}

const GlassRootContext = React.createContext<GlassRootContextValue | null>(null);

/**
 * Hook to access the GlassRoot theme context
 * @throws If used outside <GlassRoot>
 */
export function useGlassRoot(): GlassRootContextValue {
    const ctx = React.useContext(GlassRootContext);
    if (!ctx) throw new Error('useGlassRoot must be used within <GlassRoot>');
    return ctx;
}

export interface GlassRootProps {
    children: React.ReactNode;
    /** Initial theme mode. Defaults to 'system'. */
    defaultMode?: ThemeMode;
    /** Initial accent theme. Defaults to 'ember'. */
    defaultAccent?: AccentTheme;
    /** Additional CSS classes on the wrapper */
    className?: string;
}

/**
 * GlassRoot — Universal theme provider for ArchUI.
 *
 * Wraps the entire app and injects the accent color CSS tokens
 * into the document root. Manages system vs forced dark/light mode.
 *
 * @example
 * ```tsx
 * <GlassRoot defaultMode="system" defaultAccent="ember">
 *   <App />
 * </GlassRoot>
 * ```
 */
export function GlassRoot({
    children,
    defaultMode = 'system',
    defaultAccent = 'ember',
    className,
}: GlassRootProps) {
    const [accent, setAccent] = React.useState<AccentTheme>(defaultAccent);
    const [resolvedMode, setResolvedMode] = React.useState<'light' | 'dark'>('light');
    const [requestedMode, setRequestedMode] = React.useState<ThemeMode>(defaultMode);

    // Resolve system theme
    React.useEffect(() => {
        if (requestedMode !== 'system') {
            setResolvedMode(requestedMode);
            return;
        }
        if (typeof window === 'undefined') return;
        const mql = window.matchMedia('(prefers-color-scheme: dark)');
        setResolvedMode(mql.matches ? 'dark' : 'light');
        const handler = (e: MediaQueryListEvent) => setResolvedMode(e.matches ? 'dark' : 'light');
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, [requestedMode]);

    // Apply to <html> element
    React.useEffect(() => {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(resolvedMode);
        root.setAttribute('data-accent', accent);
    }, [resolvedMode, accent]);

    const ctx: GlassRootContextValue = React.useMemo(
        () => ({
            mode: resolvedMode,
            accent,
            setMode: setRequestedMode,
            setAccent,
        }),
        [resolvedMode, accent]
    );

    return (
        <GlassRootContext.Provider value={ctx}>
            <div
                className={cn('glass-root', className)}
                data-theme={resolvedMode}
                data-accent={accent}
            >
                {children}
            </div>
        </GlassRootContext.Provider>
    );
}
