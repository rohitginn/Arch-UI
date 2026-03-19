<script lang="ts">
import SectionWrapper from '../shared/SectionWrapper.vue';
import SectionHeading from '../shared/SectionHeading.vue';
</script>

<script setup lang="ts">
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface BlogPost {
  title: string;
  excerpt?: string;
  image?: string;
  category?: string;
  author?: { name: string; avatar?: string };
  readTime?: string;
  date?: string;
  href: string;
}

export interface BlogGridProps {
  heading?: string;
  subheading?: string;
  posts: BlogPost[];
  columns?: 2 | 3;
}

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */

withDefaults(defineProps<BlogGridProps>(), {
  heading: undefined,
  subheading: undefined,
  columns: 3,
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
        'grid gap-6',
        columns === 2 && 'md:grid-cols-2 max-w-4xl mx-auto',
        columns === 3 && 'md:grid-cols-2 lg:grid-cols-3'
      )"
    >
      <a
        v-for="(post, i) in posts"
        :key="i"
        :href="post.href"
        :class="cn(
          'group flex flex-col rounded-2xl overflow-hidden',
          'border border-[var(--glass-edge)]',
          'bg-[var(--glass-surface)] backdrop-blur-md',
          'transition-all duration-300',
          'hover:-translate-y-1 hover:shadow-lg'
        )"
      >
        <!-- Cover image -->
        <div v-if="post.image" class="relative aspect-[16/10] overflow-hidden">
          <img
            :src="post.image"
            :alt="post.title"
            class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <span
            v-if="post.category"
            class="absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold bg-[var(--glass-accent)] text-white"
          >
            {{ post.category }}
          </span>
        </div>

        <div class="flex flex-1 flex-col p-5">
          <span
            v-if="!post.image && post.category"
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

          <div class="flex items-center gap-2 mt-auto">
            <template v-if="post.author">
              <img
                v-if="post.author.avatar"
                :src="post.author.avatar"
                :alt="post.author.name"
                class="h-6 w-6 rounded-full object-cover"
              />
              <div
                v-else
                class="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--glass-accent)]/10 text-[10px] font-semibold text-[var(--glass-accent)]"
              >
                {{ post.author.name.charAt(0) }}
              </div>
              <span class="text-xs font-medium text-[var(--glass-text)]/70">{{ post.author.name }}</span>
            </template>
            <span v-if="post.date" class="text-xs text-[var(--glass-text)]/40 ml-auto">{{ post.date }}</span>
            <span v-if="post.readTime" class="text-xs text-[var(--glass-text)]/40">· {{ post.readTime }}</span>
          </div>
        </div>
      </a>
    </div>
  </SectionWrapper>
</template>
