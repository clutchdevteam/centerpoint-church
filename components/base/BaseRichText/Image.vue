<template>
  <img :src="attrs.src" :alt="attrs.alt" :title="attrs.title" />
</template>

<script>
export default {
  name: "SbImage",
  props: {
    attrs: {
      type: Object,
      required: true,
    },
  },
};
</script>
