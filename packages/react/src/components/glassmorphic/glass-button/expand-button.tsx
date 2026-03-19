'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { IconButton, type IconButtonProps } from './icon-button';

export interface ExpandButtonProps
  extends Omit<IconButtonProps, 'icon' | 'aria-label' | 'onClick'> {
  /** Whether the target is expanded */
  expanded: boolean;
  /** Toggle callback */
  onToggle: (expanded: boolean) => void;
  /** Accessible label */
  'aria-label'?: string;
}

/**
 * ExpandButton — A circular icon button that animates between plus ↔ minus.
 *
 * The icon rotates 180° on toggle for a smooth transition.
 * Used for show/hide toggles, accordions, and expandable sections.
 *
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false);
 * <ExpandButton expanded={open} onToggle={setOpen} />
 * ```
 */
const ExpandButton = React.forwardRef<HTMLButtonElement, ExpandButtonProps>(
  (
    {
      expanded,
      onToggle,
      'aria-label': ariaLabel,
      className,
      ...props
    },
    ref
  ) => {
    const label = ariaLabel ?? (expanded ? 'Collapse' : 'Expand');

    const icon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          'h-full w-full transition-transform duration-200',
          expanded ? 'rotate-180' : 'rotate-0'
        )}
        aria-hidden="true"
      >
        {/* Plus icon — horizontal bar always visible, vertical bar fades via rotation */}
        <line x1="12" y1="5" x2="12" y2="19" className={cn(
          'origin-center transition-all duration-200',
          expanded && 'scale-0 opacity-0'
        )} />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    );

    return (
      <IconButton
        ref={ref}
        icon={icon}
        aria-label={label}
        aria-expanded={expanded}
        onClick={() => onToggle(!expanded)}
        className={cn('rounded-full', className)}
        {...props}
      />
    );
  }
);

ExpandButton.displayName = 'ExpandButton';

export { ExpandButton };
