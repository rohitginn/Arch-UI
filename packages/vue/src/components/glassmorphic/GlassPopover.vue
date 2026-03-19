<script setup lang="ts">
/**
 * GlassPopover - Floating content panel anchored to a trigger
 */
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue';
import { cn } from '@archui/core';

interface GlassPopoverProps {
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
  trigger?: 'click' | 'hover';
  arrow?: boolean;
  offset?: number;
  modelValue?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<GlassPopoverProps>(), {
  placement: 'bottom',
  trigger: 'click',
  arrow: false,
  offset: 8,
  modelValue: undefined,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const internalOpen = ref(false);
const isControlled = props.modelValue !== undefined;
const isOpen = ref(isControlled ? props.modelValue : false);

watch(() => props.modelValue, (v) => {
  if (v !== undefined) isOpen.value = v;
});

const triggerRef = ref<HTMLElement | null>(null);
const popoverRef = ref<HTMLDivElement | null>(null);
const pos = ref({ top: 0, left: 0 });
let hoverTimeout: ReturnType<typeof setTimeout> | undefined;

const setOpen = (next: boolean) => {
  if (!isControlled) internalOpen.value = next;
  isOpen.value = next;
  emit('update:modelValue', next);
};

const recalculate = () => {
  const t = triggerRef.value;
  const p = popoverRef.value;
  if (!t || !p) return;

  const tr = t.getBoundingClientRect();
  const pr = p.getBoundingClientRect();
  const base = props.placement.split('-')[0] as string;
  const align = props.placement.split('-')[1] as string | undefined;
  let top = 0, left = 0;

  switch (base) {
    case 'top':
      top = tr.top - pr.height - props.offset + window.scrollY;
      left = tr.left + (tr.width - pr.width) / 2 + window.scrollX;
      break;
    case 'bottom':
      top = tr.bottom + props.offset + window.scrollY;
      left = tr.left + (tr.width - pr.width) / 2 + window.scrollX;
      break;
    case 'left':
      top = tr.top + (tr.height - pr.height) / 2 + window.scrollY;
      left = tr.left - pr.width - props.offset + window.scrollX;
      break;
    case 'right':
      top = tr.top + (tr.height - pr.height) / 2 + window.scrollY;
      left = tr.right + props.offset + window.scrollX;
      break;
  }

  if (align === 'start' && (base === 'top' || base === 'bottom')) left = tr.left + window.scrollX;
  else if (align === 'end' && (base === 'top' || base === 'bottom')) left = tr.right - pr.width + window.scrollX;

  pos.value = { top, left };
};

watch(isOpen, async (val) => {
  if (val) {
    await nextTick();
    recalculate();
  }
});

const onClickOutside = (e: MouseEvent) => {
  if (!isOpen.value) return;
  if (popoverRef.value?.contains(e.target as Node)) return;
  if (triggerRef.value?.contains(e.target as Node)) return;
  setOpen(false);
};

const onEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isOpen.value) setOpen(false);
};

onMounted(() => {
  document.addEventListener('mousedown', onClickOutside);
  document.addEventListener('keydown', onEscape);
  window.addEventListener('scroll', recalculate, true);
  window.addEventListener('resize', recalculate);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', onClickOutside);
  document.removeEventListener('keydown', onEscape);
  window.removeEventListener('scroll', recalculate, true);
  window.removeEventListener('resize', recalculate);
});

const handleTriggerClick = () => {
  if (props.trigger === 'click') setOpen(!isOpen.value);
};

const handleTriggerEnter = () => {
  if (props.trigger === 'hover') {
    clearTimeout(hoverTimeout);
    setOpen(true);
  }
};

const handleTriggerLeave = () => {
  if (props.trigger === 'hover') {
    hoverTimeout = setTimeout(() => setOpen(false), 150);
  }
};

const handlePopoverEnter = () => { clearTimeout(hoverTimeout); };
const handlePopoverLeave = () => {
  if (props.trigger === 'hover') {
    hoverTimeout = setTimeout(() => setOpen(false), 150);
  }
};
</script>

<template>
  <div class="inline-block">
    <!-- Trigger -->
    <div
      ref="triggerRef"
      @click="handleTriggerClick"
      @mouseenter="handleTriggerEnter"
      @mouseleave="handleTriggerLeave"
    >
      <slot name="trigger" />
    </div>

    <!-- Popover panel -->
    <Teleport to="body">
      <div
        v-if="isOpen"
        ref="popoverRef"
        role="dialog"
        :class="cn(
          'fixed z-50 rounded-xl p-4 min-w-[180px]',
          'bg-[var(--surface-bg,#ffffff)]',
          'border border-[var(--surface-border,#e2e8f0)]',
          'shadow-lg',
          'dark:bg-[var(--surface-bg-hover,rgba(30,30,30,0.95))]',
          'dark:border-[var(--surface-border,rgba(255,255,255,0.1))]',
          'dark:backdrop-blur-xl',
          'dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]',
          $props.class,
        )"
        :style="{ top: `${pos.top}px`, left: `${pos.left}px` }"
        @mouseenter="handlePopoverEnter"
        @mouseleave="handlePopoverLeave"
      >
        <slot />
      </div>
    </Teleport>
  </div>
</template>
