<template>
  <div>
    <div>
      <div class="flex items-center justify-between mb-6">
        <h1 class="font-bold text-xl text-gray-700">Mahsulot</h1>
        <div class="flex items-center text-sm justify-between w-24">
          <nuxt-link :to="`/admin/product-change/${product.id}`">
            <img
              src="~/assets/images/pencil.svg"
              class="w-5 h-5"
              alt="pencil icon"
            />
          </nuxt-link>
          <div
            @click="
              showDeleteParent = true;
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
      </div>
      <BaseDeleteModal
        v-if="showDeleteParent"
        text="Ushbu mahsulotni o'chirishni xohlaysizmi?"
        @delete="deleteParent"
        @close="showDeleteParent = false"
      />
      <div>
        <table class="min-w-full divide-x divide-gray-200 flex">
          <thead class="bg-gray-200 w-1/4 capitalize">
            <tr
              class="border-gray-400 border-b"
              v-for="(header, idx) in productHeaders"
              :key="idx"
            >
              <th
                scope="col"
                class="px-8 block py-2 w-72 text-left text-sm font-bold text-gray-600"
              >
                {{ header }}
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

            <tr class="border-b" v-if="product.price">
              <td class="px-6 py-2">
                <div class="flex items-center text-sm">
                  {{ product.price.toLocaleString() }}
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
              :key="index"
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
      </div>
      <div class="my-8">
        <div>
          <div class="flex items-center justify-between mb-6">
            <h1 class="font-bold text-xl text-gray-700">O'zgarishlar</h1>
            <BaseButtonLink
              link
              :url="`/admin/variation-create/${$route.params.id}`"
              buttonText="Qo'shish"
            />
          </div>

          <BaseTable :headers="variationHeaders">
            <template #body>
              <tr
                class="border"
                v-for="product in variations"
                :key="product.id"
              >
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
                    <div
                      v-for="category in product.categories"
                      :key="category.id"
                    >
                      {{ category.name }}
                    </div>
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
            @delete="deleteProduct"
            @close="showDeleteDialog = false"
          />
        </div>
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
          v-for="(image, index) in product.images"
          :key="index"
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
import priceMask from "~/mixins.js/priceMask.js";
export default {
  layout: "admin",
  data() {
    return {
      priceMask: priceMask,
      variationHeaders: [
        "nomi",
        "kodi",
        "atributlar",
        "Kategoriyalari",
        "narxi",
        "buyruqlar"
      ],
      productHeaders: [
        "id",
        "nom",
        "kod",
        "Tavsif",
        "Kategoriya",
        "Brend",
        "Son",
        "narxi"
      ],
      showDeleteDialog: false,
      showDeleteParent: false,
      selectedProductID: null,
      product: {
        brand: {},
        color: {},
        category: {}
      },
      variations: []
    };
  },
  methods: {
    getProduct() {
      let loader = this.$loading.show();
      this.$axios
        .get(`product/detail/${this.$route.params.id}`)
        .then(res => {
          this.product = res.data.find(el => el.parent_id === 0);
          this.variations = res.data.filter(el => el.parent_id !== 0);
        })
        .finally(() => {
          loader.hide();
        });
    },
    deleteProduct() {
      this.$axios
        .delete(`product/delete/${this.selectedProductID}`)
        .then(res => {
          this.$toast.success(res.data || "Mahsulot muvaffaqiyatli o'chirildi");
          this.getProduct();
        })
        .catch(err => {
          this.$toast.error(
            err.response.data || "Mahsulot o'chirishda xatolik yuz berdi"
          );
          console.log(err);
        })
        .finally(() => {
          this.showDeleteDialog = false;
        });
    },
    deleteParent() {
      this.$axios
        .delete(`product/delete/${this.selectedProductID}`)
        .then(res => {
          this.$toast.success(res.data || "Mahsulot muvaffaqiyatli o'chirildi");
          this.$router.push("/admin/products");
        })
        .catch(err => {
          this.$toast.error(
            err.response.data || "Mahsulot o'chirishda xatolik yuz berdi"
          );
          console.log(err);
        })
        .finally(() => {
          this.showDeleteParent = false;
        });
    }
  },
  mounted() {
    this.getProduct();
  }
};
</script>

<style>
.product-width {
  width: 60rem;
}
</style>
