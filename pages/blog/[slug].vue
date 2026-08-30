<template>
  <div class="article-page">

    <!-- ==========================================
         LOADING
    =========================================== -->

    <section
      v-if="pending"
      class="article-page__loading"
    >
      <Container>
        <div class="loading-state">
          <div class="loading-state__spinner"></div>
          <span>Loading...</span>
        </div>
      </Container>
    </section>


    <!-- ==========================================
         NOT FOUND
    =========================================== -->

    <section
      v-else-if="error || !article"
      class="article-page__not-found"
    >
      <Container>
        <div class="not-found">

          <span class="not-found__number">
            404
          </span>

          <h1>
            {{ $t('blogPage.article.notFound') }}
          </h1>

          <NuxtLink
            :to="localePath('/blog')"
            class="not-found__back"
          >
            <span>←</span>
            {{ $t('blogPage.article.backToBlog') }}
          </NuxtLink>

        </div>
      </Container>
    </section>


    <!-- ==========================================
         ARTICLE
    =========================================== -->

    <article
      v-else
      class="article-page__article"
    >

      <!-- ========================================
           ARTICLE HEADER
      ========================================= -->

      <section class="article-page__hero">
        <Container>

          <div class="article-page__hero-inner">

            <!-- Category -->

            <NuxtLink
              v-if="article.category"
              :to="localePath({
                path: '/blog',
                query: {
                  category: article.category.slug
                }
              })"
              class="article-page__category"
            >
              <span class="article-page__category-dot"></span>

              {{ article.category.name }}
            </NuxtLink>


            <!-- Title -->

            <h1 class="article-page__title">
              {{ article.title }}
            </h1>


            <!-- Excerpt -->

            <p
              v-if="article.excerpt"
              class="article-page__excerpt"
            >
              {{ article.excerpt }}
            </p>


            <!-- Meta -->

            <div class="article-page__meta">

              <span
                v-if="article.author"
                class="article-page__meta-item"
              >
                {{ article.author }}
              </span>

              <span
                v-if="article.readingTime"
                class="article-page__meta-item"
              >
                {{ article.readingTime }} min read
              </span>

              <span
                v-if="article.publishedAt"
                class="article-page__meta-item"
              >
                {{ formatDate(article.publishedAt) }}
              </span>

            </div>

          </div>

        </Container>
      </section>


      <!-- ========================================
           COVER IMAGE
      ========================================= -->

      <section
        v-if="coverImageUrl"
        class="article-page__cover"
      >
        <Container>

          <div class="article-page__cover-wrapper">

            <img
              :src="coverImageUrl"
              :alt="article.title"
              class="article-page__cover-image"
            />

          </div>

        </Container>
      </section>


      <!-- ========================================
           CONTENT
      ========================================= -->

      <section class="article-page__content">
        <Container>

          <div class="article-page__layout">


            <!-- ==================================
                 MAIN CONTENT
            =================================== -->

            <main class="article-page__body">

              <div class="article-content">

                <template
                  v-for="(block, index) in article.content"
                  :key="index"
                >

                  <!-- Paragraph -->

                  <p
                    v-if="block.type === 'paragraph'"
                    class="article-content__paragraph"
                  >
                    <template
                      v-for="(child, childIndex) in block.children"
                      :key="childIndex"
                    >
                      {{ child.text }}
                    </template>
                  </p>


                  <!-- Heading -->

                  <component
                    v-else-if="block.type === 'heading'"
                    :is="`h${block.level || 2}`"
                    class="article-content__heading"
                  >
                    <template
                      v-for="(child, childIndex) in block.children"
                      :key="childIndex"
                    >
                      {{ child.text }}
                    </template>
                  </component>


                  <!-- Unordered List -->

                  <ul
                    v-else-if="
                      block.type === 'list' &&
                      block.format === 'unordered'
                    "
                    class="article-content__list"
                  >

                    <li
                      v-for="(item, itemIndex) in block.children"
                      :key="itemIndex"
                    >

                      <template
                        v-for="(child, childIndex) in item.children"
                        :key="childIndex"
                      >
                        {{ child.text }}
                      </template>

                    </li>

                  </ul>


                  <!-- Ordered List -->

                  <ol
                    v-else-if="
                      block.type === 'list' &&
                      block.format === 'ordered'
                    "
                    class="article-content__list article-content__list--ordered"
                  >

                    <li
                      v-for="(item, itemIndex) in block.children"
                      :key="itemIndex"
                    >

                      <template
                        v-for="(child, childIndex) in item.children"
                        :key="childIndex"
                      >
                        {{ child.text }}
                      </template>

                    </li>

                  </ol>


                  <!-- Quote -->

                  <blockquote
                    v-else-if="block.type === 'quote'"
                    class="article-content__quote"
                  >

                    <template
                      v-for="(child, childIndex) in block.children"
                      :key="childIndex"
                    >
                      {{ child.text }}
                    </template>

                  </blockquote>

                </template>

              </div>


              <!-- ==================================
                   ARTICLE FOOTER
              =================================== -->

              <div
                v-if="article.tags?.length"
                class="article-footer"
              >

                <div class="article-footer__line"></div>

                <div class="article-footer__content">

                  <span class="article-footer__label">
                    Tags
                  </span>

                  <div class="article-tags">

                    <NuxtLink
                      v-for="tag in article.tags"
                      :key="tag.id"
                      :to="localePath({
                        path: '/blog',
                        query: {
                          tag: tag.slug
                        }
                      })"
                      class="article-tag"
                    >
                      #{{ tag.name }}
                    </NuxtLink>

                  </div>

                </div>

              </div>

            </main>


            <!-- ==================================
                 SIDEBAR
            =================================== -->

            <aside class="article-page__sidebar">

              <ArticleSidebar
                :article="article"
              />

            </aside>

          </div>

        </Container>
      </section>


      <!-- ========================================
           BACK TO BLOG
      ========================================= -->

      <section class="article-page__bottom">
        <Container>

        </Container>
      </section>

    </article>

  </div>
</template>


<script setup lang="ts">

// ==========================================
// ROUTER
// ==========================================

const route = useRoute()
const localePath = useLocalePath()


// ==========================================
// I18N
// ==========================================

const { locale } = useI18n()


// ==========================================
// CONFIG
// ==========================================

const config = useRuntimeConfig()


// ==========================================
// SLUG
// ==========================================

const slug = computed(() => {
  return String(route.params.slug || '')
})


// ==========================================
// FETCH ARTICLE
// ==========================================

const {
  data,
  pending,
  error
} = await useFetch(
  `${config.public.strapiUrl}/api/articles`,
  {
    query: computed(() => ({
      locale: locale.value,

      'filters[slug][$eq]': slug.value,

      'populate[coverImage]': true,

      'populate[category]': true,

      'populate[tags]': true
    })),

    watch: [
      locale,
      slug
    ]
  }
)


// ==========================================
// ARTICLE
// ==========================================

const article = computed(() => {
  return data.value?.data?.[0] || null
})


// ==========================================
// COVER IMAGE
// ==========================================

const coverImageUrl = computed(() => {

  const image = article.value?.coverImage

  if (!image?.url) {
    return null
  }

  if (image.url.startsWith('http')) {
    return image.url
  }

  return `${config.public.strapiUrl}${image.url}`
})


// ==========================================
// DATE
// ==========================================

const formatDate = (date: string) => {

  return new Intl.DateTimeFormat(
    locale.value === 'fa'
      ? 'fa-IR'
      : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  ).format(new Date(date))
}


// ==========================================
// SEO
// ==========================================

useSeoMeta({

  title: computed(() => {
    return (
      article.value?.seoTitle ||
      article.value?.title ||
      'Blog | DentalTech Pro'
    )
  }),

  description: computed(() => {
    return (
      article.value?.seoDescription ||
      article.value?.excerpt ||
      'Latest articles about digital dentistry and dental technology.'
    )
  }),

  ogTitle: computed(() => {
    return (
      article.value?.seoTitle ||
      article.value?.title ||
      ''
    )
  }),

  ogDescription: computed(() => {
    return (
      article.value?.seoDescription ||
      article.value?.excerpt ||
      ''
    )
  }),

  ogImage: computed(() => {
    return coverImageUrl.value || undefined
  })

})

</script>


<style scoped lang="scss">

/* ==========================================
   PAGE
========================================== */

.article-page {
  min-height: 100vh;
  background: white;
}


/* ==========================================
   LOADING
========================================== */

.article-page__loading {
  padding: $space-20 0;
}

.loading-state {
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap: $space-4;

  color: $color-gray-500;

  font-size: $text-sm;
}

.loading-state__spinner {
  width: 28px;
  height: 28px;

  border: 2px solid $color-gray-200;
  border-top-color: $color-primary-600;

  border-radius: 50%;

  animation: article-spin 0.8s linear infinite;
}

@keyframes article-spin {
  to {
    transform: rotate(360deg);
  }
}


/* ==========================================
   NOT FOUND
========================================== */

.article-page__not-found {
  padding: $space-24 0;
}

.not-found {
  display: flex;

  flex-direction: column;

  align-items: center;

  text-align: center;
}

.not-found__number {
  margin-bottom: $space-4;

  color: $color-primary-600;

  font-size: 72px;
  font-weight: $font-bold;

  line-height: 1;
}

.not-found h1 {
  margin: 0 0 $space-6;

  color: $color-gray-900;

  font-size: $text-3xl;
  font-weight: $font-bold;
}

.not-found__back {
  display: inline-flex;

  align-items: center;

  gap: $space-2;

  color: $color-primary-600;

  font-size: $text-sm;
  font-weight: $font-semibold;

  text-decoration: none;

  transition: color 0.2s ease;

  &:hover {
    color: $color-primary-800;
  }
}


/* ==========================================
   ARTICLE HERO
========================================== */

.article-page__hero {
  padding: $space-8 0 $space-6;

  background: white;
}

.article-page__hero-inner {
  max-width: 900px;

  margin: 0 auto;

  text-align: center;
}


/* ==========================================
   CATEGORY
========================================== */

.article-page__category {
  display: inline-flex;

  align-items: center;

  gap: $space-2;

  margin-bottom: $space-4;

  color: $color-primary-600;

  font-size: $text-sm;
  font-weight: $font-semibold;

  text-decoration: none;

  transition: color 0.2s ease;

  &:hover {
    color: $color-primary-800;
  }
}

.article-page__category-dot {
  width: 6px;
  height: 6px;

  flex-shrink: 0;

  border-radius: 50%;

  background: $color-primary-600;
}


/* ==========================================
   TITLE
========================================== */

.article-page__title {
  max-width: 850px;

  margin: 0 auto;

  color: $color-gray-900;

  font-size: $text-4xl;
  font-weight: $font-bold;

  line-height: 1.18;

  letter-spacing: -0.025em;

  @include respond-to(md) {
    font-size: $text-5xl;
  }
}


/* ==========================================
   EXCERPT
========================================== */

.article-page__excerpt {
  max-width: 680px;

  margin: $space-4 auto 0;

  color: $color-gray-600;

  font-size: $text-lg;

  line-height: 1.7;

  @include respond-to(md) {
    font-size: $text-xl;
  }
}


/* ==========================================
   META
========================================== */

.article-page__meta {
  display: flex;

  justify-content: center;
  align-items: center;

  flex-wrap: wrap;

  margin-top: $space-4;

  color: $color-gray-500;

  font-size: $text-sm;
}

.article-page__meta-item {
  display: inline-flex;

  align-items: center;

  &:not(:last-child)::after {
    content: '•';

    margin: 0 $space-3;

    color: $color-gray-300;
  }
}


/* ==========================================
   COVER
========================================== */

.article-page__cover {
  padding: 0 0 $space-12;
}

.article-page__cover-wrapper {
  position: relative;

  overflow: hidden;

  border-radius: $radius-2xl;

  background: $color-gray-100;

  box-shadow: $shadow-lg;
}

.article-page__cover-image {
  display: block;

  width: 100%;

  max-height: 560px;

  object-fit: cover;

  transition: transform 0.5s ease;
}


/* ==========================================
   CONTENT
========================================== */

.article-page__content {
  padding: $space-12 0 $space-16;
}

.article-page__layout {
  display: grid;

  grid-template-columns: 1fr;

  gap: $space-12;

  @include respond-to(lg) {
    grid-template-columns:
      minmax(0, 850px)
      280px;

    justify-content: center;

    align-items: start;

    gap: $space-12;
  }
}


/* ==========================================
   BODY
========================================== */

.article-page__body {
  min-width: 0;
  width: 100%;
}


/* ==========================================
   ARTICLE CONTENT
========================================== */

.article-content {
  color: $color-gray-700;
}

.article-content__paragraph {
  margin: 0 0 $space-6;

  color: $color-gray-700;

  font-size: $text-lg;

  line-height: 1.9;
}

.article-content__heading {
  margin: $space-8 0 $space-4;

  color: $color-gray-900;

  font-size: $text-2xl;

  font-weight: $font-bold;

  line-height: 1.3;

  &:first-child {
    margin-top: 0;
  }
}

.article-content__list {
  padding-left: $space-6;

  margin: 0 0 $space-6;

  li {
    margin-bottom: $space-3;

    color: $color-gray-700;

    font-size: $text-lg;

    line-height: 1.8;
  }
}

.article-content__list--ordered {
  list-style-type: decimal;
}

.article-content__quote {
  position: relative;

  margin: $space-8 0;

  padding: $space-6 $space-8;

  border-left: 3px solid $color-primary-600;

  background: $color-gray-50;

  border-radius: $radius-base;

  color: $color-gray-700;

  font-size: $text-lg;

  font-style: italic;

  line-height: 1.8;
}


/* ==========================================
   SIDEBAR
========================================== */

.article-page__sidebar {
  display: flex;

  flex-direction: column;

  gap: $space-4;

  align-self: start;

  @include respond-to(lg) {
    position: sticky;

    top: calc(91px + $space-6);
  }
}


/* ==========================================
   ARTICLE SIDEBAR CARD
========================================== */

.article-sidebar-card {
  padding: $space-4;

  background: white;

  border: 1px solid $color-gray-200;

  border-radius: $radius-xl;

  box-shadow: $shadow-sm;
}

.article-sidebar-card__header {
  display: flex;

  align-items: center;

  gap: $space-3;

  margin-bottom: $space-4;
}

.article-sidebar-card__line {
  width: 3px;
  height: 18px;

  flex-shrink: 0;

  border-radius: $radius-full;

  background: $color-primary-600;
}

.article-sidebar-card h3 {
  margin: 0;

  color: $color-gray-900;

  font-size: $text-lg;

  font-weight: $font-semibold;
}


/* ==========================================
   TAGS
========================================== */

.article-footer {
  margin-top: $space-12;
}

.article-footer__line {
  width: 100%;
  height: 1px;

  margin-bottom: $space-6;

  background: $color-gray-200;
}

.article-footer__content {
  display: flex;

  align-items: center;

  flex-wrap: wrap;

  gap: $space-4;
}

.article-footer__label {
  color: $color-gray-500;

  font-size: $text-sm;

  font-weight: $font-semibold;
}

.article-tags {
  display: flex;

  flex-wrap: wrap;

  gap: $space-2;
}

.article-tag {
  display: inline-flex;

  padding: $space-1 $space-3;

  background: $color-gray-100;

  color: $color-gray-600;

  border-radius: $radius-full;

  font-size: $text-sm;

  text-decoration: none;

  transition:
    background 0.2s ease,
    color 0.2s ease;

  &:hover {
    background: rgba(
      $color-primary-600,
      0.08
    );

    color: $color-primary-700;
  }
}


/* ==========================================
   BOTTOM
========================================== */

.article-page__bottom {
  padding: 0 0 $space-16;
}


/* ==========================================
   BACK TO BLOG
========================================== */

.article-back-card {
  display: flex;

  align-items: center;

  gap: $space-4;

  max-width: 850px;

  margin: 0 auto;

  padding: $space-4;

  background: white;

  border: 1px solid $color-gray-200;

  border-radius: $radius-xl;

  box-shadow: $shadow-sm;

  text-decoration: none;

  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);

    border-color: $color-primary-300;

    box-shadow: $shadow-base;

    .article-back-card__icon {
      background: $color-primary-600;

      color: white;

      transform: translateX(-2px);
    }

    .article-back-card__label {
      color: $color-primary-700;
    }
  }
}

.article-back-card__icon {
  display: flex;

  align-items: center;
  justify-content: center;

  width: 42px;
  height: 42px;

  flex-shrink: 0;

  border-radius: $radius-full;

  background: rgba(
    $color-primary-600,
    0.08
  );

  color: $color-primary-600;

  font-size: $text-lg;

  transition:
    background 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.article-back-card__content {
  display: flex;

  flex-direction: column;

  gap: $space-1;

  min-width: 0;
}

.article-back-card__label {
  color: $color-gray-900;

  font-size: $text-sm;

  font-weight: $font-semibold;

  transition: color 0.2s ease;
}

.article-back-card__description {
  color: $color-gray-500;

  font-size: $text-xs;
}


/* ==========================================
   RESPONSIVE
========================================== */

@media (max-width: 767px) {

  .article-page__hero {
    padding: $space-8 0 $space-6;
  }

  .article-page__title {
    font-size: $text-3xl;

    line-height: 1.25;
  }

  .article-page__excerpt {
    font-size: $text-base;

    line-height: 1.7;
  }

  .article-page__meta {
    font-size: $text-xs;
  }

  .article-page__cover {
    padding-bottom: $space-8;
  }

  .article-page__cover-wrapper {
    border-radius: $radius-xl;
  }

  .article-page__cover-image {
    min-height: 220px;

    max-height: 360px;
  }

  .article-page__content {
    padding: $space-8 0 $space-12;
  }

  .article-content__paragraph,
  .article-content__list li {
    font-size: $text-base;

    line-height: 1.85;
  }

  .article-content__heading {
    font-size: $text-xl;
  }

  .article-content__quote {
    padding: $space-4 $space-6;

    font-size: $text-base;
  }

  .article-footer__content {
    align-items: flex-start;

    flex-direction: column;

    gap: $space-3;
  }

}
</style>