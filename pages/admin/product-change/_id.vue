<template>
  <div>
    <div class="flex ">
      <AdminSidebar />
      <div class="px-5 mx-auto w-4/5 pt-10">
        <div
          v-if="showNotification"
          class="fixed z-40 top-0 px-4 py-2 w-2/3 bg-green-400 text-white text-center"
        >
          Mahsulot yaratildi
          <span
            class="absolute right-6 cursor-pointer"
            @click="showNotification = false"
            >X</span
          >
        </div>
        <div
          class="bg-gray-800 text-white py-2 ml-auto px-4 inline-block cursor-pointer"
        >
          <span v-if="!showProductForm" @click="showProductForm = true"
            >Mahsulot qo'shishni ko'rsatish</span
          >
          <span v-if="showProductForm" @click="showProductForm = false"
            >Mahsulot qo'shishni yashirish</span
          >
        </div>
        <div v-if="showProductForm">
          <div class="input-group block my-4">
            <h2 class="text-xl font-bold mb-10 uppercase">Mahsulot qoshish</h2>
            <label for="input" class="block font-bold uppercase text-sm mb-2"
              >Mahsulot nomi</label
            >
            <input
              type="text"
              class="border-2 text-sm w-1/2 py-2 pl-5"
              v-model="product.name"
            />
          </div>
          <div class="my-4 block">
            <label class="block font-bold uppercase text-sm mb-2"
              >Brend nomi</label
            >
            <select
              class="w-1/2 border-2 text-sm py-2 "
              v-model="product.brand"
            >
              <option disabled selected value="">Brand tanlang</option>
              <option
                v-for="brand in brands"
                :value="brand.id"
                :key="brand.id"
                >{{ brand.name }}</option
              >
            </select>
          </div>
          <div class="my-4">
            <label class="block font-bold uppercase text-sm mb-2">tavsif</label>
            <textarea
              class="w-1/2 border-2 text-sm py-2 pl-5"
              v-model="product.description"
            >
            </textarea>
          </div>
          <div class="my-4">
            <label class="block font-bold uppercase text-sm mb-2"
              >katigoriyasi</label
            >
            <select
              class="w-1/2 border-2 text-sm py-2 "
              v-model="product.category"
            >
              <option value="" selected disabled>Kategoriya tanlang</option>
              <option
                class=""
                :value="category.id"
                v-for="category in categories"
                :key="category.id"
                >{{ category.name }}</option
              >
            </select>
          </div>
          <div class="my-4">
            <label class="block font-bold uppercase text-sm mb-2">Import</label>
            <input
              type="checkbox"
              class="border text-sm w-5 h-5 pl-5"
              v-model="product.is_import"
            />
          </div>
          <button
            @click="createProduct"
            class="bg-green-400 text-white py-2 px-4"
          >
            Mahsulot yaratish
          </button>
        </div>
        <div class="pb-10">
          <h2 class="font-bold text-xl uppercase my-8">
            o'zgarishlarni qo'shish
          </h2>
          <div class="my-4">
            <label class="block font-bold uppercase text-sm mb-2"
              >Mahsulot</label
            >
            <select
              class="w-1/2 border-2 text-sm py-2 "
              v-model="productVariation.parent_id"
            >
              <option disabled selected value="">mahsulotni tanlang</option>
              <option
                class=""
                :value="product.id"
                v-for="product in products"
                :key="product.id"
                >ID: {{ product.id }} Nomi: {{ product.name }}</option
              >
            </select>
          </div>
          <div class="my-4">
            <label class="block font-bold uppercase text-sm mb-2">rangi</label>
            <select
              class="w-1/2 border-2 text-sm py-2 "
              v-model="productVariation.color"
            >
              <option disabled selected value="">Rangini tanlang</option>
              <option
                class=""
                :value="color.id"
                v-for="color in colors"
                :key="color.id"
                >{{ color.name }}</option
              >
            </select>
          </div>
          <div class="my-4">
            <label class="block font-bold uppercase text-sm mb-2">soni</label>
            <input
              type="string"
              class="w-1/2 border-2 text-sm  py-2 pl-5"
              v-model="productVariation.quantity"
            />
          </div>
          <div class="my-4">
            <label class="block font-bold uppercase text-sm mb-2"
              >o'lchami</label
            >
            <input
              type="string"
              class="w-1/2 border-2 text-sm py-2 pl-5"
              v-model="productVariation.size"
            />
          </div>
          <div class="my-4">
            <label class="block font-bold uppercase text-sm mb-2">narxi</label>
            <input
              type="string"
              class="w-1/2 border-2 text-sm py-2 pl-5"
              v-model="productVariation.price"
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
                  <img :src="preview" class="object-cover w-full h-full" />
                </div>
                <p class="">Rasm Nomi: {{ image.name }}</p>
                <p class="">Rasm hajmi: {{ image.size / 1024 }}KB</p>
              </div>
            </div>
            <!-- <img src="../assets/images/link.svg" class="w-5 inline-block" /> -->
          </div>
          <div class="my-4">
            <label class="block font-bold uppercase text-sm mb-2"
              >galereya rasmlarini qo'shish</label
            ><input
              type="file"
              accept="image/*"
              multiple="multiple"
              @change="previewMultiImage"
              class="w-1/2 border-2 text-sm py-2 pl-5"
            />
            <div v-if="preview_list.length" class="flex">
              <div
                v-for="(item, index) in preview_list"
                :key="index"
                class="w-56 h-56 mr-4 relative"
              >
                <img :src="item" class="img-fluid object-fit" />
                <span
                  @click="removeImage(index)"
                  class="absolute top-4 right-4 bg-white w-6 h-6 flex items-center justify-center cursor-pointer rounded-full "
                  >X</span
                >
                <p class="mb-0">Fayl Nomi: {{ image_list[index].name }}</p>
                <p>Hajmi: {{ image_list[index].size / 1024 }}KB</p>
              </div>
            </div>
            <!-- <img src="../assets/images/link.svg" class="w-5 inline-block" /> -->
          </div>
          <button
            @click="createVariationProduct"
            class="bg-green-400 text-white py-2 px-4"
          >
            Mahsulot yaratish
          </button>
        </div>
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
      token: "58ef58a77940fd18fa91351c61773eada4859475",
      image: null,
      preview_list: [],
      image_list: [],
      showNotification: false,
      showProductForm: false,
      selectedProduct: {},
      selectedVariation: {},
      categories: [],
      brands: [],
      colors: [],
      products: [],
      product: {
        brand: null,
        category: null,
        name: null,
        description: null,
        is_import: null
      },
      productVariation: {
        parent_id: null,
        size: null,
        color: null,
        price: null,
        quantity: null,
        leng: null,
        variation_image: null
      }
    };
  },
  methods: {
    removeImage(index) {
      console.log(this.preview_list);
      this.preview_list.splice(index, 1);
      this.image_list.splice(index, 1);

      console.log(this.preview_list);
      // console.log(this.preview_list[index]);
    },
    previewImage: function(event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = e => {
          this.preview = e.target.result;
        };
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
    previewMultiImage: function(event) {
      var input = event.target;
      var count = input.files.length;
      var index = 0;
      if (input.files) {
        while (count--) {
          var reader = new FileReader();
          reader.onload = e => {
            this.preview_list.push(e.target.result);
          };
          this.image_list.push(input.files[index]);
          reader.readAsDataURL(input.files[index]);
          index++;
        }
      }
    },
    createProduct() {
      console.log(this.product);
      this.$axios
        .post("product/create/", this.product, {
          headers: {
            Authorization: `Basic ${this.token}`
          }
        })
        .then(res => {
          console.log(res);
          this.showNotification = true;
          var v = this;
          setTimeout(function() {
            v.showNotification = false;
          }, 3000);
          this.getProducts();
        })
        .catch(err => {
          console.log(err);
        });
    },
    createVariationProduct() {
      console.log(this.productVariation);
      this.productVariation.leng = this.image_list.length;
      this.productVariation.variation_image = this.image;
      const formData = new FormData();
      for (let key in this.productVariation) {
        formData.append(key, this.productVariation[key]);
      }
      for (let i = 0; i < this.image_list.length; i++) {
        formData.append(`images${i}`, this.image_list[i]);
      }
      this.$axios
        .post("product/variation-create/", formData, {
          headers: {
            Authorization: `Basic ${this.token}`
          }
        })
        .then(res => {
          console.log(res);
          showNotification = true;
          var v = this;
          setTimeout(function() {
            v.showNotification = false;
          }, 3000);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getProducts() {
      this.$axios
        .get(`product/parent-list/`)
        .then(res => {
          this.products = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getOrder() {
      this.$axios
        .get(`cart/orderbeta-detail/${this.$router.params.id}`)
        .then(res => {
          this.order = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCategories() {
      this.$axios
        .get(`product/category-list/`)
        .then(res => {
          this.categories = res.data;
          console.log(this.categories);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getBrands() {
      this.$axios
        .get(`product/brand-list/`)
        .then(res => {
          this.brands = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getColors() {
      this.$axios
        .get(`product/color-list/`)
        .then(res => {
          this.colors = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getProductVariation() {
      this.$axios
        .get(`product/variation-detail/${this.$route.params.id}`)
        .then(res => {
          this.selectedVariation = res.data;
          this.productVariation = this.selectedVariation;
          this.productVariation.color = this.selectedVariation.color.name;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getProduct() {
      this.$axios
        .get(`product/product-detail/${this.selectedVariation.parent_id}`)
        .then(res => {
          this.selectedProduct = res.data;
          console.log("Selected Product", res.data);
          this.product = this.selectedProduct;
          // this.productVariation.color = this.selectedVariation.color.name;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getCategories();
    this.getBrands();
    this.getColors();
    this.getProducts();
    this.getProductVariation();
    this.getProduct();
  }
};
</script>
