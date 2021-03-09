<template>
  <div class="bg-black text-white px-16 flex justify-between py-4">
    <!-- LEFT OF CONTACT BOX -->
    <div class="flex justify-between w-1/2">
      <div class="flex w-1/3 items-center">
        <img src="../assets/images/call.svg" alt="phone" class="w-4 mr-2" />
        <span>+998998998998</span>
      </div>
      <div class="flex w-1/3 items-center">
        <img
          src="../assets/images/location.svg"
          alt="location"
          class="w-4 mr-2"
        />
        <span>Uzbekistan,Tashkent</span>
      </div>
      <div class="flex w-1/3   items-center">
        <img src="../assets/images/clock.svg" alt="clock" class="w-4 mr-2" />
        <span>All week,24/7</span>
      </div>
    </div>
    <!-- RIGHT OF CONTACT BOX -->
    <div class="w-1/2">
      <div class="flex justify-between w-1/6 ml-auto">
        <nuxt-link to="instagram.com"
          ><img
            src="../assets/images/instagram.svg"
            alt="instagram logo"
            class="w-4"
          />
        </nuxt-link>
        <nuxt-link to="telegram.me">
          <img
            src="../assets/images/telegram.svg"
            alt="telegram logo"
            class="w-4"
          />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
