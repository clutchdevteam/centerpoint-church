<template>
  <section
    class="title-wrapper"
    :style="`background: url(${backgroundImage}) center center no-repeat; background-size: cover;`"
  >
    <div class="background-overlay" />
    <div class="text-center z-10">
      <BaseHeading class="text-white" size="h2" tag="h1">{{
        block.title
      }}</BaseHeading>
      <p v-if="block.subtitle" class="text-accent text-lg">
        {{ block.subtitle }}
      </p>
    </div>
  </section>
</template>

<script>
import BaseHeading from "../base/BaseHeading.vue";

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
  computed: {
    backgroundImage() {
      return this.block?.backgroundImage?.filename ?? "";
    },
  },
};
</script>

<style>
.title-wrapper {
  @apply relative overflow-hidden flex items-center justify-center;
  min-height: 200px;
}

.background-overlay {
  @apply bg-black inset-0 absolute opacity-90;
  height: 100%;
  z-index: 0;
}

.background-image {
  position: absolute;
  object-fit: cover;
  height: 100%;
  width: auto;
  z-index: -3;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

@media (min-width: 1270px) {
  .background-image {
    height: auto;
    width: 100%;
  }
}
</style>
