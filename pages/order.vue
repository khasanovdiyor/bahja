<template>
  <div>
    <TheContact />
    <TheHeader />
    <div
      v-if="showSuccess"
      class="flex items-center mx-auto z-40 py-2 w-9/12 bg-green-500 text-lg text-white"
    >
      <svg viewBox="0 0 40 40" class="w-6 h-6 fill-current mx-5">
        <path
          d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"
        ></path>
      </svg>

      <i> Buyurtmangiz qabul qilindi</i>

      <span class="absolute right-6 cursor-pointer" @click="showSuccess = false"
        >X</span
      >
    </div>
    <div
      v-if="showFail"
      class="flex items-center mx-auto z-100 py-2 w-9/12 bg-red-500 text-lg text-white"
    >
      <svg viewBox="0 0 40 40" class="w-6 h-6 fill-current mx-5">
        <path
          d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z"
        ></path>
      </svg>
      <i> Savatchada mahsulot yo'q</i>

      <span
        class="absolute font-bold right-6 cursor-pointer"
        @click="showFail = false"
        >X</span
      >
    </div>
    <div
      v-if="!showMessage"
      class="xl:w-1/3 md:w-1/2 sm:w-3/4 sm:px-0 px-4 mx-auto border-2 my-12 border-gray-200 pb-8"
    >
      <div class="w-full px-5 mx-auto">
        <form class="w-full" method="post" enctype="multipart/form-data">
          <div class="input-group my-8">
            <label for="input" class="font-semibold text-sm uppercase"
              >ismingiz</label
            >
            <input
              type="text"
              id="username"
              required
              class="mt-2 w-full bg-gray-200 border-2 rounded-md text-sm w-1/2 py-2 pl-5"
              placeholder="Ism"
              v-model="name"
            />
            <div
              class="text-red-400 text-sm"
              v-if="!$v.order.name.required && $v.order.name.$dirty"
            >
              <i>To'ldirish shart</i>
            </div>
            <div class="text-red-400" v-if="!$v.order.name.minLength"></div>
          </div>
          <div>
            <label for="input" class="font-semibold text-sm uppercase"
              >telefon raqamingiz</label
            >
            <input
              type="text"
              id=""
              class="mt-2 w-full bg-gray-200 border-2 rounded-md text-sm w-1/2 py-2 pl-5"
              v-mask="'+### ## ### ## ##'"
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

        <nuxt-link to="/" class="">
          <img src="~/assets/images/bahja.png" alt="" class="w-32 ml-14 mb-5" />
          <b class="hover:underline text-xl text-gray-600"
            >Bosh sahifaga qaytish</b
          >
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
  layout: "user",
  mixins: [global],
  data() {
    return {
      showMessage: false,
      errors: [],
      name: "",
      phone: "",
      showSuccess: false,
      showFail: false,
      savedProducts: [],
    };
  },
  seletedCategories: {
    name: "",
    phone_number: "",
    status: "",

    categories: [],
    order: {
      name: null,
      phone_number: null,
    },
  },
  validations: {
    order: {
      name: {
        required,
        minLength: minLength(3),
      },
      phone_number: {
        required,
      },
      order: {
        required,
      },
    },
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
    },

    checkForm: function (e) {
      if (this.name && this.phone_number) {
        return true;
      }

      this.errors = [];

      if (!this.name) {
        this.errors.push("Name required.");
      }
      if (!this.phone_number) {
        this.errors.push("phone_number required.");
      }

      e.preventDefault();
    },
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
  },
};
</script>
