<template>
  <section>
    <div class="background-overlay" />
    <img
      class="background-image"
      :src="block.backgroundContent.filename"
      alt=""
    />

    <div class="z-10 base-wrapper text-white">
      <div class="mb-6">
        <BaseHeading size="h1">
          {{ block.title }}
        </BaseHeading>
        <div class="h-1 w-32 bg-accent mt-3 lg:mt-0" />
      </div>
      <p class="md:w-1/2 mb-8">{{ block.subtitle }}</p>

      <div class="flex space-x-6">
        <div v-for="button in block.cta[0].buttons" :key="button._uid">
          <BaseButton :href="button.link.cached_url" :theme="button.theme">
            {{ button.label }}

            <template v-if="button.helper" #helper>
              {{ button.helper }}
            </template>
          </BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BaseHeading from "@/components/base/BaseHeading.vue";
import BaseButton from "@/components/base/BaseButton.vue";

export default {
  components: {
    BaseHeading,
    BaseButton,
  },
  props: {
    block: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
section {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 100px);
  width: 100%;
  overflow: hidden;
}

.background-image {
  filter: blur(0.25rem);
  position: absolute;
  object-fit: cover;
  height: 100%;
  width: auto;
  z-index: -999;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

@media (min-width: 768px) {
  .background-image {
    height: auto;
    width: 100%;
  }
}

.background-overlay {
  @apply bg-black inset-0 absolute opacity-90;
  z-index: -1;
}
</style>
