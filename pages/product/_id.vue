<template>
  <div>
    <div class="px-5 md:px-16 py-6 bg-gray-200 flex flex-col">
      <div class="flex justify-center items-center">
        <h2 class="font-bold sm:text-4xl text-xl self-center">
          {{ product.name }}
        </h2>
        <div class="ml-auto">
          <span v-if="product.quantity > 0"
            ><img
              src="~/assets/images/success.svg"
              alt=""
              class="w-4 inline-block mr-1"
            />Omborda mavjud</span
          >
          <span v-else
            ><img
              src="~/assets/images/cancel.svg"
              alt=""
              class="w-4 inline-block mr-1"
            />
            Omborda mavjud emas</span
          >
        </div>
      </div>
    </div>
    <div class="px-5 md:px-16 mx-auto py-10 block md:flex">
      <div class="md:w-1/2 mb-0 lg:mb-10" v-show="product.images">
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
          <span class="font-bold text-2xl w-32" v-show="product.price">{{
            product.price.toLocaleString()
          }}</span>
          <button
            @click="saveToCart"
            :disabled="product.quantity === 0"
            class="uppercase bg-black text-white py-2 px-4 sm:mx-4"
            :class="{
              'opacity-50': product.quantity === 0,
              'cursor-default': product.quantity === 0
            }"
          >
            Savatchaga qo'shish
          </button>
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
            <div v-for="attr in product.attributes" :key="attr.id">
              <span class="font-bold capitalize">{{ attr.label }}: </span
              ><span class="text-gray-600 uppercase">{{ attr.value }} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import global from "~/mixins.js/global.js";
import slider from "~/mixins.js/slider.js";
export default {
  auth: false,
  layout: "user",
  mixins: [global, slider],
  data() {
    return {
      showSuccess: false,
      showNotification: false,
      message: "",
      showCommentBox: false,
      product: {
        id: null,
        attributes: {},
        variations: []
      },
      product_list: [],
      selectedProduct: {
        product_id: null,
        count: 1
      }
    };
  },
  watch: {
    product: {
      deep: true,
      handler(newVal) {
        this.selectedProduct.product_id = newVal.id;
      }
    }
  },

  methods: {
    getProduct() {
      let loader = this.$loading.show();
      const id = this.$route.params.id;
      this.$axios
        .get(`product/detail/${this.$route.params.id}`)
        .then(res => {
          this.product = Object.assign({}, res.data[0]);
          this.product_list = Array.from(res.data, x => x);
          loader.hide();
        })
        .catch(err => {
          loader.hide();
          console.log(err);
        });
    },
    changeProduct(selected_attrs) {
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
        let selected_product = JSON.parse(JSON.stringify(this.selectedProduct));

        this.$store.dispatch("products/addProductToCart", selected_product);
        this.$toast.success("Mahsulot savatchaga qo'shildi");
      } catch (err) {
        this.$toast.error("Mahsulotni savatchaga qo'shishda xatolik yuz berdi");
      }
    }
  },
  mounted() {
    this.getProduct();
  }
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
