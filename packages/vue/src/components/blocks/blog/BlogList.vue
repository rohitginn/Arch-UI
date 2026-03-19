<script lang="ts">
import SectionWrapper from '../shared/SectionWrapper.vue';
import SectionHeading from '../shared/SectionHeading.vue';
</script>

<script setup lang="ts">
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface BlogListPost {
  title: string;
  excerpt?: string;
  image?: string;
  category?: string;
  author?: { name: string; avatar?: string };
  readTime?: string;
  date?: string;
  href: string;
}

export interface BlogListProps {
  heading?: string;
  subheading?: string;
  posts: BlogListPost[];
}

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */

withDefaults(defineProps<BlogListProps>(), {
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

    <div class="mx-auto max-w-4xl space-y-6">
      <a
        v-for="(post, i) in posts"
        :key="i"
        :href="post.href"
        :class="cn(
          'group flex flex-col sm:flex-row gap-5 rounded-2xl p-4',
          'border border-[var(--glass-edge)]',
          'bg-[var(--glass-surface)] backdrop-blur-md',
          'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg'
        )"
      >
        <!-- Thumbnail -->
        <div v-if="post.image" class="relative w-full sm:w-48 md:w-56 shrink-0 aspect-[16/10] sm:aspect-[4/3] overflow-hidden rounded-xl">
          <img
            :src="post.image"
            :alt="post.title"
            class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <!-- Copy -->
        <div class="flex flex-1 flex-col justify-center py-1">
          <span
            v-if="post.category"
            class="mb-2 inline-block self-start rounded-full px-3 py-1 text-xs font-semibold bg-[var(--glass-accent)]/10 text-[var(--glass-accent)]"
          >
            {{ post.category }}
          </span>
          <h3 class="text-base font-semibold text-[var(--glass-text)] mb-1 line-clamp-2 group-hover:text-[var(--glass-accent)] transition-colors">
            {{ post.title }}
          </h3>
          <p v-if="post.excerpt" class="text-sm text-[var(--glass-text)]/60 line-clamp-2 mb-3">
            {{ post.excerpt }}
          </p>
          <div class="flex items-center gap-2 text-xs text-[var(--glass-text)]/40 mt-auto">
            <template v-if="post.author">
              <img
                v-if="post.author.avatar"
                :src="post.author.avatar"
                :alt="post.author.name"
                class="h-5 w-5 rounded-full object-cover"
              />
              <div
                v-else
                class="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--glass-accent)]/10 text-[8px] font-semibold text-[var(--glass-accent)]"
              >
                {{ post.author.name.charAt(0) }}
              </div>
              <span>{{ post.author.name }}</span>
            </template>
            <span v-if="post.date">· {{ post.date }}</span>
            <span v-if="post.readTime">· {{ post.readTime }}</span>
          </div>
        </div>
      </a>
    </div>
  </SectionWrapper>
</template>
