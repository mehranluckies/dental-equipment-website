<template>
  <NuxtLink :to="localePath(`/blog/${article.slug}`)" class="featured-article">
    <div class="featured-article__image">
      <img :src="coverImage" :alt="article.title">
    </div>

    <div class="featured-article__content">
      <span class="featured-article__badge">
        {{ $t('blogPage.featured') }}
      </span>

      <h2 class="featured-article__title">
        {{ article.title }}
      </h2>

      <p class="featured-article__excerpt">
        {{ article.excerpt }}
      </p>

      <div class="featured-article__meta">
        <span>{{ article.author }}</span>
        <span>•</span>
        <span v-if="article.readingTime">
        {{ article.readingTime }}
        {{ $t('blogPage.minRead') }}
        </span>
      </div>

      <span class="featured-article__read">
        {{ $t('blogPage.readMore') }} →
      </span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  article: any
}>()

const localePath = useLocalePath()
const config = useRuntimeConfig()

const coverImage = computed(() => {
  const url = props.article.coverImage?.url
  if (!url) return '/images/blog-placeholder.jpg'
  return url.startsWith('http')
    ? url
    : `${config.public.strapiUrl}${url}`
})
</script>

<style scoped lang="scss">
.featured-article {
  display: grid;
  grid-template-columns: 1fr;
  gap: $space-8;

  margin: 0 $space-4 $space-8;

  background: white;
  border-radius: $radius-2xl;
  overflow: hidden;
  box-shadow: $shadow-lg;
  text-decoration: none;

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-xl;
  }

  @include respond-to(lg) {
    grid-template-columns: 1.2fr 1fr;
    margin: 0 $space-8 $space-8;
  }

  &__image {
    img {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 320px;
      object-fit: cover;
    }
  }

  &__content {
    padding: $space-8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: $space-4;
  }

  &__badge {
    display: inline-flex;
    align-self: flex-start;
    padding: $space-2 $space-4;

    border-radius: $radius-full;

    background: rgba($color-primary-600, 0.08);
    color: $color-primary-700;

    font-size: $text-sm;
    font-weight: $font-semibold;
  }

  &__title {
    margin: 0;
    color: $color-gray-900;
    font-size: $text-3xl;
    font-weight: $font-bold;
    line-height: $leading-tight;
  }

  &__excerpt {
    margin: 0;
    color: $color-gray-600;
    font-size: $text-base;
    line-height: $leading-relaxed;
  }

  &__meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: $space-4;

    color: $color-gray-500;
    font-size: $text-sm;
  }

  &__read {
    display: inline-flex;
    align-items: center;
    gap: $space-2;

    color: $color-primary-600;
    font-weight: $font-semibold;
  }
}
</style>