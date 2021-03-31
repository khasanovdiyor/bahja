<template>
  <div>
    <TheContact />
    <TheHeader />
    <div class="px-5 md:px-16 py-6 bg-gray-200 flex flex-col">
      <h2
        class="font-bold sm:text-4xl text-xl self-center "
        @click="changeSlider"
      >
        {{ product.name }}
      </h2>
      <div class="flex justify-between">
        <!-- <div class="flex">
          <star-rating
            :increment="0.5"
            :rating="selectedProduct.rating"
            :show-rating="false"
            :max-rating="5"
            inactive-color="#ccc"
            active-color="gold"
            :star-size="15"
          >
          </star-rating
          ><span class="ml-2">2 ta fikr</span>
        </div> -->
        <div>
          Mavjudligi: <span class="font-bold">bor {{ sliderImages }}</span>
        </div>
      </div>
    </div>
    <div class="px-5 md:px-16 py-10 block md:flex">
      <div class="md:w-1/2 mb-0 lg:mb-10">
        <!-- <splide :options="primaryOptions" ref="primary">
          <splide-slide v-for="slide in sliderImages" :key="slide" class="h-96">
            <img :src="slide" alt="" class="object-cover h-96 w-full" />
          </splide-slide>
        </splide>
        <splide :options="secondaryOptions" ref="secondary">
          <splide-slide v-for="slide in sliderImages" :key="slide" class="h-48">
            <img :src="slide" alt="" class="object-cover" />
          </splide-slide>
        </splide> -->
        <!-- swiper1 -->
        <swiper
          class="swiper gallery-top"
          :options="swiperOptionTop"
          ref="swiperTop"
        >
          <swiper-slide
            class="object-cover object-center"
            v-for="image in sliderImages"
            :key="image"
            :style="{ backgroundImage: 'url(' + image + ')' }"
          >
            <!-- <img :src="image" alt="" class="h-72   object-center" /> -->
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
            v-for="image in sliderImages"
            :key="image"
          >
            <img :src="image" alt="" class="h-24 w-36 object-cover" />
          </swiper-slide>
        </swiper>
      </div>
      <div class="md:ml-10 md:w-1/2 border-b-2 border-gray-200">
        <div class="mb-6 w-full mx-auto lg:mx-0 lg:w-1/2">
          <h4 class="uppercase mb-4">
            Rangi:
            <span class="font-bold capitalize">{{ selectedColor }}</span>
          </h4>
          <div class="flex ">
            <img
              v-for="color in product.available_colors"
              :key="color.color"
              @click="
                selectColor(color.color);
                getFilteredProducts(product.color.id, '');
              "
              :src="color.image"
              class="w-16 h-16 object-cover object-top cursor-pointer mr-2 border-2 border-white filter"
              :class="{
                'border-blue-400': selectedColor == color.color
              }"
            />
          </div>
        </div>
        <div class="w-1/2 ">
          <h4 class="mb-4 uppercase">
            O'lchami:
            <span class="font-bold capitalize">{{ selectedProduct.size }}</span>
          </h4>
          <div class="flex">
            <div
              class="w-10 h-10 inline-flex cursor-pointer items-center justify-center bg-gray-200 border-2 border-white"
              :class="{ 'border-blue-400': selectedSize == size.size }"
              @click="
                selectSize(size.size);
                getSelectedId(product.id);
                getFilteredProducts('', size.size);
              "
              v-for="size in product.variations"
              :key="size"
            >
              {{ size.size }}
            </div>
          </div>
        </div>

        <div class="mt-6 sm:flex items-center border-b-2 border-gray-200 pb-8">
          <span class="flex items-center w-20 h-6  bg-gray-200 mr-8">
            <button v-on:click="decrement()" class="w-6 text-lg font-bold">
              -
            </button>
            <p class="w-6 text-lg text-center">{{ selectedProduct.count }}</p>
            <button v-on:click="increment()" class="w-6 text-lg font-bold">
              +
            </button>
          </span>
          <span class="font-bold text-2xl">500,000 so'm</span>
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
        <!-- <div class="my-6">
          <h3 class="uppercase font-bold mb-2">Xaridorlar fikri</h3>
          <div class="flex">
            <star-rating
              :increment="0.5"
              :rating="selectedProduct.rating"
              :show-rating="false"
              :max-rating="5"
              inactive-color="#ccc"
              active-color="gold"
              :star-size="20"
            >
            </star-rating
            ><span class="mx-2 text-lg">2 ta fikr</span>
            <div
              class="flex ml-auto cursor-pointer"
              @click="showCommentBox = !showCommentBox"
            >
              <img
                src="~/assets/images/comment.svg"
                alt="comment icon"
                class="w-6 mr-2"
              />
              <span>Fikr bildirish</span>
            </div>
          </div>
          <div class="my-6" v-if="showCommentBox">
            <textarea
              name="comment"
              class="bg-gray-200 w-full h-24 py-2 px-4"
              placeholder="Fikringizni shu yerga qoldiring"
            ></textarea>
            <div class="flex justify-between items-center mt-2">
              <star-rating
                :increment="0.5"
                :rating="0"
                :show-rating="false"
                :max-rating="5"
                inactive-color="#ccc"
                active-color="gold"
                :star-size="15"
              >
              </star-rating>
              <button class="bg-black px-4 py-2 text-white">
                Fikr bildirish
              </button>
            </div>
          </div>
          <div>
            <div class="flex justify-between mt-6 mb-2">
              <span class="font-bold text-lg">Mirjahon</span>
              <div class="flex items-center ">
                <span class="text-gray-600 mr-4">3 daqiqa oldin</span>
                <star-rating
                  :increment="0.5"
                  :rating="4"
                  :show-rating="false"
                  :max-rating="5"
                  inactive-color="#ccc"
                  active-color="gold"
                  :star-size="15"
                >
                </star-rating>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet
              molestiae sapiente at qui blanditiis, deleniti repellendus saepe
              autem voluptatum iste rem ut quam eligendi. Cumque nemo tenetur
              possimus inventore minus?
            </p>
          </div>
        </div> -->
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<script>
import global from "~/mixins.js/global.js";
import { directive } from "vue-awesome-swiper";
export default {
  directives: {
    swiper: directive
  },
  mixins: [global],
  data() {
    return {
      currentId: null,
      slides: [],
      swiperOptionTop: {
        loop: true,
        loopedSlides: 5, // looped slides should be the same
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      swiperOptionThumbs: {
        loop: true,
        loopedSlides: 5, // looped slides should be the same
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: "auto",
        touchRatio: 0.2,
        slideToClickedSlide: true
      },
      // slides: [
      //   {
      //     images:
      //       "http://127.0.0.1:8000/media/photo_2020-09-10_09-42-59_oUPy10H.jpg"
      //   },
      //   {
      //     images: "http://127.0.0.1:8000/media/photo_2020-09-10_11-59-44.jpg"
      //   },
      //   {
      //     images: "http://127.0.0.1:8000/media/photo_2020-09-10_11-59-45.jpg"
      //   },
      //   {
      //     images: "http://127.0.0.1:8000/media/photo_2020-09-10_11-59-46.jpg"
      //   }
      // ],
      showCommentBox: false,
      // product: {},
      filteredProducts: [],
      selectedColor: "",
      selectedSize: "",
      product: {},
      sliderImages: [],
      availableColors: [],
      availableSizes: [],
      // product: {},
      selectedProduct: {
        count: 1,
        id: null
      },
      primaryOptions: {
        type: "loop",
        perMove: 1,
        perPage: 1,
        width: 600,
        pagination: false
      },
      secondaryOptions: {
        type: "slide",
        rewind: true,
        width: 600,
        gap: "5px",
        pagination: false,
        fixedWidth: 145,
        fixedHeight: 70,
        cover: true,
        focus: "center",
        isNavigation: true
      }
    };
  },
  // async created() {
  //   this.product = await this.$axios.get(
  //     `product/detail/${this.$route.params.id}`,
  //     {
  //       responseType: "json"
  //     }
  //   );
  // },
  // async asyncData({ params, $axios }) {
  //   const product = await $axios.$get(`product/detail/${params.id}`);
  //   const sliderImages = product.images;
  //   return { product, sliderImages };
  // },
  methods: {
    changeSlider() {
      this.sliderImages = this.product.variations[0].images;
    },
    getSelectedId(id) {
      this.selectedProduct.id = id;
    },
    // async asyncData({ params, $axios }) {
    //   this.product = await $axios.$get(`product/detail/${params.id}`);
    //   console.log("product", this.product);
    //   // return { product };
    // },
    getProduct() {
      this.$axios
        .get(`product/detail/${this.$route.params.id}`)
        .then(res => {
          console.log(res.data);
          this.product = res.data;
          this.sliderImages = this.product.images;
        })
        .catch(err => {
          console.log(err);
        });
      console.log(this.$route.params);
    },

    increment() {
      this.selectedProduct.count++;
    },
    decrement() {
      this.selectedProduct.count--;
    },
    selectColor(colorName) {
      this.selectedColor = colorName;
    },

    selectSize(size) {
      this.selectedSize = size;
    },
    saveToCart() {
      this.saveProduct();
      // console.log("Mahsulot cartga qoshildi!");
      // const products = JSON.parse(localStorage.getItem("products"));
      console.log("Localstorage: ", localStorage.products);
      console.log("Localstorage: ", JSON.parse(localStorage.products));
    },
    saveProduct() {
      let newList = [];
      newList.push(this.selectedProduct);
      console.log("newList.push(this.product);", this.product);
      let old = localStorage.getItem("products");
      console.log("old", old);
      if (old) newList = [...newList, ...JSON.parse(old)];
      console.log("new", newList);
      const parsed = JSON.stringify(newList);
      console.log(JSON.parse(localStorage.getItem(newList)));
      localStorage.setItem("products", parsed);
    }
    // checkProduct() {
    //   let id = this.$route.params.id;
    //   if (id === this.product.id) {
    //     this.sliderImages = this.product.images;
    //   } else {
    //     const product = this.product.variations.find(variation => {
    //       variation.id = id;
    //     });
    //     this.sliderImages = product.images;
    //   }
    // }
  },
  // async created() {
  //   this.products;
  // },
  mounted() {
    this.getProduct();
    // this.$refs.primary.sync(this.$refs.secondary.splide);
    console.log("Localstorage: ", JSON.parse(localStorage.getItem("products")));
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.$swiper;
      const swiperThumbs = this.$refs.swiperThumbs.$swiper;
      swiperTop.controller.control = swiperThumbs;
      swiperThumbs.controller.control = swiperTop;
    });
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
  height: 20%;
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
