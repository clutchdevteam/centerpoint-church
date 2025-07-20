<template>
  <div class="w-full">
    <StoryblokComponent v-if="story" :blok="story.content" />

    <section class="base-wrapper my-24">
      <div class="flex w-full justify-end mb-4">
        <label>
          <span class="mr-3">Filter:</span>
          <select
            class="p-2 border rounded border-black border-opacity-20"
            v-model="filter"
          >
            <option :value="null" selected>All</option>
            <option v-for="book in booksOfBible" :key="book" :value="book">
              {{ book }}
            </option>
          </select>
        </label>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"
        ></div>
        <p class="mt-4 text-lg">Loading sermons...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <BaseHeading size="h2">Something went wrong</BaseHeading>
        <p class="text-xl mt-2">Unable to load sermons at this time.</p>
        <button
          @click="retryLoad"
          class="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
        >
          Try Again
        </button>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="filteredSermons.length === 0"
        class="text-center flex flex-col justify-center space-y-3 py-12"
      >
        <BaseHeading size="h2">Uh oh!</BaseHeading>

        <p class="text-xl">Looks like we couldn't find anything.</p>

        <p class="opacity-50 italic">
          "... Keep on seeking, and you will find ..." - Matthew 7:7
        </p>
      </div>

      <!-- Sermons Grid -->
      <div v-else class="grid md:grid-cols-2 xl:grid-cols-4 gap-12">
        <EventCard
          v-for="sermon in filteredSermons"
          :key="sermon.id"
          :event="sermon"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { useStoryblokBridge, useStoryblokApi } from "@storyblok/nuxt-2";
import { booksOfBible } from "@/utils/bible";

import BaseHeading from "@/components/base/BaseHeading.vue";
import EventCard from "@/components/EventCard.vue";

export default {
  components: {
    BaseHeading,
    EventCard,
  },
  data() {
    return {
      story: { content: {} },
      sermons: [],
      filter: null,
      loading: false,
      error: false,
      booksOfBible,
    };
  },
  computed: {
    ...mapState("global", ["loaded"]),
    version() {
      return process.env.IS_PREVIEW ? "draft" : "published";
    },
    filteredSermons() {
      let sermons = this.sermons;

      if (this.filter) {
        sermons = sermons.filter((sermon) => {
          return sermon.content.bookOfBible === this.filter;
        });
      }

      return sermons;
    },
  },
  async fetch() {
    await this.loadPageData();
  },
  mounted() {
    if (this.story.id) {
      useStoryblokBridge(this.story.id, (newStory) => (this.story = newStory));
    }
  },
  methods: {
    async loadPageData() {
      this.loading = true;
      this.error = false;

      try {
        const fullSlug = this.$route.path === "/" ? "home" : this.$route.path;
        const storyblokApi = useStoryblokApi();

        // Load page story and sermons in parallel
        const [pageData, globalData] = await Promise.all([
          storyblokApi.get(`cdn/stories/${fullSlug}`, {
            version: this.version,
          }),
          storyblokApi.get("cdn/stories/global", {
            version: this.version,
          }),
        ]);

        await this.getSermons(storyblokApi);

        this.$store.commit("global/setGlobals", globalData.data.story.content);
        this.story = pageData.data.story;
      } catch (err) {
        console.error("Error loading page data:", err);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },

    async retryLoad() {
      await this.loadPageData();
    },

    async getSermons(api) {
      try {
        const sermons = await api.get(`cdn/stories`, {
          version: this.version,
          starts_with: "sermons/",
        });

        this.sermons = sermons.data.stories
          .filter((story) => !story.is_startpage)
          .sort((a, b) => {
            return new Date(b.content.date) - new Date(a.content.date);
          });

        console.log(this.sermons);
      } catch (err) {
        console.error("Error loading sermons:", err);
        throw err;
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
/* Remove unused calendar styles */
</style>
