<template>
  <div v-editable="blok" v-if="blok" class="w-full">
    <InteriorTitle v-if="blok.title" :block="blok.title[0]" />

    <section class="base-wrapper my-12 xl:my-24 mx-my-12">
      <p class="text-center text-primary font-semibold text-xl mb-6">
        {{ formatDate(blok.date) }}
      </p>
      <iframe
        v-if="blok.video_url"
        class="video mb-12"
        :src="blok.video_url"
        title="YouTube video player"
        frameborder="0"
        allow="controls"
        allowfullscreen
      ></iframe>

      <template v-else>
        <div v-if="blok.image">
          <img
            class="mb-12 max-w-2xl mx-auto"
            :src="blok.image.filename"
            :alt="blok.image.filename"
          />
        </div>
      </template>

      <div class="max-w-2xl mx-auto">
        <BaseRichText
          v-if="blok.content[0]"
          :content="blok.content[0].body[0].body"
        />
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
  methods: {
    formatDate(date) {
      // const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
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
