<template>
  <section class="about-page__mission">
    <div class="mission-grid">

      <div class="mission-card">
        <component
          :is="TargetIcon"
          :size="40"
          class="mission-card__icon"
        />

        <h3>{{ $t('aboutPage.mission.mission.title') }}</h3>

        <p>
          {{ $t('aboutPage.mission.mission.description') }}
        </p>
      </div>

      <div class="mission-card">
        <component
          :is="EyeIcon"
          :size="40"
          class="mission-card__icon"
        />

        <h3>{{ $t('aboutPage.mission.vision.title') }}</h3>

        <p>
          {{ $t('aboutPage.mission.vision.description') }}
        </p>
      </div>

      <div class="mission-card">
        <component
          :is="HeartIcon"
          :size="40"
          class="mission-card__icon"
        />

        <h3>{{ $t('aboutPage.mission.values.title') }}</h3>

        <p>
          {{ $t('aboutPage.mission.values.description') }}
        </p>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import {
  Target as TargetIcon,
  Eye as EyeIcon,
  Heart as HeartIcon
} from 'lucide-vue-next'
</script>

<style scoped lang="scss">
.about-page__mission {
  padding: $space-24 0;
}

.mission-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $space-8;

  @include respond-to(md) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.mission-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: $space-4;
  padding: $space-8;
  background: white;
  border-radius: $radius-xl;
  box-shadow: $shadow-base;

  &__icon {
    color: $color-primary-600;
  }

  h3 {
    font-size: $text-2xl;
    font-weight: $font-semibold;
    color: $color-gray-900;
  }

  p {
    color: $color-gray-600;
    line-height: $leading-relaxed;
  }
}
</style>
