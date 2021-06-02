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
          buttonText="Slider yangilash"
          @button-click="updateSlider"
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
      preview: null,
      categories: [],
      image: null,
      slider: {
        text: "",
        image: null,
        category: null
      },
      selectedCategory: {}
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
    updateSlider() {
      this.$v.$touch();
      if (!this.$toast.$invalid) {
        let loader = this.$loading.show();
        const formData = new FormData();
        formData.append("text", this.slider.text);
        formData.append("category", this.slider.category);
        if (this.image) formData.append("image", this.image);
        this.$axios
          .patch(`product/slider/update/${this.$route.params.id}`, formData)
          .then(res => {
            this.$toast.success("Slider yangilandi");
            this.getCategories();
          })
          .catch(err => {
            this.$toast.error(
              err.response.data || "Slider yangilashda xatolik yuz berdi"
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

        this.image = input.files[0];
        if (this.image) reader.readAsDataURL(this.image);
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
          this.getSlider();
        })
        .catch(err => {
        })
        .finally(() => {
          loader.hide();
        });
    },
    getSlider() {
      this.$axios
        .get(`product/slider/detail/${this.$route.params.id}`)
        .then(res => {
          this.preview = res.data.image;
          this.slider = res.data;
          this.slider.category = res.data.category.id;
          this.selectedCategory = this.categories.find(
            el => el.id === this.slider.category
          );
        });
    }
  },
  mounted() {
    this.getCategories();
  }
};
</script>
