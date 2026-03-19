<script setup lang="ts">
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface BlogFilterCategory {
  label: string;
  value: string;
  count?: number;
}

export interface BlogFilterTag {
  label: string;
  value: string;
}

export interface BlogFilterRecentPost {
  title: string;
  date?: string;
  href: string;
  image?: string;
}

export interface SidebarBlogFilterProps {
  categories?: BlogFilterCategory[];
  tags?: BlogFilterTag[];
  recentPosts?: BlogFilterRecentPost[];
  selectedCategories?: string[];
  selectedTags?: string[];
  searchValue?: string;
}

/* ------------------------------------------------------------------ */
/*  Props & Emits                                                       */
/* ------------------------------------------------------------------ */

const props = withDefaults(defineProps<SidebarBlogFilterProps>(), {
  categories: () => [],
  tags: () => [],
  recentPosts: () => [],
  selectedCategories: () => [],
  selectedTags: () => [],
  searchValue: '',
});

const emit = defineEmits<{
  'update:selectedCategories': [categories: string[]];
  'update:selectedTags': [tags: string[]];
  'update:searchValue': [value: string];
}>();

/* ------------------------------------------------------------------ */
/*  Logic                                                               */
/* ------------------------------------------------------------------ */

function toggleCategory(value: string) {
  const next = props.selectedCategories.includes(value)
    ? props.selectedCategories.filter((c) => c !== value)
    : [...props.selectedCategories, value];
  emit('update:selectedCategories', next);
}

function toggleTag(value: string) {
  const next = props.selectedTags.includes(value)
    ? props.selectedTags.filter((t) => t !== value)
    : [...props.selectedTags, value];
  emit('update:selectedTags', next);
}
</script>

<template>
  <aside
    :class="cn(
      'w-72 space-y-8 rounded-2xl p-5',
      'border border-[var(--glass-edge)]',
      'bg-[var(--glass-surface)] backdrop-blur-xl',
    )"
  >
    <!-- Search -->
    <div>
      <label class="mb-2 block text-xs font-semibold uppercase tracking-widest text-[var(--glass-text)]/40">
        Search
      </label>
      <input
        type="text"
        placeholder="Search posts…"
        :value="searchValue"
        @input="emit('update:searchValue', ($event.target as HTMLInputElement).value)"
        :class="cn(
          'w-full rounded-lg border border-[var(--glass-edge)] bg-[var(--glass-depth-1,transparent)]',
          'px-3 py-2 text-sm text-[var(--glass-text)] placeholder:text-[var(--glass-text)]/30',
          'outline-none transition-all duration-200',
          'focus:border-[var(--glass-accent)] focus:ring-2 focus:ring-[var(--glass-accent)]/20',
        )"
      />
    </div>

    <!-- Categories -->
    <div v-if="categories.length > 0">
      <span class="mb-3 block text-xs font-semibold uppercase tracking-widest text-[var(--glass-text)]/40">
        Categories
      </span>
      <ul class="space-y-2">
        <li v-for="cat in categories" :key="cat.value">
          <label class="flex cursor-pointer items-center gap-2 text-sm text-[var(--glass-text)]/70 hover:text-[var(--glass-text)] transition-colors">
            <input
              type="checkbox"
              :checked="selectedCategories.includes(cat.value)"
              @change="toggleCategory(cat.value)"
              class="h-4 w-4 rounded border-[var(--glass-edge)] accent-[var(--glass-accent)]"
            />
            <span class="flex-1">{{ cat.label }}</span>
            <span v-if="cat.count != null" class="text-xs text-[var(--glass-text)]/40">{{ cat.count }}</span>
          </label>
        </li>
      </ul>
    </div>

    <!-- Tag Cloud -->
    <div v-if="tags.length > 0">
      <span class="mb-3 block text-xs font-semibold uppercase tracking-widest text-[var(--glass-text)]/40">
        Tags
      </span>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="tag in tags"
          :key="tag.value"
          @click="toggleTag(tag.value)"
          :class="cn(
            'rounded-full px-3 py-1 text-xs font-medium transition-all duration-200',
            'border border-[var(--glass-edge)]',
            'hover:-translate-y-[1px]',
            'active:scale-[0.97] active:transition-transform active:duration-75',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--glass-accent)] focus-visible:ring-offset-2',
            selectedTags.includes(tag.value)
              ? 'bg-[var(--glass-accent)] text-white border-transparent'
              : 'bg-[var(--glass-surface)] text-[var(--glass-text)]/60 hover:bg-[var(--glass-accent)]/10',
          )"
        >
          {{ tag.label }}
        </button>
      </div>
    </div>

    <!-- Recent Posts -->
    <div v-if="recentPosts.length > 0">
      <span class="mb-3 block text-xs font-semibold uppercase tracking-widest text-[var(--glass-text)]/40">
        Recent Posts
      </span>
      <ul class="space-y-3">
        <li v-for="(post, i) in recentPosts" :key="i">
          <a :href="post.href" class="group flex items-start gap-3 text-sm transition-colors">
            <img
              v-if="post.image"
              :src="post.image"
              :alt="post.title"
              class="h-12 w-12 shrink-0 rounded-lg object-cover"
              loading="lazy"
            />
            <div class="min-w-0">
              <p class="line-clamp-2 font-medium text-[var(--glass-text)]/70 group-hover:text-[var(--glass-accent)] transition-colors">
                {{ post.title }}
              </p>
              <span v-if="post.date" class="text-xs text-[var(--glass-text)]/40">{{ post.date }}</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>
