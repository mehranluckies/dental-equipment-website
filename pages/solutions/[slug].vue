<template>
  <div v-if="solution" class="solution-detail" dir="rtl">
    <!-- Hero -->
    <section class="solution-detail__hero">
      <Container>
        <div class="solution-detail__hero-content">
          <span class="solution-detail__eyebrow">
            {{ $t('solutionsSection.title') }}
          </span>

          <h1 class="solution-detail__title">
            {{ $t(solution.name) }}
          </h1>

          <p class="solution-detail__tagline">
            {{ $t(solution.tagline) }}
          </p>
        </div>
      </Container>
    </section>

    <Container>
      <!-- Overview -->
      <section
        class="solution-detail__section solution-detail__overview"
      >
        <div class="section-content">
          <span class="section-label">01</span>

          <h2>
            {{ $t('solutionsPage.overview') }}
          </h2>

          <p>
            {{ $t(solution.description) }}
          </p>
        </div>
      </section>

      <!-- Challenge -->
      <section
        class="solution-detail__section solution-detail__challenge"
      >
        <div class="section-content">
          <span class="section-label">02</span>

          <h2>
            {{ $t('solutionsPage.challenge') }}
          </h2>

          <p>
            {{ $t(solution.problem) }}
          </p>
        </div>
      </section>

      <!-- Our Solution -->
      <section
        class="solution-detail__section solution-detail__approach"
      >
        <div class="section-content">
          <span class="section-label">03</span>

          <h2>
            {{ $t('solutionsPage.ourSolution') }}
          </h2>

          <p>
            {{ $t(solution.solutionApproach) }}
          </p>
        </div>
      </section>

      <!-- Digital Workflow -->
      <section class="solution-detail__workflow">
        <div class="workflow-header">
          <span class="section-label">04</span>

          <h2>
            {{ $t('solutionsPage.digitalWorkflow') }}
          </h2>

          <p>
            {{ $t('solutionsPage.workflowDescription') }}
          </p>
        </div>

        <div class="workflow-steps">
          <div
            v-for="step in solution.workflow"
            :key="step.order"
            class="workflow-step"
          >
            <div class="workflow-step__top">
              <div class="workflow-step__number">
                {{ step.order }}
              </div>

              <div class="workflow-step__line"></div>
            </div>

            <div class="workflow-step__content">
              <h3>
                {{ $t(step.title) }}
              </h3>

              <p>
                {{ $t(step.description) }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Benefits -->
      <section
        class="solution-detail__section solution-detail__benefits"
      >
        <div class="benefits-header">
          <span class="section-label">05</span>

          <h2>
            {{ $t('solutionsPage.keyBenefits') }}
          </h2>
        </div>

        <ul class="benefits-list">
          <li
            v-for="benefit in solution.benefits"
            :key="benefit"
          >
            <div class="benefit-icon">
              <CheckIcon :size="18" />
            </div>

            <span>
              {{ $t(benefit) }}
            </span>
          </li>
        </ul>
      </section>

      <!-- Products -->
      <section
        v-if="recommendedProducts.length"
        class="solution-detail__section solution-detail__products"
      >
        <div class="products-header">
          <span class="section-label">06</span>

          <h2>
            {{ $t('solutionsPage.recommendedProducts') }}
          </h2>

          <p>
            {{ $t('solutionsPage.recommendedProductsDescription') }}
          </p>
        </div>

        <div class="products-grid">
          <ProductCard
            v-for="product in recommendedProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </section>

      <!-- CTA -->
      <section class="solution-detail__cta">
        <div class="cta-box">
          <div class="cta-content">
            <span class="cta-label">
              {{ $t('solutionsPage.getStarted') }}
            </span>

            <h2>
              {{ $t('solutionsPage.readyTitle') }}
            </h2>

            <p>
              {{ $t('solutionsPage.readyDescription') }}
            </p>
          </div>

          <div class="cta-actions">
            <Button
              size="lg"
              tag="NuxtLink"
              to="/request-quote"
            >
              {{ $t('nav.requestQuote') }}
            </Button>

            <Button
              size="lg"
              variant="outline"
              tag="NuxtLink"
              to="/support/contact"
            >
              {{ $t('nav.contact') }}
            </Button>
          </div>
        </div>
      </section>
    </Container>
  </div>

  <!-- Not Found -->
  <div
    v-else
    class="solution-not-found"
    dir="rtl"
  >
    <Container>
      <div class="solution-not-found__content">
        <h1>
          {{ $t('solutionsPage.notFoundTitle') }}
        </h1>

        <p>
          {{ $t('solutionsPage.notFoundDescription') }}
        </p>

        <Button
          tag="NuxtLink"
          to="/solutions"
        >
          {{ $t('solutionsPage.backToSolutions') }}
        </Button>
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import { Check as CheckIcon } from 'lucide-vue-next'
import { solutions } from '~/data/solutions'
import { products } from '~/data/products'

const route = useRoute()
const { t } = useI18n()

const solution = computed(() => {
  const slug = String(route.params.slug || '')

  return solutions.find(
    (item) => item.slug === slug
  )
})

const recommendedProducts = computed(() => {
  if (!solution.value) {
    return []
  }

  return products.filter((product) =>
    solution.value!.productIds.includes(product.id)
  )
})

useSeoMeta({
  title: () => {
    if (!solution.value) {
      return t('solutionsPage.notFoundTitle')
    }

    return `${t(solution.value.name)} | DentalTech Pro`
  },

  description: () => {
    if (!solution.value) {
      return t('solutionsPage.notFoundDescription')
    }

    return t(solution.value.description)
  }
})
</script>

<style scoped lang="scss">
.solution-detail {
  min-height: 100vh;
  background: #ffffff;

  /* =========================
     HERO
  ========================= */

  &__hero {
    position: relative;
    overflow: hidden;
    padding: 80px 20px;

    background:
      radial-gradient(
        circle at 20% 20%,
        rgba(26, 75, 69, 0.12),
        transparent 35%
      ),
      radial-gradient(
        circle at 80% 80%,
        rgba(180, 149, 83, 0.12),
        transparent 35%
      ),
      linear-gradient(
        135deg,
        #edf5f3,
        #f8f4ea
      );

    border-bottom: 1px solid #e5e7eb;
    text-align: center;

    @include respond-to(md) {
      padding: 110px 20px;
    }
  }

  &__hero-content {
    max-width: 900px;
    margin: 0 auto;
  }

  &__eyebrow {
    display: inline-flex;
    align-items: center;
    margin-bottom: 20px;
    padding: 8px 16px;
    border-radius: 999px;

    background: rgba(26, 75, 69, 0.08);
    color: #1a4b45;

    font-size: 14px;
    font-weight: 600;
  }

  &__title {
    margin: 0 0 20px;
    color: #111827;

    font-size: 36px;
    font-weight: 700;
    line-height: 1.25;

    @include respond-to(md) {
      font-size: 48px;
    }

    @include respond-to(lg) {
      font-size: 56px;
    }
  }

  &__tagline {
    max-width: 750px;
    margin: 0 auto;

    color: #1a4b45;

    font-size: 20px;
    font-weight: 500;
    line-height: 1.8;

    @include respond-to(md) {
      font-size: 24px;
    }
  }

  /* =========================
     GENERAL SECTIONS
  ========================= */

  &__section {
    padding: 64px 20px;

    @include respond-to(md) {
      padding: 80px 20px;
    }
  }

  .section-content {
    max-width: 850px;
    margin: 0 auto;
  }

  .section-label {
    display: block;
    margin-bottom: 12px;

    color: #1a4b45;

    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.08em;
  }

  h2 {
    margin: 0 0 20px;

    color: #111827;

    font-size: 28px;
    font-weight: 700;
    line-height: 1.4;

    @include respond-to(md) {
      font-size: 34px;
    }
  }

  p {
    margin: 0;

    color: #374151;

    font-size: 18px;
    line-height: 2;

    @include respond-to(md) {
      font-size: 20px;
    }
  }

  /* =========================
     OVERVIEW
  ========================= */

  &__overview {
    padding-top: 90px;

    @include respond-to(md) {
      padding-top: 110px;
    }
  }

  /* =========================
     CHALLENGE
  ========================= */

  &__challenge {
    border-top: 1px solid #e5e7eb;
  }

  /* =========================
     APPROACH
  ========================= */

  &__approach {
    border-top: 1px solid #e5e7eb;
  }

  /* =========================
     WORKFLOW
  ========================= */

  &__workflow {
    margin: 40px 20px;
    padding: 40px 24px;

    background: #f8faf9;

    border: 1px solid #e5e7eb;
    border-radius: 24px;

    @include respond-to(md) {
      padding: 56px 40px;
    }

    @include respond-to(lg) {
      padding: 64px;
    }
  }

  /* =========================
     BENEFITS
  ========================= */

  &__benefits {
    max-width: 890px;
    margin: 0 auto;
  }

  /* =========================
     PRODUCTS
  ========================= */

  &__products {
    border-top: 1px solid #e5e7eb;
  }

  /* =========================
     CTA
  ========================= */

  &__cta {
    padding: 64px 20px 100px;

    @include respond-to(md) {
      padding: 80px 20px 120px;
    }
  }
}

/* =====================================
   WORKFLOW HEADER
===================================== */

.workflow-header {
  max-width: 800px;
  margin-bottom: 40px;
}

.workflow-header p {
  font-size: 16px;

  @include respond-to(md) {
    font-size: 18px;
  }
}

/* =====================================
   WORKFLOW STEPS
===================================== */

.workflow-steps {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @include respond-to(md) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to(lg) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.workflow-step {
  position: relative;

  padding: 24px;

  background: #ffffff;

  border: 1px solid #e5e7eb;
  border-radius: 18px;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);

    box-shadow:
      0 12px 30px rgba(0, 0, 0, 0.07);
  }

  &__top {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  &__number {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 44px;
    height: 44px;

    flex-shrink: 0;

    border-radius: 50%;

    background: #1a4b45;
    color: #ffffff;

    font-size: 18px;
    font-weight: 700;
  }

  &__line {
    flex: 1;

    height: 1px;

    margin-right: 16px;

    background: #e5e7eb;
  }

  &__content {
    h3 {
      margin: 0 0 12px;

      color: #111827;

      font-size: 20px;
      font-weight: 600;
      line-height: 1.5;
    }

    p {
      color: #6b7280;

      font-size: 16px;
      line-height: 1.8;
    }
  }
}

/* =====================================
   BENEFITS
===================================== */

.benefits-header {
  margin-bottom: 32px;
}

.benefits-list {
  display: flex;
  flex-direction: column;

  gap: 8px;

  margin: 0;
  padding: 0;

  list-style: none;

  li {
    display: flex;
    align-items: flex-start;

    gap: 16px;

    padding: 16px;

    border-radius: 12px;

    transition:
      background 0.2s ease;

    &:hover {
      background: #f8faf9;
    }
  }
}

.benefit-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 34px;
  height: 34px;

  flex-shrink: 0;

  margin-top: 2px;

  border-radius: 50%;

  background: rgba(34, 197, 94, 0.1);
  color: #16a34a;
}

.benefits-list span {
  color: #374151;

  font-size: 18px;
  line-height: 1.8;
}

/* =====================================
   PRODUCTS
===================================== */

.products-header {
  max-width: 800px;
  margin-bottom: 40px;
}

.products-header p {
  font-size: 16px;

  @include respond-to(md) {
    font-size: 18px;
  }
}

.products-grid {
  display: grid;

  grid-template-columns: 1fr;

  gap: 24px;

  @include respond-to(md) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to(lg) {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* =====================================
   CTA
===================================== */

.cta-box {
  max-width: 950px;

  margin: 0 auto;
  padding: 40px 24px;

  border-radius: 24px;

  background:
    linear-gradient(
      135deg,
      #1a4b45,
      #b49553
    );

  color: #ffffff;

  text-align: center;

  @include respond-to(md) {
    padding: 56px 48px;
  }
}

.cta-content {
  max-width: 700px;

  margin: 0 auto 32px;
}

.cta-label {
  display: inline-block;

  margin-bottom: 16px;

  font-size: 14px;
  font-weight: 600;

  opacity: 0.85;
}

.cta-box h2 {
  margin-bottom: 16px;

  color: #ffffff;

  font-size: 28px;

  @include respond-to(md) {
    font-size: 34px;
  }
}

.cta-box p {
  color: #ffffff;

  font-size: 16px;

  opacity: 0.9;

  @include respond-to(md) {
    font-size: 18px;
  }
}

.cta-actions {
  display: flex;

  flex-wrap: wrap;

  align-items: center;
  justify-content: center;

  gap: 16px;

  :deep(.btn--outline) {
    background: #ffffff;

    color: #1a4b45;

    border-color: #ffffff;

    &:hover {
      background: transparent;

      color: #ffffff;

      border-color: #ffffff;
    }
  }
}

/* =====================================
   NOT FOUND
===================================== */

.solution-not-found {
  min-height: 70vh;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 40px 20px;

  text-align: center;
}

.solution-not-found__content {
  max-width: 600px;

  margin: 0 auto;
}

.solution-not-found h1 {
  margin-bottom: 16px;

  color: #111827;

  font-size: 32px;
  font-weight: 700;
}

.solution-not-found p {
  margin-bottom: 32px;

  color: #6b7280;

  font-size: 18px;
  line-height: 1.8;
}
</style>