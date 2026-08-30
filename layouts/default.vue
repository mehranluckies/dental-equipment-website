<template>
  <div>
    <AppHeader />
    <main class="main">
      <slot />
    </main>
    <AppFooter />
    <WhatsAppSticky />
  </div>
</template>

<style scoped lang="scss">
.main {
  min-height: 100vh;
  padding-top: 80px;
}

/* Mobile */
@media (max-width: 1023px) {
  .main {
    padding-top: 0;
    padding-bottom: 80px;
  }
}
</style>
