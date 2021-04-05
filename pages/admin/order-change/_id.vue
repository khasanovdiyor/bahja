<template>
  <div>
    <div class="flex ">
      <AdminSidebar />
      <div class="px-5 mx-auto w-4/5 pt-10">
        <div
          v-if="showSuccess"
          class="fixed z-40 top-0 px-4 py-2 w-2/3 bg-green-400 text-white text-center"
        >
          {{ message }}
          <span
            class="absolute right-6 cursor-pointer"
            @click="showSuccess = false"
            >X</span
          >
        </div>
        <div
          v-if="showFail"
          class="fixed z-40 top-0 px-4 py-2 w-2/3 bg-green-400 text-white text-center"
        >
          {{ message }}
          <span
            class="absolute right-6 cursor-pointer"
            @click="showFail = false"
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
              >Buyurtmachi telefon raqami</label
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
              <option disabled selected value="">Status tanlang </option>
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
            class="bg-gray-800 mb-6 text-white py-2 px-4"
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
                    kodi
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                  >
                    nomi
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
                    narxi
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
                  @click="getOrderProduct(product.id)"
                  class="border cursor-pointer"
                  v-for="product in order.orderproducts"
                  :key="product.id"
                >
                  <td class="px-6 py-1 border">
                    <div class="flex items-center text-gray-500 ">
                      {{ product.product.product_code }}
                    </div>
                  </td>
                  <td class="px-6 py-1 border">
                    <div class="flex items-center text-gray-500">
                      {{ product.product.name }}
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
                  <div
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
                  </div>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="my-4">
            <h2 class="font-bold text-2xl mb-4">Mahsulot qo'shish</h2>
            <label class="block font-bold uppercase text-sm mb-2"
              >Mahsulot tanlang</label
            >
            <multiselect
              v-model="selectedProduct"
              :options="products"
              placeholder="Brand tanlang"
              label="codesize"
              @select="selectProduct"
            >
              <template
                ><span slot="noResult">Bunday mahsulot topilmadi!</span>
              </template>
            </multiselect>
          </div>
          <div class="my-4">
            <label class="block font-bold uppercase text-sm mb-2">soni</label>
            <input
              type="text"
              class="w-1/2 border-2 text-sm py-2 px-4"
              v-model="newProduct.count"
            />
          </div>

          <button
            class="bg-gray-800 text-white py-2 px-4"
            @click="createOrderProduct"
          >
            Ma'lumotlarni saqlash
          </button>
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
      token: "58ef58a77940fd18fa91351c61773eada4859475",
      showSuccess: false,
      showFail: false,
      message: "",
      statuses: ["Tushgan", "Kutilmoqda", "Bekor qilingan", "Tugallangan"],
      selectedProduct: {},
      newProduct: {
        order_id: this.$route.params.id,
        count: 0,
        proudct_id: null
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
    selectProduct(value, id) {
      this.newProduct.id = value.id;
    },
    updateOrder() {
      let loader = this.$loading.show();
      this.$axios
        .patch(
          `cart/orderbeta-update/${this.$route.params.id}`,
          this.selectProduct
        )
        .then(res => {
          loader.hide();
          this.message = "Ma'lumotlar yangilandi";
          this.showSuccess = true;
          console.log(res.data);
        })
        .catch(err => {
          loader.hide();
          this.message =
            "Ma'lumotlarni yangilashda xatolik yuz berdi, qayta urinib ko'ring";
          this.showFail = true;
          console.log(err);
        });
    },
    createOrderProduct() {
      let loader = this.$loading.show();
      this.$axios
        .post("cart/orderproductbeta-create/", this.newProduct)
        .then(res => {
          this.message = "Yangi mahsulot qo'shildi";
          this.showSuccess = true;
          console.log(res.data);
          loader.hide();
        })
        .catch(err => {
          this.message =
            "Mahsulot qo'shishda xatolik yuz berdi, qayta urinib ko'ring";
          this.showFail = true;
          loader.hide();
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
          delete this.selectedOrder.orderproducts;
          delete this.selectedOrder.id;
          delete this.selectedOrder.finish_price;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getProducts() {
      this.$axios
        .get(`product/codesize/`)
        .then(res => {
          this.products = res.data;
          console.log("Selected Product", res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getOrder();
    this.getProducts();
  }
};
</script>
