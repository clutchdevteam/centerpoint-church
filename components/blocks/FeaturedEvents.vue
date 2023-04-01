<template>
  <section class="my-14 lg:my-32 base-wrapper">
    <div class="mb-6">
      <p v-if="block.kicker" class="text-primary">{{ block.kicker }}</p>
      <BaseHeading size="h2">{{ block.title }}</BaseHeading>
      <div class="h-1 w-32 bg-accent mt-2 mb-4" />
      <p v-if="block.subtitle" class="lg:w-1/2">{{ block.subtitle }}</p>
    </div>

    <div v-if="loading">
      <p>Loading...</p>
    </div>

    <div class="grid sm:grid-cols-3 lg:grid-cols-4 gap-12 lg:gap-6" v-else>
      <article
        v-for="(event, index) in events"
        class="w-full bg-white shadow-md"
        :key="index"
      >
        <div class="w-full h-[117px] overflow-hidden">
          <img :src="event.image" />
        </div>
        <div class="w-full p-4">
          <BaseHeading size="h3">{{ event.title }}</BaseHeading>
          <p class="text-secondary text-sm mb-4">{{ event.date }}</p>
          <a class="text-primary underline" :href="event.link">Read More</a>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import { useStoryblokApi } from "@storyblok/nuxt-2";
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
  },
  data() {
    return {
      events: [],
      loading: true,
    };
  },
  async fetch() {
    const storyblokApi = useStoryblokApi();

    this.getEvents(storyblokApi);
  },
  methods: {
    async getEvents(api) {
      const eventSlugs = this.block?.events
        .map((event) => {
          return event.event.cached_url;
        })
        .join(",");

      // write a function that takes in an array of slugs and returns an array of stories and ensures they load on the page

      const { data } = await api.get(`cdn/stories`, {
        version: this.version,
        by_slugs: eventSlugs,
      });

      this.events = await data.stories.map((event) => {
        return {
          id: event.uuid,
          title: event.name,
          date: event.content?.date,
          time: event.content?.time,
          image: event.content?.image.filename,
          link: event.full_slug,
        };
      });

      this.loading = false;
    },
  },
};
</script>
