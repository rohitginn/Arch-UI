<script setup lang="ts">
import { ref } from 'vue';
import { cn } from '@archui/core';

interface GlassFileUploadProps {
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<GlassFileUploadProps>(), {
  multiple: false,
  disabled: false,
});

const isDragging = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);

const handleDragEnter = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  if (!props.disabled) isDragging.value = true;
};

const handleDragLeave = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  isDragging.value = false;
};

const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  isDragging.value = false;
  // Emit files here later
};

const handleClick = () => {
  if (!props.disabled && inputRef.value) {
    inputRef.value.click();
  }
};
</script>

<template>
  <div
    :class="cn(
      'relative flex flex-col items-center justify-center w-full min-h-[160px] rounded-xl border-2 border-dashed',
      'transition-all duration-200 ease-out',
      isDragging 
        ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-500/10' 
        : 'border-black/[0.08] dark:border-white/20 hover:border-black/[0.15] dark:hover:border-white/30 bg-white/40 dark:bg-white/[0.02] hover:bg-white/60 dark:hover:bg-white/[0.05] backdrop-blur-sm',
      props.disabled && 'opacity-50 cursor-not-allowed',
      props.class
    )"
    @dragenter="handleDragEnter"
    @dragover="handleDragEnter"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
    @click="handleClick"
  >
    <input
      ref="inputRef"
      type="file"
      class="hidden"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
    />
    
    <div class="flex flex-col items-center gap-2 text-center">
      <div 
        :class="cn(
          'p-3 rounded-full',
          'bg-black/[0.03] dark:bg-white/[0.06]'
        )"
      >
        <svg class="w-6 h-6 text-slate-500 dark:text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      </div>
      <div class="text-sm font-medium text-slate-700 dark:text-white/90">
        <span class="text-blue-500">Click to upload</span> or drag and drop
      </div>
      <p class="text-xs text-slate-500 dark:text-white/50">
        SVG, PNG, JPG or GIF (max. 800x400px)
      </p>
    </div>
  </div>
</template>
