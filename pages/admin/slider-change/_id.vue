<template>
  <div>
    <div class="flex ">
      <AdminSidebar />
      <div class="px-5 mx-auto w-4/5 pt-10">
        <div
          v-if="showSuccess"
          class="fixed z-40 top-0 px-4 py-2 w-2/3 bg-green-400 text-white text-center"
        >
          Slider yangilandi
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
          Slider ma'lumotlarini yangilashda xatolik yuz berdi, qayta urinib
          koring
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
            v-model="slider.text"
          />
        </div>
        <div class="my-4">
          <label class="block font-bold uppercase text-sm mb-2"
            >Kategoriya tanlang
          </label>
          <select name="category" id="category" v-model="slider.category">
            <option disabled selected value="choose"
              >Kategoriya tanlang
            </option>
            <option
              :value="category.id"
              v-for="category in categories"
              :key="category.id"
              >{{ category.name }}</option
            >
          </select>
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
            </div>
          </div>
          <!-- <img src="../assets/images/link.svg" class="w-5 inline-block" /> -->
        </div>

        <button
          @click="updateSlider"
          class="bg-gray-800 text-white py-2 px-4 mb-72"
        >
          Slider ma'lumotlarini yangilash
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import AdminSidebar from "~/components/admin/AdminSidebar.vue";
import TheNotification from "~/components/admin/TheNotification.vue";
export default {
  components: {
    AdminSidebar,
    TheNotification
  },
  data() {
    return {
      preview: null,
      showSuccess: false,
      showFail: false,
      token: "58ef58a77940fd18fa91351c61773eada4859475",
      categories: [],
      image: null,
      slider: {
        text: "",
        image: null,
        category: null
      }
    };
  },
  methods: {
    updateSlider() {
      let loader = this.$loading.show();
      const formData = new FormData();
      formData.append("text", this.slider.text);
      if (this.image) formData.append("image", this.image);
      formData.append("category", this.slider.category);
      this.$axios
        .patch(`product/slider/update/${this.$route.params.id}`, formData)
        .then(res => {
          loader.hide();
          this.showSuccess = true;
          console.log(res);
          this.getSlider();
        })
        .catch(err => {
          loader.hide();
          this.showFail = true;
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

        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
      var file = event.target.files[0];
      var reader = new FileReader();
      reader.onloadend = function() {
        console.log("RESULT", reader.result);
      };
      reader.readAsDataURL(file);
    },
    getCategories() {
      this.$axios
        .get("product/category-list/")
        .then(res => {
          console.log(res.data);
          this.categories = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getSlider() {
      this.$axios
        .get(`product/slider/detail/${this.$route.params.id}`)
        .then(res => {
          console.log(res.data);
          this.preview = res.data.image;
          this.slider = res.data;
          this.slider.category = res.data.category.id;
        });
    }
  },
  mounted() {
    this.getCategories();
    this.getSlider();
  }
};
</script>
