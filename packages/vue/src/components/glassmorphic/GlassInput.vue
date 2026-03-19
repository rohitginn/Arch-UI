<script setup lang="ts">
/**
 * GlassInput - Premium glassmorphic input component for Vue 3
 * 
 * Features:
 * - Frosted glass backdrop blur effect
 * - Floating label animation
 * - Multiple variants (default, filled, outline, glow)
 * - Error and helper text states
 * - Left/right icon support
 * - Character count display
 * - Focus glow animation
 * - Shake animation on error
 * - Full light/dark mode support
 * 
 * @example
 * <GlassInput
 *   v-model="email"
 *   label="Email"
 *   type="email"
 *   variant="glow"
 * />
 */

import { ref, computed, watch } from 'vue';
import { cn } from '@archui/core';

// Props interface
interface GlassInputProps {
  /** Input value (v-model) */
  modelValue?: string;
  /** Visual variant */
  variant?: 'default' | 'filled' | 'outline' | 'glow';
  /** Input size */
  inputSize?: 'sm' | 'md' | 'lg';
  /** Floating label text */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Input type */
  type?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Show character count */
  showCount?: boolean;
  /** Max length */
  maxLength?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Required field */
  required?: boolean;
  /** Input name */
  name?: string;
  /** Input id */
  id?: string;
  /** Autocomplete */
  autocomplete?: string;
  /** Additional CSS classes */
  class?: string;
  /** Container CSS classes */
  containerClass?: string;
}

const props = withDefaults(defineProps<GlassInputProps>(), {
  modelValue: '',
  variant: 'default',
  inputSize: 'md',
  type: 'text',
  disabled: false,
  required: false,
  showCount: false,
});

// Emits
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
}>();

// Refs
const inputRef = ref<HTMLInputElement | null>(null);
const isFocused = ref(false);
const hasShakeError = ref(false);

// Computed values
const inputValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
});

const hasValue = computed(() => inputValue.value.length > 0);
const isFloating = computed(() => isFocused.value || hasValue.value);
const hasError = computed(() => !!props.error);

// Watch for error changes to trigger shake
watch(() => props.error, (newError, oldError) => {
  if (newError && !oldError) {
    hasShakeError.value = true;
    setTimeout(() => {
      hasShakeError.value = false;
    }, 500);
  }
});

const floatingLabelSizeStyles = {
  labelPad: {
    sm: 'pt-4 pb-1',
    md: 'pt-5 pb-1',
    lg: 'pt-6 pb-1',
  },
  labelDefault: {
    sm: 'top-1/2 -translate-y-1/2 text-sm',
    md: 'top-1/2 -translate-y-1/2 text-base',
    lg: 'top-1/2 -translate-y-1/2 text-lg',
  },
  labelFloating: {
    sm: 'top-1.5 -translate-y-0 text-[11px] scale-[0.9] font-medium',
    md: 'top-2 -translate-y-0 text-xs scale-[0.85] font-medium',
    lg: 'top-2.5 -translate-y-0 text-xs scale-[0.85] font-medium',
  },
};

const resolvedInputSize = computed(() => props.inputSize || 'md');
const labelPadClass = computed(() => floatingLabelSizeStyles.labelPad[resolvedInputSize.value]);

// Variant classes
const variantClasses = computed(() => {
  const variants = {
    default: [
      // Light theme
      'bg-white/60',
      'backdrop-blur-md',
      'border-black/[0.08]',
      'text-slate-900',
      'placeholder:text-slate-400',
      'hover:bg-white/80',
      'hover:border-black/[0.12]',
      'focus:bg-white/90',
      'focus:border-blue-500/50',
      'focus:shadow-[0_4px_12px_rgba(0,0,0,0.05),0_0_0_2px_rgba(59,130,246,0.1)]',
      'focus:ring-2',
      'focus:ring-blue-500/20',
      'focus:-translate-y-0.5',
      // Dark theme
      'dark:bg-black/[0.2]',
      'dark:border-white/[0.1]',
      'dark:text-white',
      'dark:placeholder:text-slate-500',
      'dark:hover:bg-black/[0.3]',
      'dark:hover:border-white/[0.2]',
      'dark:focus:bg-black/[0.4]',
      'dark:focus:border-blue-500/50',
    ],
    filled: [
      // Light theme
      'bg-form-bg-hover',
      'border-transparent',
      'hover:bg-form-bg-focus',
      'focus:bg-form-bg',
      'focus:border-form-border-focus',
      'focus:shadow-sm',
      // Dark theme
      'dark:bg-form-bg-hover',
      'dark:hover:bg-form-bg-focus',
      'dark:focus:bg-form-bg',
    ],
    outline: [
      // Light theme
      'bg-transparent',
      'border-form-border',
      'hover:border-form-border-hover',
      'hover:bg-form-bg-hover',
      'focus:border-form-border-focus',
      'focus:bg-form-bg-focus',
      // Dark theme
      'dark:bg-transparent',
      'dark:border-form-border',
      'dark:hover:border-form-border-hover',
      'dark:hover:bg-form-bg-hover',
      'dark:focus:border-form-border-focus',
      'dark:focus:bg-form-bg-focus',
    ],
    glow: [
      // Light theme
      'bg-form-bg',
      'border-form-border',
      'shadow-sm',
      'focus:shadow-[0_0_20px_rgba(59,130,246,0.15)]',
      'focus:border-form-border-focus',
      'focus:bg-form-bg-focus',
      // Dark theme
      'dark:bg-form-bg',
      'dark:border-form-border',
      'dark:focus:shadow-[0_0_20px_rgba(255,255,255,0.1)]',
      'dark:focus:border-form-border-focus',
      'dark:focus:bg-form-bg-focus',
    ],
  };
  return variants[props.variant];
});

// Size classes
const sizeClasses = computed(() => {
  const sizes = {
    sm: ['h-9', 'px-3', 'text-sm'],
    md: ['h-11', 'px-4', 'text-base'],
    lg: ['h-13', 'px-5', 'text-lg'],
  };
  return sizes[props.inputSize];
});

// Combined input classes
const inputClasses = computed(() => {
  return cn(
    // Base classes
    'w-full',
    'rounded-xl',
    'backdrop-blur-md',
    'border',
    // Semantic text tokens
    'text-form-text',
    'placeholder:text-form-placeholder',
    // Dark theme text
    'dark:text-form-text',
    'dark:placeholder:text-form-placeholder',
    'transition-all',
    'duration-200',
    'ease-[cubic-bezier(0.4,0,0.2,1)]',
    // Focus styles
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-ring-focus/20',
    'dark:focus:ring-ring-focus/20',
    // Disabled styles
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'disabled:bg-form-bg-disabled',
    'disabled:border-form-border-disabled',
    // Variant (THIS PROVIDES THE BACKGROUND AND BORDER)
    variantClasses.value,
    // Size
    sizeClasses.value,
    // Error styles
    hasError.value && [
      'border-form-error-border',
      'focus:border-form-error-border',
      'focus:ring-form-error-ring/20',
    ],
    // Floating label padding
    props.label && labelPadClass.value,
    // Shake animation
    hasShakeError.value && 'animate-shake',
    // Custom classes
    props.class
  );
});

// Floating label classes
const labelClasses = computed(() => {
  return cn(
    'absolute',
    'left-4',
    'text-form-label',
    'dark:text-form-label',
    'pointer-events-none',
    'transition-all',
    'duration-200',
    'ease-[cubic-bezier(0.4,0,0.2,1)]',
    'origin-left',
    isFloating.value
      ? floatingLabelSizeStyles.labelFloating[resolvedInputSize.value]
      : floatingLabelSizeStyles.labelDefault[resolvedInputSize.value],
    hasError.value && 'text-form-error-text'
  );
});

// Event handlers
const handleFocus = (e: FocusEvent) => {
  isFocused.value = true;
  emit('focus', e);
};

const handleBlur = (e: FocusEvent) => {
  isFocused.value = false;
  emit('blur', e);
};

// Focus input when clicking label
const focusInput = () => {
  inputRef.value?.focus();
};

// Expose input ref for external access
defineExpose({
  input: inputRef,
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
});
</script>

<template>
  <div :class="cn('w-full', containerClass)">
    <div class="relative">
      <!-- Left icon slot -->
      <div
        v-if="$slots.leftIcon"
        :class="cn(
          label
            ? ['absolute', 'inset-y-0', 'left-4', 'z-10', 'flex', 'items-center', labelPadClass]
            : ['absolute', 'left-4', 'top-1/2', '-translate-y-1/2', 'z-10'],
          'text-form-placeholder',
          'dark:text-form-placeholder',
          'z-10',
          isFocused && 'text-form-label dark:text-form-label'
        )"
      >
        <slot name="leftIcon" />
      </div>

      <!-- Input -->
      <input
        ref="inputRef"
        v-model="inputValue"
        :type="type"
        :class="[
          inputClasses,
          $slots.leftIcon && 'pl-11',
          $slots.rightIcon && 'pr-11',
        ]"
        :placeholder="label ? '' : placeholder"
        :disabled="disabled"
        :required="required"
        :name="name"
        :id="id"
        :maxlength="maxLength"
        :autocomplete="autocomplete"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <!-- Floating Label -->
      <label
        v-if="label"
        :class="[labelClasses, $slots.leftIcon && 'left-11']"
        @click="focusInput"
      >
        {{ label }}
        <span v-if="required" class="text-red-400 ml-0.5">*</span>
      </label>

      <!-- Right icon slot -->
      <div
        v-if="$slots.rightIcon"
        :class="cn(
          label
            ? ['absolute', 'inset-y-0', 'right-4', 'z-10', 'flex', 'items-center', labelPadClass]
            : ['absolute', 'right-4', 'top-1/2', '-translate-y-1/2', 'z-10'],
          'text-form-placeholder',
          'dark:text-form-placeholder',
          isFocused && 'text-form-label dark:text-form-label'
        )"
      >
        <slot name="rightIcon" />
      </div>

      <!-- Focus glow ring (for glow variant) -->
      <div
        v-if="variant === 'glow' && isFocused"
        class="absolute inset-0 rounded-xl pointer-events-none animate-pulse bg-gradient-to-r from-white/5 via-white/10 to-white/5"
        aria-hidden="true"
      />
    </div>

    <!-- Helper/Error text and character count -->
    <div class="flex justify-between mt-1.5 px-1">
      <!-- Error or helper text -->
      <div>
        <p v-if="hasError" class="text-sm text-form-error-text">
          {{ error }}
        </p>
        <p v-else-if="helperText" class="text-sm text-form-helper dark:text-form-helper">
          {{ helperText }}
        </p>
      </div>

      <!-- Character count -->
      <p
        v-if="showCount && maxLength"
        :class="cn(
          'text-sm',
          'text-form-placeholder',
          'dark:text-form-placeholder',
          inputValue.length >= maxLength && 'text-form-error-text'
        )"
      >
        {{ inputValue.length }}/{{ maxLength }}
      </p>
    </div>
  </div>
</template>

<style scoped>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
  20%, 40%, 60%, 80% { transform: translateX(4px); }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}
</style>
