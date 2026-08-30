<template>
  <div class="mega-menu" @mouseenter="keepOpen" @mouseleave="$emit('close')">
    <Container>
      <div class="mega-menu__inner">
        <div class="mega-menu__categories">
          <h3 class="mega-menu__title">Product Categories</h3>
          <NuxtLink v-for="category in categories" :key="category.slug" :to="localePath(`/products/${category.slug}`)"
            class="mega-menu__category" @click="$emit('close')">
            <component :is="getIcon(category.icon)" :size="20" />
            <div>
              <div class="mega-menu__category-name">{{ category.name }}</div>
              <div class="mega-menu__category-desc">{{ category.description }}</div>
            </div>
          </NuxtLink>
        </div>

        <div class="mega-menu__featured">
          <h3 class="mega-menu__title">Featured Products</h3>
          <div class="mega-menu__products">
            <NuxtLink v-for="product in featuredProducts" :key="product.slug" :to="`/products/${product.slug}`"
              class="mega-menu__product" @click="$emit('close')">
              <div class="mega-menu__product-image">
                <div class="mega-menu__product-placeholder"></div>
              </div>
              <div class="mega-menu__product-name">{{ product.name }}</div>
              <div class="mega-menu__product-tagline">{{ product.tagline }}</div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import { Scan, ScanLine, Printer, Droplet, Cog, Monitor, Package } from 'lucide-vue-next'
import { categories } from '~/data/categories'
import { products } from '~/data/products'

defineEmits(['close'])
const localePath = useLocalePath()
const featuredProducts = computed(() => products.filter(p => p.isFeatured).slice(0, 3))

const keepOpen = () => {
  // Prevents closing when mouse is inside mega menu
}

const getIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    Scan,
    ScanLine,
    Printer,
    Droplet,
    Cog,
    Monitor,
    Package
  }
  return icons[iconName] || Scan
}
</script>

<style scoped lang="scss">
.mega-menu {
  position: absolute;

  top: 100%;
  left: 0;
  right: 0;

  background: white;

  box-shadow: $shadow-xl;

  border-top: 1px solid $color-gray-200;

  max-height: calc(100vh - 80px);

  overflow-y: auto;
  overflow-x: hidden;

  &__inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $space-8;
    padding: $space-6 0;
  }

  &__title {
    font-size: $text-xs;
    font-weight: $font-semibold;
    color: $color-gray-500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: $space-3;
  }

  &__categories {
    display: flex;
    flex-direction: column;
    gap: $space-1;
  }

  &__category {
    display: flex;
    align-items: flex-start;
    gap: $space-2;
    padding: $space-2;
    border-radius: $radius-base;
    transition: background $transition-fast;

    &:hover {
      background: $color-gray-50;
    }
  }

  &__category-name {
    font-weight: $font-semibold;
    color: $color-gray-900;
    margin-bottom: 2px;
  }

  &__category-desc {
    font-size: $text-xs;
    color: $color-gray-600;
  }

  &__products {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $space-3;
  }

  &__product {
    display: flex;
    flex-direction: column;
    gap: $space-2;
    padding: $space-2;
    border-radius: $radius-base;
    transition: background $transition-fast;

    &:hover {
      background: $color-gray-50;
    }
  }

  &__product-image {
    aspect-ratio: 4 / 3;
    border-radius: $radius-base;
    overflow: hidden;
  }

  &__product-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, $color-primary-100, $color-secondary-100);
  }

  &__product-name {
    font-size: $text-sm;
    font-weight: $font-semibold;
    color: $color-gray-900;
  }

  &__product-tagline {
    font-size: $text-xs;
    color: $color-gray-600;
  }
}
</style>
