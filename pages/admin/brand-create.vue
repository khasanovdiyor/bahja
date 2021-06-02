<template>
  <div class="mb-6">
    <h2 class="text-xl font-bold text-gray-700 mb-6">Brend qo'shish</h2>
    <BaseTextField
      class="my-4"
      v-model.trim="$v.newBrand.name.$model"
      required
      :required-message="!$v.newBrand.name.required && $v.newBrand.name.$dirty"
      label="Brend"
    />
    <BaseButtonLink buttonText="Brend qo'shish" @button-click="createBrand" />
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  layout: "admin",
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
  validations: {
    newBrand: {
      name: {
        required
      }
    }
  },
  methods: {
    createBrand() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let loader = this.$loading.show();
        this.$axios
          .post("product/brand-create/", this.newBrand)
          .then(res => {
            this.$toast.success("Brend yaratildi");
          })
          .catch(err => {
            this.$toast.error(
              err.response.data || "Brend yaratishd xatolik yuz berdi"
            );
          })
          .finally(() => {
            loader.hide();
          });
      }
    }
  }
};
</script>