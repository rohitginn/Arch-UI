<script lang="ts">
import SectionWrapper from '../shared/SectionWrapper.vue';
</script>

<script setup lang="ts">
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface BlogContentHeaderProps {
  title: string;
  category?: string;
  image?: string;
  author?: { name: string; avatar?: string };
  date?: string;
  readTime?: string;
}

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */

withDefaults(defineProps<BlogContentHeaderProps>(), {
  category: undefined,
  image: undefined,
  author: undefined,
  date: undefined,
  readTime: undefined,
});
</script>

<template>
  <SectionWrapper padding="compact">
    <template v-if="$slots.background" #background>
      <slot name="background" />
    </template>

    <div class="mx-auto max-w-4xl">
      <!-- Hero image -->
      <div v-if="image" class="relative mb-8 aspect-[21/9] overflow-hidden rounded-2xl">
        <img
          :src="image"
          :alt="title"
          class="h-full w-full object-cover"
          loading="eager"
        />
      </div>

      <!-- Category badge -->
      <span
        v-if="category"
        :class="cn(
          'mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold',
          'bg-[var(--glass-accent)]/10 text-[var(--glass-accent)]'
        )"
      >
        {{ category }}
      </span>

      <!-- Title -->
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--glass-text)] mb-6 leading-tight">
        {{ title }}
      </h1>

      <!-- Author / Meta row -->
      <div
        v-if="author || date || readTime"
        class="flex flex-wrap items-center gap-3 text-sm text-[var(--glass-text)]/60 border-b border-[var(--glass-edge)] pb-6"
      >
        <template v-if="author">
          <img
            v-if="author.avatar"
            :src="author.avatar"
            :alt="author.name"
            class="h-10 w-10 rounded-full object-cover"
          />
          <div
            v-else
            class="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--glass-accent)]/10 text-sm font-semibold text-[var(--glass-accent)]"
          >
            {{ author.name.charAt(0) }}
          </div>
          <div class="flex flex-col">
            <span class="font-medium text-[var(--glass-text)]">{{ author.name }}</span>
            <span v-if="date || readTime" class="text-xs">
              <template v-if="date">{{ date }}</template>
              <template v-if="date && readTime"> · </template>
              <template v-if="readTime">{{ readTime }}</template>
            </span>
          </div>
        </template>
        <template v-else>
          <span v-if="date">{{ date }}</span>
          <span v-if="readTime"> · {{ readTime }}</span>
        </template>
      </div>
    </div>
  </SectionWrapper>
</template>
