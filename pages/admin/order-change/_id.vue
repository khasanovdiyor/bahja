<template>
  <div>
    <div>
      <div>
        <div class="pb-10">
          <h2 class="font-bold text-xl mb-5">Buyurtmani o'zgartirish</h2>
          <div class="my-4">
            <label
              class="block font-bold text-gray-600 uppercase text-sm mb-2 mt-4"
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
            <label
              class="block font-bold text-gray-600 uppercase text-sm mb-2 mt-4"
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
              <i>Telfon raqam to'liq emas</i>
            </div>
          </div>
          <div class="my-4">
            <label
              class="block font-bold text-gray-600 uppercase text-sm mb-2 mt-4"
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
          <BaseButtonLink
            class="mb-4"
            buttonText="Ma'lumotlarni yangilash"
            @button-click="updateOrder"
          />
          <div>
            <BaseTable :headers="tableHeaders">
              <template #body>
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
                      <input
                        type="text"
                        class="w-20 py-2 px-4"
                        v-model="product.count"
                      />
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
                </tr>
              </template>
            </BaseTable>
            <BaseDeleteModal
              v-if="showDeleteDialog"
              text="Ushbu mahsulotni buyurtmadan o'chirishni xohlaysizmi?"
              @delete="deleteOrderProduct"
              @close="showDeleteDialog = false"
            />
          </div>
          <div class="my-10">
            <h2 class="font-bold text-xl mb-4 text-gray-800">
              Mahsulot qo'shish
            </h2>
            <BaseSelect
              class="my-4 w-1/2"
              v-model="selectedProduct"
              label="Mahsulot"
              selectLabel="codesize"
              placeholder="Mahsulot tanlang"
              noResult="Bunday mahsulot topilmadi!"
              :options="products"
              @select="selectProduct"
            />
            <BaseTextField
              class="my-4"
              v-model="newProduct.count"
              :mask="priceMask"
              label="son"
            />
            <BaseButtonLink
              buttonText="Mahsulot qo'shish"
              @button-click="createOrderProduct"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { required, minLength } from "vuelidate/lib/validators";
import priceMask from "~/mixins.js/priceMask.js";

export default {
  data() {
    return {
      priceMask,
      orderProductId: null,
      showDeleteDialog: false,
      statuses: ["Kutilmoqda", "Bekor qilingan", "Tugallangan"],
      tableHeaders: [
        "kod",
        "nom",
        "attributlar",
        "narx",
        "son",
        "jami narx",
        "buyruqlar"
      ],
      selectedProduct: {},
      newProduct: {
        order_id: this.$route.params.id,
        count: null,
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
  validations: {
    selectedOrder: {
      name: {
        required,
        minLength: minLength(3)
      },
      phone_number: {
        required,
        minLength: minLength(17)
      }
    }
  },
  methods: {
    selectProduct(value) {
      this.newProduct.product_id = value.id;
    },
    updateOrder() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let loader = this.$loading.show();
        this.$axios
          .patch(
            `cart/orderbeta-update/${this.$route.params.id}`,
            this.selectedOrder
          )
          .then(res => {
            this.$toast.success(res.data);
            this.getOrder();
          })
          .catch(err => {
            this.$toast.error(err.response.data);
          })
          .finally(() => {
            loader.hide();
          });
      }
    },
    createOrderProduct() {
      let loader = this.$loading.show();
      this.newProduct.count.replace(/\s/g, "");
      this.$axios
        .post(`cart/orderproductbeta-create/`, this.newProduct)
        .then(res => {
          this.$toast.success(res.data);
          this.getOrder();
        })
        .catch(err => {
          this.$toast.error(err.response.data);
        })
        .finally(() => {
          loader.hide();
        });
    },
    getOrder() {
      let loader = this.$loading.show();
      this.$axios
        .get(`cart/orderbeta-detail/${this.$route.params.id}`)
        .then(res => {
          this.order = res.data;
          this.selectedOrder = Object.assign({}, res.data);
          delete this.selectedOrder.orderproducts;
          delete this.selectedOrder.id;
          delete this.selectedOrder.finish_price;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          loader.hide();
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
    deleteOrderProduct() {
      this.$axios
        .delete(`cart/orderproductbeta-delete/${this.orderProductId}`)
        .then(res => {
          if (res.status === 204) {
            this.$router.push("/admin/orders");
            this.$toast.success("Buyurtma o'chirildi");
          } else {
            this.$toast.success(res.data);
            this.getOrder();
          }
        })
        .catch(err => {
          this.$toast.error(err.response.data);
        })
        .finally(() => {
          this.showDeleteDialog = false;
        });
    },
    updateOrderProduct(id, count) {
      this.$axios
        .patch(`cart/orderproductbeta-update/${id}`, { count: count })
        .then(res => {
          this.$toast.success(res.data);
          this.getOrder();
        })
        .catch(err => {
          this.$toast.error(err.response.data);
        });
    }
  },
  mounted() {
    this.getOrder();
    this.getProducts();
  }
};
</script>