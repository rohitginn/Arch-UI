<script lang="ts">
import SectionWrapper from '../shared/SectionWrapper.vue';
import SectionHeading from '../shared/SectionHeading.vue';
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface FAQTwoColumnItem {
  question: string;
  answer: string;
}

export interface FAQTwoColumnProps {
  heading?: string;
  subheading?: string;
  items: FAQTwoColumnItem[];
}

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */

const props = withDefaults(defineProps<FAQTwoColumnProps>(), {
  heading: undefined,
  subheading: undefined,
});

const mid = computed(() => Math.ceil(props.items.length / 2));
const leftItems = computed(() => props.items.slice(0, mid.value));
const rightItems = computed(() => props.items.slice(mid.value));
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

    <div class="mx-auto max-w-5xl grid md:grid-cols-2 gap-6">
      <div class="space-y-6">
        <div
          v-for="(item, i) in leftItems"
          :key="i"
          :class="cn(
            'rounded-xl border border-[var(--glass-edge)] p-6',
            'bg-[var(--glass-surface)] backdrop-blur-md',
            'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md'
          )"
        >
          <h3 class="text-sm font-semibold text-[var(--glass-text)] mb-2">{{ item.question }}</h3>
          <p class="text-sm leading-relaxed text-[var(--glass-text)]/70">{{ item.answer }}</p>
        </div>
      </div>
      <div class="space-y-6">
        <div
          v-for="(item, i) in rightItems"
          :key="i"
          :class="cn(
            'rounded-xl border border-[var(--glass-edge)] p-6',
            'bg-[var(--glass-surface)] backdrop-blur-md',
            'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md'
          )"
        >
          <h3 class="text-sm font-semibold text-[var(--glass-text)] mb-2">{{ item.question }}</h3>
          <p class="text-sm leading-relaxed text-[var(--glass-text)]/70">{{ item.answer }}</p>
        </div>
      </div>
    </div>
  </SectionWrapper>
</template>
