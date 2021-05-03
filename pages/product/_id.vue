<template>
  <div>
    <TheContact />
    <TheHeader :savedProductsProp="savedProducts" />
    <div
      v-if="showNotification"
      class="relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md py-5 pl-6 pr-8 sm:pr-6"
    >
      <div
        class="flex flex-row mx-auto items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0"
      >
        <div class="w-6 h-6">
          <img
            src="~/assets/images/success.svg"
            alt="success"
            class="w-full"
            v-if="showSuccess"
          />
          <img
            src="~/assets/images/success.svg"
            alt="success"
            class="w-full"
            v-else
          />
        </div>
        <div class="font-medium ml-3">
          {{ message }}
        </div>
      </div>
      <div
        @click="showNotification = false"
        class="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </div>
    </div>
    <!-- <div class="px-5 md:px-16 py-6 bg-gray-200 flex flex-col">
      <h2
        class="font-bold sm:text-4xl text-xl self-center"
        @click="changeSlider"
      ></h2>
      <div class="flex justify-end">
        <div>
          <span class="font-bold">Hozirda mavjud</span>
        </div>
      </div>
    </div> -->
    <div class="px-5 md:px-16 py-10 block md:flex">
      <div class="md:w-1/2 mb-0 lg:mb-10" v-if="product.images">
        <swiper
          class="swiper gallery-top"
          :options="swiperOptionTop"
          ref="swiperTop"
        >
          <swiper-slide
            class="object-cover w-full"
            v-for="image in product.images"
            :key="image"
            :style="{ backgroundImage: 'url(' + image + ')' }"
          >
          </swiper-slide>
          <div
            class="swiper-button-next swiper-button-white"
            slot="button-next"
          ></div>
          <div
            class="swiper-button-prev swiper-button-white"
            slot="button-prev"
          ></div>
        </swiper>
        <!-- swiper2 Thumbs -->
        <swiper
          class="swiper gallery-thumbs"
          :options="swiperOptionThumbs"
          ref="swiperThumbs"
        >
          <swiper-slide
            class="object-fit object-center"
            v-for="image in product.images"
            :key="image"
          >
            <img :src="image" alt="" class="h-28 w-40 object-cover" />
          </swiper-slide>
        </swiper>
      </div>
      <div class="md:ml-10 md:w-1/2 border-b-2 border-gray-200">
        <ProductAttributeSelector
          :products="product_list"
          @attribute-changed="changeProduct"
          :product="product"
        />

        <div class="mt-6 sm:flex items-center border-b-2 border-gray-200 pb-8">
          <span class="flex items-center w-20 h-6 bg-gray-200 mr-8">
            <button v-on:click="decrement()" class="w-6 text-lg font-bold">
              -
            </button>
            <p class="w-6 text-lg text-center">{{ selectedProduct.count }}</p>
            <button v-on:click="increment()" class="w-6 text-lg font-bold">
              +
            </button>
          </span>
          <span class="font-bold text-2xl" v-if="product.price">{{
            product.price.toLocaleString()
          }}</span>
          <button
            @click="saveToCart"
            class="uppercase bg-black text-white py-2 px-4 sm:mx-4"
          >
            Savatchaga qo'shish
          </button>
        </div>
        <div class="mt-6 border-b-2 border-gray-200 pb-8">
          <h3 class="font-bold text-xl uppercase mb-6">
            Kafolatlangan xavfsiz to'lov
          </h3>
          <div class="flex">
            <img
              src="~/assets/images/click.png"
              alt="click logo"
              class="w-24 mr-10"
            />
            <img
              src="~/assets/images/payme.svg"
              alt="payme logo"
              class="w-24"
            />
          </div>
        </div>
        <div class="my-6 border-b-2 border-gray-200 pb-8">
          <h3 class="uppercase font-bold mb-2">Maxsulot haqida ma'lumot</h3>
          <p>
            {{ product.description }}
          </p>
        </div>
        <div class="border-b-2 border-gray-200 pb-8">
          <h3 class="uppercase font-bold mb-2">Qo'shimcha ma'lumot</h3>
          <div>
            <div>
              <span class="font-bold">Rangi: </span
              ><span
                v-for="color in product.variations"
                :key="color.id"
                class="text-gray-600"
                >{{ color.name }},
              </span>
            </div>
            <div>
              <span class="font-bold">O'lcham: </span
              ><span
                v-for="size in product.available_sizes"
                :key="size.size"
                class="text-gray-600"
                >{{ size.size }},
              </span>
            </div>
            <div>
              <span class="font-bold">Material: </span
              ><span class="text-gray-600">100% Paxta</span>
            </div>
          </div>
        </div>
        <!-- <ProductReview v-if="false" /> -->
      </div>
    </div>

    <TheFooter />
  </div>
</template>

<script>
import global from "~/mixins.js/global.js";
import slider from "~/mixins.js/slider.js";

export default {
  layout: "user",
  mixins: [global, slider],
  data() {
    return {
      showSuccess: false,
      showNotification: false,
      message: "",
      showCommentBox: false,
      savedProducts: [],
      product: {
        id: null,
        attributes: {},
        variations: [],
      },
      product_list: [],
      selectedProduct: {
        product_id: null,
        count: 1,
      },
    };
  },
  watch: {
    product: {
      deep: true,
      handler(newVal) {
        this.selectedProduct.product_id = newVal.id;
      },
    },
    showNotification(newVal) {
      if (newVal === true)
        setTimeout(() => {
          this.showNotification = false;
        }, 3000);
    },
  },
  methods: {
    getProduct() {
      let loader = this.$loading.show();
      const id = this.$route.params.id;
      console.log("route id", id);
      this.$axios
        .get(`product/detail/${this.$route.params.id}`)
        .then(res => {
          this.makeProductList(res.data);
          console.log("product-list", this.product_list);
          const product = this.product_list.find(function (el) {
            console.log("product.id", el.id, "id", parseInt(id));
            return el.id === parseInt(id);
          });
          this.product = Object.assign({}, product);
          console.log("product", product, "this.product", this.product);
          // this.makeProductList(this.product);
          loader.hide();
        })
        .catch(err => {
          loader.hide();
          console.log(err);
        });
    },
    makeProductList(product) {
      console.log("making product list");
      product.variations.forEach(element => {
        this.product_list.push(element);
      });
      let p = Object.assign({}, product);
      delete p.variations;
      this.product_list.push(p);
    },
    changeProduct(selected_attrs) {
      console.log("changing product by attrs");
      let p = this.findProduct(selected_attrs);
      if (p) {
        Object.assign(this.product, p);
      }
    },
    findProduct(selected_attrs) {
      let found = null;

      this.product_list.forEach(element => {
        if (this.isProperWithAttribute(element, selected_attrs))
          found = element;
      });
      return found;
    },
    isProperWithAttribute(product, attrs) {
      console.log("check prodroper");
      for (const key in product.attributes) {
        if (
          attrs[key] !== undefined &&
          attrs[key] !== product.attributes[key].value
        ) {
          return false;
        }
      }
      return true;
    },
    increment() {
      if (this.selectedProduct.count < this.product.quantity)
        this.selectedProduct.count++;
    },
    decrement() {
      if (this.selectedProduct.count > 1) this.selectedProduct.count--;
    },
    saveToCart() {
      // localStorage dan o'qish
      try {
        let json_string = [];
        if (localStorage.products) {
          json_string = localStorage.getItem("products");
        }

        let ls = [];
        if (json_string.length !== 0) {
          ls = JSON.parse(json_string) || [];
        }

        // make simple object
        let selected_product = JSON.parse(JSON.stringify(this.selectedProduct));
        // product qidirish
        let index = ls.findIndex(
          el =>
            parseInt(el.product_id) === parseInt(selected_product.product_id)
        );

        if (index === -1) {
          ls.push(selected_product);
        } else {
          ls[index].count = selected_product.count;
        }
        this.savedProducts = ls;
        localStorage.setItem("products", JSON.stringify(ls));
        this.showNotification = true;
        this.showSuccess = true;
        this.message = "Mahsulot savatchaga qo'shildi!";
      } catch (err) {
        this.showNotification = true;
        this.showSuccess = false;
        this.message =
          "Mahsulotni savatchaga qo'shishda xatolik yuz berdi," + err;
      }
    },
  },
  mounted() {
    this.getProduct();
    if (localStorage.products) {
      let json_string = localStorage.getItem("products");
      if (json_string.length !== 0) {
        this.savedProducts = JSON.parse(json_string);
      }
    }

    // this.changeProduct(selected_attrs);
  },
};
</script>

<style scoped>
.filter {
  opacity: 0.5;
  cursor: default;
}
.gallery-top {
  height: 50%;
  width: 100%;
}
.gallery-thumbs {
  height: 25%;
  box-sizing: border-box;
  padding: 0;
}
.gallery-thumbs .swiper-slide {
  width: 30%;
  height: 100%;
}
.gallery-thumbs .swiper-slide-active {
  opacity: 1;
}
</style>
