<script setup lang="ts">
/**
 * GlassTimeline - Token-based chronological event timeline for Vue 3
 */
import { cn } from '@archui/core';

interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  timestamp?: string;
  status?: 'completed' | 'active' | 'pending' | 'error';
}

interface Props {
  events: TimelineEvent[];
  class?: string;
}

const props = defineProps<Props>();

const dotColor: Record<string, string> = {
  completed: 'bg-[var(--glass-success)]',
  active: 'bg-[var(--glass-accent)] animate-pulse',
  pending: 'bg-[var(--glass-surface-active)]',
  error: 'bg-[var(--glass-error)]',
};

const lineColor: Record<string, string> = {
  completed: 'from-[var(--glass-success)]/40 to-[var(--glass-success)]/10',
  active: 'from-[var(--glass-accent)]/40 to-[var(--glass-divider)]',
  pending: 'from-[var(--glass-divider)] to-transparent',
  error: 'from-[var(--glass-error)]/40 to-[var(--glass-error)]/10',
};
</script>

<template>
  <div :class="cn('relative', props.class)">
    <div v-for="(event, index) in events" :key="event.id"
      :class="cn('relative flex gap-4', index !== events.length - 1 && 'pb-8')">
      <div class="relative flex flex-col items-center">
        <div :class="cn('relative z-10 h-3 w-3 rounded-full shrink-0 mt-1.5', dotColor[event.status || 'pending'])" />
        <div v-if="index !== events.length - 1"
          :class="cn('w-px flex-1 mt-1 bg-gradient-to-b', lineColor[event.status || 'pending'])" />
      </div>
      <div :class="cn(
        'flex-1 -mt-0.5 pb-1 p-3 rounded-xl transition-all duration-200 ease-out',
        'bg-[var(--glass-surface-hover)]/50',
        'hover:bg-[var(--glass-surface-hover)]',
        'hover:shadow-[var(--glass-depth-sm)]',
        'border border-transparent hover:border-[var(--glass-edge)]',
      )">
        <div class="flex items-start justify-between gap-2">
          <h4
            :class="cn('text-sm font-medium', event.status === 'pending' ? 'text-[var(--glass-text-muted)]' : 'text-[var(--glass-text)]')">
            {{ event.title }}
          </h4>
          <span v-if="event.timestamp" class="text-[11px] text-[var(--glass-text-placeholder)] shrink-0">{{
            event.timestamp }}</span>
        </div>
        <p v-if="event.description" class="mt-1 text-xs text-[var(--glass-text-muted)] leading-relaxed">{{
          event.description }}</p>
      </div>
    </div>
  </div>
</template>
