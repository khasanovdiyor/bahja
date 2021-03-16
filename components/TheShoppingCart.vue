<template>
  <div>
    <div
      class="w-full relative px-5 flex text-xl items-center float-right py-8 font-semibold h-8 bg-black text-white"
    >
      SHOPPING CART
      <img
        src="@/assets/images/close.svg"
        class="close-btn absolute right-10 w-4 cursor-pointer"
        alt="close icon"
        @click="$emit('toggleCard')"
      />
    </div>

    <div class="mb-5 w-full px-5 ml-auto">
      <div class=" w-full py-5 scroll mt-12 overflow-y-scroll">
        <div
          class="flex mb-5"
          v-for="(product, index) in categories"
          :key="index"
        >
          <a href="#">
            <img
              :src="product.imgUrl"
              class="w-56  md:w-32 md:h-32"
              alt="koylak"
            />
          </a>

          <span class="w-full px-5">
            <h2 class="font-semibold text-gray-400">
              {{ product.cardName }}
            </h2>
            <p class="text-sm font-bold text-gray-600">
              {{ product.colorName }}, {{ product.size }}
            </p>

            <div class="flex mt-8">
              <span class="flex items-center  h-6  bg-gray-200">
                <button v-on:click="countInc()" class="w-6 text-lg font-bold">
                  -
                </button>
                <p class="w-6 text-lg text-center">{{ count }}</p>
                <button v-on:click="countDeInc()" class="w-6 text-lg font-bold">
                  +
                </button>
              </span>

              <p class="font-bold ml-5 text-gray-700 text-lg">
                {{ product.price }} UZS
              </p>
              <img
                class="w-5 ml-auto cursor-pointer"
                src="../assets/images/delete.svg"
                alt="o'chirish"
                value="o'chirish"
              />
            </div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,

      categories: [
        {
          id: 1,
          imgUrl: require("@/assets/images/koylak.jpg"),
          cardName: "Ayollar ko'ylagi",
          colorName: "Ko'k",
          size: "X",
          price: "189,000"
        },
        {
          id: 2,
          imgUrl: require("@/assets/images/koylak.jpg"),
          cardName: "Ayollar ko'ylagi",
          colorName: "Qizil",
          size: "XL",
          price: "200,000"
        },
        {
          id: 3,
          imgUrl: require("@/assets/images/koylak.jpg"),
          cardName: "Ayollar ko'ylagi",
          colorName: "Yashil",
          size: "S",
          price: "183,000"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style>
.scroll::-webkit-scrollbar {
  width: 5px;
}
.scroll::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 20px;
}
::-webkit-scrollbar-track {
  background: #dbdada;
  border-radius: 10px;
}
</style>
