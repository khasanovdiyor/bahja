<template>
  <div>
    <div
      class="w-full flex items-center justify-between px-5 text-lg py-7 font-semibold h-6 bg-black text-white"
    >
      SHOPPING CART
      <img
        src="~/assets/images/close.svg"
        class="close-btn top-6 w-4 cursor-pointer"
        alt="close icon"
        @click="$emit('toggleCard')"
      />
    </div>

    <div class="mt-10">
      <div
        class="h-96 w-full"
        :class="{ 'scroll overflow-y-scroll': products.length > 2 }"
      >
        <div v-if="products">
          <div
            class="mb-5 flex px-6"
            v-for="(product, index) in products"
            :key="index"
          >
            <div>
              <img
                :src="product.image"
                class="w-40 h-28 object-cover"
                alt="koylak"
              />
            </div>

            <span class="w-full mt-auto px-5">
              <h2 class="font-semibold text-gray-600">Mahsulot nomi</h2>

              <p
                class="text-sm font-bold text-gray-400"
                v-if="product.attributes.color"
              >
                Rangi: {{ product.attributes.color.value }} O'lchami:
                {{ product.attributes.size.value }}
              </p>

              <div class="flex mt-8">
                <span class="flex items-center h-6 bg-gray-200">
                  <button
                    @click="decrement(index)"
                    class="w-6 text-lg font-bold"
                  >
                    -
                  </button>
                  <p class="w-6 text-lg text-center">{{ product.count }}</p>
                  <button
                    @click="increment(index)"
                    class="w-6 text-lg font-bold"
                  >
                    +
                  </button>
                </span>
                <p
                  class="font-bold ml-5 text-gray-700 text-lg"
                  v-if="product.price"
                >
                  {{ (product.price * product.count).toLocaleString() }} UZS
                </p>
                <img
                  @click="deleteProduct(index)"
                  class="w-5 ml-auto cursor-pointer"
                  src="~/assets/images/delete.svg"
                  alt="o'chirish"
                  value="o'chirish"
                />
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <div>
        <div v-if="products.length > 0">
          <h3 class="uppercase w-2/3 mb-6 mx-auto font-semibold">
            jami: {{ totalFromParent.toLocaleString() }}
          </h3>
          <nuxt-link
            to="/order"
            class="w-56 flex items-center justify-center mx-auto text-sm font-semibold uppercase py-6 h-8 bg-black text-white"
          >
            buyurtma berish
          </nuxt-link>
        </div>

        <span v-else class="font-bold text-2xl">Savatcha bo'sh</span>
      </div>
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
      required: true
    },
    savedProducts: {
      type: Array,
      required: true
    },
    totalFromParent: {
      type: Number,
      required: true
    }
  },
  watch: {
    savedProducts: {
      deep: true,
      handler(newValue) {
        localStorage.setItem("products", JSON.stringify(newValue));
      }
    }
  },
  methods: {
    getTotalPrice() {
      this.totalFromParent = 0;
      this.products.forEach(el => {
        this.totalFromParent += el.price * el.count;
      });
    },
    increment(index) {
      if (this.savedProducts[index].count < this.products[index].quantity) {
        this.savedProducts[index].count++;
        this.products[index].count++;
        this.getTotalPrice();
      }
    },
    decrement(index) {
      if (this.savedProducts[index].count > 1) {
        this.savedProducts[index].count--;
        this.products[index].count--;
        this.getTotalPrice();
      }
    },
    deleteProduct(index) {
      this.products.splice(index, 1);
      this.savedProducts.splice(index, 1);
    }
  },
  mounted() {
    this.getTotalPrice();
  }
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
