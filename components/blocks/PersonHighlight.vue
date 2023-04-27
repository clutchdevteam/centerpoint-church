<template>
  <section class="my-14 lg:my-32 max-w-4xl mx-auto">
    <article class="grid grid-cols-3 space-x-12">
      <div>
        <img
          :src="block.image.filename"
          :alt="block.image.alt"
          class="w-full aspect-w-1 aspect-h-1 object-cover shadow-md"
        />
      </div>
      <div class="col-span-2">
        <BaseHeading size="h2">{{ block.title }}</BaseHeading>
        <p v-if="block.subtitle" class="text-primary">{{ block.subtitle }}</p>
        <BaseRichText class="mt-6" :content="block.content" />
      </div>
    </article>
  </section>
</template>

<script>
import BaseHeading from "@/components//base/BaseHeading.vue";
import BaseRichText from "@/components/base/BaseRichText/BaseRichText.vue";

export default {
  props: {
    block: {
      type: Object,
      required: true,
    },
  },
  components: { BaseHeading, BaseRichText },
};
</script>
