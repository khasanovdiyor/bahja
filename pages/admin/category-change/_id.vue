<template>
  <div class="flex min-h-screen" ref="formContainer">
    <AdminSidebar />
    <div class="px-16 w-2/3">
      <div
        class="z-30 py-2 px-4 flex fixed w-1/2 mx-auto text-xl justify-between bg-green-600 text-white"
        v-if="showSuccess"
      >
        <div>
          <span>Kategoriya yangilandi</span>
        </div>
        <div
          class="text-white px-4 cursor-pointer"
          @click="showSuccess = false"
        >
          X
        </div>
      </div>
      <div
        class="z-30 py-2 px-4 flex fixed w-1/2 mx-auto text-xl justify-between bg-red-600 text-white"
        v-if="showFail"
      >
        <div>
          <span
            >Kategoriya yangilashda xatolik yuz berdi, qayta urinib koring</span
          >
        </div>
        <div class="text-white px-4 cursor-pointer" @click="showFail = false">
          X
        </div>
      </div>

      <div class="mb-6">
        <div class="input-group block my-4">
          <h2 class="text-xl font-bold mb-10 uppercase">
            Kategoriya yangilash
          </h2>
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
              </div>
              <p class="">Rasm Nomi: {{ newCategory.image.name }}</p>
              <p class="">Rasm hajmi: {{ newCategory.image.size / 1024 }}KB</p>
            </div>
          </div>
          <!-- <img src="../assets/images/link.svg" class="w-5 inline-block" /> -->
        </div>

        <base-button :clickFunction="updateCategory">
          Kategoriyani yangilash
        </base-button>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSidebar from "~/components/admin/AdminSidebar.vue";
import BaseButton from "~/components/admin/BaseButton.vue";
import TheNotification from "~/components/admin/TheNotification.vue";
export default {
  components: {
    AdminSidebar,
    BaseButton,
    TheNotification
  },
  data() {
    return {
      showDeleteDialog: false,
      selectedCategory: {},
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
      formData.append("parent_id", this.newCategory.parent_id);
      formData.append("order", this.newCategory.order);
      formData.append("name", this.newCategory.name);
      formData.append("is_slider", this.newCategory.is_slider);
      if (this.image) formData.append("image", this.image);
      this.$axios
        .patch(`product/category-update/${this.newCategory.id}`, formData)
        .then(res => {
          console.log(res.data);
          loader.hide();

          this.showSuccess = true;
        })
        .catch(err => {
          loader.hide();
          console.log(err);
          this.showFail = true;
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
    getCategory(id) {
      this.$axios
        .get(`product/category-detail/${id}`)
        .then(res => {
          if (id == res.data.parent_id) {
            this.selectedCategory = res.data;
          } else this.newCategory = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getCategories();
    this.getCategory(this.$route.params.id);
    if (this.newCategory.parent_id !== 0)
      this.getCategory(this.newCategory.parent_id);
  }
};
</script>

<style scoped>
.multiselect {
  width: 50%;
}</style
>>
