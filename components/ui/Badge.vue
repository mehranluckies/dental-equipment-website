<template>
  <span class="badge" :class="`badge--${variant}`">
    <slot />
  </span>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'gray'
}

withDefaults(defineProps<Props>(), {
  variant: 'primary'
})
</script>

<style scoped lang="scss">
.badge {
  display: inline-flex;
  align-items: center;
  padding: $space-1 $space-3;
  font-size: $text-xs;
  font-weight: $font-semibold;
  border-radius: $radius-full;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &--primary {
    background: $color-primary-100;
    color: $color-primary-700;
  }

  &--secondary {
    background: $color-secondary-100;
    color: $color-secondary-700;
  }

  &--success {
    background: lighten($color-success, 45%);
    color: darken($color-success, 10%);
  }

  &--warning {
    background: lighten($color-warning, 45%);
    color: darken($color-warning, 10%);
  }

  &--error {
    background: lighten($color-error, 45%);
    color: darken($color-error, 10%);
  }

  &--gray {
    background: $color-gray-100;
    color: $color-gray-700;
  }
}
</style>
