<template>
  <div>
    <div>
      <div>
        <tabs :options="{ useUrlFragment: false }">
          <tab name="Asosiy ma'lumotlar">
            <h2 class="text-xl font-bold text-gray-700 mb-10">
              Asosiy ma'lumotlar
            </h2>

            <div>
              <BaseTextField
                class="my-4"
                v-model.trim="$v.product.name.$model"
                label="Nom"
                required
                :required-message="
                  !$v.product.name.required && $v.product.name.$dirty
                "
              />
              <BaseTextField
                class="my-4"
                v-model.trim="$v.product.product_code.$model"
                label="Kod"
                mask="NNNNNNN"
                required
                :required-message="
                  !$v.product.product_code.required &&
                  $v.product.product_code.$dirty
                "
              />
              <BaseSelect
                class="my-4 w-1/2"
                v-model.trim="$v.selectedBrand.$model"
                label="Brend"
                :options="brands"
                @select="selectBrand"
                placeholder="Brend tanlang"
                required
                :required-message="
                  !$v.selectedBrand.required && $v.selectedBrand.$dirty
                "
              />
              <BaseTextField
                class="my-4"
                v-model.trim="$v.product.description.$model"
                label="Tavsif"
                textarea
                required
                :required-message="
                  !$v.product.description.required &&
                  $v.product.description.$dirty
                "
              />
              <BaseSelect
                class="my-4 w-1/2"
                v-model="selectedProductCategories"
                label="Kategoriya"
                :options="categories"
                placeholder="Kategoriya tanlang"
                noResult="Bunday kategoriya topilmadi"
                multiple
                taggable
                @select="value => selectCategories(value, product.categories)"
                @remove="value => removeCategories(value, product.categories)"
                required
                :required-message="
                  !$v.selectedCategories.required &&
                  $v.selectedCategories.$dirty
                "
              />
              <BaseTextField
                class="my-4"
                v-model.trim="$v.product.quantity.$model"
                label="Son"
                :mask="priceMask"
                required
                :required-message="
                  !$v.product.quantity.required && $v.product.quantity.$dirty
                "
              />
              <BaseTextField
                class="my-4"
                v-model.trim="$v.product.price.$model"
                label="Narx"
                :mask="priceMask"
                required
                :required-message="
                  !$v.product.price.required && $v.product.price.$dirty
                "
              />
              <BaseImageField
                class="my-4"
                label="Rasm"
                :image="product.image"
                required
                @change="value => previewImage(value, product, false)"
              />
              <div class="text-red-400 text-sm" v-show="imageRequired">
                Rasm qo'yish shart
              </div>
              <BaseImageField
                class="my-4"
                multiple
                required
                label="galereya rasmlari"
                :images="product.images"
                @change="value => previewImage(value, product, true)"
                @remove-image="removeImage"
              />
              <div class="text-red-400 text-sm" v-show="imagesMinLength">
                Gallereya rasmlari kamida 3 ta bo'lishi kerak
              </div>
              <div class="my-4">
                <label
                  class="
                    block
                    font-bold
                    text-gray-600 text-gray-600
                    uppercase
                    text-sm
                    mb-1
                  "
                  >Import</label
                >
                <input
                  type="checkbox"
                  class="border text-sm w-5 h-5 pl-5"
                  v-model="product.is_import"
                />
              </div>
              <div class="mb-10">
                <AttributesTable
                  :attributes="product.attributes"
                  :attribute="attribute"
                  :showAddNewKey="showAddNewKey"
                  @add-attribute="addAttribute"
                  @remove-attribute="removeAttribute"
                />
                <BaseButtonLink
                  class="mt-2"
                  buttonText="Qo'shish"
                  @button-click="showAddNewKey = true"
                />
                <div class="text-red-400 text-sm" v-show="attributesMinLength">
                  Atributlar kamida 2 ta bo'lishi kerak
                </div>
              </div>
            </div>
          </tab>
          <tab name="O'zgartirish" class="w-full text-lg">
            <h2 class="text-xl font-bold text-gray-700 mb-10">O'zgarishlar</h2>

            <div class="w-full">
              <BaseTextField
                v-model.trim="$v.variation.name.$model"
                label="nom"
                class="my-4"
                required
                :required-message="
                  !$v.variation.name.required && $v.variation.name.$dirty
                "
              />
              <BaseTextField
                v-model.trim="$v.variation.product_code.$model"
                label="Kod"
                class="my-4"
                v-mask="'NNNNNNN'"
                required
                :required-message="
                  !$v.variation.product_code.required &&
                  $v.variation.product_code.$dirty
                "
              />
              <BaseTextField
                textarea
                required
                :required-message="
                  !$v.variation.description.required &&
                  $v.variation.description.$dirty
                "
                v-model.trim="$v.variation.description.$model"
                label="Tavsif"
                class="my-4"
              />
              <BaseSelect
                class="my-4 w-1/2"
                v-model="$v.variation.selectedCategories.$model"
                label="kategoriya"
                placeholder="Kategoriya qo'shing"
                multiple
                :options="categories"
                @select="value => selectCategories(value, variation.categories)"
                @remove="value => removeCategories(value, variation.categories)"
                required
                :required-message="
                  !$v.variation.selectedCategories.required &&
                  $v.variation.selectedCategories.$dirty
                "
              />
              <BaseTextField
                class="my-4"
                label="Son"
                v-model.trim="$v.variation.quantity.$model"
                :mask="priceMask"
                required
                :required-message="
                  !$v.variation.quantity.required &&
                  $v.variation.quantity.$dirty
                "
              />
              <BaseTextField
                label="Narx"
                v-model.trim="$v.variation.maskPrice.$model"
                :mask="priceMask"
                required
                :required-message="
                  !$v.variation.maskPrice.required &&
                  $v.variation.maskPrice.$dirty
                "
              />
              <BaseImageField
                class="my-4"
                label="Rasm"
                :image="variation.image"
                required
                @change="value => previewImage(value, variation, false)"
              />
              <BaseImageField
                class="my-4"
                multiple
                required
                label="galereya rasmlari"
                :images="variation.images"
                @change="value => previewImage(value, variation, true)"
                @remove-image="removeImage"
              />
              <div class="mb-10">
                <h2 class="font-bold text-xl my-4">Attributlar</h2>
                <AttributesTable
                  :attributes="variation.attributes"
                  :attribute="attribute"
                  :showAddNewKey="showAddNewKey"
                  @add-attribute="addAttribute"
                  @remove-attribute="removeAttribute"
                />
                <BaseButtonLink
                  class="mt-2"
                  buttonText="Qo'shish"
                  @button-click="showAddNewKey = true"
                />
              </div>
              <div class="text-red-400 text-sm" v-show="attributesMinLength">
                Atributlar kamida 2 ta bo'lishi kerak
              </div>
              <BaseButtonLink
                buttonText="Saqlash"
                @button-click="addVariation"
              />
            </div>
            <div>
              <h2 class="font-bold text-xl my-4">Qo'shilgan o'zgarishlar</h2>
              <BaseTable :headers="variationsTableHeaders">
                <template #body>
                  <tr
                    class="border"
                    v-for="(varProduct, index) in variations"
                    :key="index"
                  >
                    <td class="px-2 py-1 border">
                      <div class="flex items-center text-gray-500">
                        <input
                          type="text"
                          class="w-full text-sm py-2"
                          v-model="varProduct.name"
                        />
                      </div>
                    </td>
                    <td class="px-2 py-1 border">
                      <div class="flex items-center text-gray-500">
                        <input
                          type="text"
                          class="w-full text-sm py-2"
                          v-model="varProduct.product_code"
                        />
                      </div>
                    </td>
                    <td class="px-2 py-1 border">
                      <BaseSelect
                        v-model="varProduct.selectedCategories"
                        :options="categories"
                        placeholder="Kategoriya izlang yoki qo'shing"
                        multiple
                        taggable
                        required
                        @select="
                          value =>
                            selectCategories(value, varProduct.categories)
                        "
                        @remove="
                          value =>
                            removeCategories(value, varProduct.categories)
                        "
                      />
                    </td>
                    <td class="px-2 py-1 border">
                      <div class="flex items-center text-gray-500">
                        <input
                          type="text"
                          class="w-full text-sm py-2"
                          v-model="varProduct.maskPrice"
                          v-mask="priceMask"
                        />
                      </div>
                    </td>
                    <td class="px-2 py-1 border">
                      <input
                        type="text"
                        class="w-full text-sm py-2"
                        v-model="varProduct.quantity"
                        v-mask="priceMask"
                      />
                    </td>
                    <td class="px-2 py-1 border">
                      <div
                        class="flex items-center text-gray-500 justify-center"
                      >
                        <div
                          @click="
                            selectedVariationIndex = index;
                            showDeleteDialog = true;
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
                text="O'zgarishni o'chirishni xohlaysizmi"
                @delete="removeVariation"
                @close="showDeleteDialog = false"
              />
            </div>
          </tab>
        </tabs>
      </div>
      <BaseButtonLink
        buttonText="Mahsulot yaratish"
        @button-click="createAndLeave"
      />
      <BaseButtonLink
        buttonText="Mahsulot yaratish va yana qo'shish"
        @button-click="createAndAdd"
      />
    </div>
  </div>
</template>
<script>
import { required, minLength } from "vuelidate/lib/validators";
import priceMask from "~/mixins.js/priceMask.js";
export default {
  layout: "admin",
  data() {
    return {
      priceMask,
      variationsTableHeaders: [
        "nomi",
        "kodi",
        "kategoriyalari",
        "narxi",
        "soni",
        "buyruqlar"
      ],
      selectedBrand: null,
      selectedVariationIndex: null,
      selectedProductCategories: null,
      selectedVariationCategories: null,
      showDeleteDialog: false,
      showAddNewKey: false,
      createProductClicked: false,
      colors: [],
      brands: [],
      categories: [],
      product: {
        parent_id: 0,
        name: null,
        product_code: null,
        brand: null,
        categories: [],
        price: null,
        description: null,
        is_import: false,
        quantity: null,
        image: null,
        images: [],
        attributes: []
      },
      variations: [],
      variation: {
        parent_id: null,
        name: null,
        product_code: null,
        price: null,
        description: null,
        quantity: null,
        image: null,
        images: [],
        attributes: [],
        categories: [],
        //temporary vars
        selectedCategories: null,
        maskPrice: null
      },
      attribute: {
        is_main: false,
        key: null,
        label: null,
        value: null
      }
    };
  },
  computed: {
    imagesMinLength() {
      return !!(this.createProductClicked && this.product && this.product.images && this.product.images.length < 3);
    },
    imageRequired() {
      return !this.product.image && this.createProductClicked;
    },
    attributesMinLength() {
      return !!(
        this.createProductClicked && this.product.attributes.length < 2
      );
    }
  },
  watch: {
    product: {
      deep: true,
      handler() {
        this.variation.name = this.product.name;
        this.variation.product_code = this.product.product_code;
        this.variation.description = this.product.description;
        this.variation.quantity = this.product.quantity;
        this.variation.maskPrice = this.product.price;
      }
    },
    "product.categories": {
      handler() {
        this.variation.categories = Array.from(this.product.categories, x => x);
        this.variation.selectedCategories = Array.from(
          this.selectedProductCategories,
          x => x
        );
      }
    },
    "product.attributes": {
      handler() {
        this.variation.attributes = Array.from(this.product.attributes, x => x);
        this.variation.attributes.forEach((_, index) => {
          this.variation.attributes[index] = Object.assign(
            {},
            this.product.attributes[index]
          );
        });
      }
    }
  },
  validations: {
    selectedBrand: {
      required
    },
    selectedCategories: {
      required
    },
    selectedVariationCategories: {
      required
    },
    product: {
      name: {
        required
      },
      product_code: {
        required
      },
      price: {
        required
      },
      description: {
        required
      },
      brand: {
        required
      },
      quantity: {
        required
      },
      attributes: {
        required,
        minLength: minLength(2)
      },
      categories: {
        required
      }
    },
    variation: {
      name: {
        required
      },
      product_code: {
        required
      },
      quantity: {
        required
      },
      maskPrice: {
        required
      },
      description: {
        required
      },
      attributes: {
        required,
        minLength: minLength(2)
      },
      categories: {
        required
      },
      selectedCategories: {
        required
      }
    }
  },
  methods: {
    selectCategories(value, categories) {
      if (!categories.includes(value.id)) categories.push(value.id);
    },
    removeCategories(value, categories) {
      const foundIndex = categories.indexOf(value.id);
      if (foundIndex !== -1) categories.splice(foundIndex, 1);
    },
    selectBrand(value) {
      this.product.brand = value.id;
    },
    addAttribute(attributes) {
      attributes.push(this.attribute);
      this.attribute = {
        is_main: false,
        key: null,
        label: null,
        value: null
      };
      this.showAddNewKey = false;
    },
    removeAttribute(attributes, index) {
      attributes.splice(index, 1);
    },
    addVariation() {
      this.$v.variation.$touch();
      if (!this.$v.variation.$invalid) {
        let varProduct = Object.assign({}, this.variation);
        varProduct.categories = Array.from(this.variation.categories, x => x);
        varProduct.selectedCategories = Array.from(
          this.variation.selectedCategories,
          x => x
        );
        varProduct.images = Array.from(this.variation.images, x => x);
        varProduct.attributes = Array.from(this.variation.attributes, x => x);
        varProduct.attributes.forEach((_, index) => {
          varProduct.attributes[index] = Object.assign(
            {},
            this.variation.attributes[index]
          );
        });
        this.variations.push(varProduct);
      }
    },
    removeVariation() {
      this.variations.splice(this.selectedVariationIndex, 1);
      this.showDeleteDialog = false;
    },
    removeImage(index, images) {
      images.splice(index, 1);
    },
    previewImage(event, product, multiple) {
      let images = event.target.files;
      let count = images.length;
      let index = 0;
      if (count > 0) {
        while (count--) {
          var reader = new FileReader();
          reader.onload = e => {
            if (!multiple) product.image = e.target.result;
            else if (product.images.length < 5)
              product.images.push(e.target.result);
          };
          reader.readAsDataURL(images[index]);
          index++;
        }
      }
    },
    getBrands() {
      this.$axios
        .get("product/brand-list/", {
          params: {
            size: 1000
          }
        })
        .then(res => {
          this.brands = res.data.results;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCategories() {
      this.$axios
        .get("product/category-all/", {
          params: {
            size: 1000
          }
        })
        .then(res => {
          this.categories = res.data.results;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // async createProduct() {
    //   this.createProductClicked = true;
    //   this.$v.product.$touch();
    //   if (!this.$v.product.$invalid) {
    //     this.product.price = parseInt(this.product.price.replace(/\s/g, ""));
    //     this.product.variations = this.variations;
    //     if (this.product.variations.length > 0)
    //       for (let el of this.product.variations) {
    //         el.price = parseInt(el.maskPrice.toString().replace(/\s/g, ""));
    //         el.quantity = parseInt(el.quantity.toString().replace(/\s/g, ""));
    //         delete el.selectedCategories;
    //         delete el.maskPrice;
    //       }

    //     const response = await this.$axios.post(
    //       "product/create/",
    //       this.product
    //     );
    //     console.log("response", response);
    //     return response;
    //   }
    // },
    createAndLeave() {
      this.createProductClicked = true;
      this.$v.product.$touch();
      if (!this.$v.product.$invalid) {
        let loader = this.$loading.show();

        this.product.price = parseInt(this.product.price.replace(/\s/g, ""));
        this.product.variations = this.variations;
        if (this.product.variations.length > 0)
          for (let el of this.product.variations) {
            el.price = parseInt(el.maskPrice.toString().replace(/\s/g, ""));
            el.quantity = parseInt(el.quantity.toString().replace(/\s/g, ""));
            delete el.selectedCategories;
            delete el.maskPrice;
          }

        this.$axios
          .post("product/create/", this.product)
          .then(() => {
            this.$toast.success("Mahsulot yaratildi!");
            setTimeout(() => {
              this.$router.push("/admin/products");
            }, 500);
          })
          .catch(err => {
            this.$toast.error(
              err.response.data || "Mahsulot yaratishda xatolik yuz berdi"
            );
          })
          .finally(() => loader.hide());
      }
    },
    createAndAdd() {
      this.createProductClicked = true;
      this.$v.product.$touch();
      if (!this.$v.product.$invalid) {
        let loader = this.$loading.show();
        this.product.price = parseInt(this.product.price.replace(/\s/g, ""));
        this.product.variations = this.variations;
        if (this.product.variations.length > 0)
          for (let el of this.product.variations) {
            el.price = parseInt(el.maskPrice.toString().replace(/\s/g, ""));
            el.quantity = parseInt(el.quantity.toString().replace(/\s/g, ""));
            delete el.selectedCategories;
            delete el.maskPrice;
          }

        this.$axios
          .post("product/create/", this.product)
          .then(() => {
            this.$toast.success("Mahsulot yaratildi");
            this.variations = [];
            this.product = {};
            this.product.categories = [];
            this.product.attributes = [];
            this.product.variations = [];
            this.variation = {};
          })
          .catch(err => {
            this.$toast.error(
              err.response.data || "Mahsulot yaratishda xatolik yuz berdi"
            );
          })
          .finally(() => loader.hide());
      }
    }
  },
  mounted() {
    this.getCategories();
    this.getBrands();
  }
};
</script>
