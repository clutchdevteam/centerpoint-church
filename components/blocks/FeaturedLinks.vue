<template>
  <section class="bg-gray py-12 lg:py-16">
    <div class="base-wrapper">
      <p v-if="block.title" class="text-primary text-sm">
        {{ block.title }}
      </p>

      <BaseHeading v-if="block.heading_text" size="h2" class="mb-6">
        {{ block.heading_text }}
      </BaseHeading>
      <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div class="relative">
          <BaseLink :link="block.large_image_with_link[0].link">
            <div
              class="z-10 absolute h-full w-full flex flex-col p-6 xl:p-12 justify-end"
            >
              <p class="text-3xl lg:text-4xl text-white font-semibold">
                {{ block.large_image_with_link[0].title }}
              </p>
              <p class="text-white opacity-75">
                {{ block.large_image_with_link[0].day_time }}
              </p>
            </div>
            <div
              class="absolute inset-0 w-full h-full z-0 bg-primary bg-opacity-80"
            ></div>
            <img
              class="w-full h-auto"
              :src="block?.large_image_with_link[0]?.image.filename"
              :alt="block?.large_image_with_link[0]?.image.filename"
            />
          </BaseLink>
        </div>
        <div class="grid gap-8 lg:gap-12 h-full">
          <div
            v-for="(item, index) in block.small_image"
            :key="item._uid"
            class="relative z-10"
          >
            <BaseLink :link="item.link">
              <div class="inset-0 w-full h-full p-6 lg:p-12">
                <div class="flex h-full">
                  <div class="place-self-center">
                    <div class="text-white font-semibold text-2xl lg:text-3xl">
                      {{ item?.title }}
                    </div>
                    <div class="text-white text-lg lg:text-xl">
                      {{ item?.day_time }}
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="absolute inset-0 w-full h-full z-[-1] bg-opacity-80"
                :class="overlayColor(index)"
              ></div>
              <img
                :src="item?.image.filename"
                alt="image"
                class="absolute inset-0 h-full w-full z-[-2] object-cover object-center"
              />
            </BaseLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BaseHeading from "@/components/base/BaseHeading.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseLink from "@/components/base/BaseLink.vue";

export default {
  components: {
    BaseHeading,
    BaseButton,
    BaseLink,
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
