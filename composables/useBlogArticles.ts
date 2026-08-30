// composables/useBlogArticles.ts

export const useBlogArticles = () => {
    const route = useRoute()
    const router = useRouter()
    const { locale } = useI18n()
    const config = useRuntimeConfig()
  
    // ==========================================
    // SEARCH
    // ==========================================
  
    const search = ref(
      typeof route.query.search === 'string'
        ? route.query.search
        : ''
    )
  
    // ==========================================
    // CURRENT PAGE
    // ==========================================
  
    const currentPage = computed(() => {
      const page = Number(route.query.page)
  
      return Number.isInteger(page) && page > 0
        ? page
        : 1
    })
  
    // ==========================================
    // SELECTED CATEGORY
    // ==========================================
  
    const selectedCategory = computed(() => {
      const category = route.query.category
  
      return typeof category === 'string'
        ? category
        : null
    })
  
    // ==========================================
    // FETCH CATEGORIES
    // ==========================================
  
    const {
      data: categoriesData
    } = useFetch(
      `${config.public.strapiUrl}/api/categories`,
      {
        query: computed(() => ({
          locale: locale.value,
          sort: ['name:asc'],
          fields: ['name', 'slug']
        })),
  
        watch: [
          locale
        ]
      }
    )
  
    const categories = computed(() => {
      return categoriesData.value?.data ?? []
    })
  
    // ==========================================
    // FETCH ARTICLES
    // ==========================================
  
    const {
      data: articlesData,
      pending,
      error
    } = useFetch(
      `${config.public.strapiUrl}/api/articles`,
      {
        query: computed(() => {
          const query: Record<string, any> = {
            locale: locale.value,
  
            sort: [
              'publishedAt:desc'
            ],
  
            populate: [
              'coverImage',
              'category',
              'tags'
            ],
  
            // Strapi pagination
            'pagination[page]':
              currentPage.value,
  
            'pagination[pageSize]': 6
          }
  
          // ========================================
          // CATEGORY
          // ========================================
  
          if (selectedCategory.value) {
            query[
              'filters[category][slug][$eq]'
            ] = selectedCategory.value
          }
  
          // ========================================
          // SEARCH
          // ========================================
  
          if (search.value.trim()) {
            const value = search.value.trim()
  
            query[
              'filters[$or][0][title][$containsi]'
            ] = value
  
            query[
              'filters[$or][1][excerpt][$containsi]'
            ] = value
          }
  
          return query
        }),
  
        // Re-fetch when these change
        watch: [
          locale,
          selectedCategory,
          currentPage,
          search
        ]
      }
    )
  
    // ==========================================
    // ARTICLES
    // ==========================================
  
    const articles = computed(() => {
      return articlesData.value?.data ?? []
    })
  
    // ==========================================
    // PAGINATION META
    // ==========================================
  
    const pagination = computed(() => {
      return articlesData.value?.meta?.pagination
    })
  
    const totalPages = computed(() => {
      const pageCount =
        pagination.value?.pageCount
  
      return typeof pageCount === 'number'
        ? pageCount
        : 1
    })
  
    // ==========================================
    // FEATURED ARTICLE
    // ==========================================
  
    const featuredArticle = computed(() => {
      return articles.value.find(
        (article: any) => article.featured
      )
    })
  
    // ==========================================
    // REGULAR ARTICLES
    // ==========================================
  
    const regularArticles = computed(() => {
      return articles.value.filter(
        (article: any) =>
          article.documentId !==
          featuredArticle.value?.documentId
      )
    })
  
    // ==========================================
    // SELECT CATEGORY
    // ==========================================
  
    const selectCategory = async (
      slug: string | null
    ) => {
      await router.push({
        path: route.path,
  
        query: {
          ...(search.value.trim()
            ? {
                search: search.value.trim()
              }
            : {}),
  
          ...(slug
            ? {
                category: slug
              }
            : {})
        }
      })
    }
  
    // ==========================================
    // CHANGE PAGE
    // ==========================================
  
    const changePage = async (
      page: number
    ) => {
      // Safety check
      if (
        page < 1 ||
        page > totalPages.value ||
        page === currentPage.value
      ) {
        return
      }
  
      await router.push({
        path: route.path,
  
        query: {
          ...(selectedCategory.value
            ? {
                category:
                  selectedCategory.value
              }
            : {}),
  
          ...(search.value.trim()
            ? {
                search:
                  search.value.trim()
              }
            : {}),
  
          // Page 1 doesn't need to be in URL
          ...(page > 1
            ? {
                page: String(page)
              }
            : {})
        }
      })
  
      await nextTick()
  
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  
    // ==========================================
    // SEARCH → UPDATE URL
    // ==========================================
  
    let searchTimeout:
      ReturnType<typeof setTimeout> | null = null
  
    watch(
      search,
      (value) => {
        if (searchTimeout) {
          clearTimeout(searchTimeout)
        }
  
        searchTimeout = setTimeout(
          async () => {
            const newSearch = value.trim()
  
            await router.replace({
              path: route.path,
  
              query: {
                ...(selectedCategory.value
                  ? {
                      category:
                        selectedCategory.value
                    }
                  : {}),
  
                ...(newSearch
                  ? {
                      search: newSearch
                    }
                  : {})
              }
            })
          },
          400
        )
      }
    )
  
    // ==========================================
    // SYNC SEARCH WITH URL
    // ==========================================
  
    watch(
      () => route.query.search,
      (value) => {
        const routeSearch =
          typeof value === 'string'
            ? value
            : ''
  
        if (
          routeSearch !== search.value
        ) {
          search.value = routeSearch
        }
      }
    )
  
    // ==========================================
    // RETURN
    // ==========================================
  
    return {
      articles,
      categories,
  
      featuredArticle,
      regularArticles,
  
      pending,
      error,
  
      search,
      selectedCategory,
  
      currentPage,
      totalPages,
  
      selectCategory,
      changePage
    }
  }