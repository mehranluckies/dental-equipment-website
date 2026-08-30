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
import { computed } from "vue";

interface Props {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  tag?: "button" | "a" | "NuxtLink";
  disabled?: boolean;
  loading?: boolean;
  iconOnly?: boolean;
  to?: string;
  href?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  tag: "button",
  disabled: false,
  loading: false,
  iconOnly: false,
  to: "",
  href: "",
});

const buttonClasses = computed(() => [
  `btn--${props.variant}`,
  `btn--${props.size}`,
  {
    "btn--loading": props.loading,
    "btn--icon-only": props.iconOnly,
  },
]);
</script>

<style scoped lang="scss">
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: $space-2;

  font-weight: $font-semibold;

  border-radius: $radius-lg;

  cursor: pointer;

  transition: all $transition-base;

  position: relative;

  border: 1px solid transparent;

  text-decoration: none;

  white-space: nowrap;

  &:focus-visible {
    @include focus-visible;
  }

  &:disabled,
  &[aria-disabled="true"] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Variants */

  &--primary {
    background: $color-primary-600;
    color: white;
    border-color: $color-primary-600;

    &:hover:not(:disabled) {
      background: $color-primary-700;
      border-color: $color-primary-700;
      transform: translateY(-1px);
      box-shadow: $shadow-md;
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  }

  &--secondary {
    background: $color-secondary-500;
    color: white;
    border-color: $color-secondary-500;

    &:hover {
      background: $color-secondary-600;
      border-color: $color-secondary-600;
      transform: translateY(-1px);
      box-shadow: $shadow-md;
    }
  }

  &--outline {
    background: transparent;
    color: $color-primary-600;
    border-color: $color-primary-600;

    &:hover {
      background: $color-primary-600;
      color: white;
    }
  }

  &--ghost {
    background: transparent;
    color: $color-gray-700;
    border-color: transparent;

    &:hover {
      background: $color-gray-100;
    }
  }

  &--danger {
    background: $color-error;
    color: white;
    border-color: $color-error;

    &:hover {
      background: darken($color-error, 10%);
      border-color: darken($color-error, 10%);
    }
  }

  /* Sizes */

  &--sm {
    padding: $space-2 $space-4;
    font-size: $text-sm;
    min-height: 32px;

    &.btn--icon-only {
      padding: $space-2;
      width: 32px;
    }
  }

  &--md {
    padding: $space-3 $space-6;
    font-size: $text-base;
    min-height: 40px;

    &.btn--icon-only {
      padding: $space-3;
      width: 40px;
    }
  }

  &--lg {
    padding: $space-4 $space-8;
    font-size: $text-lg;
    min-height: 48px;

    &.btn--icon-only {
      padding: $space-4;
      width: 48px;
    }
  }

  /* Loading */

  &--loading {
    pointer-events: none;

    .btn__content {
      opacity: 0;
    }
  }

  &__spinner {
    position: absolute;

    width: 16px;
    height: 16px;

    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;

    border-radius: 50%;

    animation: spin 0.6s linear infinite;
  }

  &__content {
    display: inline-flex;
    align-items: center;
    gap: $space-2;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>