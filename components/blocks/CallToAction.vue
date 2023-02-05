<template>
  <section class="base-wrapper py-12 lg:py-16">
    <div class="flex flex-col items-center">
      <p class="text-primary">{{ block.title }}</p>

      <BaseHeading size="h2" class="text-center my-2">
        {{ block.heading }}
      </BaseHeading>

      <div class="h-1 w-32 bg-accent mt-2 mb-4" />

      <p class="text-center text-lg lg:w-3/5 my-2">{{ block.text_area }}</p>

      <div
        v-for="button in block.button"
        :key="button._uid"
        class="mt-4 lg:mt-6"
      >
        <BaseButton :link="button.link" :theme="button.theme" class="text-white"
          >{{ button.label }}

          <template v-if="button.helper" #helper>
            {{ button.helper }}
          </template>
        </BaseButton>
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

<style lang="postcss" scoped></style>
