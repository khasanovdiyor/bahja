<template>
  <div>
    <div class="flex min-h-screen bg-gray-100">
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
          <div class="mt-10">
            <h2 class="font-bold text-xl text-gray-800 mb-6">
              Buyurtma qo'shish
            </h2>
            <label class="block font-bold text-gray-500 uppercase text-sm mb-2"
              >Mahsulot
            </label>
            <multiselect
              v-model="$v.selectedProduct.$model"
              :options="products"
              placeholder="Mahsulot tanlang"
              label="codesize"
              @select="selectProduct"
            >
              <template
                ><span class="text-red-500" slot="noResult"
                  >Bunday mahsulot topilmadi!</span
                >
              </template>
            </multiselect>
            <div
              class="text-red-400 text-sm"
              v-if="
                !$v.selectedProduct.codesize.required &&
                  $v.selectedProduct.codesize.$dirty
              "
            >
              <i>To'ldirish shart</i>
            </div>
          </div>
          <div class="my-4">
            <label class="block font-bold text-gray-500 uppercase text-sm mb-2"
              >son</label
            >
            <input
              type="number"
              class="w-1/2 border-2 rounded-md text-sm py-2 px-4"
              v-model.trim="$v.newProduct.count.$model"
            />
            <div
              class="text-red-400 text-sm"
              v-if="!$v.newProduct.count.required && $v.newProduct.count.$dirty"
            >
              <i>Son kiriting</i>
            </div>
          </div>
          <div class="text-red-400 mb-4" v-if="alreadyAdded">
            Siz bu mahsulotni qo'shdingiz!
          </div>
          <button
            class="bg-gray-800 text-white text-sm rounded-md py-2 px-4"
            @click="addProduct"
          >
            Mahsulot qo'shish
          </button>
        </div>
        <div v-if="addedProducts">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-200">
              <tr class="rounded-md">
                <th
                  scope="col"
                  class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                >
                  kod
                </th>
                <th
                  scope="col"
                  class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                >
                  o'lcham
                </th>
                <th
                  scope="col"
                  class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                >
                  son
                </th>
                <th
                  scope="col"
                  class="px-6 py-2 w-40 text-left text-sm font-bold text-gray-700 uppercase"
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
                <div
                  @click="removeProduct(index)"
                  class="flex justify-center items-center cursor-pointer"
                >
                  <img
                    src="~/assets/images/delete.svg"
                    class="w-5 h-5"
                    alt="pencil icon"
                  />
                </div>
                <div
                  class="fixed top-0 bottom-0 right-0 left-0 bg-gray-500 opasity-50 flex items-center justify-center"
                  v-if="showDeleteDialog"
                >
                  <div class="w-1/3 bg-white opasity-0 py-4 px-8">
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
          <label
            class="block font-bold text-gray-600 uppercase text-sm mt-10 mb-2"
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
            <i>To'ldirish shart</i>
          </div>
          <div class="text-red-400 text-sm" v-if="!$v.newOrder.name.minLength">
            <i>
              Buyurtmachi ismi kamida

              {{ $v.newOrder.name.$params.minLength.min }} harf bo'lishi
              kerak</i
            >
          </div>
        </div>
        <div class="my-4">
          <label class="block font-bold text-gray-600 uppercase text-sm mb-2"
            >Telefon raqam</label
          >
          <input
            type="index"
            class="w-1/2 border-2 rounded-md text-sm py-2 pl-5"
            v-model.trim="$v.newOrder.phone_number.$model"
            v-mask="'+998 ## ### ## ##'"
          />
          <div
            class="text-red-400 text-sm"
            v-if="
              !$v.newOrder.phone_number.required &&
                $v.newOrder.phone_number.$dirty
            "
          >
            <i>To'ldirish shart</i>
          </div>
          <div
            class="text-red-400 text-sm"
            v-if="!$v.newOrder.phone_number.minLength"
          >
            <i>Telfon raqam to'liq emas</i>
          </div>
        </div>

        <!-- <i>Telefon raqam kamida
               {{ $v.newOrder.phone_number.$params.minLength }} raqam bo'lishi
                kerak  To'ldirish shart</i>
            </div>
          </div>
          <div
            class="text-red-400 mb-4"
            v-if="!$v.newOrder.products.required && $v.newOrder.products.$dirty"
          >
            <i>Buyurtma berishdan avval mahsulot qo'shing!</i>
          </div> -->
        <button
          class="bg-gray-800 mb-6 rounded-md text-sm text-white py-2 px-4"
          @click="createOrder"
        >
          Buyurtma qo'shish
        </button>
        <div
          class="text-red-400 mb-4"
          v-if="!$v.newOrder.products.required && $v.newOrder.products.$dirty"
        >
          <i>Buyurtma berishdan avval mahsulot qo'shing!</i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AdminSidebar from "~/components/admin/AdminSidebar.vue";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import priceMask from "~/mixins.js/priceMask.js";
export default {
  components: {
    AdminSidebar
  },
  data() {
    return {
      priceMask: priceMask,
      requiredMessage: "To'ldirish shart",
      showSuccess: false,
      alreadyAdded: false,
      showDeleteDialog: false,
      showFail: false,
      showProductForm: false,
      selectedProduct: {
        id: null,
        codesize: null
      },
      newProduct: {
        count: 0,
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
    selectedProduct: {
      codesize: {
        required
      }
    },
    newProduct: {
      count: {
        required
      }
    },
    newOrder: {
      name: {
        required,
        minLength: minLength(3)
      },
      count: {
        required,
        minLength: minLength(1)
      },
      phone_number: {
        required,
        minLength: minLength(17)
      },
      products: {
        required
      }
    }
  },
  methods: {
    addProduct() {
      this.$v.selectedProduct.$touch();
      this.$v.newProduct.$touch();
      if (
        !this.$v.selectedProduct.$invalid &&
        !this.$v.newProduct.count.$invalid
      ) {
        this.newOrder.products.push(this.newProduct);
        let product = this.newProduct;
        let codesize = this.selectedProduct.codesize;
        console.log("olcham", codesize);
        let product_code = codesize
          .substring(codesize.indexOf("d: ") + 2, codesize.indexOf("o`"))
          .trim();
        let size = codesize
          .substring(codesize.indexOf("m: ") + 3, codesize.length)
          .trim();
        product.product_code = product_code;
        product.size = size;
        let result = this.addedProducts.find(
          el => el.product_id == this.newProduct.product_id
        );
        console.log("result", result);
        if (result) {
          this.alreadyAdded = true;
        } else {
          this.addedProducts.push(product);
          (this.selectedProduct = {}),
            (this.newProduct = {
              count: null,
              product_id: null
            });
        }
      }
    },
    removeProduct(index) {
      this.newOrder.products.splice(index, 1);
      this.addedProducts.splice(index, 1);
    },
    selectProduct(value, id) {
      this.newProduct.product_id = value.id;
    },
    createOrder() {
      this.$v.newOrder.$touch();
      if (this.$v.newOrder.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        let loader = this.$loading.show();
        this.$axios
          .post("product/order/create/", formData)
          .then(res => {
            loader.hide();
            console.log(res.data);
            this.showSuccess = true;
            setTimeout(() => {
              this.showSuccess = false;
            }, 3000);
          })
          .catch(err => {
            loader.hide();
            this.showFail = true;
            setTimeout(() => {
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
