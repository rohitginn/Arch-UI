<script setup lang="ts">
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface TimelineMilestone {
  title: string;
  date: string;
  description?: string;
  status?: 'completed' | 'current' | 'upcoming';
}

export interface TimelineSectionProps {
  milestones: TimelineMilestone[];
  layout?: 'vertical' | 'alternating';
}

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */

withDefaults(defineProps<TimelineSectionProps>(), {
  layout: 'vertical',
});
</script>

<template>
  <div class="relative mx-auto max-w-3xl">
    <!-- Central line -->
    <div
      :class="cn(
        'absolute top-0 bottom-0 w-px bg-[var(--glass-edge)]',
        layout === 'alternating' ? 'left-1/2 -translate-x-1/2' : 'left-5',
      )"
      aria-hidden="true"
    />

    <div class="relative space-y-12">
      <div
        v-for="(m, i) in milestones"
        :key="i"
        :class="cn(
          'relative flex items-start',
          layout === 'alternating' ? 'justify-center' : '',
        )"
      >
        <!-- Left content (alternating) -->
        <div
          v-if="layout === 'alternating'"
          :class="cn(
            'w-[calc(50%-24px)]',
            i % 2 === 0 ? 'text-right pr-8' : 'order-last pl-8',
          )"
        >
          <!-- Show content on left side for even items, right side for odd -->
          <template v-if="i % 2 === 0">
            <span
              :class="cn(
                'mb-1 text-xs font-medium',
                m.status === 'completed' || m.status === 'current'
                  ? 'text-[var(--glass-accent)]'
                  : 'text-[var(--glass-text)]/40',
              )"
            >{{ m.date }}</span>
            <h3
              :class="cn(
                'text-sm font-semibold',
                m.status === 'upcoming' ? 'text-[var(--glass-text)]/50' : 'text-[var(--glass-text)]',
              )"
            >{{ m.title }}</h3>
            <p
              v-if="m.description"
              :class="cn(
                'mt-1 text-xs leading-relaxed',
                m.status === 'upcoming' ? 'text-[var(--glass-text)]/30' : 'text-[var(--glass-text)]/60',
              )"
            >{{ m.description }}</p>
          </template>
          <template v-else>
            <span
              :class="cn(
                'mb-1 text-xs font-medium',
                m.status === 'completed' || m.status === 'current'
                  ? 'text-[var(--glass-accent)]'
                  : 'text-[var(--glass-text)]/40',
              )"
            >{{ m.date }}</span>
            <h3
              :class="cn(
                'text-sm font-semibold',
                m.status === 'upcoming' ? 'text-[var(--glass-text)]/50' : 'text-[var(--glass-text)]',
              )"
            >{{ m.title }}</h3>
            <p
              v-if="m.description"
              :class="cn(
                'mt-1 text-xs leading-relaxed',
                m.status === 'upcoming' ? 'text-[var(--glass-text)]/30' : 'text-[var(--glass-text)]/60',
              )"
            >{{ m.description }}</p>
          </template>
        </div>

        <!-- Dot / Icon -->
        <div
          :class="cn(
            'relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2',
            'transition-all duration-300',
            m.status === 'completed'
              ? 'border-[var(--glass-accent)] bg-[var(--glass-accent)] text-white'
              : m.status === 'current'
                ? 'border-[var(--glass-accent)] bg-[var(--glass-surface)] text-[var(--glass-accent)]'
                : 'border-[var(--glass-edge)] bg-[var(--glass-surface)] text-[var(--glass-text)]/40',
          )"
        >
          <slot :name="`icon-${i}`">
            <span
              :class="cn(
                'h-2.5 w-2.5 rounded-full',
                m.status === 'completed'
                  ? 'bg-white'
                  : m.status === 'current'
                    ? 'bg-[var(--glass-accent)]'
                    : 'bg-[var(--glass-text)]/20',
              )"
            />
          </slot>
        </div>

        <!-- Right spacer (alternating) -->
        <div
          v-if="layout === 'alternating'"
          :class="cn(
            'w-[calc(50%-24px)]',
            i % 2 === 0 ? 'order-last pl-8' : 'text-right pr-8',
          )"
        />

        <!-- Content (vertical) -->
        <div v-if="layout !== 'alternating'" class="ml-6 pt-0.5">
          <span
            :class="cn(
              'mb-1 block text-xs font-medium',
              m.status === 'completed' || m.status === 'current'
                ? 'text-[var(--glass-accent)]'
                : 'text-[var(--glass-text)]/40',
            )"
          >{{ m.date }}</span>
          <h3
            :class="cn(
              'text-sm font-semibold',
              m.status === 'upcoming' ? 'text-[var(--glass-text)]/50' : 'text-[var(--glass-text)]',
            )"
          >{{ m.title }}</h3>
          <p
            v-if="m.description"
            :class="cn(
              'mt-1 text-xs leading-relaxed',
              m.status === 'upcoming' ? 'text-[var(--glass-text)]/30' : 'text-[var(--glass-text)]/60',
            )"
          >{{ m.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
