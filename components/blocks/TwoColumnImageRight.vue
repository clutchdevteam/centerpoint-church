<template>
  <section class="my-14 lg:my-32 base-wrapper">
    <div class="grid lg:grid-cols-2 gap-8 lg:gap-12">
      <div>
        <p class="small-p text-sm mt-7">
          {{ block.section_title }}
        </p>

        <BaseHeading v-if="block.heading_text" size="h2">
          {{ block.heading_text }}
        </BaseHeading>

        <div class="h-1 w-32 bg-accent my-4" />

        <p v-if="block.text_block" class="font-display text-lg mt-6">
          {{ block.text_block }}
        </p>
      </div>

      <img
        class="drop-shadow-lg"
        :src="block.image.filename"
        :alt="block.image.alt"
      />
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
.small-p {
  color: #5151ce;
}
</style>
