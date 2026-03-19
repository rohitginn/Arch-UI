<script setup lang="ts">
/**
 * GlassButtonGroup - A grouped row (or column) of buttons treated as a compound control.
 *
 * When `attached` is true, child buttons share borders with modified border-radius.
 *
 * @example
 * <GlassButtonGroup attached>
 *   <GlassButton variant="outline">Left</GlassButton>
 *   <GlassButton variant="outline">Center</GlassButton>
 *   <GlassButton variant="outline">Right</GlassButton>
 * </GlassButtonGroup>
 */

import { computed } from 'vue';
import { cn } from '@archui/core';

interface GlassButtonGroupProps {
  /** Orientation of the group */
  orientation?: 'horizontal' | 'vertical';
  /** Attached mode — buttons share borders with no gap */
  attached?: boolean;
  /** Additional CSS classes */
  class?: string;
}

const props = withDefaults(defineProps<GlassButtonGroupProps>(), {
  orientation: 'horizontal',
  attached: true,
});

const groupClasses = computed(() =>
  cn(
    'inline-flex',
    props.orientation === 'vertical' ? 'flex-col' : 'flex-row',
    props.attached && props.orientation === 'horizontal' && [
      '[&>*]:rounded-none',
      '[&>*:first-child]:rounded-l-xl',
      '[&>*:last-child]:rounded-r-xl',
      '[&>*:not(:first-child)]:-ml-px',
      '[&>*:hover]:z-10',
      '[&>*:focus-visible]:z-20',
    ],
    props.attached && props.orientation === 'vertical' && [
      '[&>*]:rounded-none',
      '[&>*:first-child]:rounded-t-xl',
      '[&>*:last-child]:rounded-b-xl',
      '[&>*:not(:first-child)]:-mt-px',
      '[&>*:hover]:z-10',
      '[&>*:focus-visible]:z-20',
    ],
    !props.attached && 'gap-2',
    props.class
  )
);
</script>

<template>
  <div role="group" :class="groupClasses">
    <slot />
  </div>
</template>
