<script lang="ts">
/**
 * PhotographyStudioTemplate — Commercial photography & visual arts studio portfolio ("ELARA").
 *
 * Palette: Stone monochrome. Mode: Warm light primary, cinematic dark secondary.
 *
 * Sections:
 *   Nav (transparent floating) → Hero (fullscreen slideshow) → Project Grid (asymmetric) →
 *   Studio Statement (serif editorial) → Services (expandable numbered list) →
 *   Clients (typographic marquee) → Contact (full-vh centered) → Footer (minimal)
 *
 * Typography: Cormorant Garamond (display), Inter (UI), EB Garamond (body).
 */
</script>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue';
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80&auto=format&fit=crop',
    project: 'Lumière Éternelle',
    client: 'Hermès — 2024',
  },
  {
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80&auto=format&fit=crop',
    project: 'Still Horizons',
    client: 'Wallpaper* — 2024',
  },
  {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80&auto=format&fit=crop',
    project: 'The Alpine Series',
    client: 'BMW — 2023',
  },
  {
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=1920&q=80&auto=format&fit=crop',
    project: 'Veil & Shadow',
    client: 'Saint Laurent — 2023',
  },
];

const PROJECTS = [
  {
    title: 'Lumière Éternelle',
    category: 'Campaign',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80&auto=format&fit=crop',
  },
  {
    title: 'Still Horizons',
    category: 'Editorial',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80&auto=format&fit=crop',
  },
  {
    title: 'The Alpine Series',
    category: 'Product',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&auto=format&fit=crop',
  },
  {
    title: 'Monochrome Dreams',
    category: 'Campaign',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80&auto=format&fit=crop',
  },
  {
    title: 'Veil & Shadow',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800&q=80&auto=format&fit=crop',
  },
  {
    title: 'Urban Grace',
    category: 'Editorial',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80&auto=format&fit=crop',
  },
];

const SERVICES = [
  { name: 'Campaign Photography', description: 'Full-scale fashion and luxury campaign production from concept to final delivery.' },
  { name: 'Editorial Direction', description: 'Visual storytelling for magazines, publications, and digital editorial platforms.' },
  { name: 'Product & Still Life', description: 'Precision product photography for e-commerce, catalogs, and brand assets.' },
  { name: 'Motion & Film', description: 'Short-form films, behind-the-scenes content, and motion brand assets.' },
  { name: 'Creative Direction', description: 'End-to-end creative strategy from mood boarding to post-production oversight.' },
  { name: 'Archive Licensing', description: 'License our extensive archive of editorial and campaign photography.' },
];

const CLIENTS = [
  'Vogue', 'Hermès', 'Wallpaper*', 'BMW', 'Saint Laurent', 'Le Monde',
  'Apple', 'Chanel', 'Net-a-Porter', 'The Row', 'Monocle', 'Bottega Veneta',
];

const STUDIO_PARAGRAPHS = [
  'ELARA is a commercial photography and visual direction studio. We work with fashion houses, editorial publications, and luxury brands to create images that transcend their medium. Our approach is rooted in classical composition, natural light, and an unwavering commitment to authenticity.',
  'Every project begins with a conversation — not a brief. We believe the best images emerge from genuine understanding: of the brand, the product, and the story behind it. Our team of photographers, art directors, and post-production specialists work as one integrated unit.',
  "We don't chase trends. We create images that feel as relevant in ten years as they do today. That's the standard we hold ourselves to, and it's what our clients return for, project after project.",
];

const PROJECT_GRID_SPANS = [
  'md:col-span-7 md:row-span-2',
  'md:col-span-5',
  'md:col-span-5',
  'md:col-span-12 aspect-[21/9]',
  'md:col-span-4 md:row-span-2',
  'md:col-span-8',
];

const NAV_LINKS = ['WORK', 'STUDIO', 'SERVICES', 'CONTACT'];

/* ------------------------------------------------------------------ */
/*  Custom Cursor                                                       */
/* ------------------------------------------------------------------ */

const cursorRef = ref<HTMLDivElement | null>(null);
const cursorPos = { x: 0, y: 0 };
const cursorTarget = { x: 0, y: 0 };
const cursorLabel = ref('');
const cursorSize = ref<'default' | 'view' | 'link'>('default');
let cursorRaf = 0;
const isTouchDevice = ref(false);

function setupCursor() {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(pointer: coarse)').matches) {
    isTouchDevice.value = true;
    return;
  }

  document.documentElement.style.cursor = 'none';

  const onMove = (e: MouseEvent) => {
    cursorTarget.x = e.clientX;
    cursorTarget.y = e.clientY;
  };

  const onOver = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const closest = target.closest('[data-cursor]');
    if (closest) {
      const type = closest.getAttribute('data-cursor');
      if (type === 'view') { cursorSize.value = 'view'; cursorLabel.value = 'VIEW'; }
      else if (type === 'link') { cursorSize.value = 'link'; cursorLabel.value = ''; }
      else if (type === 'send') { cursorSize.value = 'view'; cursorLabel.value = 'SEND'; }
      else { cursorSize.value = 'default'; cursorLabel.value = ''; }
    } else {
      cursorSize.value = 'default';
      cursorLabel.value = '';
    }
  };

  const lerp = () => {
    cursorPos.x += (cursorTarget.x - cursorPos.x) * 0.12;
    cursorPos.y += (cursorTarget.y - cursorPos.y) * 0.12;
    if (cursorRef.value) {
      cursorRef.value.style.transform = `translate(${cursorPos.x}px, ${cursorPos.y}px) translate(-50%, -50%)`;
    }
    cursorRaf = requestAnimationFrame(lerp);
  };

  window.addEventListener('mousemove', onMove, { passive: true });
  document.addEventListener('mouseover', onOver, { passive: true });
  cursorRaf = requestAnimationFrame(lerp);

  onUnmounted(() => {
    document.documentElement.style.cursor = '';
    window.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseover', onOver);
    cancelAnimationFrame(cursorRaf);
  });
}

/* ------------------------------------------------------------------ */
/*  Hero Slideshow                                                      */
/* ------------------------------------------------------------------ */

const currentSlide = ref(0);
const heroLoaded = ref(false);
const progressRef = ref<HTMLDivElement | null>(null);
let slideInterval: ReturnType<typeof setInterval> | undefined;

function startSlideshow() {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % HERO_SLIDES.length;
  }, 5000);
}

watch(currentSlide, () => {
  nextTick(() => {
    if (progressRef.value) {
      progressRef.value.style.animation = 'none';
      // Force reflow
      void progressRef.value.offsetHeight;
      progressRef.value.style.animation = 'elara-progress 5s linear forwards';
    }
  });
});

/* ------------------------------------------------------------------ */
/*  Mobile Menu                                                         */
/* ------------------------------------------------------------------ */

const mobileOpen = ref(false);
const linksRevealed = ref(false);

watch(mobileOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
    setTimeout(() => { linksRevealed.value = true; }, 100);
  } else {
    linksRevealed.value = false;
    document.body.style.overflow = '';
  }
});

/* ------------------------------------------------------------------ */
/*  Section Reveals via IntersectionObserver                            */
/* ------------------------------------------------------------------ */

const projectGridRevealed = ref(false);
const projectGridRef = ref<HTMLDivElement | null>(null);
const studioRevealed = ref(false);
const studioRef = ref<HTMLDivElement | null>(null);

function observeElement(elRef: { value: HTMLElement | null }, revealedRef: { value: boolean }, threshold = 0.1) {
  if (!elRef.value) return;
  const obs = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) { revealedRef.value = true; obs.disconnect(); } },
    { threshold },
  );
  obs.observe(elRef.value);
  onUnmounted(() => obs.disconnect());
}

/* ------------------------------------------------------------------ */
/*  Services                                                            */
/* ------------------------------------------------------------------ */

const expandedService = ref<number | null>(null);

/* ------------------------------------------------------------------ */
/*  Clients                                                             */
/* ------------------------------------------------------------------ */

const hoveredClient = ref<number | null>(null);

/* ------------------------------------------------------------------ */
/*  Contact Form                                                        */
/* ------------------------------------------------------------------ */

const focusedField = ref<string | null>(null);
const fieldValues = ref<Record<string, string>>({});

function isFieldActive(name: string): boolean {
  return focusedField.value === name || Boolean(fieldValues.value[name]?.length);
}

/* ------------------------------------------------------------------ */
/*  Lifecycle                                                           */
/* ------------------------------------------------------------------ */

onMounted(() => {
  setupCursor();
  startSlideshow();
  setTimeout(() => { heroLoaded.value = true; }, 100);
  observeElement(projectGridRef, projectGridRevealed);
  observeElement(studioRef, studioRevealed, 0.3);
});

onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval);
});

const currentYear = new Date().getFullYear();
</script>

<template>
  <div :class="cn('min-h-screen antialiased bg-[#f6f3ef] dark:bg-[#0d0b09] text-[#1a1714] dark:text-[#f0ece6]')">
    <!-- Google Fonts -->
    <component is="style">
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500&display=swap');
    </component>

    <!-- Keyframe styles -->
    <component is="style">
      @keyframes elara-progress {
        from { width: 0%; }
        to { width: 100%; }
      }
      @keyframes elara-descend {
        0% { height: 0px; opacity: 0; }
        50% { height: 16px; opacity: 1; }
        100% { height: 16px; opacity: 0; }
      }
      @keyframes elara-marquee {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }
    </component>

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!--  Custom Cursor (desktop only)                               -->
    <!-- ═══════════════════════════════════════════════════════════ -->

    <div
      v-if="!isTouchDevice"
      ref="cursorRef"
      :class="cn(
        'fixed top-0 left-0 z-[9999] pointer-events-none',
        'transition-[width,height,background-color,border,backdrop-filter] duration-200 ease-out',
        'rounded-full flex items-center justify-center',
        cursorSize === 'default' && 'w-[10px] h-[10px] bg-[#1a1714] dark:bg-[#f0ece6]',
        cursorSize === 'view' && 'w-14 h-14 bg-white/15 backdrop-blur-sm border border-white/30',
        cursorSize === 'link' && 'w-[6px] h-[6px] bg-[#1a1714] dark:bg-[#f0ece6]',
      )"
    >
      <span
        v-if="cursorLabel"
        class="text-[8px] uppercase tracking-[0.2em] text-white font-light select-none"
      >{{ cursorLabel }}</span>
    </div>

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!--  Navigation — Transparent Floating                          -->
    <!-- ═══════════════════════════════════════════════════════════ -->

    <header class="fixed top-0 left-0 right-0 z-50 px-6 lg:px-10 py-5">
      <div class="flex items-center justify-between">
        <a
          href="#"
          class="text-[11px] font-light uppercase tracking-[0.3em] text-[#1a1714] dark:text-[#f0ece6] transition-colors duration-200"
          style="font-family: Inter, 'Helvetica Neue', sans-serif"
        >
          ELARA
        </a>

        <!-- Desktop nav -->
        <nav class="hidden md:flex items-center gap-6">
          <a
            v-for="link in NAV_LINKS"
            :key="link"
            :href="`#${link.toLowerCase()}`"
            data-cursor="link"
            class="text-[10px] font-light uppercase tracking-[0.18em] text-[#7a716a] dark:text-[#8a7e74] hover:text-[#1a1714] dark:hover:text-[#f0ece6] transition-colors duration-0"
            style="font-family: Inter, 'Helvetica Neue', sans-serif"
          >{{ link }}</a>
        </nav>

        <!-- Mobile menu trigger -->
        <button
          class="md:hidden text-[10px] font-light uppercase tracking-[0.18em] text-[#7a716a] dark:text-[#8a7e74]"
          style="font-family: Inter, 'Helvetica Neue', sans-serif"
          data-cursor="link"
          @click="mobileOpen = true"
        >MENU</button>
      </div>
    </header>

    <!-- Mobile menu overlay -->
    <div v-if="mobileOpen" class="fixed inset-0 z-[100] bg-[#1a1714]">
      <div class="flex h-full">
        <div class="hidden sm:block w-[55%] h-full relative overflow-hidden">
          <img
            :src="HERO_SLIDES[0].image"
            alt=""
            class="absolute inset-0 w-full h-full object-cover opacity-60"
          />
        </div>
        <div class="flex-1 flex flex-col justify-center px-8 sm:px-12">
          <button
            class="absolute top-5 right-6 flex items-center gap-2 text-[10px] font-light uppercase tracking-[0.18em] text-white/60 hover:text-white transition-colors"
            style="font-family: Inter, 'Helvetica Neue', sans-serif"
            @click="mobileOpen = false"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            CLOSE
          </button>

          <nav class="flex flex-col gap-6 sm:gap-8">
            <a
              v-for="(link, i) in NAV_LINKS"
              :key="link"
              :href="`#${link.toLowerCase()}`"
              :class="cn(
                'text-4xl sm:text-5xl font-light italic text-white transition-all duration-[600ms]',
                linksRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
              )"
              :style="{
                fontFamily: 'Cormorant Garamond, Cormorant, Georgia, serif',
                transitionDelay: `${i * 80}ms`,
                transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
              }"
              @click="mobileOpen = false"
            >{{ link.charAt(0) + link.slice(1).toLowerCase() }}</a>
          </nav>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!--  Hero — Fullscreen Photography Slideshow                    -->
    <!-- ═══════════════════════════════════════════════════════════ -->

    <section class="relative h-dvh w-full overflow-hidden bg-[#0d0b09]">
      <!-- Camera shutter overlay -->
      <div
        :class="cn(
          'absolute inset-0 z-30 bg-[#1a1714] transition-opacity',
          heroLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100',
        )"
        :style="{ transitionDuration: '400ms', transitionDelay: '200ms' }"
      />

      <!-- Slides -->
      <div
        v-for="(slide, i) in HERO_SLIDES"
        :key="i"
        :class="cn(
          'absolute inset-0 transition-opacity duration-[800ms] ease-in-out',
          i === currentSlide ? 'opacity-100' : 'opacity-0',
        )"
      >
        <img
          :src="slide.image"
          :alt="slide.project"
          class="w-full h-full object-cover"
          data-cursor="view"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      <!-- Bottom-left: Project info -->
      <div
        :class="cn(
          'absolute bottom-12 left-6 lg:left-10 z-20 transition-all duration-[600ms]',
          heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        )"
        :style="{ transitionDelay: '600ms', transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)' }"
      >
        <h2
          class="text-white font-light italic leading-tight"
          :style="{
            fontFamily: 'Cormorant Garamond, Cormorant, Georgia, serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          }"
        >{{ HERO_SLIDES[currentSlide].project }}</h2>
        <p
          class="mt-2 text-white/60 text-[10px] font-light uppercase tracking-[0.18em]"
          style="font-family: Inter, 'Helvetica Neue', sans-serif"
        >{{ HERO_SLIDES[currentSlide].client }}</p>
      </div>

      <!-- Bottom-right: Slide counter + progress -->
      <div class="absolute bottom-12 right-6 lg:right-10 z-20 flex flex-col items-end gap-2">
        <div class="w-12 h-px bg-white/20 relative overflow-hidden">
          <div
            ref="progressRef"
            class="absolute top-0 left-0 h-full bg-white/80"
            style="width: 0%; animation: elara-progress 5s linear forwards"
          />
        </div>
        <span
          class="text-white/40 text-[10px] font-light uppercase tracking-[0.18em]"
          style="font-family: Inter, 'Helvetica Neue', sans-serif"
        >{{ String(currentSlide + 1).padStart(2, '0') }} / {{ String(HERO_SLIDES.length).padStart(2, '0') }}</span>
      </div>

      <!-- Bottom-center: Explore CTA -->
      <div class="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1">
        <span
          class="text-white text-[10px] font-light uppercase tracking-[0.18em]"
          style="font-family: Inter, 'Helvetica Neue', sans-serif"
        >↓ EXPLORE WORK</span>
        <div class="w-px bg-white/40 animate-[elara-descend_1.5s_ease-in-out_infinite]" />
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!--  Section 1 — Project Grid (Asymmetric)                      -->
    <!-- ═══════════════════════════════════════════════════════════ -->

    <section id="work" class="py-16 lg:py-24 bg-[#f6f3ef] dark:bg-[#0d0b09]">
      <div ref="projectGridRef" class="mx-auto max-w-7xl px-6 lg:px-10">
        <p
          class="mb-10 text-[10px] font-light uppercase tracking-[0.18em] text-[#7a716a] dark:text-[#8a7e74]"
          style="font-family: Inter, 'Helvetica Neue', sans-serif"
        >SELECTED WORK — 2022–2025</p>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
          <div
            v-for="(project, i) in PROJECTS"
            :key="i"
            :class="cn(
              'group relative overflow-hidden cursor-pointer',
              'aspect-[4/5] md:aspect-auto min-h-[240px]',
              PROJECT_GRID_SPANS[i] || '',
              'transition-all duration-500',
              projectGridRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
            )"
            :style="{ transitionDelay: projectGridRevealed ? `${i * 100}ms` : '0ms' }"
            data-cursor="view"
          >
            <!-- Image layer -->
            <img
              :src="project.image"
              :alt="project.title"
              class="absolute inset-0 w-full h-full object-cover"
            />

            <!-- Hover scale image -->
            <div
              class="absolute inset-0 group-hover:scale-[1.04] transition-transform duration-700"
              style="transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94)"
            >
              <img
                :src="project.image"
                alt=""
                class="w-full h-full object-cover"
                aria-hidden="true"
              />
            </div>

            <!-- Hover scrim -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

            <!-- Hover info -->
            <div class="absolute bottom-0 left-0 right-0 p-5 lg:p-6 z-10 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300" style="transition-delay: 100ms">
              <h3
                class="text-white text-xl lg:text-2xl font-light italic"
                style="font-family: 'Cormorant Garamond', Cormorant, Georgia, serif"
              >{{ project.title }}</h3>
              <p
                class="mt-1 text-white/70 text-[10px] font-light uppercase tracking-[0.18em]"
                style="font-family: Inter, 'Helvetica Neue', sans-serif"
              >{{ project.category }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!--  Section 2 — Studio Statement                               -->
    <!-- ═══════════════════════════════════════════════════════════ -->

    <section id="studio" class="py-24 lg:py-40 bg-[#f6f3ef] dark:bg-[#0d0b09]">
      <div ref="studioRef" class="mx-auto max-w-7xl px-6 lg:px-10">
        <div class="grid grid-cols-1 lg:grid-cols-12">
          <div class="lg:col-start-4 lg:col-end-10">
            <!-- Decorative circle -->
            <svg width="24" height="24" viewBox="0 0 24 24" class="mb-8 text-[#e2ddd7] dark:text-[#2a2420]">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1" />
            </svg>

            <!-- Opening line -->
            <h2
              :class="cn(
                'text-2xl lg:text-3xl font-light italic text-[#1a1714] dark:text-[#f0ece6] mb-10',
                'transition-all duration-1000',
                studioRevealed ? 'opacity-100' : 'opacity-0',
              )"
              :style="{ fontFamily: 'Cormorant Garamond, Cormorant, Georgia, serif', transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)' }"
            >We make images that last.</h2>

            <!-- Paragraphs with staggered reveal -->
            <p
              v-for="(text, i) in STUDIO_PARAGRAPHS"
              :key="i"
              :class="cn(
                'text-lg leading-[2] text-[#7a716a] dark:text-[#8a7e74] mb-8',
                'transition-all duration-1000',
                studioRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
              )"
              :style="{
                fontFamily: 'EB Garamond, Georgia, serif',
                transitionDelay: `${(i + 1) * 120}ms`,
                transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
              }"
            >
              <!-- Drop cap for first paragraph -->
              <span
                v-if="i === 0"
                class="float-left text-[4rem] leading-[0.8] mr-3 mt-1 font-light text-[#1a1714] dark:text-[#f0ece6]"
                style="font-family: 'Cormorant Garamond', Cormorant, Georgia, serif"
              >{{ text.charAt(0) }}</span>
              {{ i === 0 ? text.slice(1) : text }}
            </p>

            <!-- Pull quote -->
            <div
              :class="cn(
                'my-12 py-8 border-t border-b border-[#e2ddd7] dark:border-[#2a2420] text-center',
                'transition-all duration-1000',
                studioRevealed ? 'opacity-100' : 'opacity-0',
              )"
              style="transition-delay: 500ms"
            >
              <blockquote
                class="text-xl lg:text-2xl font-light italic text-[#c0b8b0] dark:text-[#6a5e54]"
                style="font-family: 'Cormorant Garamond', Cormorant, Georgia, serif"
              >&ldquo;The camera is a machine that makes you see.&rdquo;</blockquote>
            </div>

            <!-- Stats -->
            <div
              :class="cn(
                'text-center transition-all duration-1000',
                studioRevealed ? 'opacity-100' : 'opacity-0',
              )"
              style="transition-delay: 600ms"
            >
              <p
                class="text-[10px] font-light uppercase tracking-[0.18em] text-[#7a716a] dark:text-[#8a7e74]"
                style="font-family: Inter, 'Helvetica Neue', sans-serif"
              >12 years · 84 campaigns · 31 countries</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!--  Section 3 — Services                                       -->
    <!-- ═══════════════════════════════════════════════════════════ -->

    <section id="services" class="py-16 lg:py-24 bg-[#f6f3ef] dark:bg-[#0d0b09]">
      <div class="mx-auto max-w-7xl px-6 lg:px-10">
        <div
          v-for="(service, i) in SERVICES"
          :key="i"
          :class="cn(
            'group border-t border-[#e2ddd7] dark:border-[#2a2420] cursor-pointer',
            'transition-[background-color] duration-200',
            'hover:bg-[#f0ebe3] dark:hover:bg-[#181411]',
          )"
          data-cursor="link"
          @mouseenter="expandedService = i"
          @mouseleave="expandedService = null"
        >
          <div class="flex items-center justify-between py-4 lg:py-5 px-2">
            <span
              class="w-12 text-sm font-light italic text-[#c0b8b0] dark:text-[#6a5e54]"
              style="font-family: 'Cormorant Garamond', Cormorant, Georgia, serif"
            >{{ String(i + 1).padStart(2, '0') }}</span>

            <span
              class="flex-1 text-xl lg:text-2xl font-light text-[#1a1714] dark:text-[#f0ece6]"
              style="font-family: 'Cormorant Garamond', Cormorant, Georgia, serif"
            >{{ service.name }}</span>

            <span
              :class="cn(
                'transition-all duration-200',
                'text-[#e2ddd7] dark:text-[#2a2420]',
                'group-hover:text-[#1a1714] dark:group-hover:text-[#f0ece6]',
                'group-hover:translate-x-1.5',
              )"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </span>
          </div>

          <!-- Expandable description -->
          <div :class="cn(
            'overflow-hidden transition-all duration-400 ease-out px-2',
            expandedService === i ? 'max-h-20 pb-4 opacity-100' : 'max-h-0 pb-0 opacity-0',
          )">
            <p
              class="text-sm text-[#7a716a] dark:text-[#8a7e74] pl-12 max-w-xl leading-relaxed"
              style="font-family: 'EB Garamond', Georgia, serif"
            >{{ service.description }}</p>
          </div>
        </div>
        <div class="border-t border-[#e2ddd7] dark:border-[#2a2420]" />
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!--  Section 4 — Clients                                        -->
    <!-- ═══════════════════════════════════════════════════════════ -->

    <section class="py-16 lg:py-24 bg-[#f6f3ef] dark:bg-[#0d0b09]">
      <div class="mx-auto max-w-7xl px-6 lg:px-10">
        <p
          class="mb-10 text-[10px] font-light uppercase tracking-[0.18em] text-[#7a716a] dark:text-[#8a7e74] text-center"
          style="font-family: Inter, 'Helvetica Neue', sans-serif"
        >CLIENTS & COLLABORATORS</p>

        <!-- Desktop: wrapped names -->
        <div class="hidden md:flex flex-wrap justify-center items-center gap-x-2 gap-y-3">
          <template v-for="(client, i) in CLIENTS" :key="client">
            <span
              :class="cn(
                'text-xl text-[#1a1714] dark:text-[#f0ece6] cursor-default transition-all duration-200',
                hoveredClient === i ? 'italic' : 'not-italic',
              )"
              style="font-family: 'Cormorant Garamond', Cormorant, Georgia, serif"
              data-cursor="link"
              @mouseenter="hoveredClient = i"
              @mouseleave="hoveredClient = null"
            >{{ client }}</span>
            <span v-if="i < CLIENTS.length - 1" class="text-lg text-[#c0b8b0] dark:text-[#6a5e54] mx-1">·</span>
          </template>
        </div>

        <!-- Mobile: marquee -->
        <div class="md:hidden overflow-hidden">
          <div class="flex gap-6 animate-[elara-marquee_20s_linear_infinite] whitespace-nowrap">
            <span
              v-for="(client, i) in [...CLIENTS, ...CLIENTS]"
              :key="i"
              class="text-lg text-[#1a1714] dark:text-[#f0ece6] inline-flex items-center gap-4"
              style="font-family: 'Cormorant Garamond', Cormorant, Georgia, serif"
            >
              {{ client }}
              <span class="text-[#c0b8b0] dark:text-[#6a5e54]">·</span>
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!--  Section 5 — Contact                                        -->
    <!-- ═══════════════════════════════════════════════════════════ -->

    <section id="contact" class="min-h-dvh flex items-center py-20 bg-[#f6f3ef] dark:bg-[#0d0b09]">
      <div class="mx-auto max-w-xl px-6 lg:px-10 w-full text-center">
        <h2
          class="text-4xl lg:text-5xl font-light italic text-[#1a1714] dark:text-[#f0ece6] mb-6"
          style="font-family: 'Cormorant Garamond', Cormorant, Georgia, serif"
        >Let's work together.</h2>

        <a
          href="mailto:studio@elara.co"
          class="inline-block text-2xl lg:text-3xl font-light text-[#1a1714] dark:text-[#f0ece6] relative group"
          style="font-family: 'Cormorant Garamond', Cormorant, Georgia, serif"
          data-cursor="link"
        >
          studio@elara.co
          <span class="absolute bottom-0 left-0 w-0 h-px bg-[#1a1714] dark:bg-[#f0ece6] group-hover:w-full transition-all duration-300" />
        </a>

        <p
          class="mt-4 mb-12 text-[10px] font-light uppercase tracking-[0.18em] text-[#7a716a] dark:text-[#8a7e74]"
          style="font-family: Inter, 'Helvetica Neue', sans-serif"
        >Represented in London, Paris, New York</p>

        <!-- Inquiry form -->
        <form class="space-y-6 text-left" @submit.prevent>
          <!-- Text inputs -->
          <div v-for="field in [{ name: 'name', label: 'Name' }, { name: 'company', label: 'Company' }]" :key="field.name" class="relative">
            <input
              :type="'text'"
              :name="field.name"
              :value="fieldValues[field.name] || ''"
              :class="cn(
                'w-full bg-transparent border border-[#e2ddd7] dark:border-[#2a2420] px-4 py-3 pt-5',
                'text-sm text-[#1a1714] dark:text-[#f0ece6]',
                'outline-none transition-colors duration-200',
                'focus:border-[#1a1714] dark:focus:border-[#f0ece6]',
              )"
              style="font-family: Inter, 'Helvetica Neue', sans-serif; border-radius: 0"
              @input="fieldValues[field.name] = ($event.target as HTMLInputElement).value"
              @focus="focusedField = field.name"
              @blur="focusedField = null"
            />
            <label
              :class="cn(
                'absolute left-4 transition-all duration-200 pointer-events-none',
                'text-[#7a716a] dark:text-[#8a7e74]',
                isFieldActive(field.name) ? 'top-1 text-[9px] uppercase tracking-[0.15em]' : 'top-3.5 text-sm',
              )"
              style="font-family: Inter, 'Helvetica Neue', sans-serif"
            >{{ field.label }}</label>
          </div>

          <!-- Selects -->
          <div
            v-for="field in [
              { name: 'projectType', label: 'Project Type', options: ['Campaign', 'Editorial', 'Product', 'Motion', 'Creative Direction', 'Other'] },
              { name: 'budget', label: 'Budget Range', options: ['Under $10K', '$10K – $25K', '$25K – $50K', '$50K – $100K', '$100K+'] },
            ]"
            :key="field.name"
            class="relative"
          >
            <select
              :name="field.name"
              :value="fieldValues[field.name] || ''"
              :class="cn(
                'w-full bg-transparent border border-[#e2ddd7] dark:border-[#2a2420] px-4 py-3 pt-5',
                'text-sm text-[#1a1714] dark:text-[#f0ece6] appearance-none',
                'outline-none transition-colors duration-200',
                'focus:border-[#1a1714] dark:focus:border-[#f0ece6]',
              )"
              style="font-family: Inter, 'Helvetica Neue', sans-serif; border-radius: 0"
              @change="fieldValues[field.name] = ($event.target as HTMLSelectElement).value"
              @focus="focusedField = field.name"
              @blur="focusedField = null"
            >
              <option value="" disabled />
              <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</option>
            </select>
            <label
              :class="cn(
                'absolute left-4 transition-all duration-200 pointer-events-none',
                'text-[#7a716a] dark:text-[#8a7e74]',
                isFieldActive(field.name) ? 'top-1 text-[9px] uppercase tracking-[0.15em]' : 'top-3.5 text-sm',
              )"
              style="font-family: Inter, 'Helvetica Neue', sans-serif"
            >{{ field.label }}</label>
          </div>

          <!-- Textarea -->
          <div class="relative">
            <textarea
              name="message"
              rows="4"
              :value="fieldValues.message || ''"
              :class="cn(
                'w-full bg-transparent border border-[#e2ddd7] dark:border-[#2a2420] px-4 py-3 pt-5',
                'text-sm text-[#1a1714] dark:text-[#f0ece6] resize-none',
                'outline-none transition-colors duration-200',
                'focus:border-[#1a1714] dark:focus:border-[#f0ece6]',
              )"
              style="font-family: Inter, 'Helvetica Neue', sans-serif; border-radius: 0"
              @input="fieldValues.message = ($event.target as HTMLTextAreaElement).value"
              @focus="focusedField = 'message'"
              @blur="focusedField = null"
            />
            <label
              :class="cn(
                'absolute left-4 transition-all duration-200 pointer-events-none',
                'text-[#7a716a] dark:text-[#8a7e74]',
                isFieldActive('message') ? 'top-1 text-[9px] uppercase tracking-[0.15em]' : 'top-3.5 text-sm',
              )"
              style="font-family: Inter, 'Helvetica Neue', sans-serif"
            >Message</label>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            data-cursor="send"
            :class="cn(
              'w-full py-3.5 bg-[#1a1714] dark:bg-[#f0ece6] text-white dark:text-[#1a1714]',
              'text-[10px] font-light uppercase tracking-[0.25em]',
              'transition-colors duration-200',
              'hover:bg-[#3d3630] dark:hover:bg-[#d9d4cc]',
            )"
            style="font-family: Inter, 'Helvetica Neue', sans-serif; border-radius: 0"
          >SEND INQUIRY</button>
        </form>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!--  Footer                                                     -->
    <!-- ═══════════════════════════════════════════════════════════ -->

    <footer class="border-t border-[#e2ddd7] dark:border-[#2a2420] bg-[#f6f3ef] dark:bg-[#0d0b09]">
      <div class="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span
          class="text-[10px] font-light uppercase tracking-[0.18em] text-[#c0b8b0] dark:text-[#6a5e54]"
          style="font-family: Inter, 'Helvetica Neue', sans-serif"
        >© ELARA {{ currentYear }}</span>

        <span
          class="text-[10px] font-light uppercase tracking-[0.18em] text-[#c0b8b0] dark:text-[#6a5e54]"
          style="font-family: Inter, 'Helvetica Neue', sans-serif"
        >London · Paris · New York</span>

        <div class="flex items-center gap-4">
          <a
            href="#"
            class="text-[10px] font-light uppercase tracking-[0.18em] text-[#c0b8b0] dark:text-[#6a5e54] hover:text-[#7a716a] dark:hover:text-[#8a7e74] transition-colors"
            style="font-family: Inter, 'Helvetica Neue', sans-serif"
            data-cursor="link"
          >@elara.studio</a>
          <span class="text-[#c0b8b0] dark:text-[#6a5e54] text-[10px]">·</span>
          <a
            href="#"
            class="text-[10px] font-light uppercase tracking-[0.18em] text-[#c0b8b0] dark:text-[#6a5e54] hover:text-[#7a716a] dark:hover:text-[#8a7e74] transition-colors"
            style="font-family: Inter, 'Helvetica Neue', sans-serif"
            data-cursor="link"
          >Privacy</a>
        </div>
      </div>
    </footer>
  </div>
</template>
