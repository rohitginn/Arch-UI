<script setup lang="ts">
/**
 * GlassAlertDialog - Blocking confirmation dialog
 */
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { cn } from '@archui/core';

interface GlassAlertDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'warning' | 'danger';
}

const props = withDefaults(defineProps<GlassAlertDialogProps>(), {
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
  variant: 'danger',
});

const emit = defineEmits<{
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();

const confirmRef = ref<HTMLButtonElement | null>(null);

// Focus confirm & lock scroll
watch(
  () => props.open,
  (val) => {
    if (val) {
      setTimeout(() => confirmRef.value?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  },
  { immediate: true },
);

// Block Escape key
const blockEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.open) e.preventDefault();
};

onMounted(() => document.addEventListener('keydown', blockEscape));
onUnmounted(() => {
  document.removeEventListener('keydown', blockEscape);
  document.body.style.overflow = '';
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-[100] flex items-center justify-center"
      role="alertdialog"
      aria-modal="true"
      :aria-labelledby="'alert-dialog-title'"
      :aria-describedby="description ? 'alert-dialog-desc' : undefined"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm" />

      <!-- Dialog -->
      <div
        :class="cn(
          'relative z-10 w-full max-w-md rounded-2xl p-6',
          'bg-[var(--surface-bg,#ffffff)]',
          'border border-[var(--surface-border,#e2e8f0)]',
          'dark:bg-[var(--surface-bg-hover,rgba(255,255,255,0.08))]',
          'dark:border-[var(--surface-border,rgba(255,255,255,0.1))]',
          'dark:backdrop-blur-xl shadow-2xl',
        )"
      >
        <h2
          id="alert-dialog-title"
          class="text-lg font-semibold text-[var(--glass-text,#0f172a)] dark:text-[var(--glass-text,#f8fafc)]"
        >
          {{ title }}
        </h2>
        <p
          v-if="description"
          id="alert-dialog-desc"
          class="mt-2 text-sm text-[var(--glass-text-secondary,#475569)] dark:text-[var(--glass-text-secondary,#94a3b8)]"
        >
          {{ description }}
        </p>

        <div class="mt-6 flex justify-end gap-3">
          <button
            type="button"
            :class="cn(
              'rounded-xl px-4 py-2 text-sm font-medium cursor-pointer',
              'bg-[var(--surface-bg-hover,#f1f5f9)]',
              'text-[var(--glass-text,#0f172a)]',
              'dark:bg-[var(--glass-bg-dark,rgba(255,255,255,0.05))]',
              'dark:text-[var(--glass-text,#f8fafc)]',
              'border border-[var(--surface-border,#e2e8f0)]',
              'dark:border-[var(--surface-border,rgba(255,255,255,0.1))]',
              'hover:bg-[var(--surface-bg-active,#e2e8f0)]',
              'dark:hover:bg-[var(--glass-bg-dark-hover,rgba(255,255,255,0.08))]',
              'transition-colors duration-200',
              'active:scale-[0.97] active:transition-transform active:duration-75',
            )"
            @click="emit('cancel')"
          >
            {{ cancelLabel }}
          </button>
          <button
            ref="confirmRef"
            type="button"
            :class="cn(
              'rounded-xl px-4 py-2 text-sm font-medium text-white cursor-pointer',
              'transition-all duration-200',
              'hover:-translate-y-[1px] hover:shadow-lg',
              'active:scale-[0.97] active:transition-transform active:duration-75',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              variant === 'danger' && 'bg-[var(--glass-error,#ef4444)] hover:bg-red-600 dark:hover:bg-red-500 focus-visible:ring-red-500',
              variant === 'warning' && 'bg-[var(--glass-warning,#f59e0b)] hover:bg-amber-600 dark:hover:bg-amber-500 focus-visible:ring-amber-500',
            )"
            @click="emit('confirm')"
          >
            {{ confirmLabel }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
