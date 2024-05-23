import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

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
    '@nuxtjs/tailwindcss',
    "nuxtjs-naive-ui"
  ],
  css: ["~/assets/css/tailwind.css"],
  devtools: { enabled: true },
  vite: {
    plugins: [
      AutoImport({
        imports: [
          {
            "naive-ui": [
              "useDialog",
              "useMessage",
              "useNotification",
              "useLoadingBar",
            ]
          }
        ]
      }),
      Components({
        resolvers: [NaiveUiResolver()],
      })
    ]
  }
})