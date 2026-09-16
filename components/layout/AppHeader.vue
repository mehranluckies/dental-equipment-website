```vue
<template>
  <header
    class="header"
    :class="{ 'header--scrolled': isScrolled }"
    @mouseleave="closeMega"
  >
    <AnnouncementBar />

    <!-- Desktop Header -->
    <div class="header__desktop">
      <Container>
        <div class="header__inner">
          <!-- Logo -->
          <NuxtLink
            :to="localePath('/')"
            class="header__logo"
          >
            <span class="logo">
              DentalTech Pro
            </span>
          </NuxtLink>

          <!-- Navigation -->
          <nav
            class="header__nav"
            aria-label="Main navigation"
          >
            <NuxtLink
              v-for="item in navItems"
              :key="item.path"
              :to="localePath(item.path)"
              class="header__link"
              :class="{
                'header__link--has-mega': item.hasMega
              }"
              @mouseenter="
                item.hasMega
                  ? showMega(item.key)
                  : closeMega()
              "
              @click="closeMega"
            >
              {{ $t(item.label) }}
            </NuxtLink>
          </nav>

          <!-- Actions -->
          <div class="header__actions">
            <Button
              variant="outline"
              size="sm"
              tag="NuxtLink"
              :to="localePath('/support/contact')"
            >
              {{ $t('nav.contact') }}
            </Button>

            <Button
              size="sm"
              tag="NuxtLink"
              :to="localePath('/request-quote')"
            >
              {{ $t('nav.requestQuote') }}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              @click="switchLanguage"
            >
              {{ locale === 'en' ? 'فارسی' : 'English' }}
            </Button>
          </div>
        </div>
      </Container>

      <!-- Product Mega Menu -->
      <Transition name="mega-menu">
        <ProductMegaMenu
          v-if="megaMenu === 'products'"
          @close="closeMega"
        />
      </Transition>
    </div>

    <!-- Mobile Navigation -->
    <MobileNav />
  </header>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

const {
  locale,
  setLocale
} = useI18n()

/* ==========================================
   LANGUAGE
========================================== */

const switchLanguage = async () => {
  await setLocale(
    locale.value === 'en'
      ? 'fa'
      : 'en'
  )
}

/* ==========================================
   NAVIGATION
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
   STATE
========================================== */

const isScrolled = ref(false)

const megaMenu = ref<string | null>(null)

/* ==========================================
   MEGA MENU
========================================== */

const showMega = (key: string) => {
  megaMenu.value = key
}

const closeMega = () => {
  megaMenu.value = null
}

/* ==========================================
   SCROLL
========================================== */

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => {
  handleScroll()

  window.addEventListener(
    'scroll',
    handleScroll,
    {
      passive: true
    }
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
  z-index: 1000;
  width: 100%;
}

/* ==========================================
   DESKTOP HEADER
========================================== */

.header__desktop {
  position: fixed;

  top: 35px;
  left: 0;
  right: 0;

  z-index: 1000;

  width: 100%;

  background: rgba(
    10,
    10,
    10,
    0.98
  );

  border-bottom: 1px solid
    rgba(
      234,
      162,
      33,
      0.22
    );

  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  transition:
    box-shadow $transition-base,
    border-color $transition-base;
}

/* ==========================================
   SCROLLED HEADER
========================================== */

.header--scrolled {
  .header__desktop {
    box-shadow:
      0 8px 30px
      rgba(0, 0, 0, 0.35);

    border-bottom-color:
      rgba(
        234,
        162,
        33,
        0.38
      );
  }
}

/* ==========================================
   INNER
========================================== */

.header__inner {
  display: flex;
  align-items: center;

  min-height: 72px;

  padding-block: $space-4;

  gap: $space-12;
}

/* ==========================================
   LOGO
========================================== */

.header__logo {
  flex-shrink: 0;

  text-decoration: none;
}

.logo {
  display: block;

  color: $color-primary-500;

  font-size: $text-xl;
  font-weight: $font-bold;

  letter-spacing: -0.02em;

  white-space: nowrap;

  transition:
    color $transition-fast;
}

.header__logo:hover {
  .logo {
    color: $color-primary-400;
  }
}

/* ==========================================
   NAVIGATION
========================================== */

.header__nav {
  display: flex;
  align-items: center;

  flex: 1;

  gap: $space-8;
}

/* ==========================================
   NAV LINK
========================================== */

.header__link {
  position: relative;

  display: inline-flex;
  align-items: center;

  color: $color-gray-300;

  font-size: $text-sm;
  font-weight: $font-medium;

  white-space: nowrap;

  transition:
    color $transition-fast;
}

/* Hover */

.header__link:hover {
  color: $color-primary-500;
}

/* Active */

.header__link.router-link-active {
  color: $color-primary-500;
}

/* Active underline */

.header__link.router-link-active::after {
  content: '';

  position: absolute;

  left: 0;
  right: 0;
  bottom: -8px;

  height: 2px;

  background: $color-primary-500;

  border-radius: $radius-full;
}

/* ==========================================
   ACTIONS
========================================== */

.header__actions {
  display: flex;
  align-items: center;

  flex-shrink: 0;

  gap: $space-3;
}

/* ==========================================
   MEGA MENU TRANSITION
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

  .header__link.router-link-active::after {
    left: 0;
    right: 0;
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
  .header {
    position: relative;
    width: 100%;
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
```

این نسخه از نظر **طراحی Header همان Black & Gold قبلی** است؛ من عمداً `height: 35px` و `position: static` را هم وارد نکردم، چون آن‌ها تغییرات جدید بودند و در نسخه قبلی وجود نداشتند.
