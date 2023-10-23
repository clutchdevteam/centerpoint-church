<template>
  <footer class="bg-black border-t-2 border-accent">
    <div class="base-wrapper py-12">
      <div
        class="flex flex-col space-y-12 lg:space-y-0 lg:space-x-6 lg:flex-row lg:justify-between text-white"
      >
        <div
          class="flex flex-col justify-center items-center lg:items-start lg:justify-start"
        >
          <img
            v-show="logo && logo?.filename"
            class="mb-4"
            :src="logo?.filename"
            alt="Centerpoint Church logo"
          />

          <a href="tel:+912-275-7722">
            <BaseIcon
              class="inline mr-2 h-6 w-6 text-secondary"
              file="phone-icon"
              alt="A stylized phone"
            />
            (912) 275-7722
          </a>

          <address class="mt-2 opacity-75">
            573 Palisade Dr <br />
            Brunswick, GA 31523
          </address>
        </div>

        <nav>
          <ul
            class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:flex space-x-3 xl:space-x-10"
          >
            <li v-for="item in nav" :key="item._uid">
              <h3 class="text-lg text-secondary font-display font-bold mb-2">
                {{ item.label }}
              </h3>
              <ul>
                <li
                  class="opacity-75 hover:opacity-100"
                  v-for="link in item.menu"
                  :key="link._uid"
                >
                  <BaseLink :link="link.link">
                    {{ link.label }}
                  </BaseLink>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>

      <p class="text-center text-white mt-12">
        &copy; {{ currentYear }} | CenterPoint Church
      </p>
    </div>
  </footer>
</template>

<script>
import BaseIcon from "./base/BaseIcon.vue";
import BaseLink from "@/components/base/BaseLink.vue";

export default {
  components: {
    BaseIcon,
    BaseLink,
  },
  props: {
    nav: {
      type: Array,
      required: true,
    },
    logo: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    currentYear() {
      const date = new Date();

      return date.getFullYear();
    },
  },
};
</script>
