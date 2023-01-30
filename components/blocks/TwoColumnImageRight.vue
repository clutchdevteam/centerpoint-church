<template>
  <section class="my-32">
    <div class="base-wrapper">
      <div>
        <BaseHeading v-if="block.section_title" size="h7" class="mt-7">
          {{ block.section_title }}
        </BaseHeading>

        <BaseHeading v-if="block.heading_text" size="h2">
          {{ block.heading_text }}
        </BaseHeading>

        <div class="h-1 w-32 bg-accent my-4" />

        <p v-if="block.text_block" class="font-display text-lg mt-6">
          {{ block.text_block }}
        </p>
      </div>
      <img :src="block.image.filename" :alt="block.image.alt" />
    </div>
  </section>
</template>

<script>
import BaseHeading from "@/components/base/BaseHeading.vue";

export default {
  components: {
    BaseHeading,
  },
  props: {
    block: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="postcss" scoped>
.base-wrapper {
  @apply flex-col;
}

img {
  @apply mt-10;
}

@media (min-width: 1023px) {
  .base-wrapper {
    @apply flex-row;
  }

  p {
    @apply mr-32;
  }
}
</style>
