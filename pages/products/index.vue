<template>
  <div>
    <TheContact />
    <TheHeader />
    <div class="flex">
      <TheSidebar :currentLink="link" />
      <div class="px-16 w-full">
        <!-- <h1 class="capitalize font-bold text-center text-2xl my-5">
          Yangi mahsulotlar
        </h1> -->

        <h2
          class="font-bold text-xl mt-36 h-1/3 text-center w-full"
          v-if="products.length == 0"
        >
          Hozircha bu bo'limda mahsulotlar mavjud emas!
        </h2>

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
  layout: "user",
  data() {
    return {
      products: [],
      link: "category",
    };
  },
  methods: {
    getProducts() {
      let loader = this.$loading.show();

      this.$axios
        .get(`product/list/?ordering=created_at`)
        .then(res => {
          console.log("variation-list", res.data);
          this.products = res.data.results;
          loader.hide();
        })
        .catch(err => {
          loader.hide();
          console.log(err);
        });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
