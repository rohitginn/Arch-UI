<script lang="ts">
import SectionWrapper from '../shared/SectionWrapper.vue';
import SectionHeading from '../shared/SectionHeading.vue';
</script>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue';
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQAccordionProps {
  heading?: string;
  subheading?: string;
  items: FAQItem[];
  singleOpen?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */

const props = withDefaults(defineProps<FAQAccordionProps>(), {
  heading: undefined,
  subheading: undefined,
  singleOpen: false,
});

/* ------------------------------------------------------------------ */
/*  State                                                               */
/* ------------------------------------------------------------------ */

const openIndexes = ref<Set<number>>(new Set());

/* Real measured heights per item */
const heights = reactive<Record<number, number>>({});
const contentRefs = reactive<Record<number, HTMLElement | null>>({});

function setContentRef(el: HTMLElement | null, i: number) {
  contentRefs[i] = el;
  if (el) {
    const measure = () => { heights[i] = el.scrollHeight; };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    (el as unknown as { _ro: ResizeObserver })._ro = ro;
  }
}

onUnmounted(() => {
  Object.values(contentRefs).forEach((el) => {
    if (el) (el as unknown as { _ro?: ResizeObserver })._ro?.disconnect();
  });
});

async function toggle(index: number) {
  if (!heights[index] && contentRefs[index]) {
    await nextTick();
    heights[index] = contentRefs[index]!.scrollHeight;
  }
  const next = new Set(props.singleOpen ? [] : openIndexes.value);
  if (openIndexes.value.has(index)) {
    next.delete(index);
  } else {
    next.add(index);
  }
  openIndexes.value = next;
}

/* ------------------------------------------------------------------ */
/*  Scroll-reveal stagger                                              */
/* ------------------------------------------------------------------ */

const revealed = ref(false);
const wrapperRef = ref<HTMLElement | null>(null);

let obs: IntersectionObserver | null = null;
onMounted(() => {
  if (!wrapperRef.value) return;
  obs = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) { revealed.value = true; obs?.disconnect(); } },
    { rootMargin: '0px 0px -80px 0px', threshold: 0.05 },
  );
  obs.observe(wrapperRef.value);
});
onUnmounted(() => obs?.disconnect());
</script>

<template>
  <SectionWrapper padding="default">
    <template v-if="$slots.background" #background>
      <slot name="background" />
    </template>

    <SectionHeading
      v-if="heading || subheading"
      :heading="heading"
      :subheading="subheading"
      align="center"
      class="mb-12"
    />

    <div ref="wrapperRef" class="mx-auto max-w-3xl space-y-3">
      <div
        v-for="(item, i) in items"
        :key="i"
        :style="{ transitionDelay: revealed ? `${i * 50}ms` : '0ms' }"
        :class="cn(
          'rounded-xl border',
          'bg-[var(--glass-surface)] backdrop-blur-md',
          'transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
          revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
          openIndexes.has(i)
            ? 'border-[var(--glass-accent)]/30 shadow-md'
            : 'border-[var(--glass-edge)] dark:border-zinc-800',
        )"
      >
        <button
          type="button"
          :aria-expanded="openIndexes.has(i)"
          :aria-controls="`faq-panel-${i}`"
          :id="`faq-trigger-${i}`"
          :class="cn(
            'flex w-full items-center justify-between gap-4 p-5 text-left',
            'text-sm font-semibold text-[var(--glass-text)] dark:text-zinc-100',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset',
            'focus-visible:ring-[var(--glass-accent)]',
            'rounded-xl',
          )"
          @click="toggle(i)"
        >
          <span class="flex-1">{{ item.question }}</span>

          <!-- Plus / minus indicator -->
          <span
            class="relative flex h-5 w-5 shrink-0 items-center justify-center text-[var(--glass-text)]/40 dark:text-zinc-500"
            aria-hidden="true"
          >
            <!-- Horizontal bar (always visible) -->
            <span class="absolute inset-x-0 h-[1.5px] w-full rounded-full bg-current transition-transform duration-200" />
            <!-- Vertical bar (collapses when open) -->
            <span
              :class="cn(
                'absolute h-full w-[1.5px] rounded-full bg-current',
                'transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]',
                openIndexes.has(i) ? 'scale-y-0 opacity-0' : 'scale-y-100 opacity-100',
              )"
            />
          </span>
        </button>

        <!-- Real height panel — no max-h hack -->
        <div
          :id="`faq-panel-${i}`"
          role="region"
          :aria-labelledby="`faq-trigger-${i}`"
          :style="{
            height: openIndexes.has(i) ? `${heights[i] ?? 0}px` : '0px',
            transition: 'height 280ms cubic-bezier(0.4, 0, 0.2, 1)',
            overflow: 'hidden',
          }"
        >
          <div :ref="(el) => setContentRef(el as HTMLElement | null, i)">
            <div class="px-5 pb-5 pt-1 text-sm leading-relaxed text-[var(--glass-text)]/70 dark:text-zinc-400">
              {{ item.answer }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </SectionWrapper>
</template>
