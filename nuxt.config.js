const axios = require("axios");

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Centerpoint Church | Brunswick, GA",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
      },
      {
        rel: "stylesheet",
        href: '<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&display=swap" rel="stylesheet">',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/wicg-inert.client.js",
    "~/plugins/rich-text-renderer.js",
    "~/plugins/formRoute.js",
    "~/plugins/components.js",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    [
      "@storyblok/nuxt-2/module",
      { accessToken: "CfwYlM9BW7QfUulSWhFrGQtt", apiOptions: { region: "us" } },
    ],
  ],

  generate: {
    concurrency: 25,
    fallback: true,
    crawler: false,
    routes: function (callback) {
      const token = process.env.STORYBLOK_API_KEY;

      const version = process.env.IS_PREVIEW ? "draft" : "published";
      let cacheVersion = 0;

      const ignoreFiles = ["home", "global"];

      const routes = ["/"];
      debugger;

      const getRoutes = async (ignoreFiles) => {
        axios
          .get(`https://api.storyblok.com/v2/cdn/spaces/me?token=${token}`)
          .then((space_res) => {
            // timestamp of latest publish
            cacheVersion = space_res.data.space.version;
            // Call for all Links using the Links API: https://www.storyblok.com/docs/Delivery-Api/Links
            axios
              .get(
                `https://api.storyblok.com/v2/cdn/links?token=${token}&version=${version}&cv=${cacheVersion}`
              )
              .then((res) => {
                Object.keys(res.data.links).forEach((key) => {
                  if (!ignoreFiles.includes(res.data.links[key].slug)) {
                    if (
                      !(
                        res.data.links[key].is_folder &&
                        !res.data.links[key].is_startpage
                      )
                    ) {
                      routes.push("/" + res.data.links[key].slug);
                    }
                  }
                });

                callback(null, routes);
              });
          });
      };

      getRoutes(ignoreFiles);

      return routes;
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/composition-api/module",
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isClient }) {
      if (isClient) {
        config.devtool = "source-map";
      }

      const svgRule = config.module.rules.find((rule) =>
        rule.test.test(".svg")
      );

      svgRule.test = /\.(png|jpe?g|gif|webp)$/;

      config.module.rules.push({
        test: /\.svg$/,
        use: ["babel-loader", "vue-svg-loader"],
      });

      config.node = {
        fs: "empty",
      };
    },
  },
};
