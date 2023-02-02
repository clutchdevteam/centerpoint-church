<template>
  <div>
    <template v-if="menu.menu">
      <BaseMenuItem :menu="menu" />
    </template>

    <BaseLink
      v-else
      class="block whitespace-nowrap"
      :link="menu.link"
      :id="menu.label.toLowerCase().replace(' ', '-')"
    >
      {{ menu.label }}
    </BaseLink>
  </div>
</template>

<script>
import BaseMenuItem from "./BaseMenuItem.vue";
import BaseLink from "./BaseLink.vue";

export default {
  name: "BaseMenu",
  components: {
    BaseMenuItem,
    BaseLink,
  },
  props: {
    menu: {
      type: Object,
      required: true,
    },
  },
};
</script>
