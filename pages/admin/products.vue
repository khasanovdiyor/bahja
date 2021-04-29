<template>
  <div class="flex min-h-screen bg-gray-100">
    <AdminSidebar />
    <div class="px-6 w-9/12 pt-10">
      <div class="flex items-center justify-between">
        <h1 class="font-bold text-xl text-gray-700 mb-5">Mahsulotlar</h1>
        <nuxt-link
          to="/admin/product-create"
          class="block bg-gray-800 w-24 ml-auto text-sm text-center rounded-md px-3 text-white my-2 py-2 mb-6"
          >Qo'shish</nuxt-link
        >
      </div>

      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-200">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 w-16 text-left text-xs font-bold text-gray-600 uppercase"
            >
              id
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase"
            >
              nom
            </th>
            <th
              scope="col"
              class="px-6 py-3 w-40 text-left text-xs font-bold text-gray-600 uppercase"
            >
              kod
            </th>

            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase"
            >
              atributlar
            </th>
            <th
              scope="col"
              class="px-6 py-3 w-40 text-left text-xs font-bold text-gray-600"
            >
              NARX (so'm)
            </th>

            <th
              scope="col"
              class="px-6 py-3 w-40 text-left text-xs font-bold text-gray-600 uppercase"
            >
              buyruqlar
            </th>
          </tr>
        </thead>
        <tbody class="bg-white">
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
            <div
                          class="fixed z-50 top-0 bottom-0 right-0 left-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
                    v-if="showDeleteDialog"
                  >
                    <div class="w-1/3 opasity-0 rounded-md bg-white py-4 px-8">
                      <span class="font-bold text-xl text-center block mb-6"
                        >Ushbu mahsulotnio'chirishni xohlaysizmi?</span
                      >
                      <div class="flex justify-between">
                        <button
                          @click="deleteOrder(deleteOrderID)"
                          class="bg-red-500 rounded-md text-white py-2 px-4"
                        >
                          Ha
                        </button>
                        <button
                          @click="showDeleteDialog = false"
                          class="bg-gray-500 rounded-md text-white py-2 px-4"
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
      this.$axios.get("product/list/?parent_id=0").then(res => {
        console.log(res.data);
        this.products = res.data.results;
      });
    },
    deleteProduct(id) {
      this.$axios
        .delete(`product/delete/${id}`)
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
