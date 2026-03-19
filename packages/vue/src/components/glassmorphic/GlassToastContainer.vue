<script setup lang="ts">
import { useGlassToast } from './useGlassToast';
import GlassToast from './GlassToast.vue';
import { cn } from '@archui/core';

withDefaults(defineProps<{
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}>(), {
  position: 'bottom-right'
});

const { toasts, removeToast } = useGlassToast();

const positionClasses = {
  'top-left': 'top-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
};
</script>

<template>
  <Teleport to="body">
    <div
      :class="cn('fixed z-[100] flex flex-col gap-2 pointer-events-none w-full max-w-[420px] px-4', positionClasses[position])"
    >
      <TransitionGroup
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-x-10 scale-95"
        enter-to-class="opacity-100 translate-x-0 scale-100"
        leave-active-class="transition-all duration-200 ease-in absolute w-[calc(100%-2rem)]"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 translate-x-10 scale-95"
        move-class="transition-all duration-300"
      >
        <div v-for="t in toasts" :key="t.id" class="pointer-events-auto w-full">
          <GlassToast
            v-bind="t"
            @close="removeToast(t.id)"
          />
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
