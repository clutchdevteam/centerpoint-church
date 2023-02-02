<template>
  <div v-editable="blok" class="w-full">
    <component
      v-for="block in blok.body"
      :is="block.component"
      :key="block._uid"
      :block="block"
    />
  </div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
};
</script>
