<script lang="ts">
import SectionWrapper from '../shared/SectionWrapper.vue';
import SectionHeading from '../shared/SectionHeading.vue';
</script>

<script setup lang="ts">
/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface FAQCenteredItem {
  question: string;
  answer: string;
}

export interface FAQCenteredProps {
  heading?: string;
  subheading?: string;
  items: FAQCenteredItem[];
}

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */

withDefaults(defineProps<FAQCenteredProps>(), {
  heading: undefined,
  subheading: undefined,
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

    <div class="mx-auto max-w-2xl space-y-10">
      <div v-for="(item, i) in items" :key="i" class="space-y-2">
        <h3 class="text-base font-semibold text-[var(--glass-text)]">{{ item.question }}</h3>
        <p class="text-sm leading-relaxed text-[var(--glass-text)]/70">{{ item.answer }}</p>
        <div v-if="i < items.length - 1" class="pt-8">
          <hr class="border-[var(--glass-edge)]/30" />
        </div>
      </div>
    </div>
  </SectionWrapper>
</template>
