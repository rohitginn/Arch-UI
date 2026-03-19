'use client';

import * as React from 'react';
import { cn } from '@archui/core';

export interface GlassFileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
    accept?: string;
    multiple?: boolean;
    disabled?: boolean;
    onFilesSelected?: (files: FileList | null) => void;
}

export const GlassFileUpload = React.forwardRef<HTMLInputElement, GlassFileUploadProps>(
    ({ className, accept, multiple, disabled, onFilesSelected, ...props }, ref) => {
        const [isDragging, setIsDragging] = React.useState(false);
        const inputRef = React.useRef<HTMLInputElement>(null);

        // Forward ref to input
        React.useImperativeHandle(ref, () => inputRef.current!);

        const handleDragEnter = (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            if (!disabled) setIsDragging(true);
        };

        const handleDragLeave = (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);
        };

        const handleDrop = (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);
            if (!disabled && e.dataTransfer.files) {
                onFilesSelected?.(e.dataTransfer.files);
            }
        };

        const handleClick = () => {
            if (!disabled) {
                inputRef.current?.click();
            }
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!disabled) {
                onFilesSelected?.(e.target.files);
            }
        };

        return (
            <div
                className={cn(
                    'relative flex flex-col items-center justify-center w-full min-h-[160px] rounded-xl border-2 border-dashed',
                    'transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer',
                    'backdrop-blur-sm',
                    isDragging
                        ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-500/10 scale-[1.01] shadow-lg'
                        : 'border-black/[0.08] bg-white/40 dark:border-white/10 dark:bg-white/[0.02] hover:border-black/[0.15] dark:hover:border-white/20 hover:bg-white/60 dark:hover:bg-white/[0.04] hover:-translate-y-1 hover:shadow-md',
                    disabled && 'opacity-50 cursor-not-allowed hover:translate-y-0 hover:shadow-none',
                    className
                )}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
                {...props}
            >
                <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    accept={accept}
                    multiple={multiple}
                    disabled={disabled}
                    onChange={handleChange}
                />

                <div className="flex flex-col items-center gap-2 text-center pointer-events-none">
                    <div
                        className={cn(
                            'p-3 rounded-full',
                            'bg-black/[0.03] dark:bg-white/[0.06]'
                        )}
                    >
                        <svg
                            className="w-6 h-6 text-slate-500 dark:text-white/60"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                        </svg>
                    </div>
                    <div className="text-sm font-medium text-slate-700 dark:text-white/90">
                        <span className="text-blue-500">Click to upload</span> or drag and drop
                    </div>
                    <p className="text-xs text-slate-500 dark:text-white/50">
                        SVG, PNG, JPG or GIF (max. 800x400px)
                    </p>
                </div>
            </div>
        );
    }
);

GlassFileUpload.displayName = 'GlassFileUpload';
