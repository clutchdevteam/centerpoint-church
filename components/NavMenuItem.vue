<template>
  <div>
    <button
      class="dropdown flex items-center border-l border-gray px-3 relative"
      type="button"
      @click="(e) => $emit('click', menu._uid)"
    >
      {{ menu.label }}
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
    </button>

    <Transition name="slide" appear>
      <ul
        v-if="openMenuId === menu._uid"
        id="dropdown-content"
        class="absolute flex flex-col -ml-3 border-l border-r border-b border-gray min-w-[120px] z-0"
      >
        <li
          v-for="subItem in menu.menu"
          :key="subItem.id"
          class="py-3 px-2 border-t border-gray"
        >
          <Nuxt-link to="subItem.link.cached_url">
            {{ subItem.label }}
          </Nuxt-link>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup>
import { inject } from "vue";

const props = defineProps({
  menu: {
    type: Object,
    required: true,
  },
});
const openMenuId = inject("openMenuId");
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
