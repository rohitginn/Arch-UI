'use client';

import * as React from 'react';
import { cn } from '@archui/core';

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Orientation of the button group */
  orientation?: 'horizontal' | 'vertical';
  /** Attached mode — buttons share borders with no gap */
  attached?: boolean;
}

/**
 * ButtonGroup — A grouped row (or column) of buttons treated as a compound control.
 *
 * When `attached` is true, child buttons share borders:
 * first gets rounded start, middle gets no rounding, last gets rounded end.
 *
 * Uses CSS `:first-child` / `:last-child` selectors to override child border-radius.
 *
 * @example
 * ```tsx
 * <ButtonGroup attached>
 *   <GlassButton variant="outline">Left</GlassButton>
 *   <GlassButton variant="outline">Center</GlassButton>
 *   <GlassButton variant="outline">Right</GlassButton>
 * </ButtonGroup>
 *
 * <ButtonGroup orientation="vertical" attached>
 *   <GlassButton variant="ghost">Option 1</GlassButton>
 *   <GlassButton variant="ghost">Option 2</GlassButton>
 * </ButtonGroup>
 * ```
 */
const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ orientation = 'horizontal', attached = true, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          'inline-flex',
          orientation === 'vertical' ? 'flex-col' : 'flex-row',
          attached && orientation === 'horizontal' && [
            // Horizontal attached: shared borders, override child radius
            '[&>*]:rounded-none',
            '[&>*:first-child]:rounded-l-xl',
            '[&>*:last-child]:rounded-r-xl',
            // Collapse duplicate borders between siblings
            '[&>*:not(:first-child)]:-ml-px',
            // Hover z-index so active border shows on top
            '[&>*:hover]:z-10',
            '[&>*:focus-visible]:z-20',
          ],
          attached && orientation === 'vertical' && [
            '[&>*]:rounded-none',
            '[&>*:first-child]:rounded-t-xl',
            '[&>*:last-child]:rounded-b-xl',
            '[&>*:not(:first-child)]:-mt-px',
            '[&>*:hover]:z-10',
            '[&>*:focus-visible]:z-20',
          ],
          !attached && (orientation === 'horizontal' ? 'gap-2' : 'gap-2'),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';

export { ButtonGroup };
