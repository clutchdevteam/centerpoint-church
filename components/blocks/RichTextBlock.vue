<template>
  <section class="max-w-2xl mx-auto my-32 base-wrapper">
    <BaseHeading size="h2" class="mb-6 lg:mb-12">
      {{ block.heading }}
    </BaseHeading>

    <BaseRichText v-if="block.body.length" :content="block?.body[0].body" />
  </section>
</template>

<script>
import BaseHeading from "~/components/base/BaseHeading.vue";
import BaseRichText from "~/components/base/BaseRichText/BaseRichText.vue";
export default {
  components: {
    BaseHeading,
    BaseRichText,
  },
  props: {
    block: {
      type: Object,
      required: true,
    },
  },
};
</script>
