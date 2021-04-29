<template>
  <!--CONTAINER -->
  <div>
    <!-- CONTACT BOX  -->
    <!-- END OF CONTACT BOX -->
            <!-- SHOWCASE CONTAINER -->
    <div class="relative">
      <!-- HEADER - NAVIGATION -->
      <div class="">
        <div class="w-full bg-white">
          <TheContact />
          <TheHeader />
        </div>
      </div>

      <!-- SHOWCASE -->
      <div class="mt-10">
        <TheShowcase />
      </div>
      <!-- PRODUCTS -->
      <div class="px-5 lg:px-16 mt-10">
        <div class="sm:flex justify-between sm:text-xl uppercase">
          <div class="flex mb-6 sm:mb-0 lg:w-2/5 justify-between">
            <span class="mr-6 font-bold"> Yangi mahsulotlar </span>
          </div>
        </div>

        <div>
          <!-- PRODUCTS CONTAINER -->
          <div class="mt-10 flex gap-16 flex-wrap content-start">
            <!-- Product card -->
            <nuxt-link
              class="mb-6 mx-auto sm:mx-0 cursor-pointer transition duration-150 transform hover:scale-105"
              :to="'product/' + product.id"
              v-for="product in products"
              :key="product.id"
            >
              <ProductCard :product="product" class="w-64 " />
            </nuxt-link>
          </div>
          <div class="py-5">
            <nuxt-link
              to="/products/"
              class="w-full block text-center bg-gray-200 font-bold mx-auto uppercase py-2 px-4"
            >
              Barchasini ko'rish
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <!-- END OF SHOWCASE CONTAINER -->
    <!-- SALES -->
    <!-- <div class="px-5 md:px-16 py-10">
      <div class="flex justify-between h-56 pb-16">
        <div
          class="w-2/5 h-full bg-cover flex items-center justify-center"
          :style="{ backgroundImage: 'url(' + slides[3].image + ')' }"
        >
          <div class="bg-white px-10 py-5">Some text</div>
        </div>
        <div
          class="w-2/5 h-full bg-cover flex items-center justify-center"
          :style="{ backgroundImage: 'url(' + slides[1].image + ')' }"
        >
          <div class="bg-white px-10 py-5">Some text</div>
        </div>
      </div>
      <div
        class="h-24rem bg-cover flex items-center justify-center"
        :style="{ backgroundImage: 'url(' + slides[0].image + ')' }"
      >
        <div class="bg-white px-10 py-5">Some text</div>
      </div>
    </div> -->
    <!-- TODAY'S HIT -->
    <div class="px-6 md:px-16 pb-10">
      <h2 class="my-10 font-bold text-xl uppercase">ommabop tovarlar</h2>
      <splide :options="options" :slides="products" class="mx-auto  ">
        <splide-slide
          v-for="product in products"
          :key="product.id"
          class="h-full"
        >
          <nuxt-link
            class="mb-6 cursor-pointer transition duration-150 transform hover:scale-105"
            :to="'product/' + product.id"
          >
            <ProductCard
              :product="product"
              class="sm:w-64 w-72 inline-block"
            />
          </nuxt-link>

          <!-- <div class="bg-white px-10 py-5">Some text</div> -->
        </splide-slide>
      </splide>
    </div>
    <InfoBox />
    <TheFooter />
  </div>
  <!-- END OF CONTAINER -->
</template>

<script>
import Login from '../components/Login.vue';
export default {
  components: { Login },
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
      products: []
    };
  },
  methods: {
    getProducts() {
      let loader = this.$loading.show();
      this.$axios
        .get("product/list/")
        .then(res => {
          console.log("variation-list", res.data);
          this.products = res.data.results;
          loader.hide();
        })
        .catch(err => {
          loader.hide();
          console.log(err);
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
.h-24rem {
  height: 24rem;
}
</style>
