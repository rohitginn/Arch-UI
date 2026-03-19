<script setup lang="ts">
/**
 * PodcastNetworkTemplate — Podcast & Media Network template (Wondery / Radiotopia aesthetic).
 *
 * Palette: Amber + Stone. Mode: Dark-editorial primary with light mode support.
 *
 * Sections:
 *   Nav → Hero (Network Showcase) → Featured Show → All Shows (filterable grid) →
 *   Latest Episodes Feed → Newsletter/Membership → About the Network → Footer → Mini Player
 */

import { ref, computed } from 'vue';
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

interface Show {
  id: string;
  name: string;
  tagline: string;
  category: string;
  episodeCount: number;
  accentColor: string;
  artwork: string;
  latestEpisode: {
    number: number;
    title: string;
    duration: string;
    description: string;
  };
}

interface Episode {
  id: string;
  showId: string;
  showName: string;
  number: number;
  title: string;
  duration: string;
  description: string;
  artwork: string;
  accentColor: string;
}

interface HostData {
  name: string;
  show: string;
  photo: string;
}

interface Props {
  class?: string;
}

const props = defineProps<Props>();

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const SHOWS: Show[] = [
  {
    id: 'syntax',
    name: 'Syntax & Signal',
    tagline: 'Decoding the future of technology, one layer at a time.',
    category: 'Technology',
    episodeCount: 143,
    accentColor: '#60a5fa',
    artwork: 'https://placehold.co/400x400/1e3a5f/60a5fa?text=S%26S',
    latestEpisode: { number: 143, title: 'Why AI Agents Will Replace SaaS', duration: '48:23', description: 'The paradigm shift from software-as-a-service to agents-as-a-service.' },
  },
  {
    id: 'form-function',
    name: 'Form & Function',
    tagline: 'Where design meets intention.',
    category: 'Design',
    episodeCount: 98,
    accentColor: '#fb923c',
    artwork: 'https://placehold.co/400x400/3d2512/fb923c?text=F%26F',
    latestEpisode: { number: 98, title: 'The Death of Flat Design', duration: '37:15', description: 'Why depth, texture, and physicality are returning to digital interfaces.' },
  },
  {
    id: 'undercurrent',
    name: 'The Undercurrent',
    tagline: 'Culture examined. Assumptions challenged.',
    category: 'Culture',
    episodeCount: 76,
    accentColor: '#a78bfa',
    artwork: 'https://placehold.co/400x400/2d1f4e/a78bfa?text=TU',
    latestEpisode: { number: 76, title: 'Loneliness in the Age of Connection', duration: '52:08', description: 'How hyperconnectivity created an epidemic of isolation.' },
  },
  {
    id: 'margin-call',
    name: 'Margin Call',
    tagline: 'The business of ideas, decoded.',
    category: 'Business',
    episodeCount: 112,
    accentColor: '#34d399',
    artwork: 'https://placehold.co/400x400/0d3320/34d399?text=MC',
    latestEpisode: { number: 112, title: "The Bootstrapper's Playbook", duration: '41:30', description: 'Building a $10M ARR company without venture capital.' },
  },
  {
    id: 'deep-work',
    name: 'Deep Work Radio',
    tagline: 'Focused thinking in a distracted world.',
    category: 'Technology',
    episodeCount: 64,
    accentColor: '#60a5fa',
    artwork: 'https://placehold.co/400x400/1e2d3d/60a5fa?text=DWR',
    latestEpisode: { number: 64, title: 'Context Switching is Killing Your Output', duration: '33:45', description: 'The neuroscience of focus and how to protect your attention.' },
  },
  {
    id: 'palette',
    name: 'Palette',
    tagline: 'Color, type, and the craft of visual storytelling.',
    category: 'Design',
    episodeCount: 55,
    accentColor: '#fb923c',
    artwork: 'https://placehold.co/400x400/3d2a12/fb923c?text=P',
    latestEpisode: { number: 55, title: 'Why Every Brand Looks the Same', duration: '29:10', description: 'The homogenization of visual identity and what comes next.' },
  },
  {
    id: 'common-ground',
    name: 'Common Ground',
    tagline: 'Finding nuance in a polarized world.',
    category: 'Culture',
    episodeCount: 42,
    accentColor: '#a78bfa',
    artwork: 'https://placehold.co/400x400/2a1e4e/a78bfa?text=CG',
    latestEpisode: { number: 42, title: 'The Art of Disagreeing Well', duration: '44:20', description: 'Why productive conflict is a skill worth mastering.' },
  },
  {
    id: 'upmarket',
    name: 'Upmarket',
    tagline: 'Growth strategy for ambitious teams.',
    category: 'Business',
    episodeCount: 87,
    accentColor: '#34d399',
    artwork: 'https://placehold.co/400x400/0d2d20/34d399?text=UM',
    latestEpisode: { number: 87, title: 'PLG Is Dead. Long Live PLG.', duration: '38:55', description: 'The evolution of product-led growth in a post-ZIRP world.' },
  },
];

const CATEGORIES = ['All', 'Technology', 'Design', 'Culture', 'Business'];

const LATEST_EPISODES: Episode[] = [
  { id: 'e1', showId: 'syntax', showName: 'Syntax & Signal', number: 143, title: 'Why AI Agents Will Replace SaaS', duration: '48:23', description: 'The paradigm shift from software-as-a-service to agents-as-a-service.', artwork: 'https://placehold.co/48x48/1e3a5f/60a5fa?text=S', accentColor: '#60a5fa' },
  { id: 'e2', showId: 'form-function', showName: 'Form & Function', number: 98, title: 'The Death of Flat Design', duration: '37:15', description: 'Why depth, texture, and physicality are returning to digital interfaces.', artwork: 'https://placehold.co/48x48/3d2512/fb923c?text=F', accentColor: '#fb923c' },
  { id: 'e3', showId: 'margin-call', showName: 'Margin Call', number: 112, title: "The Bootstrapper's Playbook", duration: '41:30', description: 'Building a $10M ARR company without venture capital.', artwork: 'https://placehold.co/48x48/0d3320/34d399?text=M', accentColor: '#34d399' },
  { id: 'e4', showId: 'undercurrent', showName: 'The Undercurrent', number: 76, title: 'Loneliness in the Age of Connection', duration: '52:08', description: 'How hyperconnectivity created an epidemic of isolation.', artwork: 'https://placehold.co/48x48/2d1f4e/a78bfa?text=U', accentColor: '#a78bfa' },
  { id: 'e5', showId: 'deep-work', showName: 'Deep Work Radio', number: 64, title: 'Context Switching is Killing Your Output', duration: '33:45', description: 'The neuroscience of focus and how to protect your attention.', artwork: 'https://placehold.co/48x48/1e2d3d/60a5fa?text=D', accentColor: '#60a5fa' },
  { id: 'e6', showId: 'upmarket', showName: 'Upmarket', number: 87, title: 'PLG Is Dead. Long Live PLG.', duration: '38:55', description: 'The evolution of product-led growth in a post-ZIRP world.', artwork: 'https://placehold.co/48x48/0d2d20/34d399?text=U', accentColor: '#34d399' },
];

const HOSTS: HostData[] = [
  { name: 'Maya Chen', show: 'Syntax & Signal', photo: 'https://placehold.co/80x80/1e3a5f/60a5fa?text=MC' },
  { name: 'Liam Walker', show: 'Form & Function', photo: 'https://placehold.co/80x80/3d2512/fb923c?text=LW' },
  { name: 'Aisha Okafor', show: 'The Undercurrent', photo: 'https://placehold.co/80x80/2d1f4e/a78bfa?text=AO' },
  { name: 'David Park', show: 'Margin Call', photo: 'https://placehold.co/80x80/0d3320/34d399?text=DP' },
  { name: 'Elena Ruiz', show: 'Deep Work Radio', photo: 'https://placehold.co/80x80/1e2d3d/60a5fa?text=ER' },
  { name: "James O'Brien", show: 'Palette', photo: 'https://placehold.co/80x80/3d2a12/fb923c?text=JO' },
  { name: 'Priya Mehta', show: 'Common Ground', photo: 'https://placehold.co/80x80/2a1e4e/a78bfa?text=PM' },
  { name: 'Tom Hadley', show: 'Upmarket', photo: 'https://placehold.co/80x80/0d2d20/34d399?text=TH' },
];

const FOOTER_GROUPS = [
  { title: 'Shows', links: ['Syntax & Signal', 'Form & Function', 'The Undercurrent', 'Margin Call'] },
  { title: 'Network', links: ['About', 'Hosts', 'Advertise', 'Press Kit'] },
  { title: 'Listen', links: ['Spotify', 'Apple Podcasts', 'Google Podcasts', 'RSS Feed'] },
];

/* ------------------------------------------------------------------ */
/*  State                                                               */
/* ------------------------------------------------------------------ */

const scrolled = ref(false);
const activeCategory = ref('All');
const currentEpisode = ref<Episode | null>(null);
const isPlaying = ref(false);
const hoveredShowId = ref<string | null>(null);
const hoveredStack = ref(false);

if (typeof window !== 'undefined') {
  window.addEventListener('scroll', () => { scrolled.value = window.scrollY > 20; }, { passive: true });
}

const filteredShows = computed(() =>
  activeCategory.value === 'All' ? SHOWS : SHOWS.filter(s => s.category === activeCategory.value)
);

const featuredShow = SHOWS[0];

function handlePlayEpisode(episode: Episode) {
  if (currentEpisode.value?.id === episode.id) {
    isPlaying.value = !isPlaying.value;
  } else {
    currentEpisode.value = episode;
    isPlaying.value = true;
  }
}

function playFeaturedShow() {
  handlePlayEpisode({
    id: `featured-${featuredShow.id}`,
    showId: featuredShow.id,
    showName: featuredShow.name,
    number: featuredShow.latestEpisode.number,
    title: featuredShow.latestEpisode.title,
    duration: featuredShow.latestEpisode.duration,
    description: featuredShow.latestEpisode.description,
    artwork: featuredShow.artwork,
    accentColor: featuredShow.accentColor,
  });
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

function getStackTransform(index: number): string {
  const rotations = [-6, -3, 0, 3];
  if (hoveredStack.value) {
    const offsets = [{ x: -80, y: -20 }, { x: -30, y: -40 }, { x: 20, y: 0 }, { x: 70, y: -30 }];
    return `translate(${offsets[index].x}px, ${offsets[index].y}px) rotate(0deg)`;
  }
  return `translate(${-8 + index * 4}px, ${-6 + index * 3}px) rotate(${rotations[index]}deg)`;
}

function getWaveBarHeight(index: number, playing: boolean): string {
  if (playing) {
    return `${8 + Math.sin(index * 0.8) * 12 + Math.random() * 6}px`;
  }
  return `${4 + Math.sin(index * 0.5) * 4}px`;
}
</script>

<template>
  <div
    :class="cn(
      'min-h-screen antialiased',
      'bg-[#0f0d0b] text-[#f0ebe3]',
      'dark:bg-[#0f0d0b] dark:text-[#f0ebe3]',
      props.class,
    )"
  >
    <!-- ── Navbar ── -->
    <header
      :class="cn(
        'sticky top-0 z-50 w-full transition-all duration-300 border-b',
        scrolled
          ? 'bg-[#0f0d0b]/90 backdrop-blur-xl border-white/5'
          : 'bg-[#0f0d0b] border-transparent',
      )"
    >
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <span class="text-amber-400 text-lg">◉</span>
          <span class="text-sm font-extrabold tracking-[0.1em] text-white">MERIDIAN</span>
        </div>

        <!-- Center nav -->
        <nav class="hidden md:flex items-center gap-6">
          <a
            v-for="link in ['Shows', 'Episodes', 'Network', 'Community', 'About']"
            :key="link"
            :href="`#${link.toLowerCase()}`"
            class="text-sm text-[#8a7e72] hover:text-white transition-colors duration-150"
          >{{ link }}</a>
        </nav>

        <!-- Right actions -->
        <div class="flex items-center gap-3">
          <button class="hidden sm:flex items-center justify-center w-8 h-8 rounded-lg text-[#8a7e72] hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <a href="#" class="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-[#1DB954]/50 text-[#1DB954] hover:bg-[#1DB954]/10 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" /></svg>
            Follow on Spotify
          </a>
          <a href="#" class="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold bg-amber-400 text-black hover:bg-amber-300 transition-colors">
            Subscribe free
          </a>
        </div>
      </div>
    </header>

    <!-- ── Hero — Network Showcase ── -->
    <section class="relative min-h-[90vh] flex items-center overflow-hidden">
      <!-- Background noise + orb -->
      <div class="absolute inset-0 z-0">
        <div
          class="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-[0.05]"
          :style="{ background: 'radial-gradient(circle, #fbbf24 0%, transparent 70%)' }"
        />
        <div class="absolute inset-0 opacity-[0.03]" :style="{ backgroundImage: `url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")`, backgroundRepeat: 'repeat' }" />
      </div>

      <div class="relative z-10 mx-auto max-w-7xl px-6 w-full">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left — Copy -->
          <div>
            <span class="inline-flex items-center mb-6 rounded-full px-3.5 py-1.5 text-xs font-medium bg-amber-400/10 text-amber-300 border border-amber-400/20">
              8 original shows · New episodes every week
            </span>

            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-white">
              Audio for people who
              <em class="italic" style="font-family: 'Playfair Display', Georgia, serif">think.</em>
            </h1>

            <p class="mt-6 text-lg leading-relaxed text-[#8a7e72] max-w-xl">
              In-depth conversations on technology, design, culture, and the business of ideas. No&nbsp;ads. No&nbsp;filler. Independent journalism in audio form.
            </p>

            <div class="flex flex-wrap gap-4 mt-8">
              <a href="#shows" class="inline-flex items-center px-6 py-3 rounded-xl text-sm font-bold bg-amber-400 text-black hover:bg-amber-300 transition-colors">
                Start listening free
              </a>
              <a href="#shows" class="inline-flex items-center px-6 py-3 rounded-xl text-sm font-medium border border-white/20 text-white hover:bg-white/[0.06] transition-colors">
                Browse all shows →
              </a>
            </div>

            <p class="mt-6 text-xs text-[#524840]">
              ⭐⭐⭐⭐⭐ 4.9 on Apple Podcasts · 2M monthly listeners
            </p>
          </div>

          <!-- Right — Show Stack -->
          <div class="flex justify-center lg:justify-end">
            <div
              class="relative w-[280px] h-[280px] lg:w-[320px] lg:h-[320px]"
              @mouseenter="hoveredStack = true"
              @mouseleave="hoveredStack = false"
            >
              <div
                v-for="(show, i) in SHOWS.slice(0, 4)"
                :key="show.id"
                class="absolute inset-0 flex items-center justify-center transition-all duration-500"
                :style="{
                  transform: getStackTransform(i),
                  zIndex: i,
                  transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                }"
              >
                <div
                  class="w-[180px] h-[180px] lg:w-[200px] lg:h-[200px] rounded-2xl overflow-hidden shadow-2xl"
                  :style="{ boxShadow: `0 0 40px ${show.accentColor}33` }"
                >
                  <img :src="show.artwork" :alt="show.name" class="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Section 1 — Featured Show ── -->
    <section class="py-16 lg:py-24 border-t border-white/5">
      <div class="mx-auto max-w-7xl px-6">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left — Artwork -->
          <div class="flex justify-center">
            <div
              class="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] rounded-3xl overflow-hidden shadow-2xl"
              :style="{ boxShadow: `0 0 60px ${featuredShow.accentColor}25` }"
            >
              <img :src="featuredShow.artwork" :alt="featuredShow.name" class="w-full h-full object-cover" />
            </div>
          </div>

          <!-- Right — Details -->
          <div>
            <span
              class="text-[10px] font-semibold uppercase tracking-[0.15em] block mb-2"
              :style="{ color: featuredShow.accentColor }"
            >
              {{ featuredShow.category }} · Show of the Week
            </span>
            <h2
              class="text-4xl lg:text-5xl font-bold text-white italic"
              style="font-family: 'Playfair Display', Georgia, serif"
            >{{ featuredShow.name }}</h2>
            <p class="mt-3 text-[#8a7e72] text-lg">{{ featuredShow.tagline }}</p>
            <p class="mt-4 text-sm text-[#524840] font-mono tabular-nums">{{ featuredShow.episodeCount }} episodes</p>

            <!-- Latest episode -->
            <div class="mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-mono tabular-nums" :style="{ color: featuredShow.accentColor }">
                  #{{ featuredShow.latestEpisode.number }}
                </span>
                <span class="text-xs text-[#8a7e72] font-mono tabular-nums">{{ featuredShow.latestEpisode.duration }}</span>
              </div>
              <p class="text-sm font-semibold text-white">{{ featuredShow.latestEpisode.title }}</p>
              <p class="text-xs text-[#524840] mt-1">{{ featuredShow.latestEpisode.description }}</p>
            </div>

            <div class="flex items-center gap-4 mt-6">
              <button
                @click="playFeaturedShow"
                class="w-16 h-16 rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform shadow-lg"
                :style="{ backgroundColor: featuredShow.accentColor }"
              >
                <svg class="w-7 h-7 ml-1" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="6,4 20,12 6,20" /></svg>
              </button>
              <div class="flex items-center gap-2">
                <a href="#" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border border-white/10 text-[#8a7e72] hover:text-white hover:border-white/20 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" /></svg>
                  Spotify
                </a>
                <a href="#" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border border-white/10 text-[#8a7e72] hover:text-white hover:border-white/20 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm-.002 4.5a7.5 7.5 0 0 1 5.028 13.073 6.5 6.5 0 0 0-1.978-2.673 4.5 4.5 0 1 0-6.1 0 6.5 6.5 0 0 0-1.978 2.673A7.5 7.5 0 0 1 11.998 4.5zM12 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 5c1.208 0 2.28.603 2.926 1.523.322.458.574.97.733 1.518-.47.16-.96.277-1.463.35L13.5 16.5a1.5 1.5 0 0 0-3 0l-.696 1.891a7.46 7.46 0 0 1-1.463-.35c.159-.548.41-1.06.733-1.518A3.49 3.49 0 0 1 12 15z" /></svg>
                  Apple
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Section 2 — All Shows ── -->
    <section id="shows" class="py-16 lg:py-24">
      <div class="mx-auto max-w-7xl px-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <h2 class="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">THE NETWORK</h2>
          <!-- Filter pills -->
          <div class="flex flex-wrap gap-2">
            <button
              v-for="cat in CATEGORIES"
              :key="cat"
              @click="activeCategory = cat"
              :class="cn(
                'px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200',
                activeCategory === cat
                  ? 'bg-amber-400 text-black'
                  : 'bg-white/5 text-[#8a7e72] hover:text-white hover:bg-white/10',
              )"
            >{{ cat }}</button>
          </div>
        </div>

        <!-- Show grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="show in filteredShows"
            :key="show.id"
            class="group relative rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer bg-[#211e1a] border"
            :style="{
              borderColor: hoveredShowId === show.id ? `${show.accentColor}50` : 'transparent',
              boxShadow: hoveredShowId === show.id ? `0 0 30px ${show.accentColor}15` : 'none',
            }"
            @mouseenter="hoveredShowId = show.id"
            @mouseleave="hoveredShowId = null"
          >
            <!-- Artwork -->
            <div class="relative aspect-square overflow-hidden">
              <img :src="show.artwork" :alt="show.name" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-[#211e1a] via-transparent to-transparent" />
              <!-- Play button on hover -->
              <button
                :class="cn(
                  'absolute bottom-3 right-3 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300',
                  'bg-amber-400 text-black shadow-lg',
                  hoveredShowId === show.id ? 'scale-100 opacity-100' : 'scale-75 opacity-0',
                )"
              >
                <svg class="w-5 h-5 ml-0.5" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="6,4 20,12 6,20" /></svg>
              </button>
            </div>
            <!-- Info -->
            <div class="p-4 -mt-8 relative z-10">
              <span class="text-[10px] font-semibold uppercase tracking-[0.12em] block mb-1" :style="{ color: show.accentColor }">{{ show.category }}</span>
              <h3
                :class="cn('text-xl font-bold text-white italic transition-transform duration-300', hoveredShowId === show.id && '-translate-y-0.5')"
                style="font-family: 'Playfair Display', Georgia, serif"
              >{{ show.name }}</h3>
              <p class="text-xs text-[#8a7e72] mt-1 font-mono tabular-nums">{{ show.episodeCount }} episodes</p>
              <p class="text-sm text-[#8a7e72] mt-2 line-clamp-2">{{ show.latestEpisode.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Section 3 — Latest Episodes Feed ── -->
    <section class="py-16 lg:py-24 border-t border-white/5">
      <div class="mx-auto max-w-7xl px-6">
        <h2 class="text-2xl lg:text-3xl font-extrabold tracking-tight text-white mb-8">JUST RELEASED</h2>
        <div class="space-y-1">
          <div
            v-for="ep in LATEST_EPISODES"
            :key="ep.id"
            class="group flex items-center gap-4 py-3 px-4 rounded-xl hover:bg-[#211e1a]/50 transition-colors cursor-pointer"
          >
            <!-- Artwork thumbnail -->
            <div
              class="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 ring-2"
              :style="{ '--tw-ring-color': ep.accentColor + '40' }"
            >
              <img :src="ep.artwork" :alt="ep.showName" class="w-full h-full object-cover" />
            </div>
            <!-- Info -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-0.5">
                <span class="text-xs font-mono tabular-nums" :style="{ color: ep.accentColor }">#{{ ep.number }}</span>
                <h4 class="text-sm font-semibold text-white truncate">{{ ep.title }}</h4>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs text-[#8a7e72]">{{ ep.showName }}</span>
                <span class="text-xs text-[#524840] truncate hidden sm:inline">{{ ep.description }}</span>
              </div>
            </div>
            <!-- Duration + Play -->
            <div class="flex items-center gap-3 flex-shrink-0">
              <span class="text-xs font-mono tabular-nums text-[#8a7e72]">{{ ep.duration }}</span>
              <button
                @click.stop="handlePlayEpisode(ep)"
                :class="cn(
                  'w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200',
                  currentEpisode?.id === ep.id && isPlaying
                    ? 'bg-amber-400 text-black'
                    : 'bg-transparent text-[#8a7e72] group-hover:text-amber-400 group-hover:bg-amber-400/10',
                )"
              >
                <svg v-if="currentEpisode?.id === ep.id && isPlaying" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
                <svg v-else class="w-4 h-4 ml-0.5" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <polygon points="6,4 20,12 6,20" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Section 4 — Newsletter / Membership ── -->
    <section class="py-16 lg:py-24 bg-[#0a0806] relative">
      <div class="absolute inset-0 opacity-[0.03]" :style="{ backgroundImage: `url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")`, backgroundRepeat: 'repeat' }" />

      <div class="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <h2 class="text-3xl lg:text-4xl font-extrabold text-white">Join the Meridian community.</h2>
        <p class="mt-4 text-[#8a7e72] text-lg">
          Weekly episode summaries, show notes, and exclusive member-only content.
        </p>

        <!-- Email form -->
        <div class="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="your@email.com"
            class="flex-1 px-4 py-3 rounded-xl bg-[#211e1a] border border-white/10 text-white placeholder-[#524840] text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-shadow"
          />
          <button class="px-6 py-3 rounded-xl text-sm font-bold bg-amber-400 text-black hover:bg-amber-300 transition-colors whitespace-nowrap">
            Subscribe
          </button>
        </div>

        <p class="mt-4 text-xs text-[#524840]">
          No spam. Unsubscribe anytime. Already 84,000 subscribers.
        </p>

        <!-- Member benefit pills -->
        <div class="flex flex-wrap justify-center gap-2 mt-6">
          <span
            v-for="benefit in ['Early access', 'Ad-free feed', 'Bonus episodes']"
            :key="benefit"
            class="px-3 py-1 rounded-full text-xs font-medium bg-amber-400/10 text-amber-300 border border-amber-400/20"
          >{{ benefit }}</span>
        </div>
      </div>
    </section>

    <!-- ── Section 5 — About the Network ── -->
    <section class="py-16 lg:py-24 border-t border-white/5">
      <div class="mx-auto max-w-7xl px-6">
        <div class="grid lg:grid-cols-2 gap-12 items-start">
          <!-- Left — Team photo -->
          <div class="rounded-2xl overflow-hidden bg-[#211e1a] aspect-[4/3]">
            <img
              src="https://placehold.co/800x600/211e1a/8a7e72?text=Meridian+Team"
              alt="Meridian team"
              class="w-full h-full object-cover opacity-80"
            />
          </div>

          <!-- Right — Manifesto -->
          <div>
            <h2 class="text-3xl lg:text-4xl font-extrabold text-white mb-6">The Network</h2>
            <p class="text-[#8a7e72] text-lg leading-relaxed mb-4">
              Meridian Audio was founded in 2021 on a simple belief: the best conversations happen when there's no pressure to fill silence with noise. We produce 8 original shows across technology, design, culture, and business — each one fiercely independent and entirely ad-free.
            </p>
            <p class="text-[#8a7e72] text-lg leading-relaxed mb-8">
              Our hosts are practitioners, not pundits. Every episode is researched, scripted where necessary, and edited to a standard usually reserved for public radio.
            </p>

            <!-- Stats -->
            <div class="flex flex-wrap gap-6 text-center">
              <div v-for="st in [{ num: '8', label: 'shows' }, { num: '2M', label: 'listeners' }, { num: '143', label: 'episodes' }, { num: '4', label: 'years independent' }]" :key="st.label">
                <div class="text-2xl font-extrabold text-amber-400 font-mono tabular-nums">{{ st.num }}</div>
                <div class="text-xs text-[#524840] mt-1">{{ st.label }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Host grid -->
        <div class="mt-16">
          <h3 class="text-sm font-semibold uppercase tracking-[0.12em] text-[#524840] mb-6">Our Hosts</h3>
          <div class="grid grid-cols-4 sm:grid-cols-8 gap-4">
            <div v-for="host in HOSTS" :key="host.name" class="text-center">
              <div class="w-16 h-16 mx-auto rounded-full overflow-hidden bg-[#211e1a] mb-2">
                <img :src="host.photo" :alt="host.name" class="w-full h-full object-cover" />
              </div>
              <p class="text-xs font-semibold text-white">{{ host.name }}</p>
              <p class="text-[10px] text-[#524840]">{{ host.show }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Footer ── -->
    <footer class="border-t border-white/5 py-12">
      <div class="mx-auto max-w-7xl px-6">
        <div class="grid sm:grid-cols-4 gap-8">
          <!-- Brand -->
          <div>
            <div class="flex items-center gap-2 mb-4">
              <span class="text-amber-400 text-lg">◉</span>
              <span class="text-sm font-extrabold tracking-[0.1em] text-white">MERIDIAN</span>
            </div>
            <p class="text-xs text-[#524840] leading-relaxed">
              Independent audio journalism for curious minds.
            </p>
          </div>

          <!-- Links -->
          <div v-for="group in FOOTER_GROUPS" :key="group.title">
            <h4 class="text-xs font-semibold uppercase tracking-[0.12em] text-[#8a7e72] mb-3">{{ group.title }}</h4>
            <ul class="space-y-2">
              <li v-for="link in group.links" :key="link">
                <a href="#" class="text-sm text-[#524840] hover:text-white transition-colors">{{ link }}</a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom -->
        <div class="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p class="text-xs text-[#524840]">© {{ new Date().getFullYear() }} Meridian Audio. All rights reserved.</p>
          <div class="flex items-center gap-4">
            <a href="#" class="text-xs text-[#524840] hover:text-white transition-colors">Privacy</a>
            <a href="#" class="text-xs text-[#524840] hover:text-white transition-colors">Terms</a>
            <a href="#" class="text-xs text-[#524840] hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>

    <!-- ── Persistent Mini Player ── -->
    <div
      v-if="currentEpisode"
      :class="cn(
        'fixed bottom-0 left-0 right-0 z-50 h-14 border-t transition-transform duration-500',
        'bg-[#211e1a] border-white/[0.08]',
        currentEpisode ? 'translate-y-0' : 'translate-y-full',
      )"
    >
      <div class="mx-auto max-w-7xl h-full flex items-center justify-between px-4 gap-4">
        <!-- Left: artwork + info -->
        <div class="flex items-center gap-3 min-w-0 flex-1">
          <img :src="currentEpisode.artwork" alt="" class="w-10 h-10 rounded-md flex-shrink-0" />
          <div class="min-w-0 hidden sm:block">
            <p class="text-sm font-semibold text-white truncate">{{ currentEpisode.title }}</p>
            <p class="text-xs text-amber-400">{{ currentEpisode.showName }}</p>
          </div>
        </div>

        <!-- Center: controls -->
        <div class="flex items-center gap-4">
          <button class="text-white/60 hover:text-white transition-colors hidden sm:block">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="11 19 2 12 11 5 11 19" /><polygon points="22 19 13 12 22 5 22 19" />
            </svg>
          </button>
          <button
            @click="isPlaying = !isPlaying"
            class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <svg v-if="isPlaying" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
            <svg v-else class="w-5 h-5 ml-0.5" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <polygon points="6,4 20,12 6,20" />
            </svg>
          </button>
          <button class="text-white/60 hover:text-white transition-colors hidden sm:block">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="13 19 22 12 13 5 13 19" /><polygon points="2 19 11 12 2 5 2 19" />
            </svg>
          </button>
        </div>

        <!-- Right: waveform + volume -->
        <div class="hidden md:flex items-center gap-3 flex-1 justify-end">
          <div class="flex items-center gap-[2px] h-6">
            <div
              v-for="i in 24"
              :key="i"
              class="w-[2px] rounded-full bg-amber-400/60 transition-all"
              :class="isPlaying && 'animate-pulse'"
              :style="{
                height: getWaveBarHeight(i - 1, isPlaying),
                animationDelay: `${(i - 1) * 50}ms`,
                animationDuration: `${600 + Math.random() * 400}ms`,
              }"
            />
          </div>
          <span class="text-xs font-mono tabular-nums text-[#8a7e72]">-32:15</span>
          <button class="text-white/60 hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Bottom spacer for mini player -->
    <div v-if="currentEpisode" class="h-14" />
  </div>
</template>
