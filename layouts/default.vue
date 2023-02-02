<template>
  <div
    :class="`min-h-screen flex flex-col ${
      hasOpenMenu ? 'h-screen overflow-hidden' : ''
    }`"
  >
    <SiteHeader
      :nav="headerNavigation"
      :logo="headerLogo"
      :inert="hasOpenMenu"
    />

    <main class="flex-1" :inert="hasOpenMenu">
      <Nuxt />
    </main>

    <SiteFooter
      :nav="footerNavigation"
      :logo="footerLogo"
      :inert="hasOpenMenu"
    />

    <PortalTarget name="modal"></PortalTarget>
    <PortalTarget name="mobile-menu"></PortalTarget>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SiteHeader from "@/components/SiteHeader.vue";
import { PortalTarget } from "portal-vue";
import SiteFooter from "@/components/SiteFooter";

export default {
  components: {
    SiteHeader,
    SiteFooter,
    PortalTarget,
  },
  computed: {
    ...mapState("global", [
      "pageHasModalOpen",
      "isMobileMenuOpen",
      "headerNavigation",
      "headerLogo",
      "footerLogo",
      "footerNavigation",
    ]),
    hasOpenMenu() {
      return this.pageHasModalOpen || this.isMobileMenuOpen;
    },
  },
};
</script>

<style lang="postcss" scoped>
body {
  overflow-x: hidden;
  margin: 0;
}

header,
footer {
  flex-grow: 0;
}

main {
  display: flex;
  flex-grow: 1;
}
</style>
