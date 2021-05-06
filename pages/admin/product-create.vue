<template>
  <div>
    <div class="flex min-h-screen">
      <AdminSidebar />
      <div class="px-5 mx-auto w-4/5 bg-gray-100 pt-10">
        <div
          v-if="showSuccess"
          class="flex fixed z-40 top-0 py-2 w-9/12 bg-green-500 text-lg text-white text-center"
        >
          <svg viewBox="0 0 40 40" class="w-6 h-6 fill-current mx-5">
            <path
              d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z"
            ></path>
          </svg>
          <i>Yangi mahsulot yaratildi</i>

          <span
            class="absolute right-10 cursor-pointer"
            @click="showSuccess = false"
            >X</span
          >
        </div>
        <div
          v-if="showFail"
          class="flex fixed z-40 top-0 py-2 w-9/12 bg-red-500 text-lg text-white text-center"
        >
          <svg viewBox="0 0 40 40" class="w-6 h-6 fill-current mx-5">
            <path
              d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z"
            ></path>
          </svg>
          <i> Mahsulot yaratishda xatolik yuz berdi, qayta urinib ko'ring</i>
          <span
            class="absolute font-bold right-10 cursor-pointer"
            @click="showFail = false"
            >X</span
          >
        </div>
        <tabs :options="{ useUrlFragment: false }">
          <tab name="Asosiy ma'lumotlar">
            <h2 class="text-xl font-bold text-gray-700 mb-10">
              Asosiy ma'lumotlar {{ product }}
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
              <div class="text-red-400 text-sm" v-if="imageRequired">
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
              <div class="text-red-400 text-sm" v-if="imagesMinLength">
                Gallereya rasmlari kamida 3 ta bo'lishi kerak
              </div>
              <div class="my-4">
                <label
                  class="block font-bold text-gray-600 text-gray-600 uppercase text-sm mb-1"
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
                <div class="text-red-400 text-sm" v-if="attributesMinLength">
                  Atributlar kamida 2 ta bo'lishi kerak
                </div>
              </div>
              <BaseButtonLink
                buttonText="Mahsulot yaratish"
                @button-click="createProduct"
              />
            </div>
          </tab>
          <tab name="O'zgartirish" class="w-full text-lg">
            <h2 class="text-xl font-bold text-gray-700 mb-10">
              O'zgarishlar {{ variation.selectedCategories }}
              {{ variation.categories }}
            </h2>

            <div class="w-full">
              <div class="input-group block my-4">
                <label
                  for="input"
                  class="block font-bold text-gray-600 uppercase text-sm mb-1"
                  >Nom</label
                >
                <input
                  type="text"
                  class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
                  v-model.trim="$v.variation.name.$model"
                />
                <div
                  class="text-red-400 text-sm"
                  v-if="!$v.variation.name.required && $v.variation.name.$dirty"
                >
                  <i>{{ requiredMessage }}</i>
                </div>
              </div>
              <div class="input-group block my-4">
                <label
                  for="input"
                  class="block font-bold text-gray-600 uppercase text-sm mb-1"
                  >Kod</label
                >
                <input
                  type="text"
                  class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
                  v-model.trim="$v.variation.product_code.$model"
                />
                <div
                  class="text-red-400 text-sm"
                  v-if="
                    !$v.variation.product_code.required &&
                      $v.variation.product_code.$dirty
                  "
                >
                  <i>{{ requiredMessage }}</i>
                </div>
              </div>
              <div class="my-4">
                <label
                  class="block font-bold text-gray-600 text-gray-600 uppercase text-sm mb-1"
                  >tavsif</label
                >
                <textarea
                  class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
                  v-model.trim="$v.variation.description.$model"
                >
                </textarea>
                <div
                  class="text-red-400 text-sm"
                  v-if="
                    !$v.variation.description.required &&
                      $v.variation.description.$dirty
                  "
                >
                  <i>{{ requiredMessage }}</i>
                </div>
              </div>
              <div class="my-4">
                <label class="w-1/2 block font-bold uppercase text-sm mb-1"
                  >kategoriya</label
                >
                <multiselect
                  v-model="selectedVariationCategories"
                  placeholder="Kategoriya qo'shing"
                  label="name"
                  track-by="id"
                  :options="categories"
                  multiple
                  taggable
                  @select="selectVariationCategories"
                  @remove="removeVariationCategories"
                ></multiselect>
                <div
                  class="text-red-400 text-sm"
                  v-if="
                    !$v.selectedVariationCategories.required &&
                      $v.selectedVariationCategories.$dirty
                  "
                >
                  <i>{{ requiredMessage }}</i>
                </div>
              </div>

              <div class="my-4">
                <label
                  class="block font-bold text-gray-600 text-gray-600 uppercase text-sm mb-1"
                  >son</label
                >
                <input
                  type="string"
                  class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
                  v-model.trim="$v.variation.quantity.$model"
                  v-mask="priceMask"
                />
                <div
                  class="text-red-400 text-sm"
                  v-if="
                    !$v.variation.quantity.required &&
                      $v.variation.quantity.$dirty
                  "
                >
                  <i>{{ requiredMessage }}</i>
                </div>
              </div>
              <div class="my-4">
                <label
                  class="block font-bold text-gray-600 text-gray-600 uppercase text-sm mb-1"
                  >narx</label
                >
                <input
                  type="string"
                  class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
                  v-model.trim="$v.product.price.$model"
                />
                <div
                  class="text-red-400 text-sm"
                  v-if="!$v.product.price.required && $v.product.price.$dirty"
                >
                  <i>{{ requiredMessage }}</i>
                </div>
              </div>
              <div class="my-4">
                <label
                  class="block font-bold text-gray-600 text-gray-600 uppercase text-sm mb-1"
                  >asosiy rasm </label
                ><input
                  type="file"
                  accept="image/*"
                  @change="previewVariationImage"
                  class="w-1/2 border-2 rounded-md bg-white text-sm py-2 pl-5"
                  placeholder="cdsafd"
                />
                <div v-if="variation.image">
                  <div class="w-56 h-64 my-5 border shadow-md">
                    <img
                      :src="variation.image"
                      class="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
              <div class="my-4">
                <label
                  class="block font-bold text-gray-600 text-gray-600 uppercase text-sm mb-1"
                  >galereya rasmlari</label
                ><input
                  type="file"
                  accept="image/*"
                  multiple="multiple"
                  @change="previewVariationMultiImage"
                  class="w-1/2 border-2 rounded-md bg-white text-sm py-2 pl-5"
                />
                <div v-if="variation.images" class="flex flex-wrap">
                  <div
                    v-for="(item, index) in variation.images"
                    :key="index"
                    class="w-56 h-64 relative shadow-sm my-5 mr-2 flex flex-wrap"
                  >
                    <img
                      :src="item"
                      class="object-cover flex flex-wrap w-full m-2 h-full"
                    />
                    <span
                      @click="removeImage(index, variation.images)"
                      class="absolute top-4 right-4 bg-white w-5 h-5 flex items-center justify-center cursor-pointer rounded-full"
                      >X</span
                    >
                  </div>
                </div>
              </div>
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
              <div class="text-red-400 text-sm" v-if="attributesMinLength">
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
                          @click="removeVariation(index)"
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
            </div>
          </tab>
        </tabs>
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
      variationsTableHeaders: [
        "nomi",
        "kodi",
        "kategoriyalari",
        "narxi",
        "soni",
        "buyruqlar"
      ],
      selectedBrand: null,
      selectedProductCategories: null,
      selectedVariationCategories: null,
      showSuccess: false,
      showError: false,
      alertText: "",
      showDeleteDialog: false,
      showAddNewKey: false,
      showAddNewVariation: false,
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
        attributes: [],
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
      return this.createProductClicked && this.product.images.length < 3
        ? true
        : false;
    },
    imageRequired() {
      return !this.product.image && this.createProductClicked ? true : false;
    },
    attributesMinLength() {
      return this.createProductClicked && this.product.attributes.length < 2
        ? true
        : false;
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
        if (this.selectedProductCategories)
          this.selectedVariationCategories = Array.from(
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
    },
    "variation.categories": {
      handler() {
        this.variation.selectedCategories = Array.from(
          this.categories
            .filter((el, index) => el.id === this.variation.categories[index])
            .map(el => el),
          x => x
        );
      }
    },
    showError(newVal) {
      if (newVal == true) {
        setTimeout(() => {
          this.showError = false;
        }, 3000);
      }
    },
    showSuccess(newVal) {
      if (newVal == true) {
        setTimeout(() => {
          this.showSuccess = false;
        }, 3000);
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
      }
    }
  },
  methods: {
    selectCategories(value, categories) {
      categories.push(value.id);
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
      this.attribute = {};
      this.showAddNewKey = false;
    },
    removeAttribute(attributes, index) {
      attributes.splice(index, 1);
    },
    addVariation() {
      this.$v.variation.$touch();
      if (!this.$v.variation.$invalid) {
        this.variations.push(this.variation);
        console.log(this.variations);
        this.showAddNewVariation = false;
      }
    },
    removeVariation(index) {
      this.product.variations.splice(index, 1);
    },
    addImage(product) {
      product.images.push(image);
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
        .get("product/brand-list/")
        .then(res => {
          this.brands = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCategories() {
      this.$axios
        .get("product/category-list/")
        .then(res => {
          this.categories = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    createProduct() {
      this.createProductClicked = true;
      this.$v.product.$touch();
      if (!this.$v.product.$invalid) {
        this.product.price = parseInt(this.product.price.replace(/\s/g, ""));
        this.product.variations = this.variations;
        if (this.product.variations.length > 0)
          for (let el of this.product.variations) {
            el.price = parseInt(el.maskPrice.toString().replace(/\s/g, ""));
            el.quantity = parseInt(el.quantity.toString().replace(/\s/g, ""));
            delete el.selectedCategories;
            delete el.maskPrice;
          }
        this.product.variations = [];
        let loader = this.$loading.show();
        this.$axios
          .post("product/create/", this.product)
          .then(res => {
            console.log(res);
            this.showSuccess = true;
            this.alertText = "Mahsulot yaratildi";
            this.productVariation = {};
          })
          .catch(err => {
            this.showError = true;
            this.alertText =
              "Mahsulot yaratishda xatolik yuz berdi, qayta urinib ko'ring";
            console.log(err);
          })
          .finally(() => {
            loader.hide();
          });
      }
      this.createProductClicked = false;
    }
  },
  mounted() {
    this.getCategories();
    this.getBrands();
  }
};
</script>
<style scoped></style>
