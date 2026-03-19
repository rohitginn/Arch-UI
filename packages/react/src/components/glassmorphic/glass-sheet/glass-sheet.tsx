'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@archui/core';
import { EffectContainer } from '../../../base/effect-container';

interface GlassSheetProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
}

const GlassSheet = ({ isOpen, onClose, children, className }: GlassSheetProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
                    />

                    <motion.div
                        initial={{ y: '100%', scaleY: 0.8, opacity: 0.5 }}
                        animate={{
                            y: 0,
                            scaleY: 1,
                            opacity: 1,
                            transition: {
                                type: 'spring',
                                stiffness: 280,
                                damping: 28,
                                mass: 1.1
                            }
                        }}
                        exit={{
                            y: '100%',
                            scaleY: 0.9,
                            opacity: 0,
                            transition: { duration: 0.3, ease: 'circIn' }
                        }}
                        className={cn(
                            'fixed bottom-0 left-0 right-0 z-50 h-[80vh] shadow-2xl origin-bottom',
                            className
                        )}
                    >
                        <EffectContainer
                            className="h-full border-t border-surface-border bg-surface-primary/65 backdrop-blur-3xl rounded-t-3xl"
                            effects={
                                <div className="absolute inset-0 overflow-hidden rounded-t-3xl pointer-events-none">
                                    {/* Grabber Handle */}
                                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full bg-text-primary/10" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent" />
                                </div>
                            }
                        >
                            <div className="flex flex-col h-full p-8 pt-10 overflow-y-auto">
                                {children}
                            </div>
                        </EffectContainer>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export { GlassSheet };
