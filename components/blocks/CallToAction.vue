<template>
  <section class="py-12 lg:py-16" :class="bgTheme(block)">
    <div class="base-wrapper">
      <div class="flex flex-col items-center">
        <p class="text-primary">{{ block.title }}</p>

        <BaseHeading size="h2" class="text-center my-2">
          {{ block.heading }}
        </BaseHeading>

        <div class="h-1 w-32 bg-accent mt-2 mb-4" />

        <p class="text-center text-lg lg:w-3/5 my-2">{{ block.text_area }}</p>

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
        case "":
          theme = "";
          break;
        case "gray":
          theme = "bg-gray";
          break;
      }
      return theme;
    },

    btnTheme(block) {
      let theme = block.variant;

      switch (theme) {
        case "":
          theme = "btn btn-white-bg";
          break;
        case "gray":
          theme = "btn btn-gray-bg";
          break;
      }
      return theme;
    },
  },
};
</script>

<style lang="postcss" scoped>
.section-bg {
  @apply bg-gray;
}

.btn {
  @apply px-4 py-2 font-display font-bold transition duration-150 ease-in-out border-2 border-transparent text-center;

  &.btn-white-bg {
    @apply text-primary border-black;

    &:hover {
      @apply border-black bg-primary text-white;
    }
  }

  &.btn-gray-bg {
    @apply bg-primary border-primary text-white;

    &:hover {
      @apply border-secondary bg-secondary bg-opacity-50 text-black;
    }
  }
}
</style>
