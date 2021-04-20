<template>
  <div class="flex min-h-screen bg-gray-100">
    <AdminSidebar />
    <div class="px-8 w-1/2">
      <div
        class="fixed z-40 top-0 px-4 py-2 w-2/3 bg-green-400 text-lg text-white text-center"
        v-if="showSuccess"
      >
        <div>
          <span><i>Brand qo'shildi</i> </span>
        </div>
        <!-- <div
          class="text-white px-4 cursor-pointer"
          @click="showSuccess = false"
        >
          X
        </div> -->
      </div>
      <div
        class="fixed z-40 top-0 px-4 py-2 w-2/3 bg-red-400 text-lg text-white text-center"
        v-if="showFail"
      >
        <div>
          <span
            class="py-2 px-4 flex fixed w-1/2 mx-auto text-xl justify-between
          bg-red-400 text-white"
            v-if="showFail"
          >
            ><i>Brand qo'shishda xatolik yuz berdi, qayta urinib koring!</i>
          </span>

          <div class="text-center">
            <span>{{ message }}</span>
          </div>
          <!-- <div class="text-white px-4 cursor-pointer" @click="showFail = false">
          X
        </div> -->
        </div>
        <div class="mb-6">
          <div class="input-group block my-4 my-10">
            <h2 class="text-xl font-bold mb-10">
              Brand qo'shish
            </h2>
            <label
              for="input"
              class="block font-bold text-gray-600 uppercase text-sm mb-2"
              >Brand nomi</label
            >
            <input
              type="text"
              class="border-2 rounded-md text-sm w-2/3 py-2 pl-5"
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
            Brand yaratish
          </button>
        </div>
        <div>
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-200">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                >
                  id
                </th>
                <th
                  scope="col"
                  class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                >
                  Brand nomi
                </th>
                <th
                  scope="col"
                  class="px-6 py-2 rounded-tr-md text-left text-sm font-bold text-gray-700 uppercase"
                >
                  O'chirish
                </th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr class="border" v-for="brand in brands" :key="brand.id">
                <td class="px-6 py-1 border">
                  <div class="flex items-center text-sm py-2 text-gray-500 ">
                    <div class="flex items-center text-gray-500">
                      {{ brand.id }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-1 border">
                  <div class="flex items-center text-sm py-2 text-gray-500">
                    {{ brand.name }}
                  </div>
                </td>
                <td class="px-6 py-1 border">
                  <div
                    class="flex items-center text-sm py-2 text-gray-500 justify-between"
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
                  class="fixed z-40 top-0 bottom-0 right-0 left-0 bg-gray-600 opacity-50 flex items-center justify-center"
                  v-if="showDeleteDialog"
                >
                  <div class="w-1/3 bg-white py-4 px-10">
                    <span class="font-bold text-xl block mb-6"
                      >Ushbu brendni o'chirishni xohlaysizmi?</span
                    >
                    <div class="flex justify-between">
                      <button
                        @click="deleteBrand(selectedBrandID)"
                        class="bg-red-600 text-white py-2 px-4"
                      >
                        Ha
                      </button>
                      <button
                        @click="showDeleteDialog = false"
                        class="bg-gray-600 text-white py-2 px-4"
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
import AdminSidebar from "~/components/admin/AdminSidebar.vue";
import { required } from "vuelidate/lib/validators";

export default {
  components: { AdminSidebar },
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
