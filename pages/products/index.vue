<template>
  <div class="products-page">
    <section class="products-page__hero">
      <Container>
        <h1 class="products-page__title">Professional Dental Equipment</h1>
        <p class="products-page__description">
          Discover our complete range of digital dentistry solutions
        </p>
      </Container>
    </section>

    <section class="products-page__content">
      <Container>
        <div class="products-page__grid">
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
          />
        </div>
      </Container>
    </section>
  </div>
</template>

<script setup lang="ts">
import { products } from '~/data/products'

useSeoMeta({
  title: 'Professional Dental Equipment | DentalTech Pro',
  description: 'Browse our complete range of digital dentistry equipment including intraoral scanners, 3D printers, CAD/CAM systems, and more.',
  ogTitle: 'Professional Dental Equipment | DentalTech Pro'
})
</script>

<style scoped lang="scss">
.products-page {
  &__hero {
    padding: $space-24 0;
    background: linear-gradient(135deg, lighten($color-primary-600, 45%), lighten($color-secondary-500, 45%));
    text-align: center;
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
    color: $color-gray-700;
    max-width: 700px;
    margin: 0 auto;
  }

  &__content {
    padding: $space-20 0;
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
