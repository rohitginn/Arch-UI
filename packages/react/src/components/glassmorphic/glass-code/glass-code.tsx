'use client';

import * as React from 'react';
import { cn } from '@archui/core';

export interface GlassCodeProps extends React.HTMLAttributes<HTMLElement> {
    /** Code content */
    code: string;
    /** Language label (display only) */
    language?: string;
    /** Inline vs block rendering */
    variant?: 'inline' | 'block';
    /** Show copy button (block only) */
    copyable?: boolean;
    /** Show line numbers (block only) */
    lineNumbers?: boolean;
}

/**
 * GlassCode — Inline and block code renderer with a glass inset surface.
 *
 * Block variant includes a copy-to-clipboard button and optional language label.
 *
 * @example
 * ```tsx
 * <GlassCode code="npm install @archui/react" variant="block" language="bash" />
 * <GlassCode code="useState()" variant="inline" />
 * ```
 */
export function GlassCode({
    code,
    language,
    variant = 'inline',
    copyable = true,
    lineNumbers = false,
    className,
    ...props
}: GlassCodeProps) {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // ── Inline variant ──
    if (variant === 'inline') {
        return (
            <code
                className={cn(
                    'inline-flex items-center rounded px-1.5 py-0.5 font-mono text-[0.875em]',
                    // Light
                    'bg-[var(--surface-bg-subtle,#f8fafc)]',
                    'text-[var(--glass-text,#0f172a)]',
                    'border border-[var(--surface-border,#e2e8f0)]',
                    // Dark
                    'dark:bg-[var(--surface-bg-hover,rgba(255,255,255,0.08))]',
                    'dark:text-[var(--glass-text,#f8fafc)]',
                    'dark:border-[var(--surface-border,rgba(255,255,255,0.1))]',
                    className,
                )}
                {...props}
            >
                {code}
            </code>
        );
    }

    // ── Block variant ──
    const lines = code.split('\n');

    return (
        <div
            className={cn(
                'group relative overflow-hidden rounded-xl',
                // Light
                'bg-[var(--surface-bg-subtle,#f8fafc)]',
                'border border-[var(--surface-border,#e2e8f0)]',
                // Dark
                'dark:bg-[var(--glass-bg-dark,rgba(255,255,255,0.05))]',
                'dark:border-[var(--surface-border,rgba(255,255,255,0.1))]',
                'dark:backdrop-blur-xl',
                className,
            )}
            {...props}
        >
            {/* Header bar */}
            {(language || copyable) && (
                <div
                    className={cn(
                        'flex items-center justify-between px-4 py-2',
                        'border-b border-[var(--surface-border,#e2e8f0)]',
                        'dark:border-[var(--surface-border,rgba(255,255,255,0.1))]',
                    )}
                >
                    {language && (
                        <span className="text-xs font-medium text-[var(--glass-text-muted,#94a3b8)] uppercase tracking-wide">
                            {language}
                        </span>
                    )}
                    <div className="flex-1" />
                    {copyable && (
                        <button
                            onClick={handleCopy}
                            className={cn(
                                'flex items-center gap-1 rounded-md px-2 py-1 text-xs',
                                'text-[var(--glass-text-muted,#94a3b8)]',
                                'hover:text-[var(--glass-text,#0f172a)]',
                                'dark:hover:text-[var(--glass-text,#f8fafc)]',
                                'hover:bg-[var(--surface-bg-hover,#f1f5f9)]',
                                'dark:hover:bg-[var(--glass-bg-dark-hover,rgba(255,255,255,0.08))]',
                                'transition-colors duration-[var(--duration-fast,120ms)]',
                            )}
                            aria-label="Copy code"
                            type="button"
                        >
                            {copied ? (
                                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                                </svg>
                            )}
                            {copied ? 'Copied' : 'Copy'}
                        </button>
                    )}
                </div>
            )}
            {/* Code body */}
            <pre className="overflow-x-auto p-4">
                <code className="font-mono text-sm leading-6 text-[var(--glass-text,#0f172a)] dark:text-[var(--glass-text,#f8fafc)]">
                    {lineNumbers ? (
                        <table className="border-collapse">
                            <tbody>
                                {lines.map((line, i) => (
                                    <tr key={i}>
                                        <td className="pr-4 text-right text-[var(--glass-text-muted,#94a3b8)] select-none w-8 align-top">
                                            {i + 1}
                                        </td>
                                        <td className="whitespace-pre">{line}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        code
                    )}
                </code>
            </pre>
        </div>
    );
}
