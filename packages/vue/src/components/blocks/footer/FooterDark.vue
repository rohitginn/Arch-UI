<script setup lang="ts">
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface FooterDarkLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterDarkProps {
  tagline?: string;
  groups: FooterDarkLinkGroup[];
  socials?: { label: string; href: string }[];
  showNewsletter?: boolean;
  copyright?: string;
  legalLinks?: { label: string; href: string }[];
}

/* ------------------------------------------------------------------ */
/*  Props & Emits                                                       */
/* ------------------------------------------------------------------ */

withDefaults(defineProps<FooterDarkProps>(), {
  tagline: undefined,
  socials: () => [],
  showNewsletter: false,
  copyright: undefined,
  legalLinks: () => [],
});

const emit = defineEmits<{
  newsletterSubmit: [email: string];
}>();

function handleSubmit(e: Event) {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const fd = new FormData(form);
  const email = fd.get('email') as string;
  if (email) emit('newsletterSubmit', email);
}
</script>

<template>
  <footer
    :class="cn(
      'bg-zinc-950 text-zinc-300',
      'border-t border-zinc-800',
    )"
  >
    <div class="mx-auto max-w-7xl px-6 py-16">
      <div class="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
        <!-- Brand column -->
        <div class="lg:col-span-3">
          <div v-if="$slots.logo" class="mb-4">
            <slot name="logo" />
          </div>
          <p v-if="tagline" class="text-sm text-zinc-400 leading-relaxed">{{ tagline }}</p>
          <div v-if="socials.length > 0" class="mt-6 flex gap-3">
            <a
              v-for="(s, i) in socials"
              :key="i"
              :href="s.href"
              :aria-label="s.label"
              :class="cn(
                'flex h-9 w-9 items-center justify-center rounded-lg',
                'border border-zinc-800 bg-zinc-900',
                'text-zinc-400 transition-all duration-200',
                'hover:-translate-y-[1px] hover:text-white hover:border-zinc-700',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500',
              )"
            >
              <slot :name="`social-icon-${i}`" />
            </a>
          </div>
        </div>

        <!-- Link columns -->
        <div v-for="(group, gi) in groups" :key="gi" class="lg:col-span-2">
          <h3 class="mb-4 text-sm font-semibold text-zinc-200">{{ group.title }}</h3>
          <ul class="space-y-2.5">
            <li v-for="(link, li) in group.links" :key="li">
              <a :href="link.href" class="text-sm text-zinc-400 transition-colors hover:text-white">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div v-if="showNewsletter" class="lg:col-span-3">
          <h3 class="mb-2 text-sm font-semibold text-zinc-200">Subscribe</h3>
          <p class="mb-4 text-sm text-zinc-400">
            Get the latest updates straight to your inbox.
          </p>
          <form @submit="handleSubmit" class="flex gap-2">
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              :class="cn(
                'flex-1 rounded-lg border border-zinc-800 bg-zinc-900',
                'px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600',
                'outline-none transition-all duration-200',
                'focus:border-zinc-600 focus:ring-2 focus:ring-zinc-700',
              )"
            />
            <button
              type="submit"
              :class="cn(
                'shrink-0 rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900',
                'transition-all duration-200',
                'hover:-translate-y-[1px] hover:shadow-lg',
                'active:scale-[0.97] active:transition-transform active:duration-75',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
              )"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div v-if="copyright || legalLinks.length > 0" class="border-t border-zinc-800">
      <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 sm:flex-row">
        <p v-if="copyright" class="text-xs text-zinc-500">{{ copyright }}</p>
        <div v-if="legalLinks.length > 0" class="flex gap-4">
          <a
            v-for="(link, i) in legalLinks"
            :key="i"
            :href="link.href"
            class="text-xs text-zinc-500 transition-colors hover:text-zinc-300"
          >
            {{ link.label }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
