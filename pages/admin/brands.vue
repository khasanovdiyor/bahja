<template>
  <div class="flex min-h-screen bg-gray-100">
    <AdminSidebar />
    <div class="px-6  w-9/12">
      <div
        v-if="showSuccess"
        class="flex fixed z-40 top-0 py-2 w-9/12 bg-green-500 text-lg text-white text-center"
      >
        <svg viewBox="0 0 40 40" class="w-6 h-6 fill-current mx-5">
          <path
            d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"
          ></path>
        </svg>

        <i>Yangi brend qo'shildi</i>

        <span
          class="absolute right-8 cursor-pointer"
          @click="showSuccess = false"
          >X</span
        >
      </div>
      <div
        v-if="showFail"
        c
        class="flex fixed z-40 top-0 py-2 w-9/12 bg-red-500 text-lg text-white text-center"
      >
        <svg viewBox="0 0 40 40" class="w-6 h-6 fill-current mx-5">
          <path
            d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z"
          ></path>
        </svg>
        <i>Brend qo'shishda xatolik yuz berdi, qayta urinib ko'ring</i>
        <span class="absolute right-8 cursor-pointer" @click="showFail = false"
          >X</span
        >
      </div>
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
                <div
                  class="fixed z-50 top-0 bottom-0 right-0 left-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
                  v-if="showDeleteDialog"
                >
                  <div class="w-1/3 opasity-0 rounded-md bg-white py-4 px-8">
                    <span class="font-bold text-center text-xl block mb-6"
                      >Ushbu brendni o'chirishni xohlaysizmi?</span
                    >
                    <div class="flex justify-between">
                      <button
                        @click="deleteBrand(selectedBrandID)"
                        class="bg-red-500 rounded-md text-white py-2 px-4"
                      >
                        Ha
                      </button>
                      <div
                        class="flex items-center absolute top-10 mx-auto z-40 py-2 w-9/12 bg-green-500 text-lg text-white"
                        v-if="showDeleteSuccess"
                      >
                        <i> brand o'chirildi </i>
                      </div>
                      <button
                        @click="showDeleteDialog = false"
                        class="bg-gray-500 rounded-md text-white py-2 px-4"
                      >
                        Yo'q
                      </button>
                    </div>
                  </div>
                </div>
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
      tableHeaders: ["id", "nomi", "buyruqlar"]
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
    getBrands() {
      this.$axios.get("product/brand-list").then(res => {
        console.log(res.data);
        this.brands = res.data;
      });
    },
    createBrand() {
      let loader = this.$loading.show();
      this.$axios
        .post("product/brand-create/", this.newBrand)
        .then(res => {
          console.log(res.data);
          loader.hide();
          // this.showNotification(this.showSuccess, "Brand yaratildi");
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
          // this.showNotification(
          //   this.showFail,
          //   "Brand yaratishda xatolik yuz berdi, qayta urinib ko'ring"
          // );
          console.log(err);

          this.$v.$touch();
          if (!this.$v.$invalid) {
            this.brand.push();
            this.variation = {
              attributes: []
            };
            this.showAddNewBrand = false;
          }
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
    }
  },
  mounted() {
    this.getBrands();
  }
};
</script>

<style></style>
