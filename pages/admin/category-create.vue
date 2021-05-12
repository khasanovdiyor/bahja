<template>
  <div>
    <div class="mb-6">
      <h1 class="font-bold text-xl text-gray-700">Kategoriya qo'shish</h1>
      <div>
        <BaseTextField
          class="my-4"
          v-model.trim="$v.newCategory.name.$model"
          label="Nomi"
          required
          :required-message="
            !$v.newCategory.name.required && $v.newCategory.name.$dirty
          "
        />
        <BaseSelect
          class="my-4 w-1/2"
          v-model="selectedCategory"
          label="Kategoriya"
          :options="categories"
          placeholder="Kategoriya tanlang"
          @select="selectCategory"
          @remove="removeCategory"
          noResult="Bunday kategoriya topilmadi"
        />
        <BaseTextField
          class="my-4"
          v-model.trim="newCategory.order"
          label="Tartib raqami"
        />
        <div>
          <label
            for="input"
            class="block font-bold text-gray-600 uppercase text-sm mb-2 mt-4"
            >is_slider</label
          >
          <input
            type="checkbox"
            class="border-2 w-8"
            v-model="newCategory.is_slider"
          />
        </div>
        <BaseImageField
          class="my-4"
          label="Rasmi"
          required
          @change="previewImage"
          :image="preview"
        />
        <div class="text-red-400 text-sm" v-if="imageRequired">
          Rasm qo'yish shart
        </div>
        <BaseButtonLink
          buttonText="Kategoriya yaratish"
          @button-click="createCategory"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      createProductClicked: false,
      selectedCategory: null,
      preview: null,
      categories: [],
      image: null,
      newCategory: {
        name: "",
        parent_id: null,
        is_slider: false,
        order: null
      }
    };
  },
  validations: {
    newCategory: {
      name: {
        required
      }
    }
  },
  computed: {
    imageRequired() {
      return !!!this.image && this.createProductClicked;
    }
  },
  methods: {
    selectCategory(value) {
      this.newCategory.parent_id = value.id;
    },
    removeCategory() {
      this.newCategory.parent_id = null;
    },
    previewImage(event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = e => {
          this.preview = e.target.result;
        };
        this.image = input.files[0];
        if (this.image) reader.readAsDataURL(this.image);
      }
    },

    createCategory() {
      this.createProductClicked = true;
      this.$v.$touch();
      if (!this.$v.$invalid && !this.imageRequired) {
        let loader = this.$loading.show();
        const formData = new FormData();
        for (let key in this.newCategory) {
          formData.append(key, this.newCategory[key]);
        }
        formData.append("image", this.image);
        this.$axios
          .post("product/category-create/", formData)
          .then(res => {
            this.$toast.success("Kategoriya yaratildi");
          })
          .catch(err => {
            this.$toast.error(
              err.response.data || "Kategoriya qo'shishda xatolik yuz berdi"
            );
          })
          .finally(() => {
            loader.hide();
          });
      }
    }
  }
};
</script>