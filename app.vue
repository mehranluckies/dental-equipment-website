<template>
  <div>
    <NuxtLoadingIndicator
      color="#1A4B45"
      :height="3"
      :duration="2000"
      :throttle="100"
    />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>