<template>
  <div class="mb-6">
    <div class="input-group block my-10">
      <h2 class="text-xl font-bold text-gray-700 mb-6">Brend qo'shish</h2>
      <label
        for="input"
        class="block font-bold text-gray-600 uppercase text-sm mb-2"
        >Brend</label
      >
      <input
        type="text"
        class="border-2 w-1/2 rounded-md text-sm py-2 pl-5"
        v-model.trim="$v.newBrand.name.$model"
      />
      <div
        class="text-red-400 text-sm"
        v-if="!$v.newBrand.name.required && $v.newBrand.name.$dirty"
      >
        <i>To'ldirish shart</i>
      </div>
    </div>

    <button
      @click="createBrand"
      class="bg-gray-800 rounded-md text-sm text-white py-2 px-4"
    >
      Brend qo'shish
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSuccess: false,
      showFail: false,
      message: "",
      newBrand: {
        name: ""
      }
    };
  },
  methods: {
    createBrand() {
      let loader = this.$loading.show();
      this.$axios
        .post("product/brand-create/", this.newBrand)
        .then(res => {
          console.log(res.data);
          loader.hide();
          this.showSuccess = true;
          setTimeout(() => {
            this.showSuccess = false;
          }, 3000);
          this.getBrands();
          setTimeout(() => {
            this.showSuccess = false;
          }, 3000);
        })
        .catch(err => {
          loader.hide();
          this.showFail = true;
          setTimeout(() => {
            this.showFail = false;
          }, 3000);
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>