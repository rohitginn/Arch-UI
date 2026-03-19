<script lang="ts">
import SectionWrapper from '../shared/SectionWrapper.vue';
import SectionHeading from '../shared/SectionHeading.vue';
</script>

<script setup lang="ts">
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface PricingMinimalPlan {
  name: string;
  price: number | string;
  billingLabel?: string;
  description?: string;
  features: string[];
  cta: { label: string; href: string };
  highlighted?: boolean;
}

export interface PricingMinimalProps {
  heading?: string;
  subheading?: string;
  plans: PricingMinimalPlan[];
  currency?: string;
}

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */

withDefaults(defineProps<PricingMinimalProps>(), {
  heading: undefined,
  subheading: undefined,
  currency: '$',
});
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

    <div
      :class="cn(
        'mx-auto flex flex-col items-stretch gap-8',
        plans.length === 1 && 'max-w-lg',
        plans.length >= 2 && 'md:flex-row md:items-center md:justify-center max-w-4xl'
      )"
    >
      <div
        v-for="(plan, i) in plans"
        :key="i"
        :class="cn(
          'flex flex-col rounded-2xl p-8 md:p-10 flex-1',
          'border transition-all duration-300',
          'bg-[var(--glass-surface)] backdrop-blur-md',
          plan.highlighted
            ? 'border-[var(--glass-accent)] shadow-xl'
            : 'border-[var(--glass-edge)] hover:-translate-y-1 hover:shadow-lg'
        )"
      >
        <!-- Name -->
        <h3 class="text-lg font-semibold text-[var(--glass-text)] mb-1">{{ plan.name }}</h3>

        <!-- Description -->
        <p v-if="plan.description" class="text-sm text-[var(--glass-text)]/60 mb-6">
          {{ plan.description }}
        </p>

        <!-- Price -->
        <div class="mb-8">
          <span class="text-5xl font-bold text-[var(--glass-text)]">
            {{ typeof plan.price === 'number' ? `${currency}${plan.price}` : plan.price }}
          </span>
          <span v-if="plan.billingLabel" class="text-sm text-[var(--glass-text)]/50 ml-1">
            {{ plan.billingLabel }}
          </span>
        </div>

        <!-- Features -->
        <ul class="flex-1 space-y-3 mb-8">
          <li
            v-for="(f, fi) in plan.features"
            :key="fi"
            class="flex items-start gap-2 text-sm text-[var(--glass-text)]/80"
          >
            <svg
              class="mt-0.5 h-4 w-4 shrink-0 text-[var(--glass-accent)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {{ f }}
          </li>
        </ul>

        <!-- CTA -->
        <a
          :href="plan.cta.href"
          :class="cn(
            'inline-flex items-center justify-center rounded-xl px-6 py-3',
            'text-sm font-semibold transition-all duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            'active:scale-[0.97] active:transition-transform active:duration-75',
            plan.highlighted
              ? 'bg-[var(--glass-accent)] text-white hover:brightness-110'
              : 'border border-[var(--glass-edge)] bg-[var(--glass-surface)] text-[var(--glass-text)] hover:bg-[var(--glass-accent)]/10'
          )"
        >
          {{ plan.cta.label }}
        </a>
      </div>
    </div>
  </SectionWrapper>
</template>
