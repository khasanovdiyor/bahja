<template>
  <div class="w-full z-100 ">
    <div
      class="sm:max-w-full flex items-center justify-between px-5 text-lg py-7 font-semibold h-6 bg-black text-white"
    >
      <p class="pl-5">XARID SAVATCHASI</p>
      <img
        src="~/assets/images/close.svg"
        class="close-btn top-6 w-4 cursor-pointer ml-auto"
        alt="close icon"
        @click="$emit('toggleCard')"
      />
    </div>

    <div class="mt-10 pl-2 ml-4">
      <div
        class="h-96 w-full ml-5"
        :class="{ 'scroll overflow-y-scroll': products.length > 2 }"
      >
        <div v-if="products">
          <div
            class="mb-5 flex w-full ml-5"
            v-for="(product, index) in products"
            :key="index"
          >
            <div class="border shadow-sm">
              <img
                :src="product.image"
                class="w-32 md:w-32 h-40 object-cover"
                alt="product-img"
              />
            </div>

            <span class="w-48 px-3 mr-4">
              <h2 class="text-gray-600 ">
                <b class="">{{ product.name }}</b>
              </h2>

              <p class="text-gray-600" v-if="product.attributes.color">
                Rangi: <b>{{ product.attributes.color.value }}</b>
              </p>
              <p class="text-gray-600">
                O'lchami: <b>{{ product.attributes.size.value }}</b>
              </p>

              <div class="mt-4">
                <p
                  class="font-bold block  text-gray-700 text-lg"
                  v-if="product.price"
                >
                  {{ (product.price * product.count).toLocaleString() }} so'm
                </p>
                <div class="flex ">
                  <span class="flex  items-center h-6 bg-gray-200">
                    <button
                      @click="decrement(index)"
                      class="w-6 text-lg font-bold"
                    >
                      -
                    </button>
                    <p class="w-6 text-lg text-center">
                      {{ product.count }}
                    </p>
                    <button
                      @click="increment(index)"
                      class="w-6 text-lg font-bold"
                    >
                      +
                    </button>
                  </span>

                  <p class="ml-auto">
                    <img
                      @click="deleteProduct(index)"
                      class="w-5 cursor-pointer"
                      src="~/assets/images/delete.svg"
                      alt="delete"
                    />
                  </p>
                </div>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center text-center">
      <div class="flex justify-center mx-auto text-center">
        <div v-if="products.length > 0" class="mt-10">
          <h3 class="uppercase w-56 mb-6 text-center mx-auto font-semibold">
            jami: {{ total.toLocaleString() }}
          </h3>
          <nuxt-link
            @click.native="$emit('close')"
            to="/order"
            class="w-48 flex items-center justify-center mx-auto text-sm font-semibold rounded-sm uppercase py-6 h-8 bg-black text-white"
          >
            buyurtma berish
          </nuxt-link>
        </div>
        <span v-else class="font-bold text-xl px-32">Savatcha bo'sh</span>
      </div>
    </div>
  </div>
</template>

<script>
import global from "~/mixins.js/global.js";
import { mapGetters } from "vuex";
export default {
  mixins: [global],
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      savedProducts: "products/savedProducts"
    }),
    total() {
      return this.products.reduce((a, b) => a + b.price * b.count, 0);
    }
  },
  methods: {
    increment(index) {
      if (this.savedProducts[index].count < this.products[index].quantity) {
        this.$store.dispatch("products/incrementCount", index);
        this.$emit("increment", index);
        this.getTotalPrice();
      }
    },
    decrement(index) {
      if (this.savedProducts[index].count > 1) {
        this.$store.dispatch("products/decrementCount", index);
        this.$emit("decrement", index);
        this.getTotalPrice();
      }
    },
    deleteProduct(index) {
      this.$emit("delete", index);
      this.$store.dispatch("products/deleteProduct", index);
    }
  }
};
</script>

<style>
.scroll::-webkit-scrollbar {
  width: 5px;
  margin-left: 5px;
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
