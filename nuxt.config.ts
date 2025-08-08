import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  // Configuration pour le déploiement statique
  ssr: false,
  nitro: {
    prerender: {
      routes: ['/']
    }
  },
  
  // Configuration pour GitHub Pages
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/tic-tac-toe/' : '/',
    buildAssetsDir: '/assets/',
    head: {
      title: 'Tic Tac Toe - Le jeu classique revisité',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Jouez au Tic Tac Toe contre l\'IA ou un ami !' }
      ]
    }
  },
  
  // CSS
  css: ['~/assets/css/tailwind.css'],
  
  // PostCSS
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
})
