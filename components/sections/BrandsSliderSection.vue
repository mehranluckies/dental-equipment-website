```vue
<template>
  <section
    v-if="loading || brands.length"
    class="brands-section"
  >
    <Container>
      <!-- Header -->
      <div class="brands-section__header">
        <div class="brands-section__heading">
          <span class="brands-section__eyebrow">
            {{ t('homeBrands.eyebrow') }}
          </span>

          <h2 class="brands-section__title">
            {{ t('homeBrands.title') }}
          </h2>

          <p class="brands-section__description">
            {{ t('homeBrands.description') }}
          </p>
        </div>
      </div>

      <!-- Loading -->
      <div
        v-if="loading"
        class="brands-section__loading"
      >
        <div
          v-for="index in 5"
          :key="index"
          class="brand-skeleton"
        ></div>
      </div>

      <!-- Infinite Billboard -->
      <div
        v-else-if="brands.length"
        class="brands-section__slider"
      >
        <div
          class="brands-section__track"
          :class="{
            'brands-section__track--rtl':
              locale === 'fa'
          }"
        >
          <!--
            We render MANY copies of the real brands.

            This is intentional.

            Example with 5 brands:

            1 2 3 4 5 | 1 2 3 4 5 | 1 2 3 4 5 | ...

            So there is ALWAYS another brand waiting
            on the right side.

            The screen can therefore never become empty.
          -->

          <div
            v-for="copy in brandCopies"
            :key="`copy-${copy}`"
            class="brands-section__group"
            :aria-hidden="copy !== 0"
          >
            <a
              v-for="brand in brands"
              :key="`${copy}-${brand.id}`"
              :href="
                copy === 0
                  ? brand.website || '#'
                  : '#'
              "
              :target="
                copy === 0 && brand.website
                  ? '_blank'
                  : undefined
              "
              :rel="
                copy === 0 && brand.website
                  ? 'noopener noreferrer'
                  : undefined
              "
              class="brand-card"
              :class="{
                'brand-card--disabled':
                  !brand.website
              }"
              :tabindex="
                copy === 0
                  ? undefined
                  : -1
              "
              @click="
                copy !== 0
                  ? $event.preventDefault()
                  : !brand.website &&
                    $event.preventDefault()
              "
            >
              <div class="brand-card__logo-wrapper">
                <img
                  v-if="brand.logo"
                  :src="brand.logo"
                  :alt="brand.logoAlt"
                  class="brand-card__logo"
                  loading="lazy"
                />

                <span
                  v-else
                  class="brand-card__name"
                >
                  {{ brand.name }}
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

const {
  brands,
  loading,
  fetchBrands
} = useBrands()

await fetchBrands()

const brandCopies = 8

watch(
  locale,
  async () => {
    await fetchBrands()
  }
)
</script>

<style scoped lang="scss">
.brands-section {
  padding: $space-24 0;
  background: #f8f9fb;

  &__header {
    margin-bottom: $space-8;
  }

  &__heading {
    max-width: 720px;
  }

  &__eyebrow {
    display: inline-flex;
    width: fit-content;

    margin-bottom: $space-3;

    padding: 6px 14px;

    border-radius: 999px;

    background: rgba(
      $color-primary-600,
      0.08
    );

    color: $color-primary-600;

    font-size: $text-xs;
    font-weight: $font-semibold;

    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  &__title {
    margin: 0 0 $space-3;

    color: $color-gray-900;

    font-size: clamp(
      2rem,
      3vw,
      3rem
    );

    font-weight: $font-bold;

    line-height: 1.15;
  }

  &__description {
    max-width: 650px;

    margin: 0;

    color: $color-gray-600;

    font-size: $text-base;

    line-height: 1.8;
  }

  /* ========================================
     SLIDER VIEWPORT
  ======================================== */

  &__slider {
    width: 100%;

    overflow: hidden;

    position: relative;
  }

  /* ========================================
     INFINITE TRACK
  ======================================== */

  &__track {
    display: flex;
    gap: 1.5rem;
    align-items: center;

    /*
     * IMPORTANT
     *
     * The track is wider than the viewport.
     * All groups are sitting directly next to
     * each other.
     */
    width: max-content;

    /*
     * Start EXACTLY from zero.
     *
     * Nothing enters from outside at the beginning.
     */
    transform: translate3d(0, 0, 0);

    animation:
      brands-marquee
      35s linear infinite;

    will-change: transform;

    /*
     * Pause only while hovering.
     */
    &:hover {
      animation-play-state: paused;
    }

    /*
     * RTL animation
     */
    &--rtl {
      animation-name:
        brands-marquee-rtl;
    }
  }

  /* ========================================
     BRAND GROUP
  ======================================== */

  &__group {
    display: flex;

    align-items: center;

    /*
     * NEVER allow a group to shrink.
     */
    flex-shrink: 0;

    /*
     * Space BETWEEN brands.
     */
    gap: $space-6;

    /*
     * IMPORTANT:
     *
     * We do NOT add padding at the end.
     *
     * The next group must touch the previous
     * group's spacing naturally.
     */
    padding: 0;
  }

  /* ========================================
     LOADING
  ======================================== */

  &__loading {
    display: flex;

    gap: $space-6;

    overflow: hidden;
  }
}

/* ==========================================
   BRAND CARD
========================================== */

.brand-card {
  width: 180px;

  min-width: 180px;

  height: 150px;

  flex: 0 0 180px;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: $space-6;

  border: 1px solid $color-gray-200;

  border-radius: $radius-xl;

  background: white;

  text-decoration: none;

  box-shadow: $shadow-sm;

  transition:
    transform $transition-base,
    border-color $transition-base,
    box-shadow $transition-base;

  &:hover {
    transform: translateY(-5px);

    border-color:
      rgba(
        $color-primary-600,
        0.25
      );

    box-shadow: $shadow-lg;
  }

  &--disabled {
    cursor: default;

    &:hover {
      transform: none;

      border-color:
        $color-gray-200;

      box-shadow: $shadow-sm;
    }
  }

  &__logo-wrapper {
    width: 100%;

    height: 100%;

    display: flex;

    align-items: center;

    justify-content: center;
  }

  &__logo {
    display: block;

    width: 100%;

    max-width: 140px;

    height: 90px;

    object-fit: contain;

    filter: grayscale(100%);

    opacity: 0.72;

    transition:
      filter $transition-base,
      opacity $transition-base,
      transform $transition-base;
  }

  &:hover &__logo {
    filter: grayscale(0);

    opacity: 1;

    transform: scale(1.04);
  }

  &__name {
    color: $color-gray-700;

    font-size: $text-base;

    font-weight: $font-semibold;

    text-align: center;

    white-space: nowrap;
  }
}

/* ==========================================
   SKELETON
========================================== */

.brand-skeleton {
  width: 180px;

  min-width: 180px;

  height: 150px;

  flex: 0 0 180px;

  border: 1px solid $color-gray-200;

  border-radius: $radius-xl;

  background: $color-gray-100;

  animation:
    brands-skeleton-pulse
    1.5s ease-in-out infinite;
}

/* ==========================================
   RTL
========================================== */

:global(html[dir='rtl']) {
  .brands-section {
    direction: rtl;

    &__header {
      text-align: right;
    }
  }

  .brand-card {
    direction: rtl;
  }
}

/* ==========================================
   TABLET
========================================== */

@media (max-width: 1024px) {
  .brands-section {
    padding: $space-20 0;

    &__group {
      gap: $space-4;
    }
  }

  .brand-card {
    width: 160px;

    min-width: 160px;

    height: 135px;

    flex-basis: 160px;

    padding: $space-4;

    &__logo {
      height: 80px;
    }
  }

  .brand-skeleton {
    width: 160px;

    min-width: 160px;

    height: 135px;

    flex-basis: 160px;
  }
}

/* ==========================================
   MOBILE
========================================== */

@media (max-width: 767px) {
  .brands-section {
    padding: $space-16 0;

    &__header {
      margin-bottom: $space-6;
    }

    &__title {
      font-size: $text-2xl;
    }

    &__description {
      font-size: $text-sm;
    }

    &__group {
      gap: $space-4;
    }

    &__track {
      animation-duration: 28s;
    }
  }

  .brand-card {
    width: 145px;

    min-width: 145px;

    height: 120px;

    flex-basis: 145px;

    padding: $space-4;

    &__logo {
      max-width: 115px;

      height: 70px;
    }

    &__name {
      font-size: $text-sm;
    }
  }

  .brand-skeleton {
    width: 145px;

    min-width: 145px;

    height: 120px;

    flex-basis: 145px;
  }
}

/* ==========================================
   SMALL MOBILE
========================================== */

@media (max-width: 420px) {
  .brand-card {
    width: 135px;

    min-width: 135px;

    height: 110px;

    flex-basis: 135px;

    &__logo {
      max-width: 105px;

      height: 65px;
    }
  }

  .brand-skeleton {
    width: 135px;

    min-width: 135px;

    height: 110px;

    flex-basis: 135px;
  }
}
@keyframes brands-marquee {
  from {
    transform: translate3d(
      0,
      0,
      0
    );
  }

  to {
    transform: translate3d(
      -996px,
      0,
      0
    );
  }
}

/*
 * RTL
 *
 * Same continuous billboard,
 * opposite direction.
 */

@keyframes brands-marquee-rtl {
  from {
    transform: translate3d(
      0,
      0,
      0
    );
  }

  to {
    transform: translate3d(
      996px,
      0,
      0
    );
  }
}

/* ==========================================
   SKELETON ANIMATION
========================================== */

@keyframes brands-skeleton-pulse {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}
</style>