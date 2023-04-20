<template>
  <rich-text-renderer :document="content" />
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
p,
ul,
ol,
blockquote,
code,
.rich-text-image-wrapper,
hr {
  @apply mb-6 lg:mb-12 leading-relaxed;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  @apply mb-3 text-primary;
}

ul li p,
ol li p {
  margin-bottom: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  @apply font-bold;
}

h1 {
  @apply leading-tight;
  font-size: 48px;
}

h2 {
  font-size: 36px;
}

h3 {
  @apply font-semibold;

  font-size: 20px;
}

h4 {
  @apply text-xl font-semibold lg:text-2xl;
}

h5 {
  @apply text-xl font-semibold;
}

h6 {
  @apply text-lg font-normal leading-tight;
}

ul,
ol {
  @apply ml-5;
}

ul {
  @apply list-disc;
}

ol {
  @apply list-decimal;
}

blockquote {
  @apply border-l-2 border-gray pl-4 py-2 ml-2;
}

blockquote p {
  @apply mb-0;
}

a {
  @apply underline font-bold;
}

img {
  @apply w-full lg:w-3/4 mx-auto;
}

b {
  @apply text-primary;
}

@screen md {
  p {
    @apply text-base;
  }
}
</style>
