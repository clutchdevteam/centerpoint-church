<template>
  <section class="bg-gray py-12 lg:py-16">
    <div class="base-wrapper">
      <p class="text-primary text-sm">
        {{ block.title }}
      </p>

      <BaseHeading v-if="block.heading_text" size="h2" class="mb-6">
        {{ block.heading_text }}
      </BaseHeading>
      <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div class="relative">
          <div class="flex place-items-end">
            <div class="absolute z-30 flex flex-col ml-2 mb-2 lg:ml-8 lg:mb-14">
              <p
                class="text-white text-4xl lg:text-6xl font-semibold lg;ml-1 mb-2"
              >
                {{ block.large_image_with_link[0].title }}
              </p>
              <p class="text-white text-xl lg:text-2xl lg:ml-1 mb-6">
                {{ block.large_image_with_link[0].day_time }}
              </p>
              <div
                v-for="button in block.large_image_with_link[0].button"
                :key="button._uid"
              >
                <BaseButton
                  :link="button.link"
                  :theme="button.theme"
                  class="text-white -ml-36 lg:-ml-80"
                  >{{ button.label }}

                  <template v-if="button.helper" #helper>
                    {{ button.helper }}
                  </template></BaseButton
                >
              </div>
            </div>
            <div
              class="absolute inset-0 w-full h-full z-20 bg-primary bg-opacity-80"
            ></div>
            <img
              :src="block.large_image_with_link[0].image.filename"
              alt="image"
              class="w-full h-auto z-10"
            />
          </div>
        </div>
        <div class="grid gap-8 lg:gap-12">
          <div
            v-for="(item, index) in block.small_image"
            :key="item._uid"
            class="relative"
          >
            <div class="absolute inset-0 w-full h-full z-30">
              <div class="flex h-full">
                <div class="place-self-center ml-2 lg:ml-8">
                  <div class="text-white font-semibold text-2xl lg:text-5xl">
                    {{ item.title }}
                  </div>
                  <div class="text-white text-xl lg:text-2xl">
                    {{ item.day_time }}
                  </div>
                </div>
              </div>
            </div>
            <div
              class="absolute inset-0 w-full h-full z-20 bg-opacity-80"
              :class="overlayColor(index)"
            ></div>
            <img
              :src="item.image.filename"
              alt="image"
              class="w-full h-auto z-20"
            />
          </div>
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
  methods: {
    overlayColor(num) {
      let color;
      switch (num) {
        case 0:
          color = "bg-secondary";
          break;
        case 1:
          color = "bg-accent";
          break;
      }

      return color;
    },
  },
};
</script>

<style lang="postcss" scoped></style>
