<template>
  <div v-editable="blok" class="w-full">
    <InteriorTitle :block="blok.title[0]" />

    <section class="base-wrapper my-12 xl:my-24 mx-my-12">
      <div class="grid lg:grid-cols-2">
      <div>
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13659.746401200917!2d-81.5873438!3d31.1392754!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e5266ed5c106f9%3A0x1d178307add3411d!2sCenterPoint%20Church!5e0!3m2!1sen!2sus!4v1685712874456!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <div>
        <BaseRichText  
          v-if="blok.body"
          :content="blok.body"
        />
      </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import BaseRichText from "./base/BaseRichText/BaseRichText.vue";

defineProps({ blok: Object });
</script>
