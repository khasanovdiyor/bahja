<template>
  <div>
    <div
      class="w-full relative px-5 flex text-xl items-center float-right py-8 font-semibold h-8 bg-black text-white"
    >
      SHOPPING CART
      <img
        src="@/assets/images/close.svg"
        class="close-btn absolute right-10 w-4 cursor-pointer"
        alt="close icon"
        @click="$emit('toggleCard')"
      />
    </div>

    <div class="mb-5 w-full px-5 ml-auto">
      <div class="w-full py-5 scroll mt-12 overflow-y-scroll">
        <div
          class="flex mb-5"
          v-for="(product, index) in products"
          :key="index"
        >
          <a href="#">
            <img
              :src="product.image"
              class="w-56 md:w-32 md:h-32 object-cover"
              alt="koylak"
            />
          </a>

          <span class="w-full px-5">
            <h2 class="font-semibold text-gray-400">Mahsulot nomi</h2>

            <p
              class="text-sm font-bold text-gray-600"
              v-if="product.attributes.color"
            >
              {{ product.attributes.color.value }} {{ product.size }}
            </p>

            <div class="flex mt-8">
              <span class="flex items-center h-6 bg-gray-200">
                <button @click="increment(index)" class="w-6 text-lg font-bold">
                  -
                </button>
                <p class="w-6 text-lg text-center">{{ product.count }}</p>
                <button @click="decrement(index)" class="w-6 text-lg font-bold">
                  +
                </button>
              </span>

              <p
                class="font-bold ml-5 text-gray-700 text-lg"
                v-if="product.price"
              >
                {{ product.price.toLocaleString() }} UZS
              </p>
              <img
                @click="deleteProduct(index)"
                class="w-5 ml-auto cursor-pointer"
                src="../assets/images/delete.svg"
                alt="o'chirish"
                value="o'chirish"
              />
            </div>
          </span>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <nuxt-link
        v-if="products.length > 0"
        to="/order"
        class="w-56 flex items-center justify-center mx-auto text-sm font-semibold uppercase py-6 h-8 bg-black text-white"
      >
        buyurtma berish
      </nuxt-link>
      <span v-else class="font-bold text-2xl"
        >Savatchaga mahsulot qo'shmadingiz</span
      >
    </div>
  </div>
</template>

<script>
import global from "~/mixins.js/global.js";

export default {
  mixins: [global],
  props: {
    products: {
      type: Array,
      required: false,
    },
    product: {},
  },
  data() {
    return {};
  },
  methods: {
    increment(index) {
      this.products[index].count++;
      localStorage.setItem("products");
    },
    decrement(index) {
      this.products[index].count--;
      localStorage.setItem("products", JSON.stringify(this.products));
    },
    deleteProduct(index) {
      this.products.splice(index, 1);
      const parsed = JSON.stringify(this.products);
      localStorage.setItem("products", parsed);
    },
  },
};
</script>

<style>
.scroll::-webkit-scrollbar {
  width: 5px;
}
.scroll::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 20px;
}
::-webkit-scrollbar-track {
  background: #dbdada;
  border-radius: 10px;
}
</style>
