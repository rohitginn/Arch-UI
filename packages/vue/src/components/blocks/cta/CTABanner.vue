<template>
  <section class="py-16 md:py-24 px-6" :class="className">
    <!-- Background slot -->
    <slot name="background" />

    <div
      ref="bannerRef"
      :class="[
        'relative isolate overflow-hidden rounded-3xl px-8 py-16 md:py-24 text-center',
        'transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]',
        revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
        variantClasses,
      ]"
    >
      <!-- Decorative orbs -->
      <div
        v-if="variant !== 'accent'"
        aria-hidden="true"
        class="pointer-events-none absolute -top-24 -right-24 h-[400px] w-[400px] rounded-full bg-[var(--glass-accent,theme(colors.amber.500))]/10 blur-3xl"
      />
      <div
        v-if="variant !== 'accent'"
        aria-hidden="true"
        class="pointer-events-none absolute -bottom-24 -left-24 h-[300px] w-[300px] rounded-full bg-[var(--glass-accent,theme(colors.amber.500))]/6 blur-3xl"
      />

      <!-- Shimmer accent line -->
      <div
        aria-hidden="true"
        class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--glass-accent)]/50 to-transparent"
      />

      <!-- Content -->
      <div class="relative z-10 mx-auto max-w-2xl">
        <h2 :class="['text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-[1.1]', headingColorClass]">
          {{ heading }}
        </h2>

        <p v-if="subheading" :class="['text-base md:text-lg mb-10 leading-relaxed', subheadingColorClass]">
          {{ subheading }}
        </p>

        <div class="flex flex-wrap items-center justify-center gap-4">
          <!-- Primary CTA -->
          <a :href="primaryCta.href" :class="primaryCtaClasses">
            {{ primaryCta.label }}
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          <!-- Secondary CTA -->
          <a v-if="secondaryCta" :href="secondaryCta.href" :class="secondaryCtaClasses">
            {{ secondaryCta.label }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

interface CTALink { label: string; href: string; }

const props = withDefaults(defineProps<{
  heading: string;
  subheading?: string;
  primaryCta: CTALink;
  secondaryCta?: CTALink;
  variant?: 'accent' | 'glass' | 'solid';
  className?: string;
}>(), {
  variant: 'glass',
});

const revealed = ref(false);
const bannerRef = ref<HTMLElement | null>(null);

let obs: IntersectionObserver | null = null;

onMounted(() => {
  if (!bannerRef.value) return;
  obs = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) { revealed.value = true; obs?.disconnect(); } },
    { rootMargin: '0px 0px -60px 0px', threshold: 0.1 },
  );
  obs.observe(bannerRef.value);
});

onUnmounted(() => obs?.disconnect());

const variantClasses = computed(() => {
  if (props.variant === 'glass') return 'border border-[var(--glass-edge)] dark:border-zinc-800 bg-[var(--glass-surface)] backdrop-blur-md dark:bg-zinc-900/60';
  if (props.variant === 'accent') return 'bg-[var(--glass-accent)] text-white';
  return 'border border-[var(--glass-edge)] dark:border-zinc-800 bg-zinc-900 dark:bg-zinc-950 text-white';
});

const headingColorClass = computed(() =>
  props.variant === 'accent' || props.variant === 'solid'
    ? 'text-white'
    : 'text-[var(--glass-text,theme(colors.zinc.900))] dark:text-zinc-100',
);

const subheadingColorClass = computed(() =>
  props.variant === 'accent' || props.variant === 'solid'
    ? 'text-white/75'
    : 'text-[var(--glass-text,theme(colors.zinc.600))]/70 dark:text-zinc-400',
);

const primaryCtaClasses = computed(() => [
  'inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-semibold',
  'transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  'active:scale-[0.97]',
  props.variant === 'accent'
    ? 'bg-white text-[var(--glass-accent)] hover:bg-white/90 shadow-lg'
    : 'bg-[var(--glass-accent,theme(colors.amber.500))] text-white hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)]',
]);

const secondaryCtaClasses = computed(() => [
  'inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-semibold',
  'transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  'active:scale-[0.97]',
  props.variant === 'accent' || props.variant === 'solid'
    ? 'text-white/80 hover:text-white underline-offset-4 hover:underline'
    : 'border border-[var(--glass-edge)] dark:border-zinc-700 bg-transparent text-[var(--glass-text)] dark:text-zinc-200 hover:bg-[var(--glass-accent)]/8 dark:hover:bg-zinc-800',
]);
</script>
