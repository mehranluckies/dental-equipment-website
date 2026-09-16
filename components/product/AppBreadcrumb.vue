<template>
  <nav class="app-breadcrumb" aria-label="Breadcrumb">
    <NuxtLink v-for="(item, index) in items" :key="index" :to="item.to || '#'" class="app-breadcrumb__item" :class="{
      'app-breadcrumb__item--current':
        index === items.length - 1
    }">
      {{ item.label }}

      <span v-if="index < items.length - 1" class="app-breadcrumb__separator" aria-hidden="true">
        /
      </span>
    </NuxtLink>
  </nav>
</template>


<script setup lang="ts">

interface BreadcrumbItem {
  label: string
  to?: string
}

defineProps<{
  items: BreadcrumbItem[]
}>()

</script>


<style scoped lang="scss">
.app-breadcrumb {
  display: flex;

  align-items: center;


  flex-wrap: wrap;

  gap: $space-2;

  margin-bottom: $space-8;

  font-size: $text-sm;

  color: $color-gray-500;


  &__item {
    display: inline-flex;

    align-items: center;

    gap: $space-2;

    color: $color-primary-600;

    text-decoration: none;

    transition:
      color $transition-base;


    &:hover {
      color: $color-primary-700;
    }


    &--current {
      color: $color-gray-500;

      cursor: default;

      pointer-events: none;
    }
  }


  &__separator {
    color: $color-gray-400;
  }
}


/* =====================================================
     RTL
  ===================================================== */

:global(html[dir='rtl']) {

  .app-breadcrumb {
    flex-direction: row-reverse;
  }

}


/* =====================================================
     MOBILE
  ===================================================== */

@media (max-width: 767px) {

  .app-breadcrumb {
    margin-bottom: $space-6;
    justify-content: center;

    font-size: $text-xs;
  }

}
</style>