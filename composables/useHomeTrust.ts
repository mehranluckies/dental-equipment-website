interface StrapiMedia {
    id: number
    documentId: string
    url: string
    alternativeText?: string | null
  }
  
  interface HomeTrustResponse {
    data: {
      eyebrow: string
      title: string
      description: string
      years: number
      sinceYear: number
      products: number
      distributors: number
      image?: StrapiMedia | null
    }
  }
  
  export interface HomeTrust {
    eyebrow: string
    title: string
    description: string
    years: number
    sinceYear: number
    products: number
    distributors: number
    image: string
  }
  
  export const useHomeTrust = () => {
    const config = useRuntimeConfig()
    const { locale } = useI18n()
  
    const trust = ref<HomeTrust | null>(null)
    const loading = ref(false)
    const error = ref<Error | null>(null)
  
    const getMediaUrl = (media?: StrapiMedia | null) => {
      if (!media?.url) return ''
  
      return media.url.startsWith('http')
        ? media.url
        : `${config.public.strapiUrl}${media.url}`
    }
  
    const fetchHomeTrust = async () => {
      loading.value = true
      error.value = null
  
      try {
        const response = await $fetch<HomeTrustResponse>(
          `${config.public.strapiUrl}/api/home-trust`,
          {
            query: {
              populate: '*',
              locale: locale.value
            }
          }
        )
  
        trust.value = {
          eyebrow: response.data.eyebrow,
          title: response.data.title,
          description: response.data.description,
          years: response.data.years,
          sinceYear: response.data.sinceYear,
          products: response.data.products,
          distributors: response.data.distributors,
          image: getMediaUrl(response.data.image)
        }
      } catch (err) {
        error.value =
          err instanceof Error
            ? err
            : new Error('Failed to fetch Home Trust section')
  
        trust.value = null
      } finally {
        loading.value = false
      }
    }
  
    return {
      trust,
      loading,
      error,
      fetchHomeTrust
    }
  }