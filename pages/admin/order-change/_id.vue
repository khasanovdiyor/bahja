<template>
  <div>
    <div class="flex ">
      <AdminSidebar />
      <div class="px-5 mx-auto w-4/5 pt-10">
        <div
          v-if="showNotification"
          class="fixed z-40 top-0 px-4 py-2 w-2/3 bg-green-400 text-white text-center"
        >
          Mahsulot yangilandi
          <span
            class="absolute right-6 cursor-pointer"
            @click="showNotification = false"
            >X</span
          >
        </div>

        <div class="pb-10">
          <h2 class="font-bold text-xl uppercase my-8">
            Buyurtmani o'zgartirish
          </h2>
          <div class="my-4">
            <label class="block font-bold uppercase text-sm mb-2"
              >Buyurtmachi</label
            >
            <input
              type="string"
              class="w-1/2 border-2 text-sm  py-2 pl-5"
              v-model="selectedOrder.name"
            />
          </div>
          <div class="my-4">
            <label class="block font-bold uppercase text-sm mb-2"
              >Buyurtmachi raqami</label
            >
            <input
              type="tel"
              class="w-1/2 border-2 text-sm  py-2 pl-5"
              v-model="selectedOrder.phone_number"
            />
          </div>
          <div class="my-4">
            <label class="block font-bold uppercase text-sm mb-2"
              >Buyurtma xolati</label
            >
            <select
              class="w-1/2 border-2 px-3 text-sm py-2"
              v-model="selectedOrder.status"
            >
              <option disabled selected value="">mahsulotni tanlang </option>
              <option
                class=""
                :value="status"
                v-for="status in statuses"
                :key="status"
              >
                {{ status }}</option
              >
            </select>
          </div>
          <button
            class="bg-green-400 mb-6 text-white py-2 px-4"
            @click="updateOrder"
          >
            Ma'lumotlarni yangilash
          </button>
          <div>
            <table class="min-w-full divide-y divide-gray-200 ">
              <thead class="bg-gray-200">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                  >
                    mahsulot id
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
                    kategoriyasi
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
                    mahsulot narxi
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                  >
                    soni
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                  >
                    jami narxi
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr
                  @click="getOrderProduct(product.id)"
                  class="border cursor-pointer"
                  v-for="product in order.orderproducts"
                  :key="product.id"
                >
                  <td class="px-6 py-1 border">
                    <div class="flex items-center text-gray-500 ">
                      {{ product.product.id }}
                    </div>
                  </td>
                  <td class="px-6 py-1 border">
                    <div class="flex items-center text-gray-500">
                      {{ product.product.name }}
                    </div>
                  </td>
                  <td class="px-6 py-1 border">
                    <div class="flex items-center text-gray-500">
                      {{ product.product.category.name }}
                    </div>
                  </td>
                  <td class="px-6 py-1 border">
                    <div class="flex items-center text-gray-500">
                      {{ product.product.brand.name }}
                    </div>
                  </td>
                  <td class="px-6 py-1 border">
                    <div class="flex items-center text-gray-500">
                      {{ product.product.size }}
                    </div>
                  </td>
                  <td class="px-6 py-1 border">
                    <div class="flex items-center text-gray-500">
                      {{ product.product.color.name }}
                    </div>
                  </td>
                  <td class="px-6 py-1 border">
                    <div class="flex items-center text-gray-500">
                      {{ product.product.price }}
                    </div>
                  </td>
                  <td class="px-6 py-1 border">
                    <div class="flex items-center text-gray-500">
                      {{ product.count }}
                    </div>
                  </td>
                  <td class="px-6 py-1 border">
                    <div
                      class="flex items-center text-gray-500 justify-between"
                    >
                      {{ product.single_overall_price }}
                    </div>
                  </td>
                  <!-- <div
                    class="fixed top-0 bottom-0 right-0 left-0 bg-gray-600 flex items-center justify-center"
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
                  </div> -->
                </tr>
              </tbody>
            </table>
          </div>
          <div class="my-4">
            <label class="block font-bold uppercase text-sm mb-2"
              >Mahsulot</label
            >
            <select
              class="w-1/2 border-2 px-3 text-sm py-2"
              v-model="selectedProduct.product.id"
            >
              <option disabled selected value="">mahsulotni tanlang</option>
              <option
                class=""
                :value="product.id"
                v-for="product in products"
                :key="product.id"
                >ID: {{ product.id }} Nomi: {{ product.name }}</option
              >
            </select>
          </div>
          <div class="my-4">
            <label class="block font-bold uppercase text-sm mb-2">rangi</label>
            <select
              class="w-1/2 border-2 px-3 text-sm py-2 "
              v-model="selectedProduct.product.color.id"
            >
              <option disabled selected value="">Rangini tanlang</option>
              <option
                class=""
                :value="color.id"
                v-for="color in colors"
                :key="color.id"
                >{{ color.name }}</option
              >
            </select>
          </div>
          <div class="my-4">
            <label class="block font-bold uppercase text-sm mb-2">soni</label>
            <input
              type="string"
              class="w-1/2 border-2 text-sm  py-2 px-4"
              v-model="selectedProduct.count"
            />
          </div>
          <div class="my-4">
            <label class="block font-bold uppercase text-sm mb-2"
              >o'lchami</label
            >
            <input
              type="string"
              class="w-1/2 border-2 text-sm py-2 px-4"
              v-model="selectedProduct.product.size"
            />
          </div>
          <div class="my-4">
            <label class="block font-bold uppercase text-sm mb-2">narxi</label>
            <input
              type="string"
              class="w-1/2 border-2 text-sm py-2 px-4"
              v-model="selectedProduct.product.price"
            />
          </div>

          <button
            class="bg-green-400 text-white py-2 px-4"
            @click="updateOrderProduct"
          >
            Ma'lumotlarni yangilash
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AdminSidebar from "~/components/admin/AdminSidebar.vue";
import TheNotification from "~/components/admin/TheNotification.vue";
export default {
  components: {
    AdminSidebar,
    TheNotification
  },
  data() {
    return {
      token: "58ef58a77940fd18fa91351c61773eada4859475",
      showNotification: false,
      showProductForm: false,
      statuses: ["Tushgan", "Kutilmoqda", "Bekor qilingan", "Tugallangan"],
      selectedProduct: {
        product: {
          color: {}
        }
      },
      selectedOrder: {
        name: "",
        phone_number: "",
        status: ""
      },
      colors: [],
      brands: [],
      products: [],
      order: {}
    };
  },
  methods: {
    updateOrder() {
      const formData = new FormData();
      formData.append("name", this.selectedOrder.name);
      formData.append("phone-number", this.selectedOrder.phone_number);
      formData.append("status", this.selectedOrder.status);
      this.$axios
        .patch(`cart/orderbeta-update/${this.$route.params.id}`, formData)
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateOrderProduct() {
      const formData = new FormData();
      formData.append("product0", this.selectedOrder.name);
      formData.append("count0", this.selectedOrder.phone_number);
      formData.append("status", this.selectedOrder.status);
      this.$axios
        .patch(
          `cart/orderproductbeta-update/${this.$route.params.id}`,
          this.selectedProduct
        )
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getOrder() {
      this.$axios
        .get(`cart/orderbeta-detail/${this.$route.params.id}`)
        .then(res => {
          this.order = res.data;
          console.log("Order: ", this.order);
          this.selectedOrder = this.order;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getOrderProduct(id) {
      this.$axios
        .get(`cart/orderproductbeta-detail/${id}`)
        .then(res => {
          console.log(res);
          this.selectedProduct = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getColors() {
      this.$axios
        .get(`product/color-list/`)
        .then(res => {
          this.colors = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getProducts() {
      this.$axios
        .get(`product/list/`)
        .then(res => {
          this.products = res.data;
          console.log("Selected Product", res.data);

          // this.productVariation.color = this.selectedVariation.color.name;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getOrder();
    this.getColors();
    this.getProducts();
  }
};
</script>
