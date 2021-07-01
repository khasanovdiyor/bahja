<template>
  <div>
    <div>
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center">
          <h1 class="font-bold text-xl text-gray-700 mr-6">Mahsulotlar</h1>
          <div class="relative mr-6 my-2">
            <input
              type="text"
              class="shadow rounded border-0 p-2"
              placeholder="Mahsulot qidirsh..."
              v-model.trim="searchWord"
              @keyup.enter="getProducts(1)"
            />
            <img
              src="~/assets/images/loupe.svg"
              alt="loupe icon"
              class="w-4 h-4 absolute right-4 top-3 cursor-pointer"
              @click="getProducts(1)"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="relative">
            <img
              src="~/assets/images/funnel.svg"
              alt="filter icon"
              class="w-6 h-6 cursor-pointer mr-5"
              @click="showFilter = true"
            />
            <div v-show="showFilter" class="absolute z-40 top-10 right-0">
              <div
                class="border-2 p-4 bg-white rounded-md mx-auto w-64 relative"
              >
                <div class="mr-6">
                  <BaseSelect
                    v-model="selectedCategories"
                    label="Kategoriya"
                    :options="categories"
                    placeholder="Kategoriya tanlang"
                    noResult="Bunday kategoriya topilmadi"
                    multiple
                    taggable
                    @select="value => selectCategories(value, filterCategories)"
                    @remove="value => removeCategories(value, filterCategories)"
                  />
                  <BaseSelect
                    class="my-4"
                    v-model.trim="selectedBrand"
                    label="Brend"
                    :options="brands"
                    @select="selectBrand"
                    @remove="filterBrand = null"
                    placeholder="Brend tanlang"
                  />
                  <div>
                    <label
                      for=""
                      class="
                        w-1/2
                        block
                        font-bold
                        text-gray-600
                        relative
                        uppercase
                        text-sm
                        mb-1
                      "
                      >Narx</label
                    >
                    <div class="flex justify-between">
                      <input
                        type="text"
                        placeholder="Min"
                        class="w-24 bg-gray-100 p-2"
                        v-model="minPrice"
                      />
                      <input
                        type="text"
                        placeholder="Max"
                        class="w-24 bg-gray-100 p-2"
                        v-model="maxPrice"
                      />
                    </div>
                  </div>
                  <BaseButtonLink
                    class="mt-4"
                    buttonText="Saralash"
                    @button-click="getProducts"
                  />
                </div>

                <span
                  class="absolute right-4 top-4 cursor-pointer"
                  @click="showFilter = false"
                >
                  <svg
                    class="text-gray-400 w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 329.26933 329"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <BaseButtonLink
            link
            url="/admin/product-create"
            buttonText="Qo'shish"
          />
        </div>
      </div>

      <BaseTable :headers="tableHeaders">
        <template #body>
          <tr class="border" v-for="product in products" :key="product.id">
            <td class="px-6 py-1 border">
              <div class="flex items-center text-sm">
                {{ product.id }}
              </div>
            </td>
            <td class="px-6 py-1 border">
              <div class="flex items-center text-sm">
                {{ product.name }}
              </div>
            </td>
            <td class="px-6 py-1 border">
              <div class="flex items-center text-sm">
                {{ product.product_code }}
              </div>
            </td>

            <td class="px-6 py-1 border">
              <div class="text-sm">
                <span
                  v-for="attr in product.attributes"
                  :key="attr.id"
                  class="block lowercase"
                >
                  <b>{{ attr.label }} :</b> {{ attr.value }}
                </span>
              </div>
            </td>

            <td class="px-6 py-1 border">
              <div class="flex items-center text-sm">
                {{ product.price }}
              </div>
            </td>
            <td class="px-6 py-1 border">
              <div class="flex items-center text-sm justify-between">
                <nuxt-link :to="`/admin/product-detail/${product.id}`">
                  <img
                    src="~/assets/images/eye.svg"
                    class="w-5 h-5"
                    alt="eye icon"
                  />
                </nuxt-link>
                <nuxt-link :to="`/admin/product-change/${product.id}`">
                  <img
                    src="~/assets/images/pencil.svg"
                    class="w-5 h-5"
                    alt="pencil icon"
                  />
                </nuxt-link>
                <div
                  @click="
                    showDeleteDialog = true;
                    selectedProductID = product.id;
                  "
                  class="cursor-pointer"
                >
                  <img
                    src="~/assets/images/delete.svg"
                    class="w-5 h-5"
                    alt="pencil icon"
                  />
                </div>
              </div>
            </td>
          </tr>
        </template>
      </BaseTable>
      <BaseDeleteModal
        v-if="showDeleteDialog"
        text="Ushbu mahsulotni o'chirishni xohlaysizmi?"
        @delete="deleteProduct(selectedProductID)"
        @close="showDeleteDialog = false"
      />
    </div>
    <BasePagination
      v-if="totalPages > 1"
      class="mt-10 w-96 mx-auto"
      :page-count="totalPages"
      :page-range="totalPages >= 4 ? 3 : totalPages"
      :click-handler="getProducts"
    />
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      products: [],
      categories: [],
      brands: [],
      showDeleteDialog: false,
      selectedProductID: null,
      tableHeaders: ["id", "nomi", "kodi", "atributlar", "narxi", "buyruqlar"],
      totalPages: null,
      selectedCategories: [],
      selectedBrand: null,
      showFilter: false,
      searchWord: null,
      filterCategories: [],
      filterBrand: null,
      minPrice: null,
      maxPrice: null
    };
  },
  methods: {
    selectCategories(value, categories) {
      if (!categories.includes(value.id)) categories.push(value.id);
    },
    removeCategories(value, categories) {
      const foundIndex = categories.indexOf(value.id);
      if (foundIndex !== -1) categories.splice(foundIndex, 1);
    },
    selectBrand(value) {
      this.filterBrand = value.id;
    },
    getProducts(page = 1) {
      let loader = this.$loading.show();
      let apiUrl = "product/list/";
      this.$axios
        .get(apiUrl, {
          params: {
            parent_id: 0,
            search: this.searchWord,
            min: this.minPrice,
            max: this.maxPrice,
            category: this.filterCategories,
            brand: this.filterBrand,
            page
          }
        })
        .then(res => {
          this.products = res.data.results;
          this.totalPages = res.data.total_pages;
        })
        .finally(() => {
          loader.hide();
        });
    },
    deleteProduct(id) {
      this.$axios
        .delete(`product/delete/${id}`)
        .then(res => {
          this.$toast.success(res.data || "Mahsulot muvaffaqiyatli o'chirildi");
          this.showDeleteDialog = false;
          this.getProducts();
        })
        .catch(err => {
          this.$toast.error(
            err.response.data || "Mahsulot o'chirishda xatolik yuz berdi"
          );
        });
    },
    getBrands() {
      this.$axios
        .get("product/brand-list/", {
          params: {
            size: 1000
          }
        })
        .then(res => {
          this.brands = res.data.results;
        })
        .catch(err => {});
    }
  },
  mounted() {
    this.getProducts(1);
    this.getCategories();
    this.getBrands();
  }
};
</script>
