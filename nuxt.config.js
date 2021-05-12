export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "bahja",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "vue-multiselect/dist/vue-multiselect.min.css",
    "vue-tabs-component/docs/resources/tabs-component.css",
    "~/assets/css/main.css"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/splide.client.js", ssr: false },
    { src: "~/plugins/star-rating.js", mode: "client" },
    { src: "~/plugins/vue-multiselect.js", mode: "client" },
    { src: "~/plugins/vue-tabs-component.js", mode: "client" },
    { src: "~/plugins/swiper.js", mode: "client" },
    { src: "~/plugins/vue-mask.js", mode: "client" },
    { src: "~/plugins/vue-loading.js", mode: "client" },
    { src: "~/plugins/vuelidate.js" },
    { src: "~/plugins/vue-debounce.js" },
    { src: "~/plugins/vue-toast.js", mode: "client" },
    { src: "~/plugins/vue-paginate.js", mode: "client" }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    {
      path: "~/components", // will get any components nested in let's say /components/test too
      pathPrefix: false
    }
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/google-fonts", "@nuxtjs/axios", "@nuxtjs/auth-next"],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  googleFonts: {
    families: {
      Montserrat: true
    }
  },
  axios: {
    baseURL: "http://192.168.0.112:8000/api/"

    // Used as fallback if no runtime config is provided
  },
  auth: {
    redirect: {
      login: "/admin/login",
      home: "/admin/"
    },
    strategies: {
      local: {
        token: {
          property: "token",
          type: "Token",
          maxAge: 24 * 3600
        },
        user: {
          property: "name"
        },
        endpoints: {
          login: { url: "users/token/", method: "post" },
          logout: { url: "users/logout/", method: "delete" },
          user: { url: "users/me/", method: "get" }
        }
      }
    }
  },
  router: {
    middleware: ["auth"]
  }
};
