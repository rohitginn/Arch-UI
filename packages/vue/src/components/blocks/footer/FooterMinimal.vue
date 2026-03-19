<script setup lang="ts">
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface FooterMinimalProps {
  links?: { label: string; href: string }[];
  socials?: { label: string; href: string }[];
  copyright?: string;
}

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */

withDefaults(defineProps<FooterMinimalProps>(), {
  links: () => [],
  socials: () => [],
  copyright: undefined,
});
</script>

<template>
  <footer
    :class="cn(
      'border-t border-[var(--glass-edge)]',
      'bg-[var(--glass-surface)] backdrop-blur-xl',
    )"
  >
    <div class="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-8 sm:flex-row sm:justify-between">
      <!-- Logo slot -->
      <div v-if="$slots.logo" class="shrink-0">
        <slot name="logo" />
      </div>

      <!-- Nav links -->
      <nav v-if="links.length > 0" class="flex flex-wrap justify-center gap-x-6 gap-y-2">
        <a
          v-for="(link, i) in links"
          :key="i"
          :href="link.href"
          class="text-sm text-[var(--glass-text)]/60 transition-colors hover:text-[var(--glass-accent)]"
        >
          {{ link.label }}
        </a>
      </nav>

      <!-- Socials -->
      <div v-if="socials.length > 0" class="flex gap-3">
        <a
          v-for="(s, i) in socials"
          :key="i"
          :href="s.href"
          :aria-label="s.label"
          :class="cn(
            'flex h-8 w-8 items-center justify-center rounded-lg',
            'text-[var(--glass-text)]/50 transition-all duration-200',
            'hover:text-[var(--glass-accent)] hover:-translate-y-[1px]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--glass-accent)]',
          )"
        >
          <slot :name="`social-icon-${i}`" />
        </a>
      </div>
    </div>

    <!-- Copyright -->
    <div v-if="copyright" class="border-t border-[var(--glass-edge)]">
      <p class="py-4 text-center text-xs text-[var(--glass-text)]/40">{{ copyright }}</p>
    </div>
  </footer>
</template>
