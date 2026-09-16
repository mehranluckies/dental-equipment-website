<template>
  <section class="hero">
    <Container>

      <div class="hero__wrapper">

        <!-- Loading -->
        <div
          v-if="loading"
          class="hero__loading"
        >
          Loading...
        </div>

        <!-- Error -->
        <div
          v-else-if="error"
          class="hero__error"
        >
          Failed to load slider
        </div>

        <!-- Slider -->
        <template v-else-if="slides.length">

          <Transition
            name="hero-slide"
            mode="out-in"
          >
            <div
              :key="currentSlide.id"
              class="hero__slide"
              @touchstart="handleTouchStart"
              @touchend="handleTouchEnd"
            >

              <!-- Left Content -->
              <div class="hero__content">

                <span
                  v-if="currentSlide.badge"
                  class="hero__badge"
                >
                  {{ currentSlide.badge }}
                </span>

                <h1 class="hero__title">
                  {{ currentSlide.title }}
                </h1>

                <p
                  v-if="currentSlide.description"
                  class="hero__description"
                >
                  {{ currentSlide.description }}
                </p>

                <div class="hero__actions">

                  <!-- Category Button -->
                  <Button
                    v-if="currentSlide.category"
                    size="lg"
                    tag="NuxtLink"
                    :to="
                      localePath(
                        `/products/${currentSlide.category.slug}`
                      )
                    "
                  >
                    {{ currentSlide.buttonText }}
                  </Button>

                  <!-- Request Quote -->
                  <Button
                    size="lg"
                    variant="outline"
                    tag="NuxtLink"
                    :to="localePath('/request-quote')"
                  >
                    {{ $t("hero.requestQuote") }}
                  </Button>

                </div>
              </div>

              <!-- Right Visual -->
              <div class="hero__visual">

                <img
                  :src="currentSlide.image"
                  :alt="currentSlide.title"
                  class="hero__image"
                />

              </div>

            </div>
          </Transition>

          <!-- Slider Dots -->
          <div class="hero__dots">

            <button
              v-for="(slide, index) in slides"
              :key="slide.id"
              class="hero__dot"
              :class="{
                'hero__dot--active':
                  current === index
              }"
              :aria-label="`Go to slide ${index + 1}`"
              @click="goTo(index)"
            />

          </div>

        </template>

        <!-- Empty -->
        <div
          v-else
          class="hero__empty"
        >
          No slides available
        </div>

      </div>

    </Container>
  </section>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  watch
} from "vue"

const localePath = useLocalePath()
const { locale } = useI18n()
const config = useRuntimeConfig()

/* =====================================================
   STRAPI TYPES
===================================================== */

interface StrapiMedia {
  id: number
  documentId?: string
  name?: string
  url: string
  alternativeText?: string | null
}

interface StrapiCategory {
  id: number
  documentId: string
  name: string
  slug: string
}

interface StrapiHeroSlide {
  id: number
  documentId: string

  badge?: string | null
  title: string
  description?: string | null

  image?: StrapiMedia | null

  buttonText?: string | null

  category?: StrapiCategory | null

  order?: number | null

  publishedAt?: string | null
}

interface StrapiHeroResponse {
  data: StrapiHeroSlide[]
  meta?: any
}

/* =====================================================
   SLIDE TYPE
===================================================== */

interface HeroSlide {
  id: string
  badge: string
  title: string
  description: string
  image: string
  buttonText: string
  category: StrapiCategory | null
}

/* =====================================================
   STATE
===================================================== */

const slides = ref<HeroSlide[]>([])

const loading = ref(false)

const error = ref<Error | null>(null)

const current = ref(0)

/* =====================================================
   MEDIA URL
===================================================== */

const getMediaUrl = (
  media?: StrapiMedia | null
): string => {

  if (!media?.url) {
    return ""
  }

  if (media.url.startsWith("http")) {
    return media.url
  }

  return `${config.public.strapiUrl}${media.url}`
}

/* =====================================================
   FETCH SLIDES
===================================================== */

const fetchSlides = async () => {

  loading.value = true
  error.value = null

  try {

    const response =
      await $fetch<StrapiHeroResponse>(
        `${config.public.strapiUrl}/api/hero-slides`,
        {
          query: {
            populate: "*",
            locale: locale.value,
            sort: "order:asc"
          }
        }
      )

    slides.value =
      (response.data || []).map(slide => ({
        id: slide.documentId || String(slide.id),

        badge: slide.badge || "",

        title: slide.title || "",

        description:
          slide.description || "",

        image:
          getMediaUrl(slide.image),

        buttonText:
          slide.buttonText ||
          "Explore Products",

        category:
          slide.category || null
      }))

    current.value = 0

  } catch (err) {

    error.value =
      err instanceof Error
        ? err
        : new Error(
            "Failed to fetch hero slides"
          )

    slides.value = []

  } finally {

    loading.value = false

  }
}

/* =====================================================
   CURRENT SLIDE
===================================================== */

const currentSlide = computed(() => {

  return (
    slides.value[current.value] ||
    slides.value[0]
  )

})

/* =====================================================
   SLIDER
===================================================== */

const nextSlide = () => {

  if (!slides.value.length) {
    return
  }

  current.value =
    (current.value + 1) %
    slides.value.length
}

const previousSlide = () => {

  if (!slides.value.length) {
    return
  }

  current.value =
    (current.value - 1 +
      slides.value.length) %
    slides.value.length
}

const goTo = (index: number) => {

  current.value = index

  resetInterval()
}

/* =====================================================
   AUTO PLAY
===================================================== */

let interval:
  ReturnType<typeof setInterval> | undefined

const startInterval = () => {

  if (slides.value.length <= 1) {
    return
  }

  interval = setInterval(() => {

    nextSlide()

  }, 6000)
}

const resetInterval = () => {

  if (interval) {
    clearInterval(interval)
  }

  startInterval()
}

/* =====================================================
   SWIPE
===================================================== */

const touchStartX = ref(0)

const touchEndX = ref(0)

const handleTouchStart = (
  event: TouchEvent
) => {

  touchStartX.value =
    event.changedTouches[0].screenX
}

const handleTouchEnd = (
  event: TouchEvent
) => {

  touchEndX.value =
    event.changedTouches[0].screenX

  const swipeDistance =
    touchEndX.value -
    touchStartX.value

  if (
    Math.abs(swipeDistance) < 50
  ) {
    return
  }

  if (swipeDistance < 0) {

    nextSlide()

  } else {

    previousSlide()

  }

  resetInterval()
}

/* =====================================================
   INITIAL LOAD
===================================================== */

await fetchSlides()

/* =====================================================
   LANGUAGE CHANGE
===================================================== */

watch(locale, async () => {

  await fetchSlides()

  resetInterval()

})

/* =====================================================
   LIFECYCLE
===================================================== */

onMounted(() => {

  startInterval()

})

onUnmounted(() => {

  if (interval) {
    clearInterval(interval)
  }

})
</script>


<style scoped lang="scss">

.hero {

  padding: 70px 0 35px;

  background:
    linear-gradient(
      135deg,
      $color-gray-50 0%,
      $color-surface 100%
    );

  overflow: hidden;


  &__wrapper {

    display: flex;
    flex-direction: column;
    gap: $space-6;

  }


  &__slide {

    display: grid;

    grid-template-columns:
      1.1fr 0.9fr;

    gap: $space-12;

    align-items: center;

    min-height: 400px;

    touch-action: pan-y;
    user-select: none;

  }


  &__content {

    display: flex;
    flex-direction: column;
    gap: $space-4;

  }


  &__badge {

    display: inline-flex;

    width: fit-content;

    padding:
      $space-1
      $space-3;

    border-radius:
      $radius-full;

    background:
      rgba(234, 162, 33, 0.10);

    border:
      1px solid
      rgba(234, 162, 33, 0.25);

    color:
      $color-primary-600;

    font-size:
      $text-sm;

    font-weight:
      $font-semibold;

  }


  &__title {

    margin: 0;

    font-size:
      clamp(
        2rem,
        4vw,
        3.5rem
      );

    line-height:
      1.20;

    font-weight:
      $font-bold;

    color:
      $color-text;

    letter-spacing:
      -0.03em;

    max-width:
      15ch;

  }


  &__description {

    margin: 0;

    font-size:
      $text-base;

    line-height:
      $leading-relaxed;

    color:
      $color-text-secondary;

    max-width:
      500px;

  }


  &__actions {

    display: flex;
    flex-wrap: wrap;

    gap: $space-3;

    margin-top:
      $space-1;

  }


  &__visual {

    width: 100%;

    max-width: 500px;

    margin: 0 auto;

    aspect-ratio:
      1 / 0.85;

    border-radius:
      $radius-2xl;

    overflow: hidden;

    box-shadow:
      $shadow-xl;

  }


  &__image {

    width: 100%;
    height: 100%;

    display: block;

    object-fit: cover;

  }


  &__dots {

    display: flex;

    justify-content: center;
    align-items: center;

    gap: $space-2;

  }


  &__dot {

    width: 8px;
    height: 8px;

    padding: 0;

    border: none;

    border-radius:
      $radius-full;

    cursor: pointer;

    background:
      $color-gray-300;

    transition:
      all $transition-base;


    &--active {

      width: 24px;

      background:
        $color-primary-500;

    }

  }


  &__loading,
  &__error,
  &__empty {

    min-height: 400px;

    display: flex;

    align-items: center;
    justify-content: center;

    text-align: center;

    color:
      $color-text-secondary;

  }

}


// ==========================================
// SLIDE ANIMATION
// ==========================================

.hero-slide-enter-active,
.hero-slide-leave-active {

  transition:
    opacity 0.4s ease,
    transform 0.4s ease;

}

.hero-slide-enter-from {

  opacity: 0;

  transform:
    translateX(30px);

}

.hero-slide-leave-to {

  opacity: 0;

  transform:
    translateX(-30px);

}


// ==========================================
// TABLET
// ==========================================

@media (max-width: 1024px) {

  .hero {

    padding:
      60px 0 30px;


    &__slide {

      grid-template-columns:
        1fr;

      min-height:
        auto;

      gap:
        $space-8;

    }


    &__content {

      align-items:
        center;

      text-align:
        center;

    }


    &__title {

      max-width:
        700px;

    }


    &__description {

      max-width:
        600px;

    }


    &__actions {

      flex-direction:
        column;

    }

  }

}


// ==========================================
// MOBILE
// ==========================================

@media (max-width: 768px) {

  .hero {

    padding:
      50px 0 25px;


    &__slide {

      gap:
        $space-6;

    }


    &__title {

      font-size:
        2.25rem;

    }


    &__visual {

      max-width:
        350px;

    }

  }

}

</style>