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

    <client-only>
      <div class="px-6 md:px-16 pb-10">
        <h2 class="my-10 font-bold text-xl uppercase">Yangi mahsulotlar</h2>
        <hooper :settings="hooperSettings" style="height: 380px">
          <slide
            v-for="(product, idx) in products"
            :key="product.id"
            :index="idx"
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
              />
            </nuxt-link>
          </slide>
          <hooper-navigation slot="hooper-addons"></hooper-navigation>
        </hooper>
      </div>
    </client-only>
    <InfoBox />
  </div>
  <!-- END OF CONTAINER -->
</template>

<script>
import { Hooper, Slide, Navigation as HooperNavigation } from "hooper";
import "hooper/dist/hooper.css";
export default {
  auth: false,
  layout: "user",
  components: {
    Hooper,
    Slide,
    HooperNavigation
  },
  data() {
    return {
      slides: [],
      categorySliders: [],
      savedProducts: [],
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
      hooperSettings: {
        itemsToShow: 1,
        infiniteScroll: true,
        breakpoints: {
          640: {
            itemsToShow: 2,
            centerMode: true
          },
          900: {
            itemsToShow: 3,
            centerMode: true
          },
          1200: {
            itemsToShow: 4,
            centerMode: true
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
  }
};
</script>
<style>
.swiper-button-prev,
.swiper-button-next {
  color: grey;
}
button.hooper-prev svg,
button.hooper-next svg {
  width: 3rem !important;
  height: 4rem !important;
  fill: rgb(179, 179, 179);
}
@media screen and (max-width: 640px) {
  .hooper-slide {
    margin: 0 auto !important;
    width: 500px !important;
  }
}
</style>
