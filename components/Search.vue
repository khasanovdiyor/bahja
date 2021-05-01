<template>
  <div>
    <div
      class="w-full relative px-5 flex text-xl items-center float-right py-8 font-semibold h-8 bg-black text-white"
    >
      QIDIRUV
      <img
        src="@/assets/images/close.svg"
        class="close-btn absolute right-10 w-4 cursor-pointer"
        alt="close icon"
        @click="$emit('toggleSearch')"
      />
    </div>

    <div class="mb-5 w-full px-5 ml-auto">
      <div class="w-full py-5">
        <!-- <div class="h-24 border-b-2 mb-10">
          <multiselect
            v-model="selectedBrand"
            :options="categories"
            placeholder="Kategoriya tanlang"
            label="name"
            track-by="name"
          ></multiselect>
        </div> -->
        <div class="border-b-2 pb-10 mt-12">
          <input
            type="text"
            v-model="searchKey"
            class="px-2 text-gray-600 py-2 border w-full rounded-sm"
            placeholder="Mahsulot qidiring..."
            v-debounce:300ms="searchProducts"
          />
        </div>
        <div class="my-6">
          <h2 class="font-bold text-lg">Qidiruv natijalari...</h2>
        </div>
        <div
          class="h-96"
          :class="{ 'scroll overflow-y-scroll': products.length > 2 }"
        >
          <div v-if="products">
            <h2 class="font-semibold" v-if="notFound">
              Qidiruv natijasi topilmadi
            </h2>
            <div
              class="flex mb-5"
              v-for="(product, index) in products"
              :key="index"
            >
              <img
                :src="product.image"
                class="w-56 md:w-32 md:h-32 object-cover"
                alt="koylak"
              />
              <span class="w-full px-5">
                <h2 class="font-semibold text-gray-400">Mahsulot nomi</h2>

                <p
                  class="text-sm font-bold text-gray-600"
                  v-if="product.attributes.color"
                >
                  {{ product.attributes.color.value }} {{ product.size }}
                </p>

                <div class="flex mt-8">
                  <p
                    class="font-bold ml-5 text-gray-700 text-lg"
                    v-if="product.price"
                  >
                    {{ product.price.toLocaleString() }} UZS
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
      products: [],
    };
  },
  methods: {
    searchProducts() {
      this.$axios
        .get(`product/list/`, {
          params: {
            search: this.searchKey,
            size: 5,
          },
        })
        .then(res => {
          this.products = res.data.results;
          if (!res.data.results) {
            this.notFound = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getCategories();
  },
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
