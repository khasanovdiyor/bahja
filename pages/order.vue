<template>
  <div v-if="!showMessage">
    <div
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
              v-model.trim="$v.order.name.$model"
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
              v-mask="'+998 ## ### ## ##'"
              v-model.trim="$v.order.phone_number.$model"
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
  </div>
</template>

<script>
import global from "~/mixins.js/global.js";
import { required, minLength } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
export default {
  layout: "user",
  mixins: [global],
  data() {
    return {
      errors: [],
      showMessage: false,
      order: {
        name: "",
        phone_number: ""
      }
    };
  },
  validations: {
    order: {
      name: {
        required,
        minLength: minLength(3)
      },
      phone_number: {
        required
      }
    }
  },
  computed: {
    ...mapGetters({
      savedProducts: "products/savedProducts"
    })
  },
  methods: {
    sendOrder() {
      let orderData = {
        name: this.order.name,
        phone_number: this.order.phone_number,
        products: this.savedProducts
      };
      this.$axios
        .post(`cart/orderbeta-create/`, orderData)
        .then(res => {
          this.$toast.success("Buyurtma qabul qilindi");
          this.$store.dispatch("products/deleteAllProduct");
        })
        .catch(err => {
          this.$toast.error(
            err.response.data || "Buyurtma berishda xatolik yuz berdi"
          );
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
    }
  }
};
</script>
