<template>
  <section class="case-studies-section">
    <Container>
      <div class="case-studies-section__header">
        <h2 class="case-studies-section__title">Real Clinical Success</h2>
        <p class="case-studies-section__description">
          See how dental professionals achieve exceptional results with our technology
        </p>
      </div>
      <div class="case-studies-section__grid">
        <NuxtLink
          v-for="caseStudy in latestCaseStudies"
          :key="caseStudy.id"
          :to="`/case-studies/${caseStudy.slug}`"
          class="case-study-card"
        >
          <div class="case-study-card__image">
            <div class="case-study-card__placeholder"></div>
            <div class="case-study-card__category">{{ caseStudy.category }}</div>
          </div>
          <div class="case-study-card__content">
            <h3 class="case-study-card__title">{{ caseStudy.title }}</h3>
            <div class="case-study-card__meta">
              <span>{{ caseStudy.doctorName }}</span>
              <span>•</span>
              <span>{{ caseStudy.country }}</span>
            </div>
          </div>
        </NuxtLink>
      </div>
      <div class="case-studies-section__cta">
        <Button size="lg" variant="outline" tag="NuxtLink" to="/case-studies">
          View All Case Studies
        </Button>
      </div>
    </Container>
  </section>
</template>

<script setup lang="ts">
import { caseStudies } from '~/data/caseStudies'

const latestCaseStudies = computed(() => caseStudies.slice(0, 3))
</script>

<style scoped lang="scss">
.case-studies-section {
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
}

.case-study-card {
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

    .case-study-card__placeholder {
      transform: scale(1.05);
    }
  }

  &__image {
    position: relative;
    aspect-ratio: 16 / 10;
    overflow: hidden;
  }

  &__placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, lighten($color-secondary-500, 25%), lighten($color-primary-600, 25%));
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
}
</style>
