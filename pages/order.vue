<template>
  <div>
    <TheContact />
    <TheHeader />
    <div
      v-if="showSuccess"
      class="font-bold flex items-center justify-between text-white bg-black px-4 py-2 text-xl"
    >
      <span class="flex w-3/5 justify-end"> Buyurtmangiz qabul qilindi! </span>
      <span
        @click="showSuccess = false"
        class="w-1/5 cursor-pointer flex justify-end"
        >x</span
      >
    </div>
    <div
      v-if="showFail"
      class="font-bold flex items-center justify-between text-white bg-black px-4 py-2 text-xl"
    >
      <span class="flex w-3/5 justify-end"> Buyurtmangiz qabul qilindi! </span>
      <span
        @click="showFail = false"
        class="w-1/5 cursor-pointer flex justify-end"
        >x</span
      >
    </div>
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
              class="p-2 pl-3 mt-2 w-full bg-gray-200"
              placeholder="Ism"
              v-model="name"
            />
          </div>
          <div>
            <input
              type="text"
              class="p-2 pl-3 mt-2 w-full bg-gray-200"
              v-mask="'+998-##-###-##-##'"
              v-model="phone"
            />
          </div>
        </form>
        <hr class="my-8" />
        <button
          type="submit"
          @click.prevent="sendOrder"
          class="w-1/2 flex items-center justify-center mx-auto text-sm font-semibold uppercase py-6 h-8 bg-black text-white"
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
      phone: "+998",
      showSuccess: false,
      showFail: false,
    };
  },
  methods: {
    sendOrder() {
      const products = JSON.parse(localStorage.getItem("products"));
      let orderData = {
        name: this.name,
        phone_number: this.phone,
        products: products,
      };
      this.$axios
        .post(`cart/orderbeta-create/`, orderData)
        .then((res) => {
          console.log(res);
          let products = [];
          const parsed = JSON.stringify(products);
          localStorage.setItem("products", parsed);
          this.showSuccess = true;
          setTimeout(function () {
            this.showSuccess = false;
          }, 2000);
          this.$router.push("/");
        })
        .catch((err) => {
          this.showFail = true;
          setTimeout(function () {
            this.showFail = false;
          }, 2000);
          console.log(err);
        });
    },
  },
};
</script>
