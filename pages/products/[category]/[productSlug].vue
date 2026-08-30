<template>
  <div v-if="product" class="product-detail">
    <section class="product-detail__hero">
      <Container>
        <div class="product-detail__hero-grid">
          <div class="product-detail__gallery">
            <div class="product-detail__main-image">
              <div class="product-detail__placeholder"></div>
            </div>
          </div>
          <div class="product-detail__info">
            <div class="product-detail__badges">
              <Badge v-for="badge in product.badges" :key="badge" variant="primary">
                {{ badge }}
              </Badge>
            </div>
            <h1 class="product-detail__name">{{ product.name }}</h1>
            <p class="product-detail__tagline">{{ product.tagline }}</p>
            <p class="product-detail__description">{{ product.description }}</p>
            <div class="product-detail__actions">
              <Button size="lg" tag="NuxtLink" to="/request-quote">
                Request Quote
              </Button>
              <Button size="lg" variant="outline" tag="NuxtLink" to="/support/contact">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>

    <section class="product-detail__features">
      <Container>
        <h2 class="product-detail__section-title">Key Features</h2>
        <div class="product-detail__features-grid">
          <div
            v-for="feature in product.keyFeatures"
            :key="feature.title"
            class="feature-item"
          >
            <component :is="CheckCircleIcon" :size="24" class="feature-item__icon" />
            <div>
              <h3 class="feature-item__title">{{ feature.title }}</h3>
              <p class="feature-item__description">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>

    <section class="product-detail__specs">
      <Container>
        <h2 class="product-detail__section-title">Technical Specifications</h2>
        <div class="product-detail__specs-grid">
          <div
            v-for="group in specGroups"
            :key="group"
            class="specs-group"
          >
            <h3 class="specs-group__title">{{ group }}</h3>
            <div class="specs-group__items">
              <div
                v-for="spec in getSpecsByGroup(group)"
                :key="spec.label"
                class="spec-item"
              >
                <div class="spec-item__label">{{ spec.label }}</div>
                <div class="spec-item__value">{{ spec.value }}</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>

    <section v-if="relatedProducts.length" class="product-detail__related">
      <Container>
        <h2 class="product-detail__section-title">Related Products</h2>
        <div class="product-detail__related-grid">
          <ProductCard
            v-for="related in relatedProducts"
            :key="related.id"
            :product="related"
          />
        </div>
      </Container>
    </section>
  </div>
  <div v-else class="not-found">
    <Container>
      <h1>Product not found</h1>
      <Button tag="NuxtLink" to="/products">Back to Products</Button>
    </Container>
  </div>
</template>

<script setup lang="ts">
import { CheckCircle as CheckCircleIcon } from 'lucide-vue-next'
import { products } from '~/data/products'
import { categories } from '~/data/categories'

const route = useRoute()

const categorySlug = computed(
  () => route.params.category as string
)
const productSlug = computed(
  () => route.params.productSlug as string
)
const category = computed(() =>
  categories.find(
    category => category.slug === categorySlug.value
  )
)

const product = computed(() =>
  products.find(
    product =>
      product.slug === productSlug.value &&
      product.categoryId === category.value?.id
  )
)
const specGroups = computed(() => {
  if (!product.value) return []
  return [...new Set(product.value.specifications.map(s => s.group))]
})

const getSpecsByGroup = (group: string) => {
  if (!product.value) return []
  return product.value.specifications.filter(s => s.group === group)
}

const relatedProducts = computed(() => {
  if (!product.value) return []
  return products.filter(p => product.value!.relatedProductIds.includes(p.id))
})

useSeoMeta({
  title: () => product.value ? `${product.value.name} | DentalTech Pro` : 'Product Not Found',
  description: () => product.value?.description || ''
})
</script>

<style scoped lang="scss">
.product-detail {
  &__hero {
    padding: $space-24 0;
    background: $color-surface;
  }

  &__hero-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-12;

    @include respond-to(lg) {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__gallery {
    position: sticky;
    top: 100px;
    height: fit-content;
  }

  &__main-image {
    aspect-ratio: 4 / 3;
    border-radius: $radius-xl;
    overflow: hidden;
    box-shadow: $shadow-lg;
  }

  &__placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, lighten($color-primary-600, 30%), lighten($color-secondary-500, 30%));
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: $space-6;
  }

  &__badges {
    display: flex;
    flex-wrap: wrap;
    gap: $space-2;
  }

  &__name {
    font-size: $text-4xl;
    font-weight: $font-bold;
    color: $color-gray-900;
    line-height: $leading-tight;

    @include respond-to(md) {
      font-size: $text-5xl;
    }
  }

  &__tagline {
    font-size: $text-2xl;
    color: $color-primary-600;
    font-weight: $font-medium;
  }

  &__description {
    font-size: $text-lg;
    line-height: $leading-relaxed;
    color: $color-gray-700;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: $space-4;
    padding-top: $space-4;
  }

  &__features,
  &__specs,
  &__related {
    padding: $space-24 0;
  }

  &__section-title {
    font-size: $text-3xl;
    font-weight: $font-bold;
    color: $color-gray-900;
    margin-bottom: $space-12;
    text-align: center;
  }

  &__features-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-6;

    @include respond-to(md) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__specs-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-12;

    @include respond-to(md) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

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

.feature-item {
  display: flex;
  gap: $space-4;
  padding: $space-6;
  background: white;
  border-radius: $radius-lg;
  box-shadow: $shadow-sm;

  &__icon {
    color: $color-success;
    flex-shrink: 0;
  }

  &__title {
    font-size: $text-lg;
    font-weight: $font-semibold;
    color: $color-gray-900;
    margin-bottom: $space-2;
  }

  &__description {
    font-size: $text-base;
    color: $color-gray-600;
    line-height: $leading-relaxed;
  }
}

.specs-group {
  background: white;
  border-radius: $radius-xl;
  padding: $space-8;
  box-shadow: $shadow-sm;

  &__title {
    font-size: $text-xl;
    font-weight: $font-semibold;
    color: $color-gray-900;
    margin-bottom: $space-6;
    padding-bottom: $space-4;
    border-bottom: 2px solid $color-gray-200;
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: $space-4;
  }
}

.spec-item {
  display: flex;
  justify-content: space-between;
  gap: $space-4;

  &__label {
    font-weight: $font-medium;
    color: $color-gray-700;
  }

  &__value {
    font-weight: $font-semibold;
    color: $color-gray-900;
    text-align: right;
  }
}

.not-found {
  padding: $space-32 0;
  text-align: center;

  h1 {
    font-size: $text-4xl;
    margin-bottom: $space-8;
  }
}
</style>
