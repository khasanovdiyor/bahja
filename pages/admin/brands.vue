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
                  <div
                    class="flex items-center capitalize text-sm py-2 text-gray-600"
                  >
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
            alert="Ushbu brend bilan unga bo'glangan mahsulotlar ham o'chiriladi!"
            @delete="deleteBrand(selectedBrandID)"

   @close="showDeleteDialog = false"
          />
        </div>
      </div>
    </div>
    <BasePagination
      v-if="totalPages > 1"
      class="mt-10 w-96 mx-auto"
      :page-count="totalPages"
      :page-range="totalPages >= 4 ? 3 : totalPages"
      :click-handler="getBrands"
    />
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  layout: "admin",
  data() {
    return {
      showDeleteDialog: false,
      selectedBrandID: null,
      brands: [],
      tableHeaders: ["id", "nomi", "buyruqlar"],
      totalPages: null
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
    getBrands(page) {
      let loader = this.$loading.show();
      this.$axios
        .get("product/brand-list", {
          params: {
            page: page
          }
        })
        .then(res => {
          this.brands = res.data.results;
          this.totalPages = res.data.total_pages;
        })
        .finally(() => {
          loader.hide();
        });
    },

    deleteBrand(id) {
      this.$axios
        .delete(`product/brand-delete/${id}`)
        .then(res => {
          this.$toast.success(res.data);
          this.getBrands();
        })
        .catch(err => {
          this.$toast.error(err.response.data);
        })
        .finally(() => {
          this.showDeleteDialog = false;
        });
    }
  },
  mounted() {
    this.getBrands(1);
  }
};
</script>
