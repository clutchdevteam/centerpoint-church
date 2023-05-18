<template>
  <div class="rich-text-block" v-html="document" />
</template>

<script>
import { renderRichText } from "@storyblok/nuxt-2";
export default {
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  computed: {
    document() {
      return renderRichText(this.content);
    },
  },
};
</script>

<style lang="postcss" scoped>
>>> p,
>>> ul,
>>> ol,
>>> blockquote,
>>> code,
>>> .rich-text-image-wrapper,
>>> hr {
  @apply mb-6 lg:mb-12 leading-loose;
}

>>> hr {
  @apply border-0 border-t-2 border-black opacity-10;
}

>>> h1,
>>> h2,
>>> h3,
>>> h4,
>>> h5,
>>> h6 {
  @apply mb-3 text-primary;
}

>>> ul li p,
>>> ol li p {
  margin-bottom: 0;
}

>>> h1,
>>> h2,
>>> h3,
>>> h4,
>>> h5,
>>> h6 {
  @apply font-bold;
}

>>> h1 {
  @apply leading-tight text-5xl lg:text-6xl;
}

>>> h2 {
  @apply text-3xl lg:text-5xl;
}

>>> h3 {
  @apply font-semibold text-2xl lg:text-3xl;
}

>>> h4 {
  @apply text-xl font-semibold lg:text-2xl;
}

>>> h5 {
  @apply text-lg lg:text-xl;
}

>>> h6 {
  @apply font-semibold leading-tight;
}

>>> ul,
>>> ol {
  @apply ml-5;
}

>>> ul {
  @apply list-disc;
}

>>> ol {
  @apply list-decimal;
}

>>> blockquote {
  @apply border-l-2 border-gray pl-4 py-2 ml-2;
}

>>> blockquote p {
  @apply mb-0;
}

>>> a {
  @apply text-primary underline;
}

>>> img {
  @apply w-full lg:w-3/4 mx-auto;
}

>>> b {
  @apply text-primary;
}

@screen md {
  >>> p {
    @apply text-base mb-5;
  }
}
</style>
