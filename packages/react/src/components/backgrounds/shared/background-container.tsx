import * as React from 'react';
import { cn } from '@archui/core';
import { BackgroundBaseProps } from '@archui/core';

export interface BackgroundContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    cssVars?: React.CSSProperties;
    overlay?: BackgroundBaseProps['overlay'];
    isReducedMotion?: boolean;
}

/**
 * Base container for all background components.
 * Renders as a relative container by default so it has natural height.
 * When placed inside a positioned parent, it fills that parent.
 */
export const BackgroundContainer = React.forwardRef<HTMLDivElement, BackgroundContainerProps>((props, ref) => {
    const {
        className,
        cssVars,
        overlay,
        isReducedMotion,
        children,
        'aria-hidden': ariaHidden = true,
        style,
        ...rest
    } = props;

    return (
        <div
            ref={ref}
            className={cn(
                'relative w-full h-full overflow-hidden',
                className
            )}
            style={{
                ...cssVars,
                ...style,
            }}
            aria-hidden={ariaHidden}
            {...rest}
        >
            {/* Background Graphic Content */}
            <div className="absolute inset-0 w-full h-full">
                {children}
            </div>

            {/* Accessible Contrast Overlay */}
            {overlay && (
                <div
                    className="absolute inset-0 w-full h-full z-10"
                    style={{
                        backgroundColor: overlay.color,
                        opacity: overlay.opacity,
                    }}
                    aria-hidden="true"
                />
            )}
        </div>
    );
});

BackgroundContainer.displayName = 'BackgroundContainer';
