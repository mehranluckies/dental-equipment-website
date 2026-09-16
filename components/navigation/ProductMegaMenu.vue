<template>
  <div
    class="mega-menu"
    @mouseenter="keepOpen"
    @mouseleave="$emit('close')"
  >
    <Container>
      <div class="mega-menu__inner">

        <!-- Product Categories -->
        <div class="mega-menu__categories">
          <h3 class="mega-menu__title">
            Product Categories
          </h3>

          <div
            v-if="categoriesLoading"
            class="mega-menu__loading"
          >
            Loading...
          </div>

          <NuxtLink
            v-for="category in categories"
            :key="category.id"
            :to="localePath(`/products/${category.slug}`)"
            class="mega-menu__category"
            @click="$emit('close')"
          >
            <!-- Category Icon -->
            <div class="mega-menu__category-icon">
              <img
                v-if="category.icon"
                :src="category.icon"
                :alt="category.name"
              />

              <div
                v-else
                class="mega-menu__category-icon-placeholder"
              >
                {{ category.name.charAt(0) }}
              </div>
            </div>

            <!-- Category Content -->
            <div class="mega-menu__category-content">
              <div class="mega-menu__category-name">
                {{ category.name }}
              </div>

              <div
                v-if="category.description"
                class="mega-menu__category-desc"
              >
                {{ category.description }}
              </div>
            </div>
          </NuxtLink>

          <div
            v-if="!categoriesLoading && !categories.length"
            class="mega-menu__empty"
          >
            No categories available
          </div>
        </div>

        <!-- Featured Products -->
        <div class="mega-menu__featured">
          <h3 class="mega-menu__title">
            Featured Products
          </h3>

          <div
            v-if="productsLoading"
            class="mega-menu__loading"
          >
            Loading...
          </div>

          <div
            v-else-if="featuredProducts.length"
            class="mega-menu__products"
          >
            <NuxtLink
              v-for="product in featuredProducts"
              :key="product.id"
              :to="localePath(`/products/${product.slug}`)"
              class="mega-menu__product"
              @click="$emit('close')"
            >
              <div class="mega-menu__product-image">
                <img
                  v-if="product.heroImage"
                  :src="product.heroImage"
                  :alt="product.name"
                />

                <div
                  v-else
                  class="mega-menu__product-placeholder"
                ></div>
              </div>

              <div class="mega-menu__product-name">
                {{ product.name }}
              </div>

              <div class="mega-menu__product-tagline">
                {{ product.tagline }}
              </div>
            </NuxtLink>
          </div>

          <div
            v-else
            class="mega-menu__empty"
          >
            No featured products available
          </div>
        </div>

      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types'

defineEmits(['close'])

const localePath = useLocalePath()
const { locale } = useI18n()
const config = useRuntimeConfig()

/* =====================================================
   PRODUCTS
===================================================== */

const {
  products,
  loading: productsLoading,
  fetchProducts
} = useProducts()

const featuredProducts = computed<Product[]>(() => {
  return products.value
    .filter(product => product.isFeatured)
    .slice(0, 3)
})

/* =====================================================
   STRAPI MEDIA
===================================================== */

interface StrapiMedia {
  id: number
  documentId: string
  name: string
  url: string
  alternativeText?: string | null
}

/* =====================================================
   PRODUCT CATEGORY
===================================================== */

interface StrapiProductCategory {
  id: number
  documentId: string
  name: string
  slug: string
  icon?: StrapiMedia | null
  image?: StrapiMedia | null
  description?: string | null
}

interface StrapiProductCategoryResponse {
  data: StrapiProductCategory[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

interface CategoryItem {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  image: string
  productCount: number
}

/* =====================================================
   CATEGORIES STATE
===================================================== */

const categoriesData = ref<StrapiProductCategory[]>([])
const categoriesLoading = ref(false)
const categoriesError = ref<Error | null>(null)

/* =====================================================
   MEDIA URL
===================================================== */

const getMediaUrl = (
  media?: StrapiMedia | null
): string => {
  if (!media?.url) {
    return ''
  }

  if (media.url.startsWith('http')) {
    return media.url
  }

  return `${config.public.strapiUrl}${media.url}`
}

/* =====================================================
   FETCH CATEGORIES
   EXACTLY LIKE PRODUCTS PAGE
===================================================== */

const fetchCategories = async () => {
  categoriesLoading.value = true
  categoriesError.value = null

  try {
    const response =
      await $fetch<StrapiProductCategoryResponse>(
        `${config.public.strapiUrl}/api/product-categories`,
        {
          query: {
            populate: '*',
            locale: locale.value
          }
        }
      )

    categoriesData.value = response.data
  } catch (err) {
    categoriesError.value =
      err instanceof Error
        ? err
        : new Error(
            'Failed to fetch product categories'
          )

    categoriesData.value = []
  } finally {
    categoriesLoading.value = false
  }
}

/* =====================================================
   MAP CATEGORIES
===================================================== */

const categories = computed<CategoryItem[]>(() => {
  return categoriesData.value.map(category => {

    const productCount =
      products.value.filter(
        product =>
          product.categoryId === category.documentId
      ).length

    return {
      id: category.documentId,
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      icon: getMediaUrl(category.icon),
      image: getMediaUrl(category.image),
      productCount
    }
  })
})

/* =====================================================
   LOAD DATA
===================================================== */

await Promise.all([
  fetchProducts(),
  fetchCategories()
])

/* =====================================================
   REFRESH WHEN LANGUAGE CHANGES
===================================================== */

watch(locale, async () => {
  await Promise.all([
    fetchProducts(),
    fetchCategories()
  ])
})

/* =====================================================
   MENU
===================================================== */

const keepOpen = () => {
  // Prevents closing when mouse is inside mega menu
}
</script>

<style scoped lang="scss">
.mega-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  box-shadow: $shadow-xl;
  border-top: 1px solid $color-gray-200;
  max-height: calc(100vh - 80px);
  overflow-y: auto;
  overflow-x: hidden;

  &__inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $space-8;
    padding: $space-6 0;
  }

  &__title {
    font-size: $text-xs;
    font-weight: $font-semibold;
    color: $color-gray-500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: $space-3;
  }

  /* =====================================================
     CATEGORIES
  ===================================================== */

  &__categories {
    display: flex;
    flex-direction: column;
    gap: $space-1;
  }

  &__category {
    display: flex;
    align-items: flex-start;
    gap: $space-3;
    padding: $space-2;
    border-radius: $radius-base;
    transition: background $transition-fast;

    &:hover {
      background: $color-gray-50;
    }
  }

  &__category-icon {
    width: 20px;
    min-width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: $radius-base;
    overflow: hidden;
    background: $color-gray-100;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  &__category-icon-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: $text-lg;
    font-weight: $font-semibold;
    color: $color-primary-600;
    background: lighten($color-primary-600, 45%);
  }

  &__category-content {
    min-width: 0;
  }

  &__category-name {
    font-weight: $font-semibold;
    color: $color-gray-900;
    margin-bottom: 2px;
  }

  &__category-desc {
    font-size: $text-xs;
    color: $color-gray-600;
    line-height: 1.5;
  }

  /* =====================================================
     FEATURED PRODUCTS
  ===================================================== */

  &__products {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $space-3;
  }

  &__product {
    display: flex;
    flex-direction: column;
    gap: $space-2;
    padding: $space-2;
    border-radius: $radius-base;
    transition: background $transition-fast;

    &:hover {
      background: $color-gray-50;
    }
  }

  &__product-image {
    aspect-ratio: 4 / 3;
    border-radius: $radius-base;
    overflow: hidden;
    background: $color-gray-100;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  &__product-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      $color-primary-100,
      $color-secondary-100
    );
  }

  &__product-name {
    font-size: $text-sm;
    font-weight: $font-semibold;
    color: $color-gray-900;
  }

  &__product-tagline {
    font-size: $text-xs;
    color: $color-gray-600;
  }

  /* =====================================================
     STATES
  ===================================================== */

  &__loading,
  &__empty {
    padding: $space-2;
    font-size: $text-sm;
    color: $color-gray-500;
  }
}
</style>