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

  /**
   * Convert Strapi media URL to full URL
   */
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

  /**
   * Convert Strapi product to frontend Product type
   */
  const mapProduct = (
    item: StrapiProduct
  ): Product => {
    return {
      // Strapi documentId is more stable for frontend relations
      id: item.documentId,

      slug: item.slug,

      name: item.name,

      // Old frontend field → new Strapi field
      sku: item.productCode || '',

      tagline: item.tagline || '',

      // Short description
      description:
        item.shortDescription || '',

      // Long description
      longDescription:
        item.description || '',

      // Category documentId
      categoryId:
        item.Category?.documentId || '',

      // Main product image
      heroImage:
        getMediaUrl(item.coverImage),

      // Gallery images
      galleryImages:
        item.gallery?.map(image =>
          getMediaUrl(image)
        ) || [],

      // Not currently available in Strapi
      videoUrl: undefined,

      // Key features
      keyFeatures:
        item.keyFeatures?.map(feature => ({
          title: feature.title,
          description: feature.description,
        })) || [],

      // Technical specifications
      specifications:
        item.specifications?.map(spec => ({
          label: spec.label,

          value: spec.unit
            ? `${spec.value} ${spec.unit}`
            : spec.value,

          group: spec.group,
        })) || [],

      // Not currently available in Strapi
      applications: [],

      // Price not currently available
      price: undefined,

      // Not currently available in Strapi
      isNew: false,

      // Strapi featured
      isFeatured:
        item.featured || false,

      // Badges
      badges:
        item.badges?.map(
          badge => badge.label
        ) || [],

      // Related products
      relatedProductIds:
        item.relatedProducts?.map(
          product =>
            product.documentId
        ) || [],

      // Published date
      publishedAt:
        item.publishedAt
          ? new Date(item.publishedAt)
          : new Date(),
    }
  }

  /**
   * Fetch all products
   */
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
              locale: locale.value,
            },
          }
        )

      products.value =
        response.data.map(mapProduct)

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

  /**
   * Get one product by slug
   */
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
              'filters[slug][$eq]': slug,
              populate: '*',
              locale: locale.value,
            },
          }
        )

      const item =
        response.data?.[0]

      if (!item) {
        return null
      }

      return mapProduct(item)

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

  return {
    products,
    loading,
    error,
    fetchProducts,
    getProductBySlug,
  }
}