<template>
  <section
    ref="sectionRef"
    class="trust-section"
    :class="{ 'trust-section--rtl': locale === 'fa' }"
  >
    <Container>
      <div class="trust-section__grid">
        <div
          v-for="(stat, index) in stats"
          :key="stat.label"
          class="trust-section__stat"
        >
          <div class="trust-section__number">
            {{ formatNumber(counts[index]) }}{{ stat.suffix }}
          </div>

          <div class="trust-section__label">
            {{ $t(stat.label) }}
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const { locale } = useI18n()

// ==========================================
// Statistics
// ==========================================

const stats = [
  {
    value: 12,
    suffix: '+',
    label: 'trust.years'
  },
  {
    value: 5000,
    suffix: '+',
    label: 'trust.practices'
  },
  {
    value: 500,
    suffix: '+',
    label: 'trust.products'
  },
  {
    value: 45,
    suffix: '+',
    label: 'trust.countries'
  }
]

// ==========================================
// Counter State
// ==========================================

const counts = ref(stats.map(() => 0))

const sectionRef = ref<HTMLElement | null>(null)

let observer: IntersectionObserver | null = null
let started = false

// ==========================================
// Counter Animation
// ==========================================

const animateCounters = () => {
  if (started) return

  started = true

  stats.forEach((stat, index) => {
    const duration = 1800
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      )

      // Ease-out animation
      const eased = 1 - Math.pow(1 - progress, 3)

      counts.value[index] = Math.floor(
        eased * stat.value
      )

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        counts.value[index] = stat.value
      }
    }

    requestAnimationFrame(animate)
  })
}

// ==========================================
// Number Formatting
// ==========================================

const formatNumber = (value: number) => {
  return value.toLocaleString(
    locale.value === 'fa'
      ? 'fa-IR'
      : 'en-US'
  )
}

// ==========================================
// Intersection Observer
// ==========================================

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        animateCounters()
        observer?.disconnect()
      }
    },
    {
      threshold: 0.3
    }
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped lang="scss">

// ==========================================
// Trust Section
// ==========================================

.trust-section {
  padding: $space-24 0;
  background: $color-surface;

  // ========================================
  // Grid
  // ========================================

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $space-8;

    @include respond-to(md) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  // ========================================
  // Stat
  // ========================================

  &__stat {
    text-align: center;
  }

  // ========================================
  // Number
  // ========================================

  &__number {
    font-size: $text-5xl;
    font-weight: $font-bold;
    color: #123B4A;
    line-height: 1;
    margin-bottom: $space-3;

    @include respond-to(md) {
      font-size: $text-6xl;
    }
  }

  // ========================================
  // Label
  // ========================================

  &__label {
    font-size: $text-base;
    color: $color-gray-700;
    font-weight: $font-medium;
  }
}

// ==========================================
// RTL
// ==========================================

.trust-section--rtl {
  direction: rtl;

  .trust-section__stat {
    text-align: center;
  }

  .trust-section__label {
    font-family: 'Vazirmatn', sans-serif;
  }
}

// ==========================================
// LTR
// ==========================================

.trust-section:not(.trust-section--rtl) {
  direction: ltr;

  .trust-section__label {
    font-family: 'Inter', sans-serif;
  }
}

</style>