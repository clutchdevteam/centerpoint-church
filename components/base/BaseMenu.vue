<template>
  <div>
    <template v-if="menu.menu">
      <BaseMenuItem :menu="menu" />
    </template>

    <nuxt-link
      class="block"
      v-else
      :id="menu.label.toLowerCase().replace(' ', '-')"
      :to="$formRoute({ url: menu.link.cached_url })"
    >
      {{ menu.label }}
    </nuxt-link>
  </div>
</template>

<script>
import BaseMenuItem from "./BaseMenuItem.vue";

export default {
  name: "BaseMenu",
  components: {
    BaseMenuItem,
  },
  props: {
    menu: {
      type: Object,
      required: true,
    },
  },
};
</script>
