<template>
  <section class="my-14 lg:my-32 base-wrapper">
    <div class="grid lg:grid-cols-2 gap-8 lg:gap-12">
      <div>
        <p v-if="block.section_title" class="text-primary text-sm mt-7">
          {{ block.section_title }}
        </p>

        <template v-if="block.heading_text">
          <BaseHeading size="h2">
            {{ block.heading_text }}
          </BaseHeading>

          <div class="h-1 w-32 bg-accent my-4" />
        </template>

        <BaseRichText class="xl:w-3/4" :content="block.rich_text_area" />

        <template v-if="block.link.length">
          <BaseLink
            class="text-primary text-lg"
            :show_arrow="true"
            :link="block.link[0].link"
          >
            {{ block.link[0].text }}
          </BaseLink>
        </template>
      </div>

      <img
        class="w-full h-auto drop-shadow-lg"
        :src="block.image.filename"
        :alt="block.image.alt"
      />
    </div>
  </section>
</template>

<script>
import BaseHeading from "@/components/base/BaseHeading.vue";
import BaseRichText from "@/components/base/BaseRichText/BaseRichText.vue";
import BaseLink from "@/components/base/BaseLink.vue";

export default {
  components: {
    BaseHeading,
    BaseRichText,
    BaseLink,
  },
  props: {
    block: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="postcss" scoped></style>
