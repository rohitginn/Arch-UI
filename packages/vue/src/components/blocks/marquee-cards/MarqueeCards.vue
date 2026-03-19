<template>
  <section class="py-16 md:py-24 overflow-hidden" :class="className">
    <slot name="background" />

    <div v-if="heading || subheading" class="px-6 mx-auto max-w-3xl text-center mb-12">
      <h2 v-if="heading" class="text-3xl md:text-4xl font-bold tracking-tight text-[var(--glass-text)] dark:text-zinc-100 mb-4">
        {{ heading }}
      </h2>
      <p v-if="subheading" class="text-base md:text-lg text-[var(--glass-text)]/60 dark:text-zinc-400 leading-relaxed">
        {{ subheading }}
      </p>
    </div>

    <div class="flex flex-col gap-4">
      <!-- Row A: forward -->
      <div
        class="relative flex overflow-hidden"
        @mouseenter="paused = pauseOnHover"
        @mouseleave="paused = false"
      >
        <fade-edges />
        <div
          class="flex gap-4 w-max mc-scroll"
          :style="{ animationDuration: `${durationA}s`, animationPlayState: paused ? 'paused' : 'running' }"
        >
          <marquee-card v-for="(card, i) in doubledA" :key="i" :card="card" />
        </div>
      </div>

      <!-- Row B: reverse -->
      <div
        v-if="rowB.length > 0"
        class="relative flex overflow-hidden"
        @mouseenter="paused = pauseOnHover"
        @mouseleave="paused = false"
      >
        <fade-edges />
        <div
          class="flex gap-4 w-max mc-scroll-reverse"
          :style="{ animationDuration: `${durationB}s`, animationPlayState: paused ? 'paused' : 'running' }"
        >
          <marquee-card v-for="(card, i) in doubledB" :key="i" :card="card" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, defineComponent, h } from 'vue';

export interface MarqueeCard {
  text: string;
  name?: string;
  role?: string;
  avatar?: string;
  tag?: string;
}

const props = withDefaults(defineProps<{
  heading?: string;
  subheading?: string;
  cards: MarqueeCard[];
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}>(), { speed: 40, pauseOnHover: true });

const paused = ref(false);
const mid = computed(() => Math.ceil(props.cards.length / 2));
const rowA = computed(() => props.cards.slice(0, mid.value));
const rowB = computed(() => props.cards.slice(mid.value));
const doubledA = computed(() => [...rowA.value, ...rowA.value]);
const doubledB = computed(() => [...rowB.value, ...rowB.value]);
const durationA = computed(() => (rowA.value.length * 320) / props.speed);
const durationB = computed(() => (rowB.value.length * 320) / (props.speed * 0.85));

/* Sub-components defined inline */
const MarqueeCard = defineComponent({
  props: { card: { type: Object as () => MarqueeCard, required: true } },
  setup(p) {
    return () => h('div', {
      class: [
        'relative flex-shrink-0 w-72 md:w-80 rounded-2xl p-6',
        'border border-[var(--glass-edge,theme(colors.zinc.200))] dark:border-zinc-800',
        'bg-[var(--glass-surface,white)] dark:bg-zinc-900 backdrop-blur-md',
        'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
        'hover:-translate-y-1.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]',
      ],
    }, [
      p.card.tag && h('span', {
        class: 'mb-3 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold bg-[var(--glass-accent)]/10 text-[var(--glass-accent)] dark:text-amber-400',
      }, p.card.tag),
      h('p', {
        class: 'text-sm leading-relaxed text-[var(--glass-text)]/80 dark:text-zinc-300 mb-5',
      }, `"${p.card.text}"`),
      (p.card.name || p.card.avatar) && h('div', { class: 'flex items-center gap-3' }, [
        p.card.avatar
          ? h('img', { src: p.card.avatar, alt: p.card.name ?? '', class: 'h-8 w-8 rounded-full object-cover ring-1 ring-[var(--glass-edge)] dark:ring-zinc-700' })
          : h('div', {
              class: 'flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold bg-[var(--glass-accent)]/15 text-[var(--glass-accent)] dark:text-amber-400',
            }, p.card.name?.charAt(0) ?? '?'),
        h('div', {}, [
          p.card.name && h('div', { class: 'text-xs font-semibold text-[var(--glass-text)] dark:text-zinc-100' }, p.card.name),
          p.card.role && h('div', { class: 'text-xs text-[var(--glass-text)]/60 dark:text-zinc-500' }, p.card.role),
        ]),
      ]),
    ]);
  },
});

const FadeEdges = defineComponent({
  setup() {
    return () => [
      h('div', { 'aria-hidden': 'true', class: 'pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[var(--glass-surface,white)] dark:from-zinc-950 to-transparent' }),
      h('div', { 'aria-hidden': 'true', class: 'pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[var(--glass-surface,white)] dark:from-zinc-950 to-transparent' }),
    ];
  },
});
</script>

<style>
@keyframes mc-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes mc-scroll-reverse {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
}
.mc-scroll         { animation: mc-scroll linear infinite; }
.mc-scroll-reverse { animation: mc-scroll-reverse linear infinite; }
@media (prefers-reduced-motion: reduce) {
  .mc-scroll, .mc-scroll-reverse { animation-play-state: paused !important; }
}
</style>
