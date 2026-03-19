<script lang="ts">
/**
 * GlassSolidButton - Convenience wrapper for GlassButton variant="solid".
 * Passes all props and slots through.
 */
import { defineComponent, h } from 'vue';
import GlassButton from './GlassButton.vue';

export const GlassSolidButton = defineComponent({
  name: 'GlassSolidButton',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h(GlassButton, { ...attrs, variant: 'solid' }, slots);
  },
});

export const GlassOutlineButton = defineComponent({
  name: 'GlassOutlineButton',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h(GlassButton, { ...attrs, variant: 'outline' }, slots);
  },
});

export const GlassGhostButton = defineComponent({
  name: 'GlassGhostButton',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h(GlassButton, { ...attrs, variant: 'ghost' }, slots);
  },
});

export const GlassDestructiveButton = defineComponent({
  name: 'GlassDestructiveButton',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h(GlassButton, { ...attrs, variant: 'danger' }, slots);
  },
});

export const GlassPrimaryButton = defineComponent({
  name: 'GlassPrimaryButton',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h(GlassButton, { ...attrs, variant: 'primary' }, slots);
  },
});

export const GlassSecondaryButton = defineComponent({
  name: 'GlassSecondaryButton',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h(GlassButton, { ...attrs, variant: 'secondary' }, slots);
  },
});

export default GlassSolidButton;
</script>
