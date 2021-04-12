<template>
  <div>
    <div class="flex min-h-screen">
      <AdminSidebar />
      <div class="px-5 mx-auto w-4/5 pt-10">
        <div
          v-if="showSuccess"
          class="fixed z-40 top-0 px-4 py-2 w-2/3 bg-green-400 text-white text-center"
        >
          Slider yaratildi
          <span
            class="absolute right-6 cursor-pointer"
            @click="showSuccess = false"
            >X</span
          >
        </div>
        <div
          v-if="showFail"
          class="fixed z-40 top-0 px-4 py-2 w-2/3 bg-red-400 text-white text-center"
        >
          Slider yaratishda xatolik yuz berdi, qayta urinib koring
          <span
            class="absolute right-6 cursor-pointer"
            @click="showFail = false"
            >X</span
          >
        </div>

        <div class="my-4">
          <label class="block font-bold uppercase text-sm mb-2"
            >Slider matni</label
          >
          <input
            type="text"
            class="w-1/2 border-2 text-sm py-2 pl-5"
            v-model.trim="$v.slider.text.$model"
          />
        </div>
        <div class="my-4">
          <label class="block font-bold uppercase text-sm mb-2"
            >Kategoriya tanlang
          </label>
          <multiselect
            v-model="$v.selectedCategory.$model"
            :options="categories"
            placeholder="Kategoriya tanlang"
            label="name"
            track-by="name"
            @select="selectCategory"
          ></multiselect>
        </div>
        <div class="my-4">
          <label class="block font-bold uppercase text-sm mb-2"
            >rasm qo'yish</label
          ><input
            type="file"
            accept="image/*"
            @change="previewImage"
            class="w-1/2 border-2 text-sm py-2 pl-5"
          />
          <div v-if="preview">
            <div>
              <div class="w-56 h-56">
                <img
                  :src="preview"
                  class="object-cover object-top w-full h-full"
                />
              </div>
              <p class="">Rasm Nomi: {{ slider.image.name }}</p>
              <p class="">Rasm hajmi: {{ slider.image.size / 1024 }}KB</p>
            </div>
          </div>
          <!-- <img src="../assets/images/link.svg" class="w-5 inline-block" /> -->
        </div>

        <button
          @click="createSlider"
          class="bg-gray-800 text-white py-2 px-4 mb-72"
        >
          Slider yaratish
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import AdminSidebar from "~/components/admin/AdminSidebar.vue";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  components: {
    AdminSidebar,
  },
  data() {
    return {
      selectedCategory: "",
      preview: null,
      showSuccess: false,
      showFail: false,

      categories: [],
      slider: {
        text: "",
        image: null,
        category: null,
      },
    };
  },
  validations: {
    slider: {
      text: {
        required,
      },
      image: {
        required,
      },
      category: {
        required,
      },
    },
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
        .then((res) => {
          loader.hide();
          this.showSuccess = true;
          setTimeout(function () {
            this.showSuccess = false;
          }, 3000);
          console.log(res);
        })
        .catch((err) => {
          loader.hide();
          this.showFail = true;
          setTimeout(function () {
            this.showFail = false;
          }, 3000);
          console.log(err);
        });
    },
    previewImage(event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        };

        this.slider.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
      var file = event.target.files[0];
      var reader = new FileReader();
      reader.onloadend = function () {};
      reader.readAsDataURL(file);
    },
    getCategories() {
      this.$axios
        .get("product/category-all/")
        .then((res) => {
          console.log(res.data);
          this.categories = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getCategories();
  },
};
</script>
