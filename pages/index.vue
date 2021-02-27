<template>
  <!--CONTAINER -->
  <div>
    <!-- CONTACT BOX  -->
    <div class="bg-black text-white px-16 flex justify-between py-4">
      <!-- LEFT OF CONTACT BOX -->
      <div class="flex justify-between w-1/2">
        <div class="flex w-1/3 items-center">
          <img src="../assets/images/call.svg" alt="phone" class="w-4 mr-2" />
          <span>+998998998998</span>
        </div>
        <div class="flex w-1/3 items-center">
          <img
            src="../assets/images/location.svg"
            alt="location"
            class="w-4 mr-2"
          />
          <span>Uzbekistan,Tashkent</span>
        </div>
        <div class="flex w-1/3   items-center">
          <img src="../assets/images/clock.svg" alt="clock" class="w-4 mr-2" />
          <span>All week,24/7</span>
        </div>
      </div>
      <!-- RIGHT OF CONTACT BOX -->
      <div class="w-1/2">
        <div class="flex justify-between w-1/6 ml-auto">
          <nuxt-link to="instagram.com"
            ><img
              src="../assets/images/instagram.svg"
              alt="instagram logo"
              class="w-4"
            />
          </nuxt-link>
          <nuxt-link to="telegram.me">
            <img
              src="../assets/images/telegram.svg"
              alt="telegram logo"
              class="w-4"
            />
          </nuxt-link>
        </div>
      </div>
    </div>
    <!-- END OF CONTACT BOX -->

    <!-- SHOWCASE CONTAINER -->
    <div class="">
      <!-- HEADER - NAVIGATION -->
      <div
        class="py-4  px-16 flex items-center justify-between border-b border-black"
      >
        <div>
          <img src="../assets/images/bahja.png" alt="bahja logo" class="w-20" />
        </div>
        <!-- NAVIGATION LINKS -->
        <nav class="w-1/2">
          <ul class="flex justify-between">
            <li>
              <nuxt-link to="mahalliy" class="text-black"
                >Mahalliy mahsulotlar</nuxt-link
              >
            </li>
            <li>
              <nuxt-link to="import" class="text-black"
                >Import mahsulotlar</nuxt-link
              >
            </li>
            <li>
              <nuxt-link to="import" class="text-black"
                >Biz bilan boglaning</nuxt-link
              >
            </li>
          </ul>
        </nav>
        <div class="flex w-1/6 justify-between">
          <img src="../assets/images/loupe.svg" alt="search icon" class="w-6" />
          <img src="../assets/images/user.svg" alt="user icon" class="w-6" />
          <img
            src="../assets/images/shopping-bag.svg"
            alt="shopping bag icon"
            class="w-6"
          />
        </div>
      </div>
      <!-- SHOWCASE -->
      <div class="py-10">
        <div class="grid grid-cols-4 grid-rows-2 gap-4 px-16">
          <div class="row-span-2 col-span-2">
            <splide :options="options">
              <splide-slide v-for="img in images" :key="img">
                <div
                  :style="{ backgroundImage: 'url(' + img + ')' }"
                  class="slider flex items-center justify-center bg-cover"
                >
                  <div class="bg-white px-10 py-5">Some text</div>
                </div>
              </splide-slide>
            </splide>
          </div>
          <div
            class="row-span-1 col-span-1 flex items-center justify-center bg-cover"
            :style="{ backgroundImage: 'url(' + images[3] + ')' }"
          >
            <div class="bg-white px-10 py-5">Some text</div>
          </div>
          <div
            class="row-span-1 col-span-1 flex items-center justify-center bg-cover"
            :style="{ backgroundImage: 'url(' + images[0] + ')' }"
          >
            <div class="bg-white px-10 py-5">Some text</div>
          </div>
          <div
            class="row-span-1 col-span-2 flex items-center justify-center bg-cover"
            :style="{
              backgroundImage: 'url(' + images[1] + ')'
            }"
          >
            <div class="bg-white px-10 py-5">Some text</div>
          </div>
        </div>
        <div class="flex justify-between px-16 py-5">
          <div class="flex items-center justify-between w-1/6">
            <img
              src="../assets/images/truck.svg"
              alt="truck icon"
              class="w-16"
            />
            <div>
              <h3>Title</h3>
              <span>Paragraph text</span>
            </div>
          </div>
          <div class="flex items-center justify-between w-1/6">
            <img
              src="../assets/images/star-badge.svg"
              alt="truck icon"
              class="w-16"
            />
            <div>
              <h3>Title</h3>
              <span>Paragraph text</span>
            </div>
          </div>
          <div class="flex items-center justify-between w-1/6">
            <img
              src="../assets/images/headset.svg"
              alt="truck icon"
              class="w-16"
            />
            <div>
              <h3>Title</h3>
              <span>Paragraph text</span>
            </div>
          </div>
        </div>
      </div>
      <!-- PRODUCTS -->
      <div class="px-16">
        <div>
          <ul class="flex justify-between">
            <li class="uppercase">Yangi mahsulotlar</li>
            <li class="uppercase">Eng ko`p sotilgan</li>
            <li class="uppercase">Chegirma narxlarda</li>
            <li class="uppercase">Taniqli brandlar</li>
          </ul>
        </div>
        <div>
          <div class="mt-10 flex justify-between">
            <!-- Product card -->
            <div
              class="relative w-1/5 shadow py-5"
              v-for="product in products"
              :key="product.id"
            >
              <img :src="product.image" alt="product image" />
              <span class="bg-red-400 px-2 py-1 absolute top-0">{{
                product.sale
              }}</span>
              <span
                v-if="product.isImport"
                class="bg-blue-400 px-2 py-1 absolute top-0 right-0"
                >Import</span
              >
              <div class="pl-5">
                <h4 class="text-gray-600">{{ product.name }}</h4>
                <span class="font-bold">{{ product.priceWithSale }} so'm</span>
                <del>{{ product.price }} so'm</del>

                <star-rating
                  :increment="0.5"
                  :rating="product.rating"
                  :max-rating="5"
                  inactive-color="#ccc"
                  active-color="yellow"
                  :star-size="20"
                >
                </star-rating>
              </div>
            </div>
          </div>
          <div class="py-5">
            <button class="w-full bg-gray-400 mx-auto uppercase py-2 px-4">
              Barchasini ko'rish
            </button>
          </div>
        </div>
        <!-- PRODUCTS CONTAINER -->
      </div>
    </div>
  </div>
  <!-- END OF CONTAINER -->
</template>

<script>
export default {
  data() {
    return {
      images: [
        "https://miro.medium.com/max/10370/1*FbAVZD_gQJtd2FX21S7c5w.jpeg",
        "https://cdn.pixabay.com/photo/2015/07/27/20/21/beauty-863439_960_720.jpg",
        "https://cdn.pixabay.com/photo/2016/08/26/20/44/elan-1623085_960_720.jpg",
        "https://www.coverstory.co.in/media/cms/home/category/work.jpg"
      ],
      products: [
        {
          name: "Adidas Fly N1",
          image:
            "https://cdn.pixabay.com/photo/2016/08/26/20/44/elan-1623085_960_720.jpg",
          price: "400000",
          sale: "50%",
          priceWithSale: "200000",
          rating: 5,
          isImport: true
        },
        {
          name: "Nike Airmax Fly N1",
          image:
            "https://cdn.pixabay.com/photo/2016/08/26/20/44/elan-1623085_960_720.jpg",
          price: "400000",
          sale: "50%",
          priceWithSale: "200000",
          rating: 4,
          isImport: false
        },
        {
          name: "Puma Sky N1",
          image:
            "https://cdn.pixabay.com/photo/2016/08/26/20/44/elan-1623085_960_720.jpg",
          price: "400000",
          sale: "50%",
          priceWithSale: "200000",
          rating: 3.5,
          isImport: true
        },
        {
          name: "Flo Fly N1",
          image:
            "https://cdn.pixabay.com/photo/2016/08/26/20/44/elan-1623085_960_720.jpg",
          price: "400000",
          sale: "50%",
          priceWithSale: "200000",
          rating: 4.5,
          isImport: false
        }
      ],
      options: {
        type: "fade",
        autoplay: true,
        rewind: true,
        width: 800,
        perPage: 1,
        gap: "1rem"
      }
    };
  }
};
</script>

<style>
.slider {
  height: 24rem;
}
</style>
