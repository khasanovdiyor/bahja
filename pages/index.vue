<template>
  <!--CONTAINER -->
  <div>
    <!-- CONTACT BOX  -->
    <TheContact />
    <!-- END OF CONTACT BOX -->

    <!-- SHOWCASE CONTAINER -->
    <div class="">
      <!-- HEADER - NAVIGATION -->
      <TheHeader />
      <!-- SHOWCASE -->
      <div class="py-10">
        <TheShowcase :slides="slides" />
        <div class="py-5 border-b border-black">
          <InfoBox />
        </div>
      </div>
      <!-- PRODUCTS -->
      <div class="px-16">
        <div>
          <ul class="flex justify-between">
            <li class="uppercase font-semibold cursor-pointer">
              Yangi mahsulotlar
            </li>
            <li class="uppercase">Eng ko`p sotilgan</li>
            <li class="uppercase">Chegirma narxlarda</li>
            <li class="uppercase">Taniqli brandlar</li>
          </ul>
        </div>
        <div>
          <!-- PRODUCTS CONTAINER -->
          <div class="mt-10 flex justify-between flex-wrap">
            <!-- Product card -->
            <ProductCard
              v-for="product in products"
              :key="product.image"
              :product="product"
            />
          </div>
          <div class="py-5">
            <button class="w-full bg-gray-400 mx-auto uppercase py-2 px-4">
              Barchasini ko'rish
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- END OF SHOWCASE CONTAINER -->
    <!-- SALES -->
    <div class="px-16 py-10">
      <div class="flex justify-between h-56 pb-16">
        <div
          class="w-2/5 h-full bg-cover flex items-center justify-center"
          :style="{ backgroundImage: 'url(' + slides[3].src + ')' }"
        >
          <div class="bg-white px-10 py-5">Some text</div>
        </div>
        <div
          class="w-2/5 h-full bg-cover flex items-center justify-center"
          :style="{ backgroundImage: 'url(' + slides[1].src + ')' }"
        >
          <div class="bg-white px-10 py-5">Some text</div>
        </div>
      </div>
      <div
        class="h-24rem bg-cover flex items-center justify-center"
        :style="{ backgroundImage: 'url(' + slides[0].src + ')' }"
      >
        <div class="bg-white px-10 py-5">Some text</div>
      </div>
    </div>
    <!-- TODAY'S HIT -->
    <div class="px-16 pb-10">
      <h2 class="my-10 font-bold text-4xl uppercase">
        Bugungi eng qaynoq mahsulotlar
      </h2>
      <splide :options="options" :slides="products">
        <splide-slide
          v-for="product in products"
          :key="product.image"
          class="h-full"
        >
          <ProductCard :product="product" />

          <!-- <div class="bg-white px-10 py-5">Some text</div> -->
        </splide-slide>
      </splide>
    </div>
  </div>
  <!-- END OF CONTAINER -->
</template>

<script>
export default {
  data() {
    return {
      options: {
        type: "fade",
        autoplay: true,
        rewind: true,
        width: "100%",
        type: "loop",
        perPage: 4,
        gap: "2rem"
      },
      slides: [
        {
          src: "https://miro.medium.com/max/10370/1*FbAVZD_gQJtd2FX21S7c5w.jpeg"
        },
        {
          src:
            "https://cdn.pixabay.com/photo/2015/07/27/20/21/beauty-863439_960_720.jpg"
        },
        {
          src:
            "https://cdn.pixabay.com/photo/2016/08/26/20/44/elan-1623085_960_720.jpg"
        },
        {
          src: "https://www.coverstory.co.in/media/cms/home/category/work.jpg"
        }
      ],
      products: [
        {
          name: "Adidas Fly N1",
          image:
            "https://cdn.pixabay.com/photo/2016/03/27/19/31/fashion-1283863_960_720.jpg",
          price: "400000",
          sale: "50%",
          priceWithSale: "200000",
          rating: 5,
          isImport: true
        },
        {
          name: "Nike Airmax Fly N1",
          image:
            "https://cdn.pixabay.com/photo/2016/03/27/19/31/fashion-1283863_960_720.jpg",
          price: "400000",
          sale: "50%",
          priceWithSale: "200000",
          rating: 4,
          isImport: false
        },
        {
          name: "Puma Sky N1",
          image:
            "https://cdn.shophumm.com/humm/uploads/sites/3/Fashion-bright-stylish-woman_Tile-default.jpg",
          price: "400000",
          sale: "50%",
          priceWithSale: "200000",
          rating: 3.5,
          isImport: true
        },
        {
          name: "Flo Fly N1",
          image:
            "https://cdn.shophumm.com/humm/uploads/sites/3/Fashion-bright-stylish-woman_Tile-default.jpg",
          price: "400000",
          sale: "50%",
          priceWithSale: "200000",
          rating: 4.5,
          isImport: false
        }
      ]
    };
  }
};
</script>

<style>
.h-24rem {
  height: 24rem;
}
</style>
