<script setup lang="ts">
/**
 * WeddingEventsTemplate — Ultra-luxury wedding planning & event design template ("Maison Eventail").
 *
 * Palette: Stone + Champagne gold (#c5a96e) · Light warm-editorial primary
 *
 * Sections:
 *   WeddingNav (fixed, transparent, gold top border) → WeddingHero (fullscreen photo, lower-third text) →
 *   StudioSection (centered prose, pull-quote) → PortfolioSection (asymmetric grid) →
 *   ServicesSection (3 full-bleed Ken Burns) → VenuesSection (horizontal scroll) →
 *   TestimonialsSection (15s auto-advance, cross-dissolve) → ContactSection (inquiry form) →
 *   WeddingFooter (ornamental, minimal)
 */

import { ref, onMounted, onUnmounted } from 'vue';
import { cn } from '@archui/core';

interface Props {
  class?: string;
}

const props = defineProps<Props>();

/* ------------------------------------------------------------------ */
/*  Constants                                                           */
/* ------------------------------------------------------------------ */

const microCaps = 'uppercase tracking-[0.15em] text-[10px] font-light';

const NAV_LINKS = ['Weddings', 'Events', 'Portfolio', 'About', 'Contact'];

const PORTFOLIO_IMAGES = [
  { id: 1, title: 'Sophie & James', location: 'Château de Mireille, Provence', aspect: 'landscape-wide', image: 'https://placehold.co/1400x600/faf7f3/c5a96e?text=Sophie+%26+James' },
  { id: 2, title: 'Amara & Leo', location: 'Villa Cimbrone, Ravello', aspect: 'portrait', image: 'https://placehold.co/600x800/faf7f3/c5a96e?text=Amara+%26+Leo' },
  { id: 3, title: 'Isabella & Marc', location: 'Le Mas de Pierre, Grasse', aspect: 'landscape', image: 'https://placehold.co/800x600/faf7f3/c5a96e?text=Isabella+%26+Marc' },
  { id: 4, title: 'Elena & Thomas', location: 'Domaine de Fontenille, Luberon', aspect: 'square', image: 'https://placehold.co/500x500/faf7f3/c5a96e?text=Elena+%26+Thomas' },
  { id: 5, title: 'Clara & William', location: 'Château La Coste, Aix', aspect: 'square', image: 'https://placehold.co/500x500/faf7f3/c5a96e?text=Clara+%26+William' },
  { id: 6, title: 'Noémie & Arthur', location: 'Bastide de Gordes', aspect: 'square', image: 'https://placehold.co/500x500/faf7f3/c5a96e?text=No%C3%A9mie+%26+Arthur' },
];

const SERVICES = [
  {
    title: 'Full Planning',
    subtitle: 'From first meeting to final dance.',
    description: "We manage every element of your celebration — venue selection, vendor curation, design concept, timeline, logistics, and on-the-day coordination. Your only task is to arrive and be present.",
    image: 'https://placehold.co/1200x700/faf7f3/c5a96e?text=Full+Planning',
  },
  {
    title: 'Partial Planning',
    subtitle: 'For couples who need expert guidance on the final mile.',
    description: "You've started the journey, and we'll help you complete it beautifully. Three months of intensive support to refine your vision, manage vendors, and ensure a flawless execution.",
    image: 'https://placehold.co/1200x700/faf7f3/c5a96e?text=Partial+Planning',
  },
  {
    title: 'Design & Styling',
    subtitle: 'The aesthetic vision and creative direction of your celebration.',
    description: 'Colour palette, floral design, table setting, stationery, lighting — we craft the visual identity of your wedding day. Every detail is considered, every moment anticipated.',
    image: 'https://placehold.co/1200x700/faf7f3/c5a96e?text=Design+%26+Styling',
  },
];

const VENUES = [
  { name: 'Château de Mireille', region: 'Provence', image: 'https://placehold.co/480x360/faf7f3/c5a96e?text=Ch%C3%A2teau+de+Mireille' },
  { name: 'Domaine de Fontenille', region: 'Luberon', image: 'https://placehold.co/480x360/faf7f3/c5a96e?text=Domaine+de+Fontenille' },
  { name: 'Bastide de Gordes', region: 'Vaucluse', image: 'https://placehold.co/480x360/faf7f3/c5a96e?text=Bastide+de+Gordes' },
  { name: 'Villa Cimbrone', region: 'Ravello', image: 'https://placehold.co/480x360/faf7f3/c5a96e?text=Villa+Cimbrone' },
  { name: 'Château La Coste', region: 'Aix-en-Provence', image: 'https://placehold.co/480x360/faf7f3/c5a96e?text=Ch%C3%A2teau+La+Coste' },
  { name: 'Le Mas de Pierre', region: 'Grasse', image: 'https://placehold.co/480x360/faf7f3/c5a96e?text=Le+Mas+de+Pierre' },
];

const TESTIMONIALS = [
  {
    quote: "From our first meeting in their sun-filled Aups studio to the final dance under the olive trees, Maison Eventail made us feel like the only couple in the world. They didn't plan a wedding — they composed a love letter in flowers, light, and sound. Our guests still talk about the evening two years later.",
    name: 'Sophie & James Beaumont',
    detail: 'Provence, June 2024',
  },
  {
    quote: "We came to them with nothing more than a feeling — 'intimate, timeless, alive.' They translated that into a three-day celebration across two venues that felt like stepping into a painting. The attention to detail was breathtaking: handwritten place cards, a string quartet playing our first date's playlist, lavender from the garden lining every aisle.",
    name: 'Amara & Leo Chen-Williams',
    detail: 'Ravello, September 2023',
  },
  {
    quote: "Having planned events professionally for fifteen years, I knew what to look for — and what to avoid. Maison Eventail exceeded every standard I'd set. Their vendor relationships in Provence are unmatched, their aesthetic is effortlessly refined, and their calm under pressure on the day itself was extraordinary. I cannot recommend them more wholeheartedly.",
    name: 'Isabella Laurent & Marc Duval',
    detail: 'Grasse, May 2024',
  },
];

/* ------------------------------------------------------------------ */
/*  Reactive State                                                      */
/* ------------------------------------------------------------------ */

const scrolled = ref(false);
const mobileOpen = ref(false);
const hoveredId = ref<number | null>(null);
const activeTestimonial = ref(0);
const testimonialPaused = ref(false);
const submitted = ref(false);

let scrollHandler: (() => void) | null = null;
let testimonialInterval: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  scrollHandler = () => {
    scrolled.value = window.scrollY > 80;
  };
  window.addEventListener('scroll', scrollHandler, { passive: true });

  testimonialInterval = setInterval(() => {
    if (!testimonialPaused.value) {
      activeTestimonial.value = (activeTestimonial.value + 1) % TESTIMONIALS.length;
    }
  }, 15000);
});

onUnmounted(() => {
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler);
  if (testimonialInterval) clearInterval(testimonialInterval);
});

function handleSubmit(e: Event) {
  e.preventDefault();
  submitted.value = true;
}
</script>

<template>
  <div
    :class="cn(
      'min-h-screen antialiased',
      'bg-[#faf7f3] dark:bg-[#1c1714]',
      props.class,
    )"
    style="font-family: 'Inter', system-ui, sans-serif; --wedding-bg: #faf7f3;"
  >
    <!-- Google Fonts -->
    <component is="style">
      @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap');

      .font-serif {
        font-family: 'Libre Baskerville', 'Georgia', serif;
      }
      .font-mono {
        font-family: 'DM Mono', 'Menlo', monospace;
      }

      .dark {
        --wedding-bg: #1c1714;
      }
    </component>

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!--  NAVBAR                                                     -->
    <!-- ═══════════════════════════════════════════════════════════ -->

    <!-- Top gold border -->
    <div class="fixed top-0 left-0 right-0 z-[60] h-px bg-[#c5a96e]/20 dark:bg-[#c5a96e]/20" />

    <!-- Main nav -->
    <header class="fixed top-px left-0 right-0 z-50">
      <div class="mx-auto flex items-center justify-between px-6 lg:px-12 py-5 max-w-[1400px]">
        <!-- Logo -->
        <a
          href="#"
          :class="cn(
            microCaps, 'tracking-[0.3em] text-[11px] transition-colors duration-300',
            scrolled
              ? 'text-[#1c1714] dark:text-[#c5a96e]'
              : 'text-[#c5a96e]',
          )"
        >
          MAISON EVENTAIL
        </a>

        <!-- Desktop links -->
        <nav class="hidden md:flex items-center gap-8">
          <a
            v-for="link in NAV_LINKS"
            :key="link"
            :href="`#${link.toLowerCase()}`"
            :class="cn(
              microCaps, 'transition-colors duration-200',
              scrolled
                ? 'text-[#7a6e63] dark:text-[#9a8a7a] hover:text-[#c5a96e] dark:hover:text-[#c5a96e]'
                : 'text-[#7a6e63] hover:text-[#c5a96e]',
            )"
          >
            {{ link }}
          </a>
        </nav>

        <!-- Mobile toggle -->
        <button
          :class="cn(
            microCaps, 'md:hidden transition-colors duration-200',
            scrolled ? 'text-[#1c1714] dark:text-[#c5a96e]' : 'text-[#c5a96e]',
          )"
          @click="mobileOpen = !mobileOpen"
        >
          {{ mobileOpen ? 'CLOSE' : 'MENU' }}
        </button>
      </div>
    </header>

    <!-- Mobile overlay -->
    <div v-if="mobileOpen" class="fixed inset-0 z-[55] flex">
      <div class="hidden sm:block w-[55%] relative overflow-hidden bg-[#1c1714]">
        <img
          src="https://placehold.co/800x1200/1c1714/c5a96e?text=Wedding+Gallery"
          alt="Wedding"
          class="absolute inset-0 w-full h-full object-cover opacity-40"
        />
      </div>
      <div class="flex flex-col justify-center px-10 sm:w-[45%] w-full bg-[#faf7f3] dark:bg-[#1c1714]">
        <a
          v-for="(link, i) in NAV_LINKS"
          :key="link"
          :href="`#${link.toLowerCase()}`"
          class="font-serif italic text-2xl py-4 border-b border-[#c5a96e]/10 hover:text-[#c5a96e] transition-colors duration-200 text-[#1c1714] dark:text-[#f8f3ec]"
          :style="{ animationDelay: `${i * 60}ms` }"
          @click="mobileOpen = false"
        >
          {{ link }}
        </a>
        <div class="mt-12 font-mono text-[10px] text-[#c5a96e]/60">
          +33 (0)4 94 70 12 34
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!--  HERO                                                       -->
    <!-- ═══════════════════════════════════════════════════════════ -->
    <section class="relative min-h-screen flex items-end justify-center overflow-hidden bg-[#faf7f3] dark:bg-[#1c1714]">
      <!-- Fullscreen photograph -->
      <div class="absolute inset-0">
        <img
          src="https://placehold.co/1920x1080/e8ddd0/c5a96e?text=Golden+Hour+Wedding"
          alt="Wedding at golden hour"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Vignette -->
      <div
        class="absolute inset-0 pointer-events-none"
        style="background: radial-gradient(ellipse at center, rgba(28,23,20,0) 30%, rgba(28,23,20,0.35) 100%);"
      />

      <!-- Bottom gradient -->
      <div
        class="absolute inset-x-0 bottom-0 h-[40%] pointer-events-none"
        style="background: linear-gradient(to top, var(--wedding-bg, #faf7f3), transparent);"
      />

      <!-- Content -->
      <div class="relative z-10 text-center pb-20 px-6 max-w-3xl mx-auto">
        <!-- Gold rule -->
        <div class="w-[60px] h-px bg-[#c5a96e]/40 mx-auto mb-8" />

        <!-- Headline -->
        <h1
          class="font-serif italic font-light text-white leading-[1.1] mb-6"
          style="font-size: clamp(3rem, 9vw, 7rem);"
        >
          Where love becomes art.
        </h1>

        <!-- Subtitle -->
        <p :class="cn(microCaps, 'text-white/60 mb-10')">
          SOUTH OF FRANCE · BESPOKE WEDDINGS · EST. 2009
        </p>

        <!-- CTA -->
        <a
          href="#contact"
          :class="cn(
            microCaps, 'text-[11px] text-[#c5a96e] inline-flex items-center gap-2 group relative',
          )"
        >
          Begin your story
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          <span class="absolute -bottom-1 left-0 w-0 h-px bg-[#c5a96e] transition-all duration-300 group-hover:w-full" />
        </a>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!--  SECTION 1 — THE STUDIO                                     -->
    <!-- ═══════════════════════════════════════════════════════════ -->
    <section id="about" class="py-24 lg:py-36 bg-[#faf7f3] dark:bg-[#1c1714]">
      <div class="max-w-xl mx-auto px-6 text-center">
        <!-- Ornamental divider -->
        <svg width="60" height="16" viewBox="0 0 60 16" fill="none" class="mx-auto mb-12 text-[#c5a96e]">
          <path d="M0 8h18" stroke="currentColor" stroke-width="0.5" opacity="0.4" />
          <circle cx="22" cy="8" r="1.5" fill="currentColor" opacity="0.3" />
          <circle cx="30" cy="8" r="2" fill="currentColor" opacity="0.5" />
          <circle cx="38" cy="8" r="1.5" fill="currentColor" opacity="0.3" />
          <path d="M42 8h18" stroke="currentColor" stroke-width="0.5" opacity="0.4" />
        </svg>

        <!-- Opening prose -->
        <p
          class="font-serif italic text-xl lg:text-2xl text-[#7a6e63] dark:text-[#9a8a7a] leading-[2] mb-10"
          style="font-family: 'EB Garamond', 'Georgia', serif;"
        >
          We believe a wedding is the most personal expression of a love story — and it deserves to be told with the same care as a great novel.
        </p>

        <!-- Paragraphs -->
        <div class="space-y-6 text-left">
          <p
            class="text-[#7a6e63] dark:text-[#9a8a7a] leading-relaxed"
            style="font-family: 'EB Garamond', 'Georgia', serif; font-size: 1.05rem; line-height: 1.9;"
          >
            Maison Eventail was founded in the lavender fields of Provence with a simple conviction: that the most memorable celebrations are not produced — they are composed. Each wedding we design is a bespoke work of art, shaped by the couple's story, their desires, and the landscape that holds them.
          </p>
          <p
            class="text-[#7a6e63] dark:text-[#9a8a7a] leading-relaxed"
            style="font-family: 'EB Garamond', 'Georgia', serif; font-size: 1.05rem; line-height: 1.9;"
          >
            Our approach is intimate by design. We take only fifteen weddings per year, ensuring that each couple receives our full attention, our deepest creativity, and our unwavering commitment to perfection. From the first conversation to the last farewell, we are present.
          </p>
          <p
            class="text-[#7a6e63] dark:text-[#9a8a7a] leading-relaxed"
            style="font-family: 'EB Garamond', 'Georgia', serif; font-size: 1.05rem; line-height: 1.9;"
          >
            We work with the finest artisans, florists, chefs, and musicians in the South of France — relationships built over fifteen years of shared dedication to beauty and craft.
          </p>
        </div>

        <!-- Pull quote -->
        <blockquote class="mt-14 mb-10">
          <p class="font-serif italic text-2xl lg:text-3xl text-[#c5a96e] leading-snug">
            &ldquo;Every detail is considered. Every moment, anticipated.&rdquo;
          </p>
        </blockquote>

        <!-- Stats -->
        <p :class="cn(microCaps, 'text-[#7a6e63] dark:text-[#9a8a7a]')">
          15 years · 240 weddings · 18 countries
        </p>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!--  SECTION 2 — PORTFOLIO                                      -->
    <!-- ═══════════════════════════════════════════════════════════ -->
    <section id="portfolio" class="py-24 lg:py-36 bg-[#faf7f3] dark:bg-[#1c1714]">
      <div class="max-w-[1400px] mx-auto px-6 lg:px-12">
        <h2 :class="cn(microCaps, 'text-[#c5a96e] mb-16 text-center')">
          OUR WORK
        </h2>

        <div class="space-y-4">
          <!-- Row 1: Full-width cinematic -->
          <div
            class="relative overflow-hidden rounded-sm group cursor-pointer"
            style="aspect-ratio: 21/9;"
            @mouseenter="hoveredId = 1"
            @mouseleave="hoveredId = null"
          >
            <img
              :src="PORTFOLIO_IMAGES[0].image"
              :alt="PORTFOLIO_IMAGES[0].title"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
              style="transition-timing-function: ease-in-out;"
            />
            <div
              :class="cn(
                'absolute inset-0 bg-gradient-to-t from-[#1c1714]/60 to-transparent transition-opacity duration-400',
                hoveredId === 1 ? 'opacity-100' : 'opacity-0',
              )"
            >
              <div class="absolute bottom-6 left-6">
                <h3 class="font-serif italic text-xl text-white mb-1">{{ PORTFOLIO_IMAGES[0].title }}</h3>
                <p :class="cn(microCaps, 'text-white/60')">{{ PORTFOLIO_IMAGES[0].location }}</p>
              </div>
            </div>
          </div>

          <!-- Row 2: Two columns -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="img in PORTFOLIO_IMAGES.slice(1, 3)"
              :key="img.id"
              class="relative overflow-hidden rounded-sm group cursor-pointer"
              :style="{ aspectRatio: img.aspect === 'portrait' ? '3/4' : '4/3' }"
              @mouseenter="hoveredId = img.id"
              @mouseleave="hoveredId = null"
            >
              <img
                :src="img.image"
                :alt="img.title"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                style="transition-timing-function: ease-in-out;"
              />
              <div
                :class="cn(
                  'absolute inset-0 bg-gradient-to-t from-[#1c1714]/60 to-transparent transition-opacity duration-400',
                  hoveredId === img.id ? 'opacity-100' : 'opacity-0',
                )"
              >
                <div class="absolute bottom-6 left-6">
                  <h3 class="font-serif italic text-xl text-white mb-1">{{ img.title }}</h3>
                  <p :class="cn(microCaps, 'text-white/60')">{{ img.location }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Row 3: Three squares -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              v-for="img in PORTFOLIO_IMAGES.slice(3, 6)"
              :key="img.id"
              class="relative overflow-hidden rounded-sm group cursor-pointer aspect-square"
              @mouseenter="hoveredId = img.id"
              @mouseleave="hoveredId = null"
            >
              <img
                :src="img.image"
                :alt="img.title"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                style="transition-timing-function: ease-in-out;"
              />
              <div
                :class="cn(
                  'absolute inset-0 bg-gradient-to-t from-[#1c1714]/60 to-transparent transition-opacity duration-400',
                  hoveredId === img.id ? 'opacity-100' : 'opacity-0',
                )"
              >
                <div class="absolute bottom-6 left-6">
                  <h3 class="font-serif italic text-lg text-white mb-1">{{ img.title }}</h3>
                  <p :class="cn(microCaps, 'text-white/60')">{{ img.location }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- View full portfolio -->
        <div class="text-center mt-12">
          <a
            href="#"
            :class="cn(
              microCaps, 'text-[11px] text-[#c5a96e] inline-flex items-center gap-2 group relative',
            )"
          >
            VIEW FULL PORTFOLIO
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <span class="absolute -bottom-1 left-0 w-0 h-px bg-[#c5a96e] transition-all duration-300 group-hover:w-full" />
          </a>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!--  SECTION 3 — SERVICES                                       -->
    <!-- ═══════════════════════════════════════════════════════════ -->
    <section id="weddings" class="bg-[#faf7f3] dark:bg-[#1c1714]">
      <div v-for="(service, i) in SERVICES" :key="service.title" class="relative group">
        <!-- Full-bleed image with Ken Burns -->
        <div class="relative overflow-hidden" style="height: 60vh; min-height: 400px;">
          <img
            :src="service.image"
            :alt="service.title"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-[12000ms] group-hover:scale-[1.04]"
            style="transition-timing-function: ease-in-out;"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-[#1c1714]/70 via-[#1c1714]/20 to-transparent" />
        </div>

        <!-- Content -->
        <div class="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
          <h3 class="font-serif italic text-3xl lg:text-4xl text-[#1c1714] dark:text-[#f8f3ec] mb-2">
            {{ service.title }}
          </h3>
          <p :class="cn(microCaps, 'text-[#c5a96e] mb-4')">
            {{ service.subtitle }}
          </p>
          <p
            class="text-[#7a6e63] dark:text-[#9a8a7a] max-w-xl leading-relaxed"
            style="font-family: 'EB Garamond', 'Georgia', serif; font-size: 1.05rem; line-height: 1.9;"
          >
            {{ service.description }}
          </p>
          <!-- Gold rule -->
          <div
            v-if="i < SERVICES.length - 1"
            class="w-[60px] h-px bg-[#c5a96e]/40 mt-10"
          />
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!--  SECTION 4 — VENUES                                         -->
    <!-- ═══════════════════════════════════════════════════════════ -->
    <section id="events" class="py-24 lg:py-36 bg-[#f5f0ea] dark:bg-[#261e18]">
      <div class="max-w-[1400px] mx-auto px-6 lg:px-12">
        <h2 :class="cn(microCaps, 'text-[#c5a96e] mb-16 text-center')">
          OUR VENUES
        </h2>

        <div
          class="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4"
          style="scrollbar-width: none;"
        >
          <div
            v-for="venue in VENUES"
            :key="venue.name"
            class="snap-start shrink-0 w-[300px] lg:w-[340px] group cursor-pointer"
          >
            <div class="relative overflow-hidden rounded-sm mb-4 aspect-[4/3]">
              <img
                :src="venue.image"
                :alt="venue.name"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                style="transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);"
              />
            </div>
            <h3 class="font-serif italic text-lg text-[#1c1714] dark:text-[#f8f3ec] group-hover:text-[#c5a96e] transition-colors duration-200 mb-1">
              {{ venue.name }}
            </h3>
            <span :class="cn(microCaps, 'text-[#b5a89c] dark:text-[#9a8a7a]')">
              {{ venue.region }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!--  SECTION 5 — TESTIMONIALS                                    -->
    <!-- ═══════════════════════════════════════════════════════════ -->
    <section
      class="min-h-screen flex items-center justify-center bg-[#faf7f3] dark:bg-[#1c1714] px-6"
      @mouseenter="testimonialPaused = true"
      @mouseleave="testimonialPaused = false"
    >
      <div class="max-w-3xl text-center relative">
        <!-- Large decorative quote -->
        <span
          class="font-serif text-[#c5a96e]/10 select-none pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2"
          style="font-size: 10rem; line-height: 1;"
          aria-hidden="true"
        >
          &ldquo;
        </span>

        <!-- Quote -->
        <blockquote class="relative z-10">
          <p
            class="font-serif italic text-lg lg:text-xl text-[#1c1714] dark:text-[#f8f3ec] leading-[1.9] mb-10"
            style="font-family: 'EB Garamond', 'Georgia', serif;"
          >
            &ldquo;{{ TESTIMONIALS[activeTestimonial].quote }}&rdquo;
          </p>
          <footer>
            <cite class="not-italic">
              <span :class="cn(microCaps, 'text-[#c5a96e] block mb-1')">{{ TESTIMONIALS[activeTestimonial].name }}</span>
              <span :class="cn(microCaps, 'text-[#b5a89c] dark:text-[#5a4e44]')">{{ TESTIMONIALS[activeTestimonial].detail }}</span>
            </cite>
          </footer>
        </blockquote>

        <!-- Slide indicators -->
        <div class="flex justify-center gap-2 mt-12">
          <button
            v-for="(_, i) in TESTIMONIALS"
            :key="i"
            :class="cn(
              'w-8 h-px transition-all duration-[800ms]',
              i === activeTestimonial ? 'bg-[#c5a96e]' : 'bg-[#c5a96e]/20',
            )"
            :aria-label="`Testimonial ${i + 1}`"
            @click="activeTestimonial = i"
          />
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!--  SECTION 6 — CONTACT                                        -->
    <!-- ═══════════════════════════════════════════════════════════ -->
    <section id="contact" class="py-24 lg:py-36 bg-[#faf7f3] dark:bg-[#1c1714]">
      <div class="max-w-2xl mx-auto px-6 text-center">
        <h2 :class="cn(microCaps, 'text-[#c5a96e] mb-6')">
          LET'S BEGIN YOUR STORY
        </h2>
        <p class="font-serif italic text-2xl lg:text-3xl text-[#1c1714] dark:text-[#f8f3ec] font-light mb-4">
          We take only 15 enquiries per year — availability is limited.
        </p>

        <!-- Ornamental divider -->
        <svg width="60" height="16" viewBox="0 0 60 16" fill="none" class="mx-auto my-10 text-[#c5a96e]">
          <path d="M0 8h18" stroke="currentColor" stroke-width="0.5" opacity="0.4" />
          <circle cx="22" cy="8" r="1.5" fill="currentColor" opacity="0.3" />
          <circle cx="30" cy="8" r="2" fill="currentColor" opacity="0.5" />
          <circle cx="38" cy="8" r="1.5" fill="currentColor" opacity="0.3" />
          <path d="M42 8h18" stroke="currentColor" stroke-width="0.5" opacity="0.4" />
        </svg>

        <!-- Form -->
        <form class="space-y-6 text-left max-w-lg mx-auto" @submit="handleSubmit">
          <div>
            <label :class="cn(microCaps, 'text-[#b5a89c] dark:text-[#5a4e44] block mb-1.5')">Names</label>
            <input
              type="text"
              class="w-full bg-transparent border-b border-[#e2ddd7] dark:border-[#3a2e24] text-[#1c1714] dark:text-[#f8f3ec] text-sm py-2.5 outline-none focus:border-[#c5a96e]/50 transition-colors placeholder:text-[#b5a89c] dark:placeholder:text-[#5a4e44]"
              placeholder="Your names"
            />
          </div>
          <div>
            <label :class="cn(microCaps, 'text-[#b5a89c] dark:text-[#5a4e44] block mb-1.5')">Wedding date</label>
            <input
              type="text"
              class="w-full bg-transparent border-b border-[#e2ddd7] dark:border-[#3a2e24] text-[#1c1714] dark:text-[#f8f3ec] text-sm py-2.5 outline-none focus:border-[#c5a96e]/50 transition-colors placeholder:text-[#b5a89c] dark:placeholder:text-[#5a4e44]"
              placeholder="Approximate date (e.g. June 2027)"
            />
          </div>
          <div>
            <label :class="cn(microCaps, 'text-[#b5a89c] dark:text-[#5a4e44] block mb-1.5')">Location in mind</label>
            <input
              type="text"
              class="w-full bg-transparent border-b border-[#e2ddd7] dark:border-[#3a2e24] text-[#1c1714] dark:text-[#f8f3ec] text-sm py-2.5 outline-none focus:border-[#c5a96e]/50 transition-colors placeholder:text-[#b5a89c] dark:placeholder:text-[#5a4e44]"
              placeholder="Region or venue"
            />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label :class="cn(microCaps, 'text-[#b5a89c] dark:text-[#5a4e44] block mb-1.5')">Guest count</label>
              <input
                type="text"
                class="w-full bg-transparent border-b border-[#e2ddd7] dark:border-[#3a2e24] text-[#1c1714] dark:text-[#f8f3ec] text-sm py-2.5 outline-none focus:border-[#c5a96e]/50 transition-colors placeholder:text-[#b5a89c] dark:placeholder:text-[#5a4e44]"
                placeholder="e.g. 80"
              />
            </div>
            <div>
              <label :class="cn(microCaps, 'text-[#b5a89c] dark:text-[#5a4e44] block mb-1.5')">Budget range</label>
              <select class="w-full bg-transparent border-b border-[#e2ddd7] dark:border-[#3a2e24] text-[#1c1714] dark:text-[#f8f3ec] text-sm py-2.5 outline-none focus:border-[#c5a96e]/50 transition-colors appearance-none">
                <option value="" class="bg-[#faf7f3] dark:bg-[#1c1714]">Select range</option>
                <option value="150-300" class="bg-[#faf7f3] dark:bg-[#1c1714]">€150,000 – €300,000</option>
                <option value="300-500" class="bg-[#faf7f3] dark:bg-[#1c1714]">€300,000 – €500,000</option>
                <option value="500-1m" class="bg-[#faf7f3] dark:bg-[#1c1714]">€500,000 – €1,000,000</option>
                <option value="1m+" class="bg-[#faf7f3] dark:bg-[#1c1714]">€1,000,000+</option>
              </select>
            </div>
          </div>
          <div>
            <label :class="cn(microCaps, 'text-[#b5a89c] dark:text-[#5a4e44] block mb-1.5')">Message</label>
            <textarea
              rows="3"
              class="w-full bg-transparent border-b border-[#e2ddd7] dark:border-[#3a2e24] text-[#1c1714] dark:text-[#f8f3ec] text-sm py-2.5 outline-none focus:border-[#c5a96e]/50 transition-colors resize-none placeholder:text-[#b5a89c] dark:placeholder:text-[#5a4e44]"
              placeholder="Tell us about your vision"
            />
          </div>

          <button
            type="submit"
            :class="cn(
              microCaps, 'text-[11px] mt-4 w-full py-3.5',
              'bg-[#c5a96e] text-white rounded-sm',
              'hover:bg-[#b89258] transition-colors duration-200',
              submitted && 'bg-[#b89258]',
            )"
          >
            {{ submitted ? '✓ ENQUIRY SENT' : 'SEND YOUR ENQUIRY' }}
          </button>
        </form>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!--  FOOTER                                                      -->
    <!-- ═══════════════════════════════════════════════════════════ -->
    <footer class="py-10 bg-[#faf7f3] dark:bg-[#1c1714]">
      <div class="max-w-[1400px] mx-auto px-6 lg:px-12">
        <!-- Ornamental divider -->
        <svg width="60" height="16" viewBox="0 0 60 16" fill="none" class="mx-auto mb-8 text-[#c5a96e]">
          <path d="M0 8h18" stroke="currentColor" stroke-width="0.5" opacity="0.4" />
          <circle cx="22" cy="8" r="1.5" fill="currentColor" opacity="0.3" />
          <circle cx="30" cy="8" r="2" fill="currentColor" opacity="0.5" />
          <circle cx="38" cy="8" r="1.5" fill="currentColor" opacity="0.3" />
          <path d="M42 8h18" stroke="currentColor" stroke-width="0.5" opacity="0.4" />
        </svg>

        <div class="flex flex-col items-center gap-3 text-center">
          <span :class="cn(microCaps, 'text-[#b5a89c] dark:text-[#5a4e44]')">
            MAISON EVENTAIL · AUPS, PROVENCE · FRANCE
          </span>
          <span class="font-mono text-[10px] text-[#b5a89c] dark:text-[#5a4e44]">
            hello@maison-eventail.com · +33 (0)4 94 70 12 34
          </span>
          <a
            href="#"
            :class="cn(
              microCaps,
              'text-[#b5a89c] dark:text-[#5a4e44] hover:text-[#c5a96e] dark:hover:text-[#c5a96e] transition-colors inline-flex items-center gap-1.5',
            )"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            @maison.eventail
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>
