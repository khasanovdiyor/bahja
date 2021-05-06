<template>
  <div ref="formContainer">
    <div>
      <div
        class="fixed z-40 top-0 px-4 py-2 w-2/3 bg-green-400 text-lg text-white text-center"
        v-if="showSuccess"
      >
        <span><i>Kategoriya yangilandi</i> </span>
        <!-- <div
          class="text-white px-4 cursor-pointer"
          @click="showSuccess = false"
        >
          X
        </div> -->
      </div>
      <div
        class="fixed z-40 top-0 px-4 py-2 w-2/3 bg-red-400 text-lg text-white text-center"
        v-if="showFail"
      >
        <span
          ><i
            >Kategoriya yangilashda xatolik yuz berdi, qayta urinib koring</i
          ></span
        >

        <!-- <div class="text-white px-4 cursor-pointer" @click="showFail = false">
          X
        </div> -->
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
        is_slider: false,
      },
    };
  },
  methods: {
    selectCategory(value, id) {
      this.newCategory.parent_id = value.id;
    },
    removeCategory(value, id) {
      this.newCategory.parent_id = 0;
    },
    previewImage: function (event) {
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
    },
  },
  created() {
    this.getCategories();
  },
  mounted() {
    this.getCategory();
  },
};
</script>

<style scoped>
.multiselect {
  width: 50%;
}
</style
>>
