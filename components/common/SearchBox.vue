<template>
  <div class="search-box">
    <div class="search-box__wrapper">

      <Icon
        name="search"
        size="lg"
        class="search-box__icon"
      />

      <input
        :value="modelValue"
        type="search"
        :placeholder="placeholder"
        class="search-box__input"
        @input="handleInput"
      />

      <button
        v-if="modelValue"
        type="button"
        class="search-box__clear"
        aria-label="Clear search"
        @click="clearSearch"
      >
        <Icon name="x" size="sm" />
      </button>

    </div>
  </div>
</template>

<script setup lang="ts">

interface Props {
  modelValue: string
  placeholder?: string
  delay?: number
}

const props = withDefaults(
  defineProps<Props>(),
  {
    placeholder: 'Search...',
    delay: 500
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

let debounceTimer: ReturnType<typeof setTimeout> | null = null

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value

  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  debounceTimer = setTimeout(() => {
    emit('update:modelValue', value)
  }, props.delay)
}

const clearSearch = () => {

  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  emit('update:modelValue', '')
}

onUnmounted(() => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
})

</script>

<style scoped lang="scss">

.search-box {
  width: 100%;

  &__wrapper {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
  }

  &__icon {
    position: absolute;
    left: $space-4;
    color: $color-gray-400;
    pointer-events: none;
  }

  &__input {
    width: 100%;
    height: 48px;

    padding: 0 $space-12;

    border: 1px solid $color-gray-200;
    border-radius: $radius-xl;

    background: white;
    color: $color-gray-900;

    font-size: $text-base;
    outline: none;

    transition:
      border-color $transition-fast,
      box-shadow $transition-fast;

    &:focus {
      border-color: $color-primary-500;

      box-shadow:
        0 0 0 3px rgba(
          $color-primary-600,
          0.08
        );
    }

    &::placeholder {
      color: $color-gray-400;
    }

    &::-webkit-search-cancel-button {
      display: none;
    }
  }

  &__clear {
    position: absolute;
    right: $space-3;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 32px;
    height: 32px;

    border: 0;
    border-radius: $radius-full;

    background: transparent;
    color: $color-gray-500;

    cursor: pointer;

    &:hover {
      background: $color-gray-100;
      color: $color-gray-800;
    }
  }
}

:global(html[dir='rtl']) {

  .search-box__icon {
    left: auto;
    right: $space-4;
  }

  .search-box__input {
    text-align: right;
  }

  .search-box__clear {
    right: auto;
    left: $space-3;
  }
}

</style>