<script setup lang="ts">
/**
 * GlassContextMenu - Token-based glassmorphic context menu for Vue 3
 */
import { ref, onMounted, onUnmounted } from 'vue';
import { cn } from '@archui/core';

interface ContextMenuItem {
  id: string;
  label: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;
  children?: ContextMenuItem[];
}

type GlassVariant = 'default' | 'solid' | 'bordered';

interface Props {
  items: ContextMenuItem[];
  variant?: GlassVariant;
  class?: string;
}

const variantSurface: Record<GlassVariant, string> = {
  default: 'bg-[var(--glass-surface)] backdrop-blur-xl shadow-[var(--glass-depth-md)]',
  solid: 'bg-[var(--glass-solid-bg)] backdrop-blur-2xl shadow-[var(--glass-solid-shadow)]',
  bordered: 'bg-[var(--glass-bordered-bg)] backdrop-blur-lg shadow-[var(--glass-bordered-shadow)]',
};
const variantBorder: Record<GlassVariant, string> = {
  default: 'border border-[var(--glass-edge)]',
  solid: 'border border-[var(--glass-solid-border)]',
  bordered: 'border border-[var(--glass-bordered-border)]',
};

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  variant: 'default',
});

const emit = defineEmits<{
  (e: 'select', item: ContextMenuItem): void;
}>();

const isOpen = ref(false);
const position = ref({ x: 0, y: 0 });

const handleContextMenu = (e: MouseEvent) => {
  e.preventDefault();
  position.value = {
    x: Math.min(e.clientX, window.innerWidth - 220),
    y: Math.min(e.clientY, window.innerHeight - 300),
  };
  isOpen.value = true;
};

const close = () => { isOpen.value = false; };
const selectItem = (item: ContextMenuItem) => {
  if (item.disabled || item.divider) return;
  emit('select', item);
  close();
};

const handleGlobalClick = () => { if (isOpen.value) close(); };
const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };

onMounted(() => {
  document.addEventListener('click', handleGlobalClick);
  document.addEventListener('keydown', handleEscape);
});
onUnmounted(() => {
  document.removeEventListener('click', handleGlobalClick);
  document.removeEventListener('keydown', handleEscape);
});
</script>

<template>
  <div :class="props.class" @contextmenu="handleContextMenu">
    <slot />
  </div>

  <Teleport to="body">
    <Transition enter-active-class="transition-all duration-150 ease-out"
      enter-from-class="opacity-0 scale-95 translate-y-1" enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-100 ease-in" leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95">
      <div v-if="isOpen" :class="cn(
        'fixed z-50',
        'min-w-[200px] p-1.5 rounded-xl',
        variantSurface[variant],
        variantBorder[variant],
        'shadow-[var(--glass-highlight)]',
      )" :style="{ left: position.x + 'px', top: position.y + 'px' }" @click.stop>
        <template v-for="item in items" :key="item.id || `divider-${items.indexOf(item)}`">
          <div v-if="item.divider" class="mx-2 my-1 h-px bg-[var(--glass-divider)]" />
          <button v-else type="button" :disabled="item.disabled" :class="cn(
            'group relative flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-left text-[13px]',
            'transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]',
            'outline-none',
            item.danger
              ? 'text-[var(--glass-error)] hover:bg-[var(--glass-error)]/10'
              : 'text-[var(--glass-text-secondary)] hover:bg-[var(--glass-surface-hover)] hover:text-[var(--glass-text)]',
            item.disabled && 'opacity-40 pointer-events-none',
          )" @click.stop="selectItem(item)">
            <span class="flex-1 truncate">{{ item.label }}</span>
            <span v-if="item.shortcut" class="ml-auto text-[11px] text-[var(--glass-text-muted)] font-medium">
              {{ item.shortcut }}
            </span>
            <svg v-if="item.children" class="h-3 w-3 shrink-0 text-[var(--glass-text-muted)]" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </template>
      </div>
    </Transition>
  </Teleport>
</template>
