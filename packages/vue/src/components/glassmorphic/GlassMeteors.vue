<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { cn } from '@archui/core';

interface MeteorsProps {
  number?: number;
  class?: string;
  color?: string;
}

const props = withDefaults(defineProps<MeteorsProps>(), {
  number: 20,
  color: '#64748b',
});

const meteors = ref<any[]>([]);

onMounted(() => {
  meteors.value = new Array(props.number).fill(true).map(() => ({
    left: Math.floor(Math.random() * 100) + '%',
    animationDelay: Math.random() * 1 + 0.2 + 's',
    animationDuration: Math.floor(Math.random() * 8 + 2) + 's',
    backgroundColor: props.color
  }));
});
</script>

<template>
  <span
    v-for="(style, idx) in meteors"
    :key="idx"
    :class="cn(
      'pointer-events-none absolute left-1/2 top-1/2 h-0.5 w-0.5 rotate-[215deg] animate-meteor opacity-0 shadow-[0_0_0_1px_#ffffff10]',
      props.class
    )"
    :style="style"
  >
    <!-- Trail -->
    <div class="pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent" />
  </span>
</template>

<style scoped>
@keyframes meteor {
  0% {
    transform: rotate(215deg) translateX(0);
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    transform: rotate(215deg) translateX(-500px);
    opacity: 0;
  }
}
.animate-meteor {
  animation: meteor 5s linear infinite;
}
</style>
