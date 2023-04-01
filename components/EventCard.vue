<template>
  <article
    class="w-full rounded-md overflow-hidden bg-white shadow-md cursor-pointer"
    @click.prevent="$router.push({ path: event.full_slug })"
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
      <a :href="event.full_slug">
        <BaseHeading size="h4" tag="h3">{{ event.name }}</BaseHeading>
      </a>

      <p class="opacity-50 mb-4">{{ getDate(event.content.date) }}</p>

      <p class="text-primary underline">See More</p>
    </header>
  </article>
</template>

<script>
import BaseHeading from "@/components/base/BaseHeading.vue";
import { formatDate } from "@/utils/dates";

export default {
  components: {
    BaseHeading,
  },
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getDate(date) {
      return formatDate(date);
    },
  },
};
</script>
