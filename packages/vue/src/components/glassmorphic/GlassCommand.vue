<script setup lang="ts">
/**
 * GlassCommand - Premium glassmorphic command palette for Vue 3
 * Token-based theming via glass-tokens.css
 */

import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';
import { cn } from '@archui/core';

interface CommandItem {
  id: string;
  label: string;
  icon?: string;
  shortcut?: string;
  group?: string;
  disabled?: boolean;
}

type GlassVariant = 'default' | 'solid' | 'bordered';

interface GlassCommandProps {
  open?: boolean;
  placeholder?: string;
  items?: CommandItem[];
  emptyMessage?: string;
  variant?: GlassVariant;
  class?: string;
}

const props = withDefaults(defineProps<GlassCommandProps>(), {
  open: false,
  placeholder: 'Type a command or search…',
  items: () => [],
  emptyMessage: 'No results found.',
  variant: 'default',
});

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void;
  (e: 'select', item: CommandItem): void;
}>();

const query = ref('');
const focusIndex = ref(0);
const inputRef = ref<HTMLInputElement | null>(null);
const listRef = ref<HTMLDivElement | null>(null);

// Variant class maps
const variantSurface: Record<GlassVariant, string> = {
  default: 'bg-[var(--glass-surface)] backdrop-blur-xl shadow-[var(--glass-depth-md)]',
  solid: 'bg-[var(--glass-solid-bg)] backdrop-blur-2xl shadow-[var(--glass-solid-shadow)]',
  bordered: 'bg-[var(--glass-bordered-bg)] backdrop-blur-lg shadow-[var(--glass-bordered-shadow)]',
};
const variantBorder: Record<GlassVariant, string> = {
  default: 'border border-[var(--glass-edge)]',
  solid: 'border border-[var(--glass-solid-border)]',
  bordered: 'border border-[var(--glass-bordered-border)]',
};

const filtered = computed(() => {
  if (!query.value.trim()) return props.items;
  const q = query.value.toLowerCase();
  return props.items.filter(
    (item) =>
      item.label.toLowerCase().includes(q) ||
      item.group?.toLowerCase().includes(q),
  );
});

const grouped = computed(() => {
  const groups = new Map<string, CommandItem[]>();
  filtered.value.forEach((item) => {
    const key = item.group || '';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(item);
  });
  return groups;
});

const flatItems = computed(() => filtered.value.filter((i) => !i.disabled));

watch(query, () => { focusIndex.value = 0; });

watch(
  () => props.open,
  (val) => {
    if (val) {
      query.value = '';
      focusIndex.value = 0;
      nextTick(() => { setTimeout(() => inputRef.value?.focus(), 50); });
    }
  },
);

const handleGlobalKeydown = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    emit('update:open', !props.open);
  }
};

onMounted(() => { document.addEventListener('keydown', handleGlobalKeydown); });
onUnmounted(() => { document.removeEventListener('keydown', handleGlobalKeydown); });

const handleKeyDown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();
      focusIndex.value = (focusIndex.value + 1) % Math.max(flatItems.value.length, 1);
      break;
    case 'ArrowUp':
      e.preventDefault();
      focusIndex.value = focusIndex.value <= 0 ? Math.max(flatItems.value.length - 1, 0) : focusIndex.value - 1;
      break;
    case 'Enter':
      e.preventDefault();
      if (flatItems.value[focusIndex.value]) {
        emit('select', flatItems.value[focusIndex.value]);
        emit('update:open', false);
      }
      break;
    case 'Escape':
      e.preventDefault();
      emit('update:open', false);
      break;
  }
};

watch(focusIndex, () => {
  nextTick(() => {
    if (!listRef.value) return;
    const el = listRef.value.querySelector('[data-active="true"]');
    el?.scrollIntoView({ block: 'nearest' });
  });
});

const handleOverlayClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) emit('update:open', false);
};

const selectItem = (item: CommandItem) => {
  emit('select', item);
  emit('update:open', false);
};

const getFlatIndex = (item: CommandItem): number => flatItems.value.indexOf(item);
</script>

<template>
  <Teleport to="body">
    <Transition enter-active-class="transition-opacity duration-150 ease-out" enter-from-class="opacity-0"
      enter-to-class="opacity-100" leave-active-class="transition-opacity duration-100 ease-in"
      leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="open" :class="cn(
        'fixed inset-0 z-50 flex items-start justify-center pt-[20vh]',
        'bg-black/20 dark:bg-black/40',
        'backdrop-blur-[2px]',
      )" @click="handleOverlayClick" role="dialog" aria-modal="true" aria-label="Command palette">
        <Transition enter-active-class="transition-all duration-200"
          enter-from-class="opacity-0 scale-95 -translate-y-2" enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-100" leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95" appear>
          <div :class="cn(
            'w-full max-w-[520px] mx-4',
            'rounded-2xl overflow-hidden',
            variantSurface[variant],
            variantBorder[variant],
            'shadow-[var(--glass-highlight)]',
            props.class,
          )" @keydown="handleKeyDown">
            <!-- Search Input -->
            <div :class="cn('flex items-center gap-3 px-4 py-3 border-b border-[var(--glass-divider)]')">
              <svg class="h-4 w-4 shrink-0 text-[var(--glass-text-muted)]" xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input ref="inputRef" v-model="query" :placeholder="placeholder"
                :class="cn('flex-1 bg-transparent text-sm outline-none text-[var(--glass-text)] placeholder:text-[var(--glass-text-placeholder)]')" />
            </div>

            <!-- Command List -->
            <div ref="listRef" class="max-h-[320px] overflow-y-auto overscroll-contain py-1">
              <slot>
                <template v-if="filtered.length === 0">
                  <div class="py-8 text-center text-sm text-[var(--glass-text-muted)]">
                    {{ emptyMessage }}
                  </div>
                </template>
                <template v-else>
                  <template v-for="[group, groupItems] in grouped" :key="group || '__default'">
                    <div class="px-1.5 py-1.5">
                      <div v-if="group"
                        class="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--glass-text-muted)]">
                        {{ group }}
                      </div>
                      <div class="space-y-0.5">
                        <button v-for="item in groupItems" :key="item.id" type="button" :disabled="item.disabled"
                          :data-active="getFlatIndex(item) === focusIndex || undefined" :class="cn(
                            'group relative flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm',
                            'transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]',
                            'outline-none text-[var(--glass-text-secondary)]',
                            !item.disabled && [
                              'hover:bg-[var(--glass-surface-hover)]',
                              'hover:text-[var(--glass-text)]',
                            ],
                            getFlatIndex(item) === focusIndex && [
                              'bg-[var(--glass-surface-active)]',
                              'text-[var(--glass-text)]',
                            ],
                            item.disabled && 'opacity-40 pointer-events-none',
                          )" @click="selectItem(item)">
                          <span class="flex-1 truncate">{{ item.label }}</span>
                          <span v-if="item.shortcut" class="ml-auto flex items-center gap-1">
                            <kbd v-for="(key, i) in item.shortcut.split('+')" :key="i" :class="cn(
                              'inline-flex h-5 min-w-[20px] items-center justify-center rounded px-1',
                              'text-[10px] font-medium leading-none',
                              'bg-[var(--glass-surface-hover)]',
                              'text-[var(--glass-text-muted)]',
                              'border border-[var(--glass-divider)]',
                            )">
                              {{ key.trim() }}
                            </kbd>
                          </span>
                        </button>
                      </div>
                    </div>
                  </template>
                </template>
              </slot>
            </div>

            <!-- Footer -->
            <div
              :class="cn('flex items-center justify-between px-4 py-2 border-t border-[var(--glass-divider)] text-[11px] text-[var(--glass-text-muted)]')">
              <div class="flex items-center gap-3">
                <span class="flex items-center gap-1">
                  <kbd
                    class="inline-flex h-4 min-w-[16px] items-center justify-center rounded bg-[var(--glass-surface-hover)] px-1 text-[10px] border border-[var(--glass-divider)]">↑</kbd>
                  <kbd
                    class="inline-flex h-4 min-w-[16px] items-center justify-center rounded bg-[var(--glass-surface-hover)] px-1 text-[10px] border border-[var(--glass-divider)]">↓</kbd>
                  <span>navigate</span>
                </span>
                <span class="flex items-center gap-1">
                  <kbd
                    class="inline-flex h-4 min-w-[16px] items-center justify-center rounded bg-[var(--glass-surface-hover)] px-1 text-[10px] border border-[var(--glass-divider)]">↵</kbd>
                  <span>select</span>
                </span>
              </div>
              <span class="flex items-center gap-1">
                <kbd
                  class="inline-flex h-4 min-w-[16px] items-center justify-center rounded bg-[var(--glass-surface-hover)] px-1 text-[10px] border border-[var(--glass-divider)]">esc</kbd>
                <span>close</span>
              </span>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
