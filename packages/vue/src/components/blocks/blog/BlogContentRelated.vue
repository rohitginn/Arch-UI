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

export interface BlogRelatedPost {
  title: string;
  excerpt?: string;
  image?: string;
  category?: string;
  href: string;
}

export interface BlogContentRelatedProps {
  heading?: string;
  subheading?: string;
  posts: BlogRelatedPost[];
  columns?: 2 | 3;
}

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */

const props = withDefaults(defineProps<BlogContentRelatedProps>(), {
  heading: 'Related Posts',
  subheading: undefined,
  columns: 3,
});

/* ------------------------------------------------------------------ */
/*  Grid columns                                                        */
/* ------------------------------------------------------------------ */

const gridCols = computed(() => {
  switch (props.columns) {
    case 2: return 'sm:grid-cols-2';
    case 3:
    default: return 'sm:grid-cols-2 lg:grid-cols-3';
  }
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

    <div :class="cn('grid grid-cols-1 gap-6', gridCols)">
      <a
        v-for="(post, i) in posts"
        :key="i"
        :href="post.href"
        :class="cn(
          'group flex flex-col overflow-hidden rounded-2xl',
          'border border-[var(--glass-edge)]',
          'bg-[var(--glass-surface)] backdrop-blur-md',
          'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'
        )"
      >
        <!-- Image -->
        <div v-if="post.image" class="relative aspect-[16/10] overflow-hidden">
          <img
            :src="post.image"
            :alt="post.title"
            class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <span
            v-if="post.category"
            class="absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm"
          >
            {{ post.category }}
          </span>
        </div>

        <!-- Copy -->
        <div class="p-5">
          <h3 class="text-sm font-semibold text-[var(--glass-text)] line-clamp-2 mb-1 group-hover:text-[var(--glass-accent)] transition-colors">
            {{ post.title }}
          </h3>
          <p v-if="post.excerpt" class="text-xs text-[var(--glass-text)]/60 line-clamp-2">
            {{ post.excerpt }}
          </p>
        </div>
      </a>
    </div>
  </SectionWrapper>
</template>
