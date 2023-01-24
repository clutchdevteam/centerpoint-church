<template>
  <component :is="component" :class="size">
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      required: true,
      validator: (value) =>
        ["h1", "h2", "h3", "h4", "h5", "h6"].includes(value),
    },
    /** The semantic HTML element used for the heading. Defaults to the value of `size`. */
    tag: {
      type: String,
      default: undefined,
      validator: (value) =>
        ["h1", "h2", "h3", "h4", "h5", "h6", "div"].includes(value),
    },
  },
  computed: {
    component() {
      return this.tag ?? this.size.slice(0, 2);
    },
  },
};
</script>

<style lang="postcss" scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  @apply tracking-tight;
}

.h1,
.h2 {
  @apply font-display font-semibold;
}

.h1 {
  @apply leading-tight;
  font-size: 48px;
}

.h2 {
  font-size: 36px;
}

.h3 {
  @apply font-semibold;

  font-size: 20px;
}

.h4 {
  @apply text-xl font-semibold lg:text-2xl;
}

.h5 {
  @apply text-xl font-semibold;
}

.h6 {
  @apply text-lg font-normal leading-tight;
}

@screen lg {
  .h1 {
    font-size: 65px;
  }

  .h2 {
    font-size: 32px;
  }

  .h4 {
  }

  .h5 {
  }

  .h6 {
  }
}
</style>
