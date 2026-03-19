'use client';

/**
 * MotionProvider — Global animation context.
 *
 * Allows apps to reduce or disable animations globally,
 * honouring `prefers-reduced-motion` automatically.
 */

import * as React from 'react';
import { usePrefersReducedMotion } from '../../../utils/motion';

export type MotionLevel = 'full' | 'reduced' | 'none';

export interface MotionContextValue {
    motionLevel: MotionLevel;
    /** Whether spring/physics animations should run */
    isAnimationEnabled: boolean;
    /** Scale a base duration (ms) according to the motion level */
    getTransitionDuration: (baseDuration: number) => number;
}

const MotionContext = React.createContext<MotionContextValue>({
    motionLevel: 'full',
    isAnimationEnabled: true,
    getTransitionDuration: (d) => d,
});

/** Hook to consume motion settings in any component */
export function useMotion(): MotionContextValue {
    return React.useContext(MotionContext);
}

export interface MotionProviderProps {
    children: React.ReactNode;
    /** Force a specific motion level, overriding system preferences */
    forceLevel?: MotionLevel;
}

/**
 * MotionProvider — Wrap your app to provide reduced-motion awareness.
 *
 * When `prefers-reduced-motion: reduce` is active, animation durations
 * are clamped to 100ms. When `forceLevel="none"`, all durations become 0.
 *
 * @example
 * ```tsx
 * <MotionProvider>
 *   <GlassRoot>
 *     <App />
 *   </GlassRoot>
 * </MotionProvider>
 * ```
 */
export function MotionProvider({ children, forceLevel }: MotionProviderProps) {
    const systemPrefersReduced = usePrefersReducedMotion();

    const motionLevel: MotionLevel =
        forceLevel ?? (systemPrefersReduced ? 'reduced' : 'full');

    const ctx: MotionContextValue = React.useMemo(
        () => ({
            motionLevel,
            isAnimationEnabled: motionLevel === 'full',
            getTransitionDuration: (baseDuration: number) => {
                if (motionLevel === 'none') return 0;
                if (motionLevel === 'reduced') return Math.min(baseDuration, 100);
                return baseDuration;
            },
        }),
        [motionLevel]
    );

    return <MotionContext.Provider value={ctx}>{children}</MotionContext.Provider>;
}
