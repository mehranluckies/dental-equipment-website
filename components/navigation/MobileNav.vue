```vue
<template>
  <Teleport to="body">
    <nav
      ref="mobileNavRef"
      class="mobile-nav"
      :class="{ 'mobile-nav--rtl': locale === 'fa' }"
    >
      <div class="mobile-nav__inner">
        <NuxtLink
          :to="localePath('/')"
          class="mobile-nav__item"
          :class="{ 'mobile-nav__item--active': isActive('/') }"
          @click="closeMore"
        >
          <House :size="22" />
          <span>{{ $t('mobileNav.home') }}</span>
        </NuxtLink>

        <NuxtLink
          :to="localePath('/products')"
          class="mobile-nav__item"
          :class="{ 'mobile-nav__item--active': isActive('/products') }"
          @click="closeMore"
        >
          <Package :size="22" />
          <span>{{ $t('mobileNav.products') }}</span>
        </NuxtLink>

        <NuxtLink
          :to="localePath('/solutions')"
          class="mobile-nav__item"
          :class="{ 'mobile-nav__item--active': isActive('/solutions') }"
          @click="closeMore"
        >
          <Sparkles :size="22" />
          <span>{{ $t('mobileNav.solutions') }}</span>
        </NuxtLink>

        <NuxtLink
          :to="localePath('/case-studies')"
          class="mobile-nav__item"
          :class="{
            'mobile-nav__item--active': isActive('/case-studies')
          }"
          @click="closeMore"
        >
          <BriefcaseBusiness :size="22" />
          <span>{{ $t('mobileNav.caseStudies') }}</span>
        </NuxtLink>

        <button
          type="button"
          class="mobile-nav__item"
          :class="{ 'mobile-nav__item--active': moreOpen }"
          @click="toggleMore"
        >
          <Menu :size="22" />
          <span>{{ $t('mobileNav.more') }}</span>
        </button>
      </div>

      <Transition name="more-menu">
        <div
          v-if="moreOpen"
          class="mobile-nav__more"
        >
          <NuxtLink
            :to="localePath('/services')"
            class="mobile-nav__more-item"
            @click="closeMore"
          >
            <Wrench :size="18" />
            {{ $t('nav.services') }}
          </NuxtLink>

          <NuxtLink
            :to="localePath('/resources')"
            class="mobile-nav__more-item"
            @click="closeMore"
          >
            <BookOpen :size="18" />
            {{ $t('nav.resources') }}
          </NuxtLink>

          <NuxtLink
            :to="localePath('/company/about')"
            class="mobile-nav__more-item"
            @click="closeMore"
          >
            <Building2 :size="18" />
            {{ $t('nav.about') }}
          </NuxtLink>

          <NuxtLink
            :to="localePath('/support/contact')"
            class="mobile-nav__more-item"
            @click="closeMore"
          >
            <Phone :size="18" />
            {{ $t('nav.contact') }}
          </NuxtLink>

          <NuxtLink
            :to="localePath('/request-quote')"
            class="mobile-nav__more-item mobile-nav__more-item--quote"
            @click="closeMore"
          >
            <Send :size="18" />
            {{ $t('nav.requestQuote') }}
          </NuxtLink>

          <button
            type="button"
            class="mobile-nav__more-item"
            @click="switchLanguage"
          >
            <Languages :size="18" />
            {{ locale === 'en' ? 'فارسی' : 'English' }}
          </button>
        </div>
      </Transition>
    </nav>
  </Teleport>
</template>

<script setup lang="ts">
import {
  House,
  Package,
  Sparkles,
  BriefcaseBusiness,
  Menu,
  Wrench,
  BookOpen,
  Building2,
  Phone,
  Send,
  Languages
} from 'lucide-vue-next'

const localePath = useLocalePath()

const { locale, setLocale } = useI18n()

const route = useRoute()

const moreOpen = ref(false)

const mobileNavRef = ref<HTMLElement | null>(null)

const toggleMore = () => {
  moreOpen.value = !moreOpen.value
}

const closeMore = () => {
  moreOpen.value = false
}

const switchLanguage = async () => {
  await setLocale(
    locale.value === 'en'
      ? 'fa'
      : 'en'
  )

  closeMore()
}

const isActive = (path: string) => {
  const target = localePath(path)

  if (path === '/') {
    return route.path === target
  }

  return (
    route.path === target ||
    route.path.startsWith(`${target}/`)
  )
}

const handleOutsideClick = (event: MouseEvent) => {
  if (!moreOpen.value) {
    return
  }

  const target = event.target as Node

  if (
    mobileNavRef.value &&
    !mobileNavRef.value.contains(target)
  ) {
    closeMore()
  }
}

onMounted(() => {
  document.addEventListener(
    'click',
    handleOutsideClick
  )
})

onUnmounted(() => {
  document.removeEventListener(
    'click',
    handleOutsideClick
  )
})

watch(
  () => route.path,
  () => {
    closeMore()
  }
)
</script>

<style lang="scss">
.mobile-nav {
  position: fixed !important;

  left: 0 !important;
  right: 0 !important;
  bottom: 16px !important;

  width: 100% !important;

  z-index: 99999 !important;

  padding:
    0
    $space-4
    calc(
      env(safe-area-inset-bottom) +
      $space-1
    );

  box-sizing: border-box;

  pointer-events: none;
}

.mobile-nav__inner {
  pointer-events: auto;

  display: grid;

  grid-template-columns:
    repeat(5, 1fr);

  align-items: center;

  width: 100%;
  max-width: 720px;

  margin: 0 auto;

  box-sizing: border-box;

  background:
    $color-black;

  border:
    1px solid
    $color-secondary-500;

  border-radius:
    $radius-2xl;

  padding:
    $space-2;

  box-shadow:
    0 20px 45px
    rgba(0, 0, 0, 0.35),
    0 6px 18px
    rgba(0, 0, 0, 0.25);
}

.mobile-nav__item {
  position: relative;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  gap: 5px;

  min-width: 0;

  padding:
    10px
    6px;

  border: none;

  border-radius:
    $radius-xl;

  background: transparent;

  color:
    $color-white;

  text-decoration: none;

  cursor: pointer;

  font-family: inherit;

  font-size:
    $text-xs;

  font-weight:
    $font-semibold;

  transition:
    color $transition-base,
    background-color $transition-base,
    transform $transition-fast;
}

.mobile-nav__item svg {
  flex-shrink: 0;

  color:
    $color-white;

  transition:
    color $transition-base,
    transform $transition-base;
}

.mobile-nav__item span {
  color:
    $color-white;

  line-height: 1;

  white-space: nowrap;

  transition:
    color $transition-base;
}

.mobile-nav__item:hover {
  color:
    $color-primary-400;
}

.mobile-nav__item:hover svg {
  color:
    $color-primary-400;

  transform:
    translateY(-2px);
}

.mobile-nav__item:hover span {
  color:
    $color-primary-400;
}

.mobile-nav__item--active {
  color:
    $color-primary-500;
}

.mobile-nav__item--active svg {
  color:
    $color-primary-500;

  transform:
    scale(1.08);

  stroke-width: 2.4;
}

.mobile-nav__item--active span {
  color:
    $color-primary-500;

  font-weight:
    $font-bold;
}

/* ==========================================
   MORE MENU
   ========================================== */

.mobile-nav__more {
  pointer-events: auto;

  position: fixed;

  left:
    $space-4;

  right:
    $space-4;

  bottom: 100px;

  z-index: 100000;

  display: grid;

  grid-template-columns:
    repeat(2, 1fr);

  gap:
    $space-3;

  padding:
    $space-4;

  box-sizing: border-box;

  background:
    $color-black;

  border:
    1px solid
    $color-secondary-500;

  border-radius:
    $radius-2xl;

  box-shadow:
    0 24px 60px
    rgba(0, 0, 0, 0.4),
    0 8px 20px
    rgba(0, 0, 0, 0.25);
}

.mobile-nav__more-item {
  display: flex;

  align-items: center;

  gap:
    $space-3;

  min-width: 0;

  padding:
    $space-3;

  border: none;

  border-radius:
    $radius-lg;

  background:
    $color-secondary-700;

  color:
    $color-white;

  text-decoration: none;

  cursor: pointer;

  font-family: inherit;

  font-size:
    $text-sm;

  font-weight:
    $font-semibold;

  transition:
    transform $transition-fast,
    background-color $transition-base,
    color $transition-base;
}

.mobile-nav__more-item svg {
  flex-shrink: 0;

  color:
    $color-primary-500;
}

.mobile-nav__more-item:hover {
  transform:
    translateY(-2px);

  background:
    $color-secondary-600;

  color:
    $color-primary-400;
}

.mobile-nav__more-item--quote {
  background:
    $color-primary-500;

  color:
    $color-black;
}

.mobile-nav__more-item--quote svg {
  color:
    $color-black;
}

.mobile-nav__more-item--quote:hover {
  background:
    $color-primary-600;

  color:
    $color-black;
}

/* ==========================================
   MORE MENU ANIMATION
   ========================================== */

.more-menu-enter-active,
.more-menu-leave-active {
  transition:
    opacity $transition-base,
    transform $transition-base;
}

.more-menu-enter-from,
.more-menu-leave-to {
  opacity: 0;

  transform:
    translateY(20px)
    scale(0.96);
}

.more-menu-enter-to,
.more-menu-leave-from {
  opacity: 1;

  transform:
    translateY(0)
    scale(1);
}

/* ==========================================
   RTL
   ========================================== */

.mobile-nav--rtl {
  direction: rtl;
}

.mobile-nav--rtl
.mobile-nav__inner {
  direction: rtl;
}

.mobile-nav--rtl
.mobile-nav__more {
  direction: rtl;
}

.mobile-nav--rtl
.mobile-nav__more-item {
  text-align: right;
}

/* ==========================================
   DESKTOP
   ========================================== */

@media (min-width: 1024px) {
  .mobile-nav {
    display: none !important;
  }
}

/* ==========================================
   SMALL MOBILE
   ========================================== */

@media (max-width: 380px) {
  .mobile-nav {
    padding-left:
      $space-2;

    padding-right:
      $space-2;
  }

  .mobile-nav__inner {
    padding:
      $space-1;
  }

  .mobile-nav__item {
    padding:
      9px
      3px;

    font-size:
      0.68rem;
  }

  .mobile-nav__more {
    left:
      $space-2;

    right:
      $space-2;
  }
}
</style>
```
