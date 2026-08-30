```vue
<template>
  <div class="about-page">

    <!-- Hero -->
    <section class="about-page__hero">
      <Container>
        <h1 class="about-page__title">
          {{ $t('aboutPage.hero.title') }}
        </h1>

        <p class="about-page__description">
          {{ $t('aboutPage.hero.description') }}
        </p>
      </Container>
    </section>

    <Container>

      <!-- Our Story -->
      <section class="about-page__story">
        <h2>{{ $t('aboutPage.story.title') }}</h2>

        <p>
          {{ $t('aboutPage.story.paragraph1') }}
        </p>

        <p>
          {{ $t('aboutPage.story.paragraph2') }}
        </p>
      </section>

      <!-- Mission / Vision / Values -->
      <RevealSection direction="up">
        <MissionSection />
      </RevealSection>

      <!-- Trust / Statistics -->
      <RevealSection direction="up">
        <TrustSection />
      </RevealSection>

      <!-- Why Choose Us -->
      <RevealSection direction="right">
        <WhyChooseSection />
      </RevealSection>

    </Container>

    <RevealSection direction="up">
      <CTASection />
    </RevealSection>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('aboutPage.seo.title'),
  description: () => t('aboutPage.seo.description')
})
</script>

<style scoped lang="scss">
.about-page {

  // =========================
  // Hero
  // =========================

  &__hero {
    padding: $space-24 0;
    background: linear-gradient(
      135deg,
      lighten($color-primary-600, 45%),
      lighten($color-secondary-500, 45%)
    );
    text-align: center;
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
    color: $color-gray-700;
  }

  // =========================
  // General Sections
  // =========================

  section {
    padding: $space-20 0;

    h2 {
      font-size: $text-3xl;
      font-weight: $font-bold;
      color: $color-gray-900;
      margin-bottom: $space-8;
      text-align: center;
    }

    p {
      font-size: $text-lg;
      line-height: $leading-relaxed;
      color: $color-gray-700;
      margin-bottom: $space-6;
    }
  }

  // =========================
  // Story
  // =========================

  &__story {
    max-width: 800px;
    margin: 0 auto;
  }

  :deep(.trust-section) {
    background: transparent;
  }

  // =========================
  // CTA
  // =========================

  &__cta {
    text-align: center;
  }
}

// =====================================================
// Mission Cards
// =====================================================

.mission-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $space-8;

  @include respond-to(md) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.mission-card {
  background: white;
  padding: $space-8;
  border-radius: $radius-xl;
  text-align: center;
  box-shadow: $shadow-base;

  svg {
    color: $color-primary-600;
    margin: 0 auto $space-6;
  }

  h3 {
    font-size: $text-xl;
    font-weight: $font-semibold;
    color: $color-gray-900;
    margin-bottom: $space-4;
  }

  p {
    font-size: $text-base;
    line-height: $leading-relaxed;
    color: $color-gray-600;
    margin: 0;
  }
}

// =====================================================
// Stats
// =====================================================

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $space-8;

  @include respond-to(md) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stat {
  text-align: center;

  &__number {
    font-size: $text-5xl;
    font-weight: $font-bold;
    color: $color-primary-600;
    line-height: 1;
    margin-bottom: $space-3;

    @include respond-to(md) {
      font-size: $text-6xl;
    }
  }

  &__label {
    font-size: $text-base;
    color: $color-gray-700;
    font-weight: $font-medium;
  }
}

// =====================================================
// Why Choose
// =====================================================

.why-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $space-8;
  max-width: 1000px;
  margin: 0 auto;

  @include respond-to(md) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.why-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: $space-4;

  svg {
    color: $color-primary-600;
  }

  h3 {
    font-size: $text-xl;
    font-weight: $font-semibold;
    color: $color-gray-900;
  }

  p {
    color: $color-gray-600;
    line-height: $leading-relaxed;
    margin: 0;
  }
}

// =====================================================
// CTA
// =====================================================

.cta-box {
  background: linear-gradient(
    135deg,
    $color-primary-600,
    $color-secondary-500
  );

  color: white;
  padding: $space-16;
  border-radius: $radius-2xl;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;

  h2 {
    color: white;
    margin-bottom: $space-4;
  }

  p {
    font-size: $text-xl;
    margin-bottom: $space-8;
    opacity: 0.95;
  }

  .cta-actions {
    display: flex;
    flex-wrap: wrap;
    gap: $space-4;
    justify-content: center;

    :deep(.btn--outline) {
      background: white;
      color: $color-primary-600;
      border-color: white;

      &:hover {
        background: transparent;
        color: white;
        border-color: white;
      }
    }
  }
}
</style>