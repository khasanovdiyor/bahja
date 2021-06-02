<template>
  <div>
    <div>
      <h1 class="font-bold text-xl text-gray-700 mb-5">
        Buyurtma haqida to'liq ma'lumot
      </h1>
      <div>
        <div class="mb-10">
          <table class="min-w-full divide-x divide-gray-200 flex">
            <thead class="bg-gray-200">
              <tr class="border-gray-300 border-b">
                <th
                  scope="col"
                  class="px-6 block py-2 text-left text-sm font-bold text-gray-600"
                >
                  Id
                </th>
              </tr>
              <tr class="border-gray-300 border-b">
                <th
                  scope="col"
                  class="px-6 block py-2 text-left text-sm font-bold text-gray-600"
                >
                  Ism
                </th>
              </tr>
              <tr class="border-gray-300 border-b">
                <th
                  scope="col"
                  class="px-6 block py-2 text-left text-sm font-bold text-gray-600"
                >
                  Telefon raqam
                </th>
              </tr>
              <tr class="border-gray-300 border-b">
                <th
                  scope="col"
                  class="px-6 block py-2 text-left text-sm font-bold text-gray-600"
                >
                  Jami narx
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="border">
                <td class="px-6 py-2 border bg-white">
                  <div class="flex items-center text-sm">
                    {{ order.id }}
                  </div>
                </td>
              </tr>
              <tr class="border">
                <td class="px-6 py-2 border bg-white">
                  <div class="flex items-center text-sm">
                    {{ order.name }}
                  </div>
                </td>
              </tr>
              <tr class="border">
                <td class="px-6 py-2 border bg-white">
                  <div class="flex items-center text-sm">
                    {{ order.phone_number }}
                  </div>
                </td>
              </tr>
              <tr class="border">
                <td class="px-6 py-2 border bg-white">
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
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-200">
            <tr>
              <th
                scope="col"
                class="px-6 py-2 text-left text-xs font-bold text-gray-600 uppercase"
              >
                kod
              </th>
              <th
                scope="col"
                class="px-6 py-2 text-left text-xs font-bold text-gray-600 uppercase"
              >
                nom
              </th>
              <th
                scope="col"
                class="px-6 py-2 text-left text-xs font-bold text-gray-600 uppercase"
              >
                Attributlar
              </th>

              <th
                scope="col"
                class="px-6 py-2 text-left text-xs font-bold text-gray-600 uppercase"
              >
                narx
              </th>
              <th
                scope="col"
                class="px-6 py-2 w-16 text-left text-xs font-bold text-gray-600 uppercase"
              >
                son
              </th>
              <th
                scope="col"
                class="px-6 py-2 text-left text-xs font-bold text-gray-600 uppercase"
              >
                jami narx
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
                <div class="flex items-center text-sm">
                  {{ product.product_code }}
                </div>
              </td>
              <td class="px-6 py-1 border">
                <div class="flex items-center text-sm">
                  {{ product.product.name }}
                </div>
              </td>
              <td class="px-6 py-1 border">
                <div class="text-sm">
                  <span
                    v-for="attr in product.product.attributes"
                    class="block lowercase"
                    :key="attr.id"
                  >
                    <b>{{ attr.label }}:</b> {{ attr.value }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-1 border">
                <div class="flex items-center text-sm" v-if="product.price">
                  {{ product.price.toLocaleString() }} so'm
                </div>
              </td>
              <td class="px-6 py-1 border">
                <div class="flex items-center text-sm">
                  {{ product.count }}
                </div>
              </td>
              <td class="px-6 py-1 border">
                <div
                  class="flex items-center text-sm justify-between"
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
export default {
  layout: "admin",
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
          this.order = res.data;
        });
    }
  },
  mounted() {
    this.getOrder();
  }
};
</script>

<style scoped>
tbody td {
  width: 50rem;
}
</style>
