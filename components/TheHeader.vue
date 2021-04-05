<template>
  <div
    class="py-4 px-5 md:px-16   block sm:flex items-center justify-between border-b border-black"
  >
    <div class="my-2 sm:my-0 w-1/2 sm:w-auto">
      <nuxt-link to="/" class="cursor-pointer">
        <img src="@/assets/images/bahja.png" alt="bahja logo" class="w-20" />
      </nuxt-link>
    </div>

    <!-- NAVIGATION LINKS -->
    <nav class="md:w-1/3  my-2 sm:my-0 w-full sm:w-3/4">
      <ul class="flex justify-between">
        <li>
          <nuxt-link to="/products/mahalliy" class="font-semibold">
            Mahalliy mahsulotlar
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/products/import" class="font-semibold">
            Import mahsulotlar
          </nuxt-link>
        </li>
      </ul>
    </nav>
    <div class="flex sm:w-1/6 w-full justify-between">
      <img
        src="@/assets/images/loupe.svg"
        alt="search icon"
        class="w-6 cursor-pointer sm:ml-auto mr-4"
        @click="toggleSearch"
      />
      <!-- <img src="@/assets/images/user.svg" alt="user icon" class="w-6" /> -->
      <img
        src="@/assets/images/shopping-bag.svg"
        alt="shopping bag icon"
        class="w-6 cursor-pointer"
        @click="toggleCard()"
      />
      <transition name="slide">
        <div class="slidein" v-if="showCard">
          <TheShoppingCart @toggleCard="toggleCard" :products="savedProducts" />
        </div>
      </transition>
      <transition name="slide">
        <div class="slidein" v-if="showSearch">
          <Search @toggleSearch="toggleSearch" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import global from "~/mixins.js/global.js";
export default {
  mixins: [global],
  data() {
    return {
      savedProducts: [],
      showCard: false,
      showSearch: false,
      product: {}
    };
  },
  methods: {
    toggleSearch() {
      this.showSearch = !this.showSearch;
    },
    toggleCard() {
      this.getProducts();
      this.showCard = !this.showCard;
    },
    getProducts() {
      const savedProducts = JSON.parse(localStorage.getItem("products"));
      savedProducts.forEach(element => {
        this.$axios
          .get(`product/specific/${element.product_id}`)
          .then(res => {
            this.product = res.data;
            this.product.count = element.count;
            this.savedProducts.push(this.product);
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  }
};
</script>

<style scoped>
.slidein {
  width: 500px;
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  height: 100%;
  background: white;
  box-shadow: 1px 1px 10px rgba(124, 87, 87, 0.5);
  transition: all 0.5s ease-in-out;
}

/* before the element is shown, start off the screen to the right */
.slide-enter,
.slide-leave-active {
  right: -100%;
}
</style>
