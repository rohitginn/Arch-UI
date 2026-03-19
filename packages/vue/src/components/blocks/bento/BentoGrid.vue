<template>
  <section class="py-16 md:py-24 px-6" :class="className">
    <slot name="background" />

    <div v-if="heading || subheading" class="mx-auto max-w-3xl text-center mb-12">
      <h2 v-if="heading" class="text-3xl md:text-4xl font-bold tracking-tight text-[var(--glass-text)] dark:text-zinc-100 mb-4">
        {{ heading }}
      </h2>
      <p v-if="subheading" class="text-base md:text-lg text-[var(--glass-text)]/60 dark:text-zinc-400 leading-relaxed">
        {{ subheading }}
      </p>
    </div>

    <div
      ref="gridRef"
      :class="['grid auto-rows-fr gap-4 md:gap-5 mx-auto max-w-7xl', colsClass]"
    >
      <div
        v-for="(item, i) in items"
        :key="i"
        :style="{ transitionDelay: revealed ? `${i * 60}ms` : '0ms' }"
        :class="[
          'relative isolate overflow-hidden rounded-2xl',
          'border border-[var(--glass-edge,theme(colors.zinc.200))] dark:border-zinc-800',
          'bg-[var(--glass-surface,white)] dark:bg-zinc-900 backdrop-blur-md',
          'transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
          revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          'hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]',
          'dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] dark:hover:border-zinc-700',
          item.colSpan === 2 ? 'md:col-span-2' : '',
          item.rowSpan === 2 ? 'md:row-span-2' : '',
          item.image ? 'min-h-[280px] flex flex-col justify-end' : 'p-6 md:p-8',
        ]"
        @mouseenter="hovered[i] = true"
        @mouseleave="hovered[i] = false"
      >
        <!-- Accent top edge -->
        <div
          v-if="item.accent"
          aria-hidden="true"
          class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--glass-accent,theme(colors.amber.500))] to-transparent"
        />

        <!-- Shimmer sweep -->
        <div
          aria-hidden="true"
          :class="[
            'absolute inset-0 bg-gradient-to-br from-[var(--glass-accent)]/0 via-[var(--glass-accent)]/5 to-[var(--glass-accent)]/0',
            'transition-opacity duration-500',
            hovered[i] ? 'opacity-100' : 'opacity-0',
          ]"
        />

        <!-- Background image -->
        <template v-if="item.image">
          <img
            :src="item.image"
            alt=""
            aria-hidden="true"
            :class="[
              'absolute inset-0 h-full w-full object-cover',
              'transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
              hovered[i] ? 'scale-105' : 'scale-100',
            ]"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </template>

        <!-- Content -->
        <div :class="['relative z-10', item.image ? 'p-6 md:p-8' : '']">
          <span
            v-if="item.tag"
            class="mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold bg-[var(--glass-accent)]/10 text-[var(--glass-accent,theme(colors.amber.600))] dark:text-amber-400"
          >{{ item.tag }}</span>

          <div
            v-if="item.icon"
            class="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--glass-accent)]/10 text-[var(--glass-accent)] dark:text-amber-400"
          >
            <component :is="item.icon" v-if="typeof item.icon !== 'string'" />
            <span v-else v-html="item.icon" />
          </div>

          <h3
            :class="[
              'text-base md:text-lg font-semibold leading-snug mb-2',
              item.image ? 'text-white' : 'text-[var(--glass-text)] dark:text-zinc-100',
            ]"
          >{{ item.title }}</h3>

          <p
            v-if="item.body"
            :class="[
              'text-sm leading-relaxed',
              item.image ? 'text-white/75' : 'text-[var(--glass-text)]/70 dark:text-zinc-400',
            ]"
          >{{ item.body }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';

interface BentoItem {
  title: string;
  body?: string;
  icon?: unknown;
  tag?: string;
  colSpan?: 1 | 2;
  rowSpan?: 1 | 2;
  image?: string;
  accent?: boolean;
}

const props = withDefaults(defineProps<{
  heading?: string;
  subheading?: string;
  items: BentoItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}>(), {
  columns: 3,
});

const revealed = ref(false);
const hovered = reactive<Record<number, boolean>>({});
const gridRef = ref<HTMLElement | null>(null);

let obs: IntersectionObserver | null = null;
onMounted(() => {
  if (!gridRef.value) return;
  obs = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) { revealed.value = true; obs?.disconnect(); } },
    { rootMargin: '0px 0px -60px 0px', threshold: 0.04 },
  );
  obs.observe(gridRef.value);
});
onUnmounted(() => obs?.disconnect());

const colsClass = computed(() => ({
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
}[props.columns]));
</script>
