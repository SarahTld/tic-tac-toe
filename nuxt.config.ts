// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  // CSS
  css: ['~/assets/css/tailwind.css'],
  
  // PostCSS
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  
  // Configuration pour le déploiement
  app: {
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
  }
})
