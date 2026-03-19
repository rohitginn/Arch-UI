<script lang="ts">
import SectionWrapper from '../shared/SectionWrapper.vue';
import SectionHeading from '../shared/SectionHeading.vue';
</script>

<script setup lang="ts">
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface ContactInfoItem {
  label: string;
  value: string;
  href?: string;
}

export interface SocialItem {
  href: string;
  label: string;
}

export interface ContactField {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'textarea';
  placeholder?: string;
  required?: boolean;
}

export interface ContactSplitProps {
  heading?: string;
  subheading?: string;
  contactInfo?: ContactInfoItem[];
  fields?: ContactField[];
  submitLabel?: string;
}

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */

withDefaults(defineProps<ContactSplitProps>(), {
  heading: 'Get in touch',
  subheading: undefined,
  contactInfo: undefined,
  fields: () => [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name', required: true },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', required: true },
    { name: 'subject', label: 'Subject', type: 'text', placeholder: 'How can we help?' },
    { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Tell us more...', required: true },
  ],
  submitLabel: 'Send message',
});

/* ------------------------------------------------------------------ */
/*  Emit                                                                */
/* ------------------------------------------------------------------ */

const emit = defineEmits<{
  submit: [data: Record<string, string>];
}>();

function handleSubmit(e: Event) {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const data: Record<string, string> = {};
  formData.forEach((val, key) => {
    data[key] = val.toString();
  });
  emit('submit', data);
}

const inputClasses = cn(
  'w-full rounded-xl border border-[var(--glass-edge)] px-4 py-3',
  'bg-[var(--glass-surface)] backdrop-blur-md text-sm text-[var(--glass-text)]',
  'placeholder:text-[var(--glass-text)]/40',
  'focus:outline-none focus:ring-2 focus:ring-[var(--glass-accent)] focus:border-transparent',
  'transition-all duration-200'
);
</script>

<template>
  <SectionWrapper padding="default">
    <template v-if="$slots.background" #background>
      <slot name="background" />
    </template>

    <SectionHeading
      v-if="heading || subheading"
      :heading="heading"
      :subheading="subheading"
      align="left"
      class="mb-12"
    />

    <div class="grid gap-12 lg:grid-cols-2">
      <!-- Left — Info -->
      <div class="space-y-8">
        <div v-if="contactInfo && contactInfo.length > 0" class="space-y-4">
          <div v-for="(info, i) in contactInfo" :key="i" class="flex items-start gap-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--glass-accent)]/10 text-[var(--glass-accent)]">
              <slot :name="`icon-${info.label.toLowerCase()}`">
                <!-- Default placeholder -->
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </slot>
            </div>
            <div>
              <div class="text-xs font-medium text-[var(--glass-text)]/50 uppercase tracking-wider">
                {{ info.label }}
              </div>
              <a
                v-if="info.href"
                :href="info.href"
                class="text-sm text-[var(--glass-text)] hover:text-[var(--glass-accent)] transition-colors"
              >
                {{ info.value }}
              </a>
              <div v-else class="text-sm text-[var(--glass-text)]">{{ info.value }}</div>
            </div>
          </div>
        </div>

        <!-- Social links slot -->
        <slot name="socials" />

        <!-- Aside / map slot -->
        <slot name="aside" />
      </div>

      <!-- Right — Form -->
      <form
        :class="cn(
          'rounded-2xl border border-[var(--glass-edge)] p-6 md:p-8',
          'bg-[var(--glass-surface)] backdrop-blur-md'
        )"
        @submit="handleSubmit"
      >
        <div class="space-y-5">
          <div v-for="field in fields" :key="field.name">
            <label
              :for="field.name"
              class="block text-xs font-medium text-[var(--glass-text)]/60 mb-1.5 uppercase tracking-wider"
            >
              {{ field.label }}
              <span v-if="field.required" class="text-red-400 ml-0.5">*</span>
            </label>
            <textarea
              v-if="field.type === 'textarea'"
              :id="field.name"
              :name="field.name"
              :placeholder="field.placeholder"
              :required="field.required"
              rows="4"
              :class="cn(inputClasses, 'resize-none')"
            />
            <input
              v-else
              :id="field.name"
              :name="field.name"
              :type="field.type ?? 'text'"
              :placeholder="field.placeholder"
              :required="field.required"
              :class="inputClasses"
            />
          </div>
        </div>

        <button
          type="submit"
          :class="cn(
            'mt-6 w-full rounded-xl px-6 py-3',
            'bg-[var(--glass-accent)] text-white text-sm font-semibold',
            'transition-all duration-200 hover:brightness-110',
            'active:scale-[0.97] active:transition-transform active:duration-75',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--glass-accent)]'
          )"
        >
          {{ submitLabel }}
        </button>
      </form>
    </div>
  </SectionWrapper>
</template>
