<template>
    <section class="categories-section">
        <Container>
            <div class="categories-section__header">
                <div class="categories-section__heading">
                    <span class="categories-section__eyebrow">
                        {{ t('homeCategories.eyebrow') }}
                    </span>

                    <h2 class="categories-section__title">
                        {{ t('homeCategories.title') }}
                    </h2>

                    <p class="categories-section__description">
                        {{ t('homeCategories.description') }}
                    </p>
                </div>

                <NuxtLink :to="localePath('/products')" class="categories-section__view-all">
                    <span>
                        {{ t('homeCategories.viewAll') }}
                    </span>

                    <span class="categories-section__arrow">
                        →
                    </span>
                </NuxtLink>
            </div>

            <!-- Loading -->
            <div v-if="loading" class="categories-section__loading">
                <div v-for="index in 6" :key="index" class="category-skeleton">
                    <div class="category-skeleton__image"></div>

                    <div class="category-skeleton__content">
                        <div class="category-skeleton__title"></div>
                        <div class="category-skeleton__count"></div>
                    </div>
                </div>
            </div>

            <!-- Categories -->
            <div v-else-if="categories.length" class="categories-grid">
                <NuxtLink v-for="category in categories.slice(0, 3)" :key="category.id"
                    :to="localePath(`/products/${category.slug}`)" class="category-card">
                    <!-- Image -->
                    <div class="category-card__image-wrapper">
                        <img v-if="category.image" :src="category.image" :alt="category.name"
                            class="category-card__image" loading="lazy" />

                        <div v-else class="category-card__placeholder">
                            <span class="category-card__placeholder-text">
                                {{ category.name.charAt(0) }}
                            </span>
                        </div>

                        <!-- Icon فقط اگر string واقعی باشد -->
                        <div v-if="category.icon" class="category-card__icon-badge">
                            <span v-if="isSvgIcon(category.icon)" class="category-card__icon"
                                v-html="category.icon"></span>

                            <span v-else class="category-card__icon-text">
                                {{ category.icon }}
                            </span>
                        </div>

                        <div class="category-card__overlay"></div>
                    </div>

                    <!-- Content -->
                    <div class="category-card__content">
                        <div class="category-card__text">
                            <h3 class="category-card__name">
                                {{ category.name }}
                            </h3>

                            <span class="category-card__count">
                                {{
                                    t('homeCategories.productCount', {
                                        count: category.productCount
                                })
                                }}
                            </span>
                        </div>

                        <span class="category-card__arrow">
                            →
                        </span>
                    </div>
                </NuxtLink>
            </div>

            <!-- Empty -->
            <div v-else class="categories-section__empty">
                <p>
                    {{ t('homeCategories.empty') }}
                </p>
            </div>
        </Container>
    </section>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const config = useRuntimeConfig()

interface StrapiMedia {
    id: number
    documentId: string
    url: string
    alternativeText?: string | null
}

interface StrapiCategory {
    id: number
    documentId: string
    name: string
    slug: string

    /**
     * Strapi ممکن است icon را string یا object برگرداند.
     */
    icon?: unknown

    image?: StrapiMedia | null
}

interface StrapiProduct {
    id: number
    documentId: string

    Category?: {
        id: number
        documentId: string
    } | null
}

interface StrapiCategoryResponse {
    data: StrapiCategory[]
}

interface StrapiProductResponse {
    data: StrapiProduct[]
}

interface HomeCategory {
    id: number
    name: string
    slug: string
    icon: string
    image: string
    productCount: number
}

const categories = ref<HomeCategory[]>([])
const loading = ref(false)
const error = ref<Error | null>(null)

/**
 * تبدیل URL مدیا Strapi
 */
const getMediaUrl = (
    media?: StrapiMedia | null
) => {
    if (!media?.url) {
        return ''
    }

    return media.url.startsWith('http')
        ? media.url
        : `${config.public.strapiUrl}${media.url}`
}

/**
 * فقط SVG/String واقعی را قبول می‌کنیم.
 * اگر Strapi object برگرداند، دیگر [object Object] نمایش داده نمی‌شود.
 */
const normalizeIcon = (icon: unknown): string => {
    if (typeof icon !== 'string') {
        return ''
    }

    const value = icon.trim()

    if (!value) {
        return ''
    }

    return value
}

/**
 * بررسی می‌کند که icon واقعاً SVG است یا نه.
 */
const isSvgIcon = (icon: string): boolean => {
    const value = icon.trim().toLowerCase()

    return (
        value.startsWith('<svg') ||
        value.includes('<svg')
    )
}

/**
 * دریافت دسته‌بندی‌ها و تعداد محصولات
 */
const fetchCategories = async () => {
    loading.value = true
    error.value = null

    try {
        const [
            categoryResponse,
            productResponse
        ] = await Promise.all([
            $fetch<StrapiCategoryResponse>(
                `${config.public.strapiUrl}/api/product-categories`,
                {
                    query: {
                        populate: '*',
                        locale: locale.value
                    }
                }
            ),

            $fetch<StrapiProductResponse>(
                `${config.public.strapiUrl}/api/products`,
                {
                    query: {
                        populate: '*',
                        locale: locale.value
                    }
                }
            )
        ])

        const products =
            productResponse.data || []

        categories.value = (
            categoryResponse.data || []
        ).map(category => {
            const productCount =
                products.filter(
                    product =>
                        product.Category?.documentId ===
                        category.documentId
                ).length

            return {
                id: category.id,
                name: category.name,
                slug: category.slug,
                icon: normalizeIcon(category.icon),
                image: getMediaUrl(category.image),
                productCount
            }
        })
    } catch (err) {
        error.value =
            err instanceof Error
                ? err
                : new Error(
                    'Failed to fetch product categories'
                )

        categories.value = []
    } finally {
        loading.value = false
    }
}

await fetchCategories()

/**
 * تغییر زبان
 */
watch(
    locale,
    async () => {
        await fetchCategories()
    }
)
</script>

<style scoped lang="scss">
.categories-section {
    padding: $space-24 0;
    background: $color-surface;

    &__header {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: $space-8;
        margin-bottom: $space-8;
    }

    &__heading {
        max-width: 720px;
    }

    &__eyebrow {
        display: inline-flex;
        width: fit-content;
        margin-bottom: $space-3;
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
        margin: 0 0 $space-3;
        color: $color-gray-900;
        font-size: clamp(2rem, 3vw, 3rem);
        font-weight: $font-bold;
        line-height: 1.15;
    }

    &__description {
        margin: 0;
        color: $color-gray-600;
        font-size: $text-base;
        line-height: 1.8;
        max-width: 650px;
    }

    &__view-all {
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
        gap: $space-2;
        color: $color-primary-600;
        font-size: $text-sm;
        font-weight: $font-semibold;
        text-decoration: none;
        transition:
            color $transition-fast,
            gap $transition-fast;

        &:hover {
            gap: $space-3;
            color: $color-primary-600;
        }
    }

    &__arrow {
        font-size: 1.1rem;
        line-height: 1;
    }

    &__loading {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: $space-4;
    }

    &__empty {
        padding: $space-12;
        text-align: center;
        color: $color-gray-500;
    }
}

.categories-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $space-4;
}

.category-card {
    position: relative;
    display: block;
    overflow: hidden;
    border: 1px solid $color-gray-200;
    border-radius: $radius-xl;
    background: white;
    text-decoration: none;
    box-shadow: $shadow-sm;
    transition:
        transform $transition-base,
        box-shadow $transition-base,
        border-color $transition-base;

    &:hover {
        transform: translateY(-6px);
        border-color: rgba($color-primary-600, 0.15);
        box-shadow: $shadow-xl;

        .category-card__image {
            transform: scale(1.06);
        }

        .category-card__overlay {
            opacity: 0.35;
        }

        .category-card__arrow {
            transform: translateX(4px);
        }
    }

    &__image-wrapper {
        position: relative;
        overflow: hidden;
        aspect-ratio: 16 / 10;
        background: $color-gray-100;
    }

    &__image {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        transition: transform 0.5s ease;
    }

    &__placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background:
            linear-gradient(135deg,
                rgba($color-primary-600, 0.08),
                rgba($color-primary-300, 0.14));
    }

    &__placeholder-text {
        color: $color-primary-600;
        font-size: 3rem;
        font-weight: $font-bold;
    }

    &__icon-badge {
        position: absolute;
        left: $space-4;
        bottom: $space-4;
        z-index: 2;

        width: 46px;
        height: 46px;

        display: flex;
        align-items: center;
        justify-content: center;

        border-radius: $radius-lg;

        background: rgba(255, 255, 255, 0.94);
        color: $color-primary-600;

        box-shadow: $shadow-base;

        backdrop-filter: blur(8px);
    }

    &__icon {
        width: 22px;
        height: 22px;

        display: flex;
        align-items: center;
        justify-content: center;

        color: $color-primary-600;

        :deep(svg) {
            width: 22px;
            height: 22px;
            display: block;
        }
    }

    &__icon-text {
        color: $color-primary-600;
        font-size: 1rem;
        font-weight: $font-semibold;
    }

    &__overlay {
        position: absolute;
        inset: 0;

        background:
            linear-gradient(to bottom,
                transparent 45%,
                rgba(0, 0, 0, 0.45));

        opacity: 0.2;

        transition: opacity $transition-base;
    }

    &__content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: $space-4;
        padding: $space-4;
    }

    &__text {
        min-width: 0;
    }

    &__name {
        margin: 0 0 $space-2;

        overflow: hidden;

        color: $color-gray-900;

        font-size: $text-lg;
        font-weight: $font-semibold;
        line-height: 1.35;

        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &__count {
        display: block;
        color: $color-gray-500;
        font-size: $text-sm;
    }

    &__arrow {
        flex-shrink: 0;

        color: $color-primary-600;

        font-size: 1.25rem;
        line-height: 1;

        transition: transform $transition-fast;
    }
}

.category-skeleton {
    overflow: hidden;

    border: 1px solid $color-gray-200;
    border-radius: $radius-xl;

    background: white;

    &__image {
        aspect-ratio: 16 / 10;

        background: $color-gray-100;

        animation:
            category-skeleton-pulse 1.5s ease-in-out infinite;
    }

    &__content {
        padding: $space-4;
    }

    &__title {
        width: 60%;
        height: 20px;

        margin-bottom: $space-3;

        border-radius: $radius-base;
        background: $color-gray-100;

        animation:
            category-skeleton-pulse 1.5s ease-in-out infinite;
    }

    &__count {
        width: 35%;
        height: 14px;

        border-radius: $radius-base;
        background: $color-gray-100;

        animation:
            category-skeleton-pulse 1.5s ease-in-out infinite;
    }
}

/* RTL */
:global(html[dir='rtl']) {
    .categories-section {
        direction: rtl;

        &__header {
            text-align: right;
        }

        &__heading {
            text-align: right;
        }

        &__view-all {
            flex-direction: row;
        }
    }

    .category-card {
        direction: rtl;

        &__icon-badge {
            left: auto;
            right: $space-4;
        }

        &__content {
            text-align: right;
        }
    }
}

/* Tablet */
@media (max-width: 1024px) {
    .categories-section {
        padding: $space-20 0;

        &__header {
            align-items: flex-start;
        }
    }

    .categories-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .categories-section__loading {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Mobile */
@media (max-width: 640px) {
    .categories-section {
        padding: $space-16 0;

        &__header {
            flex-direction: column;
            gap: $space-4;
            margin-bottom: $space-8;
        }

        &__title {
            font-size: 2rem;
        }

        &__description {
            font-size: $text-sm;
        }

        &__view-all {
            align-self: flex-start;
        }
    }

    .categories-grid {
        grid-template-columns: 1fr;
        gap: $space-4;
    }

    .categories-section__loading {
        grid-template-columns: 1fr;
        gap: $space-4;
    }

    .category-card {
        &__image-wrapper {
            aspect-ratio: 16 / 9;
        }

        &__content {
            padding: $space-4;
        }

        &__name {
            font-size: $text-base;
        }
    }
}

@keyframes category-skeleton-pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}
</style>