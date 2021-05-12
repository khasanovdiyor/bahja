<template>
  <div>
    <div class="mb-6">
      <h1 class="font-bold text-xl text-gray-700">Kategoriya yangilash</h1>
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
          buttonText="Kategoriya yangilash"
          @button-click="updateCategory"
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
      return !this.image && this.createProductClicked;
    },
    selectedCategory: {
      get() {
        return this.categories.find(el => el.id === this.newCategory.parent_id);
      }
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
    updateCategory() {
      this.createProductClicked = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let loader = this.$loading.show();
        delete this.newCategory.slug;
        delete this.newCategory.image;
        delete this.newCategory.updated_at;
        delete this.newCategory.id;
        const formData = new FormData();
        if (!this.newCategory.order) this.newCategory.order = null;
        for (let key in this.newCategory) {
          formData.append(key, this.newCategory[key]);
        }
        formData.append("image", this.image);
        this.$axios
          .patch(`product/category-update/${this.$route.params.id}`, formData)
          .then(res => {
            this.$toast.success("Kategoriya yangilandi");
          })
          .catch(err => {
            if ((err.response.status = 404))
              this.$toast.error("Bunday kategoriya mavjud emas");
            else
              this.$toast.error(
                err.response.data || "Kategoriya yangilashda xatolik yuz berdi"
              );
          })
          .finally(() => {
            loader.hide();
          });
      }
      this.createProductClicked = false;
    },
    getCategory() {
      this.$axios
        .get(`product/category-detail/${this.$route.params.id}`)
        .then(res => {
          this.newCategory = res.data;
          this.preview = res.data.image;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getCategory();
    this.getCategories();
  }
};
</script>