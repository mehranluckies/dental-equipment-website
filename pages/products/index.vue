<template>
  <div class="products-page">
    <section class="products-page__content">
      <Container>

        <!-- Loading -->
        <div
          v-if="loading"
          class="products-page__loading"
        >
          {{ t('productsPage.loading') }}
        </div>

        <!-- Error -->
        <div
          v-else-if="error"
          class="products-page__error"
        >
          {{ t('productsPage.error') }}
        </div>

        <!-- Categories -->
        <div
          v-else-if="categories.length"
          class="products-page__categories"
        >
          <NuxtLink
            v-for="category in categories"
            :key="category.slug"
            :to="
              localePath(
                `/products/${category.slug}`
              )
            "
            class="products-page__category"
          >

            <!-- Category Icon -->
            <div class="products-page__category-image">
              <img
                v-if="category.image"
                :src="category.image"
                :alt="category.image"
              />

              <div
                v-else
                class="products-page__category-placeholder"
              >
                <span>
                  {{ category.name.charAt(0) }}
                </span>
              </div>
            </div>

            <!-- Category Content -->
            <div class="products-page__category-content">

              <div class="products-page__category-eyebrow">
                {{ t('productsPage.category') }}
              </div>

              <h2 class="products-page__category-title">
                {{ category.name }}
              </h2>

              <p class="products-page__category-description">
                {{ category.description }}
              </p>

              <div class="products-page__category-footer">
                <span>
                  {{ category.productCount }}
                  {{ t('productsPage.products') }}
                </span>

                <span class="products-page__category-arrow">
                  →
                </span>
              </div>

            </div>
          </NuxtLink>
        </div>

        <!-- Empty -->
        <div
          v-else
          class="products-page__empty"
        >
          <h2>
            {{ t('productsPage.empty.title') }}
          </h2>

          <p>
            {{ t('productsPage.empty.description') }}
          </p>
        </div>

      </Container>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const localePath = useLocalePath()
const { t, locale } = useI18n()
const config = useRuntimeConfig()

const {
  products,
  loading: productsLoading,
  error: productsError,
  fetchProducts
} = useProducts()

interface StrapiMedia {
  id: number
  documentId: string
  name: string
  url: string
}

interface StrapiProductCategory {
  id: number
  documentId: string
  name: string
  slug: string
  icon?: StrapiMedia | null
  image?: StrapiMedia | null
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
  image : string
  productCount: number
}

const categoriesData = ref<StrapiProductCategory[]>([])
const categoriesLoading = ref(false)
const categoriesError = ref<Error | null>(null)

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

await Promise.all([
  fetchProducts(),
  fetchCategories()
])

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
      description: '',
      icon: getMediaUrl(category.icon),
      image:getMediaUrl(category.image),
      productCount
    }
  })
})

const loading = computed(() => {
  return (
    productsLoading.value ||
    categoriesLoading.value
  )
})

const error = computed(() => {
  return (
    productsError.value ||
    categoriesError.value
  )
})

useSeoMeta({
  title: computed(
    () =>
      `${t('productsPage.title')} | DentalTech Pro`
  ),

  description: computed(
    () =>
      t('productsPage.description')
  ),

  ogTitle: computed(
    () =>
      `${t('productsPage.title')} | DentalTech Pro`
  ),

  ogDescription: computed(
    () =>
      t('productsPage.description')
  )
})
</script>

<style scoped lang="scss">

.products-page {
  min-height: 100vh;

  /* =====================================================
     HERO
  ===================================================== */

  &__hero {
    padding: $space-24 0;

    background: linear-gradient(
      135deg,
      lighten($color-primary-600, 45%),
      lighten($color-secondary-500, 45%)
    );

    text-align: center;
  }

  &__eyebrow {
    margin-bottom: $space-3;

    font-size: $text-sm;
    font-weight: $font-semibold;

    color: $color-primary-600;

    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  &__title {
    margin-bottom: $space-4;

    font-size: $text-4xl;
    font-weight: $font-bold;

    color: $color-gray-900;

    @include respond-to(md) {
      font-size: $text-5xl;
    }
  }

  &__description {
    max-width: 700px;

    margin: 0 auto;

    font-size: $text-xl;
    line-height: 1.7;

    color: $color-gray-700;
  }

  /* =====================================================
     CONTENT
  ===================================================== */

  &__content {
    padding: $space-20 0;
  }

  /* =====================================================
     CATEGORIES GRID
  ===================================================== */

  &__categories {
    display: grid;

    grid-template-columns: 1fr;

    gap: $space-8;

    @include respond-to(md) {
      grid-template-columns:
        repeat(2, 1fr);
    }

    @include respond-to(lg) {
      grid-template-columns:
        repeat(3, 1fr);
    }
  }

  /* =====================================================
     CATEGORY CARD
  ===================================================== */

  &__category {
    display: flex;

    flex-direction: column;

    overflow: hidden;

    border: 1px solid
      $color-gray-200;

    border-radius: $radius-lg;

    background: #fff;

    text-decoration: none;

    box-shadow:
      0 8px 30px
      rgba(0, 0, 0, 0.05);

    transition:
      transform 0.25s ease,
      box-shadow 0.25s ease,
      border-color 0.25s ease;

    &:hover {
      transform:
        translateY(-6px);

      border-color:
        $color-gray-300;

      box-shadow:
        0 18px 45px
        rgba(0, 0, 0, 0.09);

      .products-page__category-arrow {
        transform:
          translateX(5px);
      }

      .products-page__category-image img {
        transform:
          scale(1.04);
      }
    }
  }

  /* =====================================================
     CATEGORY ICON
  ===================================================== */

  &__category-image {
    position: relative;

    width: 100%;

    aspect-ratio: 16 / 10;

    overflow: hidden;

    background:
      $color-gray-100;

    img {
      width: 100%;
      height: 100%;

      object-fit: cover;

      transition:
        transform 0.4s ease;
    }
  }

  /* =====================================================
     PLACEHOLDER
  ===================================================== */

  &__category-placeholder {
    display: flex;

    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    background: linear-gradient(
      135deg,
      lighten($color-primary-600, 40%),
      lighten($color-secondary-500, 40%)
    );

    span {
      font-size: $text-5xl;
      font-weight: $font-bold;

      color:
        $color-primary-600;
    }
  }

  /* =====================================================
     CATEGORY CONTENT
  ===================================================== */

  &__category-content {
    display: flex;

    flex-direction: column;

    flex: 1;

    padding: $space-6;
  }

  &__category-eyebrow {
    margin-bottom: $space-2;

    font-size: $text-xs;
    font-weight: $font-semibold;

    color:
      $color-primary-600;

    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  &__category-title {
    margin-bottom: $space-3;

    font-size: $text-2xl;
    font-weight: $font-semibold;

    color:
      $color-gray-900;
  }

  &__category-description {
    flex: 1;

    margin-bottom: $space-6;

    font-size: $text-base;
    line-height: 1.7;

    color:
      $color-gray-600;
  }

  /* =====================================================
     FOOTER
  ===================================================== */

  &__category-footer {
    display: flex;

    align-items: center;
    justify-content: space-between;

    padding-top: $space-4;

    border-top:
      1px solid
      $color-gray-200;

    font-size: $text-sm;
    font-weight: $font-semibold;

    color:
      $color-gray-700;
  }

  &__category-arrow {
    font-size: $text-xl;

    color:
      $color-primary-600;

    transition:
      transform 0.25s ease;
  }

  /* =====================================================
     STATES
  ===================================================== */

  &__loading,
  &__error,
  &__empty {
    min-height: 300px;

    display: flex;

    flex-direction: column;

    align-items: center;
    justify-content: center;

    text-align: center;

    font-size: $text-lg;

    color:
      $color-gray-700;
  }

  &__empty {
    h2 {
      margin-bottom: $space-3;

      font-size: $text-2xl;
      font-weight: $font-semibold;

      color:
        $color-gray-900;
    }

    p {
      color:
        $color-gray-600;
    }
  }

  &__error {
    color:
      $color-gray-700;
  }
}

</style>