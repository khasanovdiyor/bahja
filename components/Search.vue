<template>
  <div class="max-w-sm z-100">
    <div
      class="sm:max-w-full flex items-center justify-between px-5 text-lg py-7 font-semibold h-6 bg-black text-white"
    >
      <p class="pl-3">QIDIRUV</p>

      <img
        src="@/assets/images/close.svg"
        class="close-btn ml-auto w-4 cursor-pointer"
        alt="close icon"
        @click="$emit('toggleSearch')"
      />
    </div>

    <div class="mb-5 sm:max-w-full w-96 pl-0 sm:pl-6 ml-auto">
      <div class="w-full py-5 pl-5 sm:px-0">
        <div class="border-b-2 sm:px-0 px-5 mx-auto pb-10 mt-6">
          <input
            type="text"
            v-model="searchKey"
            class="text-gray-600 py-2 pl-5 border rounded-md w-full"
            placeholder="Mahsulot qidirish..."
            v-debounce:300ms="searchProducts"
          />
        </div>
        <div class="my-6">
          <h2 class="font-bold text-gray-600 pl-6">Qidiruv natijasi ...</h2>
        </div>
        <div
          class="h-96 ml-5"
          :class="{ 'scroll overflow-y-scroll': products.length > 2 }"
        >
          <div v-if="products">
            <h2 class="font-semibold" v-if="notFound">
              Qidiruv natijasi topilmadi
            </h2>
            <div v-for="(product, index) in products" :key="index">
              <nuxt-link
                class="flex mb-5"
                :to="`/product/${product.id}`"
                @click.native="$emit('close')"
              >
                <img
                  :src="product.image"
                  class="w-32 md:w-36 h-32 object-cover border shadow-md"
                  alt="product-img"
                />
                <span class="w-1/2 pl-6 leading-relaxed mr-4">
                  <b class="text-gray-700">{{ product.name }}</b>
                  <div v-if="product.attributes" class="text-sm">
                    <p
                      class="text-gray-600 capitalize"
                      v-for="attr in product.attributes"
                      :key="attr.id"
                    >
                      {{ attr.label }}: <b>{{ attr.value }}</b>
                    </p>
                  </div>
                  <p
                    class="font-bold flex mt-8 ml-2 text-gray-700 text-lg"
                    v-if="product.price"
                  >
                    {{ product.price.toLocaleString() }} so'm
                  </p>
                </span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCategory: {},
      searchKey: "",
      notFound: false,
      products: []
    };
  },
  methods: {
    searchProducts() {
      if (this.searchKey !== "") {
        this.$axios
          .get(`product/list/`, {
            params: {
              search: this.searchKey,
              size: 5
            }
          })
          .then(res => {
            this.products = res.data.results;
            if (!res.data.results) {
              this.notFound = true;
            }
          })
          .catch(err => {});
      }
    }
  },
  mounted() {
    this.getCategories();
  }
};
</script>

<style scoped>
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
