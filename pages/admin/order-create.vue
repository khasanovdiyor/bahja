<template>
  <div>
    <div class="flex">
      <AdminSidebar />
      <div class="px-5 mx-auto w-4/5">
        <div
          v-if="showSuccess"
          class="fixed z-40 top-0 px-4 py-2 w-2/3 bg-green-400 text-lg text-white text-center"
        >
          Buyurtma qo'shildi
          <!-- <span
            class="absolute right-6 cursor-pointer"
            @click="showSuccess = false"
            >X</span
          > -->
        </div>
        <div
          v-if="showFail"
          class="fixed z-40 top-0 px-4 py-2 w-2/3 bg-red-400 text-lg text-white text-center"
        >
          Buyurtma qo'shishda xatolik yuz berdi, qayta urinib ko'ring
          <!-- <span
            class="absolute right-6 cursor-pointer"
            @click="showFail = false"
            >X</span
          > -->
        </div>
        <div class="pb-10">
          <h2 class="font-bold text-xl my-8">
            Buyurtmani o'zgartirish
          </h2>
          <div class="my-4">
            <label class="block font-bold text-gray-600 uppercase text-sm mb-2"
              >Buyurtmachi</label
            >
            <input
              type="string"
              class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
              v-model.trim="$v.newOrder.name.$model"
            />
            <div
              class="text-red-400 text-sm"
              v-if="!$v.newOrder.name.required && $v.newOrder.name.$dirty"
            >
<<<<<<< HEAD
              <i>To'ldirish shart</i>
            </div>
            <div
              class="text-red-400 text-sm"
              v-if="!$v.newOrder.name.minLength"
            >
              <i>
                Buyurtmachi ismi kamida

                {{ $v.newOrder.name.$params.minLength.min }} harf bo'lishi
                kerak</i
              >
=======
              {{ requiredMessage }}
            </div>
            <div class="text-red-400" v-if="!$v.newOrder.name.minLength">
              Buyurtmachi ismi kamida
              {{ $v.newOrder.name.$params.minLength.min }} harf bo'lishi kerak
>>>>>>> 02d9f5849938c9bf28a823602b9ca6710d567346
            </div>
          </div>
          <div class="my-4">
            <label class="block font-bold text-gray-600 uppercase text-sm mb-2"
              >Buyurtmachi telefon raqami</label
            >
            <input
              type="tel"
              class="w-1/2 border-2 rounded-md text-sm py-2 pl-5"
              v-model.trim="$v.newOrder.phone_number.$model"
            />
            <div
              class="text-red-400 text-sm"
              v-if="
                !$v.newOrder.phone_number.required &&
                  $v.newOrder.phone_number.$dirty
              "
            >
<<<<<<< HEAD
              <i>To'ldirish shart</i>
=======
              {{ requiredMessage }}
>>>>>>> 02d9f5849938c9bf28a823602b9ca6710d567346
            </div>
            <div
              class="text-red-400 text-sm"
              v-if="!$v.newOrder.phone_number.minLength"
            >
              <i>Telefon raqami kamida</i>

              {{ $v.newOrder.phone_number.$params.minLength.min }} son bo'lishi
              kerak
            </div>
          </div>
          <div
            class="text-red-400 text-sm"
            v-if="!$v.newOrder.products.required && $v.newOrder.products.$dirty"
          >
            <i>Buyurtma berishdan avval mahsulot qo'shing!</i>
          </div>
          <button
            class="bg-gray-800 mb-6 rounded-md text-sm text-white py-2 px-4"
            @click="createOrder"
          >
            Buyurtma qo'shish
          </button>
          <div v-if="addedProducts">
            <table class="min-w-full divide-y  divide-gray-200">
              <thead class="bg-gray-200 ">
                <tr class="rounded-md">
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
                    o'lchami
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
                    O'chirish
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr
                  class="border cursor-pointer"
                  v-for="(product, index) in addedProducts"
                  :key="product.product_id"
                >
                  <td class="px-6 py-1 border">
                    <div class="flex items-center text-gray-500">
                      {{ product.product_code }}
                    </div>
                  </td>
                  <td class="px-6 py-1 border">
                    <div class="flex items-center text-gray-500">
                      {{ product.size }}
                    </div>
                  </td>
                  <td class="px-6 py-1 border">
                    <div class="flex items-center text-gray-500">
                      {{ product.count }}
                    </div>
                  </td>
                  <div @click="removeProduct(index)" class="cursor-pointer">
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
            <h2 class="font-bold text-md uppercase mb-4">Mahsulot qo'shish</h2>
            <label class="block font-bold text-gray-600 uppercase text-sm mb-2"
              >Mahsulot tanlang</label
            >
            <multiselect
              v-model="selectedProduct"
              :options="products"
              placeholder="Mahsulot tanlang"
              label="codesize"
              @select="selectProduct"
            >
              <template
                ><span slot="noResult">Bunday mahsulot topilmadi!</span>
              </template>
            </multiselect>
          </div>
          <div class="my-4">
            <label class="block font-bold text-gray-600 uppercase text-sm mb-2"
              >soni</label
            >
            <input
              type="number"
              class="w-1/2 border-2 rounded-md text-sm py-2 px-4"
              v-model.trim="$v.newOrder.products.$model"
            />
            <div
              class="text-red-400 text-sm"
              v-if="
                !$v.newOrder.products.required && $v.newOrder.products.$dirty
              "
            >
              <i>To'ldirish shart</i>
            </div>
            <div class="text-red-400" v-if="!$v.newOrder.product">
              <div class="text-red-400" v-if="!$v.newOrder.product">
                {{ $v.newOrder.product }}
              </div>
            </div>
          </div>

          <button
            class="bg-gray-800 text-white rounded-md text-sm py-2 px-4"
            @click="addProduct"
          >
            Mahsulot qo'shish
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
      requiredMessage: "To'ldirish shart",
      showSuccess: false,
      showFail: false,
      showProductForm: false,
      selectedProduct: {
        id: null,
        codesize: null
      },
      newProduct: {
        count: null,
        product_id: null
      },
      newOrder: {
        name: null,
        phone_number: null,
        products: []
      },
      selectedOrder: {
        name: "",
        phone_number: "",
        status: ""
      },
      products: [],
      addedProducts: []
    };
  },
  validations: {
    newOrder: {
      name: {
        required,
        minLength: minLength(3)
      },
      phone_number: {
        required,
        minLength: minLength(9)
      },
      products: {
        required
      }
    }
  },
  methods: {
    addProduct() {
      this.newOrder.products.push(this.newProduct);
      let product = this.newProduct;
      let codesize = this.selectedProduct.codesize;
      console.log("olcham", codesize.indexOf("d: "));
      let product_code = codesize
        .substring(codesize.indexOf("d: ") + 2, codesize.indexOf("o`"))
        .trim();
      let size = codesize
        .substring(codesize.indexOf("m: ") + 3, codesize.length)
        .trim();
      product.product_code = product_code;
      product.size = size;
      this.addedProducts.push(product);
      this.getProducts();
    },
    removeProduct(index) {
      this.newOrder.products.splice(index, 1);
      this.addedProducts.splice(index, 1);
    },
    selectProduct(value, id) {
      this.newProduct.product_id = value.id;
    },
    createOrder() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        let loader = this.$loading.show();
        this.$axios
          .post(`cart/orderbeta-create/`, this.newOrder)
          .then(res => {
            loader.hide();
            console.log(res.data);
            this.showSuccess = true;
<<<<<<< HEAD
            setTimeout(function() {
              this.showSuccess = false;
            }, 3000);
          })
          .catch(err => {
            this.showFail = true;
            setTimeout(function() {
=======
            setTimeout(() => {
              this.showSuccess = false;
            }, 3000);
          })
          .catch((err) => {
            loader.hide();
            this.showFail = true;
            setTimeout(() => {
>>>>>>> 02d9f5849938c9bf28a823602b9ca6710d567346
              this.showFail = false;
            }, 3000);

            console.log(err);
          });
      }
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
    this.getProducts();
  }
};
</script>
<style>
.multiselect {
  width: 50%;
}
</style>
