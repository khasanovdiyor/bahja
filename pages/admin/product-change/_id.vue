<template>
  <div>
    <div class="flex">
      <AdminSidebar class="w-1/3" />
      <div class="px-5 mx-auto w-4/5 pt-10 bg-gray-100">
        <div
          v-if="showSuccess"
          class="fixed z-40 top-0 px-4 py-2 w-2/3 text-lg bg-green-400 text-white text-center"
        >
          <i> Mahsulot yangilandi</i>

          <span
            class="absolute right-6 cursor-pointer"
            @click="showSuccess = false"
            >X</span
          >
        </div>
        <div
          v-if="showSuccess"
          class="fixed z-40 top-0 px-4 py-2 w-2/3 text-lg bg-red-400 text-white text-center"
        >
          <i> Mahsulot yangilashda xatolik yuz berdi, qayta urinib ko'ring</i>

          <span
            class="absolute right-6 cursor-pointer"
            @click="showSuccess = false"
            >X</span
          >
        </div>
        <div name="Mahsulot qo'shish">
          <h2 class="text-xl font-bold text-gray-700">
            Mahsulot o'zgartirish {{ this.newProduct }}
          </h2>

          <div>
            <div class="input-group block my-4">
              <label
                for="input"
                class="block font-bold text-gray-500 uppercase text-sm mb-2"
                >Mahsulot nomi</label
              >
              <input
                type="text"
                class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
                v-model="newProduct.name"
              />
            </div>
            <div class="input-group block my-4">
              <label
                for="input"
                class="block font-bold text-gray-500 uppercase text-sm mb-2"
                >Mahsulot kodi</label
              >
              <input
                type="text"
                class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
                v-model="newProduct.product_code"
              />
            </div>
            <div class="my-4">
              <label
                class="block font-bold text-gray-500 uppercase text-sm mb-2"
                >tavsif</label
              >
              <textarea
                class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
                v-model="newProduct.description"
              >
              </textarea>
            </div>
            <div class="my-4">
              <label class="w-1/2 block font-bold uppercase text-sm mb-2"
                >kategoriyasi {{ newCategories }}</label
              >
              <multiselect
                v-model="newCategories"
                tag-placeholder="Ushbu kategoriayni qo'shing"
                placeholder="Kategoriya izlang yoki qo'shing"
                label="name"
                track-by="id"
                :options="categories"
                :multiple="true"
                @tag="addTag"
                @select="addCategory"
                @remove="removeCategory"
              ></multiselect>
            </div>
            <div class="my-4">
              <label
                class="block font-bold text-gray-500 uppercase text-sm mb-2"
                >soni</label
              >
              <input
                type="string"
                class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
                v-model="newProduct.quantity"
              />
            </div>
            <div class="my-4">
              <label
                class="block font-bold text-gray-500 uppercase text-sm mb-2"
                >narxi</label
              >
              <input
                type="string"
                class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
                v-model="newProduct.price"
              />
            </div>
            <div class="my-4">
              <label
                class="block font-bold text-gray-500 uppercase text-sm mb-2"
                >rasm qo'yish {{ newCategories }}</label
              ><input
                type="file"
                accept="image/*"
                @change="previewProductImage"
                class="border-2 rounded-md bg-white text-sm w-1/2 py-2 pl-5"
              />
              <div v-if="image">
                <div>
                  <div class="w-56 h-56 my-5">
                    <img
                      :src="image"
                      class="object-cover object-top w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="my-4">
              <label
                class="block font-bold text-gray-500 uppercase text-sm mb-2"
                >galereya rasmlarini qo'shish</label
              ><input
                type="file"
                accept="image/*"
                multiple="multiple"
                @change="previewProductMultiImage"
                class="border-2 rounded-md bg-white text-sm w-1/2 py-2 pl-5"
              />
              <div v-if="newImages" class="flex">
                <div
                  v-for="(item, index) in newImages"
                  :key="index"
                  class="w-56 h-56 mr-4 relative"
                >
                  <img
                    :src="item"
                    class="object-cover object-top w-full h-full"
                  />
                  <span
                    @click="removeImage(index)"
                    class="absolute top-4 right-4 bg-white w-6 h-6 flex items-center justify-center cursor-pointer rounded-full"
                    >X</span
                  >
                </div>
              </div>
              <!-- <img src="~/assets/images/link.svg" class="w-5 inline-block" /> -->
            </div>
            <div class="">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-200">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                    >
                      is main
                    </th>

                    <th
                      scope="col"
                      class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                    >
                      key
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                    >
                      label
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                    >
                      value
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                    >
                      qo'shish/o'chirish
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white">
                  <tr
                    class="border"
                    v-for="(attr, index) in newAttributes"
                    :key="index"
                  >
                    <td class="px-6 py-1 border">
                      <div class="flex items-center text-gray-500">
                        <input
                          type="checkbox"
                          class="border w-full text-sm w-5 h-5 pl-5"
                          v-model="attr.is_main"
                        />
                      </div>
                    </td>

                    <td class="px-6 py-1 border">
                      <div class="flex items-center text-sm">
                        {{ attr.key }}
                      </div>
                    </td>
                    <td class="px-6 py-1 border">
                      <div class="flex items-center text-sm">
                        <input
                          type="text"
                          class="text-sm py-2 pl-5"
                          v-model="attr.label"
                        />
                      </div>
                    </td>
                    <td class="px-6 py-1 border">
                      <div class="flex items-center text-sm">
                        <input
                          type="text"
                          class="text-sm py-2 pl-5"
                          v-model="attr.value"
                        />
                      </div>
                    </td>
                    <td class="px-2 py-1 border">
                      <div class="flex items-center text-sm justify-between">
                        <div
                          @click="removeAttribute(product, index)"
                          class="cursor-pointer hover:underline"
                        >
                          <img
                            src="~/assets/images/delete.svg"
                            alt=""
                            class="w-6 ml-5"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="border" v-if="showAddNewKey">
                    <td class="px-6 py-1 border">
                      <div class="flex items-center text-sm">
                        <input
                          type="checkbox"
                          class="border w-full text-sm w-5 h-5 pl-5"
                          v-model="attribute.is_main"
                        />
                      </div>
                    </td>

                    <td class="px-6 py-1 border">
                      <div class="flex items-center text-sm">
                        <input
                          type="text"
                          class="text-sm py-2 pl-5"
                          v-model="attribute.key"
                        />
                      </div>
                    </td>
                    <td class="px-6 py-1 border">
                      <div class="flex items-center text-sm">
                        <input
                          type="text"
                          class="text-sm py-2 pl-5"
                          v-model="attribute.label"
                        />
                      </div>
                    </td>
                    <td class="px-6 py-1 border">
                      <div class="flex items-center text-sm">
                        <input
                          type="text"
                          class="text-sm py-2 pl-5"
                          v-model="attribute.value"
                        />
                      </div>
                    </td>
                    <td class="px-6 py-1 border">
                      <div class="flex items-center text-sm justify-center">
                        <div
                          @click="addProductAttribute"
                          class="cursor-pointer hover:underline"
                        >
                          Qo'shish
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                @click="showAddNewKey = true"
                class="block bg-gray-800 w-24 text-sm text-center rounded-md px-3 text-white my-5 py-2 mb-5"
              >
                Qo'shish
              </div>
            </div>
            <button
              @click="sendAll"
              class="block bg-gray-800 text-sm text-center rounded-md px-3 text-white py-2 mb-5"
            >
              Ma'lumotlarni yangilash
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AdminSidebar from "~/components/admin/AdminSidebar.vue";
export default {
  components: {
    AdminSidebar,
  },
  data() {
    return {
      newImage: null,
      showSuccess: false,
      showFail: false,
      showProductForm: false,
      showAddNewKey: false,
      showDeleteDialog: false,
      selectedProduct: {},
      newCategories: [],
      image: null,
      newImages: [],
      images: [],
      deletedImages: [],
      newProduct: {},
      categories: [],
      brands: [],
      product: {},
      attribute: {
        is_main: false,
        key: null,
        label: null,
        value: null,
        id: 0,
      },
      newAttributes: [],
    };
  },
  methods: {
    addCategory(value, id) {
      this.newCategories.push(value.id);
    },
    removeCategory(value, id) {
      console.log("value.id", value.id);
      this.newCategories = this.newCategories.filter(
        (category) => category !== value.id
      );
    },
    addProductAttribute() {
      this.newAttributes.push(this.attribute);
      this.attribute = {};
      this.showAddNewKey = false;
    },
    removeAttribute(product, index) {
      this.newAttributes.splice(index, 1);
    },
    addTag(newTag) {
      this.selectedCategories.push(newTag);
    },
    removeImage(index) {
      this.deletedImages.push(this.newImages[index]);
      console.log(this.preview_list);
      this.newImages.splice(index, 1);
    },
    previewProductImage(event) {
      var input = event.target;
      this.newProduct.image = input.files[0];
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.product.image = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    previewProductMultiImage(event) {
      var input = event.target;
      var count = input.files.length;
      var index = 0;
      if (input.files) {
        while (count--) {
          var reader = new FileReader();
          reader.onload = (e) => {
            this.newImages.push(e.target.result);
            this.images.push(e.target.result);
          };
          reader.readAsDataURL(input.files[index]);
          index++;
        }
      }
      console.log("this.product:", this.product);
    },
    updateProduct() {
      const formData = new FormData();
      formData.append("name", this.newProduct.name);
      formData.append("description", this.newProduct.description);
      formData.append("product_code", this.newProduct.product_code);
      formData.append("price", this.newProduct.price);
      formData.append("quantity", this.newProduct.quantity);
      formData.append("image", this.newImage);
      this.$axios
        .patch(`product/update/${this.$route.params.id}`, this.newProduct)
        .then((res) => {
          console.log(res);
          this.showSuccess = true;
          setTimeout(function () {
            this.showSuccess = false;
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateCategory() {
      let category = {
        product: this.$route.params.id,
        categories: this.newCategories,
      };
      this.$axios
        .post("product/update-category/", category)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateImages() {
      let images = {
        product: this.$route.params.id,
        images: this.images,
        deleted_images: this.deletedImages,
      };
      this.$axios
        .post("product/update-images/", images)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateAttributes() {
      let attributes = {
        product: parseInt(this.$route.params.id),
        attributes: this.newAttributes,
      };
      this.$axios
        .post("product/update-attributes/", attributes)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    sendAll() {
      let loader = this.$loading.show();
      this.updateProduct();
      this.updateCategory();
      this.updateImages();
      this.updateAttributes();
      loader.hide();
    },
    getProduct() {
      this.$axios
        .get(`product/detail/${this.$route.params.id}`)
        .then((res) => {
          res.data.categories.forEach((element) => {});
          this.image = res.data.image;
          let i = 0;
          for (const key1 in res.data.attributes) {
            let attribute = {};
            attribute.key = Object.keys(res.data.attributes)[i];
            i++;
            for (const key2 in res.data.attributes[key1]) {
              attribute[key2] = res.data.attributes[key1][key2];
            }
            this.newAttributes.push(attribute);
          }
          this.newProduct = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getProduct();
    this.getCategories();
  },
};
</script>
<style scoped>
div.multiselect {
  width: 50%;
}
</style>
