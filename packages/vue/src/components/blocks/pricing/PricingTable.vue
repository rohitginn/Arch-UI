<script lang="ts">
import SectionWrapper from '../shared/SectionWrapper.vue';
import SectionHeading from '../shared/SectionHeading.vue';
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface PricingTablePlan {
  name: string;
  monthlyPrice: number | string;
  annualPrice?: number | string;
  cta: { label: string; href: string };
  recommended?: boolean;
}

export interface PricingTableFeature {
  name: string;
  category?: string;
  values: Record<string, boolean | string>;
}

export interface PricingTableProps {
  heading?: string;
  subheading?: string;
  billingToggle?: boolean;
  plans: PricingTablePlan[];
  features: PricingTableFeature[];
  currency?: string;
}

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */

const props = withDefaults(defineProps<PricingTableProps>(), {
  heading: undefined,
  subheading: undefined,
  billingToggle: false,
  currency: '$',
});

/* ------------------------------------------------------------------ */
/*  State                                                               */
/* ------------------------------------------------------------------ */

const annual = ref(false);

function getPrice(plan: PricingTablePlan) {
  return annual.value && plan.annualPrice !== undefined
    ? plan.annualPrice
    : plan.monthlyPrice;
}

function formatPrice(price: number | string): string {
  return typeof price === 'number' ? `${props.currency}${price}` : price;
}

/** Track last rendered category to show separators */
let lastCategory: string | undefined;
function shouldShowCategory(feature: PricingTableFeature): boolean {
  if (feature.category && feature.category !== lastCategory) {
    lastCategory = feature.category;
    return true;
  }
  return false;
}
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

    <!-- Billing toggle -->
    <div v-if="billingToggle" class="flex items-center justify-center gap-3 mb-10">
      <span
        :class="cn(
          'text-sm font-medium transition-colors',
          !annual ? 'text-[var(--glass-text)]' : 'text-[var(--glass-text)]/50'
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
            'bg-white shadow-md transition-transform duration-200',
            annual ? 'translate-x-5' : 'translate-x-0.5',
            'mt-[1px]'
          )"
        />
      </button>
      <span
        :class="cn(
          'text-sm font-medium transition-colors',
          annual ? 'text-[var(--glass-text)]' : 'text-[var(--glass-text)]/50'
        )"
      >
        Annual
      </span>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full border-collapse text-sm">
        <!-- Header -->
        <thead>
          <tr>
            <th class="sticky left-0 z-10 bg-[var(--glass-bg,transparent)] p-4 text-left font-medium text-[var(--glass-text)]/60 min-w-[200px]">
              Features
            </th>
            <th
              v-for="(plan, i) in plans"
              :key="i"
              :class="cn('p-4 text-center min-w-[160px]', plan.recommended && 'bg-[var(--glass-accent)]/5 rounded-t-xl')"
            >
              <div class="space-y-1">
                <div
                  :class="cn(
                    'text-base font-semibold',
                    plan.recommended ? 'text-[var(--glass-accent)]' : 'text-[var(--glass-text)]'
                  )"
                >
                  {{ plan.name }}
                </div>
                <div class="text-2xl font-bold text-[var(--glass-text)]">
                  {{ formatPrice(getPrice(plan)) }}
                  <span v-if="typeof getPrice(plan) === 'number'" class="text-xs font-normal text-[var(--glass-text)]/50 ml-1">
                    /{{ annual ? 'yr' : 'mo' }}
                  </span>
                </div>
              </div>
            </th>
          </tr>
        </thead>

        <!-- Body -->
        <tbody>
          <template v-for="(feature, fi) in features" :key="fi">
            <!-- Category separator -->
            <tr v-if="shouldShowCategory(feature)">
              <td
                :colspan="plans.length + 1"
                class="pt-6 pb-2 px-4 text-xs font-semibold uppercase tracking-wider text-[var(--glass-text)]/40"
              >
                {{ feature.category }}
              </td>
            </tr>

            <!-- Feature row -->
            <tr class="border-b border-[var(--glass-edge)]/30 transition-colors hover:bg-[var(--glass-surface)]/50">
              <td class="sticky left-0 z-10 bg-[var(--glass-bg,transparent)] p-4 text-[var(--glass-text)]/80 font-medium">
                {{ feature.name }}
              </td>
              <td
                v-for="(plan, pi) in plans"
                :key="pi"
                :class="cn('p-4 text-center', plan.recommended && 'bg-[var(--glass-accent)]/5')"
              >
                <!-- Check -->
                <svg
                  v-if="feature.values[plan.name] === true"
                  class="h-5 w-5 text-emerald-500 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <!-- Cross -->
                <svg
                  v-else-if="feature.values[plan.name] === false"
                  class="h-5 w-5 text-[var(--glass-text)]/30 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <!-- String value -->
                <span
                  v-else-if="typeof feature.values[plan.name] === 'string'"
                  class="text-[var(--glass-text)]/70"
                >
                  {{ feature.values[plan.name] }}
                </span>
                <!-- Undefined -->
                <span v-else class="text-[var(--glass-text)]/20">—</span>
              </td>
            </tr>
          </template>
        </tbody>

        <!-- CTA Footer -->
        <tfoot>
          <tr>
            <td class="p-4" />
            <td
              v-for="(plan, i) in plans"
              :key="i"
              :class="cn('p-4 text-center', plan.recommended && 'bg-[var(--glass-accent)]/5 rounded-b-xl')"
            >
              <a
                :href="plan.cta.href"
                :class="cn(
                  'inline-flex items-center justify-center rounded-xl px-5 py-2.5',
                  'text-sm font-semibold transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                  'active:scale-[0.97]',
                  plan.recommended
                    ? 'bg-[var(--glass-accent)] text-white hover:brightness-110'
                    : 'border border-[var(--glass-edge)] text-[var(--glass-text)] hover:bg-[var(--glass-accent)]/10'
                )"
              >
                {{ plan.cta.label }}
              </a>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </SectionWrapper>
</template>
