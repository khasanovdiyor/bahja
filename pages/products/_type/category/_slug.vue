<template>
  <div class="">
    <TheContact />
    <TheHeader />
    <div class="flex">
      <TheSidebar :currentLink="link" />
      <div class="px-16 w-full">
        <h1 class="px-16 capitalize font-bold text-center text-2xl my-5">
          Import mahsulotlar
        </h1>

        <h2
          class="font-bold text-xl mt-36 h-1/3 text-center w-full"
          v-if="products.length == 0"
        >
          Hozircha bu bo'limda mahsulotlar mavjud emas!
        </h2>
        <div class="relative mb-16" v-if="this.products.length > 0">
          <h3 class="mb-2 inline-block cursor-pointer" @click="showSort = true">
            {{ selectedSort }} &#8595;
          </h3>
          <span class="text-gray-600 cursor-pointer"></span>
          <div class="absolute border-2 bg-white top-6 z-40" v-if="showSort">
            <ul>
              <li
                v-for="option in sortOptions"
                :key="option.slug"
                @click="getProductsBySort(option.slug, option.text)"
                class="cursor-pointer hover:bg-gray-200 py-2 px-4"
              >
                {{ option.text }}
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-10 flex justify-between flex-wrap w-full">
          <!-- Product card -->
          <nuxt-link
            class="mb-6 cursor-pointer transition w-64 duration-150 transform hover:scale-105"
            :to="'/product/' + product.id"
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
      link: "import",
      products: [],
      selectedSort: "Tartiblash",
      showSort: false,
      sortOptions: [
        {
          slug: "price",
          text: "Narx o'sish bo'yicha",
        },
        {
          slug: "-price",
          text: "Narx kamayish bo'yicha",
        },
        {
          slug: "name",
          text: "Mahsulot nomi bo'yicha",
        },
      ],
    };
  },
  methods: {
    getProductsBySort(ordering, text) {
      this.$axios
        .get(`product/list/?is_import=true&ordering=${ordering}`)
        .then((res) => {
          console.log("list", res.data);
          this.products = res.data.results;
          this.showSort = false;
          this.selectedSort = text;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getProducts() {
      this.$axios
        .get(`product/by-category/${this.$route.params.slug}/?is_import=true`)
        .then((res) => {
          console.log("list", res.data);
          this.products = res.data.results;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
