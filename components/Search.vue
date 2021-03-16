<template>
  <div>
    <div
      class="w-full px-5 flex items-center text-xl float-right py-8 font-semibold h-8 bg-black text-white"
    >
      QIDIRIV
      <img
        src="@/assets/images/close.svg"
        class="close-btn absolute right-10 w-4 cursor-pointer"
        alt="close icon"
        @click="$emit('toggleSearch')"
      />
    </div>

    <div class="w-full px-5 ml-auto ">
      <select
        name="category"
        class="w-full  mt-5 py-2 px-2  bg-gray-100"
        id="cars"
        v-model="selectedCategory"
      >
        <option disabled value="">Barcha ketegoriyalar</option>
        <option>Mahalliy mahsulotlar</option>
        <option>Import mahsulotlar</option>
      </select>
      <div class="w-full flex border-b-2 border-gray-200 mb-6">
        <div class="flex w-full py-5">
          <div class="rounded-md  flex w-full  focus:outline">
            <input
              type="search"
              class="py-2 px-3 w-full bg-gray-100 outline-none"
              placeholder="Qidiruv..."
            />
            <button
              type="btn"
              class="w-1/12 bg-gray-100 flex items-center justify-center"
            >
              <img src="../assets/images/search.svg" class="w-5" alt="" />
            </button>
          </div>
        </div>
      </div>

      <p class="text-black mb-5 font-bold">
        QAYSI MAHSULOT KERAK?
      </p>
      <div class="h-screen scroll overflow-y-scroll pb-10">
        <div
          class="flex  mb-5"
          v-for="(product, index) in categories"
          :key="index"
        >
          <a href="#">
            <img
              :src="product.imgUrl"
              class="w-56  md:w-32 md:h-40"
              alt="koylak"
            />
          </a>

          <span class="px-5">
            <h2 class="font-semibold text-gray-400">
              {{ product.cardName }}
            </h2>
            <p class="font-bold text-gray-700 text-lg">
              {{ product.price }}
            </p>
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
      selectedCategory: "",
      categories: [
        {
          imgUrl: require("@/assets/images/koylak.jpg"),
          cardName: "Ayollar ko'ylagi",
          price: "USD 189.000"
        },
        {
          imgUrl: require("@/assets/images/koylak.jpg"),
          cardName: "Ayollar ko'ylagi",
          price: "USD 200.000"
        },
        {
          imgUrl: require("@/assets/images/koylak.jpg"),
          cardName: "Ayollar ko'ylagi",
          price: "USD 183.000"
        },
        {
          imgUrl: require("@/assets/images/koylak.jpg"),
          cardName: "Ayollar ko'ylagi",
          price: "USD 159.000"
        },
        {
          imgUrl: require("@/assets/images/koylak.jpg"),
          cardName: "Ayollar ko'ylagi",
          price: "USD 170.000"
        },
        {
          imgUrl: require("@/assets/images/koylak.jpg"),
          cardName: "Ayollar ko'ylagi",
          price: "USD 189.000"
        }
      ]
    };
  }
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
