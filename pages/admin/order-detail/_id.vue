<template>
  <div class="flex h-screen">
    <AdminSidebar />
    <div class="px-4 pt-10">
      <h1 class="font-bold text-xl text-gray-700 mb-10">
        Buyurtma haqida to'liq ma'lumot
      </h1>
      <h2 class="font-bold text-gray-700 mb-4">Buyurtmachi haqida ma'lumot</h2>
      <div>
        <div class="mb-10">
          <table class="min-w-full divide-x divide-gray-200 flex">
            <thead class="bg-gray-200">
              <tr class="border-gray-400 border-b">
                <th
                  scope="col"
                  class="px-8 block py-2 text-left text-sm font-bold text-gray-600"
                >
                  Buyurtma id
                </th>
              </tr>
              <tr class="border-gray-400 border-b">
                <th
                  scope="col"
                  class="px-8 block py-2 text-left text-sm font-bold text-gray-600"
                >
                  Buyurtmachi nomi
                </th>
              </tr>
              <tr class="border-gray-400 border-b">
                <th
                  scope="col"
                  class="px-8 block py-2 text-left text-sm font-bold text-gray-600"
                >
                  Buyurtmachi raqami
                </th>
              </tr>
              <tr class="border-gray-400 border-b">
                <th
                  scope="col"
                  class="px-8 block py-2 text-left text-sm font-bold text-gray-600"
                >
                  Jami buyurtma narxi
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="border">
                <td class="px-6 py-2 border">
                  <div class="flex items-center text-sm">
                    {{ order.id }}
                  </div>
                </td>
              </tr>
              <tr class="border">
                <td class="px-6 py-2 border">
                  <div class="flex items-center text-sm">
                    {{ order.name }}
                  </div>
                </td>
              </tr>
              <tr class="border">
                <td class="px-6 py-2 border">
                  <div class="flex items-center text-sm">
                    {{ order.phone_number }}
                  </div>
                </td>
              </tr>
              <tr class="border">
                <td class="px-6 py-2 border">
                  <div
                    class="flex items-center text-sm"
                    v-if="order.finish_price"
                  >
                    {{ order.finish_price.toLocaleString() }} so'm
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2 class="font-bold text-gray-700 mb-6">
          Buyurtma qilgan mahsulotlari
        </h2>
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-200">
            <tr>
              <th
                scope="col"
                class="px-6 py-2 text-left text-sm font-bold text-gray-500 uppercase"
              >
                mahsulot kodi
              </th>
              <th
                scope="col"
                class="px-6 py-2 text-left text-sm font-bold text-gray-500 uppercase"
              >
                mahsulot nomi
              </th>
              <th
                scope="col"
                class="px-6 py-2 text-left text-sm font-bold text-gray-500 uppercase"
              >
                Attributlari
              </th>

              <th
                scope="col"
                class="px-6 py-2 text-left text-sm font-bold text-gray-500 uppercase"
              >
                mahsulot narxi
              </th>
              <th
                scope="col"
                class="px-6 py-2 text-left text-sm font-bold text-gray-500 uppercase"
              >
                soni
              </th>
              <th
                scope="col"
                class="px-6 py-2 text-left text-sm font-bold text-gray-500 uppercase"
              >
                jami narxi
              </th>
            </tr>
          </thead>
          <tbody class="bg-white" v-if="order.orderproducts">
            <tr
              class="border"
              v-for="product in order.orderproducts"
              :key="product.id"
            >
              <td class="px-6 py-1 border">
                <div class="flex items-center text-sm ">
                  {{ product.product_code }}
                </div>
              </td>
              <td class="px-6 py-1 border">
                <div class="flex items-center text-sm ">
                  {{ product.product.name }}
                </div>
              </td>
              <td class="px-6 py-1 border">
                <div class="">
                  <span
                    v-for="attr in product.product.attributes"
                    class="block"
                    :key="attr.id"
                  >
                    {{ attr.label }}: <i>{{ attr.value }}</i>
                  </span>
                </div>
              </td>
              <td class="px-6 py-1 border">
                <div class="flex items-center text-sm " v-if="product.price">
                  {{ product.price.toLocaleString() }} so'm
                </div>
              </td>
              <td class="px-6 py-1 border">
                <div class="flex items-center text-sm ">
                  {{ product.count }}
                </div>
              </td>
              <td class="px-6 py-1 border">
                <div
                  class="flex items-center text-sm  justify-between"
                  v-if="product.single_overall_price"
                >
                  {{ product.single_overall_price.toLocaleString() }}
                  so'm
                </div>
              </td>
              <div
                class="fixed top-0 bottom-0 right-0 left-0 bg-gray-600 flex items-center text-sm justify-center"
                v-if="showDeleteDialog"
              >
                <div class="w-1/3 bg-white py-4 px-8">
                  <span class="font-bold text-xl block mb-6"
                    >Ushbu mahsulotni o'chirishni xohlaysizmi?</span
                  >
                  <button
                    @click="deleteProduct(product.id)"
                    class="bg-red-400 text-white py-2 px-4"
                  >
                    Ha
                  </button>
                  <button
                    @click="showDeleteDialog = false"
                    class="bg-gray-400 text-white py-2 px-4"
                  >
                    Yo'q
                  </button>
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
      order: {}
    };
  },
  methods: {
    getOrder() {
      this.$axios
        .get(`cart/orderbeta-detail/${this.$route.params.id}`)
        .then(res => {
          console.log(res.data);
          this.order = res.data;
        });
    }
  },
  mounted() {
    this.getOrder();
  }
};
</script>

<style></style>
