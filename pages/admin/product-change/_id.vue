  <template>
  <div>
    <div>
      <!-- <AdminSidebar class="w-1/3" /> -->
      <div>
        <div
          v-if="showSuccess"
          class="fixed z-40 top-0 px-4 py-2 w-2/3 text-lg bg-green-400 text-white text-center"
        >
          <svg viewBox="0 0 40 40" class="w-6 h-6 fill-current">
            <path
              d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z"
            ></path>
          </svg>
          <i> Mahsulot yangilandi</i>

          <span
            class="absolute right-6 cursor-pointer"
            @click="showSuccess = false"
            >X</span
          >
        </div>
        <div
          v-if="showError"
          class="fixed z-40 top-0 px-4 py-2 w-2/3 text-lg bg-red-400 text-white text-center"
        >
          <i> Mahsulot yangilashda xatolik yuz berdi, qayta urinib ko'ring</i>

          <span
            class="absolute right-6 cursor-pointer"
            @click="showError = false"
            >X</span
          >
        </div>
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
            <!-- <BaseSelect
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
            /> -->
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
              v-model="$v.selectedProductCategories.$model"
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
                !$v.selectedProductCategories.required &&
                $v.selectedProductCategories.$dirty
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
              buttonText="Mahsulot yaratish"
              @button-click="updateProduct"
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
      newImage: null,
      showSuccess: false,
      showError: false,
      showAddNewKey: false,
      showDeleteDialog: false,
      newCategories: [],
      image: null,
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
        id: 0,
      },
      newAttributes: [],
    };
  },
  validations: {
    selectedProductCategories: {
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
      attributes: {
        required,
        minLength: minLength(2),
      },
      categories: {
        required,
      },
    },
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
    },
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
      this.newAttributes.splice(index, 1);
    },
    removeImage(index) {
      this.deletedImages.push(this.newImages[index]);
      console.log(this.preview_list);
      this.newImages.splice(index, 1);
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
    updateProduct() {
      const formData = new FormData();
      formData.append("name", this.product.name);
      formData.append("description", this.product.description);
      formData.append("product_code", this.product.product_code);
      formData.append("price", this.product.price);
      formData.append("quantity", this.product.quantity);
      formData.append("image", this.newImage);
      this.$axios
        .patch(`product/update/${this.$route.params.id}`, this.product)
        .then(res => {
          loader.hide();
          this.showSuccess = true;
          setTimeout(() => {
            this.showSuccess = false;
          }, 3000);
          console.log(res.data);
          this.getCategories();
          setTimeout(() => {
            this.showSuccess = false;
          }, 3000);
        })
        .catch(err => {
          loader.hide();
          this.showError = true;
          setTimeout(() => {
            this.showError = false;
          }, 3000);
          console.log(err);
        });
    },
    updateCategory() {
      let category = {
        product: this.$route.params.id,
        categories: this.newCategories,
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
        deleted_images: this.deletedImages,
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
        attributes: this.newAttributes,
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
      loader.hide();
    },
    getProduct() {
      this.$axios
        .get(`product/specific/${this.$route.params.id}`)
        .then(res => {
          this.image = res.data.image;
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
          console.log(this.categories, this.product.categories);
          this.product.categories.forEach(element => {
            this.selectedProductCategories = this.categories.filter(el => {
              return el.id === element.id;
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCategories() {
      this.$axios
        .get("product/category-all/")
        .then(res => {
          this.categories = res.data;
          this.getProduct();
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getCategories();
  },
};
</script>
<style scoped>
div.multiselect {
  width: 50%;
}
</style>
