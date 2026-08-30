```vue
<template>
  <div class="request-quote-page">
    <!-- Hero -->
    <section class="request-quote-page__hero">
      <Container>
        <h1 class="request-quote-page__title">
          {{ $t('requestQuotePage.hero.title') }}
        </h1>

        <p class="request-quote-page__description">
          {{ $t('requestQuotePage.hero.description') }}
        </p>
      </Container>
    </section>

    <!-- Form -->
    <Container>
      <div class="request-quote-page__content">
        <form class="quote-form" @submit.prevent="handleSubmit">
          <!-- Your Information -->
          <h2>
            {{ $t('requestQuotePage.form.yourInformation') }}
          </h2>

          <div class="form-row">
            <!-- Name -->
            <div class="form-group">
              <label for="name">
                {{ $t('requestQuotePage.form.name.label') }}
              </label>

              <input id="name" v-model="formData.name" type="text" required
                :placeholder="$t('requestQuotePage.form.name.placeholder')" />
            </div>

            <!-- Company -->
            <div class="form-group">
              <label for="company">
                {{ $t('requestQuotePage.form.company.label') }}
              </label>

              <input id="company" v-model="formData.company" type="text" required
                :placeholder="$t('requestQuotePage.form.company.placeholder')" />
            </div>
          </div>

          <div class="form-row">
            <!-- Email -->
            <div class="form-group">
              <label for="email">
                {{ $t('requestQuotePage.form.email.label') }}
              </label>

              <input id="email" v-model="formData.email" type="email" required
                :placeholder="$t('requestQuotePage.form.email.placeholder')" />
            </div>

            <!-- Phone -->
            <div class="form-group">
              <label for="phone">
                {{ $t('requestQuotePage.form.phone.label') }}
              </label>

              <input id="phone" v-model="formData.phone" type="tel" required
                :placeholder="$t('requestQuotePage.form.phone.placeholder')" />
            </div>
          </div>

          <!-- Country -->
          <div class="form-group">
            <label for="country">
              {{ $t('requestQuotePage.form.country.label') }}
            </label>

            <input id="country" v-model="formData.country" type="text" required
              :placeholder="$t('requestQuotePage.form.country.placeholder')" />
          </div>

          <!-- Product Interest -->
          <h2>
            {{ $t('requestQuotePage.form.productInterest') }}
          </h2>

          <!-- Products -->
          <div class="form-group">
            <label for="products">
              {{ $t('requestQuotePage.form.products.label') }}
            </label>

            <textarea id="products" v-model="formData.products" required rows="4"
              :placeholder="$t('requestQuotePage.form.products.placeholder')"></textarea>
          </div>

          <!-- Quantity -->
          <div class="form-group">
            <label for="quantity">
              {{ $t('requestQuotePage.form.quantity.label') }}
            </label>

            <input id="quantity" v-model="formData.quantity" type="text"
              :placeholder="$t('requestQuotePage.form.quantity.placeholder')" />
          </div>

          <!-- Timeline -->
          <div class="form-group">
            <label for="timeline">
              {{ $t('requestQuotePage.form.timeline.label') }}
            </label>

            <select id="timeline" v-model="formData.timeline">
              <option value="">
                {{ $t('requestQuotePage.form.timeline.placeholder') }}
              </option>

              <option value="immediate">
                {{ $t('requestQuotePage.form.timeline.options.immediate') }}
              </option>

              <option value="1-3months">
                {{ $t('requestQuotePage.form.timeline.options.oneToThree') }}
              </option>

              <option value="3-6months">
                {{ $t('requestQuotePage.form.timeline.options.threeToSix') }}
              </option>

              <option value="6months+">
                {{ $t('requestQuotePage.form.timeline.options.sixPlus') }}
              </option>
            </select>
          </div>

          <!-- Additional Information -->
          <div class="form-group">
            <label for="message">
              {{ $t('requestQuotePage.form.message.label') }}
            </label>

            <textarea id="message" v-model="formData.message" rows="6"
              :placeholder="$t('requestQuotePage.form.message.placeholder')"></textarea>
          </div>

          <!-- Submit -->
          <Button type="submit" size="lg" :loading="isSubmitting">
            {{ $t('requestQuotePage.form.submit') }}
          </Button>

          <!-- Submit Message -->
          <p v-if="submitMessage" :class="[
            'submit-message',
            submitSuccess ? 'success' : 'error'
          ]">
            {{ submitMessage }}
          </p>
        </form>
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const formData = reactive({
  name: '',
  company: '',
  email: '',
  phone: '',
  country: '',
  products: '',
  quantity: '',
  timeline: '',
  message: ''
})

const isSubmitting = ref(false)
const submitMessage = ref('')
const submitSuccess = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  submitMessage.value = ''
  submitSuccess.value = false

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    submitSuccess.value = true
    submitMessage.value = t(
      'requestQuotePage.form.messages.success'
    )

    Object.keys(formData).forEach((key) => {
      formData[key as keyof typeof formData] = ''
    })

    setTimeout(() => {
      submitMessage.value = ''
    }, 5000)
  } catch (error) {
    submitSuccess.value = false

    submitMessage.value = t(
      'requestQuotePage.form.messages.error'
    )
  } finally {
    isSubmitting.value = false
  }
}

useSeoMeta({
  title: () =>
    `${t('requestQuotePage.seo.title')} | DentalTech Pro`,

  description: () =>
    t('requestQuotePage.seo.description')
})
</script>

<style scoped lang="scss">
.request-quote-page {
  &__hero {
    padding: $space-24 0;
    background: linear-gradient(135deg,
        lighten($color-primary-600, 45%),
        lighten($color-secondary-500, 45%));
    text-align: center;
  }

  &__title {
    font-size: $text-4xl;
    font-weight: $font-bold;
    color: $color-gray-900;
    margin-bottom: $space-4;

    @include respond-to(md) {
      font-size: $text-5xl;
    }
  }

  &__description {
    font-size: $text-xl;
    color: $color-gray-700;
  }

  &__content {
    padding: $space-20 0;
    max-width: 800px;
    margin: 0 auto;
  }
}

.quote-form {
  background: white;
  padding: $space-12;
  border-radius: $radius-xl;
  box-shadow: $shadow-lg;

  display: flex;
  flex-direction: column;
  gap: $space-8;

  h2 {
    font-size: $text-2xl;
    font-weight: $font-semibold;
    color: $color-gray-900;

    padding-bottom: $space-4;
    border-bottom: 2px solid $color-gray-200;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-6;

    @include respond-to(md) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: $space-2;

    label {
      font-weight: $font-medium;
      color: $color-gray-900;
      font-size: $text-sm;
    }

    input,
    textarea,
    select {
      padding: $space-3 $space-4;

      border: 1px solid $color-gray-300;
      border-radius: $radius-base;

      font-size: $text-base;

      transition: all $transition-fast;

      &:focus {
        outline: none;
        border-color: $color-primary-600;

        box-shadow: 0 0 0 3px rgba($color-primary-600,
            0.1);
      }

      &::placeholder {
        color: $color-gray-400;
      }
    }

    textarea {
      resize: vertical;
    }

    select {
      cursor: pointer;
      background: white;
    }
  }

  .submit-message {
    padding: $space-4;
    border-radius: $radius-base;

    text-align: center;
    font-weight: $font-medium;
    line-height: $leading-relaxed;

    &.success {
      background: lighten($color-success, 45%);
      color: darken($color-success, 10%);
    }

    &.error {
      background: lighten($color-error, 45%);
      color: darken($color-error, 10%);
    }
  }
}
</style>
