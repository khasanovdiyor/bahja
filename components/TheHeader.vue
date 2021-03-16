<template>
  <div
    class="py-4 px-5 md:px-16 block md:flex items-center justify-between border-b border-black"
  >
    <div class="">
      <img src="@/assets/images/bahja.png" alt="bahja logo" class="w-20" />
    </div>

    <!-- NAVIGATION LINKS -->
    <nav class="w-1/3 ">
      <ul class="flex justify-between">
        <li>
          <nuxt-link to="mahalliy" class="font-semibold"
            >Mahalliy mahsulotlar</nuxt-link
          >
        </li>
        <li>
          <nuxt-link to="import" class="font-semibold"
            >Import mahsulotlar</nuxt-link
          >
        </li>
      </ul>
    </nav>
    <div class="flex w-1/6 justify-between ">
      <img
        src="@/assets/images/loupe.svg"
        alt="search icon"
        class="w-6 cursor-pointer ml-auto mr-4"
        @click="toggleSearch"
      />
      <!-- <img src="@/assets/images/user.svg" alt="user icon" class="w-6" /> -->
      <img
        src="@/assets/images/shopping-bag.svg"
        alt="shopping bag icon"
        class="w-6 cursor-pointer"
        @click="toggleCard"
      />
      <transition name="slide">
        <div class="slidein" v-if="showCard">
          <TheShoppingCart @toggleCard="toggleCard" />
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
export default {
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
