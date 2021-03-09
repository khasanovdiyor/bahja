<template>
  <div>
    <div
      class="w-full md:w-1/3 px-5 flex items-center float-right pl-5 font-semibold h-8 bg-gray-700  text-gray-400"
    >
      QIDIRIV
    </div>

    <div class="w-full md:w-1/3 px-5 ml-auto border-2 border-gray-300">
      <select
        name="category"
        class="w-full  mt-5 p-1 pl-3 rounded-md border-2 border-gray-300 bg-gray-100"
        id="cars"
        v-model="selectedCategory"
      >
        <option disabled value="">Barcha ketegoriyalar</option>
        <option>Ayollar</option>
        <option>Erkaklar</option>
        <option>Aksessuarlar</option>
      </select>
      <div class="w-full right-0 flex">
        <form class="searchbar w-full">
          <div class="flex searchbar-input py-5">
            <span class="rounded-md border-2 flex w-full border-gray-300 ">
              <input
                type="search"
                class="p-1 pl-3 w-11/12 bg-gray-100 focus:outline-none "
                placeholder="Qidiruv..."
              />
              <button type="btn" class="w-1/12 bg-gray-100 focus:outline-none">
                <img src="../assets/images/search.svg" class="w-5" alt="" />
              </button>
            </span>
          </div>
        </form>
      </div>

      <hr class="mb-4" />
      <p class="text-gray-700 mb-5 font-bold">
        QAYSI MAHSULOT KERAK?
      </p>
      <div class="h-56 scroll overflow-y-scroll">
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
            <h2 class="font-semibold text-gray-600">
              {{ product.cardName }}
            </h2>
            <p class="font-bold text-gray-700 text-lg">{{ product.price }}</p>
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
