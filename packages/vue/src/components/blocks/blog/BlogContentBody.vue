<script setup lang="ts">
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */

export interface BlogContentBodyProps {
  /** Extra classes for the prose wrapper */
  class?: string;
}

const props = withDefaults(defineProps<BlogContentBodyProps>(), {
  class: undefined,
});

/* ------------------------------------------------------------------ */
/*  Prose-style child-selector classes (avoids @tailwindcss/typography) */
/* ------------------------------------------------------------------ */

const proseClasses = cn(
  /* --- base ---------------------------------------------------- */
  'mx-auto max-w-[65ch] text-[var(--glass-text)]/80 leading-relaxed',
  'text-base sm:text-lg',

  /* --- headings ------------------------------------------------ */
  '[&_h1]:text-3xl [&_h1]:font-extrabold [&_h1]:tracking-tight [&_h1]:text-[var(--glass-text)] [&_h1]:mt-12 [&_h1]:mb-4',
  '[&_h2]:text-2xl [&_h2]:font-bold      [&_h2]:tracking-tight [&_h2]:text-[var(--glass-text)] [&_h2]:mt-10 [&_h2]:mb-3',
  '[&_h3]:text-xl  [&_h3]:font-semibold   [&_h3]:text-[var(--glass-text)] [&_h3]:mt-8  [&_h3]:mb-2',
  '[&_h4]:text-lg  [&_h4]:font-semibold   [&_h4]:text-[var(--glass-text)] [&_h4]:mt-6  [&_h4]:mb-2',

  /* --- paragraph ----------------------------------------------- */
  '[&_p]:mb-5',

  /* --- links --------------------------------------------------- */
  '[&_a]:text-[var(--glass-accent)] [&_a]:underline [&_a]:underline-offset-2',
  '[&_a:hover]:text-[var(--glass-accent)]/80',

  /* --- lists --------------------------------------------------- */
  '[&_ul]:list-disc  [&_ul]:pl-6 [&_ul]:mb-5',
  '[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5',
  '[&_li]:mb-1',

  /* --- blockquote ---------------------------------------------- */
  '[&_blockquote]:border-l-4 [&_blockquote]:border-[var(--glass-accent)]/30',
  '[&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[var(--glass-text)]/60 [&_blockquote]:my-6',

  /* --- code inline --------------------------------------------- */
  '[&_:not(pre)>code]:rounded [&_:not(pre)>code]:bg-[var(--glass-surface)]',
  '[&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:text-sm',
  '[&_:not(pre)>code]:font-mono [&_:not(pre)>code]:text-[var(--glass-accent)]',

  /* --- code block ---------------------------------------------- */
  '[&_pre]:rounded-xl [&_pre]:bg-[var(--glass-depth-1,theme(colors.zinc.900))]',
  '[&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:text-sm [&_pre]:my-6',
  '[&_pre]:border [&_pre]:border-[var(--glass-edge)]',
  '[&_pre_code]:bg-transparent [&_pre_code]:p-0',

  /* --- images -------------------------------------------------- */
  '[&_img]:rounded-xl [&_img]:my-6 [&_img]:w-full',

  /* --- hr ------------------------------------------------------ */
  '[&_hr]:my-10 [&_hr]:border-[var(--glass-edge)]',

  /* --- table --------------------------------------------------- */
  '[&_table]:w-full [&_table]:text-sm [&_table]:my-6',
  '[&_thead]:border-b [&_thead]:border-[var(--glass-edge)]',
  '[&_th]:text-left [&_th]:px-3 [&_th]:py-2 [&_th]:font-semibold [&_th]:text-[var(--glass-text)]',
  '[&_td]:px-3 [&_td]:py-2 [&_td]:border-b [&_td]:border-[var(--glass-edge)]/40',

  props.class,
);
</script>

<template>
  <div :class="proseClasses">
    <slot />
  </div>
</template>
