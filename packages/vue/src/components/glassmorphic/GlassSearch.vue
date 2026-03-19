<script setup lang="ts">
/**
 * GlassSearch - Token-based glassmorphic search bar for Vue 3
 */
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { cn } from '@archui/core';

interface SearchSuggestion {
  id: string;
  label: string;
  description?: string;
}

type GlassVariant = 'default' | 'solid' | 'bordered';

interface Props {
  modelValue?: string;
  suggestions?: SearchSuggestion[];
  placeholder?: string;
  variant?: GlassVariant;
  class?: string;
}

const variantSurface: Record<GlassVariant, string> = {
  default: 'bg-[var(--glass-surface)] backdrop-blur-xl shadow-[var(--glass-depth-sm)]',
  solid: 'bg-[var(--glass-solid-bg)] backdrop-blur-2xl shadow-[var(--glass-solid-shadow)]',
  bordered: 'bg-[var(--glass-bordered-bg)] backdrop-blur-lg shadow-[var(--glass-bordered-shadow)]',
};
const variantBorder: Record<GlassVariant, string> = {
  default: 'border border-[var(--glass-edge)]',
  solid: 'border border-[var(--glass-solid-border)]',
  bordered: 'border border-[var(--glass-bordered-border)]',
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  suggestions: () => [],
  placeholder: 'Search…',
  variant: 'default',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'select', suggestion: SearchSuggestion): void;
  (e: 'submit', query: string): void;
}>();

const focused = ref(false);
const focusIndex = ref(-1);
const inputRef = ref<HTMLInputElement | null>(null);
const containerRef = ref<HTMLDivElement | null>(null);

const showSuggestions = computed(() => focused.value && props.suggestions.length > 0 && props.modelValue.length > 0);

const handleInput = (val: string) => {
  emit('update:modelValue', val);
  focusIndex.value = -1;
};

const selectSuggestion = (s: SearchSuggestion) => {
  emit('update:modelValue', s.label);
  emit('select', s);
  focused.value = false;
  inputRef.value?.blur();
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (!showSuggestions.value) {
    if (e.key === 'Enter') { e.preventDefault(); emit('submit', props.modelValue); }
    return;
  }
  switch (e.key) {
    case 'ArrowDown': e.preventDefault(); focusIndex.value = (focusIndex.value + 1) % props.suggestions.length; break;
    case 'ArrowUp': e.preventDefault(); focusIndex.value = focusIndex.value <= 0 ? props.suggestions.length - 1 : focusIndex.value - 1; break;
    case 'Enter': e.preventDefault(); if (focusIndex.value >= 0) selectSuggestion(props.suggestions[focusIndex.value]); else emit('submit', props.modelValue); break;
    case 'Escape': e.preventDefault(); focused.value = false; inputRef.value?.blur(); break;
  }
};

const handleClickOutside = (e: MouseEvent) => {
  if (!containerRef.value?.contains(e.target as Node)) focused.value = false;
};

onMounted(() => document.addEventListener('mousedown', handleClickOutside));
onUnmounted(() => document.removeEventListener('mousedown', handleClickOutside));
</script>

<template>
  <div ref="containerRef" :class="cn('relative', props.class)">
    <div :class="cn(
      'relative flex items-center gap-2.5 px-4 h-11 rounded-xl transition-all duration-250 ease-out',
      variantSurface[variant],
      variantBorder[variant],
      focused && 'ring-2 ring-[var(--glass-accent)]/20 border-[var(--glass-accent)]/30',
    )">
      <svg class="h-4 w-4 shrink-0 text-[var(--glass-text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input ref="inputRef" :value="modelValue" @input="handleInput(($event.target as HTMLInputElement).value)"
        @focus="focused = true" @keydown="handleKeyDown" :placeholder="placeholder"
        class="flex-1 bg-transparent text-sm outline-none text-[var(--glass-text)] placeholder:text-[var(--glass-text-placeholder)]" />
      <button v-if="modelValue" type="button"
        class="shrink-0 p-0.5 rounded text-[var(--glass-text-muted)] hover:text-[var(--glass-text)] transition-colors"
        @click="handleInput(''); inputRef?.focus()">
        <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
    <Transition enter-active-class="transition-all duration-150 ease-out" enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0" leave-active-class="transition-all duration-100"
      leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="showSuggestions" :class="cn(
        'absolute z-50 left-0 right-0 mt-1.5 p-1.5 rounded-xl',
        variantSurface[variant],
        variantBorder[variant],
      )">
        <button v-for="(s, i) in suggestions" :key="s.id" type="button" :class="cn(
          'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-all duration-150 outline-none',
          i === focusIndex ? 'bg-[var(--glass-surface-active)] text-[var(--glass-text)]' : 'text-[var(--glass-text-secondary)] hover:bg-[var(--glass-surface-hover)]',
        )" @click="selectSuggestion(s)" @mouseenter="focusIndex = i">
          <div class="min-w-0">
            <p class="truncate font-medium">{{ s.label }}</p>
            <p v-if="s.description" class="truncate text-xs text-[var(--glass-text-muted)] mt-0.5">{{ s.description }}
            </p>
          </div>
        </button>
      </div>
    </Transition>
  </div>
</template>
