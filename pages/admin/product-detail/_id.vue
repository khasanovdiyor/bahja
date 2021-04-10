<template>
  <div class="flex">
    <AdminSidebar class="w-1/5" />
    <div class="px-2 pt-10 w-2/3">
      <h1 class="font-bold text-xl mb-6">Mavjud Mahsulotlar</h1>
      <div>
        <table class="min-w-full divide-x divide-gray-200 flex">
          <thead class="bg-gray-200">
            <tr class="border-gray-400 border-b">
              <th
                scope="col"
                class="px-8 block py-2 text-left font-bold text-gray-700 uppercase"
              >
                id
              </th>
            </tr>
            <tr class="border-gray-400 border-b">
              <th
                scope="col"
                class="px-8 block py-2 text-left font-bold text-gray-700 uppercase"
              >
                nomi
              </th>
            </tr>
            <tr class="border-gray-400 border-b">
              <th
                scope="col"
                class="px-8 block py-2 text-left font-bold text-gray-700 uppercase"
              >
                kodi
              </th>
            </tr>
            <tr class="border-gray-400 border-b">
              <th
                scope="col"
                class="px-8 block py-2 text-left font-bold text-gray-700 uppercase"
              >
                tavsif
              </th>
            </tr>
            <tr class="border-gray-400 border-b">
              <th
                scope="col"
                class="px-8 block py-2 text-left font-bold text-gray-700 uppercase"
              >
                kategoriyasi
              </th>
            </tr>
            <tr class="border-gray-400 border-b">
              <th
                scope="col"
                class="px-8 block py-2 text-left font-bold text-gray-700 uppercase"
              >
                brandi
              </th>
            </tr>
            <tr class="border-gray-400 border-b">
              <th
                scope="col"
                class="px-8 block py-2 text-left font-bold text-gray-700"
              >
                NARXI (so'm)
              </th>
            </tr>
            <tr class="border-gray-400 border-b">
              <th
                scope="col"
                class="px-8 block py-2 text-left font-bold text-gray-700 uppercase"
              >
                soni
              </th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr class="border">
              <td class="px-6 py-2 border">
                <div class="flex items-center text-gray-500">
                  {{ product.id }}
                </div>
              </td>
            </tr>
            <tr class="border">
              <td class="px-6 py-2 border">
                <div class="flex items-center text-gray-500">
                  {{ product.name }}
                </div>
              </td>
            </tr>
            <tr class="border">
              <td class="px-6 py-2 border">
                <div class="flex items-center text-gray-500">
                  {{ product.product_code }}
                </div>
              </td>
            </tr>
            <tr class="border">
              <td class="px-6 py-2 border">
                <div class="flex items-center text-gray-500">
                  {{ product.description }}
                </div>
              </td>
            </tr>
            <tr class="border">
              <td
                class="px-6 py-2 border"
                v-for="category in product.categories"
                :key="category.id"
              >
                <div class="flex items-center text-gray-500">
                  {{ category.name }}
                </div>
              </td>
            </tr>
            <tr class="border">
              <td class="px-6 py-2 border">
                <div class="flex items-center text-gray-500">
                  {{ product.brand.name }}
                </div>
              </td>
            </tr>

            <tr class="border">
              <td class="px-6 py-2 border">
                <div class="flex items-center text-gray-500">
                  {{ product.price }}
                </div>
              </td>
            </tr>
            <tr class="border">
              <td class="px-6 py-2 border">
                <div class="flex items-center text-gray-500">
                  {{ product.quantity }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mb-10">
        <h2 class="font-bold text-xl my-4">Attributlar</h2>
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-200">
            <tr>
              <th
                scope="col"
                class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
              >
                is main
              </th>

              <th
                scope="col"
                class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
              >
                key
              </th>
              <th
                scope="col"
                class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
              >
                label
              </th>
              <th
                scope="col"
                class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
              >
                value
              </th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr
              class="border"
              v-for="(attrib, index) in product.attributes"
              :key="attrib"
            >
              <td class="px-6 py-1 border">
                {{ attrib.is_main }}
              </td>

              <td class="px-6 py-1 border">
                {{ index }}
              </td>
              <td class="px-6 py-1 border">
                {{ attrib.label }}
              </td>
              <td class="px-6 py-1 border">
                {{ attrib.value }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mb-10">
        <div class="flex items-center justify-between">
          <h2 class="font-bold text-xl my-4">O'zgarishlari</h2>
          <nuxt-link
            :to="`/admin/variation-create/${$route.params.id}`"
            class="bg-gray-800 py-1 px-4 text-font-bold text-2xl text-white"
            >+</nuxt-link
          >
        </div>
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-200">
            <tr>
              <th
                scope="col"
                class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
              >
                Nomi
              </th>

              <th
                scope="col"
                class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
              >
                Kodi
              </th>
              <th
                scope="col"
                class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
              >
                Tavsif
              </th>
              <th
                scope="col"
                class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
              >
                Kategoriyasi
              </th>
              <th
                scope="col"
                class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
              >
                Narxi
              </th>
              <th
                scope="col"
                class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
              >
                Soni
              </th>
              <th
                scope="col"
                class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
              >
                O'zgartirish/ <br />
                O'chirish
              </th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr
              class="border"
              v-for="variation in product.variations"
              :key="variation.id"
            >
              <td class="px-6 py-1 border">
                {{ variation.name }}
              </td>

              <td class="px-6 py-1 border">
                {{ variation.product_code }}
              </td>
              <td class="px-6 py-1 border">
                {{ variation.description }}
              </td>
              <td class="px-6 py-1 border">
                <div v-for="categ in variation.categories" :key="categ.id">
                  {{ categ.name }}
                </div>
              </td>
              <td class="px-6 py-1 border">
                {{ variation.price }}
              </td>
              <td class="px-6 py-1 border">
                {{ variation.quantity }}
              </td>
              <td class="px-6 py-1 border">
                <div class="flex justify-between">
                  <nuxt-link
                    class="w-6 h-6 block"
                    :to="`/admin/product-change/${variation.id}`"
                  >
                    <img
                      src="~/assets/images/pencil.svg"
                      class="w-5 h-6"
                      alt="pencil icon"
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
                      alt="pencil icon"
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr
              class="border"
              v-for="variation in product.variations"
              :key="variation.id"
            >
              <div class="mb-10">
                <h2 class="font-bold text my-1">Attributlar</h2>
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-200">
                    <tr>
                      <th
                        scope="col"
                        class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                      >
                        is main
                      </th>

                      <th
                        scope="col"
                        class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                      >
                        key
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                      >
                        label
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
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
                      <td class="px-6 py-1 border">
                        {{ attrib.is_main }}
                      </td>

                      <td class="px-6 py-1 border">
                        {{ index }}
                      </td>
                      <td class="px-6 py-1 border">
                        {{ attrib.label }}
                      </td>
                      <td class="px-6 py-1 border">
                        {{ attrib.value }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-10">
        <span class="font-bold mb-4 block">Rasmi</span>
        <div class="w-56 h-48">
          <img
            :src="product.image"
            class="w-full h-full object-cover object-top"
            alt="product image"
          />
        </div>
        <span class="font-bold mt-10 mb-4 block">Galereya rasmlari</span>
        <div class="flex">
          <div
            v-for="image in product.images"
            :key="image"
            class="w-56 h-48 mb-10 mr-4"
          >
            <img
              :src="image"
              class="object-cover object-top w-full h-full"
              alt="gallery image"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSidebar from "~/components/admin/AdminSidebar.vue";
export default {
  components: {
    AdminSidebar,
  },
  data() {
    return {
      showDeleteDialog: false,
      selectedProductID: 0,
      product: {
        brand: {},
        color: {},
        category: {},
      },
    };
  },
  methods: {
    getProduct() {
      this.$axios.get(`product/detail/${this.$route.params.id}`).then((res) => {
        console.log(res.data);
        this.product = res.data;
      });
    },
    deleteProduct(id) {
      this.$axios
        .delete(`product/delete/${id}`)
        .then((res) => {
          console.log(res);
          this.showDeleteDialog = false;
          this.getProducts();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>

<style></style>
