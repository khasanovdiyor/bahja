<template>
  <div class="flex bg-gray-100">
    <AdminSidebar class="w-1/5" />
    <div class="px-5 pt-10 w-9/12">
      <h1 class="font-bold text-xl mb-6 text-gray-900">Mahsulotlar</h1>
      <div>
        <table class="min-w-full divide-x divide-gray-200 flex">
          <thead class="bg-gray-200 w-1/4">
            <tr class="border-gray-400 border-b">
              <th
                scope="col"
                class="px-8 block py-2 w-72 text-left text-sm font-bold text-gray-600"
              >
                id
              </th>
            </tr>
            <tr class="border-gray-400 border-b">
              <th
                scope="col"
                class="px-8 block py-2 w-72 text-left text-sm font-bold text-gray-600"
              >
                nom
              </th>
            </tr>
            <tr class="border-gray-400 border-b">
              <th
                scope="col"
                class="px-8 block py-2 w-72 text-left text-sm font-bold text-gray-600"
              >
                kod
              </th>
            </tr>
            <tr class="border-gray-400 border-b">
              <th
                scope="col"
                class="px-8 block py-2 w-72 text-left text-sm font-bold text-gray-600"
              >
                tavsif
              </th>
            </tr>
            <tr class="border-gray-400 border-b">
              <th
                scope="col"
                class="px-8 block py-2 w-72 text-left text-sm font-bold text-gray-600"
              >
                kategoriya
              </th>
            </tr>
            <tr class="border-gray-400 border-b">
              <th
                scope="col"
                class="px-8 block py-2 w-72 text-left text-sm font-bold text-gray-600"
              >
                brand
              </th>
            </tr>
            <tr class="border-gray-400 border-b">
              <th
                scope="col"
                class="px-8 block py-2 w-72 text-left text-sm font-bold text-gray-600"
              >
                son
              </th>
            </tr>
            <tr class="border-gray-400">
              <th
                scope="col"
                class="px-8 block py-2 w-72 text-left text-sm font-bold text-gray-600"
              >
                narx (so'm)
              </th>
            </tr>
          </thead>
          <tbody class="bg-white w-full border">
            <tr class="">
              <td class="product-width px-6 py-2 border-b text-sm">
                {{ product.id }}
              </td>
            </tr>
            <tr class="border-b">
              <td class="product-width px-6 py-2 text-sm">
                {{ product.name }}
              </td>
            </tr>
            <tr class="">
              <td class="product-width px-6 py-2 border-b text-sm">
                {{ product.product_code }}
              </td>
            </tr>
            <tr class="border-b">
              <td class="product-width px-6 py-2">
                <div class="flex items-center text-sm">
                  {{ product.description }}
                </div>
              </td>
            </tr>
            <tr class="border-b">
              <td
                class="product-width px-6 py-2"
                v-for="category in product.categories"
                :key="category.id"
              >
                <div class="flex items-center text-sm">
                  {{ category.name }}
                </div>
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-6 py-2">
                <div class="flex items-center text-sm">
                  {{ product.brand.name }}
                </div>
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-6 py-2">
                <div class="flex items-center text-sm">
                  {{ product.quantity }}
                </div>
              </td>
            </tr>

            <tr class="border-b">
              <td class="px-6 py-2">
                <div class="flex items-center text-sm">
                  {{ product.price }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="my-10">
        <h2 class="font-bold text-xl my-4 text-gray-700">Attributlar</h2>
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-200">
            <tr>
              <th
                scope="col"
                class="px-6 py-2 text-left text-xs font-bold text-gray-600 uppercase"
              >
                is main
              </th>

              <th
                scope="col"
                class="px-6 py-2 text-left text-xs font-bold text-gray-600 uppercase"
              >
                key
              </th>
              <th
                scope="col"
                class="px-6 py-2 text-left text-xs font-bold text-gray-600 uppercase"
              >
                label
              </th>
              <th
                scope="col"
                class="px-6 py-2 text-left text-xs font-bold text-gray-600 uppercase"
              >
                value
              </th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr
              class="border text-sm"
              v-for="(attrib, index) in product.attributes"
              :key="attrib"
            >
              <td class="px-6 py-1 border text-sm">
                {{ attrib.is_main }}
              </td>

              <td class="px-6 py-1 border text-sm">
                {{ index }}
              </td>
              <td class="px-6 py-1 border text-sm lowercase">
                {{ attrib.label }}
              </td>
              <td class="px-6 py-1 border text-sm">
                {{ attrib.value }}
              </td>
            </tr>
          </tbody>
        </table>
        <nuxt-link
          :to="`/admin/variation-create/${$route.params.id}`"
          class="block bg-gray-800 w-24 text-sm text-center rounded-md px-3 text-white mt-5 py-2 mb-5"
          >Qo'shish</nuxt-link
        >
      </div>
      <div class="my-8">
        <div class="flex items-center justify-between">
          <h2 class="font-bold text-xl my-4 text-gray-700">O'zgarishlar</h2>
        </div>
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-200">
            <tr>
              <th
                scope="col"
                class="px-6 py-2 w-40 text-left text-xs font-bold text-gray-600 uppercase"
              >
                Nom
              </th>
              <th
                scope="col"
                class="px-6 py-2 text-left text-xs font-bold text-gray-600 uppercase"
              >
                Kod
              </th>
              <th
                scope="col"
                class="px-6 py-2 text-left text-xs font-bold text-gray-600 uppercase"
              >
                Tavsif
              </th>
              <th
                scope="col"
                class="px-6 py-2 text-left text-xs font-bold text-gray-600 uppercase"
              >
                Kategoriya
              </th>
              <th
                scope="col"
                class="px-6 py-2 text-left text-xs font-bold text-gray-600 uppercase"
              >
                Son
              </th>
              <th
                scope="col"
                class="px-6 py-2 text-left text-xs font-bold text-gray-600 uppercase"
              >
                Narx
              </th>

              <th
                scope="col"
                class="px-6 py-2 text-left text-xs font-bold text-gray-600 uppercase"
              >
                buyruqlar
              </th>
            </tr>
          </thead>
          <tbody class="">
            <tr
              class="border bg-white text-sm w-1/2"
              v-for="variation in product.variations"
              :key="variation.id"
            >
              <td class="px-6 py-1 border text-sm">
                {{ variation.name }}
              </td>

              <td class="px-6 py-1 border text-sm">
                {{ variation.product_code }}
              </td>
              <td class="px-6 py-1 border text-sm">
                {{ variation.description }}
              </td>
              <td class="px-6 py-1 border text-sm">
                <div v-for="categ in variation.categories" :key="categ.id">
                  {{ categ.name }}
                </div>
              </td>
              <td class="px-6 py-1 border text-sm">
                {{ variation.price }}
              </td>
              <td class="px-6 py-1 border text-sm">
                {{ variation.quantity }}
              </td>
              <td class="px-6 py-1 border text-sm">
                <div class="flex justify-around">
                  <nuxt-link
                    class="w-6 h-6 block"
                    :to="`/admin/product-change/${variation.id}`"
                  >
                    <img
                      src="~/assets/images/pencil.svg"
                      class="w-5 h-6"
                      alt="edit"
                    />
                  </nuxt-link>
                  <div
                    @click="
                      showDeleteDialog = true;
                      selectedProductID = variation.id;
                    "
                    class="cursor-pointer"
                  >
                    <img
                      src="~/assets/images/delete.svg"
                      class="w-5 h-5"
                      alt="delete"
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr
              class="w-9/12"
              v-for="variation in product.variations"
              :key="variation.id"
            >
              <h2 class="font-bold text-xl text-gray-800 mt-10">Attributlar</h2>
              <table class="w-full divide-y divide-gray-200 mt-5">
                <thead class="bg-gray-200">
                  <tr class="border">
                    <th
                      scope="col"
                      class="px-6 py-2 text-left text-xs font-bold text-gray-600 uppercase"
                    >
                      is main
                    </th>

                    <th
                      scope="col"
                      class="px-6 py-2 text-left text-xs font-bold text-gray-600 uppercase"
                    >
                      key
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-2 text-left text-xs font-bold text-gray-600 uppercase"
                    >
                      label
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-2 text-left text-xs font-bold text-gray-600 uppercase"
                    >
                      value
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white">
                  <tr
                    class="border"
                    v-for="(attrib, index) in variation.attributes"
                    :key="attrib"
                  >
                    <td class="px-6 py-1 border text-sm">
                      {{ attrib.is_main }}
                    </td>

                    <td class="px-6 py-1 border text-sm">
                      {{ index }}
                    </td>
                    <td class="px-6 py-1 border text-sm">
                      {{ attrib.label }}
                    </td>
                    <td class="px-6 py-1 border text-sm">
                      {{ attrib.value }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="">
        <span class="font-bold mb-4 text-xl block text-gray-700"
          >Asosiy rasm</span
        >
        <div class="w-56 h-64 my-5 border shadow-sm">
          <img
            :src="product.image"
            class="w-full h-full object-cover object-top"
            alt="product image"
          />
        </div>
        <span class="font-bold my-5 mt-5 text-xl block text-gray-700"
          >Galereya rasmlari</span
        >
        <div
          v-for="image in product.images"
          :key="image"
          class="inline-block w-56 h-64 my-5 mr-4 border shadow-sm"
        >
          <img
            :src="image"
            class="object-cover w-full h-full"
            alt="gallery image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSidebar from "~/components/admin/AdminSidebar.vue";
import priceMask from "~/mixins.js/priceMask.js";
export default {
  components: {
    AdminSidebar,
  },
  data() {
    return {
      priceMask: priceMask,
      showDeleteDialog: false,
      selectedProductID: null,
      product: {
        brand: {},
        color: {},
        category: {},
      },
    };
  },
  methods: {
    getProduct() {
      this.$axios.get(`product/detail/${this.$route.params.id}`).then(res => {
        console.log(res.data);
        this.product = res.data;
      });
    },
    deleteProduct(id) {
      this.$axios
        .delete(`product/delete/${id}`)
        .then(res => {
          console.log(res);
          this.showDeleteDialog = true;
          this.getProducts();
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>

<style>
.product-width {
  width: 60rem;
}
</style>
