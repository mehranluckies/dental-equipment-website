<template>
  <NuxtLink :to="productUrl" class="product-card">
    <div class="product-card__image">
      <div class="product-card__placeholder"></div>

      <div
        v-if="product.badges.length"
        class="product-card__badges"
      >
        <Badge
          v-for="badge in product.badges.slice(0, 2)"
          :key="badge"
          variant="primary"
        >
          {{ badge }}
        </Badge>
      </div>
    </div>

    <div class="product-card__content">
      <div class="product-card__category">
        {{ categoryName }}
      </div>

      <h3 class="product-card__name">
        {{ product.name }}
      </h3>

      <p class="product-card__tagline">
        {{ product.tagline }}
      </p>

      <div
        v-if="product.keyFeatures.length"
        class="product-card__features"
      >
        <div
          v-for="feature in product.keyFeatures.slice(0, 3)"
          :key="feature.title"
          class="product-card__feature"
        >
          <component
            :is="CheckIcon"
            :size="16"
          />
          <span>{{ feature.title }}</span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { Check as CheckIcon } from 'lucide-vue-next'
import type { Product } from '~/types'
import { categories } from '~/data/categories'

interface Props {
  product: Product
}

const props = defineProps<Props>()

const category = computed(() => {
  return categories.find(
    c => c.id === props.product.categoryId
  )
})

const categoryName = computed(() => {
  return category.value?.name || ''
})

const productUrl = computed(() => {
  if (!category.value) {
    return `/products/${props.product.slug}`
  }

  return `/products/${category.value.slug}/${props.product.slug}`
})
</script>

<style scoped lang="scss">
.product-card {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: $radius-xl;
  overflow: hidden;
  box-shadow: $shadow-sm;
  transition: all $transition-base;
  height: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-lg;

    .product-card__placeholder {
      transform: scale(1.05);
    }
  }

  &__image {
    position: relative;
    width: 100%;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: $color-gray-100;
  }

  &__placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, lighten($color-primary-600, 35%), lighten($color-secondary-500, 35%));
    transition: transform $transition-slow;
  }

  &__badges {
    position: absolute;
    top: $space-3;
    left: $space-3;
    display: flex;
    flex-direction: column;
    gap: $space-2;
  }

  &__content {
    padding: $space-6;
    display: flex;
    flex-direction: column;
    gap: $space-3;
    flex: 1;
  }

  &__category {
    font-size: $text-xs;
    font-weight: $font-semibold;
    color: $color-primary-600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__name {
    font-size: $text-xl;
    font-weight: $font-semibold;
    color: $color-gray-900;
    line-height: $leading-snug;
  }

  &__tagline {
    font-size: $text-sm;
    color: $color-gray-600;
    line-height: $leading-normal;
  }

  &__features {
    display: flex;
    flex-direction: column;
    gap: $space-2;
    margin-top: $space-2;
  }

  &__feature {
    display: flex;
    align-items: center;
    gap: $space-2;
    font-size: $text-sm;
    color: $color-gray-700;

    svg {
      color: $color-success;
      flex-shrink: 0;
    }
  }
}
</style>
