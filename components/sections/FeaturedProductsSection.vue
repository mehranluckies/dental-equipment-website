```vue
<template>
  <section
    v-if="loading || products.length"
    class="featured-products-section"
  >
    <Container>
      <!-- Header -->
      <div class="featured-products-section__header">
        <div class="featured-products-section__heading">
          <span class="featured-products-section__eyebrow">
            {{ t('homeFeaturedProducts.eyebrow') }}
          </span>

          <h2 class="featured-products-section__title">
            {{ t('homeFeaturedProducts.title') }}
          </h2>

          <p class="featured-products-section__description">
            {{ t('homeFeaturedProducts.description') }}
          </p>
        </div>

        <NuxtLink
          :to="localePath('/products')"
          class="featured-products-section__view-all"
        >
          <span>
            {{ t('homeFeaturedProducts.viewAll') }}
          </span>

          <span class="featured-products-section__arrow">
            →
          </span>
        </NuxtLink>
      </div>

      <!-- Loading -->
      <div
        v-if="loading"
        class="featured-products-section__grid"
      >
        <div
          v-for="index in 6"
          :key="index"
          class="featured-product-skeleton"
        >
          <div class="featured-product-skeleton__image"></div>

          <div class="featured-product-skeleton__content">
            <div
              class="featured-product-skeleton__line featured-product-skeleton__line--category"
            ></div>

            <div
              class="featured-product-skeleton__line featured-product-skeleton__line--title"
            ></div>

            <div
              class="featured-product-skeleton__line featured-product-skeleton__line--title-small"
            ></div>

            <div
              class="featured-product-skeleton__line featured-product-skeleton__line--text"
            ></div>
          </div>
        </div>
      </div>

      <!-- Products -->
      <div
        v-else-if="products.length"
        class="featured-products-section__grid"
      >
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </Container>
  </section>
</template>

<script setup lang="ts">
import type { Product } from '~/types'

const { t, locale } = useI18n()
const localePath = useLocalePath()

const {
  products: allProducts,
  loading,
  fetchProducts
} = useProducts()

const products = computed<Product[]>(() => {
  return allProducts.value
    .filter(product => product.isFeatured === true)
    .slice(0, 6)
})

await fetchProducts()

watch(
  locale,
  async () => {
    await fetchProducts()
  }
)
</script>

<style scoped lang="scss">
.featured-products-section {
  padding: $space-24 0;
  background: $color-surface;

  &__header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: $space-8;
    margin-bottom: $space-8;
  }

  &__heading {
    max-width: 720px;
  }

  &__eyebrow {
    display: inline-flex;
    width: fit-content;
    margin-bottom: $space-3;
    padding: 6px 14px;

    border-radius: 999px;

    background: rgba(
      $color-primary-600,
      0.08
    );

    color: $color-primary-600;

    font-size: $text-xs;
    font-weight: $font-semibold;

    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  &__title {
    margin: 0 0 $space-3;

    color: $color-gray-900;

    font-size: clamp(
      2rem,
      3vw,
      3rem
    );

    font-weight: $font-bold;
    line-height: 1.15;
  }

  &__description {
    max-width: 650px;

    margin: 0;

    color: $color-gray-600;

    font-size: $text-base;
    line-height: 1.8;
  }

  &__view-all {
    flex-shrink: 0;

    display: inline-flex;
    align-items: center;

    gap: $space-2;

    color: $color-primary-600;

    font-size: $text-sm;
    font-weight: $font-semibold;

    text-decoration: none;

    transition:
      color $transition-fast,
      gap $transition-fast;

    &:hover {
      gap: $space-3;
      color: $color-primary-600;
    }
  }

  &__arrow {
    font-size: 1.1rem;
    line-height: 1;
  }

  &__grid {
    display: grid;

    grid-template-columns:
      repeat(3, 1fr);

    gap: $space-8;
  }
}

/* ==========================================
   SKELETON
========================================== */

.featured-product-skeleton {
  overflow: hidden;

  border: 1px solid $color-gray-200;
  border-radius: $radius-xl;

  background: white;

  box-shadow: $shadow-base;

  &__image {
    width: 100%;

    aspect-ratio: 16 / 10;

    background: $color-gray-100;

    animation:
      featured-skeleton-pulse
      1.5s ease-in-out infinite;
  }

  &__content {
    padding: $space-6;
  }

  &__line {
    height: 14px;

    margin-bottom: $space-3;

    border-radius: $radius-base;

    background: $color-gray-100;

    animation:
      featured-skeleton-pulse
      1.5s ease-in-out infinite;

    &--category {
      width: 30%;
      height: 12px;
    }

    &--title {
      width: 80%;
      height: 22px;
    }

    &--title-small {
      width: 55%;
      height: 22px;
    }

    &--text {
      width: 90%;
    }
  }
}

/* ==========================================
   RTL
========================================== */

:global(html[dir='rtl']) {
  .featured-products-section {
    direction: rtl;

    &__header {
      text-align: right;
    }

    &__heading {
      text-align: right;
    }

    &__view-all {
      flex-direction: row;
    }
  }
}

/* ==========================================
   TABLET
========================================== */

@media (max-width: 1024px) {
  .featured-products-section {
    padding: $space-20 0;

    &__header {
      align-items: flex-start;
    }

    &__grid {
      grid-template-columns:
        repeat(2, 1fr);

      gap: $space-6;
    }
  }
}

/* ==========================================
   MOBILE
========================================== */

@media (max-width: 767px) {
  .featured-products-section {
    padding: $space-16 0;

    &__header {
      flex-direction: column;
      align-items: flex-start;

      gap: $space-4;

      margin-bottom: $space-6;
    }

    &__title {
      font-size: $text-2xl;
    }

    &__description {
      font-size: $text-sm;
    }

    &__view-all {
      align-self: flex-start;
    }

    &__grid {
      grid-template-columns: 1fr;

      gap: $space-6;
    }
  }

  :global(html[dir='rtl']) {
    .featured-products-section {
      &__header {
        align-items: flex-start;
      }
    }
  }
}

@keyframes featured-skeleton-pulse {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}
</style>
