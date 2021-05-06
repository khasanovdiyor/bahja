<template>
  <div>
    <TheContact />
    <TheHeader />
    <Nuxt />
    <TheFooter />
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.$store.dispatch("products/getSavedProducts");
  },
};
</script>

<style>
</style>