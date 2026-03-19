<script lang="ts">
import SectionWrapper from '../shared/SectionWrapper.vue';
import SectionHeading from '../shared/SectionHeading.vue';
</script>

<script setup lang="ts">
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface BlogFeaturedPost {
  title: string;
  excerpt?: string;
  image?: string;
  category?: string;
  author?: { name: string; avatar?: string };
  readTime?: string;
  date?: string;
  href: string;
}

export interface BlogFeaturedProps {
  heading?: string;
  subheading?: string;
  featured: BlogFeaturedPost;
  posts: BlogFeaturedPost[];
}

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */

withDefaults(defineProps<BlogFeaturedProps>(), {
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

    <!-- Featured hero card -->
    <a
      :href="featured.href"
      :class="cn(
        'group relative block mb-10 rounded-2xl overflow-hidden',
        'border border-[var(--glass-edge)]',
        'bg-[var(--glass-surface)] backdrop-blur-md',
        'transition-all duration-300 hover:shadow-xl'
      )"
    >
      <div class="grid md:grid-cols-2">
        <div v-if="featured.image" class="relative aspect-[16/10] md:aspect-auto overflow-hidden">
          <img
            :src="featured.image"
            :alt="featured.title"
            class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div class="flex flex-col justify-center p-8 md:p-10">
          <span
            v-if="featured.category"
            class="mb-3 inline-block self-start rounded-full px-3 py-1 text-xs font-semibold bg-[var(--glass-accent)]/10 text-[var(--glass-accent)]"
          >
            {{ featured.category }}
          </span>
          <h3 class="text-xl md:text-2xl font-bold text-[var(--glass-text)] mb-3 group-hover:text-[var(--glass-accent)] transition-colors">
            {{ featured.title }}
          </h3>
          <p v-if="featured.excerpt" class="text-sm text-[var(--glass-text)]/60 mb-4 line-clamp-3">
            {{ featured.excerpt }}
          </p>
          <div class="flex items-center gap-2 text-xs text-[var(--glass-text)]/50">
            <span v-if="featured.author?.name">{{ featured.author.name }}</span>
            <span v-if="featured.date">· {{ featured.date }}</span>
            <span v-if="featured.readTime">· {{ featured.readTime }}</span>
          </div>
        </div>
      </div>
    </a>

    <!-- Grid -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <a
        v-for="(post, i) in posts"
        :key="i"
        :href="post.href"
        :class="cn(
          'group flex flex-col rounded-2xl overflow-hidden',
          'border border-[var(--glass-edge)]',
          'bg-[var(--glass-surface)] backdrop-blur-md',
          'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'
        )"
      >
        <div v-if="post.image" class="relative aspect-[16/10] overflow-hidden">
          <img
            :src="post.image"
            :alt="post.title"
            class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div class="flex flex-1 flex-col p-5">
          <span
            v-if="post.category"
            class="mb-2 inline-block self-start rounded-full px-3 py-1 text-xs font-semibold bg-[var(--glass-accent)]/10 text-[var(--glass-accent)]"
          >
            {{ post.category }}
          </span>
          <h3 class="text-base font-semibold text-[var(--glass-text)] mb-2 line-clamp-2 group-hover:text-[var(--glass-accent)] transition-colors">
            {{ post.title }}
          </h3>
          <p v-if="post.excerpt" class="flex-1 text-sm text-[var(--glass-text)]/60 line-clamp-2 mb-4">
            {{ post.excerpt }}
          </p>
          <div class="flex items-center gap-2 text-xs text-[var(--glass-text)]/40 mt-auto">
            <span v-if="post.author?.name">{{ post.author.name }}</span>
            <span v-if="post.date">· {{ post.date }}</span>
          </div>
        </div>
      </a>
    </div>
  </SectionWrapper>
</template>
