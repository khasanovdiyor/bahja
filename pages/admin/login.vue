<template>
  <div class="flex mt-24 justify-center">
    <div class="w-full md:w-1/3 pb-8 border-2">
      <span
        class="w-full flex items-center mb-8 justify-center py-5 text-xl font-semibold h-8 bg-black text-white"
      >
      </span>
      <div class="w-full px-6">
        <form class="w-full" @submit.prevent="logIn">
          <div class="input-group mb-8">
            <label for="input" class="font-semibold text-sm uppercase"
              >admin nomi</label
            >
            <input
              type="text"
              class="p-2 pl-3 mt-2 w-full bg-gray-200 rounded-sm"
              placeholder="Ism"
              v-model.trim="login.name"
            />
          </div>
          <div class="input-group">
            <label for="input" class="font-semibold text-sm py-5">PAROL</label>
            <input
              type="password"
              class="p-2 pl-3 mt-2 w-full bg-gray-200 rounded-sm"
              placeholder="********"
              v-model.trim="login.password"
            />
          </div>
          <button
            type="submit"
            class="btn w-full mt-8 mx-auto text-center rounded-sm font-semibold py-2 bg-black text-white"
          >
            KIRISH
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      login: {
        name: "",
        password: "",
      },
    };
  },
  methods: {
    logIn() {
      this.$axios
        .post("users/token/", this.login)
        .then((res) => {
          this.$auth.strategy.token.set(res.data.token);
          this.$router.push("/admin/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
