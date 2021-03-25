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
          <nuxt-link to="/products/mahalliy" class="font-semibold"
            >Mahalliy mahsulotlar</nuxt-link
          >
        </li>
        <li>
          <nuxt-link to="/products/import" class="font-semibold"
            >Import mahsulotlar</nuxt-link
          >
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
          <TheShoppingCart
            @toggleCard="toggleCard"
            :products="this.selectedProducts"
          />
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
  mounted() {},
  data() {
    return {
      showCard: false,
      showSearch: false
    };
  },
  methods: {
    toggleSearch() {
      this.showSearch = !this.showSearch;
    },
    toggleCard() {
      this.showCard = !this.showCard;
    }
    // getSelectedProducts() {
    //   let products = JSON.parse(localStorage.products);
    //   for (let i = 0; i < products.length; i++) {
    //     let id = products[i].id;
    //     // console.log(products, id);
    //     this.$axios
    //       .get(`product/variation-detail/${id}`)
    //       .then(res => {
    //         // console.log(res.data);
    //         this.product = res.data;
    //         this.selectedProducts.push(res.data);
    //         console.log("selected products", this.selectedProducts);
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
    //   }
    //   // console.log("global:", this.selectedProducts);
    // }
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
