<template>
  <section class="workflow-section">
    <Container>
      <div class="workflow-section__header">
        <h2 class="workflow-section__title">
          {{ $t('workflowSection.title') }}
        </h2>

        <p class="workflow-section__description">
          {{ $t('workflowSection.description') }}
        </p>
      </div>

      <div class="workflow-section__steps">
        <div
          v-for="(step, index) in steps"
          :key="step.key"
          class="workflow-step"
        >
          <div class="workflow-step__number">
            {{ index + 1 }}
          </div>

          <component
            :is="step.icon"
            :size="48"
            class="workflow-step__icon"
          />

          <h3 class="workflow-step__title">
            {{ $t(`workflowSection.steps.${step.key}.title`) }}
          </h3>

          <p class="workflow-step__description">
            {{ $t(`workflowSection.steps.${step.key}.description`) }}
          </p>
        </div>
      </div>
    </Container>
  </section>
</template>

<script setup lang="ts">
import {
  Scan,
  Monitor,
  Printer,
  Package
} from 'lucide-vue-next'

const steps = [
  {
    key: 'scan',
    icon: Scan
  },
  {
    key: 'design',
    icon: Monitor
  },
  {
    key: 'produce',
    icon: Printer
  },
  {
    key: 'deliver',
    icon: Package
  }
]
</script>

<style scoped lang="scss">
.workflow-section {
  padding: $space-32 0;

  &__header {
    text-align: center;
    max-width: 700px;
    margin: 0 auto $space-20;
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

  &__steps {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-8;

    @include respond-to(md) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

.workflow-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: $space-4;
  padding: $space-8;
  background: white;
  border-radius: $radius-xl;
  box-shadow: $shadow-base;
  position: relative;

  &__number {
    position: absolute;
    top: $space-4;
    right: $space-4;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $color-primary-100;
    color: $color-primary-700;
    font-weight: $font-bold;
    border-radius: $radius-full;
    font-size: $text-sm;
  }

  &__icon {
    color: $color-primary-600;
  }

  &__title {
    font-size: $text-2xl;
    font-weight: $font-semibold;
    color: $color-gray-900;
  }

  &__description {
    color: $color-gray-600;
    line-height: $leading-relaxed;
  }
}
</style>
