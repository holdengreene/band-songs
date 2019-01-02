const pkg = require('./package');

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: 'PPK',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { hid: 'theme', name: 'theme-color', content: '#0069c0' },
      { name: 'robots', content: 'noindex' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    link: [
      {
        href: 'https://fonts.googleapis.com/css?family=Lora:400,700',
        rel: 'stylesheet'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff176' },

  /*
   ** Global CSS
   */
  css: ['~assets/scss/generic.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [
    [
      '@nuxtjs/pwa',
      {
        meta: false,
        manifest: {
          theme_color: '#0069c0'
        }
      }
    ],
    '@nuxtjs/axios',
    ['nuxt-sass-resources-loader', ['~assets/scss/modules/_variables.scss']]
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  // Ignore all the tests
  ignore: ['**/*.test.*', '**/*.spec.*', '**/__mocks__/*.*'],

  /*
   ** Build configuration
   */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    extractCSS: true,
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  }
};
