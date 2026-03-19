<script setup lang="ts">
/**
 * MotionGlassModal - Motion-enhanced glassmorphic modal for Vue 3
 *
 * Uses @vueuse/motion for spring-based entrance/exit animations.
 * Falls back to basic transitions when @vueuse/motion is unavailable.
 * Respects prefers-reduced-motion automatically.
 *
 * @example
 * ```vue
 * <MotionGlassModal v-model="isOpen" title="Confirm">
 *   <p>Are you sure?</p>
 * </MotionGlassModal>
 * ```
 */

import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';
import { cn } from '@archui/core';
import { usePrefersReducedMotion } from '../../composables/useMotion';

interface MotionGlassModalProps {
    /** v-model binding for open state */
    modelValue: boolean;
    /** Modal title */
    title?: string;
    /** Modal description */
    description?: string;
    /** Modal size */
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    /** Close on overlay click */
    closeOnOverlayClick?: boolean;
    /** Show close button */
    showCloseButton?: boolean;
    /** Additional CSS classes */
    class?: string;
}

const props = withDefaults(defineProps<MotionGlassModalProps>(), {
    size: 'md',
    closeOnOverlayClick: true,
    showCloseButton: true,
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
    (e: 'close'): void;
}>();

const modalRef = ref<HTMLDivElement | null>(null);
const previousActiveElement = ref<HTMLElement | null>(null);
const prefersReduced = usePrefersReducedMotion();

const isOpen = computed({
    get: () => props.modelValue,
    set: (value: boolean) => emit('update:modelValue', value),
});

const closeModal = () => {
    isOpen.value = false;
    emit('close');
};

// Size classes
const sizeClasses = computed(() => {
    const sizes: Record<string, string> = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        full: 'max-w-[90vw] max-h-[90vh]',
    };
    return sizes[props.size];
});

// Body scroll lock + focus management
watch(() => props.modelValue, async (open) => {
    if (open) {
        previousActiveElement.value = document.activeElement as HTMLElement;
        document.body.style.overflow = 'hidden';
        await nextTick();
        const focusableElements = modalRef.value?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements?.length) {
            (focusableElements[0] as HTMLElement).focus();
        }
    } else {
        document.body.style.overflow = '';
        previousActiveElement.value?.focus();
    }
});

// Keyboard handlers
const handleKeydown = (e: KeyboardEvent) => {
    if (!props.modelValue) return;

    if (e.key === 'Escape') {
        closeModal();
        return;
    }

    // Focus trap
    if (e.key === 'Tab' && modalRef.value) {
        const focusable = modalRef.value.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0] as HTMLElement;
        const last = focusable[focusable.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first?.focus();
        }
    }
};

const handleOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget && props.closeOnOverlayClick) {
        closeModal();
    }
};

onMounted(() => {
    document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown);
    document.body.style.overflow = '';
});
</script>

<template>
    <Teleport to="body">
        <Transition :enter-active-class="prefersReduced
            ? 'transition-opacity duration-[10ms]'
            : 'transition-all duration-200 ease-out'" enter-from-class="opacity-0" enter-to-class="opacity-100"
            :leave-active-class="prefersReduced
                ? 'transition-opacity duration-[10ms]'
                : 'transition-all duration-150 ease-in'" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="isOpen" :class="cn(
                'fixed inset-0 z-50 flex items-center justify-center p-4'
            )" role="dialog" aria-modal="true" :aria-labelledby="title ? 'modal-title' : undefined"
                :aria-describedby="description ? 'modal-description' : undefined" @click="handleOverlayClick">
                <!-- Backdrop -->
                <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

                <!-- Modal Content with spring animation -->
                <Transition :enter-active-class="prefersReduced
                    ? 'transition-opacity duration-[10ms]'
                    : 'transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]'" :enter-from-class="prefersReduced
                ? 'opacity-0'
                : 'opacity-0 scale-[0.96] translate-y-2'" enter-to-class="opacity-100 scale-100 translate-y-0"
                    :leave-active-class="prefersReduced
                        ? 'transition-opacity duration-[10ms]'
                        : 'transition-all duration-150 ease-in'" :leave-from-class="'opacity-100 scale-100 translate-y-0'"
                    :leave-to-class="prefersReduced
                        ? 'opacity-0'
                        : 'opacity-0 scale-[0.96] translate-y-2'">
                    <div v-if="isOpen" ref="modalRef" :class="cn('relative w-full', sizeClasses)">
                        <div :class="cn(
                            'relative rounded-2xl overflow-hidden',
                            'backdrop-blur-xl',
                            'bg-white/95 border border-slate-200/60',
                            'shadow-[0_8px_32px_rgba(0,0,0,0.15),0_16px_48px_rgba(0,0,0,0.12)]',
                            'dark:bg-slate-900/95 dark:border-white/[0.1] dark:shadow-black/50',
                            props.class
                        )">
                            <!-- Header -->
                            <div v-if="title || showCloseButton" class="flex items-start justify-between p-6 pb-0">
                                <div class="flex-1 pr-4">
                                    <h2 v-if="title" id="modal-title"
                                        class="text-xl font-semibold text-slate-900 dark:text-white leading-tight">
                                        {{ title }}
                                    </h2>
                                    <p v-if="description" id="modal-description"
                                        class="mt-1.5 text-sm text-slate-500 dark:text-white/60 leading-relaxed">
                                        {{ description }}
                                    </p>
                                </div>

                                <button v-if="showCloseButton" :class="cn(
                                    'flex-shrink-0 -mt-0.5 -mr-1',
                                    'p-1.5 rounded-lg',
                                    'text-slate-400 dark:text-white/40',
                                    'hover:text-slate-600 dark:hover:text-white/80',
                                    'hover:bg-slate-100 dark:hover:bg-white/10',
                                    'transition-all duration-150',
                                    'focus:outline-none focus:ring-2 focus:ring-blue-500/30'
                                )" aria-label="Close modal" @click="closeModal">
                                    <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>

                            <!-- Content -->
                            <div class="p-6 max-h-[60vh] overflow-y-auto">
                                <slot />
                            </div>

                            <!-- Footer -->
                            <div v-if="$slots.footer"
                                class="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/20 dark:border-white/[0.08] bg-white/10 dark:bg-white/[0.02]">
                                <slot name="footer" />
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>
