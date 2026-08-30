<template>
    <div class="category-page">
  
      <!-- Category Hero -->
      <section class="category-page__hero">
        <Container>
          <h1 class="category-page__title">
            {{ category?.name }}
          </h1>
  
          <p class="category-page__description">
            {{ category?.description }}
          </p>
        </Container>
      </section>
  
      <!-- Category Products -->
      <section class="category-page__content">
        <Container>
  
          <div
            v-if="categoryProducts.length"
            class="category-page__grid"
          >
            <ProductCard
              v-for="product in categoryProducts"
              :key="product.id"
              :product="product"
            />
          </div>
  
          <div
            v-else
            class="category-page__empty"
          >
            <h2>No Products Found</h2>
            <p>
              There are currently no products in this category.
            </p>
          </div>
  
        </Container>
      </section>
  
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  
  import { categories } from '~/data/categories'
  import { products } from '~/data/products'
  
  const route = useRoute()
  
  const categorySlug = route.params.category as string
  
  const category = computed(() =>
    categories.find(
      category => category.slug === categorySlug
    )
  )
  
  const categoryProducts = computed(() =>
    products.filter(
      product => product.categoryId === category.value?.id
    )
  )
  
  useSeoMeta({
    title: computed(
      () => `${category.value?.name || 'Products'} | DentalTech Pro`
    ),
  
    description: computed(
      () =>
        category.value?.description ||
        'Browse our professional dental equipment.'
    ),
  
    ogTitle: computed(
      () => `${category.value?.name || 'Products'} | DentalTech Pro`
    )
  })
  </script>
  
  <style scoped lang="scss">
  .category-page {
  
    &__hero {
      padding: $space-24 0;
  
      background: linear-gradient(
        135deg,
        lighten($color-primary-600, 45%),
        lighten($color-secondary-500, 45%)
      );
  
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
  
    &__empty {
      padding: $space-20 0;
      text-align: center;
  
      h2 {
        font-size: $text-2xl;
        font-weight: $font-semibold;
        color: $color-gray-900;
        margin-bottom: $space-3;
      }
  
      p {
        color: $color-gray-600;
      }
    }
  }
  </style>