<template>
  <div ref="formContainer">
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
        <i>Kategoriya yangilandi</i>
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
        <i> Kategoriya yangilashda xatolik yuz berdi, qayta urinib ko'ring</i>
        <span
          class="absolute font-bold right-10 cursor-pointer"
          @click="showFail = false"
          >X</span
        >
      </div>

      <div class="mb-6 my-10">
        <div class="input-group block">
          <h2 class="text-xl font-bold mb-10 text-gray-700">Tahrirlash</h2>
          <label
            for="input"
            class="block font-bold text-gray-600 uppercase text-sm mb-2"
            >nom</label
          >
          <input
            type="text"
            class="border-2 rounded-md text-sm w-1/2 py-2 mb-4 pl-5"
            v-model="newCategory.name"
          />

          <div>
            <label
              for="input"
              class="block font-bold text-gray-600 uppercase text-sm mb-2"
              >Asosiy kategoriya</label
            >
            <multiselect
              v-model="parentCategory"
              :options="categories"
              placeholder="Kategoriya tanlang"
              label="name"
              class="text-sm"
              track-by="name"
              @select="selectCategory"
              @remove="removeCategory"
            ></multiselect>
          </div>

          <label
            for="input"
            class="block font-bold text-gray-600 uppercase text-sm mt-4 mb-2"
            >Tartib raqam</label
          >
          <input
            type="text"
            class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
            v-model="newCategory.order"
          />

          <label
            for="input"
            class="block font-bold text-gray-600 uppercase text-sm mt-4 mb-2"
          >
            is_slider
          </label>
          <input
            type="checkbox"
            class="border-2 text-sm w-5 h-5"
            v-model="newCategory.is_slider"
          />
          <label
            class="block font-bold text-gray-600 uppercase text-sm mt-4 mb-2"
            >Asosiy ram</label
          ><input
            type="file"
            accept="image/*"
            @change="previewImage"
            class="w-1/2 border-2 bg-white m text-sm py-2 pl-5"
          />
        </div>
        <div v-if="newCategory.image">
          <div>
            <div class="w-56 h-64 my-5 border shadow-sm">
              <img
                :src="newCategory.image"
                class="object-content w-full h-full"
              />
            </div>
          </div>
          <!-- <img src="~/assets/images/link.svg" class="w-5 inline-block" /> -->
        </div>

        <base-button :clickFunction="updateCategory" class="rounded-md text-sm">
          Kategoriyani yangilash
        </base-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDeleteDialog: false,
      parentCategory: {},
      showChildInput: false,
      image: null,
      preview: null,
      showSuccess: false,
      showFail: false,
      image: null,
      fullPage: true,
      newCategory: {
        name: "",
        parent_id: 0,
        order: 0,
        image: 0,
        is_slider: false
      }
    };
  },
  methods: {
    selectCategory(value, id) {
      this.newCategory.parent_id = value.id;
    },
    removeCategory(value, id) {
      this.newCategory.parent_id = 0;
    },
    previewImage: function(event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = e => {
          this.newCategory.image = e.target.result;
        };
        this.image = input.files[0];
        reader.readAsDataURL(this.image);
      }
    },

    updateCategory() {
      let loader = this.$loading.show();
      const formData = new FormData();
      for (const key in this.newCategory) {
        formData.append(key, this.newCategory[key]);
      }
      formData.delete("image");
      if (this.image) {
        formData.append("image", this.image);
      }
      this.$axios
        .patch(`product/category-update/${this.newCategory.id}`, formData)
        .then(res => {
          console.log(res.data);
          this.getCategory();
          loader.hide();
          this.showSuccess = true;
          console.log(res.data);
          this.getCategory();
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
    deleteCategory(id) {
      this.$axios
        .delete(`product/category-delete/${id}`)
        .then(res => {
          console.log(res.data, "ID:", id);
          this.showDeleteDialog = false;
          this.getCategories();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCategory() {
      this.getCategories();
      this.$axios
        .get(`product/category-detail/${this.$route.params.id}`)
        .then(res => {
          if (this.categories) {
            this.parentCategory = this.categories.find(
              el => el.id === res.data.parent_id
            );
          }
          this.newCategory = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getCategories();
  },
  mounted() {
    this.getCategory();
  }
};
</script>

<style scoped>
.multiselect {
  width: 50%;
}</style
>>
