<template>
  <div>
    <div class="flex min-h-screen">
      <AdminSidebar />
      <div class="px-5 mx-auto w-4/5 pt-10">
        <div
          v-if="showSuccess"
          class="flex fixed z-40 top-0 py-2 w-9/12 bg-green-500 text-lg text-white text-center"
        >
          <svg viewBox="0 0 40 40" class="w-6 h-6 fill-current mx-5">
            <path
              d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z"
            ></path>
          </svg>
          <i> Slider yangilandi</i>

          <span
            class="absolute right-10 cursor-pointer"
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
          <i> slider yangilashda xatolik yuz berdi, qayta urinib ko'ring</i>
          <span
            class="absolute font-bold right-10 cursor-pointer"
            @click="showFail = false"
            >X</span
          >
        </div>

        <div class="my-4">
          <label class="block text-gray-600 font-bold uppercase text-sm mb-2"
            >Kontent</label
          >
          <input
            type="text"
            class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
            v-model="slider.text"
          />
        </div>
        <div class="my-4">
          <label class="block text-gray-600 font-bold uppercase text-sm mb-2"
            >Kategoriya
          </label>
          <select
            name="category"
            id="category"
            v-model="slider.category"
            class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
          >
            <option disabled selected value="choose">Kategoriya tanlang</option>
            <option
              :value="category.id"
              v-for="category in categories"
              :key="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="my-4">
          <label class="block text-gray-600 font-bold uppercase text-sm mb-2"
            >rasm</label
          ><input
            type="file"
            accept="image/*"
            @change="previewImage"
            class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
          />
          <div v-if="preview">
            <div>
              <div class="w-56 h-64 my-5 border shadow-md">
                <img :src="preview" class="object-cover w-full h-full" />
              </div>
            </div>
          </div>
        </div>

        <button
          @click="updateSlider"
          class="bg-gray-800 rounded-md text-sm text-white py-2 mt-1 px-4"
        >
          Yangilash
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      preview: null,
      showSuccess: false,
      showFail: false,
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
