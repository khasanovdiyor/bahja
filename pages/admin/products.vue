<template>
  <div>
    <div>
      <div class="flex items-center justify-between mb-6">
        <h1 class="font-bold text-xl text-gray-700">Mahsulotlar</h1>
        <BaseButtonLink
          link
          url="/admin/product-create"
          buttonText="Qo'shish"
        />
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
        @close-modal="showDeleteDialog = false"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      showDeleteDialog: false,
      selectedProductID: null,
      tableHeaders: ["id", "nomi", "kodi", "atributlar", "narxi", "buyruqlar"],
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
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>

<style></style>
