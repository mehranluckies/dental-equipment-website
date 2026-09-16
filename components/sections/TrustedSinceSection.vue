<template>
    <section class="trusted-section">
        <Container>
            <!-- Loading -->
            <div v-if="loading" class="trusted-section__loading">
                <div class="trusted-section__spinner"></div>
            </div>

            <!-- Content -->
            <div v-else-if="trust" class="trusted-section__grid">
                <!-- Left Content -->
                <div class="trusted-section__content">
                    <span class="trusted-section__eyebrow">
                        {{ trust.eyebrow }}
                    </span>

                    <h2 class="trusted-section__title">
                        {{ trust.title }}
                    </h2>

                    <p class="trusted-section__description">
                        {{ trust.description }}
                    </p>

                    <!-- Stats -->
                    <div class="trusted-section__stats">
                        <div class="stat-card">
                            <span class="stat-card__number">
                                {{ counts[0] }}+
                            </span>

                            <span class="stat-card__label">
                                {{ t('homeTrust.stats.yearsExperience') }}
                            </span>
                        </div>

                        <div class="stat-card">
                            <span class="stat-card__number">
                                {{ counts[1] }}
                            </span>

                            <span class="stat-card__label">
                                {{ t('homeTrust.stats.since') }}
                            </span>
                        </div>

                        <div class="stat-card">
                            <span class="stat-card__number">
                                {{ counts[2] }}+
                            </span>

                            <span class="stat-card__label">
                                {{ t('homeTrust.stats.productsImported') }}
                            </span>
                        </div>

                        <div class="stat-card">
                            <span class="stat-card__number">
                                {{ counts[3] }}+
                            </span>

                            <span class="stat-card__label">
                                {{ t('homeTrust.stats.distributionPartners') }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Right Image -->
                <div class="trusted-section__image-wrapper">
                    <img :src="trust.image" :alt="trust.title" class="trusted-section__image" />
                </div>
            </div>
        </Container>
    </section>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

const { trust, loading, fetchHomeTrust } = useHomeTrust()
const { locale, t } = useI18n()

const counts = ref<number[]>([0, 0, 0, 0])
const started = ref(false)

const animateCounters = () => {
    if (started.value || !trust.value) return

    started.value = true

    const stats = [
        {
            value: trust.value.years
        },
        {
            value: trust.value.sinceYear
        },
        {
            value: trust.value.products
        },
        {
            value: trust.value.distributors
        }
    ]

    stats.forEach((stat, index) => {
        const duration = 1800
        const startTime = performance.now()

        const animate = (currentTime: number) => {
            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            )

            // Ease-out animation
            const eased = 1 - Math.pow(1 - progress, 3)

            counts.value[index] = Math.floor(
                eased * stat.value
            )

            if (progress < 1) {
                requestAnimationFrame(animate)
            } else {
                counts.value[index] = stat.value
            }
        }

        requestAnimationFrame(animate)
    })
}

await fetchHomeTrust()

watch(
    () => trust.value,
    async value => {
        if (!value) return

        started.value = false
        counts.value = [0, 0, 0, 0]

        await nextTick()

        animateCounters()
    },
    {
        immediate: true
    }
)

watch(
    locale,
    async () => {
        started.value = false
        counts.value = [0, 0, 0, 0]

        await fetchHomeTrust()

        await nextTick()

        animateCounters()
    }
)
</script>

<style scoped lang="scss">
.trusted-section {
    padding: $space-24 0;
    background: #f8f9fb;

    &__grid {
        display: grid;
        grid-template-columns: 1.05fr 0.95fr;
        gap: $space-12;
        align-items: center;
    }

    &__content {
        display: flex;
        flex-direction: column;
        gap: $space-4;
    }

    &__eyebrow {
        display: inline-flex;
        width: fit-content;
        padding: 6px 14px;
        border-radius: 999px;
        background: rgba($color-primary-600, 0.08);
        color: $color-primary-600;
        font-size: $text-xs;
        font-weight: $font-semibold;
        text-transform: uppercase;
        letter-spacing: 0.08em;
    }

    &__title {
        margin: 0;
        color: $color-gray-900;
        font-size: clamp(2rem, 3vw, 3rem);
        font-weight: $font-bold;
        line-height: 1.15;
        max-width: 14ch;
    }

    &__description {
        margin: 0;
        color: $color-gray-700;
        font-size: $text-base;
        line-height: 1.9;
        max-width: 620px;
        white-space: pre-line;
    }

    &__stats {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: $space-4;
        margin-top: $space-4;
    }

    &__image-wrapper {
        overflow: hidden;
        border-radius: $radius-2xl;
        background: white;
        box-shadow: $shadow-xl;
    }

    &__image {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        aspect-ratio: 4 / 5;
    }

    &__loading {
        min-height: 420px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__spinner {
        width: 44px;
        height: 44px;
        border: 3px solid $color-gray-200;
        border-top-color: $color-primary-600;
        border-radius: 50%;
        animation: trusted-spin 0.8s linear infinite;
    }
}

.stat-card {
    padding: $space-4;
    border: 1px solid $color-gray-200;
    border-radius: $radius-xl;
    background: white;
    box-shadow: $shadow-sm;
    transition:
        transform 0.25s ease,
        border-color 0.25s ease,
        box-shadow 0.25s ease;

    &:hover {
        transform: translateY(-4px);
        border-color: rgba($color-primary-600, 0.15);
        box-shadow: $shadow-base;
    }

    &__number {
        display: block;
        margin-bottom: $space-2;
        color: $color-primary-600;
        font-size: clamp(1.6rem, 2.5vw, 2.2rem);
        font-weight: $font-bold;
        line-height: 1;
    }

    &__label {
        color: $color-gray-600;
        font-size: $text-sm;
        line-height: 1.5;
    }
}

:global(html[dir='rtl']) {
    .trusted-section {
        &__content {
            text-align: right;
        }

        &__eyebrow {
            align-self: flex-start;
        }
    }
}

@media (max-width: 1024px) {
    .trusted-section {
        padding: $space-20 0;

        &__grid {
            grid-template-columns: 1fr;
            gap: $space-8;
        }

        &__content {
            order: 2;
            text-align: center;
            align-items: center;
        }

        &__title {
            max-width: 100%;
        }

        &__description {
            max-width: 100%;
        }

        &__image-wrapper {
            order: 1;
        }
    }

    :global(html[dir='rtl']) {
        .trusted-section {
            &__content {
                text-align: center;
                align-items: center;
            }
        }
    }
}

@media (max-width: 640px) {
    .trusted-section {
        padding: $space-16 0;

        &__stats {
            grid-template-columns: repeat(2, 1fr);
            gap: $space-3;
            width: 100%;
        }

        &__title {
            font-size: 2rem;
        }
    }

    .stat-card {
        padding: $space-4;

        &__number {
            font-size: 1.6rem;
        }

        &__label {
            font-size: $text-xs;
        }
    }
}

@keyframes trusted-spin {
    to {
        transform: rotate(360deg);
    }
}
</style>