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
      {
        hid: "description",
        name: "description",
        content:
          "Centerpoint Church in Brunswick, GA - Join us for worship, community, and spiritual growth.",
      },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: "",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&display=swap",
      },
    ],
  },

  env: {
    STORYBLOK_API_KEY: process.env.STORYBLOK_API_KEY,
    IS_PREVIEW: process.env.IS_PREVIEW,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/wicg-inert.client.js",
    "~/plugins/formRoute.js",
    "~/plugins/components.js",
    "~/plugins/v-calendar.client.js",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
  ],

  generate: {
    cache: false,
    concurrency: 25,
    fallback: true,
    crawler: false,
    routes: async function () {
      const token = process.env.STORYBLOK_API_KEY;

      if (!token) {
        console.warn("STORYBLOK_API_KEY not found, skipping route generation");
        return ["/"];
      }

      const version = process.env.IS_PREVIEW ? "draft" : "published";
      const ignoreFiles = ["home", "global"];
      const routes = ["/"];

      try {
        // Get space info for cache version
        const spaceRes = await axios.get(
          `https://api-us.storyblok.com/v2/cdn/spaces/me?token=${token}`
        );
        const cacheVersion = spaceRes.data.space.version;

        // Get all links
        const linksRes = await axios.get(
          `https://api-us.storyblok.com/v2/cdn/links?token=${token}&version=${version}&cv=${cacheVersion}`
        );

        Object.keys(linksRes.data.links).forEach((key) => {
          const link = linksRes.data.links[key];
          if (!ignoreFiles.includes(link.slug)) {
            if (!(link.is_folder && !link.is_startpage)) {
              routes.push("/" + link.slug);
            }
          }
        });

        console.log(`Generated ${routes.length} routes`);
        return routes;
      } catch (error) {
        console.error("Error generating routes:", error.message);
        return routes;
      }
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/composition-api/module",
    [
      "@storyblok/nuxt-2/module",
      {
        accessToken: process.env.STORYBLOK_API_KEY,
        apiOptions: { region: "us" },
      },
    ],
  ],

  axios: {
    baseUrl: "/",
    timeout: 10000, // 10 second timeout
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isClient, isDev }) {
      if (isClient && isDev) {
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

    // Optimize bundle size
    optimization: {
      splitChunks: {
        chunks: "all",
        automaticNameDelimiter: ".",
        name: undefined,
        cacheGroups: {
          vendor: {
            name: "node_vendors",
            test: /[\\/]node_modules[\\/]/,
            chunks: "all",
          },
        },
      },
    },
  },

  // Performance optimizations
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ["script", "style", "font"].includes(type);
      },
    },
  },
};
