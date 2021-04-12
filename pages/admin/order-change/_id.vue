<template>
  <div>
    <div class="flex min-h-screen">
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
          class="fixed z-40 top-0 px-4 py-2 w-2/3 bg-red-400 text-white text-center"
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
              class="w-1/2 border-2 text-sm py-2 pl-5"
              v-model.trim="$v.selectedOrder.name.$model"
            />
            <div
              class="text-red-400"
              v-if="
                !$v.selectedOrder.name.required && $v.selectedOrder.name.$dirty
              "
            >
              To'ldirish shart
            </div>
            <div class="text-red-400" v-if="!$v.selectedOrder.name.minLength">
              Buyurtmachi nomi kamida
              {{ $v.selectedOrder.name.$params.minLength.min }} harf bo'lishi
              kerak
            </div>
          </div>
          <div class="my-4">
            <label class="block font-bold uppercase text-sm mb-2"
              >Buyurtmachi telefon raqami</label
            >
            <input
              type="index"
              class="w-1/2 border-2 text-sm py-2 pl-5"
              v-model.trim="$v.selectedOrder.phone_number.$model"
            />
            <div
              class="text-red-400"
              v-if="
                !$v.selectedOrder.phone_number.required &&
                  $v.selectedOrder.phone_number.$dirty
              "
            >
              To'ldirish shart
            </div>
            <div
              class="text-red-400"
              v-if="!$v.selectedOrder.phone_number.minLength"
            >
              Telfon raqami kamida
              {{ $v.selectedOrder.phone_number.$params.minLength.min }} son
              bo'lishi kerak
            </div>
          </div>
          <div class="my-4">
            <label class="block font-bold uppercase text-sm mb-2"
              >Buyurtma xolati</label
            >
            <select
              class="w-1/2 border-2 px-3 text-sm py-2"
              v-model="selectedOrder.status"
            >
              <option disabled selected value="">Status tanlang</option>
              <option
                class=""
                :value="status"
                v-for="status in statuses"
                :key="status"
              >
                {{ status }}
              </option>
            </select>
          </div>
          <button
            class="bg-gray-800 mb-6 text-white py-2 px-4"
            @click="updateOrder"
          >
            Ma'lumotlarni yangilash
          </button>
          <div>
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-200">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                  >
                    mahsulot kodi
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
                    Attributlari
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
                  <th
                    scope="col"
                    class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                  >
                    O'chirish
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
                    <div class="flex items-center text-gray-500">
                      {{ product.product_code }}
                    </div>
                  </td>
                  <td class="px-6 py-1 border">
                    <div class="flex items-center text-gray-500">
                      {{ product.product.name }}
                    </div>
                  </td>
                  <td class="px-6 py-1 border">
                    <div class="text-gray-500">
                      <span
                        v-for="attr in product.product.attributes"
                        class="block"
                        :key="attr.id"
                      >
                        {{ attr.label }}: {{ attr.value }}
                      </span>
                    </div>
                  </td>
                  <td class="px-6 py-1 border">
                    <div
                      class="flex items-center text-gray-500"
                      v-if="product.price"
                    >
                      {{ product.price.toLocaleString() }} so'm
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
                      v-if="product.single_overall_price"
                    >
                      {{ product.single_overall_price.toLocaleString() }}
                      so'm
                    </div>
                  </td>
                  <td class="px-6 py-1 border">
                    <div
                      class="cursor-pointer"
                      @click="
                        orderProductId = product.id;
                        showDeleteDialog = true;
                      "
                    >
                      <img
                        src="~/assets/images/delete.svg"
                        class="w-5 h-5"
                        alt="pencil icon"
                      />
                    </div>
                  </td>
                  <div
                    class="fixed z-50 top-0 bottom-0 right-0 left-0 bg-gray-600 opacity-50 flex items-center justify-center"
                    v-if="showDeleteDialog"
                  >
                    <div class="w-1/3 opacity-100 bg-white py-4 px-8">
                      <span class="font-bold text-xl block mb-6"
                        >Ushbu mahsulotni o'chirishni xohlaysizmi?</span
                      >
                      <button
                        @click="deleteOrderProduct(orderProductId)"
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
import { required, minLength } from "vuelidate/lib/validators";

export default {
  components: {
    AdminSidebar
  },
  data() {
    return {
      orderProductId: 0,
      showDeleteDialog: false,
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
      products: [],
      order: {}
    };
  },
  watch: {
    showSuccess() {
      if (this.showSuccess === true)
        setTimeout(() => {
          this.showSuccess = false;
        }, 3000);
    },
    showFail() {
      if (this.showFail === true)
        setTimeout(() => {
          this.showFail = false;
        }, 3000);
    },
  },
  validations: {
    selectedOrder: {
      name: {
        required,
        minLength: minLength(3)
      },
      phone_number: {
        required,
        minLength: minLength(9)
      }
    }
  },
  methods: {
    selectProduct(value, id) {
      this.newProduct.product_id = value.id;
    },
    updateOrder() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        let loader = this.$loading.show();
        this.$axios
          .patch(
            `cart/orderbeta-update/${this.$route.params.id}`,
            this.selectProduct
          )
          .then(res => {
            loader.hide();
            this.message = "Buyurtmachi ma'lumotlari yangilandi";
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
      }
    },
    createOrderProduct() {
      let loader = this.$loading.show();
      this.$axios
        .post(`cart/orderproductbeta-create/`, this.newProduct)
        .then(res => {
          this.message = "Yangi mahsulot qo'shildi";
          this.showSuccess = true;
          this.getOrder();

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
          this.selectedOrder = Object.assign({}, res.data);
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
    },
    deleteOrderProduct(id) {
      this.$axios
        .delete(`cart/orderproductbeta-delete/${id}`)
        .then(res => {
          console.log(res);
          this.showDeleteDialog = false;
          this.getOrder();
          this.message = "Mahsulot o'chirildi";
          this.showSuccess = true;
        })
        .catch(err => {
          this.message =
            "Mahsulot o'chirishda xatolik yuz berdi, qayta urinib ko'ring";
          this.showFail = true;
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
