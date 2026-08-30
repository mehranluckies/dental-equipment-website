<template>
  <div class="solutions-page">
    <section class="solutions-page__hero">
      <Container>
        <h1 class="solutions-page__title">Complete Digital Solutions</h1>
        <p class="solutions-page__description">
          Integrated workflows for every aspect of modern dental practice
        </p>
      </Container>
    </section>

    <section class="solutions-page__content">
      <Container>
        <div class="solutions-page__grid">
          <NuxtLink
            v-for="solution in solutions"
            :key="solution.slug"
            :to="`/solutions/${solution.slug}`"
            class="solution-card"
          >
            <div class="solution-card__visual"></div>
            <div class="solution-card__content">
              <h2 class="solution-card__name">{{ solution.name }}</h2>
              <p class="solution-card__tagline">{{ solution.tagline }}</p>
              <p class="solution-card__description">{{ solution.description }}</p>
            </div>
          </NuxtLink>
        </div>
      </Container>
    </section>
  </div>
</template>

<script setup lang="ts">
import { solutions } from '~/data/solutions'

useSeoMeta({
  title: 'Digital Dentistry Solutions | DentalTech Pro',
  description: 'Comprehensive digital workflow solutions for modern dental practices including implantology, orthodontics, prosthetics, and same-day dentistry.',
})
</script>

<style scoped lang="scss">
.solutions-page {
  &__hero {
    padding: $space-24 0;
    background: linear-gradient(135deg, lighten($color-primary-600, 45%), lighten($color-secondary-500, 45%));
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
    max-width: 700px;
    margin: 0 auto;
  }

  &__content {
    padding: $space-20 0;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-8;

    @include respond-to(md) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

.solution-card {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: $radius-xl;
  overflow: hidden;
  box-shadow: $shadow-base;
  transition: all $transition-base;

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-xl;

    .solution-card__visual {
      transform: scale(1.05);
    }
  }

  &__visual {
    aspect-ratio: 16 / 9;
    background: linear-gradient(135deg, lighten($color-primary-600, 30%), lighten($color-secondary-500, 30%));
    transition: transform $transition-slow;
  }

  &__content {
    padding: $space-8;
    display: flex;
    flex-direction: column;
    gap: $space-4;
  }

  &__name {
    font-size: $text-2xl;
    font-weight: $font-semibold;
    color: $color-gray-900;
  }

  &__tagline {
    font-size: $text-lg;
    color: $color-primary-600;
    font-weight: $font-medium;
  }

  &__description {
    color: $color-gray-600;
    line-height: $leading-relaxed;
  }
}
</style>
