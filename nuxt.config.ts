import { fileURLToPath } from 'node:url'

const abstractsPath = fileURLToPath(
  new URL('./assets/scss/abstracts', import.meta.url)
).replace(/\\/g, '/')

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      strapiUrl: process.env.STRAPI_URL || 'http://localhost:1337'
    }
  },
  compatibilityDate: '2025-07-15',

  devtools: {
    enabled: true
  },

  ssr: false,

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/i18n'
  ],

  // ==========================================
  // i18n
  // ==========================================

  i18n: {
    defaultLocale: 'en',

    strategy: 'prefix_except_default',

    langDir: 'locales',

    locales: [
      {
        code: 'en',
        name: 'English',
        language: 'en-US',
        file: 'en.json',
        dir: 'ltr'
      },
      {
        code: 'fa',
        name: 'فارسی',
        language: 'fa-IR',
        file: 'fa.json',
        dir: 'rtl'
      }
    ],

    // Set HTML lang and dir automatically
    detectBrowserLanguage: false
  },

  // ==========================================
  // Components
  // ==========================================

  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  // ==========================================
  // Global SCSS
  // ==========================================

  css: [
    '~/assets/scss/main.scss'
  ],

  // ==========================================
  // Vite
  // ==========================================

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "${abstractsPath}/_variables.scss";
            @import "${abstractsPath}/_mixins.scss";
          `,


          silenceDeprecations: [
            'legacy-js-api',
            'import',
            'global-builtin'
          ]
        }
      }
    },

    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) =>
            tag.startsWith('icon-')
        }
      }
    }
  },

  // ==========================================
  // App
  // ==========================================

  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },

    head: {
      title:
        'DentalTech Pro - Advanced Digital Dentistry Equipment',

      meta: [
        {
          charset: 'utf-8'
        },
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1'
        },
        {
          name: 'description',
          content:
            'Premium dental equipment and digital dentistry solutions for modern dental practices'
        }
      ],

      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico'
        },

        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },

        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous'
        },

        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
        }
      ]
    }
  },

  // ==========================================
  // Nitro
  // ==========================================

  nitro: {
    preset: 'node-server'
  }
})