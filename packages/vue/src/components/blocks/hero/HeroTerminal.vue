<script setup lang="ts">
/**
 * HeroTerminal — Developer-focused hero with typing-animation terminal.
 */

import { ref, onUnmounted } from 'vue';
import { cn } from '@archui/core';

interface TerminalLine {
  text: string;
  isOutput?: boolean;
  delay?: number;
}

export interface HeroTerminalProps {
  badge?: string;
  heading: string;
  subheading?: string;
  lines: TerminalLine[];
  terminalTitle?: string;
  typingSpeed?: number;
  primaryCta?: { label: string; href: string };
  class?: string;
}

const props = withDefaults(defineProps<HeroTerminalProps>(), {
  terminalTitle: 'Terminal',
  typingSpeed: 40,
});

// Terminal animation state
const displayedLines = ref<string[]>([]);
const currentLine = ref(0);
const currentChar = ref(0);
const showCursor = ref(true);

let cursorInterval: ReturnType<typeof setInterval>;
let typingTimeout: ReturnType<typeof setTimeout>;

cursorInterval = setInterval(() => {
  showCursor.value = !showCursor.value;
}, 530);

const advanceLine = () => {
  if (currentLine.value >= props.lines.length) return;

  const line = props.lines[currentLine.value];
  const fullText = line.isOutput ? line.text : `$ ${line.text}`;

  if (line.isOutput) {
    typingTimeout = setTimeout(() => {
      displayedLines.value.push(fullText);
      currentLine.value++;
      currentChar.value = 0;
      advanceLine();
    }, line.delay ?? 300);
    return;
  }

  const typeChar = () => {
    if (currentChar.value < fullText.length) {
      displayedLines.value[currentLine.value] = fullText.slice(0, currentChar.value + 1);
      currentChar.value++;
      typingTimeout = setTimeout(typeChar, props.typingSpeed);
    } else {
      typingTimeout = setTimeout(() => {
        currentLine.value++;
        currentChar.value = 0;
        advanceLine();
      }, 400);
    }
  };

  // Initialize empty string for this line
  if (!displayedLines.value[currentLine.value]) {
    displayedLines.value[currentLine.value] = '';
  }

  typingTimeout = setTimeout(typeChar, line.delay ?? 500);
};

advanceLine();

onUnmounted(() => {
  clearInterval(cursorInterval);
  clearTimeout(typingTimeout);
});
</script>

<template>
  <SectionWrapper padding="hero" :class="props.class">
    <template #background><slot name="background" /></template>

    <div class="flex flex-col items-center text-center gap-10">
      <div class="max-w-3xl">
        <span
          v-if="badge"
          :class="cn(
            'inline-flex items-center mb-6',
            'rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase',
            'bg-blue-500/10 text-blue-600 border border-blue-500/20',
            'dark:bg-blue-400/10 dark:text-blue-400 dark:border-blue-400/20'
          )"
        >{{ badge }}</span>

        <h1 :class="cn('text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1]', 'text-slate-900 dark:text-white')">
          {{ heading }}
        </h1>

        <p
          v-if="subheading"
          :class="cn('mt-6 text-lg lg:text-xl leading-relaxed max-w-xl mx-auto', 'text-slate-600 dark:text-slate-400')"
        >{{ subheading }}</p>
      </div>

      <!-- Terminal -->
      <div :class="cn('w-full max-w-2xl rounded-xl overflow-hidden', 'border border-white/10', 'bg-zinc-900/90 backdrop-blur-xl', 'shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)]')">
        <div class="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
          <div class="flex gap-1.5">
            <span class="w-3 h-3 rounded-full bg-red-500/80" />
            <span class="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span class="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span class="text-xs text-zinc-500 ml-2 font-mono">{{ terminalTitle }}</span>
        </div>
        <div class="p-4 font-mono text-sm leading-relaxed min-h-[200px]">
          <div v-for="(line, i) in displayedLines" :key="i" class="flex">
            <span :class="line.startsWith('$') ? 'text-emerald-400' : 'text-zinc-400'">{{ line }}</span>
            <span v-if="i === currentLine && showCursor" class="ml-[1px] w-2 h-5 bg-emerald-400 inline-block" />
          </div>
          <div v-if="currentLine >= lines.length && showCursor" class="flex">
            <span class="text-emerald-400">$ </span>
            <span class="ml-[1px] w-2 h-5 bg-emerald-400 inline-block" />
          </div>
        </div>
      </div>

      <a
        v-if="primaryCta"
        :href="primaryCta.href"
        :class="cn(
          'inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-sm font-medium',
          'bg-blue-600 text-white border border-blue-700',
          'hover:bg-blue-700 hover:-translate-y-[1px]',
          'active:scale-[0.97] active:transition-transform active:duration-75',
          'shadow-[0_2px_8px_-2px_rgba(59,130,246,0.5)] transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
          'dark:bg-blue-500 dark:border-blue-400/30 dark:hover:bg-blue-400'
        )"
      >{{ primaryCta.label }}</a>
    </div>
  </SectionWrapper>
</template>

<script lang="ts">
import SectionWrapper from '../shared/SectionWrapper.vue';
</script>
