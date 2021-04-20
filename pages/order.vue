<template>
  <div>
    <TheContact />
    <TheHeader />
    <div
      v-if="showSuccess"
      class="flex items-center justify-center w-2/3 mx-auto text-white bg-green-400 px-4 py-2 text-lg"
    >
      <span class="flex w-3/5 justify-center"
        ><i>Buyurtmangiz qabul qilindi!</i></span
      >
    </div>
    <div
      v-if="showFail"
      class="flex items-center justify-center w-2/3 mx-auto text-white bg-red-400 px-4 py-2 text-lg"
    >
      <span class="flex w-3/5 justify-center"
        ><i>Buyurtma berishda xatolik bor qayta urunib ko'ring!</i></span
      >
    </div>
    <div
      v-if="!showMessage"
      class="xl:w-1/3 md:w-1/2 sm:w-3/4 sm:px-0 px-4 mx-auto border-2 my-12 border-gray-200 pb-8"
    >
      <p
        class="w-full px-5 flex items-center py-6 h-8 text-sm mx-auto font-semibold bg-black text-white uppercase"
      ></p>
      <div class="w-full px-5 mx-auto">
        <form class="w-full" method="post" enctype="multipart/form-data">
          <div class="input-group my-8">
            <label for="input" class="font-semibold text-sm uppercase"
              >ismingiz</label
            >
            <input
              type="text"
              class="mt-2 w-full bg-gray-200 border-2 rounded-md text-sm w-1/2 py-2 pl-5"
              placeholder="Ism"
              v-model="name"
            />
          </div>
          <div>
            <label for="input" class="font-semibold text-sm uppercase"
              >telefon raqamingiz</label
            >
            <input
              type="text"
              class="mt-2 w-full bg-gray-200 border-2 rounded-md text-sm w-1/2 py-2 pl-5"
              placeholder="+998-##-###-##-##"
              v-mask="'+###-##-###-##-##'"
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
    <div v-if="showMessage" class="h-96 flex justify-center items-center">
      <div class="text-center">
        <!-- <h3 class="font-bold mx-auto text-xl mb-6">
          Buyurtmangiz qabul qilindi!
        </h3> -->

        <nuxt-link to="/" class="hover:underline  text-xl text-gray-600">
          <b>Bosh menyuga qaytish</b>
        </nuxt-link>
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<script>
import global from "~/mixins.js/global.js";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  mixins: [global],
  data() {
    return {
      showMessage: false,
      name: "",
      phone: "",
      showSuccess: false,
      showFail: false,
      savedProducts: []
    };
  },
  methods: {
    sendOrder() {
      const products = JSON.parse(localStorage.getItem("products"));
      let orderData = {
        name: this.name,
        phone_number: this.phone,
        products: products
      };
      this.$axios
        .post(`cart/orderbeta-create/`, orderData)
        .then(res => {
          console.log(res);
          let products = [];
          const parsed = JSON.stringify(products);
          localStorage.setItem("products", parsed);
          this.showSuccess = true;
          setTimeout(() => {
            this.showSuccess = false;
          }, 3000);
          this.showMessage = true;
        })
        .catch(err => {
          this.showFail = true;
          setTimeout(() => {
            this.showFail = false;
          }, 3000);
          console.log(err);
        });
    }
  },
  mounted() {
    let loader = this.$loading.show();

    if (localStorage.products) {
      let json_string = localStorage.getItem("products");
      if (json_string.length !== 0) {
        this.savedProducts = JSON.parse(json_string);
      }
    }
    loader.hide();
  }
};
</script>
