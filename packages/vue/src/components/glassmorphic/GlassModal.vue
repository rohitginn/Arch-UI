<script setup lang="ts">
/**
 * GlassModal - Premium glassmorphic modal component for Vue 3
 * 
 * Features:
 * - Frosted glass backdrop blur effect
 * - Multiple sizes (sm, md, lg, xl, full)
 * - Smooth animations (fade, scale, slide)
 * - Focus trap
 * - Escape key to close
 * - Body scroll lock
 * - Return focus on close
 * - Full accessibility support
 * 
 * @example
 * <GlassModal
 *   v-model="isOpen"
 *   title="Welcome"
 *   description="This is a glassmorphic modal"
 * >
 *   <p>Modal content goes here</p>
 * </GlassModal>
 */

import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';
import { cn } from '@archui/core';

// Props interface
interface GlassModalProps {
  /** Modal open state (v-model) */
  modelValue: boolean;
  /** Modal title */
  title?: string;
  /** Modal description */
  description?: string;
  /** Modal size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Close modal when clicking overlay */
  closeOnOverlayClick?: boolean;
  /** Show close button */
  showCloseButton?: boolean;
  /** Animation variant */
  animation?: 'fade' | 'scale' | 'slide';
  /** Additional CSS classes for modal content */
  class?: string;
}

const props = withDefaults(defineProps<GlassModalProps>(), {
  size: 'md',
  closeOnOverlayClick: true,
  showCloseButton: true,
  animation: 'scale',
});

// Emits
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'close'): void;
}>();

// Refs
const modalRef = ref<HTMLDivElement | null>(null);
const previousActiveElement = ref<HTMLElement | null>(null);
const isAnimating = ref(false);

// Computed open state
const isOpen = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
});

// Close modal
const closeModal = () => {
  isOpen.value = false;
  emit('close');
};

// Size classes
const sizeClasses = computed(() => {
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-[90vw] max-h-[90vh]',
  };
  return sizes[props.size];
});

// Animation classes
const overlayAnimationClass = computed(() => {
  return isOpen.value ? 'opacity-100' : 'opacity-0';
});

const contentAnimationClass = computed(() => {
  const animations = {
    fade: isOpen.value ? 'opacity-100' : 'opacity-0',
    scale: isOpen.value ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
    slide: isOpen.value ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8',
  };
  return animations[props.animation];
});

// Handle body scroll lock
watch(isOpen, (open) => {
  if (open) {
    previousActiveElement.value = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';
    isAnimating.value = true;
    
    nextTick(() => {
      // Focus first focusable element
      const focusableElements = modalRef.value?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements?.length) {
        (focusableElements[0] as HTMLElement).focus();
      }
    });
  } else {
    document.body.style.overflow = '';
    // Return focus to previous element
    previousActiveElement.value?.focus();
  }
});

// Handle escape key
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isOpen.value) {
    closeModal();
  }
  
  // Focus trap
  if (e.key === 'Tab' && isOpen.value && modalRef.value) {
    const focusableElements = modalRef.value.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
  }
};

// Handle overlay click
const handleOverlayClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget && props.closeOnOverlayClick) {
    closeModal();
  }
};

// Handle animation end
const handleTransitionEnd = () => {
  if (!isOpen.value) {
    isAnimating.value = false;
  }
};

// Lifecycle
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
    <div
      v-if="isOpen || isAnimating"
      :class="cn(
        'fixed',
        'inset-0',
        'z-50',
        'flex',
        'items-center',
        'justify-center',
        'p-4',
        'transition-opacity',
        'duration-300',
        overlayAnimationClass
      )"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="title ? 'modal-title' : undefined"
      :aria-describedby="description ? 'modal-description' : undefined"
      @click="handleOverlayClick"
      @transitionend="handleTransitionEnd"
    >
      <!-- Backdrop -->
      <div
        :class="cn(
          'absolute',
          'inset-0',
          'bg-black/60',
          'backdrop-blur-sm',
          'transition-opacity',
          'duration-300',
          isOpen ? 'opacity-100' : 'opacity-0'
        )"
        aria-hidden="true"
      />

      <!-- Modal Content -->
      <div
        ref="modalRef"
        :class="cn(
          'relative',
          'w-full',
          sizeClasses,
          'transition-all',
          'duration-300',
          'ease-out',
          contentAnimationClass
        )"
      >
        <!-- Glass Card Container -->
        <div
          :class="cn(
            'relative',
            'rounded-2xl',
            'overflow-hidden',
            'backdrop-blur-xl',
            // Light theme - solid visible background
            'bg-white/70',
            'border',
            'border-white/40',
            'shadow-[0_8px_32px_rgba(0,0,0,0.12)]',
            // Dark theme
            'dark:bg-slate-900/95',
            'dark:border-white/[0.1]',
            'dark:shadow-black/50',
            props.class
          )"
        >
          <!-- Inner glow -->
          <div
            class="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          <!-- Header -->
          <div
            v-if="title || showCloseButton"
            class="flex items-start justify-between p-6 pb-0 relative z-10"
          >
            <div>
              <h2
                v-if="title"
                id="modal-title"
                class="text-xl font-semibold text-text-primary"
              >
                {{ title }}
              </h2>
              <p
                v-if="description"
                id="modal-description"
                class="mt-1 text-sm text-text-secondary"
              >
                {{ description }}
              </p>
            </div>

            <!-- Close button -->
            <button
              v-if="showCloseButton"
              type="button"
              :class="cn(
                'h-8',
                'w-8',
                '-mt-1',
                '-mr-2',
                'inline-flex',
                'items-center',
                'justify-center',
                'rounded-lg',
                'text-slate-500',
                'dark:text-white/60',
                'hover:bg-slate-100',
                'dark:hover:bg-white/[0.1]',
                'transition-colors',
                'duration-200',
                'focus:outline-none',
                'focus:ring-2',
                'focus:ring-blue-500/30',
                'dark:focus:ring-white/[0.2]'
              )"
              aria-label="Close modal"
              @click="closeModal"
            >
              <svg
                class="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <!-- Content -->
          <div
            :class="cn(
              'p-6',
              'max-h-[60vh]',
              'overflow-y-auto',
              'relative',
              'z-10',
              // Custom scrollbar
              'scrollbar-thin',
              'scrollbar-track-transparent',
              'scrollbar-thumb-white/10',
              'hover:scrollbar-thumb-white/20'
            )"
          >
            <slot />
          </div>

          <!-- Footer -->
          <div
            v-if="$slots.footer"
            :class="cn(
              'flex',
              'items-center',
              'justify-end',
              'gap-3',
              'p-6',
              'pt-0',
              'border-t',
              'border-white/10',
              'mt-4',
              'pt-4',
              'relative',
              'z-10'
            )"
          >
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
