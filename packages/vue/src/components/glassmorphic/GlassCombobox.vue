<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { cn } from '@archui/core';
import { Search, ChevronDown, Check } from 'lucide-vue-next';
import EffectContainer from '../../base/EffectContainer.vue';

interface ComboboxOption {
  label: string;
  value: string;
}

interface Props {
  options: ComboboxOption[];
  modelValue?: string;
  placeholder?: string;
  class?: string;
}

const props = defineProps<Props>();

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const searchTerm = ref('');
const containerRef = ref<HTMLElement | null>(null);

const filteredOptions = computed<ComboboxOption[]>(() => 
  props.options.filter(opt => 
    opt.label.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
);

const selectedOption = computed(() => 
  props.options.find(opt => opt.value === props.modelValue)
);

const handleClickOutside = (event: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => document.addEventListener('mousedown', handleClickOutside));
onUnmounted(() => document.removeEventListener('mousedown', handleClickOutside));

const selectOption = (value: string) => {
  emit('update:modelValue', value);
  isOpen.value = false;
  searchTerm.value = '';
};
const inputRef = ref<HTMLInputElement | null>(null);

import { watch } from 'vue';
watch(isOpen, (val) => {
  if (val) {
    setTimeout(() => {
      inputRef.value?.focus();
    }, 100);
  }
});
</script>

<template>
  <div ref="containerRef" :class="cn('relative w-full', props.class)">
    <div 
      @click="isOpen = !isOpen"
      :class="cn(
        'flex items-center justify-between px-4 py-2.5 rounded-xl transition-all cursor-pointer',
        'bg-surface-primary/10 border border-surface-border/50 hover:bg-surface-primary/20',
        isOpen && 'ring-2 ring-blue-500/20 border-blue-500/50'
      )"
    >
      <span :class="cn('text-sm', !selectedOption && 'text-text-primary/40')">
        {{ selectedOption ? selectedOption.label : placeholder }}
      </span>
      <ChevronDown :class="cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')" />
    </div>

    <Transition
      enter-active-class="transition-all duration-400 cubic-bezier(0.34, 1.56, 0.64, 1)"
      enter-from-class="opacity-0 translate-y-2 scale-95"
      leave-active-class="transition-all duration-200 ease-in"
      leave-to-class="opacity-0 translate-y-1 scale-98"
    >
      <div v-if="isOpen" class="absolute z-50 w-full mt-2 overflow-hidden">
        <EffectContainer class="border border-surface-border bg-surface-primary/80 backdrop-blur-2xl rounded-2xl shadow-2xl p-2">
          <template #effects>
            <div class="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
          </template>

          <div class="flex items-center px-3 py-2 mb-2 rounded-lg bg-text-primary/5">
            <Search class="w-4 h-4 mr-2 text-text-primary/40" />
            <input 
              ref="inputRef"
              class="bg-transparent border-none outline-none text-sm w-full placeholder:text-text-primary/30"
              placeholder="Filter..."
              v-model="searchTerm"
              @click.stop
            />
          </div>

          <div class="max-h-60 overflow-y-auto space-y-1 text-text-primary">
            <div
              v-for="opt in filteredOptions"
              :key="opt.value"
              @click="selectOption(opt.value)"
              :class="cn(
                'flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer',
                'hover:bg-blue-500/10 hover:text-blue-500',
                modelValue === opt.value ? 'bg-blue-500/20 text-blue-500' : 'text-text-primary/80'
              )"
            >
              {{ opt.label }}
              <Check v-if="modelValue === opt.value" class="w-4 h-4" />
            </div>
            <div v-if="filteredOptions.length === 0" class="px-3 py-8 text-center text-xs text-text-primary/40 italic">
              No results found
            </div>
          </div>
        </EffectContainer>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Custom directive for autofocus if needed or just use v-focus pattern */
</style>
