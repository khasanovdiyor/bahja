<template>
  <div class="flex h-screen">
    <AdminSidebar />
    <div class="px-16 w-2/3 pt-10">
      <h1 class="font-bold text-xl mb-6">Mavjud Mahsulotlar</h1>
      <table class=" divide-y divide-gray-200 ">
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
              Slider text
            </th>
            <th
              scope="col"
              class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
            >
              Slider category id
            </th>

            <th
              scope="col"
              class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
            >
              o'zgartirish
            </th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr class="border" v-for="slider in sliders" :key="slider.id">
            <td class="px-6 py-1 border">
              <div class="flex items-center text-gray-500 ">
                {{ slider.id }}
              </div>
            </td>
            <td class="px-6 py-1 border">
              <div class="flex items-center text-gray-500">
                {{ slider.text }}
              </div>
            </td>
            <td class="px-6 py-1 border">
              <div class="flex items-center text-gray-500">
                {{ slider.category }}
              </div>
            </td>

            <td class="px-6 py-1 border">
              <div class="flex items-center text-gray-500 justify-between">
                <nuxt-link :to="`/admin/slider-detail/${slider.id}`">
                  <img
                    src="~/assets/images/eye.svg"
                    class="w-5 h-5"
                    alt="eye icon"
                  />
                </nuxt-link>
                <!-- <nuxt-link :to="`/admin/slider-change/${slider.id}`">
                  <img
                    src="~/assets/images/pencil.svg"
                    class="w-5 h-5"
                    alt="pencil icon"
                  />
                </nuxt-link> -->
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
              class="fixed z-40 top-0 bottom-0 right-0 left-0 bg-gray-600 opacity-50 flex items-center justify-center"
              v-if="showDeleteDialog"
            >
              <div class="w-1/3 bg-white py-4 px-10">
                <span class="font-bold text-xl block mb-6"
                  >Ushbu mahsulotni o'chirishni xohlaysizmi?</span
                >
                <div class="flex justify-between">
                  <button
                    @click="deleteSlider(selectedSliderID)"
                    class="bg-red-500 text-white py-2 px-4"
                  >
                    Ha
                  </button>
                  <button
                    @click="showDeleteDialog = false"
                    class="bg-gray-500 text-white py-2 px-4"
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
      this.$axios.get("product/slider/list").then(res => {
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
