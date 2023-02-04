<template>
  <div>
    <nuxt-link
      v-if="link.linktype === 'story'"
      :to="$formRoute({ url: link.cached_url })"
      prefetch
    >
      <slot />
    </nuxt-link>

    <a v-else :href="link.url"> <slot /></a>
  </div>
</template>

<script>
export default {
  props: {
    link: {
      type: Object,
      required: true,
    },
  },
};
</script>
