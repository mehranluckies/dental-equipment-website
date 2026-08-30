<template>
  <section class="testimonials-section">
    <Container>
      <div class="testimonials-section__header">
        <h2 class="testimonials-section__title">Trusted by Professionals</h2>
        <p class="testimonials-section__description">
          What dental professionals say about our solutions
        </p>
      </div>
      <div class="testimonials-section__grid">
        <div
          v-for="testimonial in featuredTestimonials"
          :key="testimonial.id"
          class="testimonial-card"
        >
          <div class="testimonial-card__quote">
            <component :is="QuoteIcon" :size="32" class="testimonial-card__icon" />
            <p>{{ testimonial.quote }}</p>
          </div>
          <div class="testimonial-card__author">
            <div class="testimonial-card__avatar"></div>
            <div>
              <div class="testimonial-card__name">{{ testimonial.doctorName }}</div>
              <div class="testimonial-card__title">{{ testimonial.doctorTitle }}</div>
              <div class="testimonial-card__clinic">{{ testimonial.clinicName }}</div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>

<script setup lang="ts">
import { Quote as QuoteIcon } from 'lucide-vue-next'
import { testimonials } from '~/data/testimonials'

const featuredTestimonials = computed(() => testimonials.filter(t => t.featured).slice(0, 3))
</script>

<style scoped lang="scss">
.testimonials-section {
  padding: $space-32 0;
  background: $color-surface;

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

    @include respond-to(md) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

.testimonial-card {
  display: flex;
  flex-direction: column;
  gap: $space-6;
  padding: $space-8;
  background: white;
  border-radius: $radius-xl;
  box-shadow: $shadow-base;

  &__quote {
    position: relative;
    flex: 1;

    p {
      font-size: $text-base;
      line-height: $leading-relaxed;
      color: $color-gray-700;
    }
  }

  &__icon {
    position: absolute;
    top: -$space-2;
    left: -$space-2;
    color: $color-primary-200;
    opacity: 0.5;
  }

  &__author {
    display: flex;
    gap: $space-4;
    align-items: center;
  }

  &__avatar {
    width: 48px;
    height: 48px;
    border-radius: $radius-full;
    background: linear-gradient(135deg, $color-primary-400, $color-secondary-400);
    flex-shrink: 0;
  }

  &__name {
    font-weight: $font-semibold;
    color: $color-gray-900;
  }

  &__title,
  &__clinic {
    font-size: $text-sm;
    color: $color-gray-600;
  }
}
</style>
