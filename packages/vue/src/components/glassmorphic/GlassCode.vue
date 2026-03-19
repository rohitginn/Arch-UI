<script setup lang="ts">
/**
 * GlassCode - Inline & block code display with copy-to-clipboard
 */
import { ref, computed } from 'vue';
import { cn } from '@archui/core';

interface GlassCodeProps {
  code?: string;
  language?: string;
  variant?: 'inline' | 'block';
  showLineNumbers?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<GlassCodeProps>(), {
  variant: 'inline',
  showLineNumbers: false,
  language: '',
});

const slots = defineSlots<{ default?(): any }>();

const copied = ref(false);

const lines = computed(() => (props.code ?? '').split('\n'));

const copyCode = async () => {
  if (!props.code) return;
  try {
    await navigator.clipboard.writeText(props.code);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  } catch { /* noop */ }
};
</script>

<template>
  <!-- Inline -->
  <code
    v-if="variant === 'inline'"
    :class="cn(
      'inline rounded-md px-1.5 py-0.5 text-sm font-mono',
      'bg-[var(--surface-bg-hover,#f1f5f9)] dark:bg-[rgba(255,255,255,0.08)]',
      'text-[var(--accent-primary,#3b82f6)]',
      'border border-[var(--surface-border,#e2e8f0)] dark:border-[rgba(255,255,255,0.1)]',
      $props.class,
    )"
  >
    <slot>{{ code }}</slot>
  </code>

  <!-- Block -->
  <div
    v-else
    :class="cn(
      'rounded-xl overflow-hidden',
      'bg-[var(--surface-bg,#ffffff)] dark:bg-[rgba(15,15,15,0.95)]',
      'border border-[var(--surface-border,#e2e8f0)] dark:border-[rgba(255,255,255,0.1)]',
      $props.class,
    )"
  >
    <!-- Header -->
    <div
      v-if="language || code"
      class="flex items-center justify-between px-4 py-2 border-b border-[var(--surface-border,#e2e8f0)] dark:border-[rgba(255,255,255,0.08)]"
    >
      <span
        v-if="language"
        class="text-xs font-medium text-[var(--glass-text-secondary,#475569)] dark:text-[var(--glass-text-secondary,#94a3b8)]"
      >
        {{ language }}
      </span>
      <span v-else />
      <button
        v-if="code"
        type="button"
        class="text-xs flex items-center gap-1 px-2 py-1 rounded-md cursor-pointer
          text-[var(--glass-text-secondary,#475569)] dark:text-[var(--glass-text-secondary,#94a3b8)]
          hover:bg-[var(--surface-bg-hover,#f1f5f9)] dark:hover:bg-[rgba(255,255,255,0.06)]
          transition-colors duration-200"
        @click="copyCode"
      >
        <svg v-if="!copied" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
        <svg v-else class="h-3.5 w-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
        {{ copied ? 'Copied' : 'Copy' }}
      </button>
    </div>
    <!-- Code body -->
    <pre class="overflow-x-auto p-4 text-sm font-mono leading-relaxed text-[var(--glass-text,#0f172a)] dark:text-[var(--glass-text,#e2e8f0)]"><code><template v-for="(line, idx) in lines" :key="idx"><span v-if="showLineNumbers" class="inline-block w-8 text-right mr-4 select-none text-[var(--glass-text-secondary,#94a3b8)] dark:text-[var(--glass-text-secondary,#475569)]">{{ idx + 1 }}</span>{{ line }}{{ idx < lines.length - 1 ? '\n' : '' }}</template></code></pre>
  </div>
</template>
