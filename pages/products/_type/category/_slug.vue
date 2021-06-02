<template>
  <div class="">
    <div class="flex">
      <div>
        <div
          :class="{ block: sidebarOpen, hidden: !sidebarOpen }"
          @click="sidebarOpen = false"
          class="fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden"
        ></div>
        <TheSidebar
          :currentLink="link"
          :class="{
            'translate-x-0 ease-out': sidebarOpen,
            '-translate-x-full ease-in': !sidebarOpen
          }"
          class="fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform overflow-y-auto lg:translate-x-0 lg:static lg:inset-0"
        />
      </div>

      <div class="px-16 w-full relative">
        <div
          class="flex items-center lg:justify-center justify-between flex-wrap"
        >
          <div
            class="w-24 sm:left-6 ml-8 flex lg:hidden"
            @click="sidebarOpen = true"
          >
            <img class="mr-2" src="@/assets/images/menu.svg" alt="" />
            <span>Kategoriyalar</span>
          </div>
          <div>
            <h1 class="lg:px-16 px-6 capitalize font-bold text-xl my-5">
              {{ $route.params.type }}
              mahsulotlar
            </h1>
          </div>
        </div>
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
                @click="getProducts(option.slug)"
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

        <div class="mt-10 flex justify-center sm:justify-between flex-wrap">
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
        class="sm:w-1/4"
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
      link: `${this.$route.params.type}/category`,
      sidebarOpen: false,
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
    getProducts(page = 1, ordering = "", text = "Tartiblash") {
      let loader = this.$loading.show();
      this.$axios
        .get(`product/by-category/${this.$route.params.slug}/`, {
          params: {
            is_import: true ? this.$route.params.type === "import" : false,
            ordering,
            page
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
