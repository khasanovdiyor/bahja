<template>
  <!--CONTAINER -->
  <div>
    <div class="relative">
      <!-- SHOWCASE -->
      <div class="mt-10">
        <TheShowcase />
      </div>
      <!-- PRODUCTS -->
      <div class="px-5 lg:px-16 mt-10">
        <div class="sm:flex justify-between sm:text-xl uppercase">
          <div class="flex mb-6 sm:mb-0 lg:w-2/5 justify-between">
            <span class="mr-6 font-bold"> mahsulotlar </span>
          </div>
        </div>

        <div class="">
          <!-- PRODUCTS CONTAINER -->
          <div class="mt-10 flex justify-between flex-wrap">
            <!-- Product card -->
            <nuxt-link
              class="
                mb-6
                mx-auto
                sm:mx-0
                cursor-pointer
                transition
                duration-150
                transform
                hover:scale-105
              "
              :to="'product/' + product.id"
              v-for="product in products"
              :key="product.id"
            >
              <ProductCard :product="product" class="w-64" />
            </nuxt-link>
          </div>
          <div class="py-5">
            <nuxt-link
              to="/products/"
              class="
                w-full
                block
                text-center
                bg-gray-200
                font-bold
                mx-auto
                uppercase
                py-2
                px-4
              "
            >
              Barchasini ko'rish
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <!-- END OF SHOWCASE CONTAINER -->
    <!-- SALES -->
    <!-- TODAY'S HIT -->
    <div class="px-6 md:px-16 pb-10">
      <h2 class="my-10 font-bold text-xl uppercase">Yangi mahsulotlar</h2>
      <swiper class="swiper" ref="swiper" :options="swiperOption">
        <swiper-slide v-for="product in products" :key="product.id"
          ><nuxt-link
            class="
              mb-6
              cursor-pointer
              transition
              duration-150
              transform
              hover:scale-105
            "
            :to="'product/' + product.id"
          >
            <ProductCard
              :product="product"
              class="sm:w-64 w-72 inline-block"
            /> </nuxt-link
        ></swiper-slide>

        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
    <InfoBox />
  </div>
  <!-- END OF CONTAINER -->
</template>

<script>
export default {
  auth: false,
  layout: "user",
  data() {
    return {
      slides: [],
      categorySliders: [],
      savedProducts: [],
      currentImg: 0,
      options: {
        type: "fade",
        autoplay: true,
        loop: true,
        rewind: true,
        perMove: 1,
        width: "100%",
        type: "loop",
        perPage: 4,
        gap: "2rem",
        breakpoints: {
          1180: {
            perPage: 3,
            gap: "4rem"
          },
          900: {
            perPage: 2,
            gap: "2rem"
          },
          550: {
            perPage: 1,
            width: "60%"
          },
          450: {
            perPage: 1,
            width: "80%"
          }
        }
      },
      swiperOption: {
        loop: true,

        direction: "horizontal",
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        breakpoints: {
          1180: {
            slidesPerView: 4,
            spaceBetween: 30
          },
          970: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          880: {
            slidesPerView: 2,
            spaceBetween: 250
          },
          720: {
            slidesPerView: 2,
            spaceBetween: 200
          },
          660: {
            slidesPerView: 2,
            spaceBetween: 120
          },
          600: {
            slidesPerView: 1,
            centeredSlides: true
          }
        }
      },
      products: []
    };
  },
  methods: {
    getProducts() {
      let loader = this.$loading.show();
      this.$axios
        .get("product/list/")
        .then(res => {
          this.products = res.data.results;
          loader.hide();
        })
        .catch(err => {
          loader.hide();
        });
    }
  },
  mounted() {
    this.getProducts();
    if (localStorage.products) {
      let json_string = localStorage.getItem("products");
      if (json_string.length !== 0) {
        this.savedProducts = JSON.parse(json_string);
      }
    }
    setInterval(() => {
      this.currentImg = this.currentImg + 1;
    }, 3000);
  }
};
</script>
<style>
.swiper-button-prev,
.swiper-button-next {
  color: grey;
}
</style>
