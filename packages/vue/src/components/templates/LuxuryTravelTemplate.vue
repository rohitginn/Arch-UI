<script lang="ts">
/**
 * LuxuryTravelTemplate — Ultra-luxury bespoke travel agency template ("Voyage Atelier").
 *
 * Palette: Dusk (Stone) + Gold · Dark cinematic primary, warm light secondary
 *
 * Typography:
 *   Display: Libre Baskerville (serif, italic)
 *   Body: EB Garamond (serif)
 *   UI/Nav: Inter (micro-uppercase, tracking-wide)
 *   Numbers/Coords: DM Mono
 *
 * Sections:
 *   TravelNav → TravelHero → Destinations → Process → Experiences →
 *   Testimonials → Journal → Contact → Footer
 */
export default {};
</script>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */

export interface LuxuryTravelTemplateProps {
  class?: string;
}

const props = defineProps<LuxuryTravelTemplateProps>();

/* ------------------------------------------------------------------ */
/*  Design Tokens                                                       */
/* ------------------------------------------------------------------ */

const microCaps = 'uppercase tracking-[0.15em] text-[11px] font-light';

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const COORDINATES = [
  "23°46'N · 90°22'E",
  "4°10'S · 55°30'E",
  "35°01'N · 135°46'E",
  "51°28'S · 69°09'W",
  "3°24'S · 36°41'E",
  "48°52'N · 2°21'E",
];

const destinations = [
  { name: 'Patagonia', type: 'Remote Wilderness', coords: "51°28'S · 69°09'W", image: 'https://placehold.co/480x640/0a0806/c49a5c?text=Patagonia' },
  { name: 'Maldives', type: 'Private Island', coords: "4°10'N · 73°30'E", image: 'https://placehold.co/480x640/0a0806/c49a5c?text=Maldives' },
  { name: 'Kyoto', type: 'Cultural Immersion', coords: "35°01'N · 135°46'E", image: 'https://placehold.co/480x640/0a0806/c49a5c?text=Kyoto' },
  { name: 'Serengeti', type: 'Remote Wilderness', coords: "2°20'S · 34°50'E", image: 'https://placehold.co/480x640/0a0806/c49a5c?text=Serengeti' },
  { name: 'Amalfi Coast', type: 'Private Charter', coords: "40°38'N · 14°36'E", image: 'https://placehold.co/480x640/0a0806/c49a5c?text=Amalfi' },
  { name: 'Iceland', type: 'Expedition', coords: "64°08'N · 21°56'W", image: 'https://placehold.co/480x640/0a0806/c49a5c?text=Iceland' },
];

const processSteps = [
  { number: '01', name: 'Consultation', description: 'We begin with a conversation, not a booking form.' },
  { number: '02', name: 'Curation', description: 'Our regional specialists design your itinerary from scratch.' },
  { number: '03', name: 'Refinement', description: 'We iterate until every detail feels right.' },
  { number: '04', name: 'Departure', description: 'We remain your point of contact throughout your journey.' },
];

const experiences = [
  { title: 'Private Islands', subtitle: 'Exclusive retreats beyond the reach of the ordinary', description: 'Secluded archipelagos and private atolls, staffed and styled to your exacting preferences. Complete privacy, absolute luxury.', image: 'https://placehold.co/1920x800/0a0806/c49a5c?text=Private+Islands' },
  { title: 'Expedition Yachts', subtitle: "Navigate the world's most remote coastlines", description: 'Bespoke marine expeditions aboard 60m+ explorer yachts. Your itinerary, your captain, your pace.', image: 'https://placehold.co/1920x800/0a0806/c49a5c?text=Expedition+Yachts' },
  { title: 'Cultural Immersions', subtitle: 'Access that cannot be purchased — only arranged', description: 'Private temple ceremonies, artisan workshops, dinner with local masters. Deep cultural access, respectfully curated.', image: 'https://placehold.co/1920x800/0a0806/c49a5c?text=Cultural+Immersions' },
  { title: 'Remote Wilderness', subtitle: "Earth's last untouched frontiers, made accessible", description: 'Fly-in safaris, polar expeditions, and desert camps in locations that appear on no brochure.', image: 'https://placehold.co/1920x800/0a0806/c49a5c?text=Remote+Wilderness' },
];

const testimonials = [
  { quote: "Voyage Atelier designed a three-week journey through Japan that exceeded every expectation we'd set — and we had high expectations. Each day revealed something we would never have found on our own: hidden gardens, private tea ceremonies, a kaiseki chef who prepared dinner in our ryokan solely for the two of us.", name: 'Elisabeth & Charles Whitmore', detail: 'Journey: Japan, Autumn 2024' },
  { quote: "We've used several luxury travel agencies over the years. Voyage Atelier is the first that actually listened. They didn't sell us a package — they asked what kind of people we are, then built something around the answer. Our Patagonia trip was the most meaningful two weeks of our lives.", name: 'Dr. Alessandro Rinaldi', detail: 'Journey: Patagonia, March 2024' },
  { quote: "From the first conversation to the final evening in the Maldives, we felt genuinely cared for — not as clients, but as guests. The attention to detail was extraordinary. They remembered my wife's birthday and arranged a private beach dinner with a local string quartet.", name: 'James & Priya Ashworth', detail: 'Journey: Maldives, January 2025' },
];

const journalEntries = [
  { title: 'A Season of Light in the Arctic Circle', destination: 'Svalbard, Norway', readingTime: '8 min read', image: 'https://placehold.co/600x400/0a0806/c49a5c?text=Arctic+Light' },
  { title: 'Lost Temples of the Irrawaddy', destination: 'Myanmar', readingTime: '12 min read', image: 'https://placehold.co/600x400/0a0806/c49a5c?text=Myanmar+Temples' },
  { title: "The Vintner's Table: Burgundy in Harvest", destination: 'Burgundy, France', readingTime: '6 min read', image: 'https://placehold.co/600x400/0a0806/c49a5c?text=Burgundy+Harvest' },
];

const navLinks = ['Destinations', 'Experiences', 'About', 'Journal', 'Contact'];

/* ------------------------------------------------------------------ */
/*  Reactive State                                                      */
/* ------------------------------------------------------------------ */

const scrolled = ref(false);
const mobileOpen = ref(false);
const coordIndex = ref(0);
const coordFade = ref(true);
const activeTestimonial = ref(0);
const testimonialPaused = ref(false);
const filmstripRef = ref<HTMLDivElement | null>(null);

let scrollHandler: (() => void) | null = null;
let coordInterval: ReturnType<typeof setInterval> | null = null;
let testimonialInterval: ReturnType<typeof setInterval> | null = null;

/* ------------------------------------------------------------------ */
/*  Lifecycle                                                           */
/* ------------------------------------------------------------------ */

onMounted(() => {
  // Scroll tracking
  scrollHandler = () => { scrolled.value = window.scrollY > 80; };
  window.addEventListener('scroll', scrollHandler, { passive: true });

  // Coordinate cycling
  coordInterval = setInterval(() => {
    coordFade.value = false;
    setTimeout(() => {
      coordIndex.value = (coordIndex.value + 1) % COORDINATES.length;
      coordFade.value = true;
    }, 400);
  }, 8000);

  // Testimonial auto-advance
  startTestimonialTimer();
});

onUnmounted(() => {
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler);
  if (coordInterval) clearInterval(coordInterval);
  if (testimonialInterval) clearInterval(testimonialInterval);
});

function startTestimonialTimer() {
  if (testimonialInterval) clearInterval(testimonialInterval);
  if (!testimonialPaused.value) {
    testimonialInterval = setInterval(() => {
      activeTestimonial.value = (activeTestimonial.value + 1) % testimonials.length;
    }, 12000);
  }
}

function pauseTestimonials() {
  testimonialPaused.value = true;
  if (testimonialInterval) clearInterval(testimonialInterval);
}

function resumeTestimonials() {
  testimonialPaused.value = false;
  startTestimonialTimer();
}

function selectTestimonial(i: number) {
  activeTestimonial.value = i;
  startTestimonialTimer();
}

function scrollFilmstrip(dir: 'left' | 'right') {
  if (!filmstripRef.value) return;
  const amount = filmstripRef.value.clientWidth * 0.6;
  filmstripRef.value.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
}
</script>

<template>
  <div
    :class="cn(
      'min-h-screen antialiased bg-[#0a0806] dark:bg-[#0a0806]',
      props.class,
    )"
    style="font-family: 'Inter', system-ui, sans-serif"
  >
    <!-- Google Fonts -->
    <component is="style">
      @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap');
      .scrollbar-hide::-webkit-scrollbar { display: none; }
      .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      @keyframes goldSweep { 0% { transform: translateX(-100%); } 100% { transform: translateX(100vw); } }
    </component>

    <!-- ═══════ Gold Loading Sweep ═══════ -->
    <div class="fixed top-0 left-0 right-0 h-[2px] z-[70] overflow-hidden pointer-events-none">
      <div
        class="h-full w-[40%] bg-gradient-to-r from-transparent via-[#c49a5c] to-transparent"
        style="animation: goldSweep 0.6s ease-out forwards"
      />
    </div>

    <!-- ═══════ NAVBAR ═══════ -->
    <!-- Phone bar -->
    <div class="fixed top-0 left-0 right-0 z-[60] flex justify-end px-6 lg:px-12 py-2">
      <span :class="cn(
        'font-mono text-[10px] transition-colors duration-300',
        scrolled ? 'text-[#1a1410]/60 dark:text-[#c49a5c]/60' : 'text-[#c49a5c]/60',
      )" style="font-family: 'DM Mono', monospace">
        +44 20 7123 4567 · Available 24/7
      </span>
    </div>

    <!-- Main nav -->
    <header :class="cn(
      'fixed top-6 left-0 right-0 z-50 transition-all duration-500',
      scrolled && 'border-b border-[#c49a5c]/20',
    )">
      <div class="mx-auto flex items-center justify-between px-6 lg:px-12 py-3 max-w-[1400px]">
        <a href="#" :class="cn(
          microCaps, 'tracking-[0.25em] transition-colors duration-300',
          scrolled ? 'text-[#1a1410] dark:text-[#c49a5c]' : 'text-[#c49a5c]',
        )">VOYAGE ATELIER</a>

        <nav class="hidden md:flex items-center gap-8">
          <a
            v-for="link in navLinks"
            :key="link"
            :href="`#${link.toLowerCase()}`"
            :class="cn(
              microCaps, 'transition-colors duration-200 hover:text-[#f5ede0]',
              scrolled
                ? 'text-[#6a5e54] dark:text-[#9a8878] hover:text-[#1a1410] dark:hover:text-[#f5ede0]'
                : 'text-[#9a8878] hover:text-[#f5ede0]',
            )"
          >{{ link }}</a>
        </nav>

        <button
          @click="mobileOpen = !mobileOpen"
          :class="cn(
            microCaps, 'md:hidden transition-colors duration-200',
            scrolled ? 'text-[#1a1410] dark:text-[#c49a5c]' : 'text-[#c49a5c]',
          )"
        >{{ mobileOpen ? 'CLOSE' : 'MENU' }}</button>
      </div>
    </header>

    <!-- Mobile overlay -->
    <Teleport to="body">
      <div v-if="mobileOpen" class="fixed inset-0 z-[55] bg-[#0a0806]/98 flex">
        <div class="hidden sm:block w-[55%] relative overflow-hidden">
          <img
            src="https://placehold.co/800x1200/0a0806/c49a5c?text=Voyage"
            alt="Travel"
            class="absolute inset-0 w-full h-full object-cover opacity-40"
          />
        </div>
        <div class="flex flex-col justify-center px-10 sm:w-[45%] w-full">
          <a
            v-for="(link, i) in navLinks"
            :key="link"
            :href="`#${link.toLowerCase()}`"
            @click="mobileOpen = false"
            class="text-[#f5ede0] text-2xl font-light py-4 border-b border-[#c49a5c]/10 hover:text-[#c49a5c] transition-colors duration-200"
            :style="{ animationDelay: `${i * 60}ms` }"
          >{{ link }}</a>
          <div class="mt-12 font-mono text-[10px] text-[#c49a5c]/60" style="font-family: 'DM Mono', monospace">
            +44 20 7123 4567
          </div>
        </div>
      </div>
    </Teleport>

    <!-- ═══════ HERO ═══════ -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0806]">
      <div class="absolute inset-0">
        <img
          src="https://placehold.co/1920x1080/0a0806/1c1610?text=Cinematic+Aerial+Video"
          alt="Aerial landscape"
          class="w-full h-full object-cover opacity-40"
        />
      </div>

      <!-- Noise texture -->
      <div
        class="absolute inset-0 opacity-[0.02] pointer-events-none"
        style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27 opacity=%271%27/%3E%3C/svg%3E'); background-repeat: repeat"
      />

      <!-- Vignette -->
      <div
        class="absolute inset-0 pointer-events-none"
        style="background: radial-gradient(ellipse at center, transparent 30%, rgba(10,8,6,0.6) 100%)"
      />

      <!-- Bottom gradient -->
      <div
        class="absolute inset-x-0 bottom-0 h-[35%] pointer-events-none"
        style="background: linear-gradient(to top, #0a0806, transparent)"
      />

      <!-- Content -->
      <div class="relative z-10 text-center max-w-3xl px-6">
        <p
          :class="cn(
            'text-xs text-[#c49a5c]/60 mb-8 transition-opacity duration-[400ms]',
            coordFade ? 'opacity-100' : 'opacity-0',
          )"
          style="font-family: 'DM Mono', monospace"
        >{{ COORDINATES[coordIndex] }}</p>

        <h1
          class="italic font-light text-[#f5ede0] leading-[1.1] mb-8"
          style="font-family: 'Libre Baskerville', Georgia, serif; font-size: clamp(2.5rem, 8vw, 5.5rem)"
        >Every journey, a singular story.</h1>

        <p
          class="text-lg lg:text-xl text-[#9a8878] max-w-2xl mx-auto leading-relaxed mb-10"
          style="font-family: 'EB Garamond', Georgia, serif"
        >We design journeys for those who've seen everything and seek to feel something. Private, unhurried, unrepeatable.</p>

        <a
          href="#contact"
          :class="cn(microCaps, 'text-[12px] text-[#c49a5c] inline-flex items-center gap-2 group relative')"
        >
          Begin your journey
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          <span class="absolute -bottom-1 left-0 w-0 h-px bg-[#c49a5c] transition-all duration-300 group-hover:w-full" />
        </a>

        <div class="flex flex-wrap justify-center gap-3 mt-10">
          <a
            v-for="dest in ['Patagonia', 'Maldives', 'Kyoto']"
            :key="dest"
            href="#destinations"
            :class="cn(microCaps, 'text-[#c49a5c] px-4 py-1.5 rounded-full border border-[#c49a5c]/20 hover:border-[#c49a5c]/50 transition-colors duration-200')"
          >⬡ {{ dest }}</a>
        </div>
      </div>

      <span class="absolute bottom-4 right-6 text-[9px] text-[#f5ede0]/30 font-light">
        Cinematography: Thomas Heaton
      </span>
    </section>

    <!-- ═══════ DESTINATIONS ═══════ -->
    <section id="destinations" class="py-20 lg:py-32 bg-[#0a0806]">
      <div class="max-w-[1400px] mx-auto px-6 lg:px-12">
        <h2 :class="cn(microCaps, 'text-[#c49a5c] mb-12')">CURATED DESTINATIONS</h2>

        <div class="relative">
          <!-- Scroll controls -->
          <button
            @click="scrollFilmstrip('left')"
            class="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-[#1c1610]/80 text-[#c49a5c] hover:bg-[#1c1610] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button
            @click="scrollFilmstrip('right')"
            class="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-[#1c1610]/80 text-[#c49a5c] hover:bg-[#1c1610] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>

          <!-- Filmstrip -->
          <div
            ref="filmstripRef"
            class="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
            style="scrollbar-width: none"
          >
            <div
              v-for="dest in destinations"
              :key="dest.name"
              class="snap-start shrink-0 w-[280px] sm:w-[300px] lg:w-[260px] xl:w-[280px] group relative overflow-hidden rounded-lg cursor-pointer"
              style="aspect-ratio: 2/3"
            >
              <img
                :src="dest.image"
                :alt="dest.name"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                style="transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94)"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[rgba(10,8,6,0.7)] via-transparent to-transparent" />
              <div class="absolute bottom-0 left-0 right-0 p-5">
                <span class="block mb-1 text-[10px] text-[#c49a5c]/70" style="font-family: 'DM Mono', monospace">{{ dest.coords }}</span>
                <h3 class="italic text-xl lg:text-2xl text-white mb-1" style="font-family: 'Libre Baskerville', Georgia, serif">{{ dest.name }}</h3>
                <span :class="cn(microCaps, 'text-[#9a8878] block mb-3')">{{ dest.type }}</span>
                <div class="h-px bg-[#c49a5c]/30 mb-3 w-12 transition-all duration-500 group-hover:w-20" />
                <span :class="cn(microCaps, 'text-[#9a8878] inline-flex items-center gap-1.5 group-hover:text-[#c49a5c] transition-colors duration-200')">
                  Explore
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════ PROCESS ═══════ -->
    <section class="py-20 lg:py-32 bg-[#1c1610]">
      <div class="max-w-[1400px] mx-auto px-6 lg:px-12">
        <h2 class="text-3xl lg:text-4xl font-light text-[#f5ede0] mb-4" style="font-family: 'Libre Baskerville', Georgia, serif">
          How We Craft Your Journey
        </h2>
        <p :class="cn(microCaps, 'text-[#c49a5c] mb-16')">THE ATELIER PROCESS</p>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-4 relative">
          <div class="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-[#c49a5c]/20" />

          <div v-for="step in processSteps" :key="step.number" class="relative text-center md:text-left">
            <div class="flex items-center justify-center md:justify-start gap-3 mb-4">
              <span class="w-4 h-4 rounded-full border border-[#c49a5c]/40 bg-[#1c1610] relative z-10 flex items-center justify-center">
                <span class="w-1.5 h-1.5 rounded-full bg-[#c49a5c]" />
              </span>
              <span class="text-sm text-[#c49a5c]" style="font-family: 'DM Mono', monospace">{{ step.number }}</span>
            </div>
            <h3 :class="cn(microCaps, 'text-[#f5ede0] mb-3')">{{ step.name }}</h3>
            <p
              class="text-sm text-[#9a8878] leading-relaxed max-w-[220px] mx-auto md:mx-0"
              style="font-family: 'EB Garamond', Georgia, serif"
            >{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════ EXPERIENCES ═══════ -->
    <section id="experiences" class="bg-[#0a0806]">
      <div
        v-for="exp in experiences"
        :key="exp.title"
        class="relative overflow-hidden group"
        style="height: 80vh; min-height: 500px"
      >
        <img
          :src="exp.image"
          :alt="exp.title"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
          style="transform: scale(1.01)"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[rgba(10,8,6,0.85)] via-[rgba(10,8,6,0.3)] to-transparent" />
        <div class="absolute bottom-0 left-0 right-0 p-8 lg:p-16 max-w-[1400px] mx-auto">
          <span :class="cn(microCaps, 'text-[#c49a5c] block mb-2')">{{ exp.subtitle }}</span>
          <h3 class="italic text-4xl lg:text-6xl text-[#f5ede0] mb-4" style="font-family: 'Libre Baskerville', Georgia, serif">{{ exp.title }}</h3>
          <p class="text-lg text-[#9a8878] max-w-xl leading-relaxed mb-6" style="font-family: 'EB Garamond', Georgia, serif">{{ exp.description }}</p>
          <a
            href="#contact"
            :class="cn(microCaps, 'text-[12px] text-[#c49a5c] inline-flex items-center gap-2 group/link relative')"
          >
            Inquire about this experience
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            <span class="absolute -bottom-1 left-0 w-0 h-px bg-[#c49a5c] transition-all duration-300 group-hover/link:w-full" />
          </a>
        </div>
      </div>
    </section>

    <!-- ═══════ TESTIMONIALS ═══════ -->
    <section
      class="min-h-screen flex items-center justify-center bg-[#0a0806] px-6"
      @mouseenter="pauseTestimonials"
      @mouseleave="resumeTestimonials"
    >
      <div class="max-w-3xl text-center relative">
        <span
          class="select-none pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 text-[#c49a5c]/15"
          style="font-family: 'Libre Baskerville', Georgia, serif; font-size: 12rem; line-height: 1"
          aria-hidden="true"
        >&ldquo;</span>

        <blockquote class="relative z-10">
          <p
            class="italic text-lg lg:text-xl text-[#f5ede0] leading-relaxed mb-10"
            style="font-family: 'EB Garamond', Georgia, serif"
          >&ldquo;{{ testimonials[activeTestimonial].quote }}&rdquo;</p>
          <footer>
            <cite class="not-italic">
              <span :class="cn(microCaps, 'text-[#c49a5c] block mb-1')">{{ testimonials[activeTestimonial].name }}</span>
              <span :class="cn(microCaps, 'text-[#5a4e44]')">{{ testimonials[activeTestimonial].detail }}</span>
            </cite>
          </footer>
        </blockquote>

        <div class="flex justify-center gap-2 mt-12">
          <button
            v-for="(_, i) in testimonials"
            :key="i"
            @click="selectTestimonial(i)"
            :class="cn('w-8 h-px transition-all duration-500', i === activeTestimonial ? 'bg-[#c49a5c]' : 'bg-[#c49a5c]/20')"
            :aria-label="`Testimonial ${i + 1}`"
          />
        </div>
      </div>
    </section>

    <!-- ═══════ JOURNAL ═══════ -->
    <section id="journal" class="py-20 lg:py-32 bg-[#0a0806]">
      <div class="max-w-[1400px] mx-auto px-6 lg:px-12">
        <h2 :class="cn(microCaps, 'text-[#c49a5c] mb-12')">THE JOURNAL</h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            v-for="entry in journalEntries"
            :key="entry.title"
            href="#"
            class="group block"
          >
            <div class="relative overflow-hidden rounded-lg mb-4 aspect-[3/2]">
              <img
                :src="entry.image"
                :alt="entry.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
            <span :class="cn(microCaps, 'text-[#c49a5c]/70 block mb-2')">{{ entry.destination }}</span>
            <h3
              class="italic text-xl text-[#f5ede0] group-hover:text-[#c49a5c] transition-colors duration-200 mb-2"
              style="font-family: 'Libre Baskerville', Georgia, serif"
            >{{ entry.title }}</h3>
            <span class="text-[10px] text-[#5a4e44]" style="font-family: 'DM Mono', monospace">{{ entry.readingTime }}</span>
            <span :class="cn(microCaps, 'text-[#c49a5c] mt-3 inline-flex items-center gap-1.5 relative')">
              Read the journey
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              <span class="absolute -bottom-0.5 left-0 w-0 h-px bg-[#c49a5c] transition-all duration-300 group-hover:w-full" />
            </span>
          </a>
        </div>
      </div>
    </section>

    <!-- ═══════ CONTACT ═══════ -->
    <section id="contact" class="py-20 lg:py-32 bg-[#141008]">
      <div class="max-w-[1400px] mx-auto px-6 lg:px-12">
        <h2
          class="italic text-3xl lg:text-5xl text-[#f5ede0] font-light text-center max-w-2xl mx-auto mb-16"
          style="font-family: 'Libre Baskerville', Georgia, serif"
        >Your journey begins with a conversation.</h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <!-- Phone -->
          <div class="text-center lg:text-left">
            <h3 :class="cn(microCaps, 'text-[#c49a5c] mb-6')">CALL US</h3>
            <p class="text-2xl lg:text-3xl text-[#c49a5c] mb-4" style="font-family: 'DM Mono', monospace">+44 20 7123 4567</p>
            <p class="text-sm text-[#9a8878] leading-relaxed max-w-sm" style="font-family: 'EB Garamond', Georgia, serif">
              Available 24/7 for existing clients. New inquiries by appointment.
            </p>
            <div class="flex items-center gap-4 mt-8 justify-center lg:justify-start">
              <a href="#" class="w-8 h-8 rounded-full border border-[#c49a5c]/20 flex items-center justify-center text-[#c49a5c]/60 hover:text-[#c49a5c] hover:border-[#c49a5c]/50 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" class="w-8 h-8 rounded-full border border-[#c49a5c]/20 flex items-center justify-center text-[#c49a5c]/60 hover:text-[#c49a5c] hover:border-[#c49a5c]/50 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </a>
            </div>
          </div>

          <!-- Inquiry form -->
          <div>
            <h3 :class="cn(microCaps, 'text-[#c49a5c] mb-6')">SEND AN INQUIRY</h3>
            <form class="space-y-5" @submit.prevent>
              <div>
                <label :class="cn(microCaps, 'text-[#5a4e44] block mb-1.5')">Name</label>
                <input type="text" class="w-full bg-transparent border-b border-[#2a2018] text-[#f5ede0] text-sm py-2.5 outline-none focus:border-[#c49a5c]/50 transition-colors placeholder:text-[#5a4e44]" placeholder="Your full name" />
              </div>
              <div>
                <label :class="cn(microCaps, 'text-[#5a4e44] block mb-1.5')">Where do you dream of going?</label>
                <input type="text" class="w-full bg-transparent border-b border-[#2a2018] text-[#f5ede0] text-sm py-2.5 outline-none focus:border-[#c49a5c]/50 transition-colors placeholder:text-[#5a4e44]" placeholder="Destination or region" />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label :class="cn(microCaps, 'text-[#5a4e44] block mb-1.5')">Preferred dates</label>
                  <input type="text" class="w-full bg-transparent border-b border-[#2a2018] text-[#f5ede0] text-sm py-2.5 outline-none focus:border-[#c49a5c]/50 transition-colors placeholder:text-[#5a4e44]" placeholder="e.g. March 2026" />
                </div>
                <div>
                  <label :class="cn(microCaps, 'text-[#5a4e44] block mb-1.5')">Party size</label>
                  <input type="text" class="w-full bg-transparent border-b border-[#2a2018] text-[#f5ede0] text-sm py-2.5 outline-none focus:border-[#c49a5c]/50 transition-colors placeholder:text-[#5a4e44]" placeholder="2 adults" />
                </div>
              </div>
              <div>
                <label :class="cn(microCaps, 'text-[#5a4e44] block mb-1.5')">Budget range</label>
                <select class="w-full bg-transparent border-b border-[#2a2018] text-[#f5ede0] text-sm py-2.5 outline-none focus:border-[#c49a5c]/50 transition-colors appearance-none">
                  <option value="" class="bg-[#141008]">Select range</option>
                  <option value="25-50" class="bg-[#141008]">$25,000 – $50,000</option>
                  <option value="50-100" class="bg-[#141008]">$50,000 – $100,000</option>
                  <option value="100-250" class="bg-[#141008]">$100,000 – $250,000</option>
                  <option value="250+" class="bg-[#141008]">$250,000+</option>
                </select>
              </div>
              <div>
                <label :class="cn(microCaps, 'text-[#5a4e44] block mb-1.5')">Message</label>
                <textarea rows="3" class="w-full bg-transparent border-b border-[#2a2018] text-[#f5ede0] text-sm py-2.5 outline-none focus:border-[#c49a5c]/50 transition-colors resize-none placeholder:text-[#5a4e44]" placeholder="Tell us about your ideal journey" />
              </div>
              <button
                type="submit"
                :class="cn(microCaps, 'text-[12px] mt-4 w-full py-3.5 bg-[#c49a5c] text-[#0a0806] rounded-sm hover:bg-[#d4aa6a] transition-colors duration-200')"
              >SEND YOUR INQUIRY</button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════ FOOTER ═══════ -->
    <footer class="py-8 bg-[#0a0806] border-t border-[#c49a5c]/10">
      <div class="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <span :class="cn(microCaps, 'text-[#5a4e44]')">© VOYAGE ATELIER {{ new Date().getFullYear() }}</span>
        <span :class="cn(microCaps, 'text-[#5a4e44]')">London · Paris · New York</span>
        <div class="flex items-center gap-4">
          <a href="#" :class="cn(microCaps, 'text-[#5a4e44] hover:text-[#c49a5c] transition-colors')">@voyageatelier</a>
          <a href="#" :class="cn(microCaps, 'text-[#5a4e44] hover:text-[#c49a5c] transition-colors')">Privacy</a>
        </div>
      </div>
    </footer>
  </div>
</template>
