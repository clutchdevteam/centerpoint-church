<template>
  <div>
    <div class="z-50 relative container mx-auto">
      <header
        class="flex justify-between items-center bg-white px-6 py-3 xl:px-0"
      >
        <Nuxt-link to="/">
          <img class="h-5" v-if="logo" :src="logo.filename" :alt="logo.alt" />
        </Nuxt-link>
        <nav class="desktop hidden lg:block z-30">
          <ul class="flex">
            <li v-for="item in nav" :key="item._uid">
              <BaseMenuItem class="nav-submenu" v-if="item.menu" :menu="item" />

              <div
                v-else
                class="nav-submenu flex items-center justify-between w-full whitespace-nowrap"
              >
                <BaseLink
                  class="block"
                  :link="item.link"
                  :id="item.label.toLowerCase().replace(' ', '-')"
                >
                  {{ item.label }}
                </BaseLink>
              </div>
            </li>
          </ul>
        </nav>

        <div class="lg:hidden">
          <button
            ref="openButtonRef"
            @click="toggleMobileMenu"
            type="button"
            :inert="isMobileMenuOpen"
          >
            <span class="sr-only">Open main menu</span>
            <BaseIcon class="w-8 h-8" file="menu-icon" alt="Open Menu" />

            <Portal to="mobile-menu">
              <div
                :class="`mobile z-[52] fixed inset-0 bg-black transition duration-150 ${
                  isMobileMenuOpen
                    ? 'bg-opacity-75'
                    : 'bg-opacity-0 pointer-events-none'
                }`"
                :inert="!isMobileMenuOpen"
                @keydown.esc="closeMenu"
              >
                <div
                  :class="`flex transform transition-transform duration-150 ease-in-out ${
                    isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                  }`"
                >
                  <div>
                    <button
                      class="flex justify-center items-center bg-white rounded-full ml-4 mr-4 mt-4 h-12 w-12"
                      ref="closeButtonRef"
                      @click="closeMenu"
                      type="button"
                    >
                      <span class="sr-only">Close menu</span>
                      <BaseIcon
                        class="w-6 h-6 text-primary-default"
                        file="close-icon"
                        alt="Close Menu"
                      />
                    </button>
                  </div>

                  <div
                    class="flex flex-col justify-between h-screen w-full bg-white"
                  >
                    <nav role="navigation">
                      <ul>
                        <li
                          class="p-4 border-b border-gray"
                          v-for="item in nav"
                          :key="item._uid"
                        >
                          <BaseMenuItem
                            class="nav-submenu"
                            v-if="item.menu"
                            :menu="item"
                          />

                          <div v-else class="nav-submenu">
                            <BaseLink
                              :link="item.link"
                              :id="item.label.toLowerCase().replace(' ', '-')"
                            >
                              {{ item.label }}
                            </BaseLink>
                          </div>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </Portal>
          </button>
        </div>
      </header>

      <a
        href="https://cpcbrunswick.ccbchurch.com/goto/forms/6/responses/new"
        class="absolute text-white flex right-6 lg:right-0 mt-3"
      >
        <BaseIcon
          class="h-6 w-6 mr-3"
          file="chat-icon"
          fill="none"
          alt="a chat bubble icon"
        />
        Need to talk
      </a>
    </div>
  </div>
</template>

<script>
import BaseIcon from "@/components/base/BaseIcon.vue";
import BaseMenuItem from "@/components/base/BaseMenuItem.vue";
import BaseLink from "@/components/base/BaseLink.vue";
import { mapState } from "vuex";
import { Portal } from "portal-vue";

export default {
  components: {
    BaseMenuItem,
    BaseIcon,
    BaseLink,
    Portal,
  },
  props: {
    logo: { type: Object },
    nav: {
      type: Array,
    },
  },
  computed: {
    ...mapState("global", ["isMobileMenuOpen", "pageHasModalOpen"]),
    isHomePage() {
      return this.$route.fullPath === "/" || this.$route.fullPath === "/home";
    },
  },
  watch: {
    $route(to, from) {
      this.closeMenu();
    },
  },
  methods: {
    async toggleMobileMenu() {
      await this.$store.commit(
        "global/isMobileMenuOpen",
        !this.isMobileMenuOpen
      );
      await this.$nextTick();
      await this.$nextTick();

      this.$refs.closeButtonRef?.focus();
    },
    async closeMenu() {
      await this.$store.commit("global/isMobileMenuOpen", false);
      await this.$nextTick();
      await this.$nextTick();

      this.$refs.openButtonRef?.focus();
    },
  },
};
</script>

<style lang="postcss">
.desktop ul li {
  @apply relative;

  & .nav-submenu button,
  .nav-submenu a {
    @apply px-4 py-2 border-l text-sm border-r border-gray;
  }
}

/* .desktop ul li .nav-submenu ul {
  @apply absolute bg-white shadow-lg min-w-[150px] w-full;

  & li div a {
    @apply block px-4 py-3 text-sm;
  }
} */

.mobile div div nav ul li .nav-submenu ul li {
  @apply py-2 pl-3;
}
</style>
