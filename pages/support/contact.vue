<template>
  <div class="contact-page">
    <!-- Hero -->
    <section class="contact-page__hero">
      <Container>
        <h1 class="contact-page__title">
          {{ $t('contactPage.hero.title') }}
        </h1>

        <p class="contact-page__description">
          {{ $t('contactPage.hero.description') }}
        </p>
      </Container>
    </section>

    <Container>
      <div class="contact-page__grid">

        <!-- Contact Information -->
        <div class="contact-page__info">
          <h2>{{ $t('contactPage.info.title') }}</h2>

          <p>
            {{ $t('contactPage.info.description') }}
          </p>

          <div class="contact-info">

            <div class="contact-info__item">
              <component :is="PhoneIcon" :size="24" />
              <div>
                <h3>{{ $t('contactPage.info.phone.title') }}</h3>
                <p>+1 (800) 123-4567</p>
              </div>
            </div>

            <div class="contact-info__item">
              <component :is="MailIcon" :size="24" />
              <div>
                <h3>{{ $t('contactPage.info.email.title') }}</h3>
                <p>info@dentaltechpro.com</p>
              </div>
            </div>

            <div class="contact-info__item">
              <component :is="MapPinIcon" :size="24" />
              <div>
                <h3>{{ $t('contactPage.info.address.title') }}</h3>
                <p>
                  123 Dental Technology Lane
                  <br />
                  Innovation City, ST 12345
                </p>
              </div>
            </div>

            <div class="contact-info__item">
              <component :is="ClockIcon" :size="24" />
              <div>
                <h3>{{ $t('contactPage.info.hours.title') }}</h3>
                <p>{{ $t('contactPage.info.hours.value') }}</p>
              </div>
            </div>

          </div>
        </div>

        <!-- Contact Form -->
        <div class="contact-page__form">
          <form class="contact-form" @submit.prevent="handleSubmit">

            <div class="form-group">
              <label for="name">
                {{ $t('contactPage.form.name.label') }} *
              </label>

              <input
                id="name"
                v-model="formData.name"
                type="text"
                required
                :placeholder="$t('contactPage.form.name.placeholder')"
              />
            </div>

            <div class="form-group">
              <label for="company">
                {{ $t('contactPage.form.company.label') }}
              </label>

              <input
                id="company"
                v-model="formData.company"
                type="text"
                :placeholder="$t('contactPage.form.company.placeholder')"
              />
            </div>

            <div class="form-group">
              <label for="email">
                {{ $t('contactPage.form.email.label') }} *
              </label>

              <input
                id="email"
                v-model="formData.email"
                type="email"
                required
                :placeholder="$t('contactPage.form.email.placeholder')"
              />
            </div>

            <div class="form-group">
              <label for="phone">
                {{ $t('contactPage.form.phone.label') }}
              </label>

              <input
                id="phone"
                v-model="formData.phone"
                type="tel"
                :placeholder="$t('contactPage.form.phone.placeholder')"
              />
            </div>

            <div class="form-group">
              <label for="subject">
                {{ $t('contactPage.form.subject.label') }} *
              </label>

              <input
                id="subject"
                v-model="formData.subject"
                type="text"
                required
                :placeholder="$t('contactPage.form.subject.placeholder')"
              />
            </div>

            <div class="form-group">
              <label for="message">
                {{ $t('contactPage.form.message.label') }} *
              </label>

              <textarea
                id="message"
                v-model="formData.message"
                rows="6"
                required
                :placeholder="$t('contactPage.form.message.placeholder')"
              ></textarea>
            </div>

            <Button
              type="submit"
              size="lg"
              :loading="isSubmitting"
            >
              {{ $t('contactPage.form.submit') }}
            </Button>

            <p
              v-if="submitMessage"
              :class="[
                'submit-message',
                submitSuccess ? 'success' : 'error'
              ]"
            >
              {{ submitMessage }}
            </p>

          </form>
        </div>

      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import { Phone as PhoneIcon, Mail as MailIcon, MapPin as MapPinIcon, Clock as ClockIcon } from 'lucide-vue-next'

const formData = reactive({
  name: '',
  company: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitMessage = ref('')
const submitSuccess = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  submitMessage.value = ''

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Mock success response
  submitSuccess.value = true
  submitMessage.value = 'Thank you! We\'ll be in touch soon.'

  // Reset form
  Object.keys(formData).forEach(key => {
    formData[key as keyof typeof formData] = ''
  })

  isSubmitting.value = false

  setTimeout(() => {
    submitMessage.value = ''
  }, 5000)
}

useSeoMeta({
  title: 'Contact Us | DentalTech Pro',
  description: 'Get in touch with our dental technology experts to discuss your digital dentistry needs.',
})
</script>

<style scoped lang="scss">
.contact-page {
  &__hero {
    padding: $space-24 0;
    background: linear-gradient(135deg, lighten($color-primary-600, 45%), lighten($color-secondary-500, 45%));
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

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-16;
    padding: $space-20 0;

    @include respond-to(lg) {
      grid-template-columns: 1fr 1.5fr;
    }
  }

  &__info {
    h2 {
      font-size: $text-3xl;
      font-weight: $font-bold;
      color: $color-gray-900;
      margin-bottom: $space-4;
    }

    p {
      font-size: $text-lg;
      line-height: $leading-relaxed;
      color: $color-gray-700;
      margin-bottom: $space-12;
    }
  }
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: $space-8;

  &__item {
    display: flex;
    gap: $space-4;

    svg {
      color: $color-primary-600;
      flex-shrink: 0;
    }

    h3 {
      font-size: $text-lg;
      font-weight: $font-semibold;
      color: $color-gray-900;
      margin-bottom: $space-2;
    }

    p {
      font-size: $text-base;
      color: $color-gray-600;
      line-height: $leading-relaxed;
      margin: 0;
    }
  }
}

.contact-form {
  background: white;
  padding: $space-12;
  border-radius: $radius-xl;
  box-shadow: $shadow-lg;
  display: flex;
  flex-direction: column;
  gap: $space-6;

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
    textarea {
      padding: $space-3 $space-4;
      border: 1px solid $color-gray-300;
      border-radius: $radius-base;
      font-size: $text-base;
      transition: all $transition-fast;

      &:focus {
        outline: none;
        border-color: $color-primary-600;
        box-shadow: 0 0 0 3px rgba($color-primary-600, 0.1);
      }

      &::placeholder {
        color: $color-gray-400;
      }
    }

    textarea {
      resize: vertical;
      min-height: 120px;
    }
  }

  .submit-message {
    padding: $space-3;
    border-radius: $radius-base;
    text-align: center;
    font-weight: $font-medium;

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
