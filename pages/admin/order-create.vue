<template>
  <div>
    <div>
      <div class="mb-10">
        <div class="pb-10">
          <div class="mt-10">
            <h2 class="font-bold text-xl text-gray-800 mb-6">
              Buyurtma qo'shish mahsulotlar
            </h2>
            <BaseSelect
              class="my-4 w-1/2"
              v-model.trim="$v.selectedProduct.$model"
              label="Mahsulot"
              :options="products"
              select-label="codesize"
              placeholder="Mahsulot tanlang"
              noResult="Bunday mahsulot topilmadi"
              required
              :required-message="
                !$v.selectedProduct.codesize.required &&
                $v.selectedProduct.codesize.$dirty
              "
              @select="selectProduct"
            />
          </div>
          <BaseTextField
            class="my-4"
            v-model.trim="$v.newProduct.count.$model"
            label="Son"
            required
            :required-message="
              !$v.newProduct.count.required && $v.newProduct.count.$dirty
            "
          />
          <div class="text-red-400 mb-4" v-if="alreadyAdded">
            Siz bu mahsulotni qo'shdingiz!
          </div>
          <BaseButtonLink
            buttonText="Mahsulot qo'shish"
            @button-click="addProduct"
          />
        </div>
        <div v-if="addedProducts">
          <BaseTable :headers="tableHeaders">
            <template #body>
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
                  @click="
                    selectedIndex = index;
                    showDeleteDialog = true;
                  "
                  class="flex justify-center items-center cursor-pointer"
                >
                  <img
                    src="~/assets/images/delete.svg"
                    class="w-5 h-5"
                    alt="pencil icon"
                  />
                </div>
              </tr>
            </template>
          </BaseTable>
          <BaseDeleteModal
            v-if="showDeleteDialog"
            text="Ushbu mahsulotni buyurtmadan o'chrimoqchimisiz?"
            @close="showDeleteDialog = false"
            @delete="removeProduct"
          />
        </div>
        <BaseTextField
          class="my-4"
          v-model.trim="$v.newOrder.name.$model"
          label="Buyurtmachi"
          required
          :required-message="
            !$v.newOrder.name.required && $v.newOrder.name.$dirty
          "
        />
        <BaseTextField
          class="my-4"
          v-model.trim="$v.newOrder.phone_number.$model"
          label="Telefon raqami"
          mask="+998 ## ### ## ##"
          required
          :required-message="
            !$v.newOrder.phone_number.required &&
            $v.newOrder.phone_number.$dirty
          "
        />
        <BaseButtonLink
          buttonText="Buyurtma qo'shish"
          @button-click="createOrder"
        />
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
import { required, minLength } from "vuelidate/lib/validators";
import priceMask from "~/mixins.js/priceMask.js";
export default {
  data() {
    return {
      tableHeaders: ["kod", "o'lcham", "son", "buyruqlar"],
      priceMask,
      alreadyAdded: false,
      showDeleteDialog: false,
      selectedProduct: {},
      newProduct: {
        product_id: null,
        count: null
      },
      newOrder: {
        name: null,
        phone_number: null,
        products: []
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
      this.alreadyAdded = false;
      this.$v.selectedProduct.$touch();
      this.$v.newProduct.$touch();
      if (
        !this.$v.selectedProduct.$invalid &&
        !this.$v.newProduct.count.$invalid
      ) {
        let result = this.addedProducts.find(
          el => el.id === this.newProduct.product_id
        );
        if (result) {
          this.alreadyAdded = true;
        } else {
          this.addedProducts.push({
            id: this.selectedProduct.id,
            count: this.newProduct.count,
            size: this.selectedProduct.size,
            product_code: this.selectedProduct.product_code
          });
          this.newOrder.products.push(this.newProduct);
        }
      }
    },
    removeProduct(index) {
      this.newOrder.products.splice(index, 1);
      this.addedProducts.splice(index, 1);
      this.showDeleteDialog = false;
    },
    selectProduct(value) {
      this.newProduct.product_id = value.id;
    },
    createOrder() {
      this.$v.newOrder.$touch();
      if (!this.$v.newOrder.$invalid) {
        let loader = this.$loading.show();
        this.$axios
          .post("cart/orderbeta-create/", this.newOrder)
          .then(res => {
            this.$toast.success(res.data);
          })
          .catch(err => {
            this.$toast.error(err.response.data);
          })
          .finally(() => {
            loader.hide();
          });
      }
    },
    getProducts() {
      this.$axios
        .get(`product/codesize/`)
        .then(res => {
          this.products = res.data;
        })
        .catch(err => {
        });
    }
  },
  mounted() {
    this.getProducts();
  }
};
</script>
