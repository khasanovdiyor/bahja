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
        <div class="mb-6">
          <div class="input-group block my-4 my-10">
            <h2 class="text-xl font-bold text-gray-700 mb-10">
              Brend qo'shish
            </h2>
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
        <div>
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-200">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-2 w-16 text-left text-sm font-bold text-gray-700 uppercase"
                >
                  id
                </th>
                <th
                  scope="col"
                  class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                >
                  Brend
                </th>
                <th
                  scope="col"
                  class="px-6 py-2 w-40 rounded-tr-md text-left text-sm font-bold text-gray-700 uppercase"
                >
                  O'chirish
                </th>
              </tr>
            </thead>
            <tbody class="bg-white">
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
            </tbody>
          </table>
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
      showSuccess: false,
      showFail: false,
      message: "",
      selectedBrandID: null,
      brands: [],
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
    },
    showNotification(show, message) {
      this.message = message;
      if (show === this.showSuccess) {
        this.showSuccess = true;
        setTimeout(() => {
          this.showSuccess = false;
        }, 3000);
      } else if (show === this.showFail) {
        this.showFail = true;
        setTimeout(() => {
          this.showFail = false;
        }, 3000);
      }
    }
  },
  mounted() {
    this.getBrands();
  }
};
</script>

<style></style>
