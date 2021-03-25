<template>
  <div class="flex ">
    <AdminSidebar />
    <div class="px-16 ">
      <div class="mb-6">
        <div class="input-group block my-4">
          <h2 class="text-xl font-bold mb-10 uppercase">Kategoriya qoshish</h2>
          <label for="input" class="block font-bold uppercase text-sm mb-2"
            >Kategoriya nomi</label
          >
          <input
            type="text"
            class="border-2 text-sm w-1/2 py-2 pl-5"
            v-model="newCategory.name"
          />
        </div>

        <button
          @click="createCategory"
          class="bg-green-400 text-white py-2 px-4"
        >
          Kategoriya yaratish
        </button>
      </div>
      <div>
        <table class="min-w-full divide-y divide-gray-200 ">
          <thead class="bg-gray-200">
            <tr>
              <th
                scope="col"
                class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
              >
                id
              </th>
              <th
                scope="col"
                class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
              >
                Kategoriya nomi
              </th>
              <th
                scope="col"
                class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
              >
                O'chirish
              </th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr
              class="border"
              v-for="category in categories"
              :key="category.id"
            >
              <td class="px-6 py-1 border">
                <div class="flex items-center text-gray-500 ">
                  {{ category.id }}
                </div>
              </td>
              <td class="px-6 py-1 border">
                <div class="flex items-center text-gray-500">
                  {{ category.name }}
                </div>
              </td>
              <td class="px-6 py-1 border">
                <div class="flex items-center text-gray-500 justify-center">
                  <div
                    @click="
                      showDeleteDialog = true;
                      selectedCategoryID = category.id;
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
              <div
                class="fixed z-40 top-0 bottom-0 right-0 left-0 bg-gray-600 opacity-75 flex items-center justify-center"
                v-if="showDeleteDialog"
              >
                <div class="w-1/3 bg-white py-4 px-10">
                  <span class="font-bold text-xl block mb-6"
                    >Ushbu Kategoriyani o'chirishni xohlaysizmi?</span
                  >
                  <div class="flex justify-between">
                    <button
                      @click="deleteCategory(selectedProductID)"
                      class="bg-red-600 text-white py-2 px-4"
                    >
                      Ha {{ selectedProductID }}
                    </button>
                    <button
                      @click="showDeleteDialog = false"
                      class="bg-gray-600 text-white py-2 px-4"
                    >
                      Yo'q
                    </button>
                  </div>
                </div>
              </div>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSidebar from "~/components/admin/AdminSidebar.vue";

export default {
  components: {
    AdminSidebar
  },
  data() {
    return {
      showDeleteDialog: false,
      selectedCategoryID: null,
      categories: [],
      newCategory: {
        name: ""
      }
    };
  },
  methods: {
    getCategories() {
      this.$axios.get("product/category-list").then(res => {
        console.log(res.data);
        this.categories = res.data;
      });
    },
    createCategory() {
      this.$axios
        .post("product/category-create", this.newCategory)
        .then(res => {
          console.log(res.data);
        });
    },
    deleteOrder(id) {
      this.$axios
        .delete(`product/category-delete/${id}`)
        .then(res => {
          console.log(res.data, "ID:", id);
          this.showDeleteDialog = false;
          this.getCategories();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getCategories();
  }
};
</script>

<style></style>
