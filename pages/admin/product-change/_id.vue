<template>
  <div>
    <div>
      <div>
        <div name="Mahsulot qo'shish">
          <h2 class="text-xl font-bold text-gray-700">O'zgartirish</h2>
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
              v-model="$v.product.categories.$model"
              label="Kategoriya"
              :options="categories"
              placeholder="Kategoriya tanlang"
              noResult="Bunday kategoriya topilmadi"
              multiple
              taggable
              @select="value => selectCategories(value, newCategories)"
              @remove="value => removeCategories(value, newCategories)"
              required
              :required-message="
                !$v.product.categories.required && $v.product.categories.$dirty
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
            <div class="mb-10">
              <AttributesTable
                v-if="product.attributes"
                :attributes="newAttributes"
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
              buttonText="Ma'lumotlarni yangilash"
              @button-click="sendAll"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import priceMask from "~/mixins.js/priceMask.js";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      priceMask,
      selectedProductCategories: null,
      showSuccessProd: false,
      showErrorProd: false,
      showSuccessAttr: false,
      showErrorAttr: false,
      showSuccessCat: false,
      showErrorCat: false,
      showSuccessImages: false,
      showErrorImages: false,
      alertTextProd: "",
      alertTextAttr: "",
      alertTextImages: "",
      alertTextCat: "",
      showAddNewKey: false,
      showDeleteDialog: false,
      newCategories: [],
      newImage: null,
      newImages: [],
      images: [],
      deletedImages: [],
      product: {},
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
  validations: {
    selectedProductCategories: {
      required
    },
    newAttributes: {
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
      categories: {
        required
      }
    }
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
  methods: {
    addAttribute(attributes) {
      attributes.push(this.attribute);
      this.attribute = {};
      this.showAddNewKey = false;
    },
    selectCategories(value, categories) {
      categories.push(value.id);
    },
    removeCategories(value, categories) {
      const foundIndex = categories.indexOf(value.id);
      if (foundIndex !== -1) categories.splice(foundIndex, 1);
    },
    addProductAttribute() {
      this.newAttributes.push(this.attribute);
      this.attribute = {};
      this.showAddNewKey = false;
    },
    removeAttribute(attributes, index) {
      attributes.splice(index, 1);
    },
    removeImage(index, images) {
      if (!images[index].includes("data:image/"))
        this.deletedImages.push(images[index]);
      images.splice(index, 1);
    },
    previewImage(event, product, multiple) {
      let images = event.target.files;
      let count = images.length;
      if (multiple === false) this.newImage = images[0];
      let index = 0;
      if (count > 0) {
        while (count--) {
          var reader = new FileReader();
          reader.onload = e => {
            if (!multiple) product.image = e.target.result;
            else if (product.images.length < 5) {
              product.images.push(e.target.result);
              this.newImages.push(e.target.result);
            }
          };
          reader.readAsDataURL(images[index]);
          index++;
        }
      }
    },
    async updateProduct() {
      const formData = new FormData();
      formData.append("name", this.product.name);
      formData.append("description", this.product.description);
      formData.append("product_code", this.product.product_code);
      formData.append("price", this.product.price.replace(/\s/g, ""));
      formData.append("quantity", this.product.quantity);
      formData.append("image", this.newImage);
      const response = await this.$axios.patch(
        `product/update/${this.$route.params.id}`,
        formData
      );
      return response;
    },
    async updateCategory() {
      let category = {
        product: this.$route.params.id,
        categories: this.newCategories
      };
      const response = await this.$axios.post(
        "product/update-category/",
        category
      );
      return response;
    },
    async updateImages() {
      let images = {
        product: this.$route.params.id,
        images: this.newImages,
        deleted_images: this.deletedImages
      };
      const response = await this.$axios.post("product/update-images/", images);
      return response;
    },
    async updateAttributes() {
      let attributes = {
        product: parseInt(this.$route.params.id),
        attributes: this.newAttributes
      };
      const response = await this.$axios.post(
        "product/update-attributes/",
        attributes
      );
      return response;
    },
    async sendAll() {
      let toast = this.$toast;
      this.$v.$touch();
      if (
        !(
          this.$v.product.$invalid &&
          this.$v.newAttributes.$invalid &&
          this.$v.selectedProductCategories.$invalid
        )
      ) {
        let loader = this.$loading.show();
        await this.updateProduct()
          .then(res => {
            toast.success(res.data);
          })
          .catch(err => {
            toast.error(err.response.data);
          });
        await this.updateCategory()
          .then(res => {
            toast.success(res.data);
          })
          .catch(err => {
            toast.error(err.response.data);
          });
        await this.updateImages()
          .then(res => {
            toast.success(res.data);
          })
          .catch(err => {
            toast.error(err.response.data);
          });
        await this.updateAttributes()
          .then(res => {
            toast.success(res.data);
          })
          .catch(err => {
            toast.error(err.response.data);
          });
        this.getProduct();
        loader.hide();
      }
    },
    getProduct() {
      this.$axios
        .get(`product/specific/${this.$route.params.id}`)
        .then(res => {
          this.newAttributes = [];
          let i = 0;
          for (const key1 in res.data.attributes) {
            let attribute = {};
            attribute.key = Object.keys(res.data.attributes)[i];
            i++;
            for (const key2 in res.data.attributes[key1]) {
              attribute[key2] = res.data.attributes[key1][key2];
            }
            this.newAttributes.push(attribute);
          }
          this.product = res.data;
          this.newCategories = this.product.categories.map(el => el.id);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCategories() {
      let loader = this.$loading.show();
      this.$axios
        .get("product/category-all/")
        .then(res => {
          this.categories = res.data.results;
          this.getProduct();
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          loader.hide();
        });
    }
  },
  mounted() {
    this.getCategories();
  }
};
</script>
<style scoped>
div.multiselect {
  width: 50%;
}
</style>
