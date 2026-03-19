'use client';

import * as React from 'react';
import { cn } from '@archui/core';

/**
 * EffectContainer - Base primitive for safe overlay/content layering
 * 
 * Enforces the stacking-context isolation contract:
 * - Root: Creates new stacking context with `isolation: isolate`
 * - Effects: Decorative layers locked to z-0
 * - Content: User content locked to z-10
 * 
 * This prevents decorative overlays from ever painting over content,
 * eliminating the light-theme text invisibility bug.
 * 
 * @example
 * ```tsx
 * <EffectContainer
 *   effects={<ShimmerOverlay />}
 *   className="rounded-xl border"
 * >
 *   <ButtonContent />
 * </EffectContainer>
 * ```
 */
export interface EffectContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Decorative layers (overlays, effects) - rendered at z-0 */
    effects?: React.ReactNode;
    /** Content nodes - rendered at z-10 */
    children: React.ReactNode;
}

export const EffectContainer = React.forwardRef<HTMLDivElement, EffectContainerProps>(
    ({ effects, children, className, ...props }, ref) => {
        return (
            <div ref={ref} className={cn('relative isolate', className)} {...props}>
                {/* Decorative Layer: z-0 - always renders below content */}
                {effects && (
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        {effects}
                    </div>
                )}

                {/* Content Layer: z-10 - always renders above effects */}
                <div className="relative z-10">{children}</div>
            </div>
        );
    }
);

EffectContainer.displayName = 'EffectContainer';
