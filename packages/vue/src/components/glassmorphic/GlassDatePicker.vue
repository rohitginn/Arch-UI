<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { cn } from '@archui/core';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import EffectContainer from '../../base/EffectContainer.vue';

interface Props {
  modelValue?: Date;
  class?: string;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Pick a date',
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const containerRef = ref<HTMLElement | null>(null);
const viewDate = ref(props.modelValue || new Date());

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const daysInMonth = computed(() => new Date(viewDate.value.getFullYear(), viewDate.value.getMonth() + 1, 0).getDate());
const firstDayOfMonth = computed(() => new Date(viewDate.value.getFullYear(), viewDate.value.getMonth(), 1).getDay());

const days = computed(() => Array.from({ length: daysInMonth.value }, (_, i) => i + 1));
const paddingDays = computed(() => Array.from({ length: firstDayOfMonth.value }, (_, i) => i));

const handleClickOutside = (event: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => document.addEventListener('mousedown', handleClickOutside));
onUnmounted(() => document.removeEventListener('mousedown', handleClickOutside));

const isToday = (day: number) => {
  const today = new Date();
  return today.getDate() === day && today.getMonth() === viewDate.value.getMonth() && today.getFullYear() === viewDate.value.getFullYear();
};

const isSelected = (day: number) => {
  return props.modelValue && 
         props.modelValue.getDate() === day && 
         props.modelValue.getMonth() === viewDate.value.getMonth() && 
         props.modelValue.getFullYear() === viewDate.value.getFullYear();
};

const selectDate = (day: number) => {
  const date = new Date(viewDate.value.getFullYear(), viewDate.value.getMonth(), day);
  emit('update:modelValue', date);
  isOpen.value = false;
};

const changeMonth = (offset: number) => {
  viewDate.value = new Date(viewDate.value.getFullYear(), viewDate.value.getMonth() + offset);
};
</script>

<template>
  <div ref="containerRef" :class="cn('relative w-full', props.class)">
    <div 
      @click="isOpen = !isOpen"
      :class="cn(
        'flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all cursor-pointer',
        'bg-surface-primary/10 border border-surface-border/50 hover:bg-surface-primary/20',
        isOpen && 'ring-2 ring-blue-500/20 border-blue-500/50'
      )"
    >
      <CalendarIcon class="w-4 h-4 text-text-primary/40" />
      <span :class="cn('text-sm', !modelValue && 'text-text-primary/40')">
        {{ modelValue ? modelValue.toLocaleDateString() : placeholder }}
      </span>
    </div>

    <Transition
      enter-active-class="transition-all duration-400 cubic-bezier(0.34, 1.56, 0.64, 1)"
      enter-from-class="opacity-0 translate-y-2 scale-95"
      leave-active-class="transition-all duration-200 ease-in"
      leave-to-class="opacity-0 translate-y-1 scale-98"
    >
      <div v-if="isOpen" class="absolute z-50 w-72 mt-2 origin-top-left">
        <EffectContainer class="border border-surface-border bg-surface-primary/80 backdrop-blur-2xl rounded-2xl shadow-2xl p-4">
          <template #effects>
            <div class="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
          </template>

          <div class="flex items-center justify-between mb-4 text-text-primary">
             <button 
               @click="changeMonth(-1)"
               class="p-1 hover:bg-white/10 rounded-md transition-colors"
             >
               <ChevronLeft class="w-4 h-4" />
             </button>
             <span class="text-sm font-semibold">
               {{ months[viewDate.getMonth()] }} {{ viewDate.getFullYear() }}
             </span>
             <button 
               @click="changeMonth(1)"
               class="p-1 hover:bg-white/10 rounded-md transition-colors"
             >
               <ChevronRight class="w-4 h-4" />
             </button>
          </div>

          <div class="grid grid-cols-7 gap-1 text-center mb-1">
            <span v-for="d in ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']" :key="d" 
                  class="text-[10px] font-bold text-text-primary/30 uppercase tracking-widest">{{ d }}</span>
          </div>

          <div class="grid grid-cols-7 gap-1">
            <div v-for="d in paddingDays" :key="`p-${d}`" />
            <button
              v-for="day in days"
              :key="day"
              @click="selectDate(day)"
              :class="cn(
                'w-8 h-8 flex items-center justify-center rounded-lg text-xs transition-all',
                'hover:bg-blue-500/20 hover:text-blue-500',
                isSelected(day) ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 
                isToday(day) ? 'bg-text-primary/10 font-bold text-text-primary' : 'text-text-primary/80'
              )"
            >
              {{ day }}
            </button>
          </div>
        </EffectContainer>
      </div>
    </Transition>
  </div>
</template>
