<template>
  <section class="featured-section">
    <Container>
      <div class="featured-section__header">
        <h2 class="featured-section__title">Featured Products</h2>
        <p class="featured-section__description">
          Our most popular professional equipment
        </p>
      </div>
      <div class="featured-section__grid">
        <ProductCard
          v-for="product in featuredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </Container>
  </section>
</template>

<script setup lang="ts">
import { products } from '~/data/products'

const featuredProducts = computed(() => products.filter(p => p.isFeatured).slice(0, 6))
</script>

<style scoped lang="scss">
.featured-section {
  padding: $space-32 0;
  background: $color-surface;

  &__header {
    text-align: center;
    max-width: 700px;
    margin: 0 auto $space-16;
  }

  &__title {
    font-size: $text-4xl;
    font-weight: $font-bold;
    color: $color-gray-900;
    margin-bottom: $space-4;

    @include respond-to(md) {
      font-size: $text-5xl;
    }
  }

  &__description {
    font-size: $text-xl;
    color: $color-gray-600;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-8;

    @include respond-to(md) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include respond-to(lg) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
