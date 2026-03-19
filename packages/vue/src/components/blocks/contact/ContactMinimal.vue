<script lang="ts">
import SectionWrapper from '../shared/SectionWrapper.vue';
</script>

<script setup lang="ts">
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface ContactMinimalProps {
  heading?: string;
  description?: string;
  email?: string;
  ctaLabel?: string;
}

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */

withDefaults(defineProps<ContactMinimalProps>(), {
  heading: "Let's talk",
  description: undefined,
  email: 'hello@example.com',
  ctaLabel: 'Send us an email',
});
</script>

<template>
  <SectionWrapper padding="hero">
    <template v-if="$slots.background" #background>
      <slot name="background" />
    </template>

    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--glass-text)] mb-4">
        {{ heading }}
      </h2>

      <p v-if="description" class="text-lg text-[var(--glass-text)]/60 mb-8 max-w-lg mx-auto">
        {{ description }}
      </p>

      <a
        :href="`mailto:${email}`"
        :class="cn(
          'inline-flex items-center justify-center rounded-xl px-8 py-4',
          'bg-[var(--glass-accent)] text-white text-base font-semibold',
          'transition-all duration-200 hover:brightness-110',
          'hover:-translate-y-[1px] hover:shadow-lg',
          'active:scale-[0.97] active:transition-transform active:duration-75',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
        )"
      >
        {{ ctaLabel }}
      </a>

      <!-- Social links slot -->
      <div v-if="$slots.socials" class="mt-10 flex justify-center gap-4">
        <slot name="socials" />
      </div>
    </div>
  </SectionWrapper>
</template>
