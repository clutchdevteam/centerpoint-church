<template>
  <div
    :id="`${menuId}-wrapper`"
    @keydown.stop="handleKeyPress"
    v-click-outside="closeMenu"
  >
    <button
      @click.prevent="toggleMenu(menu)"
      :id="menuId"
      class="flex items-center justify-between w-full whitespace-nowrap"
      aria-haspopup="true"
      ref="menuButtonRef"
      :aria-expanded="isOpen.toString()"
      :aria-controls="submenuId"
    >
      {{ menu.label }}

      <svg
        class="ml-4 transform transition duration-150 ease-linear"
        :class="{ '-rotate-180': isOpen }"
        width="13"
        height="7"
        viewBox="0 0 13 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.5 1L6.5 6L1.5 1"
          stroke="#23C5D9"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <transition name="submenu" appear>
      <ul
        v-if="isOpen"
        @keydown.esc.stop="closeMenu"
        class="submenu"
        :id="submenuId"
      >
        <li v-for="(menu, index) in menu.menu" :key="index">
          <BaseMenu :menu="menu" />
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import vClickOutside from "v-click-outside";
import BaseMenu from "@/components/base/BaseMenu.vue";

export default {
  name: "BaseMenuItem",
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: {
    BaseMenu,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  props: {
    menu: {
      type: Object,
      required: true,
    },
  },
  watch: {
    $route(to, from) {
      this.closeMenu();
    },
  },
  computed: {
    menuId() {
      return this.menu.label.toLowerCase().replace(" ", "-");
    },
    submenuId() {
      return `${this.menu.label.toLowerCase().replace(" ", "-")}-submenu`;
    },
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;

      if (this.isOpen) {
        this.$nextTick(() => {
          const submenu = document.getElementById(this.submenuId);
          const firstItem = submenu.querySelector("a, button");
          firstItem?.focus();
        });
      }

      if (!this.isOpen) {
        this.$nextTick(() => {
          this.$refs.menuButtonRef?.focus();
        });
      }
    },
    closeMenu() {
      if (this.isOpen) {
        this.isOpen = false;

        this.$refs.menuButtonRef?.focus();
      }
    },
    handleKeyPress(e) {
      // Query to get focusable elements within the sidebar nav
      const navEl = document.getElementById(`${this.menuId}-wrapper`);
      const focusableElements = navEl.querySelectorAll(["a", "button"]);
      // Convert nodelist of elements into an array
      const focusableElementsArr = Array.from(focusableElements);

      // Grab current active element
      const activeEl = document.activeElement;
      // Find current active element within the array of focusable elements
      const activeElIndex = focusableElementsArr.findIndex(
        (f) => f.id === activeEl.id
      );
      const lastIdx = focusableElementsArr.length - 1;
      if (e.key === "ArrowUp") {
        activeElIndex <= 0
          ? focusableElementsArr[0].focus()
          : focusableElementsArr[activeElIndex - 1].focus();
      }
      if (e.key === "ArrowDown") {
        activeElIndex >= lastIdx
          ? focusableElementsArr[lastIdx].focus()
          : focusableElementsArr[activeElIndex + 1].focus();
      }

      if (e.key === "Escape") {
        this.closeMenu();
      }
    },
  },
};
</script>

<style>
.submenu-enter-active,
.submenu-leave-active {
  transition: all 150ms ease-in-out;
}

.submenu-enter,
.submenu-leave-to {
  opacity: 0;
  transform: translateY(-20px) !important;
}

.submenu {
  @apply absolute bg-white shadow-lg min-w-[150px] w-full;

  & li div a {
    @apply block px-4 py-3 text-sm;
  }
}
</style>
