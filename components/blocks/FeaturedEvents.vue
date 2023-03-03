<template>
  <div>featured events</div>
</template>

<script>
import { useStoryblokBridge, useStoryblokApi } from "@storyblok/nuxt-2";
export default {
  props: {
    block: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      events: [],
    };
  },
  async fetch() {
    const storyblokApi = useStoryblokApi();

    this.getEvents(storyblokApi);
  },
  methods: {
    async getEvents(api) {
      // generate a comma delimited string of slugs
      const eventSlugs = this.block?.events
        .map((event) => {
          return event.event.cached_url;
        })
        .join(",");

      const { data } = await api.get(`cdn/stories`, {
        version: this.version,
        by_slugs: eventSlugs,
        resolve_links: "event",
      });

      console.log(data);

      this.events = data.stories
        .filter((story) => !story.is_startpage)
        .sort((a, b) => {
          return new Date(b.content.date) - new Date(a.content.date);
        });
    },
  },
};
</script>
