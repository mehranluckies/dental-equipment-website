<template>
  <section
    class="solutions-section"
    :class="{ 'solutions-section--rtl': locale === 'fa' }"
  >
    <Container>

      <!-- Header -->
      <div class="solutions-section__header">

        <h2 class="solutions-section__title">
          {{ $t('solutionsSection.title') }}
        </h2>

        <p class="solutions-section__description">
          {{ $t('solutionsSection.description') }}
        </p>

      </div>

      <!-- Solutions Grid -->
      <div class="solutions-section__grid">

        <NuxtLink
          v-for="solution in solutions"
          :key="solution.slug"
          :to="localePath(`/solutions/${solution.slug}`)"
          class="solution-card"
        >

          <div class="solution-card__visual"></div>

          <div class="solution-card__content">

            <h3 class="solution-card__name">
              {{ $t(solution.name) }}
            </h3>

            <p class="solution-card__tagline">
              {{ $t(solution.tagline) }}
            </p>

          </div>

        </NuxtLink>

      </div>

    </Container>
  </section>
</template>

<script setup lang="ts">
import { solutions } from '~/data/solutions'

const localePath = useLocalePath()

const { locale } = useI18n()
</script>

<style scoped lang="scss">

// ==========================================
// Solutions Section
// ==========================================

.solutions-section {
  padding: $space-32 0;

  // ========================================
  // Header
  // ========================================

  &__header {
    text-align: center;
    max-width: 700px;
    margin: 0 auto $space-16;
  }

  // ========================================
  // Title
  // ========================================

  &__title {
    font-size: $text-4xl;
    font-weight: $font-bold;
    color: $color-gray-900;
    margin-bottom: $space-4;
    line-height: $leading-tight;

    @include respond-to(md) {
      font-size: $text-5xl;
    }
  }

  // ========================================
  // Description
  // ========================================

  &__description {
    font-size: $text-xl;
    color: $color-gray-600;
    line-height: $leading-relaxed;
  }

  // ========================================
  // Grid
  // ========================================

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-6;

    @include respond-to(md) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include respond-to(lg) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

// ==========================================
// Solution Card
// ==========================================

.solution-card {
  display: flex;
  flex-direction: column;

  background: white;
  border-radius: $radius-xl;
  overflow: hidden;

  box-shadow: $shadow-base;

  text-decoration: none;

  transition:
    transform $transition-base,
    box-shadow $transition-base;

  // ========================================
  // Hover
  // ========================================

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-xl;

    .solution-card__visual {
      transform: scale(1.05);
    }

    .solution-card__name {
      color: #123B4A;
    }
  }

  // ========================================
  // Visual
  // ========================================

  &__visual {
    aspect-ratio: 16 / 9;

    background: linear-gradient(
      135deg,
      rgba(18, 59, 74, 0.85),
      rgba(108, 235, 238, 0.85)
    );

    transition: transform $transition-slow;
  }

  // ========================================
  // Content
  // ========================================

  &__content {
    padding: $space-8;
  }

  // ========================================
  // Name
  // ========================================

  &__name {
    font-size: $text-2xl;
    font-weight: $font-semibold;
    color: $color-gray-900;

    margin-bottom: $space-3;

    line-height: $leading-tight;

    transition: color $transition-fast;
  }

  // ========================================
  // Tagline
  // ========================================

  &__tagline {
    font-size: $text-base;
    color: $color-gray-600;

    line-height: $leading-relaxed;
  }
}

// ==========================================
// RTL
// ==========================================

.solutions-section--rtl {
  direction: rtl;

  .solutions-section__header {
    text-align: center;
  }

  .solution-card {
    direction: rtl;
  }

  .solution-card__content {
    text-align: right;
  }

  .solution-card__name,
  .solution-card__tagline {
    font-family: 'Vazirmatn', sans-serif;
  }
}

// ==========================================
// LTR
// ==========================================

.solutions-section:not(.solutions-section--rtl) {
  direction: ltr;

  .solution-card__name,
  .solution-card__tagline {
    font-family: 'Inter', sans-serif;
  }
}

</style>