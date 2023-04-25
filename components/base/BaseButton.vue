<template>
  <div>
    <BaseLink :class="`btn btn-${theme}`" v-if="link" :link="link">
      <slot />
    </BaseLink>

    <button
      v-else
      :class="`btn btn-${theme}`"
      :type="type"
      @click="$emit('click')"
    >
      <slot />
    </button>

    <span class="text-sm opacity-80 mt-1">
      <slot name="helper" />
    </span>
  </div>
</template>

<script>
import BaseLink from "./BaseLink.vue";

export default {
  components: {
    BaseLink,
  },
  props: {
    type: {
      type: String,
      default: "button",
    },
    theme: {
      type: String,
      default: "primary",
    },
    link: {
      type: Object,
      required: false,
    },
  },
};
</script>

<style lang="postcss" scoped>
.btn {
  @apply px-4 py-2 font-display font-bold transition duration-150 ease-in-out border-2 border-transparent text-center flex justify-center;
  max-width: 150px;

  &.btn-primary {
    @apply bg-primary tracking-wider;

    &:hover {
      @apply border-secondary bg-opacity-50;
    }
  }

  &.btn-secondary {
    @apply border-2 border-secondary;

    &:hover {
      @apply bg-secondary bg-opacity-50;
    }
  }
}

/*  &.btn-primary {
    @apply border-white border-2 text-white;

    &:hover {
      @apply bg-white bg-opacity-10;
    }
  }

  &.btn-secondary {
    @apply bg-primary-default hover:bg-primary-dark text-white;
  }

  &.btn-tertiary {
    @apply border-primary-default border-2 text-primary-default;

    &:hover {
      @apply bg-primary-default text-white;
    }
  }
}

@screen lg {
  .btn {
    @apply text-lg;
  }
} */
</style>
