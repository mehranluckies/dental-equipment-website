<template>
  <section class="why-choose">
    <Container>
      <div class="why-choose__header">
        <h2 class="why-choose__title">{{ $t('whyChooseSection.title') }}</h2>
        <p class="why-choose__description">
          {{ $t("whyChooseSection.description") }}
        </p>
      </div>
      <div class="why-choose__grid">
  <div
    v-for="benefit in benefits"
    :key="benefit.title"
    class="benefit-card"
  >
    <component
      :is="benefit.icon"
      :size="40"
      class="benefit-card__icon"
    />

    <h3 class="benefit-card__title">
      {{ $t(`whyChooseSection.benefits.${benefit.title}`) }}
    </h3>

    <p class="benefit-card__description">
      {{ $t(`whyChooseSection.benefits.${benefit.description}`) }}
    </p>
  </div>
</div>
    </Container>
  </section>
</template>

<script setup lang="ts">
import {
  Shield,
  Headphones,
  Award,
  Zap,
  Users,
  TrendingUp
} from 'lucide-vue-next'

const benefits = [
  {
    icon: Shield,
    title: 'authenticProducts',
    description: 'authenticProductsDescription'
  },
  {
    icon: Headphones,
    title: 'expertSupport',
    description: 'expertSupportDescription'
  },
  {
    icon: Award,
    title: 'provenQuality',
    description: 'provenQualityDescription'
  },
  {
    icon: Zap,
    title: 'fastDelivery',
    description: 'fastDeliveryDescription'
  },
  {
    icon: Users,
    title: 'comprehensiveTraining',
    description: 'comprehensiveTrainingDescription'
  },
  {
    icon: TrendingUp,
    title: 'practiceGrowth',
    description: 'practiceGrowthDescription'
  }
]
</script>

<style scoped lang="scss">
.why-choose {
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

    @include respond-to(md) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include respond-to(lg) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

.benefit-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: $space-4;
  padding: $space-8;
  background: white;
  border-radius: $radius-xl;
  box-shadow: $shadow-sm;

  &__icon {
    color: $color-primary-600;
  }

  &__title {
    font-size: $text-xl;
    font-weight: $font-semibold;
    color: $color-gray-900;
  }

  &__description {
    color: $color-gray-600;
    line-height: $leading-relaxed;
  }
}
</style>
