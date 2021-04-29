<template>
  <div class="flex min-h-screen bg-gray-100">
    <AdminSidebar />
    <div class="px-8 w-9/12 pt-10">
      <div class="flex items-center justify-between">
        <h1 class="font-bold text-xl text-gray-700 mb-6">Sliderlar</h1>
        <nuxt-link
          to="/admin/slider-create"
          class="block bg-gray-800 w-24 ml-auto text-sm text-center rounded-md px-3 text-white my-2 py-2 mb-5"
          >Qo'shish</nuxt-link
        >
      </div>

      <table class="divide-y divide-gray-200 w-full">
        <thead class="bg-gray-200">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 w-16 text-left text-xs font-bold text-gray-600 uppercase"
            >
              id
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase"
            >
              Kontent
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase"
            >
              kategoriya
            </th>

            <th
              scope="col"
              class="px-6 py-3 w-40 text-left text-xs font-bold text-gray-600 uppercase"
            >
              buyruqlar
            </th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr class="border" v-for="slider in sliders" :key="slider.id">
            <td class="px-6 py-1 border">
              <div class="flex items-center text-sm py-2">
                {{ slider.id }}
              </div>
            </td>
            <td class="px-6 py-1 border">
              <div class="flex items-center text-sm py-2">
                {{ slider.text }}
              </div>
            </td>
            <td class="px-6 py-1 border">
              <div class="flex items-center text-sm py-2">
                {{ slider.category.name }}
              </div>
            </td>

            <td class="px-6 py-1 border">
              <div class="flex items-center text-sm py-2 justify-between">
                <nuxt-link :to="`/admin/slider-detail/${slider.id}`">
                  <img
                    src="~/assets/images/eye.svg"
                    class="w-5 h-5"
                    alt="eye icon"
                  />
                </nuxt-link>
                <nuxt-link :to="`/admin/slider-change/${slider.id}`">
                  <img
                    src="~/assets/images/pencil.svg"
                    class="w-5 h-5"
                    alt="eye icon"
                  />
                </nuxt-link>

                <div
                  @click="
                    showDeleteDialog = true;
                    selectedSliderID = slider.id;
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
              class="fixed z-50 top-0 bottom-0 right-0 left-0 bg-gray-600 bg-opacity-25 flex items-center justify-center"
              v-if="showDeleteDialog"
            >
              <div class="w-1/3 opasity-0 rounded-md bg-white py-4 px-8">
                <span class="font-bold text-xl text-center block mb-6"
                  >Ushbu sliderni o'chirishni xohlaysizmi?</span
                >
                <div class="flex justify-between">
                  <button
                    @click="deleteSlider(selectedSliderID)"
                    class="bg-red-500 rounded-md text-white py-2 px-4"
                  >
                    Ha
                  </button>
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
</template>

<script>
import AdminSidebar from "~/components/admin/AdminSidebar.vue";
export default {
  components: {
    AdminSidebar
  },
  data() {
    return {
      sliders: [],
      showDeleteDialog: false,
      selectedSliderID: null
    };
  },
  methods: {
    getSliders() {
      this.$axios.get("product/slider/all").then(res => {
        console.log(res.data);
        this.sliders = res.data;
      });
    },
    deleteSlider(id) {
      this.$axios
        .delete(`product/slider/delete/${id}`)
        .then(res => {
          console.log(res);
          this.showDeleteDialog = false;
          this.getSliders();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getSliders();
  }
};
</script>

<style></style>
