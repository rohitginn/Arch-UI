<script setup lang="ts">
/**
 * GlassMegaMenu - Wide dropdown navigation panel for marketing sites
 */
import { ref, onMounted, onUnmounted } from 'vue';
import { cn } from '@archui/core';

interface MegaMenuItem {
  label: string;
  href?: string;
  description?: string;
}

interface MegaMenuColumn {
  title: string;
  items: MegaMenuItem[];
}

interface MegaMenuFeatured {
  title: string;
  description: string;
  href?: string;
  image?: string;
}

interface MegaMenuSection {
  label: string;
  columns: MegaMenuColumn[];
  featured?: MegaMenuFeatured;
}

interface GlassMegaMenuProps {
  sections: MegaMenuSection[];
  class?: string;
}

defineProps<GlassMegaMenuProps>();

const activeIndex = ref<number | null>(null);
let closeTimeout: ReturnType<typeof setTimeout> | undefined;

const containerRef = ref<HTMLElement | null>(null);

const open = (idx: number) => {
  clearTimeout(closeTimeout);
  activeIndex.value = idx;
};

const startClose = () => {
  closeTimeout = setTimeout(() => (activeIndex.value = null), 200);
};

const cancelClose = () => clearTimeout(closeTimeout);

const onEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape') activeIndex.value = null;
};

const onClickOutside = (e: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    activeIndex.value = null;
  }
};

onMounted(() => {
  document.addEventListener('keydown', onEscape);
  document.addEventListener('mousedown', onClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('keydown', onEscape);
  document.removeEventListener('mousedown', onClickOutside);
});
</script>

<template>
  <div :class="cn('relative', $props.class)">
    <div ref="containerRef">
      <nav class="flex items-center gap-1" role="menubar">
        <button
          v-for="(section, idx) in sections"
          :key="section.label"
          type="button"
          role="menuitem"
          :aria-expanded="activeIndex === idx"
          aria-haspopup="true"
          :class="cn(
            'px-3 py-2 text-sm font-medium rounded-lg cursor-pointer transition-colors duration-200',
            'text-[var(--glass-text,#0f172a)] dark:text-[var(--glass-text,#f8fafc)]',
            'hover:bg-[var(--surface-bg-hover,#f1f5f9)]',
            'dark:hover:bg-[var(--glass-bg-dark-hover,rgba(255,255,255,0.06))]',
            activeIndex === idx && 'bg-[var(--surface-bg-hover,#f1f5f9)] dark:bg-[var(--glass-bg-dark-hover,rgba(255,255,255,0.06))]',
          )"
          @mouseenter="open(idx)"
          @mouseleave="startClose"
          @focus="open(idx)"
          @click="activeIndex = activeIndex === idx ? null : idx"
        >
          {{ section.label }}
          <svg
            class="ml-1 inline h-3 w-3 transition-transform duration-200"
            :class="{ 'rotate-180': activeIndex === idx }"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </nav>

      <!-- Panel -->
      <div
        v-if="activeIndex !== null"
        role="menu"
        :class="cn(
          'absolute left-0 top-full mt-2 w-full min-w-[600px] rounded-2xl p-6 z-50',
          'bg-[var(--surface-bg,#ffffff)]/95 backdrop-blur-xl',
          'dark:bg-[var(--surface-bg-hover,rgba(20,20,20,0.95))]',
          'border border-[var(--surface-border,#e2e8f0)]',
          'dark:border-[var(--surface-border,rgba(255,255,255,0.1))]',
          'shadow-2xl dark:shadow-[0_16px_48px_rgba(0,0,0,0.4)]',
        )"
        @mouseenter="cancelClose"
        @mouseleave="startClose"
      >
        <div class="flex gap-8">
          <!-- Link columns -->
          <div class="flex flex-1 gap-8">
            <div v-for="col in sections[activeIndex].columns" :key="col.title" class="flex-1">
              <h3 class="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--glass-text-secondary,#475569)] dark:text-[var(--glass-text-secondary,#94a3b8)]">
                {{ col.title }}
              </h3>
              <ul class="space-y-1">
                <li v-for="item in col.items" :key="item.label">
                  <a
                    :href="item.href ?? '#'"
                    :class="cn(
                      'flex items-start gap-3 rounded-lg px-3 py-2 -mx-3',
                      'transition-colors duration-200',
                      'hover:bg-[var(--accent-subtle,#dbeafe)]',
                      'dark:hover:bg-[var(--accent-subtle,rgba(59,130,246,0.1))]',
                    )"
                    @click="activeIndex = null"
                  >
                    <div>
                      <span class="block text-sm font-medium text-[var(--glass-text,#0f172a)] dark:text-[var(--glass-text,#f8fafc)]">
                        {{ item.label }}
                      </span>
                      <span
                        v-if="item.description"
                        class="block text-xs text-[var(--glass-text-secondary,#475569)] dark:text-[var(--glass-text-secondary,#94a3b8)] mt-0.5"
                      >
                        {{ item.description }}
                      </span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- Featured card -->
          <div
            v-if="sections[activeIndex].featured"
            :class="cn(
              'w-64 flex-shrink-0 rounded-xl p-4',
              'bg-[var(--accent-subtle,#dbeafe)]',
              'dark:bg-[var(--accent-subtle,rgba(59,130,246,0.1))]',
            )"
          >
            <img
              v-if="sections[activeIndex].featured!.image"
              :src="sections[activeIndex].featured!.image"
              alt=""
              class="mb-3 h-32 w-full rounded-lg object-cover"
            />
            <h4 class="text-sm font-semibold text-[var(--glass-text,#0f172a)] dark:text-[var(--glass-text,#f8fafc)]">
              {{ sections[activeIndex].featured!.title }}
            </h4>
            <p class="mt-1 text-xs text-[var(--glass-text-secondary,#475569)] dark:text-[var(--glass-text-secondary,#94a3b8)]">
              {{ sections[activeIndex].featured!.description }}
            </p>
            <a
              v-if="sections[activeIndex].featured!.href"
              :href="sections[activeIndex].featured!.href"
              class="mt-3 inline-block text-xs font-medium text-[var(--accent-primary,#3b82f6)] hover:underline"
            >
              Learn more →
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
