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

<script setup>
defineProps({ blok: Object });
</script>
