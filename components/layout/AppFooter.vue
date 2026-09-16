<template>

  <footer class="footer">

    <Container>

      <div class="footer__grid">

        <!-- Brand -->
        <div class="footer__brand">

          <h3 class="footer__logo">
            DentalTech Pro
          </h3>

          <p class="footer__tagline">
            {{ $t('footer.tagline') }}
          </p>

          <div class="footer__social">

            <a
              href="#"
              aria-label="LinkedIn"
            >
              <component
                :is="LinkedinIcon"
                :size="20"
              />
            </a>

            <a
              href="#"
              aria-label="Twitter"
            >
              <component
                :is="TwitterIcon"
                :size="20"
              />
            </a>

            <a
              href="#"
              aria-label="Facebook"
            >
              <component
                :is="FacebookIcon"
                :size="20"
              />
            </a>

            <a
              href="#"
              aria-label="YouTube"
            >
              <component
                :is="YoutubeIcon"
                :size="20"
              />
            </a>

          </div>

        </div>


        <!-- Links -->
        <div class="footer__links">

          <!-- Products -->
          <div class="footer__column">

            <h4 class="footer__heading">
              {{ $t('footer.products.title') }}
            </h4>

            <NuxtLink
              :to="localePath('/products/intraoral-scanners')"
            >
              {{ $t('footer.products.intraoralScanners') }}
            </NuxtLink>

            <NuxtLink
              :to="localePath('/products/lab-scanners')"
            >
              {{ $t('footer.products.labScanners') }}
            </NuxtLink>

            <NuxtLink
              :to="localePath('/products/3d-printers')"
            >
              {{ $t('footer.products.printers3d') }}
            </NuxtLink>

            <NuxtLink
              :to="localePath('/products/materials')"
            >
              {{ $t('footer.products.materials') }}
            </NuxtLink>

            <NuxtLink
              :to="localePath('/products/software')"
            >
              {{ $t('footer.products.software') }}
            </NuxtLink>

          </div>


          <!-- Solutions -->
          <div class="footer__column">

            <h4 class="footer__heading">
              {{ $t('footer.solutions.title') }}
            </h4>

            <NuxtLink
              :to="localePath('/solutions/digital-dentistry')"
            >
              {{ $t('footer.solutions.digitalDentistry') }}
            </NuxtLink>

            <NuxtLink
              :to="localePath('/solutions/implantology')"
            >
              {{ $t('footer.solutions.implantology') }}
            </NuxtLink>

            <NuxtLink
              :to="localePath('/solutions/orthodontics')"
            >
              {{ $t('footer.solutions.orthodontics') }}
            </NuxtLink>

            <NuxtLink
              :to="localePath('/solutions/prosthetics')"
            >
              {{ $t('footer.solutions.prosthetics') }}
            </NuxtLink>

            <NuxtLink
              :to="localePath('/solutions/same-day-dentistry')"
            >
              {{ $t('footer.solutions.sameDayDentistry') }}
            </NuxtLink>

          </div>


          <!-- Resources -->
          <div class="footer__column">

            <h4 class="footer__heading">
              {{ $t('footer.resources.title') }}
            </h4>

            <NuxtLink
              :to="localePath('/case-studies')"
            >
              {{ $t('footer.resources.caseStudies') }}
            </NuxtLink>

            <NuxtLink
              :to="localePath('/blog')"
            >
              {{ $t('footer.resources.blog') }}
            </NuxtLink>

            <NuxtLink
              :to="localePath('/resources')"
            >
              {{ $t('footer.resources.downloads') }}
            </NuxtLink>

            <NuxtLink
              :to="localePath('/support/faq')"
            >
              {{ $t('footer.resources.faq') }}
            </NuxtLink>

          </div>


          <!-- Company -->
          <div class="footer__column">

            <h4 class="footer__heading">
              {{ $t('footer.company.title') }}
            </h4>

            <NuxtLink
              :to="localePath('/company/about')"
            >
              {{ $t('footer.company.about') }}
            </NuxtLink>

            <NuxtLink
              :to="localePath('/support/contact')"
            >
              {{ $t('footer.company.contact') }}
            </NuxtLink>

            <NuxtLink
              :to="localePath('/services')"
            >
              {{ $t('footer.company.services') }}
            </NuxtLink>

            <NuxtLink
              :to="localePath('/request-quote')"
            >
              {{ $t('footer.company.requestQuote') }}
            </NuxtLink>

          </div>

        </div>

      </div>


      <!-- Bottom -->
      <div class="footer__bottom">

        <p class="footer__copyright">
          {{ $t('footer.copyright', { year: currentYear }) }}
        </p>

        <div class="footer__legal">

          <NuxtLink
            :to="localePath('/legal/privacy')"
          >
            {{ $t('footer.legal.privacy') }}
          </NuxtLink>

          <NuxtLink
            :to="localePath('/legal/terms')"
          >
            {{ $t('footer.legal.terms') }}
          </NuxtLink>

        </div>

      </div>

    </Container>

  </footer>

</template>


<script setup lang="ts">

import {
  Linkedin as LinkedinIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  Youtube as YoutubeIcon
} from 'lucide-vue-next'


const localePath = useLocalePath()

const currentYear =
  new Date().getFullYear()

</script>


<style scoped lang="scss">

// ==========================================
// FOOTER
// ==========================================

.footer {

  background:
    $color-black;

  color:
    $color-gray-300;

  padding:
    $space-20
    0
    $space-8;

  margin-top:
    $space-32;


  // ========================================
  // MAIN GRID
  // ========================================

  &__grid {

    display:
      grid;

    grid-template-columns:
      1fr;

    gap:
      $space-12;

    margin-bottom:
      $space-12;

    @include respond-to(md) {

      grid-template-columns:
        1.5fr 2fr;
    }
  }


  // ========================================
  // BRAND
  // ========================================

  &__brand {

    display:
      flex;

    flex-direction:
      column;

    gap:
      $space-6;
  }


  // ========================================
  // LOGO
  // ========================================

  &__logo {

    font-size:
      $text-2xl;

    font-weight:
      $font-bold;

    color:
      $color-white;

    letter-spacing:
      -0.02em;
  }


  // ========================================
  // TAGLINE
  // ========================================

  &__tagline {

    color:
      $color-gray-400;

    line-height:
      $leading-relaxed;

    max-width:
      420px;
  }


  // ========================================
  // SOCIAL
  // ========================================

  &__social {

    display:
      flex;

    gap:
      $space-3;


    a {

      display:
        flex;

      align-items:
        center;

      justify-content:
        center;

      width:
        40px;

      height:
        40px;

      border:
        1px solid
        $color-secondary-500;

      border-radius:
        $radius-full;

      background:
        $color-secondary-700;

      color:
        $color-gray-300;

      transition:
        background-color $transition-base,
        border-color $transition-base,
        color $transition-base,
        transform $transition-fast;


      &:hover {

        background:
          $color-primary-500;

        border-color:
          $color-primary-500;

        color:
          $color-black;

        transform:
          translateY(-2px);
      }
    }
  }


  // ========================================
  // LINK GRID
  // ========================================

  &__links {

    display:
      grid;

    grid-template-columns:
      repeat(2, 1fr);

    gap:
      $space-8;

    @include respond-to(md) {

      grid-template-columns:
        repeat(4, 1fr);
    }
  }


  // ========================================
  // LINK COLUMN
  // ========================================

  &__column {

    display:
      flex;

    flex-direction:
      column;

    gap:
      $space-3;


    a {

      color:
        $color-gray-400;

      font-size:
        $text-sm;

      transition:
        color $transition-fast;


      &:hover {

        color:
          $color-primary-400;
      }
    }
  }


  // ========================================
  // HEADING
  // ========================================

  &__heading {

    margin-bottom:
      $space-2;

    font-size:
      $text-base;

    font-weight:
      $font-semibold;

    color:
      $color-white;
  }


  // ========================================
  // BOTTOM
  // ========================================

  &__bottom {

    display:
      flex;

    flex-direction:
      column;

    gap:
      $space-4;

    padding-top:
      $space-12;

    border-top:
      1px solid
      $color-secondary-500;


    @include respond-to(md) {

      flex-direction:
        row;

      justify-content:
        space-between;

      align-items:
        center;
    }
  }


  // ========================================
  // COPYRIGHT
  // ========================================

  &__copyright {

    font-size:
      $text-sm;

    color:
      $color-gray-500;
  }


  // ========================================
  // LEGAL
  // ========================================

  &__legal {

    display:
      flex;

    gap:
      $space-6;


    a {

      font-size:
        $text-sm;

      color:
        $color-gray-500;

      transition:
        color $transition-fast;


      &:hover {

        color:
          $color-primary-400;
      }
    }
  }
}

</style>