<template>
  <div class="product-detail">

    <!-- Loading -->
    <div v-if="loading" class="product-detail__loading">
      <Container>
        <div class="loading-content">
          <div class="loading-content__spinner"></div>

          <p>
            {{ t('productDetail.loading') }}
          </p>
        </div>
      </Container>
    </div>

    <!-- Product -->
    <template v-else-if="product">

      <!-- Hero -->
      <section class="product-detail__hero">
        <Container>

          <!-- Breadcrumb -->
          <!-- Breadcrumb -->
          <AppBreadcrumb :items="[
            {
              label: t('productDetail.breadcrumb.products'),
              to: localePath('/products')
            },
            ...(product.category?.slug
              ? [
                {
                  label: product.category.name,
                  to: localePath(
                    `/products/${product.category.slug}`
                  )
                }
              ]
              : []),
            {
              label: product.name
            }
          ]" />

          <div class="product-detail__hero-grid">

            <!-- Gallery -->
            <div class="product-detail__gallery">

              <div class="product-detail__main-image">
                <img v-if="activeImage" :src="activeImage" :alt="product.name" />

                <div v-else class="product-detail__placeholder">
                  <span>
                    {{ t('productDetail.noImage') }}
                  </span>
                </div>
              </div>

              <!-- Thumbnails -->
              <div v-if="galleryImages.length > 1" class="product-detail__thumbnails">
                <button v-for="(image, index) in galleryImages" :key="`${image}-${index}`" type="button"
                  class="product-detail__thumbnail" :class="{
                    'product-detail__thumbnail--active':
                      activeImage === image
                  }" @click="activeImage = image">
                  <img :src="image" :alt="`${product.name} ${index + 1}`" />
                </button>
              </div>

            </div>

            <!-- Product Info -->
            <div class="product-detail__info">

              <!-- Badges -->
              <div v-if="product.badges?.length" class="product-detail__badges">
                <Badge v-for="badge in product.badges" :key="badge" variant="primary">
                  {{ badge }}
                </Badge>
              </div>

              <!-- Category -->
              <div class="product-detail__category">

                <span v-if="product.category">
                  {{ product.category.name }}
                </span>

                <span v-if="
                  product.category &&
                  product.subcategory
                " class="product-detail__category-separator">
                  /
                </span>

                <span v-if="product.subcategory">
                  {{ product.subcategory.name }}
                </span>

              </div>

              <!-- Name -->
              <h1 class="product-detail__name">
                {{ product.name }}
              </h1>

              <!-- Tagline -->
              <p v-if="product.tagline" class="product-detail__tagline">
                {{ product.tagline }}
              </p>

              <!-- Product Code -->
              <div v-if="product.sku" class="product-detail__sku">
                <span class="product-detail__sku-label">
                  {{ t('productDetail.productCode') }}
                </span>

                <span class="product-detail__sku-value">
                  {{ product.sku }}
                </span>
              </div>

              <!-- Description -->
              <p v-if="product.description" class="product-detail__description">
                {{ product.description }}
              </p>

              <!-- Actions -->
              <div class="product-detail__actions">

                <Button size="lg" tag="NuxtLink" :to="localePath('/request-quote')">
                  {{ t('productDetail.requestQuote') }}
                </Button>

                <Button size="lg" variant="outline" tag="NuxtLink" :to="localePath('/support/contact')">
                  {{ t('productDetail.contactSales') }}
                </Button>

              </div>

              <!-- Manual -->
              <a v-if="product.manual" :href="product.manual" target="_blank" rel="noopener noreferrer"
                class="product-detail__manual">
                <span class="product-detail__manual-icon">
                  PDF
                </span>

                <span class="product-detail__manual-content">
                  <strong>
                    {{ t('productDetail.productManual') }}
                  </strong>

                  <small>
                    {{ t('productDetail.viewDownloadPdf') }}
                  </small>
                </span>

                <span class="product-detail__manual-arrow">
                  →
                </span>
              </a>

              <!-- Share -->
              <div class="product-detail__share">

                <span class="product-detail__share-label">
                  {{ t('productDetail.shareProduct') }}
                </span>

                <button type="button" class="product-detail__share-button" @click="shareProduct">
                  {{ shareLabel }}
                </button>

              </div>

            </div>

          </div>
        </Container>
      </section>

      <!-- Key Features -->
      <section v-if="product.keyFeatures?.length" class="product-detail__features">
        <Container>

          <h2 class="product-detail__section-title">
            {{ t('productDetail.keyFeatures') }}
          </h2>

          <div class="product-detail__features-grid">

            <div v-for="feature in product.keyFeatures" :key="feature.title" class="feature-item">

              <component :is="CheckCircleIcon" :size="24" class="feature-item__icon" />

              <div class="feature-item__content">

                <h3 class="feature-item__title">
                  {{ feature.title }}
                </h3>

                <p class="feature-item__description">
                  {{ feature.description }}
                </p>

              </div>

            </div>

          </div>
        </Container>
      </section>

      <!-- Technical Specifications -->
      <section v-if="specGroups.length" class="product-detail__specs">
        <Container>

          <h2 class="product-detail__section-title">
            {{ t('productDetail.technicalSpecifications') }}
          </h2>

          <div class="product-detail__specs-grid">

            <div v-for="group in specGroups" :key="group" class="specs-group">

              <h3 class="specs-group__title">
                {{ group }}
              </h3>

              <div class="specs-group__items">

                <div v-for="spec in getSpecsByGroup(group)" :key="`${spec.group}-${spec.label}`" class="spec-item">

                  <div class="spec-item__label">
                    {{ spec.label }}
                  </div>

                  <div class="spec-item__value">
                    {{ spec.value }}
                  </div>

                </div>

              </div>

            </div>

          </div>
        </Container>
      </section>

      <!-- Long Description -->
      <section v-if="product.longDescription" class="product-detail__description-section">
        <Container>

          <div class="product-description">

            <h2 class="product-detail__section-title">
              {{ t('productDetail.productOverview') }}
            </h2>

            <div class="product-description__content">
              {{ product.longDescription }}
            </div>

          </div>

        </Container>
      </section>

      <!-- Related Products -->
      <section v-if="relatedProducts.length" class="product-detail__related">
        <Container>

          <h2 class="product-detail__section-title">
            {{ t('productDetail.relatedProducts') }}
          </h2>

          <div class="product-detail__related-grid">

            <ProductCard v-for="related in relatedProducts" :key="related.id" :product="related" />

          </div>

        </Container>
      </section>

    </template>

    <!-- Not Found -->
    <section v-else class="not-found">
      <Container>

        <div class="not-found__content">

          <div class="not-found__code">
            404
          </div>

          <h1>
            {{ t('productDetail.notFound.title') }}
          </h1>

          <p>
            {{ t('productDetail.notFound.description') }}
          </p>

          <Button tag="NuxtLink" :to="localePath('/products')">
            {{ t('productDetail.notFound.backToProducts') }}
          </Button>

        </div>

      </Container>
    </section>

  </div>
</template>

<script setup lang="ts">
import {
  CheckCircle as CheckCircleIcon
} from 'lucide-vue-next'

import type { Product } from '~/types'

const route = useRoute()
const localePath = useLocalePath()

const { t, locale } = useI18n()

const {
  loading,
  error,
  fetchProducts,
  getProductBySlug,
  getRelatedProducts
} = useProducts()

const product = ref<Product | null>(null)

const categorySlug = computed(() => {
  const value = route.params.category

  return Array.isArray(value)
    ? value[0]
    : String(value || '')
})

const productSlug = computed(() => {
  const value = route.params.productSlug

  return Array.isArray(value)
    ? value[0]
    : String(value || '')
})

/**
 * --------------------------------------------------------------------------
 * Gallery
 * --------------------------------------------------------------------------
 */

const activeImage = ref('')

const galleryImages = computed(() => {
  if (!product.value) return []

  const images = [
    product.value.heroImage,
    ...(product.value.galleryImages || [])
  ]

  return [
    ...new Set(
      images.filter(Boolean)
    )
  ]
})

const setInitialImage = () => {
  activeImage.value =
    galleryImages.value[0] || ''
}

/**
 * --------------------------------------------------------------------------
 * Specifications
 * --------------------------------------------------------------------------
 */

const specGroups = computed(() => {
  if (!product.value) return []

  return [
    ...new Set(
      product.value.specifications.map(
        specification => specification.group
      )
    )
  ]
})

const getSpecsByGroup = (group: string) => {
  if (!product.value) return []

  return product.value.specifications.filter(
    specification =>
      specification.group === group
  )
}

/**
 * --------------------------------------------------------------------------
 * Related Products
 * --------------------------------------------------------------------------
 */

const relatedProducts = computed(() => {
  if (!product.value) return []

  return getRelatedProducts(product.value)
})

/**
 * --------------------------------------------------------------------------
 * Share
 * --------------------------------------------------------------------------
 */

const shareLabel = ref(
  t('productDetail.share')
)

const shareProduct = async () => {
  if (!product.value) return

  const url = window.location.href

  try {
    if (
      'share' in navigator &&
      typeof navigator.share === 'function'
    ) {
      await navigator.share({
        title: product.value.name,
        text:
          product.value.tagline ||
          product.value.description,
        url
      })

      return
    }

    if (
      'clipboard' in navigator &&
      navigator.clipboard
    ) {
      await navigator.clipboard.writeText(url)

      shareLabel.value =
        t('productDetail.copied')

      window.setTimeout(() => {
        shareLabel.value =
          t('productDetail.share')
      }, 2000)

      return
    }
  } catch {
    // User cancelled native share dialog.
  }
}

/**
 * --------------------------------------------------------------------------
 * Load Product
 * --------------------------------------------------------------------------
 */

const loadProduct = async () => {
  product.value = null
  activeImage.value = ''

  if (!productSlug.value) return

  /**
   * Fetch all products first.
   *
   * This is needed because relatedProducts in the current
   * useProducts composable are resolved from products.value.
   */
  await fetchProducts()

  const result =
    await getProductBySlug(
      productSlug.value
    )

  if (!result) {
    product.value = null
    return
  }

  /**
   * Make sure the URL category actually belongs
   * to the product returned by Strapi.
   */
  if (
    result.category?.slug &&
    categorySlug.value &&
    result.category.slug !== categorySlug.value
  ) {
    product.value = null
    return
  }

  product.value = result

  setInitialImage()
}

/**
 * --------------------------------------------------------------------------
 * Initial Load
 * --------------------------------------------------------------------------
 */

await loadProduct()

/**
 * --------------------------------------------------------------------------
 * Route Changes
 * --------------------------------------------------------------------------
 */

watch(
  [categorySlug, productSlug, locale],
  async () => {
    await loadProduct()
  }
)

/**
 * --------------------------------------------------------------------------
 * SEO
 * --------------------------------------------------------------------------
 */

useSeoMeta({
  title: () =>
    product.value
      ? `${product.value.name} | DentalTech Pro`
      : t('productDetail.notFound.title'),

  description: () =>
    product.value?.description ||
    product.value?.tagline ||
    'Professional dental equipment and digital dentistry solutions.',

  ogTitle: () =>
    product.value
      ? `${product.value.name} | DentalTech Pro`
      : t('productDetail.notFound.title'),

  ogDescription: () =>
    product.value?.description ||
    product.value?.tagline ||
    '',

  ogImage: () =>
    product.value?.heroImage || undefined
})
</script>

<style scoped lang="scss">
.product-detail {
  min-height: 100vh;

  /* -----------------------------------------------------------------------
   * Loading
   * ----------------------------------------------------------------------- */

  &__loading {
    min-height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* -----------------------------------------------------------------------
   * Hero
   * ----------------------------------------------------------------------- */

  &__hero {
    padding: $space-8 0 $space-24;
    background: $color-surface;
  }

  /* -----------------------------------------------------------------------
   * Breadcrumb
   * ----------------------------------------------------------------------- */


  /* -----------------------------------------------------------------------
   * Hero Grid
   * ----------------------------------------------------------------------- */

  &__hero-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-12;

    @include respond-to(lg) {
      grid-template-columns:
        minmax(0, 1fr) minmax(0, 1fr);

      align-items: start;
    }
  }

  /* -----------------------------------------------------------------------
   * Gallery
   * ----------------------------------------------------------------------- */

  &__gallery {
    position: sticky;
    top: 100px;
    height: fit-content;
  }

  &__main-image {
    width: 100%;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: white;
    border: 1px solid $color-gray-200;
    border-radius: $radius-xl;
    box-shadow: $shadow-lg;

    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }
  }

  &__placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    background: linear-gradient(135deg,
        lighten($color-primary-600, 30%),
        lighten($color-secondary-500, 30%));

    color: $color-gray-600;
    font-size: $text-base;
  }

  /* -----------------------------------------------------------------------
   * Thumbnails
   * ----------------------------------------------------------------------- */

  &__thumbnails {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: $space-3;
    margin-top: $space-4;
  }

  &__thumbnail {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    padding: 0;
    overflow: hidden;
    background: white;
    border: 2px solid transparent;
    border-radius: $radius-lg;
    cursor: pointer;

    transition:
      border-color $transition-base,
      transform $transition-base,
      box-shadow $transition-base;

    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: $shadow-sm;
    }

    &--active {
      border-color: $color-primary-600;
      box-shadow: $shadow-sm;
    }
  }

  /* -----------------------------------------------------------------------
   * Product Info
   * ----------------------------------------------------------------------- */

  &__info {
    display: flex;
    flex-direction: column;
    gap: $space-4;
  }

  &__badges {
    display: flex;
    flex-wrap: wrap;
    gap: $space-2;
  }

  &__category {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: $space-2;
    color: $color-primary-600;
    font-size: $text-sm;
    font-weight: $font-semibold;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  &__category-separator {
    color: $color-gray-400;
  }

  &__name {
    margin: 0;
    font-size: $text-4xl;
    font-weight: $font-bold;
    line-height: $leading-tight;
    color: $color-gray-900;

    @include respond-to(md) {
      font-size: $text-5xl;
    }
  }

  &__tagline {
    margin: 0;
    font-size: $text-2xl;
    font-weight: $font-medium;
    line-height: $leading-relaxed;
    color: $color-primary-600;
  }

  /* -----------------------------------------------------------------------
   * SKU
   * ----------------------------------------------------------------------- */

  &__sku {
    display: inline-flex;
    align-items: center;
    gap: $space-3;
    width: fit-content;
    padding: $space-2 $space-4;
    background: $color-gray-100;
    border-radius: $radius-lg;
    font-size: $text-sm;
  }

  &__sku-label {
    color: $color-gray-500;
  }

  &__sku-value {
    color: $color-gray-900;
    font-weight: $font-semibold;
    letter-spacing: 0.04em;
  }

  /* -----------------------------------------------------------------------
   * Description
   * ----------------------------------------------------------------------- */

  &__description {
    margin: 0;
    font-size: $text-lg;
    line-height: $leading-relaxed;
    color: $color-gray-700;
  }

  /* -----------------------------------------------------------------------
   * Actions
   * ----------------------------------------------------------------------- */

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: $space-4;
    padding-top: $space-3;
  }

  /* -----------------------------------------------------------------------
   * Manual
   * ----------------------------------------------------------------------- */

  &__manual {
    display: flex;
    align-items: center;
    gap: $space-4;
    width: 100%;
    padding: $space-4;
    background: white;
    border: 1px solid $color-gray-200;
    border-radius: $radius-lg;
    color: inherit;
    text-decoration: none;
    box-shadow: $shadow-sm;

    transition:
      border-color $transition-base,
      box-shadow $transition-base,
      transform $transition-base;

    &:hover {
      transform: translateY(-2px);
      border-color: $color-primary-300;
      box-shadow: $shadow-base;
    }
  }

  &__manual-icon {
    width: 42px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: $color-primary-600;
    border-radius: $radius-lg;
    color: white;
    font-size: $text-xs;
    font-weight: $font-bold;
  }

  &__manual-content {
    display: flex;
    flex-direction: column;
    gap: $space-1;
    flex: 1;

    strong {
      color: $color-gray-900;
      font-size: $text-sm;
    }

    small {
      color: $color-gray-500;
      font-size: $text-xs;
    }
  }

  &__manual-arrow {
    color: $color-primary-600;
    font-size: $text-xl;
  }

  /* -----------------------------------------------------------------------
   * Share
   * ----------------------------------------------------------------------- */

  &__share {
    display: flex;
    align-items: center;
    gap: $space-3;
    padding-top: $space-2;
  }

  &__share-label {
    color: $color-gray-500;
    font-size: $text-sm;
  }

  &__share-button {
    padding: 0;
    background: transparent;
    border: 0;
    color: $color-primary-600;
    font-size: $text-sm;
    font-weight: $font-semibold;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  /* -----------------------------------------------------------------------
   * Sections
   * ----------------------------------------------------------------------- */

  &__features,
  &__specs,
  &__description-section,
  &__related {
    padding: $space-24 0;
  }

  &__features {
    background: white;
  }

  &__specs {
    background: $color-gray-50;
  }

  &__description-section {
    background: white;
  }

  &__related {
    background: $color-gray-50;
  }

  &__section-title {
    margin: 0 0 $space-12;
    font-size: $text-3xl;
    font-weight: $font-bold;
    line-height: $leading-tight;
    color: $color-gray-900;
    text-align: center;

    @include respond-to(md) {
      font-size: $text-4xl;
    }
  }

  /* -----------------------------------------------------------------------
   * Features
   * ----------------------------------------------------------------------- */

  &__features-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-6;

    @include respond-to(md) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  /* -----------------------------------------------------------------------
   * Specifications
   * ----------------------------------------------------------------------- */

  &__specs-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-8;

    @include respond-to(md) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  /* -----------------------------------------------------------------------
   * Related Products
   * ----------------------------------------------------------------------- */

  &__related-grid {
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

/* --------------------------------------------------------------------------
 * Feature Item
 * -------------------------------------------------------------------------- */

.feature-item {
  display: flex;
  gap: $space-4;
  padding: $space-6;
  background: white;
  border: 1px solid $color-gray-200;
  border-radius: $radius-lg;
  box-shadow: $shadow-sm;

  transition:
    transform $transition-base,
    box-shadow $transition-base,
    border-color $transition-base;

  &:hover {
    transform: translateY(-3px);
    border-color: $color-primary-200;
    box-shadow: $shadow-base;
  }

  &__icon {
    flex-shrink: 0;
    color: $color-success;
  }

  &__content {
    min-width: 0;
  }

  &__title {
    margin: 0 0 $space-2;
    color: $color-gray-900;
    font-size: $text-lg;
    font-weight: $font-semibold;
  }

  &__description {
    margin: 0;
    color: $color-gray-600;
    font-size: $text-base;
    line-height: $leading-relaxed;
  }
}

/* --------------------------------------------------------------------------
 * Specifications Group
 * -------------------------------------------------------------------------- */

.specs-group {
  padding: $space-8;
  background: white;
  border: 1px solid $color-gray-200;
  border-radius: $radius-xl;
  box-shadow: $shadow-sm;

  &__title {
    margin: 0 0 $space-6;
    padding-bottom: $space-4;
    border-bottom: 2px solid $color-gray-200;
    color: $color-gray-900;
    font-size: $text-xl;
    font-weight: $font-semibold;
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: $space-4;
  }
}

/* --------------------------------------------------------------------------
 * Specification Item
 * -------------------------------------------------------------------------- */

.spec-item {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: $space-4;
  padding-bottom: $space-4;
  border-bottom: 1px solid $color-gray-100;

  &:last-child {
    padding-bottom: 0;
    border-bottom: 0;
  }

  &__label {
    color: $color-gray-600;
    font-size: $text-sm;
    font-weight: $font-medium;
  }

  &__value {
    color: $color-gray-900;
    font-size: $text-sm;
    font-weight: $font-semibold;
    text-align: right;
  }
}

/* --------------------------------------------------------------------------
 * Product Description
 * -------------------------------------------------------------------------- */

.product-description {
  max-width: 900px;
  margin: 0 auto;

  &__content {
    color: $color-gray-700;
    font-size: $text-lg;
    line-height: 1.9;
    white-space: pre-line;
  }
}

/* --------------------------------------------------------------------------
 * Loading
 * -------------------------------------------------------------------------- */

.loading-content {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: $space-4;
  color: $color-gray-600;

  &__spinner {
    width: 42px;
    height: 42px;
    border: 3px solid $color-gray-200;
    border-top-color: $color-primary-600;
    border-radius: 50%;
    animation: product-spin 0.8s linear infinite;
  }

  p {
    margin: 0;
    font-size: $text-base;
  }
}

/* --------------------------------------------------------------------------
 * Not Found
 * -------------------------------------------------------------------------- */

.not-found {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $space-32 0;
  text-align: center;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__code {
    margin-bottom: $space-4;
    color: $color-primary-600;
    font-size: 6rem;
    font-weight: $font-bold;
    line-height: 1;
  }

  h1 {
    margin: 0 0 $space-4;
    color: $color-gray-900;
    font-size: $text-4xl;
    font-weight: $font-bold;
  }

  p {
    margin: 0 0 $space-8;
    color: $color-gray-600;
    font-size: $text-lg;
  }
}

/* --------------------------------------------------------------------------
 * RTL
 * -------------------------------------------------------------------------- */

:global(html[dir='rtl']) {
  .product-detail {

    &__breadcrumb {
      flex-direction: row-reverse;
    }

    &__category {
      flex-direction: row-reverse;
    }

    &__sku {
      flex-direction: row-reverse;
    }

    &__manual {
      flex-direction: row-reverse;
      text-align: right;
    }

    &__share {
      flex-direction: row-reverse;
    }
  }

  .spec-item {
    &__value {
      text-align: left;
    }
  }

  .feature-item {
    flex-direction: row-reverse;
    text-align: right;
  }
}

/* --------------------------------------------------------------------------
 * Mobile
 * -------------------------------------------------------------------------- */

@media (max-width: 767px) {
  .product-detail {

    &__hero {
      padding: $space-6 0 $space-16;
    }

    &__breadcrumb {
      margin-bottom: $space-6;
      font-size: $text-xs;
    }

    &__gallery {
      position: static;
    }

    &__hero-grid {
      gap: $space-8;
    }

    &__name {
      font-size: $text-3xl;
    }

    &__tagline {
      font-size: $text-xl;
    }

    &__description {
      font-size: $text-base;
    }

    &__actions {
      flex-direction: column;

      >* {
        width: 100%;
      }
    }

    &__features,
    &__specs,
    &__description-section,
    &__related {
      padding: $space-16 0;
    }

    &__section-title {
      margin-bottom: $space-8;
      font-size: $text-2xl;
    }

    &__specs-grid {
      gap: $space-6;
    }
  }

  .feature-item {
    padding: $space-4;
  }

  .specs-group {
    padding: $space-6;
  }

  .spec-item {
    grid-template-columns: 1fr;
    gap: $space-2;

    &__value {
      text-align: left;
    }
  }

  :global(html[dir='rtl']) {
    .spec-item {
      &__value {
        text-align: right;
      }
    }
  }

  .not-found {
    &__code {
      font-size: 5rem;
    }

    h1 {
      font-size: $text-3xl;
    }
  }
}

/* --------------------------------------------------------------------------
 * Animation
 * -------------------------------------------------------------------------- */

@keyframes product-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>