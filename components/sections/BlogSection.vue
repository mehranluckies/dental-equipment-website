<template>
  <section class="blog-section">
    <Container>
      <div class="blog-section__header">
        <h2 class="blog-section__title">
          {{ $t('home.blog.title') }}
        </h2>
        <p class="blog-section__description">
          {{ $t('home.blog.description') }}
        </p>
      </div>

      <div
        v-if="pending"
        class="blog-section__grid"
      >
        <div
          v-for="i in 3"
          :key="i"
          class="blog-card-preview blog-card-preview--skeleton"
        >
          <div class="blog-card-preview__image">
            <div class="blog-card-preview__placeholder"></div>
          </div>
          <div class="blog-card-preview__content">
            <div class="blog-skeleton-line blog-skeleton-line--title"></div>
            <div class="blog-skeleton-line blog-skeleton-line--meta"></div>
          </div>
        </div>
      </div>

      <div
        v-else-if="latestArticles.length"
        class="blog-section__grid"
      >
        <NuxtLink
          v-for="article in latestArticles"
          :key="article.documentId"
          :to="localePath(`/blog/${article.slug}`)"
          class="blog-card-preview"
        >
          <div class="blog-card-preview__image">
            <img
              v-if="article.coverImage?.url"
              :src="coverUrl(article)"
              :alt="article.title"
            >
            <div
              v-else
              class="blog-card-preview__placeholder"
            ></div>
            <div
              v-if="article.category?.name"
              class="blog-card-preview__category"
            >
              {{ article.category.name }}
            </div>
          </div>
          <div class="blog-card-preview__content">
            <h3 class="blog-card-preview__title">
              {{ article.title }}
            </h3>
            <div class="blog-card-preview__meta">
              <span v-if="article.author">{{ article.author }}</span>
              <span v-if="article.author && article.readingTime">•</span>
              <span v-if="article.readingTime">
                {{ article.readingTime }} {{ $t('blogPage.minRead') }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>

      <div
        v-else
        class="blog-section__empty"
      >
        <Icon
          name="file-text"
          size="2xl"
        />
        <h3>
          {{ $t('home.blog.emptyTitle') }}
        </h3>
        <p>
          {{ $t('home.blog.emptyDescription') }}
        </p>
      </div>

      <div
        v-if="latestArticles.length"
        class="blog-section__cta"
      >
        <Button
          size="lg"
          variant="outline"
          tag="NuxtLink"
          :to="localePath('/blog')"
        >
          {{ $t('home.blog.viewAll') }}
        </Button>
      </div>
    </Container>
  </section>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const config = useRuntimeConfig()

const {
  articles,
  pending
} = useBlogArticles()

const latestArticles = computed(() =>
  articles.value
    .filter((article: any) => article.publishedAt)
    .slice(0, 3)
)

const coverUrl = (article: any) => {
  const url = article.coverImage?.url
  if (!url) return ''
  return url.startsWith('http')
    ? url
    : `${config.public.strapiUrl}${url}`
}
</script>

<style scoped lang="scss">
.blog-section {
  padding: $space-32 0;

  &__header {
    text-align: center;
    max-width: 700px;
    margin: 0 auto $space-16;
  }

  &__title {
    font-size: $text-4xl;
    font-weight: $font-bold;
    color: $color-gray-900;
    margin-bottom: $space-4;

    @include respond-to(md) {
      font-size: $text-5xl;
    }
  }

  &__description {
    font-size: $text-xl;
    color: $color-gray-600;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-8;
    margin-bottom: $space-12;

    @include respond-to(md) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__cta {
    text-align: center;
  }

  &__empty {
    text-align: center;
    padding: $space-16 0;
    color: $color-gray-500;

    h3 {
      margin-bottom: $space-3;
      color: $color-gray-800;
      font-size: $text-xl;
      font-weight: $font-semibold;
    }

    p {
      color: $color-gray-500;
    }

    :deep(svg) {
      margin-bottom: $space-4;
      color: $color-primary-500;
    }
  }
}

.blog-card-preview {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: $radius-xl;
  overflow: hidden;
  box-shadow: $shadow-sm;
  transition: all $transition-base;

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-lg;

    .blog-card-preview__placeholder,
    .blog-card-preview__image img {
      transform: scale(1.05);
    }
  }

  &__image {
    position: relative;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background: $color-gray-100;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform $transition-slow;
    }
  }

  &__placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      lighten($color-secondary-500, 25%),
      lighten($color-primary-600, 25%)
    );
    transition: transform $transition-slow;
  }

  &__category {
    position: absolute;
    top: $space-3;
    left: $space-3;
    padding: $space-2 $space-4;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: $radius-full;
    font-size: $text-xs;
    font-weight: $font-semibold;
    color: $color-primary-600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__content {
    padding: $space-6;
    display: flex;
    flex-direction: column;
    gap: $space-3;
  }

  &__title {
    font-size: $text-xl;
    font-weight: $font-semibold;
    color: $color-gray-900;
    line-height: $leading-snug;
  }

  &__meta {
    display: flex;
    gap: $space-2;
    font-size: $text-sm;
    color: $color-gray-600;
  }

  &--skeleton {
    pointer-events: none;
  }
}

.blog-skeleton-line {
  height: 14px;
  border-radius: $radius-full;
  background: $color-gray-100;

  &--title {
    width: 85%;
    height: 21px;
  }

  &--meta {
    width: 45%;
  }
}

:global(html[dir='rtl']) {
  .blog-card-preview__category {
    left: auto;
    right: $space-3;
  }
}
</style>
