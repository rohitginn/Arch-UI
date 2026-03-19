<script setup lang="ts">
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface MarqueeCard {
  title: string;
  description?: string;
  image?: string;
  href?: string;
}

export interface MarqueeCardsProps {
  topRow: MarqueeCard[];
  bottomRow?: MarqueeCard[];
  speed?: 'slow' | 'normal' | 'fast';
  pauseOnHover?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */

withDefaults(defineProps<MarqueeCardsProps>(), {
  bottomRow: () => [],
  speed: 'normal',
  pauseOnHover: true,
});

/* ------------------------------------------------------------------ */
/*  Speed map                                                           */
/* ------------------------------------------------------------------ */

const speedMap = { slow: '60s', normal: '40s', fast: '20s' } as const;
</script>

<template>
  <div class="space-y-4">
    <!-- Keyframes -->
    <component :is="'style'">
      @keyframes marquee-scroll {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
      }
    </component>

    <!-- Top row (scrolls left) -->
    <div
      :class="cn(
        'relative flex overflow-hidden',
        '[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]',
      )"
    >
      <div
        :class="cn(
          'flex shrink-0 gap-6 py-4',
          'animate-[marquee-scroll_var(--marquee-duration)_linear_infinite]',
          pauseOnHover && 'hover:[animation-play-state:paused]',
        )"
        :style="{ '--marquee-duration': speedMap[speed] } as any"
      >
        <component
          v-for="(card, i) in [...topRow, ...topRow]"
          :key="i"
          :is="card.href ? 'a' : 'div'"
          :href="card.href"
          :class="cn(
            'group relative flex w-72 shrink-0 flex-col overflow-hidden rounded-2xl',
            'border border-[var(--glass-edge)]',
            'bg-[var(--glass-surface)] backdrop-blur-md',
            'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
          )"
        >
          <div v-if="card.image" class="aspect-[16/10] overflow-hidden">
            <img :src="card.image" :alt="card.title" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
          </div>
          <div class="p-5">
            <div class="flex items-start gap-3">
              <slot :name="`top-icon-${i}`" />
              <div>
                <h3 class="text-sm font-semibold text-[var(--glass-text)] line-clamp-1">{{ card.title }}</h3>
                <p v-if="card.description" class="mt-1 text-xs text-[var(--glass-text)]/60 line-clamp-2">{{ card.description }}</p>
              </div>
            </div>
          </div>
        </component>
      </div>
    </div>

    <!-- Bottom row (scrolls right) -->
    <div
      v-if="bottomRow && bottomRow.length > 0"
      :class="cn(
        'relative flex overflow-hidden',
        '[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]',
      )"
    >
      <div
        :class="cn(
          'flex shrink-0 gap-6 py-4',
          'animate-[marquee-scroll_var(--marquee-duration)_linear_infinite]',
          '[animation-direction:reverse]',
          pauseOnHover && 'hover:[animation-play-state:paused]',
        )"
        :style="{ '--marquee-duration': speedMap[speed] } as any"
      >
        <component
          v-for="(card, i) in [...bottomRow, ...bottomRow]"
          :key="i"
          :is="card.href ? 'a' : 'div'"
          :href="card.href"
          :class="cn(
            'group relative flex w-72 shrink-0 flex-col overflow-hidden rounded-2xl',
            'border border-[var(--glass-edge)]',
            'bg-[var(--glass-surface)] backdrop-blur-md',
            'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
          )"
        >
          <div v-if="card.image" class="aspect-[16/10] overflow-hidden">
            <img :src="card.image" :alt="card.title" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
          </div>
          <div class="p-5">
            <div class="flex items-start gap-3">
              <slot :name="`bottom-icon-${i}`" />
              <div>
                <h3 class="text-sm font-semibold text-[var(--glass-text)] line-clamp-1">{{ card.title }}</h3>
                <p v-if="card.description" class="mt-1 text-xs text-[var(--glass-text)]/60 line-clamp-2">{{ card.description }}</p>
              </div>
            </div>
          </div>
        </component>
      </div>
    </div>
  </div>
</template>
