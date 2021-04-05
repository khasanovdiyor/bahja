<template>
  <div class="flex min-h-screen">
    <AdminSidebar />
    <div class="px-16">
      <div
        class="py-2 px-4 flex fixed w-1/2 mx-auto text-xl justify-between bg-green-600 text-white"
        v-if="showSuccess"
      >
        <div>
          <span>Brand qo'shildi</span>
        </div>
        <div
          class="text-white px-4 cursor-pointer"
          @click="showSuccess = false"
        >
          X
        </div>
      </div>
      <div
        class="py-2 px-4 flex fixed w-1/2 mx-auto text-xl justify-between bg-red-600 text-white"
        v-if="showFail"
      >
        <div>
          <span>Brand qo'shishda xatolik yuz berdi, qayta urinib koring</span>
        </div>
        <div class="text-white px-4 cursor-pointer" @click="showFail = false">
          X
        </div>
      </div>
      <div class="mb-6">
        <div class="input-group block my-4">
          <h2 class="text-xl font-bold mb-10 uppercase">Brand qoshish</h2>
          <label for="input" class="block font-bold uppercase text-sm mb-2"
            >Brand nomi</label
          >
          <input
            type="text"
            class="border-2 text-sm w-2/3 py-2 pl-5"
            v-model="newBrand.name"
          />
        </div>

        <button @click="createBrand" class="bg-gray-800 text-white py-2 px-4">
          Brand yaratish
        </button>
      </div>
      <div>
        <table class="min-w-full divide-y divide-gray-200 ">
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
                class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
              >
                O'chirish
              </th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr class="border" v-for="brand in brands" :key="brand.id">
              <td class="px-6 py-1 border">
                <div class="flex items-center text-gray-500 ">
                  {{ brand.id }}
                </div>
              </td>
              <td class="px-6 py-1 border">
                <div class="flex items-center text-gray-500">
                  {{ brand.name }}
                </div>
              </td>
              <td class="px-6 py-1 border">
                <div class="flex items-center text-gray-500 justify-between">
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
                    >Ushbu Kategoriyani o'chirishni xohlaysizmi?</span
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
</template>

<script>
import AdminSidebar from "~/components/admin/AdminSidebar.vue";

export default {
  components: { AdminSidebar },
  data() {
    return {
      showDeleteDialog: false,
      showSuccess: false,
      showFail: false,
      selectedBrandID: null,
      brands: [],
      newBrand: {
        name: ""
      }
    };
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
          this.showSuccess = true;
          this.getBrands();
        })
        .catch(err => {
          loader.hide();
          this.showFail = true;
          
          console.log(err);
        });
    },
    deleteBrand(id) {
      this.$axios
        .delete(`product/brand-delete/${id}`)
        .then(res => {
          console.log(res.data, "ID:", id);
          this.showDeleteDialog = false;
          this.getBrands();
        })
        .catch(err => {
          this.showDeleteDialog = false;
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
