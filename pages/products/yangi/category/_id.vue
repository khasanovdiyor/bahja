<template>
  <div>
    <TheContact />
    <TheHeader />
    <div class="flex">
      <TheSidebar :currentLink="link" />
      <div class="px-16 w-full">
        <h1 class="px-16 capitalize text-center font-bold  text-2xl my-5">
          mahalliy mahsulotlar
        </h1>
        <h2 class="px-16 capitalize text-center font-bold  text-xl my-5">
          {{ productCategory }}
        </h2>
        <h2
          class="font-bold text-xl mt-36 h-1/3 text-center w-full"
          v-if="products.length == 0"
        >
          Hozircha bu bo'limda mahsulotlar mavjud emas!
        </h2>
        <div class="relative mb-16" v-if="products.length > 0">
          <h3 class="mb-2">Tartiblash &#8595;</h3>
          <span class="text-gray-600 cursor-pointer" @click="showSort = true">{{
            selectedSort
          }}</span>
          <div
            class="absolute bg-gray-400 text-white bottom-0 z-40"
            v-if="showSort"
          >
            <ul>
              <li
                v-for="option in sortOptions"
                :key="option.slug"
                @click="getProductsBySort(option.slug, option.text)"
                class="cursor-pointer hover:bg-gray-600 py-2 px-4"
              >
                {{ option.text }}
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-10 flex justify-between flex-wrap">
          <!-- Product card -->
          <nuxt-link
            class="mb-6 cursor-pointer transition w-64 duration-150 transform hover:scale-105"
            :to="'/product/' + product.parent_id"
            v-for="product in products"
            :key="product.id"
          >
            <ProductCard :product="product" class="" />
          </nuxt-link>
        </div>
      </div>
    </div>

    <TheFooter />
  </div>
</template>
<script>
export default {
  data() {
    return {
      link: "yangi",
      showSort: false,
      selectedSort: "Tartiblash",
      products: [],
      productCategory: null
    };
  },
  methods: {
    getProducts() {
      this.$axios
        .get(
          `product/variation-list/?ordering=created_at&category=${this.$route.params.id}`
        )
        .then(res => {
          console.log("variation-list", res.data);
          this.products = res.data;
          this.product = this.products[0].category.name;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getProducts();
  }
};
</script>
