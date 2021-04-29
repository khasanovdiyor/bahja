<template>
  <div>
    <div class="flex min-h-screen">
      <AdminSidebar />
      <div class="px-5 mx-auto w-4/5 pt-10">
        <div
          v-if="showSuccess"
          class="fixed z-40 top-0 px-4 py-2 w-2/3 bg-green-400 text-white text-center"
        >
          <i>{{ message }}</i>

          <!-- <span
            class="absolute right-6 cursor-pointer"
            @click="showSuccess = false"
            >X</span
          > -->
        </div>
        <div
          v-if="showFail"
          class="fixed z-40 top-0 px-4 py-2 w-2/3 bg-red-400 text-white text-center"
        >
          <i>{{ message }}</i>
          <!-- <span
            class="absolute right-6 cursor-pointer"
            @click="showFail = false"
            >X</span
          > -->
        </div>

        <div class="pb-10">
          <h2 class="font-bold text-xl mb-5">Buyurtmani o'zgartirish</h2>
          <div class="my-4">
            <label class="block font-bold uppercase text-gray-500 text-sm mb-2"
              >Buyurtmachi</label
            >
            <input
              type="string"
              class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
              v-model.trim="$v.selectedOrder.name.$model"
            />
            <div
              class="text-red-400 text-sm"
              v-if="
                !$v.selectedOrder.name.required && $v.selectedOrder.name.$dirty
              "
            >
              <i> To'ldirish shart</i>
            </div>
            <div
              class="text-red-400 text-sm"
              v-if="!$v.selectedOrder.name.minLength"
            >
              <i>
                Ism kamida
                {{ $v.selectedOrder.name.$params.minLength.min }} harf bo'lishi
                kerak</i
              >
            </div>
          </div>
          <div class="my-4">
            <label class="block font-bold uppercase text-gray-500 text-sm mb-2"
              >Telefon raqam</label
            >
            <input
              type="index"
              class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
              v-model.trim="$v.selectedOrder.phone_number.$model"
              v-mask="'+998 ## ### ## ##'"
            />
            <div
              class="text-red-400 text-sm"
              v-if="
                !$v.selectedOrder.phone_number.required &&
                $v.selectedOrder.phone_number.$dirty
              "
            >
              <i>To'ldirish shart</i>
            </div>
            <div
              class="text-red-400 text-sm"
              v-if="!$v.selectedOrder.phone_number.minLength"
            >
              <i
                >Telfon raqam kamida
                {{ $v.selectedOrder.phone_number.$params.minLength.min }} son
                bo'lishi kerak</i
              >
            </div>
          </div>
          <div class="my-4">
            <label class="block font-bold uppercase text-gray-500 text-sm mb-2"
              >Buyurtma xolati</label
            >
            <select
              class="w-1/2 border-2 rounded-md px-3 text-sm py-2"
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
            class="bg-gray-800 rounded-md text-sm text-white py-2 px-4"
            @click="updateOrder"
          >
            Ma'lumotlarni yangilash
          </button>
          <div>
            <table class="min-w-full divide-y divide-gray-200 my-5">
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
                    class="px-6 py-2 text-left text-xs font-bold text-gray-600 uppercase"
                  >
                    son
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-2 text-left text-xs font-bold text-gray-600 uppercase"
                  >
                    jami narx
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-2 w-40 text-left text-xs font-bold text-gray-600 uppercase"
                  >
                    buyruqlar
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
                    <div class=" text-sm">
                      <span
                        v-for="attr in product.product.attributes"
                        class="block lowercase"
                        :key="attr.id"
                      >
                        <b>{{ attr.label }} :</b> {{ attr.value }}
                      </span>
                    </div>
                  </td>
                  <td class="px-6 py-1 border">
                    <div class="flex items-center text-sm" v-if="product.price">
                      {{ product.price.toLocaleString() }} so'm
                    </div>
                  </td>
                  <td class="px-6 py-1 border w-16">
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
                  <td class="px-6 py-1 border w-40">
                    <div class="flex justify-around">
                      <div
                        class="cursor-pointer"
                        @click="updateOrderProduct(product.id, product.count)"
                      >
                        <img
                          src="~/assets/images/refresh.svg"
                          class="w-5 h-5"
                          alt="pencil icon"
                        />
                      </div>
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
                    </div>
                  </td>
                  <div
                    class="fixed z-50 top-0 bottom-0 right-0 left-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
                    v-if="showDeleteDialog"
                  >
                    <div class="w-1/3 opasity-0 rounded-md bg-white py-4 px-8">
                      <span class="font-bold text-xl text-center block mb-6"
                        >Ushbu mahsulotni o'chirishni xohlaysizmi?</span
                      >
                      <div class="flex justify-between">
                        <button
                          @click="deleteOrderProduct(orderProductId)"
                          class="bg-red-400 rounded-md text-white py-2 px-4"
                        >
                          Ha
                        </button>
                        <button
                          @click="showDeleteDialog = false"
                          class="bg-gray-600 rounded-md text-white py-2 px-4"
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
          <div class="my-10">
            <h2 class="font-bold text-xl mb-4">Mahsulot qo'shish</h2>
            <label class="block font-bold uppercase text-gray-500 text-sm mb-2"
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
            <label class="block font-bold uppercase text-gray-500 text-sm mb-2"
              >soni</label
            >
            <input
              type="text"
              class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
              v-model="newProduct.count"
            />
          </div>

          <button
            class="bg-gray-800 rounded-md text-sm text-white py-2 px-4"
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
    AdminSidebar,
  },
  data() {
    return {
      orderProductId: 0,
      showDeleteDialog: false,
      showSuccess: false,
      showFail: false,
      message: "",
      statuses: ["Kutilmoqda", "Bekor qilingan", "Tugallangan"],
      selectedProduct: {},
      newProduct: {
        order_id: this.$route.params.id,
        count: 0,
        proudct_id: null,
      },
      selectedOrder: {
        name: "",
        phone_number: "",
        status: "",
      },
      products: [],
      order: {},
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
        minLength: minLength(3),
      },
      phone_number: {
        required,
        minLength: minLength(13),
      },
    },
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
          .then((res) => {
            loader.hide();
            this.message = "Buyurtmachi ma'lumotlari yangilandi";
            this.showSuccess = true;

            console.log(res.data);
          })
          .catch((err) => {
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
        .then((res) => {
          this.message = "Yangi mahsulot qo'shildi";
          this.showSuccess = true;
          this.getOrder();

          console.log(res.data);
          loader.hide();
        })
        .catch((err) => {
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
        .then((res) => {
          this.order = res.data;
          console.log("Order: ", this.order);
          this.selectedOrder = Object.assign({}, res.data);
          delete this.selectedOrder.orderproducts;
          delete this.selectedOrder.id;
          delete this.selectedOrder.finish_price;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getProducts() {
      this.$axios
        .get(`product/codesize/`)
        .then((res) => {
          this.products = res.data;
          console.log("Selected Product", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteOrderProduct(id) {
      this.$axios
        .delete(`cart/orderproductbeta-delete/${id}`)
        .then((res) => {
          console.log(res);
          this.showDeleteDialog = false;
          this.getOrder();
          this.message = "Mahsulot o'chirildi";
          this.showSuccess = true;
        })
        .catch((err) => {
          this.message =
            "Mahsulot o'chirishda xatolik yuz berdi, qayta urinib ko'ring";
          this.showFail = true;
          console.log(err);
        });
      if (this.order.orderproducts.length === 1) {
        this.$router.push("/admin/orders");
      }
    },
    updateOrderProduct(id, count) {
      this.$axios
        .patch(`cart/orderproductbeta-update/${id}`, { count: count })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getOrder();
    this.getProducts();
  },
};
</script>
