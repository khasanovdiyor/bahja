<template>
  <div>
    <div class="flex mt-24 px-6 rounded-md justify-center">
      <div class="w-full md:w-1/3 px-6 pb-8 border-2">
        <div class="w-full">
          <form class="w-full" @submit.prevent="userLogin" method="post">
            <div class="input-group mb-8 mt-6">
              <label
                for="input"
                class="block font-bold text-gray-600 text-gray-600 uppercase text-sm mb-1"
                >admin</label
              >
              <input
                type="text"
                required
                class="border-2 rounded-md text-sm w-full py-2 pl-5"
                id="username"
                placeholder="Ism"
                v-model="login.name"
              />
            </div>
            <div class="input-group">
              <label
                for="input"
                class="block font-bold text-gray-600 text-gray-600 uppercase text-sm mb-1"
                >PAROL</label
              >
              <input
                type="password"
                required
                class="border-2 rounded-md text-sm w-full py-2 pl-5"
                id="password"
                placeholder="**********"
                v-model="login.password"
              />
            </div>
            <div class="w-full">
              <button
                type="submit"
                class="flex justify-center items-center w-40 mx-auto mt-8 text-center rounded-md text-white font-semibold py-2 hover:bg-gray-700 bg-gray-600"
              >
                KIRISH
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: "admin",
  data() {
    return {
      login: {
        name: "",
        password: ""
      }
    };
  },
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.login
        });
        this.$router.push("/admin/");
      } catch (err) {}
    }
  }
};
</script>
