<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>

<script>
import { mapState } from "vuex";
import { useStoryblokBridge, useStoryblokApi } from "@storyblok/nuxt-2";
export default {
  data() {
    return {
      story: { content: {} },
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
    const fullSlug = this.$route.path === "/" ? "home" : this.$route.path;

    const storyblokApi = useStoryblokApi();
    const { data } = await storyblokApi.get(`cdn/stories/${fullSlug}`, {
      version: this.version,
    });
    this.story = data.story;
    if (!this.loaded) {
      const globalRes = await storyblokApi.get("cdn/stories/global", {
        version: this.version,
      });
      this.$store.commit("global/setGlobals", globalRes.data.story.content);
      this.$store.commit("global/setLoaded", true);
    }
  },
  mounted() {
    useStoryblokBridge(this.story.id, (newStory) => (this.story = newStory));
  },
};
</script>
