<template>
  <div v-editable="blok" class="w-full">
    <InteriorTitle :block="blok.title[0]" />

    <section class="base-wrapper my-12 xl:my-24 mx-my-12">
      <iframe
        v-if="blok.video_url"
        class="video mb-12"
        :src="blok.video_url"
        title="YouTube video player"
        frameborder="0"
        allow="controls"
        allowfullscreen
      ></iframe>

      <div class="max-w-2xl mx-auto">
        <BaseRichText :content="blok.content[0].body[0].body" />
        <nuxt-link class="text-primary underline text-lg" to="/events">
          <BaseIcon
            class="w-4 h-4 inline mr-2 transform rotate-180"
            file="arrow-right"
          />
          Back to Events
        </nuxt-link>
      </div>
    </section>
  </div>
</template>

<script>
import BaseRichText from "@/components/base/BaseRichText/BaseRichText.vue";
import BaseIcon from "@/components/base/BaseIcon.vue";

export default {
  components: {
    BaseRichText,
    BaseIcon,
  },
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
.video {
  @apply mx-auto;
  aspect-ratio: 16 / 9;
  width: 100%;
  max-width: 768px;
}
</style>
