'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@archui/core';
import { Search, ChevronDown, Check } from 'lucide-react';
import { EffectContainer } from '../../../base/effect-container';

interface ComboboxOption {
    label: string;
    value: string;
}

interface GlassComboboxProps {
    options: ComboboxOption[];
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

const GlassCombobox = ({ options, value, onChange, placeholder = 'Select...', className }: GlassComboboxProps) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const containerRef = React.useRef<HTMLDivElement>(null);

    const filteredOptions = options.filter(opt =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedOption = options.find(opt => opt.value === value);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={containerRef} className={cn('relative w-full', className)}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    'flex items-center justify-between px-4 py-2.5 rounded-xl transition-all cursor-pointer',
                    'bg-surface-primary/10 border border-surface-border/50 hover:bg-surface-primary/20',
                    isOpen && 'ring-2 ring-blue-500/20 border-blue-500/50'
                )}
            >
                <span className={cn('text-sm', !selectedOption && 'text-text-primary/40')}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')} />
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.95 }}
                        animate={{
                            opacity: 1,
                            y: 8,
                            scale: 1,
                            transition: { type: 'spring', stiffness: 400, damping: 30 }
                        }}
                        exit={{ opacity: 0, y: 5, scale: 0.98 }}
                        className="absolute z-50 w-full overflow-hidden"
                    >
                        <EffectContainer
                            className="border border-surface-border bg-surface-primary/80 backdrop-blur-2xl rounded-2xl shadow-2xl p-2"
                            effects={<div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />}
                        >
                            <div className="flex items-center px-3 py-2 mb-2 rounded-lg bg-text-primary/5">
                                <Search className="w-4 h-4 mr-2 text-text-primary/40" />
                                <input
                                    autoFocus
                                    className="bg-transparent border-none outline-none text-sm w-full placeholder:text-text-primary/30"
                                    placeholder="Filter..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>

                            <div className="max-h-60 overflow-y-auto space-y-1">
                                {filteredOptions.length > 0 ? (
                                    filteredOptions.map((opt) => (
                                        <div
                                            key={opt.value}
                                            onClick={() => {
                                                onChange(opt.value);
                                                setIsOpen(false);
                                                setSearchTerm('');
                                            }}
                                            className={cn(
                                                'flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer',
                                                'hover:bg-blue-500/10 hover:text-blue-500',
                                                value === opt.value ? 'bg-blue-500/20 text-blue-500' : 'text-text-primary/80'
                                            )}
                                        >
                                            {opt.label}
                                            {value === opt.value && <Check className="w-4 h-4" />}
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-3 py-8 text-center text-xs text-text-primary/40 italic">
                                        No results found
                                    </div>
                                )}
                            </div>
                        </EffectContainer>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export { GlassCombobox };
