```vue
<template>
  <div
    class="whatsapp-wrapper"
    :class="{ 'whatsapp-wrapper--rtl': locale === 'fa' }"
  >
    <Transition name="bubble">
      <div
        v-if="showBubble && !bubbleDismissed"
        class="whatsapp-bubble"
      >
        <button
          type="button"
          class="whatsapp-bubble__close"
          aria-label="Close"
          @click="closeBubble"
        >
          <Icon name="x" size="14" />
        </button>

        <p>Need help choosing a dental product?</p>
        <span>Chat with us on WhatsApp.</span>
      </div>
    </Transition>

    <a
      :href="whatsappLink"
      class="whatsapp-button"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle :size="30" color="white" />
    </a>
  </div>
</template>

<script setup lang="ts">
import { MessageCircle } from 'lucide-vue-next'

const { locale } = useI18n()

const phone = '37498479980'

const defaultMessage =
  "Hello! I'm interested in your dental products and would like more information."

const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(defaultMessage)}`

const showBubble = ref(false)
const bubbleDismissed = ref(false)

let bubbleTimer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  bubbleTimer = setTimeout(() => {
    if (!bubbleDismissed.value) {
      showBubble.value = true

      hideTimer = setTimeout(() => {
        showBubble.value = false
      }, 6000)
    }
  }, 3000)
})

onBeforeUnmount(() => {
  if (bubbleTimer) {
    clearTimeout(bubbleTimer)
  }

  if (hideTimer) {
    clearTimeout(hideTimer)
  }
})

const closeBubble = () => {
  bubbleDismissed.value = true
  showBubble.value = false
}
</script>

<style scoped lang="scss">
.whatsapp-wrapper {
  position: fixed;
  right: 24px;
  bottom: 104px;
  z-index: 9999;
}

.whatsapp-button {
  position: relative;

  width: 62px;
  height: 62px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  background: #25d366;
  color: #fff;
  text-decoration: none;

  box-shadow:
    0 14px 30px rgba(37, 211, 102, 0.35),
    0 0 0 rgba(37, 211, 102, 0);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  &::after {
    content: '';

    position: absolute;
    inset: -4px;

    border-radius: 50%;

    background: rgba(37, 211, 102, 0.25);

    filter: blur(10px);

    opacity: 0.45;
    z-index: -1;

    transition:
      opacity 0.25s ease,
      transform 0.25s ease,
      filter 0.25s ease;
  }

  &:hover {
    transform: translateY(-4px) scale(1.05);

    box-shadow:
      0 18px 36px rgba(37, 211, 102, 0.45),
      0 0 20px rgba(37, 211, 102, 0.25);

    &::after {
      opacity: 0.8;
      transform: scale(1.15);
      filter: blur(13px);
    }
  }
}

.whatsapp-bubble {
  position: absolute;
  right: 76px;
  bottom: 8px;
  width: 240px;
  padding: 16px 18px;
  border-radius: 18px;
  background: #fff;
  box-shadow: $shadow-lg;

  p {
    margin: 0 28px 5px 0;
    color: $color-gray-900;
    font-size: $text-sm;
    font-weight: $font-semibold;
    line-height: 1.4;
  }

  span {
    display: block;
    color: $color-gray-600;
    font-size: $text-sm;
    line-height: 1.5;
  }

  &__close {
    position: absolute;
    top: 9px;
    right: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: $color-gray-400;
    cursor: pointer;
    transition:
      background-color 0.2s ease,
      color 0.2s ease;

    &:hover {
      background: $color-gray-100;
      color: $color-gray-700;
    }
  }

  &::after {
    content: '';
    position: absolute;
    right: -7px;
    bottom: 18px;
    width: 14px;
    height: 14px;
    background: #fff;
    transform: rotate(45deg);
  }
}

.whatsapp-wrapper--rtl {
  right: auto;
  left: 24px;

  .whatsapp-bubble {
    right: auto;
    left: 76px;

    p {
      margin: 0 0 5px 28px;
      text-align: right;
    }

    span {
      text-align: right;
    }

    &__close {
      right: auto;
      left: 9px;
    }

    &::after {
      right: auto;
      left: -7px;
    }
  }
}

.bubble-enter-active,
.bubble-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.bubble-enter-from,
.bubble-leave-to {
  opacity: 0;
  transform: translateX(12px);
}

.whatsapp-wrapper--rtl {
  .bubble-enter-from,
  .bubble-leave-to {
    transform: translateX(-12px);
  }
}

@include respond-to(sm) {
  .whatsapp-wrapper {
    right: 38px;
    bottom: 38px;
  }

  .whatsapp-button {
    width: 80px;
    height: 80px;

    :deep(svg) {
      width: 40px;
      height: 40px;
    }
  }

  .whatsapp-bubble {
    right: 92px;
    bottom: 0;
    width: 210px;
  }

  .whatsapp-wrapper--rtl {
    right: auto;
    left: 18px;

    .whatsapp-bubble {
      right: auto;
      left: 92px;
    }
  }
}
</style>