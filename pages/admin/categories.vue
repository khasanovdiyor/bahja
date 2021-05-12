<template>
  <div>
    <div>
      <div>
        <div class="flex items-center justify-between mb-6">
          <h1 class="font-bold text-xl text-gray-700">Kategoriyalar</h1>
          <BaseButtonLink
            link
            url="/admin/category-create"
            buttonText="Qo'shish"
          />
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
      class="mt-10"
      :page-count="totalPages"
      :page-range="totalPages > 6 ? 4 : totalPages"
      :click-handler="getCategories"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableHeaders: ["id", "nomi", "rasmi", "buyruqlar"],
      showDeleteDialog: false,
      categories: [],
      selectedCategoryID: null,
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
      this.$axios
        .get("product/category-all/", {
          params: {
            page: page
          }
        })
        .then(res => {
          this.categories = res.data.results;
          this.totalPages = res.data.total_pages;
        })
        .finally(() => {
          loader.hide();
        });
    }
  },
  mounted() {
    this.getCategories(1);
  }
};
</script>
