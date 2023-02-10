<template>
  <div class="w-full">
    <StoryblokComponent v-if="story" :blok="story.content" />

    <section
      class="base-wrapper my-24 grid md:grid-cols-2 xl:grid-cols-3 gap-12"
    >
      <article
        class="w-full rounded-md overflow-hidden bg-white shadow-md cursor-pointer"
        v-for="event in events"
        :key="event._uid"
        @click.prevent="$router.push({ path: event.slug })"
      >
        <div class="relative h-[120px] overflow-hidden">
          <div class="absolute h-full w-full bg-secondary opacity-75" />
          <img
            class="w-full h-[120px] object-cover"
            :src="event.content.image.filename"
            alt=""
          />
        </div>
        <header class="flex flex-col p-6">
          <a :href="event.slug">
            <BaseHeading size="h4" tag="h3">{{ event.name }}</BaseHeading>
          </a>

          <p class="opacity-50 mb-4">{{ getDate(event.content.date) }}</p>

          <p class="text-primary underline">See More</p>
        </header>
      </article>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { useStoryblokBridge, useStoryblokApi } from "@storyblok/nuxt-2";
import { formatDate } from "@/utils/dates";

import BaseHeading from "@/components/base/BaseHeading.vue";

export default {
  components: {
    BaseHeading,
  },
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

      this.getEvents(storyblokApi);

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
  methods: {
    async getEvents(api) {
      const events = await api.get(`cdn/stories`, {
        version: this.version,
        starts_with: "events/",
      });

      this.events = events.data.stories.filter((story) => !story.is_startpage);
    },
    getDate(date) {
      return formatDate(date);
    },
  },
};
</script>

<style lang="postcss" scoped>
/deep/ .custom-calendar.vc-container {
  --day-border: 1px solid #b8c2cc;
  --day-border-highlight: 1px solid #b8c2cc;
  --day-width: 90px;
  --day-height: 90px;
  --weekday-bg: #f8fafc;
  --weekday-border: 1px solid #eaeaea;

  border-radius: 0;
  width: 100%;

  & .vc-header {
    @apply bg-primary;
    padding: 10px 0;

    & .vc-title {
      @apply text-white;
    }
  }

  & .vc-weeks {
    padding: 0;
  }

  & .vc-weekday {
    background-color: white;
    border-bottom: var(--weekday-border);
    border-top: var(--weekday-border);
    padding: 5px 0;
  }

  & .vc-day {
    padding: 0 5px 3px 5px;
    text-align: left;
    height: 90px;
    min-width: 90px;
    background-color: white;

    & .weekday-1,
    &.weekday-7 {
      background-color: #eff8ff;
    }

    &:not(.on-bottom) {
      border-bottom: var(--day-border);
      & .weekday-1 {
        border-bottom: var(--day-border-highlight);
      }
    }

    &:not(.on-right) {
      border-right: var(--day-border);
    }
  }

  & .vc-day-dots {
    margin-bottom: 5px;
  }
}
</style>
