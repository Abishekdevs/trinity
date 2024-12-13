// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  devtools: { enabled: true },
  hooks: {
    close: (nuxt) => {
      // FIXME: workaround for https://github.com/nuxt/cli/issues/193
      if (!nuxt.options._prepare) {
        setTimeout(() => {
          process.exit(0)
        }, 500)
      }
    },
  },

  nitro: {
    // NOTE: we don't want to use the firebase preset because this is a static website and the firebase preset is for SSR
    preset: 'node', // the default
  },


  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@vueuse/nuxt",
    "nuxt-headlessui",
    "@morev/vue-transitions/nuxt",
    'nuxt-vuefire',
  ],
  tailwindcss: { exposeConfig: true },
  headlessui: { prefix: "H" },
  
  app: {
    head: {
      title: "Analytics",
      link: [
        // Favicon
        { rel: "icon", type: "image/x-icon", href: "/icon.svg" },
        //Inter font
        { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
        { rel: "preconnect", href: "https://rsms.me/" },
      ],
    },
  },

  vuefire: {
    emulators: {
      // uncomment this line to run the application in production mode without emulators during dev
      enabled: false,
      auth: {
        options: {
          disableWarnings: true,
        },
      },
    },
    auth: {
      enabled: true,
      sessionCookie: false,
    },

  

    config: {
      apiKey: "AIzaSyD6gTQNqenC49BFIHwTEuSam-rwGSe4S8g",
      authDomain: "nuxtrun-cf9ef.firebaseapp.com",
      projectId: "nuxtrun-cf9ef",
      storageBucket: "nuxtrun-cf9ef.appspot.com",
      messagingSenderId: "191762034586",
      appId: "1:191762034586:web:8a7347f6f404d8f5cc9423",
      measurementId: "G-DNCT8ECX09",  
      databaseURL: "https://nuxtrun-cf9ef-default-rtdb.firebaseio.com/",
    },
  },

  experimental: {
    payloadExtraction: false,
  },

  // since we are only using SSR for generation, we can only use a few of these rules effectively
  // https://nuxt.com/docs/guide/concepts/rendering#hybrid-rendering
  routeRules: {
    '/': { isr: true },
    // Make some pages client only (since we have an SPA)
    // useful for authenticated pages that require the user to be logged in to be
    // displayed
    '/admin': { ssr: false },
    '/users': { ssr: false },
    '/posts/new': { ssr: false },
    '/login': { ssr: false },
  },

});
