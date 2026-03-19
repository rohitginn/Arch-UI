<script setup lang="ts">
/**
 * FeaturesCompare — Before/After split view with draggable slider.
 */

import { ref, onMounted, onUnmounted } from 'vue';
import { cn } from '@archui/core';

export interface FeaturesCompareProps {
  heading?: string;
  subheading?: string;
  badge?: string;
  before: { label: string; image: { src: string; alt: string } };
  after: { label: string; image: { src: string; alt: string } };
  defaultPosition?: number;
  class?: string;
}

const props = withDefaults(defineProps<FeaturesCompareProps>(), {
  defaultPosition: 50,
});

const containerRef = ref<HTMLDivElement | null>(null);
const position = ref(props.defaultPosition);
const isDragging = ref(false);

const updatePosition = (clientX: number) => {
  const el = containerRef.value;
  if (!el) return;
  const rect = el.getBoundingClientRect();
  position.value = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
};

const onMove = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return;
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
  updatePosition(clientX);
};

const onEnd = () => { isDragging.value = false; };

const startDrag = (e: MouseEvent | TouchEvent) => {
  isDragging.value = true;
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
  updatePosition(clientX);
};

onMounted(() => {
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onEnd);
  document.addEventListener('touchmove', onMove);
  document.addEventListener('touchend', onEnd);
});

onUnmounted(() => {
  document.removeEventListener('mousemove', onMove);
  document.removeEventListener('mouseup', onEnd);
  document.removeEventListener('touchmove', onMove);
  document.removeEventListener('touchend', onEnd);
});
</script>

<template>
  <SectionWrapper :class="props.class">
    <template #background><slot name="background" /></template>

    <SectionHeading
      v-if="heading || subheading"
      :heading="heading!"
      :subheading="subheading"
      :badge="badge"
    />

    <div class="max-w-4xl mx-auto">
      <div
        ref="containerRef"
        :class="cn(
          'relative rounded-2xl overflow-hidden select-none',
          'border border-black/[0.06] dark:border-white/[0.08]',
          'shadow-[0_16px_50px_-12px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_50px_-12px_rgba(0,0,0,0.4)]',
          isDragging && 'cursor-col-resize'
        )"
        @mousedown="startDrag"
        @touchstart="startDrag"
      >
        <img :src="after.image.src" :alt="after.image.alt" class="w-full h-auto object-cover block" draggable="false" />

        <div class="absolute inset-0 overflow-hidden" :style="{ width: `${position}%` }">
          <img
            :src="before.image.src"
            :alt="before.image.alt"
            class="w-full h-full object-cover block"
            :style="{ width: containerRef ? `${containerRef.offsetWidth}px` : '100%' }"
            draggable="false"
          />
        </div>

        <div class="absolute inset-y-0 z-20" :style="{ left: `${position}%` }">
          <div class="absolute inset-y-0 -translate-x-1/2 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.3)]" />
          <div :class="cn(
            'absolute top-1/2 -translate-x-1/2 -translate-y-1/2',
            'w-10 h-10 rounded-full bg-white border-2 border-white',
            'shadow-[0_2px_10px_rgba(0,0,0,0.2)] flex items-center justify-center cursor-col-resize'
          )">
            <svg class="h-5 w-5 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m9 18-6-6 6-6" /><path d="m15 6 6 6-6 6" />
            </svg>
          </div>
        </div>

        <span class="absolute top-3 left-3 z-10 rounded-lg bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">{{ before.label }}</span>
        <span class="absolute top-3 right-3 z-10 rounded-lg bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">{{ after.label }}</span>
      </div>
    </div>
  </SectionWrapper>
</template>

<script lang="ts">
import SectionWrapper from '../shared/SectionWrapper.vue';
import SectionHeading from '../shared/SectionHeading.vue';
</script>
