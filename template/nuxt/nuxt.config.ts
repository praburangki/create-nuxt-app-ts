import NuxtConfiguration from '@nuxt/config';

const nodeExternals = require('webpack-node-externals');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

const config: NuxtConfiguration = {
  head: {
    title: 'My Nuxt.js Typescript App',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
      },
    ],
  },
  plugins: ['~/plugins/vuetify.ts'],
  css: ['~/designs/app.styl'],
  build: {
    extractCSS: true,
    transpile: [/^vuetify/],
    plugins: [new VuetifyLoaderPlugin()],
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }

      if (process.server) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/],
          }),
        ];
      }
    },
  },
};

export default config;
