<template>
  <div class="flex min-h-screen">
    <AdminSidebar />
    <div class="px-16 pt-10">
      <h1 class="font-bold text-xl mb-6">Mavjud Mahsulotlar</h1>
      <div>
        <table class="min-w-full divide-x divide-gray-200 flex">
          <thead class="bg-gray-200">
            <tr class="border-gray-400  border-b">
              <th
                scope="col"
                class="px-8 block  py-2 text-left font-bold text-gray-700 uppercase"
              >
                id
              </th>
            </tr>
            <tr class="border-gray-400  border-b">
              <th
                scope="col"
                class="px-8 block py-2 text-left font-bold text-gray-700 uppercase"
              >
                text
              </th>
            </tr>
            <tr class="border-gray-400  border-b">
              <th
                scope="col"
                class="px-8 block  py-2 text-left font-bold text-gray-700 uppercase"
              >
                kategoriyasi
              </th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr class="border">
              <td class="px-6 py-2 border">
                <div class="flex items-center text-gray-500">
                  {{ slider.id }}
                </div>
              </td>
            </tr>
            <tr class="border">
              <td class="px-6 py-2 border">
                <div class="flex items-center text-gray-500">
                  {{ slider.text }}
                </div>
              </td>
            </tr>
            <tr class="border">
              <td class="px-6 py-2 border">
                <div
                  class="flex items-center text-gray-500"
                  v-if="slider.category"
                >
                  {{ slider.category.name }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-10">
        <span class="font-bold mt-10 mb-4 block">Slider rasmi</span>
        <div class="flex">
          <div class="w-56 h-48 mb-10 mr-4">
            <img
              :src="slider.image"
              class="object-cover object-top w-full h-full"
              alt="gallery image"
            />
          </div>
        </div>
      </div>
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
      slider: {}
    };
  },
  methods: {
    getSlider() {
      this.$axios
        .get(`product/slider/detail/${this.$route.params.id}`)
        .then(res => {
          console.log(res.data);
          this.slider = res.data;
        });
    }
  },
  mounted() {
    this.getSlider();
  }
};
</script>

<style></style>
