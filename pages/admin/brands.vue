<template>
  <div>
    <div>
      <div>
        <div class="flex items-center justify-between mb-6">
          <h1 class="font-bold text-xl text-gray-700">Brandlar</h1>
          <BaseButtonLink
            link
            url="/admin/brand-create"
            buttonText="Qo'shish"
          />
        </div>
        <div>
          <BaseTable :headers="tableHeaders">
            <template #body>
              <tr class="" v-for="brand in brands" :key="brand.id">
                <td class="px-6 py-1 border border-right-none">
                  <div class="flex items-center text-sm py-2">
                    <div class="flex items-center text-gray-600">
                      {{ brand.id }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-1 border">
                  <div class="flex items-center text-sm py-2 text-gray-600">
                    {{ brand.name }}
                  </div>
                </td>
                <td class="px-6 py-1 border">
                  <div
                    class="flex items-center text-sm py-2 text-gray-600 justify-center"
                  >
                    <div
                      @click="
                        showDeleteDialog = true;
                        selectedBrandID = brand.id;
                      "
                      class="cursor-pointer"
                    >
                      <img
                        src="~/assets/images/delete.svg"
                        class="w-5 h-5"
                        alt="pencil icon"
                      />
                    </div>
                  </div>
                </td>
              </tr>
            </template>
          </BaseTable>
          <BaseDeleteModal
            v-if="showDeleteDialog"
            text="Ushbu brendni o'chirishni xohlaysizmi?"
            @delete="deleteBrand(selectedBrandID)"
            @close="showDeleteDialog = false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      showDeleteDialog: false,
      selectedBrandID: null,
      brands: [],
      tableHeaders: ["id", "nomi", "buyruqlar"],
    };
  },
  validations: {
    newBrand: {
      name: {
        required,
      },
    },
  },
  methods: {
    getBrands() {
      this.$axios.get("product/brand-list").then(res => {
        console.log(res.data);
        this.brands = res.data;
      });
    },

    deleteBrand(id) {
      this.$axios
        .delete(`product/brand-delete/${id}`)
        .then(res => {
          console.log(res.data, "ID:", id);
          this.showDeleteDialog = false;
          this.message = "Brend o'chirildi";
          this.showSuccess = true;
          setTimeout(() => {
            this.showSuccess = false;
          }, 3000);
          this.getBrands();
        })
        .catch(err => {
          this.showDeleteDialog = false;
          this.showFail = true;
          setTimeout(() => {
            this.showFail = false;
          }, 3000);
          console.log(err);
        });
    },
  },
  mounted() {
    this.getBrands();
  },
};
</script>

<style></style>
