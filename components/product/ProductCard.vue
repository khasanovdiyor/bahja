<template>
  <div class="relative shadow pb-6">
    <div class="w-full h-72">
      <img
        :src="product.image"
        alt="product image"
        class="object-cover object-top w-full h-full"
      />
    </div>

    <!-- <span class="bg-red-600 px-2 py-1 text-white absolute top-0">{{
      product.sale
    }}</span>
    <span
      v-if="product.isImport"
      class="bg-blue-600 px-2 py-1 absolute top-0 right-0 text-white"
      >Import</span
    > -->
    <div class="pl-5">
      <h4 class="text-gray-500 mt-2 font-bold">{{ product.name }}</h4>
      <span class="font-bold text-lg"
        >{{ product.price.toLocaleString() }} so'm</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  }
};
</script>

<style></style>
