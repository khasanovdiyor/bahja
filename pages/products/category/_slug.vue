<template>
  <div class="">
    <div class="flex">
      <TheSidebar :currentLink="link" />
      <div class="px-16 w-full">
        <h1 class="px-16 font-bold text-center text-xl my-5">
          {{ $route.params.type }} mahsulotlar
        </h1>
        <div
          class="relative mb-16 outline-none"
          v-if="products.length > 0"
          @focusout="showSort = false"
          tabindex="0"
        >
          <h3 class="mb-2 inline-block cursor-pointer" @click="showSort = true">
            {{ selectedSort }} &#8595;
          </h3>

          <div class="absolute border-2 bg-white top-6 z-40" v-if="showSort">
            <ul>
              <li
                v-for="option in sortOptions"
                :key="option.slug"
                @click="getProductsBySort(1, option.slug, option.text)"
                class="cursor-pointer hover:bg-gray-200 py-2 px-4"
              >
                {{ option.text }}
              </li>
            </ul>
          </div>
        </div>
        <h2
          class="font-bold text-xl mt-36 h-1/3 text-center w-full"
          v-if="products.length < 1"
        >
          Hozircha bu bo'limda mahsulotlar mavjud emas!
        </h2>

        <div class="mt-10 flex flex-wrap w-full">
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
    <div class="flex justify-center">
      <BasePagination
        class="w-1/4"
        v-if="totalPages > 1"
        :page-count="totalPages"
        :page-range="totalPages > 6 ? 4 : totalPages"
        :click-handler="getProducts"
      />
    </div>
  </div>
</template>
<script>
export default {
  auth: false,
  layout: "user",
  data() {
    return {
      link: `category`,
      products: [],
      selectedSort: "Tartiblash",
      totalPages: null,
      showSort: false,
      savedProducts: [],
      sortOptions: [
        {
          slug: "price",
          text: "Narx o'sish bo'yicha"
        },
        {
          slug: "-price",
          text: "Narx kamayish bo'yicha"
        },
        {
          slug: "name",
          text: "Mahsulot nomi bo'yicha"
        }
      ]
    };
  },
  methods: {
    getProducts(page, ordering = "", text = "Tartiblash") {
      let loader = this.$loading.show();
      this.$axios
        .get(`product/by-category/${this.$route.params.slug}/`, {
          params: {
            page,
            ordering
          }
        })
        .then(res => {
          this.products = res.data.results;
          this.totalPages = res.data.total_pages;
          this.showSort = false;
          this.selectedSort = text;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          loader.hide();
        });
    }
  },
  mounted() {
    this.getProducts(1);
  }
};
</script>
