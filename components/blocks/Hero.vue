<template>
  <section>
    <div class="hero-wrapper">
      <div class="background-overlay" />
      <div>
        <img
          class="background-image"
          :src="backgroundContent.image.filename"
          alt=""
        />

        <video class="background-video" autoplay>
          <source :src="backgroundContent.video.filename" />
        </video>
      </div>

      <div class="z-10 base-wrapper text-white">
        <div class="mb-6">
          <BaseHeading size="h1">
            {{ block.title }}
          </BaseHeading>
          <div class="h-1 w-32 bg-accent mt-3 lg:mt-0" />
        </div>
        <p class="md:w-1/2 mb-8">{{ block.subtitle }}</p>

        <div class="flex space-x-6 items-center">
          <div v-for="button in block.cta[0].buttons" :key="button._uid">
            <BaseButton :link="button.link" :theme="button.theme">
              {{ button.label }}

              <template v-if="button.helper" #helper>
                {{ button.helper }}
              </template>
            </BaseButton>
          </div>
        </div>
      </div>
    </div>

    <div class="quicklinks-mobile md:grid grid-cols-3 lg:hidden px-4 -mt-16">
      <article
        class="relative text-white overflow-hidden"
        v-for="(quicklink, index) in block.quicklinks.slice(0, 3)"
        :key="quicklink._uid"
      >
        <div class="quicklink-overlay" :class="bgColor(index)" />
        <img
          class="quicklink-bg-image"
          :src="quicklink.backgroundImage.filename"
          alt=""
        />

        <div class="p-6 mt-6">
          <BaseHeading size="h2">
            {{ quicklink.title }}
          </BaseHeading>

          <a :href="quicklink.link.cached_url">
            {{ quicklink.linkText }}
            <BaseIcon
              file="arrow-right"
              class="inline ml-3 h-4 w-4"
              alt="arrow right"
            />
          </a>
        </div>
      </article>
    </div>

    <div
      class="quicklinks-desktop hidden lg:grid container mx-auto grid-cols-5 -mt-16 z-30"
    >
      <article
        class="relative text-white overflow-hidden"
        v-for="(quicklink, index) in block.quicklinks"
        :key="quicklink._uid"
      >
        <div class="quicklink-overlay" :class="bgColor(index)" />
        <img
          class="quicklink-bg-image"
          :src="quicklink.backgroundImage.filename"
          alt=""
        />

        <div class="p-6 mt-12">
          <BaseHeading size="h2">
            {{ quicklink.title }}
          </BaseHeading>

          <BaseLink :link="quicklink.link">
            {{ quicklink.linkText }}
            <BaseIcon
              file="arrow-right"
              class="inline ml-3 h-4 w-4"
              alt="arrow right"
            />
          </BaseLink>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import BaseHeading from "@/components/base/BaseHeading.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseIcon from "@/components/base/BaseIcon.vue";
import BaseLink from "../base/BaseLink.vue";

export default {
  components: {
    BaseHeading,
    BaseButton,
    BaseIcon,
    BaseLink,
  },
  props: {
    block: {
      type: Object,
      required: true,
    },
  },
  computed: {
    backgroundContent() {
      return this.block.backgroundContent[0];
    },
    hasVideo() {
      return this.block.backgroundContent[0].image ? true : false;
    },
  },
  methods: {
    bgColor(num) {
      let color;
      switch (num) {
        case 0:
          color = "bg-primary";
          break;
        case 1:
          color = "bg-secondary";
          break;
        case 2:
          color = "bg-accent";
          break;
        case 3:
          color = "bg-primary";
          break;
        case 4:
          color = "bg-secondary";
          break;
      }

      return color;
    },
  },
};
</script>

<style scoped>
.hero-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 100px);
  width: 100%;
  overflow: hidden;
}

.background-video {
  filter: saturate(0);
}

.background-image,
.background-video {
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
.background-overlay {
  @apply bg-black inset-0 absolute opacity-90;
  height: 100%;
  z-index: -2;
}

.quicklink-overlay {
  @apply inset-0 absolute opacity-75;
  z-index: -1;
}

.quicklink-bg-image {
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;
  z-index: -2;
}

@media (min-width: 1270px) {
  .background-image,
  .background-video {
    height: auto;
    width: 100%;
  }
}
</style>
