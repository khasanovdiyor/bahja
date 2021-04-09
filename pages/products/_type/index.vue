<template>
  <div>
    <TheContact />
    <TheHeader />
    <div class="sm:flex">
      <TheSidebar :currentLink="link" />
      <div class="w-full">
        <h1
          class="sm:px-2 md:px-8 lg:px-16 capitalize font-bold text-center text-2xl my-5"
        >
          {{ $route.params.type }}
          mahsulotlar
        </h1>
        <div class="sm:px-2 md:px-8 lg:px-16">
          <!-- <div>
            <h2
              @click="showFilter = true"
              v-if="!showFilter"
              class="bg-gray-200 px-4 py-2 inline-block cursor-pointer mb-2"
            >
              Filterni korsatish
            </h2>
            <h2
              @click="showFilter = false"
              v-if="showFilter"
              class="bg-gray-200 px-4 py-2 inline-block cursor-pointer mb-2"
            >
              Filterni yashirish
            </h2>

            <TheFilter v-if="showFilter" :sizes="sizes" />
          </div> -->

          <div
            class="relative mb-16 outline-none"
            v-if="products.length > 0"
            @focusout="showSort = false"
            tabindex="0"
          >
            <h3
              class="mb-2 inline-block cursor-pointer"
              @click="showSort = true"
            >
              {{ selectedSort }} &#8595;
            </h3>
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
        </div>

        <h2
          class="font-bold text-xl mx-auto text-center w-2/3"
          v-if="products.length < 1"
        >
          Hozircha bu bo'limda mahsulotlar mavjud emas!
          <nuxt-link
            v-if="$route.params.type === 'import'"
            to="/products/import"
            class="text-gray-400 hover:underline"
            >Mahalliy mahsulotlar</nuxt-link
          >
          <nuxt-link
            v-else
            to="/products/import"
            class="text-gray-400 hover:underline"
            >Import mahsulotlar</nuxt-link
          >
          ni qarab ko'ring!
        </h2>

        <div
          class="mt-10 sm:px-2 md:px-8 lg:px-16 flex justify-between flex-wrap"
        >
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

    <TheFooter class="mt-56" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      link: `${this.$route.params.type}/category`,
      products: [],
      showSort: false,
      showFilter: false,
      selectedSort: "Tartiblash",
      sizes: [],
      savedProducts: [],
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
        .get(`product/list/`, {
          params: {
            is_import: true ? this.$route.params.type === "import" : false,
            ordering: ordering,
          },
        })
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
      let loader = this.$loading.show();
      this.$axios
        .get(`product/list/`, {
          params: {
            is_import: true ? this.$route.params.type === "import" : false,
          },
        })
        .then((res) => {
          this.products = res.data.results;
          loader.hide();
        })
        .catch((err) => {
          loader.hide();
          console.log(err);
        });
    },
    getSizes() {
      for (let i = 0; i < this.products.length; i++) {
        this.sizes.push(this.products[i].size);
      }
      console.log("import sizes", this.sizes, "this.products", this.products);
    },
  },
  mounted() {
    this.getSizes();
    this.getProducts();
    if (localStorage.products) {
      let json_string = localStorage.getItem("products");
      if (json_string.length !== 0) {
        this.savedProducts = JSON.parse(json_string);
      }
    }
  },
};
</script>
