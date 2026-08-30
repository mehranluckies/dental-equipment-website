<template>
  <section class="cta-section">
    <Container>
      <div class="cta-section__content">
        <h2 class="cta-section__title">{{ $t('CTASection.title') }}</h2>
        <p class="cta-section__description">
          {{ $t('CTASection.description') }}
        </p>
        <div class="cta-section__actions">
          <Button size="lg" tag="NuxtLink" :to="localePath('/products')">
            {{ $t('CTASection.exploreProducts') }}
          </Button>
          <Button size="lg" variant="outline" tag="NuxtLink" :to="localePath('/support/contact')">
            {{ $t('CTASection.contactUs') }}
          </Button>
        </div>
      </div>
    </Container>
  </section>
</template>
<script setup lang="ts">

const localePath = useLocalePath()

</script>
<style scoped lang="scss">
.cta-section {
  padding: $space-32 0;
  background: linear-gradient(135deg, $color-primary-600, $color-secondary-500);
  color: white;

  &__content {
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: $space-8;
  }

  &__title {
    font-size: $text-4xl;
    font-weight: $font-bold;
    line-height: $leading-tight;

    @include respond-to(md) {
      font-size: $text-5xl;
    }
  }

  &__description {
    font-size: $text-xl;
    line-height: $leading-relaxed;
    opacity: 0.95;
  }

  &__actions {
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
