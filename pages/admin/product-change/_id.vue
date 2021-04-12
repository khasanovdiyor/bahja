<template>
  <div>
    <div class="flex">
      <AdminSidebar class="w-1/3" />
      <div class="px-5 mx-auto w-4/5 pt-10 bg-gray-100">
        <div
          v-if="showSuccess"
          class="fixed z-40 top-0 px-4 py-2 w-2/3 text-lg bg-green-400 text-white text-center"
        >
          <i> Mahsulot yangilandi</i>

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
          <i> Mahsulot yangilashda xatolik yuz berdi, qayta urinib ko'ring</i>

          <!-- <span
            class="absolute right-6 cursor-pointer"
            @click="showFail = false"
            >X</span
          > -->
        </div>
        <div
          class="fixed z-40 top-0 px-4 py-2 w-2/3 bg-red-400 text-white text-center"
          v-if="attributeError"
        >
          Kamida 2 ta attribute qolishi kerak
        </div>
        <div name="Mahsulot qo'shish">
          <h2 class="text-xl font-bold uppercase">Mahsulot o'zgartirish</h2>

          <div>
            <div class="input-group block my-4">
              <label for="input" class="block font-bold uppercase text-sm mb-2"
                >Mahsulot nomi</label
              >
              <input
                type="text"
                class="border-2 text-sm w-1/2 py-2 pl-5"
                v-model.trim="$v.newProduct.name.$model"
              />
              <div
                class="text-red-400"
                v-if="!$v.newProduct.name.required && $v.newProduct.name.$dirty"
              >
                {{ requiredMessage }}
              </div>
            </div>
            <div class="input-group block my-4">
              <label for="input" class="block font-bold uppercase text-sm mb-2"
                >Mahsulot kodi</label
              >
              <input
                type="text"
                class="border-2 text-sm w-1/2 py-2 pl-5"
                v-model.trim="$v.newProduct.product_code.$model"
              />
              <div
                class="text-red-400"
                v-if="
                  !$v.newProduct.product_code.required &&
                  $v.newProduct.product_code.$dirty
                "
              >
                {{ requiredMessage }}
              </div>
            </div>
            <div class="my-4">
              <label class="block font-bold uppercase text-sm mb-2"
                >tavsif</label
              >
              <textarea
                class="w-1/2 border-2 text-sm py-2 pl-5"
                v-model.trim="$v.newProduct.description.$model"
              >
              </textarea>
              <div
                class="text-red-400"
                v-if="
                  !$v.newProduct.description.required &&
                  $v.newProduct.description.$dirty
                "
              >
                {{ requiredMessage }}
              </div>
            </div>
            <div class="my-4">
              <label class="w-1/2 block font-bold uppercase text-sm mb-2"
                >kategoriyasi {{ newCategories }}</label
              >
              <multiselect
                v-model="$v.productCategories.$model"
                tag-placeholder="Ushbu kategoriayni qo'shing"
                placeholder="Kategoriya izlang yoki qo'shing"
                label="name"
                track-by="id"
                :options="categories"
                :multiple="true"
                @tag="addTag"
                @select="addCategory"
                @remove="removeCategory"
              ></multiselect>
              <div
                class="text-red-400"
                v-if="
                  !$v.productCategories.required && $v.productCategories.$dirty
                "
              >
                {{ requiredMessage }}
              </div>
            </div>
            <div class="my-4">
              <label class="block font-bold uppercase text-sm mb-2">soni</label>
              <input
                type="string"
                class="w-1/2 border-2 text-sm py-2 pl-5"
                v-model="$v.newProduct.quantity.$model"
              />
              <div
                class="text-red-400"
                v-if="
                  !$v.newProduct.quantity.required &&
                  $v.newProduct.quantity.$dirty
                "
              >
                {{ requiredMessage }}
              </div>
            </div>
            <div class="my-4">
              <label class="block font-bold uppercase text-sm mb-2"
                >narxi</label
              >
              <input
                type="text"
                class="w-1/2 border-2 text-sm py-2 pl-5"
                v-model="$v.newProduct.price.$model"
                v-mask="priceMask"
              />
              <div
                class="text-red-400"
                v-if="
                  !$v.newProduct.price.required && $v.newProduct.price.$dirty
                "
              >
                {{ requiredMessage }}
              </div>
            </div>
            <div class="my-4">
              <label class="block font-bold uppercase text-sm mb-2"
                >rasm qo'yish</label
              ><input
                type="file"
                accept="image/*"
                @change="previewProductImage"
                class="w-1/2 border-2 text-sm py-2 pl-5"
              />
              <div v-if="image">
                <div>
                  <div class="w-56 h-56">
                    <img
                      :src="image"
                      class="object-cover object-top w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="my-4">
              <label class="block font-bold uppercase text-sm mb-2"
                >galereya rasmlarini qo'shish</label
              ><input
                type="file"
                accept="image/*"
                multiple="multiple"
                @change="previewProductMultiImage"
                class="w-1/2 border-2 text-sm py-2 pl-5"
              />
              <div v-if="newImages" class="flex">
                <div
                  v-for="(item, index) in newImages"
                  :key="index"
                  class="w-56 h-56 mr-4 relative"
                >
                  <img
                    :src="item"
                    class="object-cover object-top w-full h-full"
                  />
                  <span
                    @click="removeImage(index)"
                    class="absolute top-4 right-4 bg-white w-6 h-6 flex items-center justify-center cursor-pointer rounded-full"
                    >X</span
                  >
                </div>
              </div>
              <!-- <img src="../assets/images/link.svg" class="w-5 inline-block" /> -->
            </div>
            <div class="mb-10">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-200">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                    >
                      is main
                    </th>

                    <th
                      scope="col"
                      class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                    >
                      key
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                    >
                      label
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                    >
                      value
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                    >
                      o'chirish
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white">
                  <tr
                    class="border"
                    v-for="(attr, index) in newAttributes"
                    :key="index"
                  >
                    <td class="px-6 py-1 border">
                      <div class="flex items-center text-gray-500">
                        <input
                          type="checkbox"
                          class="border w-full text-sm w-5 h-5 pl-5"
                          v-model="attr.is_main"
                        />
                      </div>
                    </td>

                    <td class="px-6 py-1 border">
                      <div class="flex items-center text-gray-500">
                        {{ attr.key }}
                      </div>
                    </td>
                    <td class="px-6 py-1 border">
                      <div class="flex items-center text-gray-500">
                        <input
                          type="text"
                          class="w-full border-2 text-sm py-2 pl-5"
                          v-model="attr.label"
                        />
                      </div>
                    </td>
                    <td class="px-6 py-1 border">
                      <div class="flex items-center text-gray-500">
                        <input
                          type="text"
                          class="w-full border-2 text-sm py-2 pl-5"
                          v-model="attr.value"
                        />
                      </div>
                    </td>
                    <td class="px-2 py-1 border">
                      <div
                        class="flex items-center text-gray-500 justify-center"
                      >
                        <div
                          @click="removeAttribute(product, index)"
                          class="cursor-pointer"
                        >
                          <img
                            src="~/assets/images/delete.svg"
                            alt=""
                            class="w-6"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="border" v-if="showAddNewKey">
                    <td class="px-6 py-1 border">
                      <div class="flex items-center text-gray-500">
                        <input
                          type="checkbox"
                          class="border w-full text-sm w-5 h-5 pl-5"
                          v-model="attribute.is_main"
                        />
                      </div>
                    </td>

                    <td class="px-6 py-1 border">
                      <div class="flex items-center text-gray-500">
                        <input
                          type="text"
                          class="w-full border-2 text-sm py-2 pl-5"
                          v-model="attribute.key"
                        />
                      </div>
                    </td>
                    <td class="px-6 py-1 border">
                      <div class="flex items-center text-gray-500">
                        <input
                          type="text"
                          class="w-full border-2 text-sm py-2 pl-5"
                          v-model="attribute.label"
                        />
                      </div>
                    </td>
                    <td class="px-6 py-1 border">
                      <div class="flex items-center text-gray-500">
                        <input
                          type="text"
                          class="w-full border-2 text-sm py-2 pl-5"
                          v-model="attribute.value"
                        />
                      </div>
                    </td>
                    <td class="px-6 py-1 border">
                      <div
                        class="flex items-center text-gray-500 justify-center"
                      >
                        <div
                          @click="addProductAttribute"
                          class="cursor-pointer hover:underline"
                        >
                          Qo'shish
                        </div>
                      </div>
                    </td>
                    <div
                      class="fixed z-40 top-0 bottom-0 right-0 left-0 bg-gray-600 opacity-50 flex items-center justify-center"
                      v-if="showDeleteDialog"
                    >
                      <div class="w-1/3 bg-white py-4 px-10">
                        <span class="font-bold text-xl block mb-6"
                          >Ushbu Kategoriyani o'chirishni xohlaysizmi?</span
                        >
                        <div class="flex justify-between">
                          <button
                            @click="deleteCategory(selectedCategoryID)"
                            class="bg-red-600 text-white py-2 px-4"
                          >
                            Ha
                          </button>
                          <button
                            @click="showDeleteDialog = false"
                            class="bg-gray-600 text-white py-2 px-4"
                          >
                            Yo'q
                          </button>
                        </div>
                      </div>
                    </div>
                  </tr>
                </tbody>
              </table>
              <div
                @click="showAddNewKey = true"
                class="cursor-pointer ml-auto my-2 inline-block text-2xl bg-gray-800 text-white px-2"
              >
                +
              </div>
            </div>

            <button
              @click="sendAll"
              class="bg-gray-800 text-white my-4 py-2 px-4"
            >
              Ma'lumotlarni yangilash
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AdminSidebar from "~/components/admin/AdminSidebar.vue";
import { required, minLength } from "vuelidate/lib/validators";
import priceMask from "~/mixins.js/priceMask.js";
export default {
  components: {
    AdminSidebar
  },
  data() {
    return {
      priceMask: priceMask,
      requiredMessage: "To'ldirish shart",
      newImage: null,
      attributeError: false,
      showSuccess: false,
      showFail: false,
      showProductForm: false,
      showAddNewKey: false,
      showDeleteDialog: false,
      selectedProduct: {},
      newCategories: [],
      productCategories: [],
      image: null,
      newImages: [],
      images: [],
      deletedImages: [],
      newProduct: {
        name: null,
        product_code: null,
        description: null,
        price: null,
        quantity: null,
      },
      categories: [],
      brands: [],
      product: {},
      attribute: {
        is_main: false,
        key: null,
        label: null,
        value: null,
        id: 0
      },
      newAttributes: []
    };
  },
  //vuelidate validations
  validations: {
    productCategories: {
      required,
    },
    newProduct: {
      name: {
        required,
      },
      product_code: {
        required,
      },
      attributes: {
        required,
        minLength: minLength(2),
      },
      description: {
        required,
      },
      price: {
        required,
      },
      quantity: {
        required,
      },
    },
  },
  methods: {
    addCategory(value, id) {
      this.newCategories.push(value.id);
    },
    removeCategory(value, id) {
      console.log("value.id", value.id);
      this.newCategories = this.newCategories.filter(
        category => category !== value.id
      );
    },
    addProductAttribute() {
      this.newAttributes.push(this.attribute);
      this.attribute = {};
      this.showAddNewKey = false;
    },
    removeAttribute(product, index) {
      if (this.newAttributes.length > 2) this.newAttributes.splice(index, 1);
      else this.attributeError = true;
      setTimeout(() => {
        this.attributeError = false;
      }, 2000);
    },
    addTag(newTag) {
      this.selectedCategories.push(newTag);
    },
    removeImage(index) {
      this.deletedImages.push(this.newImages[index]);
      console.log(this.preview_list);
      this.newImages.splice(index, 1);
    },
    previewProductImage(event) {
      var input = event.target;
      this.newProduct.image = input.files[0];
      if (input.files) {
        var reader = new FileReader();
        reader.onload = e => {
          this.product.image = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
      this.newImage = input.files[0];
    },
    previewProductMultiImage(event) {
      var input = event.target;
      var count = input.files.length;
      var index = 0;
      if (input.files) {
        while (count--) {
          var reader = new FileReader();
          reader.onload = (e) => {
            if (this.newImages.length < 5) {
              this.newImages.push(e.target.result);
              this.images.push(e.target.result);
            }
          };
          reader.readAsDataURL(input.files[index]);
          index++;
        }
      }
      console.log("this.product:", this.product);
    },
    updateProduct() {
      this.newProduct.price = parseInt(
        this.newProduct.price.replace(/\s/g, "")
      );
      const formData = new FormData();
      formData.append("name", this.newProduct.name);
      formData.append("description", this.newProduct.description);
      formData.append("product_code", this.newProduct.product_code);
      formData.append("price", this.newProduct.price);
      formData.append("quantity", this.newProduct.quantity);
      if (this.newImage) {
        formData.append("image", this.newImage);
      }
      this.$axios
        .patch(`product/update/${this.$route.params.id}`, this.newProduct)
        .then(res => {
          console.log(res);
          this.showSuccess = true;
          setTimeout(() => {
            this.showSuccess = false;
          }, 3000);
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateCategory() {
      let category = {
        product: this.$route.params.id,
        categories: this.newCategories
      };
      this.$axios
        .post("product/update-category/", category)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateImages() {
      let images = {
        product: this.$route.params.id,
        images: this.images,
        deleted_images: this.deletedImages
      };
      this.$axios
        .post("product/update-images/", images)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateAttributes() {
      let attributes = {
        product: parseInt(this.$route.params.id),
        attributes: this.newAttributes
      };
      this.$axios
        .post("product/update-attributes/", attributes)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    sendAll() {
      let loader = this.$loading.show();

      this.updateProduct();
      this.updateCategory();
      this.updateImages();
      this.updateAttributes();
      this.getProduct();
      this.getCategories();

      loader.hide();
    },
    getProduct() {
      this.$axios
        .get(`product/detail/${this.$route.params.id}`)
        .then(res => {
          this.image = res.data.image;
          let i = 0;
          let size = 0;
          for (const key1 in res.data.attributes) {
            let attribute = {};
            size++;
            attribute.key = Object.keys(res.data.attributes)[i];
            i++;
            for (const key2 in res.data.attributes[key1]) {
              attribute[key2] = res.data.attributes[key1][key2];
            }
            if (this.newAttributes.length < size) {
              this.newAttributes.push(attribute);
            }
          }
          this.productCategories = res.data.categories;
          let categories = [];
          res.data.categories.forEach(category => {
            categories.push(category.id);
            console.log("categories", categories);
          });
          this.newCategories = categories;
          this.newImages = res.data.images;
          this.newProduct.name = res.data.name;
          this.newProduct.description = res.data.description;
          this.newProduct.price = res.data.price;
          this.newProduct.quantity = res.data.quantity;
          this.newProduct.product_code = res.data.product_code;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getProduct();
    this.getCategories();
  }
};
</script>
