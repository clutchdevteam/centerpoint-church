<template>
  <nuxt-link
    v-if="link.linktype === 'story'"
    :to="$formRoute({ url: link.cached_url })"
  >
    <span><slot /> </span>
    <BaseIcon
      class="inline ml-3 mb-1 w-4 h-4"
      file="arrow-right"
      alt="small right arrow"
      v-if="show_arrow"
    />
  </nuxt-link>

  <a v-else :href="link.url">
    <span><slot /> </span>
    <BaseIcon
      v-if="show_arrow"
      class="inline ml-1 mb-1 w-4 h-4"
      file="arrow-right"
      alt="small right arrow"
    />
  </a>
</template>

<script>
import BaseIcon from "@/components/base/BaseIcon.vue";

export default {
  components: {
    BaseIcon,
  },
  props: {
    link: {
      type: Object,
      required: true,
    },
    show_arrow: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
