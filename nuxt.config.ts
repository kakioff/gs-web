// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
    '@formkit/auto-animate/nuxt',
    '@nuxtjs/sitemap',
    'nuxt-icon',
    '@nuxtjs/robots',
    'nuxt-swiper',
    '@nuxthq/studio',
    // '@nuxtjs/tailwindcss',
    "@nuxt/ui"
  ],
  css: ["~/assets/css/tailwind.css"],
  devtools: { enabled: true }
})