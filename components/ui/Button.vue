<template>
  <NuxtLink
    v-if="tag === 'NuxtLink'"
    :to="to"
    class="btn"
    :class="buttonClasses"
    :aria-disabled="disabled || loading"
  >
    <span v-if="loading" class="btn__spinner"></span>
    <span class="btn__content">
      <slot />
    </span>
  </NuxtLink>

  <a
    v-else-if="tag === 'a'"
    :href="href"
    class="btn"
    :class="buttonClasses"
    :aria-disabled="disabled || loading"
  >
    <span v-if="loading" class="btn__spinner"></span>
    <span class="btn__content">
      <slot />
    </span>
  </a>

  <button
    v-else
    class="btn"
    :class="buttonClasses"
    :disabled="disabled || loading"
    type="button"
  >
    <span v-if="loading" class="btn__spinner"></span>
    <span class="btn__content">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  tag?: 'button' | 'a' | 'NuxtLink'
  disabled?: boolean
  loading?: boolean
  iconOnly?: boolean
  to?: string
  href?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  tag: 'button',
  disabled: false,
  loading: false,
  iconOnly: false,
  to: '',
  href: '',
})

const buttonClasses = computed(() => [
  `btn--${props.variant}`,
  `btn--${props.size}`,
  {
    'btn--loading': props.loading,
    'btn--icon-only': props.iconOnly,
  },
])
</script>

<style scoped lang="scss">
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: $space-2;

  min-height: 40px;
  padding: $space-3 $space-6;

  font-size: $text-base;
  font-weight: $font-semibold;
  line-height: $leading-normal;

  border: 1px solid transparent;
  border-radius: $radius-lg;

  position: relative;
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;

  transition:
    background-color $transition-base,
    border-color $transition-base,
    color $transition-base,
    box-shadow $transition-base,
    transform $transition-fast;

  &:focus-visible {
    @include focus-visible;
  }

  &:disabled,
  &[aria-disabled='true'] {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  // ==========================================
  // PRIMARY — GOLD
  // ==========================================

  &--primary {
    background: $color-primary-500;
    color: $color-black;
    border-color: $color-primary-500;

    &:hover:not(:disabled) {
      background: $color-primary-hover;
      border-color: $color-primary-hover;
      transform: translateY(-1px);
      box-shadow: $shadow-md;
    }

    &:active:not(:disabled) {
      background: $color-primary-active;
      border-color: $color-primary-active;
      transform: translateY(0);
      box-shadow: none;
    }
  }

  // ==========================================
  // SECONDARY — BLACK
  // ==========================================

  &--secondary {
    background: $color-black;
    color: $color-white;
    border-color: $color-black;

    &:hover:not(:disabled) {
      background: $color-secondary-700;
      border-color: $color-secondary-700;
      transform: translateY(-1px);
      box-shadow: $shadow-md;
    }

    &:active:not(:disabled) {
      background: $color-secondary-800;
      border-color: $color-secondary-800;
      transform: translateY(0);
      box-shadow: none;
    }
  }

  // ==========================================
  // OUTLINE — GOLD
  // ==========================================

  &--outline {
    background: transparent;
    color: $color-primary-600;
    border-color: $color-primary-500;

    &:hover:not(:disabled) {
      background: $color-primary-500;
      color: $color-black;
      border-color: $color-primary-500;
    }

    &:active:not(:disabled) {
      background: $color-primary-600;
      border-color: $color-primary-600;
    }
  }

  // ==========================================
  // GHOST
  // ==========================================

  &--ghost {
    background: transparent;
    color: $color-text-secondary;
    border-color: transparent;

    &:hover:not(:disabled) {
      background: $color-gray-100;
      color: $color-text;
    }

    &:active:not(:disabled) {
      background: $color-gray-200;
    }
  }

  // ==========================================
  // DANGER
  // ==========================================

  &--danger {
    background: $color-error;
    color: $color-white;
    border-color: $color-error;

    &:hover:not(:disabled) {
      background: darken($color-error, 8%);
      border-color: darken($color-error, 8%);
      transform: translateY(-1px);
      box-shadow: $shadow-md;
    }

    &:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: none;
    }
  }

  // ==========================================
  // SMALL
  // ==========================================

  &--sm {
    min-height: 32px;
    padding: $space-2 $space-4;
    font-size: $text-sm;

    &.btn--icon-only {
      width: 32px;
      padding: $space-2;
    }
  }

  // ==========================================
  // MEDIUM
  // ==========================================

  &--md {
    min-height: 40px;
    padding: $space-3 $space-6;
    font-size: $text-base;

    &.btn--icon-only {
      width: 40px;
      padding: $space-3;
    }
  }

  // ==========================================
  // LARGE
  // ==========================================

  &--lg {
    min-height: 48px;
    padding: $space-4 $space-8;
    font-size: $text-lg;

    &.btn--icon-only {
      width: 48px;
      padding: $space-4;
    }
  }

  // ==========================================
  // ICON ONLY
  // ==========================================

  &--icon-only {
    aspect-ratio: 1;
  }

  // ==========================================
  // LOADING
  // ==========================================

  &--loading {
    pointer-events: none;

    .btn__content {
      opacity: 0;
    }
  }

  // ==========================================
  // CONTENT
  // ==========================================

  &__content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: $space-2;
  }

  // ==========================================
  // SPINNER
  // ==========================================

  &__spinner {
    position: absolute;

    width: 16px;
    height: 16px;

    border: 2px solid rgba(0, 0, 0, 0.2);
    border-top-color: currentColor;
    border-radius: $radius-full;

    animation: spin 0.6s linear infinite;
  }

  // White spinner for dark buttons
  &--secondary,
  &--danger {
    .btn__spinner {
      border-color: rgba(255, 255, 255, 0.3);
      border-top-color: $color-white;
    }
  }
}


// ==========================================
// SPINNER ANIMATION
// ==========================================

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>