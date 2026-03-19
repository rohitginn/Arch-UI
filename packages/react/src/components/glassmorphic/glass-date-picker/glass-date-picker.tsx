'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@archui/core';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { EffectContainer } from '../../../base/effect-container';

interface GlassDatePickerProps {
    value?: Date;
    onChange: (date: Date) => void;
    className?: string;
    placeholder?: string;
}

const GlassDatePicker = ({ value, onChange, className, placeholder = 'Pick a date' }: GlassDatePickerProps) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [viewDate, setViewDate] = React.useState(value || new Date());

    const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const paddingDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const isToday = (day: number) => {
        const today = new Date();
        return today.getDate() === day && today.getMonth() === viewDate.getMonth() && today.getFullYear() === viewDate.getFullYear();
    };

    const isSelected = (day: number) => {
        return value && value.getDate() === day && value.getMonth() === viewDate.getMonth() && value.getFullYear() === viewDate.getFullYear();
    };

    return (
        <div ref={containerRef} className={cn('relative w-full', className)}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    'flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all cursor-pointer',
                    'bg-surface-primary/10 border border-surface-border/50 hover:bg-surface-primary/20',
                    isOpen && 'ring-2 ring-blue-500/20 border-blue-500/50'
                )}
            >
                <CalendarIcon className="w-4 h-4 text-text-primary/40" />
                <span className={cn('text-sm', !value && 'text-text-primary/40')}>
                    {value ? value.toLocaleDateString() : placeholder}
                </span>
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
                        className="absolute z-50 w-72 origin-top-left"
                    >
                        <EffectContainer
                            className="border border-surface-border bg-surface-primary/80 backdrop-blur-2xl rounded-2xl shadow-2xl p-4"
                            effects={<div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <button
                                    onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1))}
                                    className="p-1 hover:bg-white/10 rounded-md transition-colors"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <span className="text-sm font-semibold">
                                    {months[viewDate.getMonth()]} {viewDate.getFullYear()}
                                </span>
                                <button
                                    onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1))}
                                    className="p-1 hover:bg-white/10 rounded-md transition-colors"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="grid grid-cols-7 gap-1 text-center mb-1">
                                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                                    <span key={d} className="text-[10px] font-bold text-text-primary/30 uppercase tracking-widest">{d}</span>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 gap-1">
                                {paddingDays.map(d => <div key={`p-${d}`} />)}
                                {days.map(day => (
                                    <button
                                        key={day}
                                        onClick={() => {
                                            onChange(new Date(viewDate.getFullYear(), viewDate.getMonth(), day));
                                            setIsOpen(false);
                                        }}
                                        className={cn(
                                            'w-8 h-8 flex items-center justify-center rounded-lg text-xs transition-all',
                                            'hover:bg-blue-500/20 hover:text-blue-500',
                                            isSelected(day) ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' :
                                                isToday(day) ? 'bg-text-primary/10 font-bold' : 'text-text-primary/80'
                                        )}
                                    >
                                        {day}
                                    </button>
                                ))}
                            </div>
                        </EffectContainer>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export { GlassDatePicker };
