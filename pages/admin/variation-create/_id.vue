<template>
  <div>
    <div>
      <h2 class="text-xl font-bold text-gray-800">O'zgarish qoshish</h2>
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
            !$v.product.product_code.required && $v.product.product_code.$dirty
          "
        />
        <BaseTextField
          class="my-4"
          v-model.trim="$v.product.description.$model"
          label="Tavsif"
          textarea
          required
          :required-message="
            !$v.product.description.required && $v.product.description.$dirty
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
          @button-click="createVariation"
        />
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
      showAddNewKey: false,
      selectedCategories: null,
      newCategories: [],
      newAttributes: [],
      product: {
        parent_id: 0,
        name: null,
        product_code: null,
        price: null,
        description: null,
        quantity: null,
        image: null,
        images: [],
        attributes: [],
        categories: []
      },
      attribute: {
        is_main: false,
        key: null,
        label: null,
        value: null
      }
    };
  },
  validations: {
    product: {
      name: {
        required
      },
      product_code: {
        required
      },
      quantity: {
        required
      },
      price: {
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
    selectCategories(value, categories) {
      if (!categories.includes(value.id)) categories.push(value.id);
    },
    removeCategories(value, categories) {
      const foundIndex = categories.indexOf(value.id);
      if (foundIndex !== -1) categories.splice(foundIndex, 1);
    },
    addAttribute(attributes) {
      attributes.push(this.attribute);
      this.attribute = {};
      this.showAddNewKey = false;
    },
    removeAttribute(attributes, index) {
      attributes.splice(index, 1);
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
    createVariation() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let loader = this.$loading.show();
        this.product.parent_id = this.$route.params.id;
        this.product.attributes = this.newAttributes;
        this.product.categories = this.newCategories;
        this.product.price = this.product.price.replace(/\s/g, "");
        this.$axios
          .post("product/variation-create/", this.product)
          .then(() => {
            this.$toast.success("O'zgarish qo'shildi");
          })
          .catch(err => {
            this.$toast.error(
              err.response.data || "O'zgarish qo'shishda xatolik yuz berdi"
            );
          })
          .finally(() => {
            loader.hide();
            this.getProduct();
          });
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
          this.product.image = null;
          this.product.images = [];
          this.newCategories = this.product.categories.map(el => el.id);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getCategories();
    this.getProduct();
  }
};
</script>
