'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import {
    glassText,
} from '../glass-interactive-variants';

/* ─── Types ─────────────────────────────────────────────── */

export type StepStatus = 'completed' | 'active' | 'pending';

export interface StepItem {
    label: string;
    description?: string;
    icon?: React.ReactNode;
}

export interface GlassStepperProps {
    /** Step definitions */
    steps: StepItem[];
    /** Current active step (0-indexed) */
    activeStep?: number;
    /** Orientation */
    orientation?: 'horizontal' | 'vertical';
    /** Visual variant */
    variant?: 'default' | 'solid';
    /** Called when a step is clicked */
    onStepClick?: (index: number) => void;
    /** Additional CSS classes */
    className?: string;
}

/* ─── Icons ─────────────────────────────────────────────── */

const CheckIcon = () => (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

/**
 * GlassStepper — Multi-step progress flow with glass nodes
 */
const GlassStepper = React.forwardRef<HTMLDivElement, GlassStepperProps>(
    ({ steps, activeStep = 0, orientation = 'horizontal', variant: _variant = 'default', onStepClick, className }, ref) => {
        const isVertical = orientation === 'vertical';

        return (
            <div
                ref={ref}
                className={cn(
                    'flex',
                    isVertical ? 'flex-col' : 'flex-row items-start',
                    className,
                )}
            >
                {steps.map((step, index) => {
                    const status: StepStatus =
                        index < activeStep ? 'completed' : index === activeStep ? 'active' : 'pending';
                    const isLast = index === steps.length - 1;

                    return (
                        <React.Fragment key={index}>
                            <div
                                className={cn(
                                    'flex shrink-0',
                                    isVertical ? 'flex-row items-start gap-3' : 'flex-col items-center gap-2',
                                )}
                            >
                                <button
                                    type="button"
                                    className={cn(
                                        'relative flex items-center justify-center rounded-full',
                                        'h-9 w-9 shrink-0',
                                        'transition-all duration-300 ease-out',
                                        'outline-none',
                                        'focus-visible:ring-2 focus-visible:ring-[var(--glass-accent)]/30 focus-visible:ring-offset-2',
                                        status === 'completed' && [
                                            'bg-[var(--glass-success)] text-white',
                                            'shadow-[0_0_12px_var(--glass-success)]',
                                        ],
                                        status === 'active' && [
                                            'bg-[var(--glass-accent)] text-white',
                                            'shadow-[0_0_16px_var(--glass-accent)]',
                                            'animate-pulse',
                                        ],
                                        status === 'pending' && [
                                            'bg-[var(--glass-surface-hover)]',
                                            glassText.muted,
                                            'border border-[var(--glass-edge)]',
                                        ],
                                        onStepClick && status !== 'active' && 'cursor-pointer hover:scale-105',
                                    )}
                                    onClick={() => onStepClick?.(index)}
                                    disabled={!onStepClick}
                                >
                                    {status === 'completed' ? (
                                        <CheckIcon />
                                    ) : step.icon ? (
                                        step.icon
                                    ) : (
                                        <span className="text-xs font-semibold">{index + 1}</span>
                                    )}
                                </button>

                                <div className={cn(isVertical ? 'pt-1' : 'text-center max-w-[100px]')}>
                                    <p className={cn(
                                        'text-xs font-medium',
                                        status === 'pending' ? glassText.muted : glassText.secondary,
                                    )}>
                                        {step.label}
                                    </p>
                                    {step.description && (
                                        <p className={cn('mt-0.5 text-[11px] leading-tight', glassText.placeholder)}>
                                            {step.description}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {!isLast && (
                                <div
                                    className={cn(
                                        'relative overflow-hidden',
                                        isVertical
                                            ? 'ml-[17px] w-px h-8 my-1'
                                            : 'mt-[17px] h-px flex-1 min-w-[24px] mx-2',
                                        'bg-[var(--glass-divider)]',
                                        'rounded-full',
                                    )}
                                >
                                    <div
                                        className={cn(
                                            'absolute rounded-full',
                                            isVertical ? 'top-0 left-0 w-full' : 'left-0 top-0 h-full',
                                            'bg-[var(--glass-success)]/60',
                                            'transition-all duration-500 ease-out',
                                        )}
                                        style={
                                            isVertical
                                                ? { height: index < activeStep ? '100%' : index === activeStep ? '50%' : '0%' }
                                                : { width: index < activeStep ? '100%' : index === activeStep ? '50%' : '0%' }
                                        }
                                    />
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        );
    },
);

GlassStepper.displayName = 'GlassStepper';

export { GlassStepper };
