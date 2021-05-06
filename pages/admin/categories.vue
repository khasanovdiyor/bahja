<template>
  <div class="flex min-h-screen bg-gray-50">
    <AdminSidebar />
    <div class="px-5 w-9/12">
      <div
        v-if="showSuccess"
        class="flex fixed z-40 top-0 py-2 w-9/12 bg-green-500 text-lg text-white text-center"
      >
        <svg viewBox="0 0 40 40" class="w-6 h-6 fill-current mx-5">
          <path
            d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"
          ></path>
        </svg>
        <i>Kategoriya yaratildi</i>
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
        <i> Kategoriya yaratishda xatolik yuz berdi, qayta urinib ko'ring</i>
        <span
          class="absolute font-bold right-10 cursor-pointer"
          @click="showFail = false"
          >X</span
        >
      </div>
      <div
        v-if="showDeleteDialogFail"
        class="flex fixed z-40 top-0 py-2 w-9/12 bg-green-500 text-lg text-white text-center"
      >
        <svg viewBox="0 0 40 40" class="w-6 h-6 fill-current mx-5">
          <path
            d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"
          ></path>
        </svg>
        <i> Kategoriya o'chirildi</i>
        <span
          class="absolute right-10 cursor-pointer"
          @click="showDeleteDialogFail = false"
          >X</span
        >
      </div>
      <div class="mb-6">
        <div class="accordion text-xl text-gray-700 font-bold my-10">
          Kategoriya qo'shish
        </div>
        <div class="panel overflow-hidden">
          <label
            for="input"
            class="block font-bold text-gray-600 uppercase text-sm mb-2"
            >nomi
          </label>
          <input
            type="text"
            class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
            placeholder="nom"
            v-model.trim="$v.newCategory.name.$model"
          />
          <div
            class="text-red-400 text-sm"
            v-if="!$v.newCategory.name.required && $v.newCategory.name.$dirty"
          >
            <i> To'ldirish shart</i>
          </div>
          <div class="text-red-400" v-if="!$v.newCategory.name.minLength"></div>
          <div>
            <label
              for="input"
              class="block font-bold text-gray-600 uppercase text-sm mb-2 my-5"
              >Kategoriya
            </label>
            <multiselect
              v-model="selectedCategory"
              :options="categories"
              placeholder="Kategoriya tanlang"
              label="name"
              track-by="name"
              @select="selectCategory"
              @remove="removeCategory"
            >
              <template
                ><span class="text-red-500" slot="noResult"
                  >Bunday kategoriya topilmadi!</span
                >
              </template>
            </multiselect>
          </div>
          <div>
            <label
              for="input"
              class="block font-bold text-gray-600 uppercase text-sm mb-2 my-5"
              >Tartib raqam</label
            >
            <input
              type="number"
              placeholder="123..."
              required
              class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
              v-model.trim="$v.newCategory.order.$model"
            />
            <div
              class="text-red-400 text-sm"
              v-if="
                !$v.newCategory.order.required && $v.newCategory.order.$dirty
              "
            >
              <i>Son kiriting</i>
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
              class="border-2 w-8"
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
            <div v-if="preview">
              <div>
                <div class="w-56 h-64 my-5 border shadow-sm">
                  <img :src="preview" class="object-cover w-full h-full" />
                </div>
              </div>
            </div>
            <!-- <img src="~/assets/images/link.svg" class="w-5 inline-block" /> -->
          </div>

          <base-button
            :clickFunction="createCategory"
            class="rounded-md text-sm"
          >
            Kategoriya yaratish
          </base-button>
        </div>
      </div>
      <div class="mb-10">
        <table class="divide-y w-full divide-gray-100">
          <thead>
            <tr>
              <th
                scope="col"
                class="px-6 py-3 w-16 bg-gray-100 text-left text-xs text-gray-600 uppercase"
              >
                id
              </th>

              <th
                scope="col"
                class="px-6 py-3 bg-gray-100 text-left text-xs text-gray-600 uppercase"
              >
                nom
              </th>
              <th
                scope="col"
                class="px-6 py-3 bg-gray-100 text-center text-xs text-gray-600 uppercase"
              >
                rasm
              </th>
              <th
                scope="col"
                class="px-6 py-3 w-40 bg-gray-100 text-left text-xs text-gray-600 uppercase"
              >
                buyurtmalar
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
                <div class="flex items-center text-sm capitalize">
                  {{ category.name }}
                </div>
              </td>
              <td class="px-6 py-1 border">
                <div class="flex justify-center mx-auto items-center w-16 h-16">
                  <img
                    :src="category.image"
                    :alt="`${category.name} image`"
                    class="w-16 h-full"
                  />
                </div>
              </td>
              <td class="px-6 py-1 border">
                <div class="flex items-center text-sm justify-around">
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
                class="fixed z-40 top-0 bottom-0 right-0 left-0 bg-gray-500 bg-opacity-25 flex items-center justify-center"
                v-if="showDeleteDialog"
              >
                <div class="w-1/3 rounded-md bg-white py-4 px-8">
                  <span class="font-bold text-xl text-center block mb-6"
                    >Ushbu kategoriyani o'chirishni xohlaysizmi?</span
                  >
                  <div class="flex justify-between">
                    <button
                      @click="deleteCategory(selectedCategoryID)"
                      class="bg-red-500 rounded-md text-white py-2 px-4"
                    >
                      Ha
                    </button>
                    <button
                      @click="showDeleteDialog = false"
                      class="bg-gray-500 rounded-md text-white py-2 px-4"
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
import priceMask from "~/mixins.js/priceMask.js";
import { required } from "vuelidate/lib/validators";
import global from "~/mixins.js/global.js";
export default {
  mixins: [global],
  data() {
    return {
      errors: [],
      isActive: true,
      hasError: false,
      priceMask: priceMask,
      showDeleteDialog: false,
      showSuccess: false,
      showFail: false,
      message: "",
      selectedCategory: {},
      showChildInput: false,
      image: null,
      preview: null,
      categories: [],
      image: null,
      newCategory: {
        name: "",
        parent_id: null,
        is_slider: false,
        order: null
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
          this.input == "";
        });
    },
    deleteCategory(id) {
      this.$axios
        .delete(`product/category-delete/${id}`)
        .then(res => {
          console.log(res.data, "ID:", id);
          this.showDeleteDialog = false;
          this.message = "Kategoriya o'chirildi";
          this.showDeleteDialogFail = true;
          setTimeout(() => {
            this.showFail = false;
          }, 3000);
          this.getCategories();
        })
        .catch(err => {
          this.message =
            "Kategoriya o'chirishda xatolik yuz berdi, qayta urinib ko'ring";
          this.showDeleteDialogFail = false;
          console.log(err);
        });
    }
  },
  mounted() {
    this.getCategories();
  },
  activeColor: "red",
  borderColor: " red"
};
</script>

<style scoped>
.multiselect {
  width: 50%;
}

input:required:valid {
  border-color: #e6eaeb;
}

input:required:invalid:not(:placeholder-shown) {
  border-color: crimson;
}

input:required:invalid:not(:placeholder-shown) + .validation {
  opacity: 1;
}
</style>
