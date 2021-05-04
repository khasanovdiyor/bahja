<template>
  <div>
    <div>
      <div>
        <div
          v-if="showSuccess"
          class="fixed z-40 top-0 px-4 py-2 w-2/3 bg-green-400 text-lg text-white text-center"
        >
          <i>Mahsulot yaratildi</i>
        </div>
        <div
          v-if="showFail"
          class="fixed z-40 top-0 px-4 py-2 w-2/3 bg-red-400 text-lg text-white text-center"
        >
          <i> Mahsulot yaratishda xatolik yuz berdi, qayta urinib ko'ring</i>
        </div>
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
                :required="!$v.product.name.required && $v.product.name.$dirty"
              />
              <BaseTextField
                class="my-4"
                v-model.trim="$v.product.product_code.$model"
                label="Kod"
                :required="
                  !$v.product.product_code.required &&
                  $v.product.product_code.$dirty
                "
              />
              <BaseSelect
                class="my-4"
                v-model.trim="$v.selectedBrand.$model"
                label="Brend"
                :options="brands"
                @select="selectBrand"
                placeholder="Brend tanlang"
                :required="
                  !$v.selectedBrand.required && $v.selectedBrand.$dirty
                "
              />
              <BaseTextField
                class="my-4"
                v-model.trim="$v.product.description.$model"
                label="Tavsif"
                textarea
                :required="
                  !$v.product.description.required &&
                  $v.product.description.$dirty
                "
              />
              <BaseSelect
                class="my-4"
                v-model="selectedProductCategories"
                label="Kategoriya"
                :options="categories"
                placeholder="Kategoriya tanlang"
                noResult="Bunday kategoriya topilmadi"
                multiple
                taggable
                @select="selectProductCategories"
                @remove="removeProductCategories"
                :required="
                  !$v.selectedCategories.required &&
                  $v.selectedCategories.$dirty
                "
              />
              <BaseTextField
                v-model.trim="$v.product.quantity.$model"
                label="Son"
                :required="
                  !$v.product.quantity.required && $v.product.quantity.$dirty
                "
              />
              <div class="my-4">
                <label
                  class="block font-bold text-gray-600 text-gray-600 uppercase text-sm mb-1"
                  >son</label
                >
                <input
                  type="text"
                  class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
                  v-model="$v.product.quantity.$model"
                  v-mask="priceMask"
                />
                <div
                  class="text-red-400 text-sm"
                  v-if="
                    !$v.product.quantity.required && $v.product.quantity.$dirty
                  "
                >
                  <i>{{ requiredMessage }}</i>
                </div>
              </div>
              <div class="my-4">
                <label
                  class="block font-bold relative text-gray-600 text-gray-600 uppercase text-sm mb-1"
                  >narx
                  <p class="inline-block text-xs absolute text-red-500">
                    &#10043;
                  </p>
                </label>
                <input
                  type="string"
                  placeholder=""
                  class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
                  v-model.trim="$v.product.price.$model"
                  v-mask="priceMask"
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
                  >Asosiy rasm</label
                ><input
                  type="file"
                  accept="image/*"
                  @change="previewProductImage"
                  class="border-2 rounded-md text-sm bg-white w-1/2 py-1 pl-5"
                />
                <div
                  class="text-red-400 text-sm"
                  v-if="!$v.product.image.required && $v.product.image.$dirty"
                >
                  <i>{{ requiredMessage }}</i>
                </div>
                <div v-if="product.image">
                  <div>
                    <div class="w-56 h-64 border shadow-sm my-5">
                      <img
                        :src="product.image"
                        class="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="my-4">
                <div>
                  <label
                    class="block font-bold text-gray-600 text-gray-600 uppercase text-sm mb-1"
                    >galereya rasmlari</label
                  ><input
                    type="file"
                    accept="image/*"
                    multiple="multiple"
                    @change="previewProductMultiImage"
                    class="border-2 rounded-md text-sm bg-white w-1/2 py-1 pl-5"
                  />
                  <div
                    class="text-red-400 text-sm"
                    v-if="
                      !$v.product.images.required && $v.product.images.$dirty
                    "
                  >
                    <i>{{ requiredMessage }}</i>
                  </div>
                </div>
                <div v-if="product.images" class="flex">
                  <div
                    v-for="(item, index) in product.images"
                    :key="index"
                    class="w-56 h-64 relative shadow-sm my-5 mr-2"
                  >
                    <img :src="item" class="object-cover w-full m-2 h-full" />
                    <span
                      @click="removeImage(index, product.images)"
                      class="absolute top-4 right-4 bg-white w-5 h-5 flex items-center justify-center cursor-pointer rounded-full"
                      >X</span
                    >
                  </div>
                </div>
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
              </div>
              <BaseButtonLink
                buttonText="Mahsulot yaratish"
                @button-click="createProduct"
              />
            </div>
          </tab>
          <tab name="O'zgartirish" class="w-full text-lg">
            <h2 class="text-xl font-bold text-gray-700 mb-10">O'zgartirish</h2>

            <div class="w-full">
              <BaseTextField
                v-model="$v.variation.name.$model"
                label="nom"
                class="my-4"
                :required="
                  !$v.variation.name.required && $v.variation.name.$dirty
                "
              />
              <BaseTextField
                v-model="$v.variation.product_code.$model"
                label="Kod"
                class="my-4"
                :required="
                  !$v.variation.product_code.required &&
                  $v.variation.product_code.$dirty
                "
              />
              <BaseTextField
                textarea
                :required="
                  !$v.variation.description.required &&
                  $v.variation.description.$dirty
                "
                v-model="$v.variation.description.$model"
                label="Tavsif"
                class="my-4"
              />
              <BaseSelect
                class="my-4"
                v-model="selectedVariationCategories"
                label="kategoriya"
                placeholder="Kategoriya qo'shing"
                multiple
                :options="categories"
                @select="selectVariationCategories"
                @remove="removeVariationCategories"
                :required="
                  $v.variation.categories && $v.variation.categories.$dirty
                "
              />
              <BaseTextField
                class="my-4"
                label="Son"
                v-model.trim="$v.variation.quantity.$model"
                :required="
                  !$v.variation.quantity.required &&
                  $v.variation.quantity.$dirty
                "
              />
              <BaseTextField
                label="Narx"
                v-model.trim="$v.product.price.$model"
                :required="
                  !$v.product.price.required && $v.product.price.$dirty
                "
              />
              <BaseImageField
                label="galereya rasmlari"
                :image="variation.image"
                @change="previewVariationImage($event)"
              />
              <BaseImageField
                multiple
                label="galereya rasmlari"
                :images="variation.images"
                @change="previewVariationMultiImage($event)"
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
              <div
                class="text-red-400 text-sm"
                v-if="!$v.variation.attributes.minLength"
              >
                Atributlar kamida
                {{ $v.variation.attributes.$params.minLength.min }} ta bo'lishi
                kerak
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
                    v-for="(varProduct, index) in product.variations"
                    :key="index"
                  >
                    <td class="px-2 py-1 border">
                      <div class="flex items-center text-gray-500">
                        <input
                          type="text"
                          class="w-full border-2 text-sm py-2"
                          v-model="varProduct.name"
                        />
                      </div>
                    </td>
                    <td class="px-2 py-1 border">
                      <div class="flex items-center text-gray-500">
                        <input
                          type="text"
                          class="w-full border-2 text-sm py-2"
                          v-model="varProduct.product_code"
                        />
                      </div>
                    </td>
                    <td class="px-2 py-1 border">
                      <div class="flex items-center text-gray-500">
                        <multiselect
                          v-model="varProduct.categories"
                          tag-placeholder="Ushbu kategoriyani qo'shing"
                          placeholder="Kategoriya izlang yoki qo'shing"
                          label="name"
                          track-by="id"
                          :options="categories"
                          multiple
                        ></multiselect>
                      </div>
                    </td>
                    <td class="px-2 py-1 border">
                      <div class="flex items-center text-gray-500">
                        <input
                          type="text"
                          class="w-full border-2 text-sm py-2"
                          v-model="varProduct.price"
                        />
                      </div>
                    </td>
                    <td class="px-2 py-1 border">
                      <input
                        type="text"
                        class="w-full border-2 text-sm py-2"
                        v-model="varProduct.quantity"
                      />
                    </td>
                    <td class="px-2 py-1 border">
                      <div
                        class="flex items-center text-gray-500 justify-between"
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
      ],
      requiredMessage: "To'ldirish shart",
      selectedBrand: null,
      selectedProductCategories: null,
      selectedVariationCategories: null,
      previewProduct: null,
      previewVariation: null,
      image: null,
      preview_list: [],
      image_list: [],
      showSuccess: false,
      showFail: false,
      showDeleteDialog: false,
      showVariationForm: false,
      showProductForm: false,
      showAddNewKey: false,
      showAddNewVariation: false,
      colors: [],
      brands: [],
      categories: [],
      isVariationEmpty: false,
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
        variations: [],
      },
      variation: {
        parent_id: 0,
        name: null,
        product_code: null,
        price: 0,
        description: null,
        quantity: null,
        image: null,
        images: [],
        attributes: [],
        categories: [],
      },
      attribute: {
        is_main: false,
        key: null,
        label: null,
        value: null,
      },
    };
  },
  watch: {
    product: {
      deep: true,
      handler() {
        this.variation = Object.assign({}, this.product);
        this.variation.categories = Array.from(this.product.categories, x => x);
        this.variation.attributes = Array.from(this.product.attributes, x => x);
        this.variation.attributes.forEach((_, index) => {
          this.variation.attributes[index] = Object.assign(
            {},
            this.product.attributes[index]
          );
        });
        this.variation.images = Array.from(this.product.images, x => x);
        this.variation.images = [];
        delete this.variation.variations;
        delete this.variation.is_import;
        delete this.variation.brand;
      },
    },
    showFail(newVal) {
      if (newVal == true) {
        setTimeout(() => {
          this.showFail = false;
        }, 3000);
      }
    },
    showSuccess(newVal) {
      if (newVal == true) {
        setTimeout(() => {
          this.showSuccess = false;
        }, 3000);
      }
    },
  },
  validations: {
    selectedBrand: {
      required,
    },
    selectedCategories: {
      required,
    },
    selectedVariationCategories: {
      required,
    },
    product: {
      name: {
        required,
      },
      product_code: {
        required,
      },
      price: {
        required,
      },
      description: {
        required,
      },
      brand: {
        required,
      },
      quantity: {
        required,
      },
      image: {
        required,
      },
      images: {
        required,
      },
      attributes: {
        required,
        minLength: minLength(2),
      },
      categories: {
        required,
      },
    },
    variation: {
      name: {
        required,
      },
      product_code: {
        required,
      },
      quantity: {
        required,
      },
      price: {
        required,
      },
      description: {
        required,
      },
      attributes: {
        required,
        minLength: minLength(2),
      },
      categories: {
        required,
      },
    },
  },
  methods: {
    selectProductCategories(value) {
      this.product.categories.push(value.id);
    },
    selectVariationCategories(value) {
      this.variation.categories.push(value.id);
    },
    removeProductCategories(value) {
      const foundIndex = this.product.categories.indexOf(value.id);
      if (foundIndex !== -1) this.product.categories.splice(foundIndex, 1);
    },
    removeVariationCategories(value) {
      const foundIndex = this.variation.categories.indexOf(value.id);
      if (foundIndex !== -1) this.variation.categories.splice(foundIndex, 1);
    },
    selectBrand(value) {
      this.product.brand = value.id;
    },
    addAttribute(attributes) {
      attributes.push(this.attribute);
      this.attribute = {};
      this.showAddNewKey = false;
    },
    removeAttribute(product, index) {
      product.attributes.splice(index, 1);
    },
    addVariation() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.product.variations.push(this.variation);
        this.variation = {
          attributes: [],
        };
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
    previewProductImage(event) {
      var input = event.target;
      if (input.files[0]) {
        var reader = new FileReader();
        reader.onload = e => {
          this.product.image = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    previewVariationImage(event) {
      var input = event.target;
      if (input.files[0]) {
        var reader = new FileReader();
        reader.onload = e => {
          this.variation.image = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    previewProductMultiImage(event) {
      var input = event.target;
      var count = input.files.length;
      var index = 0;
      if (input.files.length > 0) {
        while (count--) {
          var reader = new FileReader();
          reader.onload = e => {
            if (this.product.images.length < 5)
              this.product.images.push(e.target.result);
          };
          reader.readAsDataURL(input.files[index]);
          index++;
        }
      }
      console.log("this.product:", this.product);
    },
    previewVariationMultiImage(event) {
      var input = event.target;
      var count = input.files.length;
      var index = 0;
      if (input.files.length > 0) {
        while (count--) {
          var reader = new FileReader();
          reader.onload = e => {
            if (this.variation.images.length < 5)
              this.variation.images.push(e.target.result);
          };
          reader.readAsDataURL(input.files[index]);
          index++;
        }
      }
      console.log("this.product:", this.product);
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
      if (this.product.variations.length === 0) {
        this.isVariationEmpty = true;
      }

      if (this.isVariationEmpty && !this.$v.product.$invalid) {
        let loader = this.$loading.show();
        this.$axios
          .post("product/create/", this.product)
          .then(res => {
            console.log(res);
            this.showSuccess = true;
            this.productVariation = {};
            this.image_list = [];
            this.preview_list = [];
            this.image = null;
            this.preview = null;
            loader.hide();
          })
          .catch(err => {
            loader.hide();
            this.showFail = true;
            console.log(err);
          });
      }
    },
  },
  mounted() {
    this.getCategories();
    this.getBrands();
  },
};
</script>
<style scoped></style>
