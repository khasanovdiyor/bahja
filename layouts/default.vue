<template>
  <div class="flex min-h-screen">
    <AdminSidebar class="w-1/5" />
    <div class="w-3/4">
      <AdminHeader />
      <Nuxt class="ml-8 mt-10" />
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