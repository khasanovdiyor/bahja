<template>
  <div>
    <div>
      <!-- <AdminSidebar /> -->
      <div>
        <div
          v-if="showSuccess"
          class="flex fixed z-40 top-0 py-2 w-9/12 bg-green-500 text-lg text-white text-center"
        >
          <svg viewBox="0 0 40 40" class="w-6 h-6 fill-current mx-5">
            <path
              d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"
            ></path>
          </svg>

          <i> Slider yaratildi</i>

          <span
            class="absolute right-6 cursor-pointer"
            @click="showSuccess = false"
            >X</span
          >
        </div>
        <div
          v-if="showFail"
          class="flex fixed z-40 top-0 py-2 w-9/12 bg-red-500 text-lg text-white text-center"
        >
          <svg viewBox="0 0 40 40" class="w-6 h-6 fill-current mx-5">
            <path
              d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z"
            ></path>
          </svg>
          <i> Slider yaratishda xatolik yuz berdi, qayta urinib ko'ring</i>

          <span
            class="absolute font-bold right-6 cursor-pointer"
            @click="showFail = false"
            >X</span
          >
        </div>

        <div class="my-4">
          <label class="block font-bold text-gray-600 uppercase text-sm mb-2"
            >kontent</label
          >
          <input
            type="text"
            class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
            v-model.trim="$v.slider.text.$model"
          />
          <div
            class="text-red-400 text-sm"
            v-if="!$v.slider.text.required && $v.slider.text.$dirty"
          >
            <i>To'ldirish shart</i>
          </div>
        </div>
        <div class="my-4">
          <label class="block font-bold text-gray-600 uppercase text-sm mb-2"
            >Kategoriya
          </label>
          <multiselect
            v-model="$v.selectedCategory.$model"
            :options="categories"
            placeholder="Kategoriya tanlang"
            class="text-sm w-1/2"
            label="name"
            track-by="name"
            @select="selectCategory"
          ></multiselect>
        </div>
        <div class="my-4">
          <label class="block font-bold text-gray-600 uppercase text-sm mb-2"
            >Asosiy rasm</label
          ><input
            type="file"
            accept="image/*"
            @change="previewImage"
            class="border-2 rounded-md bg-white text-sm w-1/2 py-2 pl-5"
          />
          <div v-if="preview">
            <div>
              <div class="w-56 h-64 my-5 border shadow-sm">
                <img :src="preview" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          @click="createSlider"
          class="block bg-gray-800 w-32 text-sm text-center rounded-md px-3 text-white my-2 py-2"
        >
          Slider yaratish
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { required, minLength } from "vuelidate/lib/validators";
export default {
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
    selectCategory(value, id) {
      this.slider.category = value.id;
    },

    createSlider() {
      let loader = this.$loading.show();
      const formData = new FormData();
      formData.append("text", this.slider.text);
      formData.append("image", this.slider.image);
      formData.append("category", this.slider.category);
      this.$axios
        .post("product/slider/create/", formData)
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
          this.showFail = true;
          setTimeout(() => {
            this.showFail = false;
          }, 3000);
          console.log(err);
        });
    },
    previewImage(event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = e => {
          this.preview = e.target.result;
        };

        this.slider.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
      var file = event.target.files[0];
      var reader = new FileReader();
      reader.onloadend = function() {};
      reader.readAsDataURL(file);
    },
    getCategories() {
      this.$axios
        .get("product/category-all/")
        .then(res => {
          console.log(res.data);
          this.categories = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getCategories();
  }
};
</script>
<style scoped>
.multiselect {
  width: 50%;
}
</style>
