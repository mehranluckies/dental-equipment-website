<template>
  <Teleport to="body">
    <nav v-if="isMobile" ref="mobileNavRef" class="mobile-nav" :class="{ 'mobile-nav--rtl': locale === 'fa' }">
      <!-- Bottom Navigation -->
      <div class="mobile-nav__inner">
        <NuxtLink :to="localePath('/')" class="mobile-nav__item" :class="{ 'mobile-nav__item--active': isActive('/') }"
          @click="closeMore">
          <House :size="22" />
          <span>{{ $t('mobileNav.home') }}</span>
        </NuxtLink>

        <NuxtLink :to="localePath('/products')" class="mobile-nav__item"
          :class="{ 'mobile-nav__item--active': isActive('/products') }" @click="closeMore">
          <Package :size="22" />
          <span>{{ $t('mobileNav.products') }}</span>
        </NuxtLink>

        <NuxtLink :to="localePath('/solutions')" class="mobile-nav__item"
          :class="{ 'mobile-nav__item--active': isActive('/solutions') }" @click="closeMore">
          <Sparkles :size="22" />
          <span>{{ $t('mobileNav.solutions') }}</span>
        </NuxtLink>

        <NuxtLink :to="localePath('/case-studies')" class="mobile-nav__item"
          :class="{ 'mobile-nav__item--active': isActive('/case-studies') }" @click="closeMore">
          <BriefcaseBusiness :size="22" />
          <span>{{ $t('mobileNav.caseStudies') }}</span>
        </NuxtLink>

        <button class="mobile-nav__item" :class="{ 'mobile-nav__item--active': moreOpen }" @click="toggleMore">
          <Menu :size="22" />
          <span>{{ $t('mobileNav.more') }}</span>
        </button>
      </div>

      <!-- More Menu -->
      <Transition name="more-menu">
        <div v-if="moreOpen" class="mobile-nav__more">
          <NuxtLink :to="localePath('/services')" class="mobile-nav__more-item" @click="closeMore">
            <Wrench :size="18" />
            {{ $t('nav.services') }}
          </NuxtLink>

          <NuxtLink :to="localePath('/resources')" class="mobile-nav__more-item" @click="closeMore">
            <BookOpen :size="18" />
            {{ $t('nav.resources') }}
          </NuxtLink>

          <NuxtLink :to="localePath('/company/about')" class="mobile-nav__more-item" @click="closeMore">
            <Building2 :size="18" />
            {{ $t('nav.about') }}
          </NuxtLink>

          <NuxtLink :to="localePath('/support/contact')" class="mobile-nav__more-item" @click="closeMore">
            <Phone :size="18" />
            {{ $t('nav.contact') }}
          </NuxtLink>

          <NuxtLink :to="localePath('/request-quote')" class="mobile-nav__more-item mobile-nav__more-item--quote"
            @click="closeMore">
            <Send :size="18" />
            {{ $t('nav.requestQuote') }}
          </NuxtLink>

          <button class="mobile-nav__more-item" @click="switchLanguage">
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
const isMobile = ref(false)
const mobileNavRef = ref<HTMLElement | null>(null)
const handleOutsideClick = (event: MouseEvent) => {
  if (!moreOpen.value) return

  const target = event.target as Node

  if (
    mobileNavRef.value &&
    !mobileNavRef.value.contains(target)
  ) {
    closeMore()
  }
}

const toggleMore = () => {
  moreOpen.value = !moreOpen.value
}

const closeMore = () => {
  moreOpen.value = false
}

const switchLanguage = async () => {
  await setLocale(locale.value === 'en' ? 'fa' : 'en')
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

const checkMobile = () => {
  isMobile.value = window.innerWidth < 1024
}

onMounted(() => {
  checkMobile()

  window.addEventListener(
    'resize',
    checkMobile
  )

  document.addEventListener(
    'click',
    handleOutsideClick
  )
})

onUnmounted(() => {
  window.removeEventListener(
    'resize',
    checkMobile
  )

  document.removeEventListener(
    'click',
    handleOutsideClick
  )
})

watch(() => route.path, closeMore)
</script>

<style scoped lang="scss">
.mobile-nav {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 14px;
  z-index: 9999;

  padding: 0 16px calc(env(safe-area-inset-bottom) + 4px);
  pointer-events: none;

  --brand: #123b4a;
  --gradient: linear-gradient(135deg, #309dc5 0%, #6be6eb 100%);

  /* =========================
     Floating Bottom Bar
  ========================= */

  &__inner {
    pointer-events: auto;

    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-items: center;

    background: rgba(255, 255, 255, 0.82);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);

    border: 1px solid rgba(255, 255, 255, 0.7);
    border-radius: 24px;

    padding: 8px;

    box-shadow:
      0 20px 45px rgba(18, 59, 74, 0.15),
      0 6px 18px rgba(18, 59, 74, 0.08);
  }

  /* =========================
     Navigation Item
  ========================= */

  &__item {
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 5px;

    padding: 10px 6px;
    border-radius: 18px;

    text-decoration: none;
    border: none;
    background: transparent;
    cursor: pointer;

    color: #6b7280;

    font-size: 11px;
    font-weight: 600;

    transition: all 0.25s ease;

    svg {
      transition: all 0.25s ease;
    }

    span {
      line-height: 1;
    }

    &:hover {
      color: var(--brand);

      svg {
        transform: translateY(-2px);
      }
    }
  }

  /* =========================
     Active Item
  ========================= */

  &__item--active {
    background: var(--gradient);
    color: white;

    box-shadow: 0 8px 20px rgba(48, 157, 197, 0.35);

    svg {
      transform: scale(1.1);
      stroke-width: 2.4;
    }

    span {
      font-weight: 700;
    }
  }

  /* =========================
     More Menu
  ========================= */

  &__more {
    pointer-events: auto;

    position: fixed;
    left: 16px;
    right: 16px;
    bottom: 92px;

    background: rgba(255, 255, 255, 0.94);
    backdrop-filter: blur(24px);

    border-radius: 24px;
    padding: 16px;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;

    border: 1px solid rgba(255, 255, 255, 0.8);

    box-shadow:
      0 24px 60px rgba(18, 59, 74, 0.18),
      0 8px 20px rgba(18, 59, 74, 0.08);
  }

  &__more-item {
    display: flex;
    align-items: center;
    gap: 10px;

    padding: 14px;

    border: none;
    border-radius: 16px;

    background: #f6fbfc;

    color: #36515b;

    text-decoration: none;
    cursor: pointer;

    font-size: 13px;
    font-weight: 600;

    transition: all 0.2s ease;

    svg {
      color: var(--brand);
      flex-shrink: 0;
    }

    &:hover {
      transform: translateY(-2px);

      background: rgba(48, 157, 197, 0.08);
      color: var(--brand);
    }
  }

  &__more-item--quote {
    background: var(--gradient);
    color: white;

    svg {
      color: white;
    }

    &:hover {
      transform: translateY(-2px) scale(1.02);
      filter: brightness(1.05);
    }
  }
}

/* =========================
   More Menu Animation
========================= */

.more-menu-enter-active,
.more-menu-leave-active {
  transition: all 0.25s ease;
}

.more-menu-enter-from,
.more-menu-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.96);
}

.more-menu-enter-to,
.more-menu-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* =========================
   RTL
========================= */

.mobile-nav--rtl {
  direction: rtl;

  .mobile-nav__inner {
    direction: rtl;
  }

  .mobile-nav__more {
    direction: rtl;
  }

  .mobile-nav__more-item {
    text-align: right;
  }
}

/* =========================
   Hide on Desktop
========================= */

@media (min-width: 1024px) {
  .mobile-nav {
    display: none;
  }
}
</style>