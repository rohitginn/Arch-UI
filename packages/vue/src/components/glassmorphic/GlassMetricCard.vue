<script setup lang="ts">
/**
 * GlassMetricCard - Token-based dashboard KPI card for Vue 3
 */
import { ref, watch } from 'vue';
import { cn } from '@archui/core';

type GlassVariant = 'default' | 'solid' | 'bordered';

interface Props {
  value: string | number;
  label: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
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
  variant: 'default',
});

const cardRef = ref<HTMLDivElement | null>(null);
const displayValue = ref(props.value);

watch(() => props.value, (newVal) => {
  const numNew = typeof newVal === 'number' ? newVal : parseFloat(String(newVal));
  const numPrev = typeof displayValue.value === 'number' ? displayValue.value : parseFloat(String(displayValue.value));
  if (isNaN(numNew) || isNaN(numPrev)) { displayValue.value = newVal; return; }
  const start = performance.now();
  const diff = numNew - numPrev;
  const animate = (time: number) => {
    const progress = Math.min((time - start) / 600, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    displayValue.value = Math.round((numPrev + diff * eased) * 100) / 100;
    if (progress < 1) requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
});

const handleMouseMove = (e: MouseEvent) => {
  const el = cardRef.value;
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  el.style.transform = `perspective(600px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) scale(1.01)`;
};

const handleMouseLeave = () => {
  if (cardRef.value) cardRef.value.style.transform = 'perspective(600px) rotateY(0) rotateX(0) scale(1)';
};

const formattedValue = () => {
  const v = displayValue.value;
  return typeof v === 'number' ? Math.round(v).toLocaleString() : v;
};
</script>

<template>
  <div ref="cardRef" :class="cn(
    'relative p-5 rounded-2xl transition-all duration-300 ease-out will-change-transform',
    variantSurface[variant],
    variantBorder[variant],
    'hover:bg-[var(--glass-surface-hover)]',
    props.class,
  )" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
    <div class="space-y-2">
      <p class="text-xs font-medium text-[var(--glass-text-muted)] uppercase tracking-wider">{{ label }}</p>
      <p class="text-3xl font-bold tracking-tight text-[var(--glass-text)] tabular-nums">{{ formattedValue() }}</p>
      <div v-if="trend || trendValue"
        :class="cn('flex items-center gap-1 text-xs font-medium', trend === 'up' ? 'text-[var(--glass-success)]' : trend === 'down' ? 'text-[var(--glass-error)]' : 'text-[var(--glass-text-muted)]')">
        <span v-if="trendValue">{{ trendValue }}</span>
      </div>
    </div>
    <slot />
  </div>
</template>
