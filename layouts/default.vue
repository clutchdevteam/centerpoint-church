<template>
    <div :class="`min-h-screen flex flex-col ${hasOpenMenu ? 'h-screen overflow-hidden' : ''
    }`">
        <SiteHeader :nav="mainNav" :legal-nav="legalNav" :logo="logo" :inert="hasOpenMenu" />

        <main class="flex-1" :inert="hasOpenMenu">
            <Nuxt />
        </main>

        <SiteFooter :footer-content="footer" :inert="hasOpenMenu" />

        <PortalTarget name="modal"></PortalTarget>
        <PortalTarget name="mobile-menu"></PortalTarget>
    </div>
</template>
  
<script>
import { mapState } from "vuex";

export default {
    computed: {
        ...mapState("global", [
            "pageHasModalOpen",
            "isMobileMenuOpen",
            "mainNav",
            "legalNav",
            "logo",
            "footer",
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
  