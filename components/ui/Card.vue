<template>
  <div class="card" :class="{ 'card--hover': hover }">
    <div v-if="$slots.image || image" class="card__image">
      <slot name="image">
        <img v-if="image" :src="image" :alt="imageAlt" />
      </slot>
    </div>
    <div class="card__content">
      <div v-if="$slots.badge || badge" class="card__badge">
        <slot name="badge">
          <span class="badge">{{ badge }}</span>
        </slot>
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  image?: string
  imageAlt?: string
  badge?: string
  hover?: boolean
}

withDefaults(defineProps<Props>(), {
  hover: false
})
</script>

<style scoped lang="scss">
.card {
  background: $color-background;
  border-radius: $radius-xl;
  overflow: hidden;
  box-shadow: $shadow-sm;
  transition: all $transition-base;
  height: 100%;
  display: flex;
  flex-direction: column;

  &--hover:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-lg;
  }

  &__image {
    width: 100%;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background: $color-gray-100;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform $transition-slow;
    }

    .card--hover:hover & img {
      transform: scale(1.05);
    }
  }

  &__content {
    padding: $space-6;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: $space-4;
  }

  &__badge {
    .badge {
      display: inline-block;
      padding: $space-1 $space-3;
      background: $color-primary-500;
      color: white;
      font-size: $text-xs;
      font-weight: $font-semibold;
      border-radius: $radius-full;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  }
}
</style>
