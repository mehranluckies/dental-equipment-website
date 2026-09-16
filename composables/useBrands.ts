interface StrapiMedia {
  id: number
  documentId: string
  url: string
  alternativeText?: string | null
}

interface StrapiBrand {
  id: number
  documentId: string
  name: string
  website?: string | null
  order?: number | null
  logo?: StrapiMedia | null
}

interface StrapiBrandsResponse {
  data: StrapiBrand[]
}

export interface Brand {
  id: number
  documentId: string
  name: string
  website: string
  order: number
  logo: string
  logoAlt: string
}

export const useBrands = () => {
  const config = useRuntimeConfig()
  const { locale } = useI18n()

  const brands = ref<Brand[]>([])
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const getMediaUrl = (
    media?: StrapiMedia | null
  ) => {
    if (!media?.url) {
      return ''
    }

    return media.url.startsWith('http')
      ? media.url
      : `${config.public.strapiUrl}${media.url}`
  }

  const fetchBrands = async () => {
    loading.value = true
    error.value = null

    try {
      const response =
        await $fetch<StrapiBrandsResponse>(
          `${config.public.strapiUrl}/api/brands`,
          {
            query: {
              populate: '*',
              locale: locale.value,
              sort: 'order:asc'
            }
          }
        )

      brands.value = response.data
        .map(item => ({
          id: item.id,
          documentId: item.documentId,
          name: item.name,
          website: item.website || '',
          order: item.order ?? 0,
          logo: getMediaUrl(item.logo),
          logoAlt:
            item.logo?.alternativeText ||
            item.name
        }))
        .sort((a, b) => {
          return a.order - b.order
        })
    } catch (err) {
      error.value =
        err instanceof Error
          ? err
          : new Error(
              'Failed to fetch brands'
            )

      brands.value = []
    } finally {
      loading.value = false
    }
  }

  return {
    brands,
    loading,
    error,
    fetchBrands
  }
}
