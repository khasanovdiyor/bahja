<template>
  <div
    class="fixed z-40 bg-gray-500 opacity-50 flex items-center justify-center"
  >
    <div class="w-1/3 rounded-md mx-auto bg-white py-4 px-10">
      <span class="font-bold text-center text-xl block mb-6">{{ text }}</span>
      <div class="flex justify-between">
        <button
          @click="$emit('delete')"
          class="bg-red-500 rounded-md text-white py-2 px-4"
        >
          Ha
        </button>
        <button
          @click="$emit('close-modal')"
          class="bg-gray-500 rounded-md text-white py-2 px-4"
        >
          Yo'q
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
</style>