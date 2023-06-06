<template>
  <section class="py-12 lg:py-16">
    <div class="base-wrapper">
      <BaseHeading v-if="block.title" size="h2" class="text-center mb-4">{{ block.title }}</BaseHeading>

      <video v-if="block.video[0].upload.filename" class="video-wrapper" autoplay>
        <source :src="block.video[0].upload.filename" />
      </video>

      <iframe class="video-wrapper" v-else :src="block.video[0].url" />
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
    }
  }
</script>

<style scoped>
  .video-wrapper {
    width: 100%;
    height: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
  }
</style>