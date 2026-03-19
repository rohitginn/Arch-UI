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
      enter-from-class="translate-y-full scale-y-90 opacity-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-to-class="translate-y-full opacity-0"
    >
      <div
        v-if="isOpen"
        :class="cn('fixed bottom-0 left-0 right-0 z-50 h-[80vh] shadow-2xl origin-bottom', $props.class)"
      >
        <EffectContainer class="h-full border-t border-surface-border bg-surface-primary/65 backdrop-blur-3xl rounded-t-3xl">
          <template #effects>
            <div class="absolute inset-0 overflow-hidden rounded-t-3xl pointer-events-none">
              <!-- Grabber Handle -->
              <div class="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full bg-text-primary/10" />
              <div class="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent" />
            </div>
          </template>
          <div class="flex flex-col h-full p-8 pt-10 overflow-y-auto">
            <slot />
          </div>
        </EffectContainer>
      </div>
    </Transition>
  </Teleport>
</template>
