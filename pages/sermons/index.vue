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

      <div
        v-if="filteredSermons.length === 0"
        class="text-center flex flex-col justify-center space-y-3"
      >
        <BaseHeading size="h2">Uh oh!</BaseHeading>

        <p class="text-xl">Looks like we couldn't find anything.</p>

        <p class="opacity-50 italic">
          "... Keep on seeking, and you will find ..." - Matthew 7:7
        </p>
      </div>
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
import { formatDate } from "@/utils/dates";

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
      booksOfBible: [
        "Genesis",
        "Exodus",
        "Leviticus",
        "Numbers",
        "Deuteronomy",
        "Joshua",
        "Judges",
        "Ruth",
        "1 Samuel",
        "2 Samuel",
        "1 Kings",
        "2 Kings",
        "1 Chronicles",
        "2 Chronicles",
        "Ezra",
        "Nehemiah",
        "Esther",
        "Job",
        "Psalms",
        "Proverbs",
        "Ecclesiastes",
        "Song of Solomon",
        "Isaiah",
        "Jeremiah",
        "Lamentations",
        "Ezekiel",
        "Daniel",
        "Hosea",
        "Joel",
        "Amos",
        "Obadiah",
        "Jonah",
        "Micah",
        "Nahum",
        "Habakkuk",
        "Zephaniah",
        "Haggai",
        "Zechariah",
        "Malachi",
        "Matthew",
        "Mark",
        "Luke",
        "John",
        "Acts",
        "Romans",
        "1 Corinthians",
        "2 Corinthians",
        "Galatians",
        "Ephesians",
        "Philippians",
        "Colossians",
        "1 Thessalonians",
        "2 Thessalonians",
        "1 Timothy",
        "2 Timothy",
        "Titus",
        "Philemon",
        "Hebrews",
        "James",
        "1 Peter",
        "2 Peter",
        "1 John",
        "2 John",
        "3 John",
        "Jude",
        "Revelation",
      ],
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
    const fullSlug = this.$route.path === "/" ? "home" : this.$route.path;

    const storyblokApi = useStoryblokApi();
    const { data } = await storyblokApi.get(`cdn/stories/${fullSlug}`, {
      version: this.version,
    });

    this.getSermons(storyblokApi);
    console.log("here");

    const globalRes = await storyblokApi.get("cdn/stories/global", {
      version: this.version,
    });
    this.$store.commit("global/setGlobals", globalRes.data.story.content);
    this.story = data.story;
  },
  mounted() {
    useStoryblokBridge(this.story.id, (newStory) => (this.story = newStory));
  },
  methods: {
    async getSermons(api) {
      const sermons = await api.get(`cdn/stories`, {
        version: this.version,
        starts_with: "sermons/",
      });

      this.sermons = sermons.data.stories
        .filter((story) => !story.is_startpage)
        .sort((a, b) => {
          return new Date(b.content.date) - new Date(a.content.date);
        });
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
