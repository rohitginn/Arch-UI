'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { IconButton, type IconButtonProps } from './icon-button';

export interface CopyButtonProps
  extends Omit<IconButtonProps, 'icon' | 'aria-label' | 'onClick'> {
  /** The text value to copy to clipboard */
  value: string;
  /** Duration in ms to show the copied state (default: 2000) */
  copiedDuration?: number;
  /** Accessible label */
  'aria-label'?: string;
  /** Callback after successful copy */
  onCopied?: () => void;
}

/**
 * CopyButton — Pre-wired clipboard button.
 *
 * Shows clipboard icon → checkmark on success → reverts after `copiedDuration`.
 * Uses `navigator.clipboard.writeText()` API.
 *
 * @example
 * ```tsx
 * <CopyButton value="npm install @archui/react" />
 * <CopyButton value={code} variant="ghost" size="sm" />
 * ```
 */
const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    {
      value,
      copiedDuration = 2000,
      'aria-label': ariaLabel = 'Copy to clipboard',
      onCopied,
      className,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = React.useState(false);
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

    React.useEffect(() => {
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, []);

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        onCopied?.();
        timeoutRef.current = setTimeout(() => {
          setCopied(false);
        }, copiedDuration);
      } catch {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = value;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopied(true);
        onCopied?.();
        timeoutRef.current = setTimeout(() => {
          setCopied(false);
        }, copiedDuration);
      }
    };

    const clipboardIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-full w-full"
        aria-hidden="true"
      >
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      </svg>
    );

    const checkIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-full w-full text-emerald-500 dark:text-emerald-400"
        aria-hidden="true"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    );

    return (
      <IconButton
        ref={ref}
        icon={
          <span className="relative">
            <span
              className={cn(
                'absolute inset-0 transition-all duration-200',
                copied ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
              )}
            >
              {checkIcon}
            </span>
            <span
              className={cn(
                'transition-all duration-200',
                copied ? 'scale-75 opacity-0' : 'scale-100 opacity-100'
              )}
            >
              {clipboardIcon}
            </span>
          </span>
        }
        aria-label={copied ? 'Copied!' : ariaLabel}
        onClick={handleCopy}
        className={className}
        {...props}
      />
    );
  }
);

CopyButton.displayName = 'CopyButton';

export { CopyButton };
