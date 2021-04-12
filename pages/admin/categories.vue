<template>
  <div class="flex  min-h-screen bg-gray-100">
    <AdminSidebar />
    <div class="px-16 w-2/3">
      <div
        class="fixed z-40 top-0 px-50 py-2 w-2/3 bg-green-400 text-lg text-white text-center"
        v-if="showSuccess"
      >
        <div>
          <span><i>Kategoriya qo'shildi</i></span>
        </div>
        <!-- <div
          class="text-white px-4 cursor-pointer"
          @click="showSuccess = false"
        >
          X
        </div> -->
      </div>
      <div
        class="fixed z-40 top-0 px-50 py-2 w-2/3 bg-red-400 text-lg text-white text-center"
        v-if="showFail"
      >
        <div>
          <i>Kategoriya qo'shishda xatolik yuz berdi, qayta urinib koring</i>
        </div>
        <!-- <div class="text-white px-4 cursor-pointer" @click="showFail = false">
          X
        </div> -->
      </div>
      <div class="mb-6">
        <div class="input-group block my-10">
          <h2 class="text-xl text-gray-700 font-bold  mb-10">
            Kategoriya qo'shish
          </h2>
          <label
            for="input"
            class="block font-bold text-gray-600 uppercase text-sm mb-2"
            >Kategoriya nomi
          </label>
          <input
            type="text"
            class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
            v-model.trim="$v.newCategory.name.$model"
          />
          <div
            class="text-red-400 text-sm"
            v-if="!$v.newCategory.name.required && $v.newCategory.name.$dirty"
          >
            <i>To'ldirish shart</i>
          </div>
          <div class="text-red-400" v-if="!$v.newCategory.name.minLength"></div>
        </div>
        <div>
          <label
            for="input"
            class="block font-bold text-gray-600 uppercase text-sm mb-2"
            >Parent kategoriya
          </label>
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
        <div>
          <label
            for="input"
            class="block font-bold text-gray-600 uppercase text-sm mb-2 my-5"
            >Tartib raqami</label
          >
          <input
            type="number"
            class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
            v-model.trim="$v.newCategory.order.$model"
          />
          <div
            class="text-red-400 text-sm"
            v-if="!$v.newCategory.order.required && $v.newCategory.order.$dirty"
          >
            <i>To'ldirish shart</i>
          </div>
        </div>
        <div>
          <label
            for="input"
            class="block font-bold text-gray-600 uppercase text-sm mb-2 mt-4"
            >is_slider</label
          >
          <input
            type="checkbox"
            class="border-2 text-sm w-5 h-5 py-2 pl-5"
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
            class="text-sm "
          />
          <div v-if="preview">
            <div>
              <div class="w-56 h-56">
                <img
                  :src="preview"
                  class="object-cover object-top w-full h-full"
                />
              </div>
              <p class="">Rasm Nomi: {{ image.name }}</p>
              <p class="">Rasm hajmi: {{ image.size / 1024 }}KB</p>
            </div>
          </div>
          <!-- <img src="../assets/images/link.svg" class="w-5 inline-block" /> -->
        </div>

        <base-button :clickFunction="createCategory" class="rounded-md text-sm">
          Kategoriya yaratish
        </base-button>
      </div>
      <div class="mb-10 ">
        <table class="w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th
                scope="col"
                class="px-6 py-2 bg-gray-200 text-left text-sm text-gray-500 uppercase"
              >
                id
              </th>

              <th
                scope="col"
                class="px-6 py-2 bg-gray-200 text-left text-sm text-gray-500 uppercase"
              >
                Kategoriya nomi
              </th>
              <th
                scope="col"
                class="px-6 py-2 bg-gray-200 text-left text-sm text-gray-500 uppercase"
              >
                Kategoriya rasmi
              </th>
              <th
                scope="col"
                class="px-6 py-2 bg-gray-200 text-left text-sm text-gray-500 uppercase"
              >
                Slidermi?
              </th>
              <th
                scope="col"
                class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
              >
                Kategoriya Qo'shish/O'chirish
              </th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr
              class="border"
              v-for="category in categories"
              :key="category.id"
            >
              <td class="px-6 py-1 border rounded-bl-md">
                <div class="flex items-center text-sm">
                  {{ category.id }}
                </div>
              </td>

              <td class="px-6 py-1 border">
                <div class="flex items-center text-sm">
                  {{ category.name }}
                </div>
              </td>
              <td class="px-6 py-1 border">
                <div class="flex items-center ">
                  <img
                    :src="category.image"
                    :alt="`${category.name} image`"
                    class="w-24 h-16 mx-auto object-cover ovject-center"
                  />
                </div>
              </td>
              <td class="px-6 py-1 border">
<<<<<<< HEAD
                <div class="flex items-center text-sm justify-around">
                  <div
                    @click="newCategory.parent_id = category.id"
                    class="cursor-pointer text-xl text-white rounded-full bg-gray-500 px-2"
                  >
                    +
                  </div>
=======
                <div class="flex items-center text-gray-500">
                  <span v-if="category.is_slider">Slider</span>
                  <span v-else>Slider emas</span>
                </div>
              </td>
              <td class="px-6 py-1 border">
                <div class="flex items-center text-gray-500 justify-between">
>>>>>>> 02d9f5849938c9bf28a823602b9ca6710d567346
                  <nuxt-link
                    :to="`/admin/category-change/${category.id}`"
                    class="cursor-pointer w-5 h-5"
                  >
                    <img
                      src="~/assets/images/pencil.svg"
                      class="w-5 h-5"
                      alt="edit"
                    />
                  </nuxt-link>
                  <div
                    @click="
                      showDeleteDialog = true;
                      selectedCategoryID = category.id;
                    "
                    class="cursor-pointer"
                  >
                    <img
                      src="~/assets/images/delete.svg"
                      class="w-5 h-5"
                      alt="delete"
                    />
                  </div>
                </div>
              </td>
              <div
                class="fixed z-40 top-0 bottom-0 right-0 left-0 bg-gray-600 opacity-30 flex items-center justify-center"
                v-if="showDeleteDialog"
              >
                <div class="w-1/3 bg-white py-4 px-10">
                  <span class="font-bold text-xl block mb-6"
                    >Ushbu kategoriyani o'chirishni xohlaysizmi?</span
                  >
                  <div class="flex justify-between">
                    <button
                      @click="deleteCategory(selectedCategoryID)"
                      class="bg-red-600 text-white py-2 px-4"
                    >
                      Ha
                    </button>
                    <button
                      @click="showDeleteDialog = false"
                      class="bg-gray-600 text-white py-2 px-4"
                    >
                      Yo'q
                    </button>
                  </div>
                </div>
              </div>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSidebar from "~/components/admin/AdminSidebar.vue";
import BaseButton from "../../components/admin/BaseButton.vue";
import { required } from "vuelidate/lib/validators";
import global from "~/mixins.js/global.js";
export default {
  mixins: [global],
  components: {
    AdminSidebar,
    BaseButton
  },
  data() {
    return {
      showDeleteDialog: false,
      showSuccess: false,
      showFail: false,
      message: "",
      selectedCategory: {},
      showChildInput: false,
      image: null,
      preview: null,
      // categories: [],
      image: null,
      newCategory: {
        name: "",
        parent_id: 0,
        is_slider: false,
        order: 0
      },
      newCategories: {
        name: null,
        phone_number: null,
        products: []
      },
      seletedCategories: {
        name: "",
        phone_number: "",
        status: ""
      },
      products: [],
      addedProducts: []
    };
  },
  validations: {
    newCategory: {
      name: {
        required
      },
      order: {
        required
      }
    }
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
          this.preview = e.target.result;
        };
        this.image = input.files[0];
        reader.readAsDataURL(this.image);
      }
    },
    createCategory() {
      let loader = this.$loading.show();
      const formData = new FormData();
      for (let key in this.newCategory) {
        formData.append(key, this.newCategory[key]);
      }
      formData.append("image", this.image);
      this.$axios
        .post("product/category-create/", formData)
        .then(res => {
          loader.hide();
          this.message = "Kategoriya yaratildi";
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
          this.message =
            "Kategoriya yaratishda xatolik yuz berdi, qayta urinib ko'ring";
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
          this.message = "Kategoriya uchirildi";
          this.showFail = true;
          setTimeout(() => {
            this.showFail = false;
          }, 3000);
          this.getCategories();
        })
<<<<<<< HEAD
        .catch(err => {
=======
        .catch((err) => {
          this.message =
            "Kategoriya uchirishda xatolik yuz berdi, qayta urinib ko'ring";
>>>>>>> 02d9f5849938c9bf28a823602b9ca6710d567346
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
}</style
>>
