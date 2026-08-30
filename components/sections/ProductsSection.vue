<template>
  <section class="products-section">
    <Container>
      <div class="products-section__header">
        <h2 class="products-section__title">
          {{ $t('productionSection.title') }}
        </h2>
        <p class="products-section__description">
          {{ $t('productionSection.description') }}
        </p>
      </div>
      <div class="products-section__categories">
        <NuxtLink v-for="category in categories" :key="category.slug" :to="`/products/${category.slug}`"
          class="category-card">
          <component :is="getIcon(category.icon)" :size="32" />
          <h3 class="category-card__name">{{ $t(category.name) }}</h3>
        </NuxtLink>
      </div>
      <div class="products-section__cta">
        <Button size="lg" variant="outline" tag="NuxtLink" to="/products">
          {{ $t('productionSection.viewAll') }}
        </Button>
      </div>
    </Container>
  </section>
</template>

<script setup lang="ts">
import { Scan, ScanLine, Printer, Droplet, Cog, Monitor, Package } from 'lucide-vue-next'
import { categories } from '~/data/categories'

const getIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    Scan, ScanLine, Printer, Droplet, Cog, Monitor, Package
  }
  return icons[iconName] || Scan
}
</script>

<style scoped lang="scss">
.products-section {
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

  &__categories {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $space-4;
    margin-bottom: $space-12;

    @include respond-to(md) {
      grid-template-columns: repeat(4, 1fr);
      gap: $space-6;
    }
  }

  &__cta {
    text-align: center;
  }
}

.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-4;
  padding: $space-8;
  background: white;
  border-radius: $radius-xl;
  box-shadow: $shadow-sm;
  transition: all $transition-base;
  text-align: center;

  svg {
    color: $color-primary-600;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-lg;

    svg {
      transform: scale(1.1);
    }
  }

  &__name {
    font-size: $text-lg;
    font-weight: $font-semibold;
    color: $color-gray-900;
  }
}
</style>
