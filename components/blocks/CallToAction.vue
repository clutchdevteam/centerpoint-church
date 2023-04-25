<template>
  <section class="py-12 lg:py-16" :class="bgTheme(block)">
    <div class="base-wrapper">
      <div class="flex flex-col items-center">
        <p v-if="block.title" class="text-primary">{{ block.title }}</p>

        <BaseHeading size="h2" class="text-center my-2">
          {{ block.heading }}
        </BaseHeading>

        <div class="h-1 w-32 bg-accent mt-2 mb-4" />

        <p class="text-center text-lg lg:w-3/5 my-2">{{ block.text_area }}</p>

        <template v-if="block.button.length">
          <div
            v-for="button in block.button"
            :key="button._uid"
            class="mt-4 lg:mt-6"
          >
            <BaseLink
              :class="btnTheme(block)"
              v-if="button.link"
              :link="button.link"
              :id="button.label.toLowerCase().replace(' ', '-')"
            >
              {{ button.label }}
            </BaseLink>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import BaseHeading from "@/components/base/BaseHeading.vue";
import BaseLink from "@/components/base/BaseLink.vue";

export default {
  components: {
    BaseHeading,
    BaseLink,
  },
  props: {
    block: {
      type: Object,
      required: true,
    },
    link: {
      type: Object,
      required: false,
    },
  },

  methods: {
    bgTheme(block) {
      let theme = block.variant;

      switch (theme) {
        case "dark":
          theme = "bg-gray";
          break;
        default:
          theme = "bg-white";
      }
      return theme;
    },

    btnTheme(block) {
      let theme = block.variant;

      switch (theme) {
        case "dark":
          theme = "btn btn-secondary";
          break;
        default:
          theme = "btn btn-primary";
      }
      return theme;
    },
  },
};
</script>

<style lang="postcss" scoped>
.btn {
  @apply px-4 py-2 font-display font-bold transition duration-150 ease-in-out border-2 border-transparent text-center;

  &.btn-primary {
    @apply bg-primary tracking-wider text-white;

    &:hover {
      @apply border-secondary bg-opacity-50 text-primary;
    }
  }

  &.btn-secondary {
    @apply border-2 border-secondary;

    &:hover {
      @apply bg-secondary bg-opacity-50;
    }
  }
}
</style>
