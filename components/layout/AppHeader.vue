<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled }" @mouseleave="closeMega">
    <!-- ==========================================
         ANNOUNCEMENT BAR
    =========================================== -->
    <AnnouncementBar />

    <!-- ==========================================
         DESKTOP HEADER
    =========================================== -->
    <div class="header__desktop">
      <Container>
        <div class="header__inner">

          <!-- Logo -->
          <NuxtLink :to="localePath('/')" class="header__logo">
            <span class="logo">
              DentalTech Pro
            </span>
          </NuxtLink>

          <!-- Navigation -->
          <nav class="header__nav" aria-label="Main navigation">
            <NuxtLink v-for="item in navItems" :key="item.path" :to="localePath(item.path)" class="header__link" :class="{
              'header__link--has-mega': item.hasMega
            }" @mouseenter="
                item.hasMega
                  ? showMega(item.key)
                  : closeMega()
                " @click="closeMega">
              {{ $t(item.label) }}
            </NuxtLink>
          </nav>

          <!-- Actions -->
          <div class="header__actions">

            <!-- Contact -->
            <Button variant="outline" size="sm" tag="NuxtLink" :to="localePath('/support/contact')">
              {{ $t('nav.contact') }}
            </Button>

            <!-- Request Quote -->
            <Button size="sm" tag="NuxtLink" :to="localePath('/request-quote')">
              {{ $t('nav.requestQuote') }}
            </Button>

            <!-- Language -->
            <Button variant="ghost" size="sm" @click="switchLanguage">
              {{ locale === 'en' ? 'فارسی' : 'English' }}
            </Button>

          </div>
        </div>
      </Container>

      <!-- ========================================
           PRODUCT MEGA MENU
      ========================================= -->
      <Transition name="mega-menu">
        <ProductMegaMenu v-if="megaMenu === 'products'" @close="closeMega" />
      </Transition>
    </div>

    <!-- ==========================================
         MOBILE BOTTOM NAVIGATION
    =========================================== -->
    <MobileNav />
  </header>
</template>


<script setup lang="ts">

/* ==========================================
   i18n
========================================== */

const localePath = useLocalePath()

const {
  locale,
  setLocale
} = useI18n()


/* ==========================================
   Language
========================================== */

const switchLanguage = async () => {
  await setLocale(
    locale.value === 'en'
      ? 'fa'
      : 'en'
  )
}


/* ==========================================
   Navigation
========================================== */

const navItems = [
  { 
    label: 'nav.products',
    path: '/products',
    key: 'products',
    hasMega: true
  },
  {
    label: 'nav.solutions',
    path: '/solutions',
    key: 'solutions',
    hasMega: false
  },
  {
    label: 'nav.services',
    path: '/services',
    key: 'services',
    hasMega: false
  },
  {
    label: 'nav.caseStudies',
    path: '/case-studies',
    key: 'case-studies',
    hasMega: false
  },
  {
    label: 'nav.resources',
    path: '/resources',
    key: 'resources',
    hasMega: false
  },
  {
    label: 'nav.blog',
    path: '/blog',
    key: 'blog',
    hasMega: false
  },
  {
    label: 'nav.about',
    path: '/company/about',
    key: 'about',
    hasMega: false
  }
]


/* ==========================================
   Header State
========================================== */

const isScrolled = ref(false)

const megaMenu = ref<string | null>(null)


/* ==========================================
   Mega Menu
========================================== */

const showMega = (key: string) => {
  megaMenu.value = key
}

const closeMega = () => {
  megaMenu.value = null
}


/* ==========================================
   Scroll
========================================== */

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}


onMounted(() => {
  window.addEventListener(
    'scroll',
    handleScroll,
    { passive: true }
  )
})


onUnmounted(() => {
  window.removeEventListener(
    'scroll',
    handleScroll
  )
})

</script>


<style scoped lang="scss">
/* ==========================================
   HEADER
========================================== */

.header {
  position: relative;
  z-index: 100;
}


/* ==========================================
   DESKTOP HEADER
========================================== */

.header__desktop {
  position: fixed;

  /*
   * AnnouncementBar = 35px
   * Header starts below it
   */
  top: 35px;

  left: 0;
  right: 0;

  z-index: 100;

  background: rgba(255,
      255,
      255,
      0.95);

  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  transition:
    box-shadow $transition-base;
}


/* ==========================================
   SCROLLED
========================================== */

.header--scrolled {

  .header__desktop {
    box-shadow: $shadow-md;
  }

}


/* ==========================================
   INNER
========================================== */

.header__inner {

  display: flex;

  align-items: center;

  gap: $space-12;

  min-height: 72px;

  padding-block: $space-4;

}


/* ==========================================
   LOGO
========================================== */

.header__logo {

  flex-shrink: 0;

  text-decoration: none;

  .logo {

    display: block;

    font-size: $text-xl;

    font-weight: $font-bold;

    color: #123B4A;

    letter-spacing: -0.02em;

    white-space: nowrap;

  }

}


/* ==========================================
   NAVIGATION
========================================== */

.header__nav {

  display: flex;

  align-items: center;

  gap: $space-8;

  flex: 1;

}


/* ==========================================
   NAVIGATION LINK
========================================== */

.header__link {

  position: relative;

  display: inline-flex;

  align-items: center;

  font-size: $text-base;

  font-weight: $font-medium;

  color: $color-gray-700;

  text-decoration: none;

  white-space: nowrap;

  transition:
    color $transition-fast;

}


/* Hover */

.header__link:hover {
  color: #123B4A;
}


/* Active */

.header__link.router-link-active {

  color: #123B4A;

  font-weight: $font-semibold;

}


/* ==========================================
   ACTIONS
========================================== */

.header__actions {

  display: flex;

  align-items: center;

  gap: $space-3;

  flex-shrink: 0;

}


/* ==========================================
   MEGA MENU
========================================== */

.mega-menu-enter-active,
.mega-menu-leave-active {

  transition:
    opacity 0.2s ease,
    transform 0.2s ease;

}

.mega-menu-enter-from,
.mega-menu-leave-to {

  opacity: 0;

  transform:
    translateY(-10px);

}

.mega-menu-enter-to,
.mega-menu-leave-from {

  opacity: 1;

  transform:
    translateY(0);

}


/* ==========================================
   RTL
========================================== */

:global(html[dir='rtl']) {

  .header__inner {
    direction: rtl;
  }

  .header__nav {
    direction: rtl;
  }

  .header__actions {
    direction: rtl;
  }

  .header__link {
    letter-spacing: 0;
  }

}


/* ==========================================
   LTR
========================================== */

:global(html[dir='ltr']) {

  .header__inner {
    direction: ltr;
  }

  .header__nav {
    direction: ltr;
  }

  .header__actions {
    direction: ltr;
  }

}


/* ==========================================
   MOBILE
========================================== */

@media (max-width: 1023px) {

  /*
   * Desktop Header completely disappears.
   *
   * AnnouncementBar remains visible.
   * MobileNav remains visible at bottom.
   */

  .header {

    position: static;

    width: 100%;

    height: 35px;

    margin: 0;

    padding: 0;

  }


  .header__desktop {

    display: none !important;

  }

}


/* ==========================================
   DESKTOP
========================================== */

@media (min-width: 1024px) {

  .header__desktop {

    display: block;

  }

}
</style>