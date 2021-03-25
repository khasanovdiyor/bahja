<template>
  <div>
    <TheContact />
    <TheHeader />
    <div
      class="xl:w-1/3 md:w-1/2 sm:w-3/4 sm:px-0 px-4 mx-auto border-2 my-8 border-gray-200 pb-8"
    >
      <p
        class="w-full px-5 flex items-center py-6 h-8 text-sm mx-auto font-semibold bg-black text-white uppercase"
      >
        buyurtma
      </p>
      <div class="w-full px-5 mx-auto">
        <form class="w-full" method="post" enctype="multipart/form-data">
          <div class="input-group my-8">
            <label for="input" class="font-semibold text-sm uppercase"
              >ismingiz</label
            >
            <input
              type="text"
              class="p-2 pl-3 mt-2 w-full bg-gray-200 "
              placeholder="Ism"
              v-model="name"
            />
          </div>
          <div class="input-group">
            <label for="input" class="font-semibold text-sm py-5 uppercase"
              >Telefon raqamingiz</label
            >
            <input
              type="tel"
              class="p-2 pl-3 mt-2 w-full bg-gray-200 "
              placeholder="+998-**-***-**-**"
              v-model="phone"
            />
          </div>
        </form>
        <hr class="my-8" />
        <button
          type="submit"
          @click.prevent="sendOrder"
          class="w-1/2 flex items-center justify-center mx-auto text-sm font-semibold uppercase  py-6 h-8 bg-black text-white"
        >
          buyurtma berish
        </button>
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<script>
import global from "~/mixins.js/global.js";
export default {
  mixins: [global],
  data() {
    return {
      name: "",
      phone: "",
      products: [],
      product0: "",
      product1: ""
    };
  },
  mounted() {
    // this.product0 = JSON.parse(localStorage.products)[0].id;
    // this.product1 = JSON.parse(localStorage.products)[0].id;
    // this.products = JSON.parse(localStorage.products);
  },
  methods: {
    sendOrder() {
      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("phone_number", this.phone);
      formData.append("count0", 2);
      formData.append("product0", this.product0);
      formData.append("product1", this.product1);
      formData.append("leng", this.products.length);
      formData.append("count1", 2);

      this.$axios
        .post(`cart/orderbeta-create/`, formData)
        .then(res => {
          console.log(res);
          let products = JSON.parse(localStorage.products);
          products = [];
          const parsed = JSON.stringify(products);
          // console.log(JSON.parse(localStorage.getItem(newList)));
          localStorage.setItem("products", parsed);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
