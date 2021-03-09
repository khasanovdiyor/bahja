<template>
  <div class="relative shadow py-5">
    <div class="w-64">
      <img
        :src="product.image"
        alt="product image"
        class="object-cover w-full h-full"
      />
    </div>

    <span class="bg-red-400 px-2 py-1 absolute top-0">{{ product.sale }}</span>
    <span
      v-if="product.isImport"
      class="bg-blue-400 px-2 py-1 absolute top-0 right-0"
      >Import</span
    >
    <div class="pl-5">
      <h4 class="text-gray-600">{{ product.name }}</h4>
      <span class="font-bold">{{ product.priceWithSale }} so'm</span>
      <del>{{ product.price }} so'm</del>

      <star-rating
        :increment="0.5"
        :rating="product.rating"
        :max-rating="5"
        inactive-color="#ccc"
        active-color="yellow"
        :star-size="15"
      >
      </star-rating>
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
