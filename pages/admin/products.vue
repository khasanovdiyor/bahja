<template>
  <div class="flex h-screen">
    <AdminSidebar />
    <div class="px-16 w-4/5 pt-10">
      <h1 class="font-bold text-xl mb-6">Mavjud Mahsulotlar</h1>
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
              mahsulot nomi
            </th>
            <th
              scope="col"
              class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
            >
              brendi
            </th>
            <th
              scope="col"
              class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
            >
              o'lchami
            </th>
            <th
              scope="col"
              class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
            >
              rangi
            </th>
            <th
              scope="col"
              class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
            >
              narxi so'm
            </th>

            <th
              scope="col"
              class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
            >
              o'zgartirish
            </th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr class="border" v-for="product in products" :key="product.id">
            <td class="px-6 py-1 border">
              <div class="flex items-center text-gray-500 ">
                {{ product.id }}
              </div>
            </td>
            <td class="px-6 py-1 border">
              <div class="flex items-center text-gray-500">
                {{ product.name }}
              </div>
            </td>
            <td class="px-6 py-1 border">
              <div class="flex items-center text-gray-500">
                {{ product.brand.name }}
              </div>
            </td>
            <td class="px-6 py-1 border">
              <div class="flex items-center text-gray-500">
                {{ product.size }}
              </div>
            </td>
            <td class="px-6 py-1 border">
              <div class="flex items-center text-gray-500">
                {{ product.color.name }}
              </div>
            </td>
            <td class="px-6 py-1 border">
              <div class="flex items-center text-gray-500">
                {{ product.price }}
              </div>
            </td>
            <td class="px-6 py-1 border">
              <div class="flex items-center text-gray-500 justify-between">
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
            <div
              class="fixed z-40 top-0 bottom-0 right-0 left-0 bg-gray-600 opacity-75 flex items-center justify-center"
              v-if="showDeleteDialog"
            >
              <div class="w-1/3 bg-white py-4 px-10">
                <span class="font-bold text-xl block mb-6"
                  >Ushbu mahsulotni o'chirishni xohlaysizmi?</span
                >
                <div class="flex justify-between">
                  <button
                    @click="deleteProduct(selectedProductID)"
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
</template>

<script>
import AdminSidebar from "~/components/admin/AdminSidebar.vue";
export default {
  components: {
    AdminSidebar
  },
  data() {
    return {
      products: [],
      showDeleteDialog: false,
      selectedProductID: null
    };
  },
  methods: {
    getProducts() {
      this.$axios.get("product/variation-list").then(res => {
        console.log(res.data);
        this.products = res.data;
      });
    },
    deleteProduct(id) {
      const formData = new FormData();
      formData.append("is_active", false);
      this.$axios
        .patch(`product/variation-update/${id}`, formData)
        .then(res => {
          console.log(res);
          this.showDeleteDialog = false;
          this.getProducts();
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

<style></style>
