<template>
  <div>
    <BaseNotification
      :text="message"
      :success="showSuccess"
      :error="showError"
    />
    <div class="mb-6">
      <h1 class="font-bold text-xl text-gray-700">Kategoriya qo'shish</h1>

      <div>
        <BaseTextField
          class="my-4"
          v-model.trim="$v.newCategory.name.$model"
          label="Nomi"
          :required="
            !$v.newCategory.name.required && $v.newCategory.name.$dirty
          "
        />
        <BaseSelect
          class="my-4"
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
          v-model.trim="$v.newCategory.order.$model"
          label="Tartib raqami"
          :required="
            !$v.newCategory.order.required && $v.newCategory.order.$dirty
          "
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
          @change="previewImage"
          :image="preview"
        />

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
      showSuccess: false,
      showError: false,
      message: "",
      selectedCategory: null,
      preview: null,
      image: null,
      newCategory: {
        name: "",
        parent_id: null,
        is_slider: false,
        order: null,
      },
    };
  },
  validations: {
    newCategory: {
      name: {
        required,
      },
      order: {
        required,
      },
    },
  },
  methods: {
    selectCategory(value) {
      this.newCategory.parent_id = value.id;
    },
    removeCategory(value, id) {
      this.newCategory.parent_id = 0;
    },
    previewImage(event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = e => {
          this.preview = e.target.result;
        };
        this.image = input.files[0];
        reader.readAsDataURL(this.image);
      }
    },

    createCategory() {
      let loader = this.$loading.show();
      const formData = new FormData();
      for (let key in this.newCategory) {
        formData.append(key, this.newCategory[key]);
      }
      formData.append("image", this.image);
      this.$axios
        .post("product/category-create/", formData)
        .then(res => {
          this.message = "Kategoriya yaratildi";
          this.showSuccess = true;
          setTimeout(() => {
            this.showSuccess = false;
          }, 3000);
          console.log(res.data);
          this.getCategories();
        })
        .catch(err => {
          this.message =
            "Kategoriya yaratishda xatolik yuz berdi, qayta urinib ko'ring";
          this.showError = true;
          setTimeout(() => {
            this.showError = false;
          }, 3000);
          console.log(err);
          this.input == "";
        })
        .finally(() => {
          loader.hide();
        });
    },
  },
};
</script>

<style>
</style>