<template>
  <div class="relative shadow pb-6">
    <div class="w-full h-72">
      <img
        :src="product.image"
        alt="product image"
        class="object-cover mr-10  w-full h-full"
      />
    </div>
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
