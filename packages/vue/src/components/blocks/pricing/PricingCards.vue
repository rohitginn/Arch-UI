<script lang="ts">
import SectionWrapper from '../shared/SectionWrapper.vue';
import SectionHeading from '../shared/SectionHeading.vue';
</script>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface PricingPlan {
  name: string;
  monthlyPrice: number | string;
  annualPrice?: number | string;
  description: string;
  features: string[];
  cta: { label: string; href: string };
  recommended?: boolean;
  badge?: string;
}

export interface PricingCardsProps {
  heading?: string;
  subheading?: string;
  billingToggle?: boolean;
  plans: PricingPlan[];
  currency?: string;
}

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */

const props = withDefaults(defineProps<PricingCardsProps>(), {
  heading: undefined,
  subheading: undefined,
  billingToggle: false,
  currency: '$',
});

/* ------------------------------------------------------------------ */
/*  State                                                               */
/* ------------------------------------------------------------------ */

const annual = ref(false);

function getPrice(plan: PricingPlan) {
  return annual.value && plan.annualPrice !== undefined
    ? plan.annualPrice
    : plan.monthlyPrice;
}

const gridClasses = computed(() =>
  cn(
    'grid gap-6 lg:gap-8 items-stretch',
    props.plans.length === 1 && 'max-w-md mx-auto',
    props.plans.length === 2 && 'md:grid-cols-2 max-w-4xl mx-auto',
    props.plans.length >= 3 && 'md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto'
  )
);
</script>

<template>
  <SectionWrapper padding="default">
    <template v-if="$slots.background" #background>
      <slot name="background" />
    </template>

    <!-- Heading -->
    <SectionHeading
      v-if="heading || subheading"
      :heading="heading"
      :subheading="subheading"
      align="center"
      class="mb-12"
    />

    <!-- Billing Toggle -->
    <div v-if="billingToggle" class="flex items-center justify-center gap-3 mb-10">
      <span
        :class="cn(
          'text-sm font-medium transition-colors duration-200',
          !annual
            ? 'text-[var(--glass-text)]'
            : 'text-[var(--glass-text)]/50'
        )"
      >
        Monthly
      </span>
      <button
        type="button"
        role="switch"
        :aria-checked="annual"
        :class="cn(
          'relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full',
          'border-2 border-transparent transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--glass-accent)] focus-visible:ring-offset-2',
          annual ? 'bg-[var(--glass-accent)]' : 'bg-[var(--glass-surface)]'
        )"
        @click="annual = !annual"
      >
        <span
          :class="cn(
            'pointer-events-none inline-block h-[22px] w-[22px] rounded-full',
            'bg-white shadow-md ring-0 transition-transform duration-200',
            annual ? 'translate-x-5' : 'translate-x-0.5',
            'mt-[1px]'
          )"
        />
      </button>
      <span
        :class="cn(
          'text-sm font-medium transition-colors duration-200',
          annual
            ? 'text-[var(--glass-text)]'
            : 'text-[var(--glass-text)]/50'
        )"
      >
        Annual
      </span>
    </div>

    <!-- Cards -->
    <div :class="gridClasses">
      <div
        v-for="(plan, i) in plans"
        :key="i"
        :class="cn(
          'relative flex flex-col rounded-2xl p-8',
          'border transition-all duration-300',
          'bg-[var(--glass-surface)] backdrop-blur-md',
          plan.recommended
            ? 'border-[var(--glass-accent)] shadow-xl scale-[1.03] z-10'
            : 'border-[var(--glass-edge)] hover:-translate-y-1 hover:shadow-lg'
        )"
      >
        <!-- Badge -->
        <div v-if="plan.badge" class="absolute -top-3 left-1/2 -translate-x-1/2">
          <span class="inline-block rounded-full px-4 py-1 text-xs font-semibold bg-[var(--glass-accent)] text-white">
            {{ plan.badge }}
          </span>
        </div>

        <!-- Plan Name -->
        <h3 class="text-lg font-semibold text-[var(--glass-text)] mb-2">{{ plan.name }}</h3>

        <!-- Description -->
        <p class="text-sm text-[var(--glass-text)]/60 mb-6">{{ plan.description }}</p>

        <!-- Price -->
        <div class="mb-8">
          <span class="text-4xl font-bold text-[var(--glass-text)]">
            {{ typeof getPrice(plan) === 'number' ? `${currency}${getPrice(plan)}` : getPrice(plan) }}
          </span>
          <span
            v-if="typeof getPrice(plan) === 'number'"
            class="text-sm text-[var(--glass-text)]/50 ml-1"
          >
            /{{ annual ? 'yr' : 'mo' }}
          </span>
        </div>

        <!-- Features -->
        <ul class="flex-1 space-y-3 mb-8">
          <li
            v-for="(feature, fi) in plan.features"
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
            {{ feature }}
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
            plan.recommended
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
