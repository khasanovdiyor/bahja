<template>
  <div class="flex min-h-screen">
    <AdminSidebar class="w-1/5" />
    <div class="w-full">
      <AdminHeader class="pr-6" />
      <Nuxt class="ml-8 my-10 pr-6" />
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import global from "~/mixins.js/global.js";
Vue.mixin(global);
export default {};
</script>
<style></style>
