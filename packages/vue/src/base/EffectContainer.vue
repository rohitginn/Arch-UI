<script setup lang="ts">
/**
 * EffectContainer - Base primitive for safe overlay/content layering (Vue)
 * 
 * Enforces the stacking-context isolation contract:
 * - Root: Creates new stacking context with `isolation: isolate`
 * - Effects: Decorative layers locked to z-0
 * - Content: User content locked to z-10
 * 
 * This prevents decorative overlays from ever painting over content,
 * eliminating the light-theme text invisibility bug.
 */

import { cn } from '@archui/core';

interface EffectContainerProps {
    /** Additional CSS classes */
    class?: string;
}

const props = defineProps<EffectContainerProps>();
</script>

<template>
    <div :class="cn('relative isolate', props.class)">
        <!-- Decorative Layer: z-0 - always renders below content -->
        <div v-if="$slots.effects" class="absolute inset-0 z-0 pointer-events-none">
            <slot name="effects" />
        </div>

        <!-- Content Layer: z-10 - always renders above effects -->
        <div class="relative z-10">
            <slot />
        </div>
    </div>
</template>