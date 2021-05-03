<template>
  <div
    class="bg-gray-800 rounded-md text-sm text-white capitalize inline-block"
  >
    <nuxt-link v-if="link" :to="url" class="py-2 px-4 block">{{
      buttonText
    }}</nuxt-link>
    <button v-else @click="$emit('button-click')" class="py-2 px-4">
      {{ buttonText }}
    </button>
  </div>
</template>
<script>
export default {
  name: "BaseButtonLink",
  props: {
    link: {
      type: Boolean,
      default: false,
    },
    buttonText: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      default: "",
    },
  },
};
</script>

<style></style>
