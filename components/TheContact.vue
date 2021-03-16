<template>
  <div
    class="bg-black text-white px-5 md:px-16 block sm:flex justify-between py-4"
  >
    <!-- LEFT OF CONTACT BOX -->
    <div class="flex sm:w-3/4 justify-between md:justify-start text-sm">
      <div class="flex items-center mr-4 md:mr-5">
        <img src="../assets/images/call.svg" alt="phone" class="w-4 mr-1" />
        <span>+998-99-899-89-98</span>
      </div>
      <div class="flex items-center mr-4 md:mr-5">
        <img
          src="../assets/images/location.svg"
          alt="location"
          class="w-4 mr-1"
        />
        <span>Toshkent</span>
      </div>
      <div class="flex items-center">
        <img src="../assets/images/clock.svg" alt="clock" class="w-4 mr-2" />
        <span>Ish vaqti 24/7</span>
      </div>
    </div>
    <!-- RIGHT OF CONTACT BOX -->

    <div
      class="flex justify-center mt-2 sm:mt-0 sm:justify-end w-full sm:w-1/4"
    >
      <nuxt-link to="instagram.com"
        ><img
          src="../assets/images/instagram.svg"
          alt="instagram logo"
          class="w-5 mr-5"
        />
      </nuxt-link>

      <nuxt-link to="telegram.me">
        <img
          src="../assets/images/telegram.svg"
          alt="telegram logo"
          class="w-5"
        />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
