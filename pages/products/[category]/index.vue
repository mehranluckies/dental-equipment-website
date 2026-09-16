<template>
  <div class="category-page">

    <!-- Hero -->
    <section class="category-page__hero">
      <Container>
        <AppBreadcrumb
          :items="[
            {
              label: t('productCategory.breadcrumb.products'),
              to: localePath('/products')
            },
            {
              label: category?.name
            }
          ]"
        />

        <div
          v-if="loading"
          class="category-page__loading"
        >
          {{ t('productCategory.loading') }}
        </div>
      </Container>
    </section>

    <!-- Products -->
    <section class="category-page__content">
      <Container>

        <!-- Loading -->
        <div
          v-if="loading"
          class="category-page__loading category-page__loading--content"
        >
          <div class="category-page__loading-spinner"></div>

          <p>
            {{ t('productCategory.loadingProducts') }}
          </p>
        </div>

        <!-- Category Not Found -->
        <div
          v-else-if="!category"
          class="category-page__empty"
        >
          <h2>
            {{ t('productCategory.notFound.title') }}
          </h2>

          <p>
            {{ t('productCategory.notFound.description') }}
          </p>

          <NuxtLink
            :to="localePath('/products')"
            class="category-page__back"
          >
            {{ t('productCategory.backToProducts') }}
          </NuxtLink>
        </div>

        <!-- Products -->
        <template v-else>
          <div
            v-if="filteredProducts.length"
            class="category-page__grid"
          >
            <ProductCard
              v-for="product in filteredProducts"
              :key="product.id"
              :product="product"
            />
          </div>

          <!-- No Products -->
          <div
            v-else
            class="category-page__empty"
          >
            <h2>
              {{ t('productCategory.empty.title') }}
            </h2>

            <p>
              {{ t('productCategory.empty.description') }}
            </p>
          </div>
        </template>

      </Container>
    </section>

  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const route = useRoute()
const localePath = useLocalePath()
const { t, locale } = useI18n()

const {
  products,
  loading,
  fetchProducts
} = useProducts()

/**
 * --------------------------------------------------------------------------
 * Category
 * --------------------------------------------------------------------------
 */

const categorySlug = computed(() => {
  const value = route.params.category

  return Array.isArray(value)
    ? value[0]
    : String(value || '')
})

const selectedSubcategory = ref<string | null>(null)

/**
 * --------------------------------------------------------------------------
 * Category Products
 * --------------------------------------------------------------------------
 */

const categoryProducts = computed(() => {
  return products.value.filter(
    product =>
      product.category?.slug === categorySlug.value
  )
})

/**
 * --------------------------------------------------------------------------
 * Category
 * --------------------------------------------------------------------------
 */

const category = computed(() => {
  return categoryProducts.value[0]?.category
})

/**
 * --------------------------------------------------------------------------
 * Subcategories
 * --------------------------------------------------------------------------
 */

const subcategories = computed(() => {
  const map = new Map<
    string,
    {
      id: string
      name: string
      slug: string
    }
  >()

  categoryProducts.value.forEach(product => {
    if (!product.subcategory) return

    if (!map.has(product.subcategory.slug)) {
      map.set(
        product.subcategory.slug,
        product.subcategory
      )
    }
  })

  return Array.from(map.values())
})

/**
 * --------------------------------------------------------------------------
 * Filtered Products
 * --------------------------------------------------------------------------
 */

const filteredProducts = computed(() => {
  if (!selectedSubcategory.value) {
    return categoryProducts.value
  }

  return categoryProducts.value.filter(
    product =>
      product.subcategory?.slug ===
      selectedSubcategory.value
  )
})

/**
 * --------------------------------------------------------------------------
 * Load Category
 * --------------------------------------------------------------------------
 */

const loadCategory = async () => {
  selectedSubcategory.value = null
  await fetchProducts()
}

await loadCategory()

/**
 * --------------------------------------------------------------------------
 * Route / Locale Changes
 * --------------------------------------------------------------------------
 */

watch(
  [categorySlug, locale],
  async () => {
    await loadCategory()
  }
)

/**
 * --------------------------------------------------------------------------
 * SEO
 * --------------------------------------------------------------------------
 */

const seoTitle = computed(() => {
  return `${
    category.value?.name ||
    t('productCategory.products')
  } | DentalTech Pro`
})

const seoDescription = computed(() => {
  return category.value
    ? `${category.value.name} - ${t(
        'productCategory.description'
      )}`
    : t('productCategory.defaultDescription')
})

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  ogDescription: seoDescription
})
</script>

<style scoped lang="scss">

.category-page {
  min-height: 100vh;
  background: $color-surface;

  /* -----------------------------------------------------------------------
   * Hero / Breadcrumb
   * ----------------------------------------------------------------------- */

  &__hero {
    padding: $space-8 0 $space-4;
    background: transparent;
  }

  /* -----------------------------------------------------------------------
   * Content
   * ----------------------------------------------------------------------- */

  &__content {
    background: transparent;
  }

  /* -----------------------------------------------------------------------
   * Products Grid
   * ----------------------------------------------------------------------- */

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

  /* -----------------------------------------------------------------------
   * Loading
   * ----------------------------------------------------------------------- */

  &__loading {
    padding: $space-4 0;

    display: flex;
    align-items: center;
    justify-content: center;

    text-align: center;
    color: $color-gray-600;
    font-size: $text-base;

    &--content {
      min-height: 60vh;
      flex-direction: column;
      gap: $space-4;
      padding: 0;
    }
  }

  &__loading-spinner {
    width: 42px;
    height: 42px;

    border: 3px solid $color-gray-200;
    border-top-color: $color-primary-600;
    border-radius: 50%;

    animation: category-spin 0.8s linear infinite;
  }

  /* -----------------------------------------------------------------------
   * Empty State
   * ----------------------------------------------------------------------- */

  &__empty {
    min-height: 60vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: $space-16 0;
    text-align: center;

    h2 {
      margin: 0 0 $space-3;

      color: $color-gray-900;
      font-size: $text-2xl;
      font-weight: $font-semibold;
      line-height: $leading-tight;
    }

    p {
      max-width: 600px;

      margin: 0 0 $space-6;

      color: $color-gray-600;
      font-size: $text-base;
      line-height: $leading-relaxed;
    }
  }

  /* -----------------------------------------------------------------------
   * Back Button
   * ----------------------------------------------------------------------- */

  &__back {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    padding: $space-3 $space-6;

    border-radius: $radius-lg;

    background: $color-primary-600;
    color: #fff;

    font-weight: $font-semibold;
    text-decoration: none;

    transition:
      background-color 0.2s ease,
      transform 0.2s ease;

    &:hover {
      transform: translateY(-1px);
    }
  }
}

/* --------------------------------------------------------------------------
 * RTL
 * -------------------------------------------------------------------------- */

:global(html[dir='rtl']) {
  .category-page {
    &__empty {
      text-align: center;
    }
  }
}

/* --------------------------------------------------------------------------
 * Mobile
 * -------------------------------------------------------------------------- */

@media (max-width: 767px) {
  .category-page {

    &__hero {
      padding: $space-6 0 $space-2;
    }

    &__content {
      padding: $space-2 0 $space-16;
    }

    &__grid {
      gap: $space-6;
    }

    &__loading--content {
      min-height: 40vh;
    }

    &__empty {
      min-height: 40vh;
      padding: $space-12 0;

      h2 {
        font-size: $text-xl;
      }

      p {
        font-size: $text-sm;
      }
    }
  }
}

/* --------------------------------------------------------------------------
 * Animation
 * -------------------------------------------------------------------------- */

@keyframes category-spin {
  to {
    transform: rotate(360deg);
  }
}

</style>