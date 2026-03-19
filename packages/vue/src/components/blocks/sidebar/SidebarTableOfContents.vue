<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface TocHeading {
  id: string;
  label: string;
  depth: number;
}

export interface SidebarTableOfContentsProps {
  headings: TocHeading[];
  title?: string;
  topOffset?: number;
}

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */

const props = withDefaults(defineProps<SidebarTableOfContentsProps>(), {
  title: 'On this page',
  topOffset: 100,
});

/* ------------------------------------------------------------------ */
/*  Active heading tracking                                             */
/* ------------------------------------------------------------------ */

const activeId = ref<string | null>(null);
let observer: IntersectionObserver | null = null;

function setupObserver() {
  observer?.disconnect();

  if (typeof window === 'undefined' || props.headings.length === 0) return;

  const els = props.headings
    .map((h) => document.getElementById(h.id))
    .filter(Boolean) as HTMLElement[];

  if (els.length === 0) return;

  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visible.length > 0) {
        activeId.value = visible[0].target.id;
      }
    },
    {
      rootMargin: `-${props.topOffset}px 0px -60% 0px`,
      threshold: 0,
    },
  );

  els.forEach((el) => observer!.observe(el));
}

onMounted(setupObserver);
onUnmounted(() => observer?.disconnect());
watch(() => props.headings, setupObserver, { deep: true });

/* ------------------------------------------------------------------ */
/*  Click handler                                                       */
/* ------------------------------------------------------------------ */

function handleClick(id: string, e: Event) {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - props.topOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
    activeId.value = id;
  }
}

/* ------------------------------------------------------------------ */
/*  Depth → padding map                                                 */
/* ------------------------------------------------------------------ */

const depthPadding: Record<number, string> = {
  2: 'pl-4',
  3: 'pl-8',
  4: 'pl-12',
  5: 'pl-16',
};
</script>

<template>
  <aside class="sticky top-24 w-56 space-y-1 self-start">
    <span
      v-if="title"
      class="mb-3 block text-xs font-semibold uppercase tracking-widest text-[var(--glass-text)]/40"
    >
      {{ title }}
    </span>
    <nav>
      <ul class="space-y-0.5 border-l border-[var(--glass-edge)]">
        <li v-for="h in headings" :key="h.id">
          <a
            :href="`#${h.id}`"
            @click="handleClick(h.id, $event)"
            :class="cn(
              'block border-l-2 py-1 text-[13px] transition-all duration-200',
              depthPadding[h.depth] ?? 'pl-4',
              activeId === h.id
                ? 'border-[var(--glass-accent)] font-medium text-[var(--glass-accent)]'
                : 'border-transparent text-[var(--glass-text)]/50 hover:text-[var(--glass-text)]/80 hover:border-[var(--glass-text)]/20',
            )"
          >
            {{ h.label }}
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>
