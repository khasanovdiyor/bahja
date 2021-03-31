<template>
  <button class="bg-gray-800 text-white py-2 px-4" @click="clickFunction">
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: "BaseButton",
  props: {
    clickFunction: {
      type: Function,
      required: false,
      default: function() {
        console.log("base button default function");
      }
    }
  }
};
</script>

<style></style>
