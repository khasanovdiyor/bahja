<template>
  <div
    class="py-4 px-16 flex items-center justify-between border-b border-black"
  >
    <div>
      <img src="../assets/images/bahja.png" alt="bahja logo" class="w-20" />
    </div>
    <!-- NAVIGATION LINKS -->
    <nav class="w-1/2">
      <ul class="flex justify-between">
        <li>
          <nuxt-link to="mahalliy" class="text-black"
            >Mahalliy mahsulotlar</nuxt-link
          >
        </li>
        <li>
          <nuxt-link to="import" class="text-black"
            >Import mahsulotlar</nuxt-link
          >
        </li>
        <li>
          <nuxt-link to="import" class="text-black"
            >Biz bilan boglaning</nuxt-link
          >
        </li>
      </ul>
    </nav>
    <div class="flex w-1/6 justify-between">
      <img src="../assets/images/loupe.svg" alt="search icon" class="w-6" />
      <img src="../assets/images/user.svg" alt="user icon" class="w-6" />
      <img
        src="../assets/images/shopping-bag.svg"
        alt="shopping bag icon"
        class="w-6"
      />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
