<script setup lang="ts">
/**
 * GlassRoot - Universal theme provider managing dark/light mode + accent color
 */
import { ref, provide, watch, onMounted, computed } from 'vue';

export type ThemeMode = 'light' | 'dark' | 'system';
export type AccentTheme = 'default' | 'ember' | 'graphite' | 'slate' | 'sage' | 'crimson' | 'dusk' | 'iron';

interface GlassRootProps {
  defaultMode?: ThemeMode;
  defaultAccent?: AccentTheme;
  class?: string;
}

const props = withDefaults(defineProps<GlassRootProps>(), {
  defaultMode: 'system',
  defaultAccent: 'default',
});

const mode = ref<ThemeMode>(props.defaultMode);
const accent = ref<AccentTheme>(props.defaultAccent);

const resolvedDark = computed(() => {
  if (mode.value === 'system') {
    return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return mode.value === 'dark';
});

const applyTheme = () => {
  const el = document.documentElement;
  el.classList.toggle('dark', resolvedDark.value);
  el.classList.toggle('light', !resolvedDark.value);

  if (accent.value !== 'default') {
    el.setAttribute('data-accent', accent.value);
  } else {
    el.removeAttribute('data-accent');
  }
};

watch([mode, accent], applyTheme, { immediate: false });

onMounted(() => {
  applyTheme();
  if (mode.value === 'system') {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', applyTheme);
  }
});

const setMode = (m: ThemeMode) => { mode.value = m; };
const setAccent = (a: AccentTheme) => { accent.value = a; };

provide('glass-root', { mode, accent, resolvedDark, setMode, setAccent });

defineExpose({ mode, accent, resolvedDark, setMode, setAccent });
</script>

<template>
  <div :class="$props.class">
    <slot />
  </div>
</template>
