<template>
  <NuxtLink
    :to="productUrl"
    class="product-card"
  >
    <!-- ========================================== -->
    <!-- IMAGE -->
    <!-- ========================================== -->

    <div class="product-card__image">
      <img
        v-if="product.heroImage"
        :src="product.heroImage"
        :alt="product.name"
      />

      <div
        v-else
        class="product-card__placeholder"
      />

      <!-- Badges -->

      <div
        v-if="product.badges?.length"
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

    <!-- ========================================== -->
    <!-- CONTENT -->
    <!-- ========================================== -->

    <div class="product-card__content">
      <!-- Category -->

      <div class="product-card__category">
        {{ categoryName }}
      </div>

      <!-- Title -->

      <h3 class="product-card__name">
        {{ product.name }}
      </h3>

      <!-- Tagline -->

      <p class="product-card__tagline">
        {{ product.tagline }}
      </p>

      <!-- Features -->

      <div
        v-if="product.keyFeatures?.length"
        class="product-card__features"
      >
        <div
          v-for="feature in product.keyFeatures.slice(0, 3)"
          :key="feature.title"
          class="product-card__feature"
        >
          <CheckIcon :size="16" />

          <span>{{ feature.title }}</span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { Check as CheckIcon } from 'lucide-vue-next'
import type { Product } from '~/types'

interface Props {
  product: Product
}

const props = defineProps<Props>()

const localePath = useLocalePath()

// Category name directly from Strapi
const categoryName = computed(() => props.product.category?.name || '')

// SEO Friendly URL
const productUrl = computed(() => {
  const categorySlug = props.product.category?.slug

  if (!categorySlug) {
    return localePath(`/products/${props.product.slug}`)
  }

  return localePath(
    `/products/${categorySlug}/${props.product.slug}`
  )
})
</script>

<style scoped lang="scss">
.product-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  background: $color-surface;
  border: 1px solid $color-border;
  border-radius: $radius-xl;
  box-shadow: $shadow-sm;

  text-decoration: none;

  transition:
    transform $transition-base,
    box-shadow $transition-base,
    border-color $transition-base;

  &:hover {
    transform: translateY(-4px);

    border-color: $color-primary-300;
    box-shadow: $shadow-lg;

    .product-card__image img {
      transform: scale(1.04);
    }
  }

  // ==========================================
  // IMAGE
  // ==========================================

  &__image {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 10;
    overflow: hidden;

    background: $color-gray-100;

    img {
      width: 100%;
      height: 100%;

      display: block;
      object-fit: cover;

      transition: transform $transition-base;
    }
  }

  // ==========================================
  // PLACEHOLDER
  // ==========================================

  &__placeholder {
    width: 100%;
    height: 100%;

    background:
      linear-gradient(
        135deg,
        $color-primary-50 0%,
        $color-gray-100 100%
      );
  }

  // ==========================================
  // BADGES
  // ==========================================

  &__badges {
    position: absolute;
    top: $space-3;
    left: $space-3;

    display: flex;
    flex-direction: column;
    gap: $space-2;
  }

  // ==========================================
  // CONTENT
  // ==========================================

  &__content {
    display: flex;
    flex-direction: column;
    flex: 1;

    padding: $space-6;
  }

  // ==========================================
  // CATEGORY
  // ==========================================

  &__category {
    margin-bottom: $space-3;

    color: $color-primary-600;

    font-size: $text-xs;
    font-weight: $font-semibold;
    line-height: $leading-normal;

    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  // ==========================================
  // TITLE
  // ==========================================

  &__name {
    margin: 0 0 $space-3;

    color: $color-text;

    font-size: $text-xl;
    font-weight: $font-semibold;
    line-height: $leading-tight;

    min-height: 56px;
  }

  // ==========================================
  // TAGLINE
  // ==========================================

  &__tagline {
    margin: 0 0 $space-6;

    color: $color-text-secondary;

    font-size: $text-sm;
    line-height: $leading-relaxed;

    min-height: 44px;
  }

  // ==========================================
  // FEATURES
  // ==========================================

  &__features {
    margin-top: auto;

    display: flex;
    flex-direction: column;
    gap: $space-2;
  }

  &__feature {
    display: flex;
    align-items: center;
    gap: $space-2;

    color: $color-gray-700;

    font-size: $text-sm;
    line-height: $leading-normal;

    svg {
      flex-shrink: 0;
      color: $color-success;
    }
  }
}


// ==========================================
// RTL
// ==========================================

:global(html[dir='rtl']) {
  .product-card {
    text-align: right;

    &__badges {
      left: auto;
      right: $space-3;
    }

    &__feature {
      flex-direction: row-reverse;
    }
  }
}
</style>