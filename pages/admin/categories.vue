<template>
  <div class="flex min-h-screen">
    <AdminSidebar />
    <div class="px-16 w-2/3">
      <div
        class="py-2 px-4 flex fixed w-1/2 mx-auto text-xl justify-between bg-green-600 text-white"
        v-if="showSuccess"
      >
        <div>
          <span>Kategoriya qo'shildi</span>
        </div>
        <div
          class="text-white px-4 cursor-pointer"
          @click="showSuccess = false"
        >
          X
        </div>
      </div>
      <div
        class="py-2 px-4 flex fixed w-1/2 mx-auto text-xl justify-between bg-red-600 text-white"
        v-if="showFail"
      >
        <div>
          <span
            >Kategoriya qo'shishda xatolik yuz berdi, qayta urinib koring</span
          >
        </div>
        <div class="text-white px-4 cursor-pointer" @click="showFail = false">
          X
        </div>
      </div>
      <div class="mb-6">
        <div class="input-group block my-4">
          <h2 class="text-xl font-bold mb-10 uppercase">Kategoriya qoshish</h2>
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
            >Parent kategoriya {{ newCategory.parent_id }}</label
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
          <label for="input" class="block font-bold uppercase text-sm mb-2"
            >is_slider</label
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

        <base-button :clickFunction="createCategory">
          Kategoriya yaratish
        </base-button>
      </div>
      <div class="mb-10">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-200">
            <tr>
              <th
                scope="col"
                class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
              >
                id
              </th>

              <th
                scope="col"
                class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
              >
                Kategoriya nomi
              </th>
              <th
                scope="col"
                class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
              >
                Kategoriya rasmi
              </th>
              <th
                scope="col"
                class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
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
              <td class="px-6 py-1 border">
                <div class="flex items-center text-gray-500">
                  {{ category.id }}
                </div>
              </td>

              <td class="px-6 py-1 border">
                <div class="flex items-center text-gray-500">
                  {{ category.name }}
                </div>
              </td>
              <td class="px-6 py-1 border">
                <div class="flex items-center text-gray-500">
                  <img
                    :src="category.image"
                    :alt="`${category.name} image`"
                    class="w-24 h-24 object-cover ovject-center"
                  />
                </div>
              </td>
              <td class="px-6 py-1 border">
                <div class="flex items-center text-gray-500">
                  <span v-if="category.is_slider">Slider</span>
                  <span v-else>Slider emas</span>
                </div>
              </td>
              <td class="px-6 py-1 border">
                <div class="flex items-center text-gray-500 justify-between">
                  <nuxt-link
                    :to="`/admin/category-change/${category.id}`"
                    class="cursor-pointer"
                  >
                    <img
                      src="~/assets/images/pencil.svg"
                      class="w-5 h-5"
                      alt="pencil icon"
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
                      alt="pencil icon"
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
                    >Ushbu Kategoriyani o'chirishni xohlaysizmi?</span
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
import global from "~/mixins.js/global.js";
export default {
  mixins: [global],
  components: {
    AdminSidebar,
    BaseButton,
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
        order: 0,
        is_slider: false,
      },
    };
  },
  methods: {
    selectCategory(value, _s) {
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
        .then((res) => {
          loader.hide();
          this.message = "Kategoriya yaratildi";
          this.showSuccess = true;
          setTimeout(() => {
            this.showSuccess = false;
          }, 3000);
          console.log(res.data);
          this.getCategories();
        })
        .catch((err) => {
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
        .then((res) => {
          console.log(res.data, "ID:", id);
          this.showDeleteDialog = false;
          this.message = "Kategoriya uchirildi";
          this.showFail = true;
          setTimeout(() => {
            this.showFail = false;
          }, 3000);
          this.getCategories();
        })
        .catch((err) => {
          this.message =
            "Kategoriya uchirishda xatolik yuz berdi, qayta urinib ko'ring";
          console.log(err);
        });
    },
  },
  mounted() {
    this.getCategories();
  },
};
</script>

<style scoped>
.multiselect {
  width: 50%;
}
</style
>>
