<template>
  <section class="hero">
    <Container>
      <div class="hero__wrapper">
        <Transition name="hero-slide" mode="out-in">
          <div :key="currentSlide.id" class="hero__slide" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
            <!-- Left Content -->
            <div class="hero__content">
              <span class="hero__badge">
                {{ $t(currentSlide.badge) }}
              </span>

              <h1 class="hero__title">
                {{ $t(currentSlide.title) }}
              </h1>

              <p class="hero__description">
                {{ $t(currentSlide.description) }}
              </p>

              <div class="hero__actions">
                <Button size="lg" tag="NuxtLink" :to="localePath('/products')">
                  {{ $t("hero.exploreProducts") }}
                </Button>

                <Button size="lg" variant="outline" tag="NuxtLink" :to="localePath('/request-quote')">
                  {{ $t("hero.requestQuote") }}
                </Button>
              </div>
            </div>

            <!-- Right Visual -->
            <div class="hero__visual">
              <img :src="currentSlide.image" :alt="$t(currentSlide.title)" class="hero__image" />
            </div>
          </div>
        </Transition>

        <!-- Slider Dots -->
        <div class="hero__dots">
          <button v-for="(slide, index) in slides" :key="slide.id" class="hero__dot" :class="{
            'hero__dot--active': current === index
          }" :aria-label="`Go to slide ${index + 1}`" @click="goTo(index)" />
        </div>
      </div>
    </Container>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const localePath = useLocalePath();

const slides = [
  {
    id: 1,
    badge: "hero.slides.digital.badge",
    title: "hero.slides.digital.title",
    description: "hero.slides.digital.description",
    image: "/image/slider/1.jpg",
  },

  {
    id: 2,
    badge: "hero.slides.printing.badge",
    title: "hero.slides.printing.title",
    description: "hero.slides.printing.description",
    image: "/image/slider/2.jpg",
  },

  {
    id: 3,
    badge: "hero.slides.cadcam.badge",
    title: "hero.slides.cadcam.title",
    description: "hero.slides.cadcam.description",
    image: "/image/slider/3.jpg",
  },
];

const current = ref(0);

const currentSlide = computed(() => {
  return slides[current.value];
});

let interval: ReturnType<typeof setInterval>;

/* --------------------------------
   Slider
-------------------------------- */

const nextSlide = () => {
  current.value = (current.value + 1) % slides.length;
};

const previousSlide = () => {
  current.value =
    (current.value - 1 + slides.length) % slides.length;
};

const goTo = (index: number) => {
  current.value = index;
  resetInterval();
};

/* --------------------------------
   Auto Play
-------------------------------- */

const startInterval = () => {
  interval = setInterval(() => {
    nextSlide();
  }, 6000);
};

const resetInterval = () => {
  clearInterval(interval);
  startInterval();
};

/* --------------------------------
   Swipe
-------------------------------- */

const touchStartX = ref(0);
const touchEndX = ref(0);

const handleTouchStart = (event: TouchEvent) => {
  touchStartX.value = event.changedTouches[0].screenX;
};

const handleTouchEnd = (event: TouchEvent) => {
  touchEndX.value = event.changedTouches[0].screenX;

  const swipeDistance =
    touchEndX.value - touchStartX.value;

  // Ignore small movements
  if (Math.abs(swipeDistance) < 50) {
    return;
  }

  if (swipeDistance < 0) {
    // Swipe Left
    nextSlide();
  } else {
    // Swipe Right
    previousSlide();
  }

  resetInterval();
};

/* --------------------------------
   Lifecycle
-------------------------------- */

onMounted(() => {
  startInterval();
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style scoped lang="scss">
.hero {
  padding: 70px 0 35px;

  background: linear-gradient(135deg,
      #eef8f7 0%,
      #f4fbfd 100%);

  overflow: hidden;

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__slide {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 40px;
    align-items: center;
    min-height: 400px;

    touch-action: pan-y;
    user-select: none;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__badge {
    display: inline-flex;
    width: fit-content;

    padding: 5px 12px;

    border-radius: 999px;

    background: rgba(26, 75, 69, 0.08);

    color: $color-primary-600;

    font-size: 13px;
    font-weight: $font-semibold;
  }

  &__title {
    margin: 0;

    font-size: clamp(2rem, 4vw, 3.5rem);
    line-height: 1.20;

    font-weight: $font-bold;

    color: $color-gray-900;

    letter-spacing: -0.03em;

    max-width: 15ch;
  }

  &__description {
    margin: 0;

    font-size: 1rem;
    line-height: 1.6;

    color: $color-gray-700;

    max-width: 500px;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;

    gap: 12px;

    margin-top: 4px;
  }

  &__visual {
    width: 100%;
    max-width: 500px;

    margin: 0 auto;

    aspect-ratio: 1 / 0.85;

    border-radius: $radius-2xl;

    overflow: hidden;

    box-shadow: $shadow-xl;
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

    gap: 8px;
  }

  &__dot {
    width: 8px;
    height: 8px;

    padding: 0;

    border: none;
    border-radius: 999px;

    cursor: pointer;

    background: rgba(26, 75, 69, 0.2);

    transition: all 0.3s ease;

    &--active {
      width: 24px;
      background: $color-primary-600;
    }
  }
}

/* --------------------------------
   Slide Animation
-------------------------------- */

.hero-slide-enter-active,
.hero-slide-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}

.hero-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.hero-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* --------------------------------
   Tablet
-------------------------------- */

@media (max-width: 1024px) {
  .hero {
    padding: 60px 0 30px;

    &__slide {
      grid-template-columns: 1fr;
      min-height: auto;
      gap: 30px;
    }

    &__content {
      align-items: center;
      text-align: center;
    }

    &__title {
      max-width: 700px;
    }

    &__description {
      max-width: 600px;
    }

    &__actions {
      flex-direction: column;
    }
  }
}

/* --------------------------------
   Mobile
-------------------------------- */

@media (max-width: 768px) {
  .hero {
    padding: 50px 0 25px;

    &__slide {
      gap: 24px;
    }

    &__title {
      font-size: 2.25rem;
    }

    &__visual {
      max-width: 350px;
    }
  }
}
</style>