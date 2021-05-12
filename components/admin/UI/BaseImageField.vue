<template>
  <div>
    <label
      class="block font-bold text-gray-600 text-gray-600 relative uppercase text-sm mb-1"
      >{{ label }}
      <p v-if="required" class="inline-block text-xs absolute text-red-500">
        &#10043;
      </p></label
    ><input
      type="file"
      accept="image/*"
      multiple
      @change="$emit('change', $event)"
      class="w-1/2 border-2 rounded-md bg-white text-sm py-2 pl-5"
    />
    <div v-if="images" class="flex">
      <div
        v-for="(item, index) in images"
        :key="index"
        class="w-56 h-64 relative shadow-sm my-5 mr-2"
      >
        <img :src="item" class="object-cover w-full m-2 h-full" />
        <span
          @click="$emit('remove-image', index, images)"
          class="absolute top-4 right-4 bg-white w-5 h-5 flex items-center justify-center cursor-pointer rounded-full"
          >X</span
        >
      </div>
    </div>
    <div v-if="image">
      <div class="w-56 h-64 my-5 border shadow-md">
        <img :src="image" class="object-cover w-full h-full" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    images: {
      type: Array,
      default: () => []
    },
    image: {
      type: String,
      default: ""
    },
    multipe: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style>
</style>