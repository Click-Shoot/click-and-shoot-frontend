// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  devServer: {
    port: 4000
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',
    'nuxt-mdi',
    '@nuxt/icon'
  ],
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.dark',
        }
      }
    }
  }
})