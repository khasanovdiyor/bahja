<template>
  <div class="flex min-h-screen bg-gray-100 " ref="formContainer">
    <AdminSidebar />
    <div class="px-16 w-2/3">
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

      <div class="mb-6 my-8">
        <div class="input-group block ">
          <h2 class="text-xl font-bold mb-10 text-gray-700">
            Kategoriya yangilash
          </h2>
<<<<<<< HEAD
          <div class="my-4">
            <label for="input" class="block font-bold uppercase text-sm mb-2"
              >Kategoriya nomi</label
            >
            <input
              type="text"
              class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
              v-model="newCategory.name"
            />
          </div>

          <div class="my-4">
            <label for="input" class="block font-bold uppercase text-sm mb-2"
              >Parent kategoriya</label
            >
            <multiselect
              v-model="selectedCategory"
              :options="categories"
              placeholder="Kategoriya tanlang"
              label="name"
              track-by="name"
              @select="selectCategory"
              @remove="removeCategory"
            ></multiselect>
          </div>
          <div class="my-4">
            <label for="input" class="block font-bold uppercase text-sm mb-4"
              >Tartib raqami</label
            >
            <input
              type="text"
              class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
              v-model="newCategory.order"
            />
          </div>
          <div class="my-4">
            <label for="input" class="block font-bold uppercase text-sm mb-2">
              is_slider</label
            >
            <input
              type="checkbox"
              class="border text-sm w-5 h-5 pl-5"
              v-model="newCategory.is_slider"
            />
          </div>
          <div class="my-4">
            <label class="block font-bold text-gray-600 uppercase text-sm mb-2"
              >rasm qo'yish</label
            ><input
              type="file"
              accept="image/*"
              @change="previewImage"
              class="border-2 rounded-md bg-white text-sm w-1/2 py-2 pl-5"
            />
            <div v-if="newCategory.image">
              <div>
                <div class="w-56 h-56 my-5">
                  <img
                    :src="newCategory.image"
                    class="object-cover object-top w-full h-full"
                  />
                </div>
                <p class="text-sm">Rasm Nomi: {{ newCategory.image.name }}</p>
                <p class="">
                  <!-- Rasm hajmi: {{ newCategory.image.size / 1024 }}KB -->
                </p>
=======
          <label for="input" class="block font-bold uppercase text-sm mb-2"
            >Kategoriya nomi</label
          >
          <input
            type="text"
            class="border-2 text-sm w-1/2 py-2 pl-5"
            v-model="newCategory.name"
          />
        </div>
        <div>
          <label for="input" class="block font-bold uppercase text-sm mb-2"
            >Parent kategoriya</label
          >
          <multiselect
            v-model="parentCategory"
            :options="categories"
            placeholder="Kategoriya tanlang"
            label="name"
            track-by="name"
            @select="selectCategory"
            @remove="removeCategory"
          ></multiselect>
        </div>
        <div>
          <label for="input" class="block font-bold uppercase text-sm mb-2"
            >Tartib raqami</label
          >
          <input
            type="text"
            class="border-2 text-sm w-1/2 py-2 pl-5"
            v-model="newCategory.order"
          />
        </div>
        <div>
          <label for="input" class="block font-bold uppercase text-sm mb-2">
            is_slider</label
          >
          <input
            type="checkbox"
            class="border-2 text-sm w-6 py-2 pl-5"
            v-model="newCategory.is_slider"
          />
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
          <div v-if="newCategory.image">
            <div>
              <div class="w-56 h-56">
                <img
                  :src="newCategory.image"
                  class="object-cover object-top w-full h-full"
                />
>>>>>>> 02d9f5849938c9bf28a823602b9ca6710d567346
              </div>
            </div>
            <!-- <img src="../assets/images/link.svg" class="w-5 inline-block" /> -->
          </div>
        </div>

        <base-button :clickFunction="updateCategory" class="rounded-md text-sm">
          Kategoriyani yangilash
        </base-button>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSidebar from "~/components/admin/AdminSidebar.vue";
import BaseButton from "~/components/admin/BaseButton.vue";
export default {
  components: {
    AdminSidebar,
    BaseButton,
  },
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
        reader.onload = (e) => {
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
<<<<<<< HEAD
        .then(res => {
=======
        .then((res) => {
          console.log(res.data);
          this.getCategory();
>>>>>>> 02d9f5849938c9bf28a823602b9ca6710d567346
          loader.hide();
          this.showSuccess = true;
<<<<<<< HEAD
          console.log(res.data);
          this.getCategory();
=======
>>>>>>> 02d9f5849938c9bf28a823602b9ca6710d567346
          setTimeout(() => {
            this.showSuccess = false;
          }, 3000);
        })
        .catch((err) => {
          loader.hide();
          this.showFail = true;
          setTimeout(() => {
            this.showFail = false;
          }, 3000);
<<<<<<< HEAD
          console.log(err);
=======
>>>>>>> 02d9f5849938c9bf28a823602b9ca6710d567346
        });
    },
    deleteCategory(id) {
      this.$axios
        .delete(`product/category-delete/${id}`)
        .then((res) => {
          console.log(res.data, "ID:", id);
          this.showDeleteDialog = false;
          this.getCategories();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCategory() {
      this.getCategories();
      this.$axios
        .get(`product/category-detail/${this.$route.params.id}`)
        .then((res) => {
          if (this.categories) {
            this.parentCategory = this.categories.find(
              (el) => el.id === res.data.parent_id
            );
          }
          this.newCategory = res.data;
        })
        .catch((err) => {
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
