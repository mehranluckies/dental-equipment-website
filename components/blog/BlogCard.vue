<template>
  <NuxtLink
    :to="localePath(`/blog/${article.slug}`)"
    class="blog-card"
  >
    <!-- ========================================== -->
    <!-- IMAGE -->
    <!-- ========================================== -->

    <div class="blog-card__image">
      <img
        v-if="article.coverImage?.url"
        :src="`${strapiUrl}${article.coverImage.url}`"
        :alt="article.title"
      />

      <div
        v-else
        class="blog-card__placeholder"
      />
    </div>

    <!-- ========================================== -->
    <!-- CONTENT -->
    <!-- ========================================== -->

    <div class="blog-card__content">

      <!-- Meta -->
      <div class="blog-card__meta">
        <span v-if="article.category?.name">
          {{ article.category.name }}
        </span>

        <span
          v-if="
            article.category?.name &&
            article.readingTime
          "
        >
          •
        </span>

        <span v-if="article.readingTime">
          {{ article.readingTime }}
          {{ $t('blogPage.minRead') }}
        </span>
      </div>

      <!-- Title -->
      <h3 class="blog-card__title">
        {{ article.title }}
      </h3>

      <!-- Excerpt -->
      <p
        v-if="article.excerpt"
        class="blog-card__excerpt"
      >
        {{ article.excerpt }}
      </p>

      <!-- Read More -->
      <span class="blog-card__readmore">
        {{ $t('blogPage.readMore') }}
      </span>

    </div>
  </NuxtLink>
</template>

<script setup lang="ts">

// ==========================================
// PROPS
// ==========================================

defineProps<{
  article: any
}>()

// ==========================================
// LOCALE PATH
// ==========================================

const localePath = useLocalePath()

// ==========================================
// CONFIG
// ==========================================

const config = useRuntimeConfig()

const strapiUrl = config.public.strapiUrl

</script>

<style scoped lang="scss">

// ==========================================
// CARD
// ==========================================

.blog-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  background: white;
  border-radius: $radius-xl;
  box-shadow: $shadow-base;

  text-decoration: none;

  transition:
    transform $transition-base,
    box-shadow $transition-base;

  &:hover {
    transform: translateY(-6px);
    box-shadow: $shadow-xl;

    .blog-card__image img {
      transform: scale(1.05);
    }

    .blog-card__readmore {
      color: $color-primary-700;
    }
  }

  // ========================================
  // IMAGE
  // ========================================

  &__image {
    width: 100%;
    aspect-ratio: 16 / 10;
    overflow: hidden;

    background: $color-gray-100;

    img {
      display: block;
      width: 100%;
      height: 100%;

      object-fit: cover;

      transition:
        transform $transition-base;
    }
  }

  // ========================================
  // PLACEHOLDER
  // ========================================

  &__placeholder {
    width: 100%;
    height: 100%;

    background: $color-gray-100;
  }

  // ========================================
  // CONTENT
  // ========================================

  &__content {
    display: flex;
    flex: 1;
    flex-direction: column;

    padding: $space-6;
  }

  // ========================================
  // META
  // ========================================

  &__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    gap: $space-2;

    margin-bottom: $space-4;

    color: $color-primary-600;

    font-size: $text-sm;
    font-weight: $font-medium;
  }

  // ========================================
  // TITLE
  // ========================================

  &__title {
    margin: 0 0 $space-4;

    color: $color-gray-900;

    font-size: $text-xl;
    font-weight: $font-semibold;
    line-height: $leading-tight;
  }

  // ========================================
  // EXCERPT
  // ========================================

  &__excerpt {
    margin: 0 0 $space-6;

    color: $color-gray-600;

    line-height: $leading-relaxed;
  }

  // ========================================
  // READ MORE
  // ========================================

  &__readmore {
    margin-top: auto;

    color: $color-primary-600;

    font-weight: $font-semibold;

    transition:
      color $transition-fast;
  }
}

// ==========================================
// RTL
// ==========================================

:global(html[dir='rtl']) {
  .blog-card {
    text-align: right;

    &__meta {
      flex-direction: row;
    }
  }
}

</style>