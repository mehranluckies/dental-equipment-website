import type { Product } from '~/types'

interface StrapiMedia {
  id: number
  documentId: string
  name: string
  url: string
  alternativeText?: string | null
}

interface StrapiFeature {
  id: number
  title: string
  description: string
}

interface StrapiSpecification {
  id: number
  label: string
  value: string
  unit?: string | null
  group: string
}

interface StrapiBadge {
  id: number
  label: string
}

interface StrapiCategory {
  id: number
  documentId: string
  name: string
  slug: string

  // Category Icon
  icon?: StrapiMedia | null
}

interface StrapiProduct {
  id: number
  documentId: string
  name: string
  slug: string

  shortDescription?: string | null
  description?: string | null
  productCode?: string | null
  featured?: boolean
  tagline?: string | null
  publishedAt?: string | null
  locale?: string

  coverImage?: StrapiMedia | null
  gallery?: StrapiMedia[]
  manual?: StrapiMedia | null

  Category?: StrapiCategory | null
  Subcategory?: StrapiCategory | null

  specifications?: StrapiSpecification[]
  keyFeatures?: StrapiFeature[]
  badges?: StrapiBadge[]

  relatedProducts?: StrapiProduct[] | null
  localizations?: StrapiProduct[]
}

interface StrapiResponse {
  data: StrapiProduct[]

  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export const useProducts = () => {
  const config = useRuntimeConfig()
  const { locale } = useI18n()

  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<Error | null>(null)

  // --------------------------------------------------
  // Media URL
  // --------------------------------------------------

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

  // --------------------------------------------------
  // Mapper
  // --------------------------------------------------

  const mapProduct = (
    item: StrapiProduct
  ): Product => {
    return {
      id: item.documentId,

      slug: item.slug,

      name: item.name,

      sku: item.productCode || '',

      tagline: item.tagline || '',

      description:
        item.shortDescription || '',

      longDescription:
        item.description || '',

      categoryId:
        item.Category?.documentId || '',

      // ------------------------------------------------
      // Category
      // ------------------------------------------------

      category: item.Category
        ? {
            id: item.Category.documentId,

            name: item.Category.name,

            slug: item.Category.slug,

            icon: getMediaUrl(
              item.Category.icon
            )
          }
        : undefined,

      // ------------------------------------------------
      // Subcategory
      // ------------------------------------------------

      subcategory: item.Subcategory
        ? {
            id:
              item.Subcategory.documentId,

            name:
              item.Subcategory.name,

            slug:
              item.Subcategory.slug
          }
        : undefined,

      // ------------------------------------------------
      // Product Images
      // ------------------------------------------------

      heroImage:
        getMediaUrl(
          item.coverImage
        ),

      galleryImages:
        item.gallery?.map(
          image =>
            getMediaUrl(image)
        ) || [],

      // ------------------------------------------------
      // Manual
      // ------------------------------------------------

      manual:
        getMediaUrl(item.manual),

      videoUrl: undefined,

      // ------------------------------------------------
      // Key Features
      // ------------------------------------------------

      keyFeatures:
        item.keyFeatures?.map(
          feature => ({
            title:
              feature.title,

            description:
              feature.description
          })
        ) || [],

      // ------------------------------------------------
      // Specifications
      // ------------------------------------------------

      specifications:
        item.specifications?.map(
          spec => ({
            label:
              spec.label,

            value: spec.unit
              ? `${spec.value} ${spec.unit}`
              : spec.value,

            group:
              spec.group
          })
        ) || [],

      // ------------------------------------------------
      // Other
      // ------------------------------------------------

      applications: [],

      price: undefined,

      isNew: false,

      isFeatured:
        item.featured || false,

      badges:
        item.badges?.map(
          badge =>
            badge.label
        ) || [],

      relatedProductIds:
        item.relatedProducts?.map(
          product =>
            product.documentId
        ) || [],

      publishedAt:
        item.publishedAt
          ? new Date(
              item.publishedAt
            )
          : new Date()
    }
  }

  // --------------------------------------------------
  // Fetch All Products
  // --------------------------------------------------

  const fetchProducts = async () => {
    loading.value = true
    error.value = null

    try {
      const response =
        await $fetch<StrapiResponse>(
          `${config.public.strapiUrl}/api/products`,
          {
            query: {
              populate: '*',

              locale:
                locale.value,

              sort: [
                'publishedAt:desc'
              ]
            }
          }
        )

      products.value =
        response.data.map(
          mapProduct
        )
    } catch (err) {
      error.value =
        err instanceof Error
          ? err
          : new Error(
              'Failed to fetch products'
            )

      products.value = []
    } finally {
      loading.value = false
    }
  }

  // --------------------------------------------------
  // Single Product By Slug
  // --------------------------------------------------

  const getProductBySlug = async (
    slug: string
  ): Promise<Product | null> => {
    loading.value = true
    error.value = null

    try {
      const response =
        await $fetch<StrapiResponse>(
          `${config.public.strapiUrl}/api/products`,
          {
            query: {
              locale:
                locale.value,

              populate: '*',

              'filters[slug][$eq]':
                slug
            }
          }
        )

      const product =
        response.data[0]

      if (!product) {
        return null
      }

      return mapProduct(product)
    } catch (err) {
      error.value =
        err instanceof Error
          ? err
          : new Error(
              'Failed to fetch product'
            )

      return null
    } finally {
      loading.value = false
    }
  }

  // --------------------------------------------------
  // Related Products
  // --------------------------------------------------

  const getRelatedProducts = (
    product: Product
  ): Product[] => {
    return products.value.filter(
      item =>
        product.relatedProductIds.includes(
          item.id
        )
    )
  }

  // --------------------------------------------------
  // Return
  // --------------------------------------------------

  return {
    products,
    loading,
    error,

    fetchProducts,

    getProductBySlug,

    getRelatedProducts
  }
}