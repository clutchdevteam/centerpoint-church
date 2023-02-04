<template>
  <div class="w-full">
    <StoryblokComponent v-if="story" :blok="story.content" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { useStoryblokBridge, useStoryblokApi } from "@storyblok/nuxt-2";
export default {
  data() {
    return {
      story: { content: {} },
      events: [],
    };
  },
  computed: {
    ...mapState("global", ["loaded"]),
    version() {
      return this.$nuxt.context.query._storyblok || this.$nuxt.context.isDev
        ? "draft"
        : "published";
    },
  },
  async fetch() {
    if (!this.loaded) {
      const fullSlug = this.$route.path === "/" ? "home" : this.$route.path;

      const storyblokApi = useStoryblokApi();
      const { data } = await storyblokApi.get(`cdn/stories/${fullSlug}`, {
        version: this.version,
      });

      const events = await storyblokApi.get(`cdn/stories`, {
        version: this.version,
        starts_with: "events/",
      });

      this.events = events.data.stories.filter((story) => !story.is_startpage);

      const globalRes = await storyblokApi.get("cdn/stories/global", {
        version: "draft",
      });
      this.$store.commit("global/setGlobals", globalRes.data.story.content);
      this.story = data.story;
    }
  },
  mounted() {
    useStoryblokBridge(this.story.id, (newStory) => (this.story = newStory));
  },
};
</script>
