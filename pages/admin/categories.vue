<template>
  <div>
    <div>
      <div>
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center">
            <h1 class="font-bold text-xl text-gray-700 mr-6">Kategoriyalar</h1>
            <div class="relative mr-6 my-2">
              <input
                type="text"
                class="shadow rounded border-0 p-2"
                placeholder="Kategoriya qidirsh..."
                v-model.trim="searchWord"
                @keyup.enter="getCategories(1)"
              />
              <img
                src="~/assets/images/loupe.svg"
                alt="loupe icon"
                class="w-4 h-4 absolute right-4 top-3 cursor-pointer"
                @click="getCategories(1)"
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
              <div v-if="showFilter" class="absolute z-40 top-10 right-0">
                <div
                  class="border-2 p-4 bg-white rounded-md mx-auto w-64 relative"
                >
                  <div class="mr-6">
                    <BaseSelect
                      class="my-4"
                      v-model.trim="selectedCategory"
                      label="Asosiy"
                      :options="optionCategories"
                      placeholder="Kategoriya tanlang"
                    />
                    <BaseButtonLink
                      class="mt-4"
                      buttonText="Saralash"
                      @button-click="getCategories"
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
              url="/admin/category-create"
              buttonText="Qo'shish"
            />
          </div>
        </div>
        <BaseTable :headers="tableHeaders">
          <template #body>
            <tr
              class="border"
              v-for="category in categories"
              :key="category.id"
            >
              <td class="px-6 py-1 border rounded-bl-md">
                <div class="flex items-center text-sm">
                  {{ category.id }}
                </div>
              </td>

              <td class="px-6 py-1 border">
                <div class="flex items-center text-sm capitalize">
                  {{ category.name }}
                </div>
              </td>
              <td class="px-6 py-1 border">
                <div class="flex items-center text-sm capitalize">
                  <div v-if="category.parent">
                    {{ category.parent.name }}
                  </div>
                  <div v-else>-</div>
                </div>
              </td>
              <td class="px-6 py-1 border">
                <div class="flex justify-center mx-auto items-center w-16 h-16">
                  <img
                    :src="category.image"
                    :alt="`${category.name} image`"
                    class="w-16 h-full object-cover"
                  />
                </div>
              </td>
              <td class="px-6 py-1 border">
                <div class="flex items-center text-sm justify-center">
                  <nuxt-link
                    :to="`/admin/category-change/${category.id}`"
                    class="cursor-pointer w-5 h-5"
                  >
                    <img
                      src="~/assets/images/pencil.svg"
                      class="w-5 h-5"
                      alt="edit"
                    />
                  </nuxt-link>
                  <!-- <div
                    @click="
                      showDeleteDialog = true;
                      selectedCategoryID = category.id;
                    "
                    class="cursor-pointer"
                  >
                    <img
                      src="~/assets/images/delete.svg"
                      class="w-5 h-5"
                      alt="delete"
                    />
                  </div> -->
                </div>
              </td>
            </tr>
          </template>
        </BaseTable>
        <!-- <BaseDeleteModal
          v-if="showDeleteDialog"
          text="Ushbu mahsulotni o'chirishni xohlaysizmi?"
          @delete="deleteCategory(selectedCategoryID)"
          @close="showDeleteDialog = false"
        /> -->
      </div>
    </div>
    <BasePagination
      v-if="totalPages > 1"
      class="mt-10 w-96 mx-auto"
      :page-count="totalPages"
      :page-range="totalPages >= 4 ? 3 : totalPages"
      :click-handler="getCategories"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableHeaders: ["id", "nomi", "asosiy", "rasmi", "buyruqlar"],
      showDeleteDialog: false,
      categories: [],
      selectedCategoryID: null,
      searchWord: null,
      selectedCategory: null,
      optionCategories: [],
      showFilter: false,
      totalPages: null
    };
  },

  methods: {
    deleteCategory(id) {
      this.$axios
        .delete(`product/category-delete/${id}`)
        .then(res => {
          this.$toast.success(res.data);
          this.getCategories(1);
        })
        .catch(err => {
          this.$toast.error(err.response.data);
        })
        .finally(() => {
          this.showDeleteDialog = false;
        });
    },
    getCategories(page) {
      let loader = this.$loading.show();
      let parent_id;
      if (this.selectedCategory) parent_id = this.selectedCategory.id;
      else parent_id = null;
      this.$axios
        .get("product/category-all/", {
          params: {
            search: this.searchWord,
            parent_id,
            page
          }
        })
        .then(res => {
          this.categories = [];
          for (const cat of res.data.results) {
            const p = res.data.results.find(el => el.id === cat.parent_id);
            cat = Object.assign({ parent: p }, cat);
            this.categories.push(cat);
          }
          this.totalPages = res.data.total_pages;
        })
        .finally(() => {
          loader.hide();
        });
    },
    getOptionsCategories() {
      this.$axios
        .get("product/category-all/", {
          params: {
            size: 1000
          }
        })
        .then(res => {
          this.optionCategories = res.data.results;
        })
        .finally(() => {
          loader.hide();
        });
    }
  },
  mounted() {
    this.getCategories(1);
    this.getOptionsCategories();
  }
};
</script>
