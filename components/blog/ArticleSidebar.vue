<template>
    <aside class="article-sidebar">
      <!-- Back -->
      <NuxtLink
        :to="localePath('/blog')"
        class="article-sidebar__back"
      >
        <div class="article-sidebar__back-icon">
          <Icon :name="isRTL ? 'arrow-right' : 'arrow-left'" size="md" />
        </div>
  
        <div>
          <p class="article-sidebar__back-label">
            {{ $t('blogPage.article.backToBlog') }}
          </p>
  
          <span class="article-sidebar__back-text">
            {{ $t('blogPage.article.allArticles') }}
          </span>
        </div>
      </NuxtLink>
  
      <!-- Article Info -->
      <div class="article-sidebar__card">
        <h3 class="article-sidebar__title">
          {{ $t('blogPage.article.articleInfo') }}
        </h3>
  
        <div class="article-sidebar__info">
          <div
            v-if="article.readingTime"
            class="article-sidebar__info-item"
          >
            <Icon name="clock" size="sm" />
            <span>{{ article.readingTime }} {{ $t('blogPage.article.minutes') }}</span>
          </div>
  
          <div
            v-if="article.publishedAt"
            class="article-sidebar__info-item"
          >
            <Icon name="calendar" size="sm" />
            <span>{{ formatDate(article.publishedAt) }}</span>
          </div>
  
          <div
            v-if="article.category"
            class="article-sidebar__info-item"
          >
            <Icon name="folder" size="sm" />
            <span>{{ article.category.name }}</span>
          </div>
        </div>
      </div>
  
      <!-- Tags -->
      <div
        v-if="article.tags?.length"
        class="article-sidebar__card"
      >
        <h3 class="article-sidebar__title">
          {{ $t('blogPage.article.tags') }}
        </h3>
  
        <div class="article-sidebar__tags">
          <span
            v-for="tag in article.tags"
            :key="tag.documentId"
            class="article-sidebar__tag"
          >
            #{{ tag.name }}
          </span>
        </div>
      </div>
  
      <!-- CTA -->
      <div class="article-sidebar__cta">
        <span class="article-sidebar__cta-badge">
          DentalTech Pro
        </span>
  
        <h4>
          {{ $t('blogPage.article.ctaTitle') }}
        </h4>
  
        <p>
          {{ $t('blogPage.article.ctaDescription') }}
        </p>
  
        <NuxtLink
          :to="localePath('/products')"
          class="article-sidebar__cta-button"
        >
          {{ $t('blogPage.article.viewProducts') }}
        </NuxtLink>
      </div>
    </aside>
  </template>
  
  <script setup lang="ts">
  interface Props {
    article: any
  }
  
  defineProps<Props>()
  
  const { locale } = useI18n()
  const localePath = useLocalePath()
  
  const isRTL = computed(() => locale.value === 'fa')
  
  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat(
      locale.value === 'fa' ? 'fa-IR' : 'en-US',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
    ).format(new Date(date))
  }
  </script>
  
  <style scoped lang="scss">
  .article-sidebar {
    display: flex;
    flex-direction: column;
    gap: $space-4;
  
    @include respond-to(lg) {
      position: sticky;
      top: 2rem;
    }
  
    &__card {
      padding: $space-6;
      background: white;
      border: 1px solid $color-gray-200;
      border-radius: $radius-xl;
      box-shadow: $shadow-sm;
    }
  
    &__title {
      margin-bottom: $space-4;
      font-size: $text-lg;
      font-weight: $font-semibold;
      color: $color-gray-900;
    }
  
    &__info {
      display: flex;
      flex-direction: column;
      gap: $space-4;
    }
  
    &__info-item {
      display: flex;
      align-items: center;
      gap: $space-3;
      color: $color-gray-700;
      font-size: $text-sm;
  
      svg {
        color: $color-primary-600;
        flex-shrink: 0;
      }
    }
  
    &__tags {
      display: flex;
      flex-wrap: wrap;
      gap: $space-2;
    }
  
    &__tag {
      padding: $space-1 $space-3;
      border-radius: $radius-full;
      background: rgba($color-primary-600, .08);
      color: $color-primary-700;
      font-size: $text-xs;
      font-weight: $font-medium;
    }
  
    &__back {
      display: flex;
      align-items: center;
      gap: $space-4;
      padding: $space-4;
      border-radius: $radius-xl;
      border: 1px solid $color-gray-200;
      background: white;
      box-shadow: $shadow-sm;
      text-decoration: none;
      transition: .25s ease;
  
      &:hover {
        border-color: $color-primary-300;
        box-shadow: $shadow-base;
        transform: translateY(-2px);
      }
    }
  
    &__back-icon {
      width: 42px;
      height: 42px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: rgba($color-primary-600,.08);
      color: $color-primary-600;
      flex-shrink: 0;
    }
  
    &__back-label {
      font-weight: $font-semibold;
      color: $color-gray-900;
      margin-bottom: 2px;
    }
  
    &__back-text {
      font-size: $text-xs;
      color: $color-gray-500;
    }
  
    &__cta {
      padding: $space-6;
      border-radius: $radius-xl;
      background: linear-gradient(
        160deg,
        $color-primary-700,
        darken($color-primary-700, 8%)
      );
      color: white;
  
      h4 {
        margin: $space-3 0;
        font-size: $text-xl;
        font-weight: $font-bold;
        line-height: 1.3;
      }
  
      p {
        margin-bottom: $space-4;
        color: rgba(255,255,255,.85);
        line-height: 1.7;
        font-size: $text-sm;
      }
    }
  
    &__cta-badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 999px;
      background: rgba(255,255,255,.14);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .05em;
      text-transform: uppercase;
    }
  
    &__cta-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: $space-3;
      border-radius: $radius-lg;
      background: white;
      color: $color-primary-700;
      font-weight: $font-semibold;
      text-decoration: none;
      transition: .2s ease;
  
      &:hover {
        background: $color-gray-100;
      }
    }
  }
  </style>