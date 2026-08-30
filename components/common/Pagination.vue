<template>
  <nav v-if="totalPages > 1" class="pagination" aria-label="Pagination">
    <!-- Previous -->
    <button type="button" class="pagination__button pagination__button--arrow" :disabled="currentPage <= 1"
      aria-label="Previous page" @click="goToPage(currentPage - 1)">
      <span v-if="isRTL">→</span>
      <span v-else>←</span>
    </button>

    <!-- Pages -->
    <template v-for="(page, index) in visiblePages" :key="`${page}-${index}`">
      <!-- Dots -->
      <span v-if="page === 'dots'" class="pagination__dots">
        ...
      </span>

      <!-- Page -->
      <button v-else type="button" class="pagination__button" :class="{
        'pagination__button--active':
          page === currentPage
      }" @click="goToPage(page)">
        {{ formatPageNumber(page) }}
      </button>
    </template>

    <!-- Next -->
    <button type="button" class="pagination__button pagination__button--arrow" :disabled="currentPage >= totalPages"
      aria-label="Next page" @click="goToPage(currentPage + 1)">
      <span v-if="isRTL">←</span>
      <span v-else>→</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
const formatPageNumber = (page: number) => {
  return new Intl.NumberFormat(
    locale.value === 'fa'
      ? 'fa-IR'
      : 'en-US'
  ).format(page)
}
interface Props {
  currentPage: number
  totalPages: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:currentPage': [page: number]
}>()

const { locale } = useI18n()

/*
|--------------------------------------------------------------------------
| RTL
|--------------------------------------------------------------------------
*/

const isRTL = computed(() => {
  return locale.value === 'fa'
})

/*
|--------------------------------------------------------------------------
| VISIBLE PAGES
|--------------------------------------------------------------------------
*/

const visiblePages = computed<(number | 'dots')[]>(() => {
  const total = props.totalPages
  const current = props.currentPage

  // 1 - 6 pages
  if (total <= 6) {
    return Array.from(
      { length: total },
      (_, index) => index + 1
    )
  }

  // Beginning
  if (current <= 3) {
    return [
      1,
      2,
      3,
      4,
      5,
      'dots',
      total
    ]
  }

  // End
  if (current >= total - 2) {
    return [
      1,
      'dots',
      total - 4,
      total - 3,
      total - 2,
      total - 1,
      total
    ]
  }

  // Middle
  return [
    1,
    'dots',
    current - 1,
    current,
    current + 1,
    'dots',
    total
  ]
})

/*
|--------------------------------------------------------------------------
| CHANGE PAGE
|--------------------------------------------------------------------------
*/

const goToPage = (page: number | 'dots') => {
  if (page === 'dots') {
    return
  }

  if (
    page < 1 ||
    page > props.totalPages ||
    page === props.currentPage
  ) {
    return
  }

  emit('update:currentPage', page)
}

</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $space-2;
  margin-top: $space-12;

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;

    min-width: 40px;
    height: 40px;

    padding: 0 $space-3;

    border: 1px solid $color-gray-200;
    border-radius: $radius-base;

    background: white;
    color: $color-gray-700;

    font-size: $text-sm;
    font-weight: $font-medium;

    cursor: pointer;

    transition:
      background-color $transition-fast,
      color $transition-fast,
      border-color $transition-fast,
      transform $transition-fast;

    &:hover:not(:disabled) {
      border-color: $color-primary-600;
      color: $color-primary-600;
      transform: translateY(-1px);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    &--active {
      background: $color-primary-600;
      border-color: $color-primary-600;
      color: white;

      &:hover {
        background: $color-primary-700;
        border-color: $color-primary-700;
        color: white;
      }
    }

    &--arrow {
      font-size: $text-lg;
    }
  }

  &__dots {
    display: flex;
    align-items: center;
    justify-content: center;

    min-width: 40px;
    height: 40px;

    color: $color-gray-500;
    font-size: $text-sm;
  }
}
</style>