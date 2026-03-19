<script lang="ts">
import SectionWrapper from '../shared/SectionWrapper.vue';
</script>

<script setup lang="ts">
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface ContactField {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'textarea';
  placeholder?: string;
  required?: boolean;
}

export interface ContactCardProps {
  heading?: string;
  subheading?: string;
  fields?: ContactField[];
  submitLabel?: string;
}

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */

withDefaults(defineProps<ContactCardProps>(), {
  heading: 'Contact us',
  subheading: undefined,
  fields: () => [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name', required: true },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', required: true },
    { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Your message...', required: true },
  ],
  submitLabel: 'Send',
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
  'bg-[var(--glass-surface)] text-sm text-[var(--glass-text)]',
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

    <div class="mx-auto max-w-lg">
      <div
        :class="cn(
          'rounded-2xl border border-[var(--glass-edge)] p-8 md:p-10',
          'bg-[var(--glass-surface)] backdrop-blur-md shadow-lg'
        )"
      >
        <div v-if="heading || subheading" class="mb-8 text-center">
          <h2 v-if="heading" class="text-2xl font-bold text-[var(--glass-text)] mb-2">{{ heading }}</h2>
          <p v-if="subheading" class="text-sm text-[var(--glass-text)]/60">{{ subheading }}</p>
        </div>

        <form class="space-y-5" @submit="handleSubmit">
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

          <button
            type="submit"
            :class="cn(
              'w-full rounded-xl px-6 py-3',
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
    </div>
  </SectionWrapper>
</template>
