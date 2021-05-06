<template>
  <header
    class="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-gray-800"
  >
    <div class="flex items-center w-full justify-end">
      <button
        @click="sidebarOpen = true"
        class="text-gray-500 focus:outline-none lg:hidden"
      >
        <svg
          class="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6H20M4 12H20M4 18H11"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </button>

      <div class="flex justify-center">
        <div class="relative">
          <button
            class="block overflow-hidden focus:outline-none"
            @click="showUserDropdown = !showUserDropdown"
          >
            {{ this.$auth.user }}
          </button>
          <div
            v-if="showUserDropdown"
            tabindex="0"
            @focusout="showUserDropdown = false"
            class="absolute right-0 w-40 mt-2 py-2 bg-white border rounded shadow-xl"
          >
            <button
              @click="logout"
              to="/admin/login"
              class="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 w-full rounded hover:bg-gray-800 hover:text-white"
            >
              Chiqish
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      showUserDropdown: false,
    };
  },
  methods: {
    logout() {
      this.$auth.logout();
      this.$router.push("/");
    },
  },
};
</script>

<style>
</style>