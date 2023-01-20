<template>
  <div class="test-bg-color">
    <header
      class="container mx-auto flex justify-between h-12 items-center bg-white z-50"
    >
      <Nuxt-link to="/">
        <img v-if="logo" :src="logo.filename" :alt="logo.alt" />
      </Nuxt-link>
      <nav>
        <ul class="flex">
          <li
            v-for="(item, i) in nav"
            v-on:click="menuDrop(i)"
            :key="i"
            id="topLevelMenuItem"
          >
            <button
              class="dropdown flex items-center text-xs border-l border-gray px-3 relative"
            >
              {{ item.label }}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                class="w-4 h-4 text-secondary ml-1.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              <Transition name="slide" appear>
                <ul
                  v-if="openMenuIndex === i"
                  id="dropdown-content"
                  class="absolute flex flex-col mt-44 -ml-3 border-l border-r border-b border-gray min-w-[120px] z-0"
                >
                  <li
                    v-for="subItem in item.menu"
                    :key="subItem.id"
                    class="py-3 px-2 border-t border-gray"
                  >
                    <Nuxt-link to="subItem.link.cached_url">
                      {{ subItem.label }}
                    </Nuxt-link>
                  </li>
                </ul>
              </Transition>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openMenuIndex: null,
    };
  },
  props: {
    logo: {
      type: Object,
    },
    nav: {
      type: Array,
      required: true,
    },
  },
  methods: {
    menuDrop: function (index) {
      this.openMenuIndex = index;

      console.log(this.openMenuIndex);
    },
  },
};
</script>

<style lang="postcss" scoped>
/* .test-bg-color {
  background-color: gray;
} */

.dropdown-content {
  display: none;
}

.dropdown-click {
  display: block;
}

.slide-enter-active,
.slide-leave-active {
  transition: all;
  transform: translateY(0);
  transition-duration: 150ms;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-100%);
}

/* .dropdown:hover .dropdown-content {
  display: block;
} */
</style>
