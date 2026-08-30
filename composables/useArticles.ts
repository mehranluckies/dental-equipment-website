export const useStrapiUrl = () => {
    const config = useRuntimeConfig()

    return config.public.strapiUrl
}

export const useArticles = () => {
    const strapiUrl = useStrapiUrl()
    const { locale } = useI18n()

    return useFetch(`${strapiUrl}/api/articles`, {
        query: {
            populate: ['coverImage', 'category', 'tags'],
            sort: ['publishedAt:desc'],
            locale: locale.value,
        },

        watch: [locale],
    })
}