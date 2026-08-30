<template>
  <div class="blog-page">

    <!-- HERO -->

    <section class="blog-page__hero">
      <Container>
        <span class="blog-page__subtitle">
          {{ $t('blogPage.hero.subtitle') }}
        </span>

        <h1 class="blog-page__title">
          {{ $t('blogPage.hero.title') }}
        </h1>

        <p class="blog-page__description">
          {{ $t('blogPage.hero.description') }}
        </p>
      </Container>
    </section>


    <!-- SEARCH -->

    <section class="blog-page__tools">
      <Container>
        <SearchBox v-model="search" :placeholder="$t('blogPage.search.placeholder')" />
      </Container>
    </section>


    <!-- CATEGORIES -->

    <section class="blog-page__categories">
      <Container>
        <div class="category-list">

          <button type="button" class="category-list__item" :class="{
            'category-list__item--active':
              !selectedCategory
          }" @click="selectCategory(null)">
            {{ $t('blogPage.categories.all') }}
          </button>

          <button v-for="category in categories" :key="category.documentId" type="button" class="category-list__item"
            :class="{
              'category-list__item--active':
                selectedCategory === category.slug
            }" @click="selectCategory(category.slug)">
            {{ category.name }}
          </button>

        </div>
      </Container>
    </section>


    <!-- CONTENT -->

    <section class="blog-page__content">
      <Container>

        <Transition name="fade" mode="out-in">

          <!-- LOADING -->

          <div v-if="pending" key="loading" class="blog-page__loading">
            <p>Loading...</p>
          </div>


          <!-- ARTICLES -->

          <div v-else-if="articles.length" key="articles">

            <!-- FEATURED -->

            <Transition name="featured" mode="out-in">
              <FeaturedArticle v-if="featuredArticle && currentPage === 1" :key="featuredArticle.documentId"
                :article="featuredArticle" />
            </Transition>


            <!-- REGULAR ARTICLES -->

            <TransitionGroup name="article-list" tag="div" class="blog-page__grid">
              <BlogCard v-for="article in regularArticles" :key="article.documentId" :article="article" />
            </TransitionGroup>


            <!-- PAGINATION -->

            <Pagination v-if="totalPages > 1" :current-page="currentPage" :total-pages="totalPages"
              @update:current-page="changePage" />

          </div>


          <!-- EMPTY -->

          <div v-else key="empty" class="blog-page__empty">
            <Icon name="file-text" size="2xl" />

            <h3>
              {{ $t('blogPage.empty.title') }}
            </h3>

            <p>
              {{ $t('blogPage.empty.description') }}
            </p>
          </div>

        </Transition>

      </Container>
    </section>

  </div>
</template>


<script setup lang="ts">

const {
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
} = useBlogArticles()


useSeoMeta({
  title: computed(() => {

    if (selectedCategory.value) {

      const category =
        categories.value.find(
          (item: any) =>
            item.slug ===
            selectedCategory.value
        )

      if (category) {
        return `${category.name} | Blog | DentalTech Pro`
      }

      return `${selectedCategory.value} | Blog | DentalTech Pro`
    }

    return 'Blog | DentalTech Pro'
  }),

  description:
    'Latest articles about digital dentistry and dental technology.'
})

</script>
<style scoped lang="scss">
// ==========================================
// HERO
// ==========================================

.blog-page {

  &__hero {

    padding:
      $space-24 0;

    text-align:
      center;

    background:
      linear-gradient(135deg,
        lighten($color-primary-600,
          45%),
        lighten($color-secondary-500,
          45%));
  }


  &__subtitle {

    display:
      inline-block;

    padding:
      $space-2 $space-4;

    margin-bottom:
      $space-4;

    border-radius:
      $radius-full;

    background:
      rgba($color-primary-600,
        0.08);

    color:
      $color-primary-700;

    font-weight:
      $font-semibold;
  }


  &__title {

    margin-bottom:
      $space-4;

    color:
      $color-gray-900;

    font-size:
      $text-5xl;

    font-weight:
      $font-bold;
  }


  &__description {

    max-width:
      720px;

    margin:
      0 auto;

    color:
      $color-gray-700;

    font-size:
      $text-lg;

    line-height:
      $leading-relaxed;
  }
}


// ==========================================
// TOOLS
// ==========================================

.blog-page__tools {

  padding:
    $space-8 0 0;

  background:
    white;
}


.blog-page__tools :deep(.search-box) {

  max-width:
    600px;

  margin:
    0 auto;
}


// ==========================================
// CATEGORIES
// ==========================================

.blog-page__categories {

  padding:
    $space-8 0;

  background:
    white;

  border-bottom:
    1px solid $color-gray-200;
}


.category-list {

  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  flex-wrap:
    wrap;

  gap:
    $space-3;
}


.category-list__item {

  border:
    1px solid $color-gray-300;

  background:
    white;

  color:
    $color-gray-700;

  padding:
    $space-2 $space-4;

  border-radius:
    $radius-full;

  font-size:
    $text-sm;

  font-weight:
    $font-medium;

  cursor:
    pointer;

  transition:
    background-color $transition-fast,
    color $transition-fast,
    border-color $transition-fast,
    transform $transition-fast;


  &:hover {

    border-color:
      $color-primary-600;

    color:
      $color-primary-600;

    transform:
      translateY(-1px);
  }


  &--active {

    background:
      $color-primary-600;

    border-color:
      $color-primary-600;

    color:
      white;


    &:hover {

      background:
        $color-primary-700;

      border-color:
        $color-primary-700;

      color:
        white;
    }
  }
}


// ==========================================
// CONTENT
// ==========================================

.blog-page__content {

  padding:
    $space-20 0 $space-24;
}


.blog-page__grid {

  display:
    grid;

  grid-template-columns:
    1fr;

  gap:
    $space-8;


  @include respond-to(md) {

    grid-template-columns:
      repeat(2,
        1fr);
  }


  @include respond-to(lg) {

    grid-template-columns:
      repeat(3,
        1fr);
  }
}


// ==========================================
// LOADING
// ==========================================

.blog-page__loading {

  min-height:
    300px;

  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  color:
    $color-gray-500;
}


// ==========================================
// EMPTY
// ==========================================

.blog-page__empty {

  text-align:
    center;

  padding:
    $space-20;

  color:
    $color-gray-500;


  svg {

    margin-bottom:
      $space-4;

    color:
      $color-primary-500;
  }


  h3 {

    margin-bottom:
      $space-3;

    color:
      $color-gray-800;

    font-size:
      $text-xl;

    font-weight:
      $font-semibold;
  }


  p {

    color:
      $color-gray-500;
  }
}


// ==========================================
// ARTICLE LIST ANIMATION
// ==========================================

.article-list-enter-active,
.article-list-leave-active {

  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}


.article-list-enter-from {

  opacity:
    0;

  transform:
    translateY(12px);
}


.article-list-leave-to {

  opacity:
    0;

  transform:
    translateY(-8px);
}


.article-list-move {

  transition:
    transform 0.3s ease;
}


// ==========================================
// FEATURED ANIMATION
// ==========================================

.featured-enter-active,
.featured-leave-active {

  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}


.featured-enter-from {

  opacity:
    0;

  transform:
    translateY(12px);
}


.featured-leave-to {

  opacity:
    0;

  transform:
    translateY(-8px);
}


// ==========================================
// FADE
// ==========================================

.fade-enter-active,
.fade-leave-active {

  transition:
    opacity 0.2s ease;
}


.fade-enter-from,
.fade-leave-to {

  opacity:
    0;
}
</style>