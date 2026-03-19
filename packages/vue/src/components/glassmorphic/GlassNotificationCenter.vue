<script setup lang="ts">
/**
 * GlassNotificationCenter - Token-based slide-in notification panel for Vue 3
 */
import { computed, onMounted, onUnmounted } from 'vue';
import { cn } from '@archui/core';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read?: boolean;
  type?: 'info' | 'success' | 'warning' | 'error';
}

interface Props {
  open?: boolean;
  notifications?: Notification[];
  title?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  notifications: () => [],
  title: 'Notifications',
});

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void;
  (e: 'markRead', id: string): void;
  (e: 'dismiss', id: string): void;
  (e: 'markAllRead'): void;
}>();

const unreadCount = computed(() => props.notifications.filter((n) => !n.read).length);

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.open) emit('update:open', false);
};

onMounted(() => document.addEventListener('keydown', handleEscape));
onUnmounted(() => document.removeEventListener('keydown', handleEscape));
</script>

<template>
  <Teleport to="body">
    <Transition enter-active-class="transition-opacity duration-200" enter-from-class="opacity-0"
      enter-to-class="opacity-100" leave-active-class="transition-opacity duration-150" leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div v-if="open" class="fixed inset-0 z-40 bg-black/10 dark:bg-black/30" @click="emit('update:open', false)" />
    </Transition>
    <Transition enter-active-class="transition-transform duration-300 ease-out" enter-from-class="translate-x-full"
      enter-to-class="translate-x-0" leave-active-class="transition-transform duration-200 ease-in"
      leave-from-class="translate-x-0" leave-to-class="translate-x-full">
      <div v-if="open" :class="cn(
        'fixed top-0 right-0 z-50 h-full w-full max-w-[380px]',
        'bg-[var(--glass-surface)] backdrop-blur-2xl',
        'border-l border-[var(--glass-edge)]',
        'shadow-[var(--glass-depth-lg)]',
        props.class,
      )">
        <!-- Header -->
        <div class="flex items-center justify-between px-5 py-4 border-b border-[var(--glass-divider)]">
          <div class="flex items-center gap-2">
            <h2 class="text-base font-semibold text-[var(--glass-text)]">{{ title }}</h2>
            <span v-if="unreadCount > 0"
              class="inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full text-[11px] font-semibold bg-[var(--glass-accent)] text-white">
              {{ unreadCount }}
            </span>
          </div>
          <div class="flex items-center gap-1">
            <button v-if="unreadCount > 0" type="button"
              class="px-2 py-1 rounded-md text-xs text-[var(--glass-accent)] hover:bg-[var(--glass-surface-hover)] transition-colors"
              @click="emit('markAllRead')">
              Mark all read
            </button>
            <button type="button"
              class="p-1.5 rounded-lg text-[var(--glass-text-muted)] hover:text-[var(--glass-text)] hover:bg-[var(--glass-surface-hover)] transition-all"
              @click="emit('update:open', false)">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- List -->
        <div class="flex-1 overflow-y-auto px-3 py-3 space-y-1.5" style="max-height: calc(100vh - 65px)">
          <div v-if="notifications.length === 0" class="flex flex-col items-center justify-center py-16 text-center">
            <p class="text-sm text-[var(--glass-text-muted)]">No notifications yet</p>
          </div>
          <div v-else v-for="n in notifications" :key="n.id" :class="cn(
            'group relative flex gap-3 p-3 rounded-xl cursor-pointer',
            'transition-all duration-200 ease-out',
            'bg-[var(--glass-surface-hover)]/50',
            'hover:bg-[var(--glass-surface-active)]',
            !n.read && 'border-l-2 border-[var(--glass-accent)]',
            n.read && 'opacity-70 hover:opacity-100',
          )" @click="!n.read && emit('markRead', n.id)">
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-2">
                <p
                  :class="cn('text-sm truncate', n.read ? 'font-normal text-[var(--glass-text-secondary)]' : 'font-medium text-[var(--glass-text)]')">
                  {{ n.title }}
                </p>
                <span v-if="!n.read"
                  class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--glass-accent)] animate-pulse" />
              </div>
              <p class="mt-0.5 text-xs text-[var(--glass-text-muted)] line-clamp-2">{{ n.message }}</p>
              <p class="mt-1 text-[11px] text-[var(--glass-text-placeholder)]">{{ n.timestamp }}</p>
            </div>
            <button type="button"
              :class="cn('absolute top-2 right-2 p-1 rounded-md opacity-0 group-hover:opacity-100 text-[var(--glass-text-muted)] hover:text-[var(--glass-text)] transition-all duration-150')"
              @click.stop="emit('dismiss', n.id)">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
