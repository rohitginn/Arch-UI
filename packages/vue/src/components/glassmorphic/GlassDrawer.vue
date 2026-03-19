<script setup lang="ts">
import { cn } from '@archui/core';
import EffectContainer from '../../base/EffectContainer.vue';

interface Props {
  isOpen: boolean;
  class?: string;
}

defineProps<Props>();
const emit = defineEmits(['close']);
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]" @click="emit('close')" />
    </Transition>

    <Transition
      enter-active-class="transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)"
      enter-from-class="translate-x-full scale-x-90 opacity-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-to-class="translate-x-full opacity-0"
    >
      <div
        v-if="isOpen"
        :class="cn('fixed right-0 top-0 z-50 h-full w-full max-w-md shadow-2xl origin-right', $props.class)"
      >
        <EffectContainer class="h-full border-l border-surface-border bg-surface-primary/60 backdrop-blur-3xl">
          <template #effects>
            <div class="absolute inset-0 bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
          </template>
          <div class="flex flex-col h-full p-6 overflow-y-auto">
            <slot />
          </div>
        </EffectContainer>
      </div>
    </Transition>
  </Teleport>
</template>
