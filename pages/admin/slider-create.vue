<template>
  <div>
    <div>
      <div>
        <h1 class="font-bold text-xl text-gray-700">Slider qo'shish</h1>
        <BaseTextField
          class="my-4"
          v-model="$v.slider.text.$model"
          label="Kontent"
          required
          :required-message="!$v.slider.text.required && $v.slider.text.$dirty"
        />
        <BaseSelect
          class="my-4 w-1/2"
          v-model="$v.selectedCategory.$model"
          label="Kategoriya"
          placeholder="Kategoriya tanlang"
          required
          :required-message="
            !$v.selectedCategory.required && $v.selectedCategory.$dirty
          "
          :options="categories"
          @select="selectCategory"
        />
        <BaseImageField
          class="my-4"
          label="Rasm"
          :image="preview"
          @change="previewImage"
        />
        <BaseButtonLink
          buttonText="Slider yaratish"
          @button-click="createSlider"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";
export default {
  layout: "admin",
  data() {
    return {
      selectedCategory: "",
      preview: null,
      showSuccess: false,
      showFail: false,

      categories: [],
      slider: {
        text: null,
        image: null,
        category: null
      }
    };
  },
  validations: {
    selectedCategory: {
      required
    },
    slider: {
      text: {
        required
      },
      image: {
        required
      },
      category: {
        required
      }
    }
  },
  methods: {
    selectCategory(value) {
      this.slider.category = value.id;
    },

    createSlider() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let loader = this.$loading.show();
        const formData = new FormData();
        formData.append("text", this.slider.text);
        formData.append("image", this.slider.image);
        formData.append("category", this.slider.category);
        this.$axios
          .post("product/slider/create/", formData)
          .then(res => {
            this.$toast.success("Slider yaratildi");
            this.getCategories();
          })
          .catch(err => {
            this.$toast.error(
              err.response.data || "Slider yaratishda xatolik yuz berdi"
            );
          })
          .finally(() => {
            loader.hide();
          });
      }
    },
    previewImage(event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = e => {
          this.preview = e.target.result;
        };
        this.slider.image = input.files[0];
        if (this.slider.image) reader.readAsDataURL(this.slider.image);
      }
    },
    getCategories() {
      let loader = this.$loading.show();
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
