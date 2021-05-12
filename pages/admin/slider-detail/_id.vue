<template>
  <div>
    <!-- <AdminSidebar /> -->
    <div>
      <h1 class="font-bold text-xl text-gray-800 mb-6">Slider</h1>
      <div>
        <table class="min-w-full divide-x divide-gray-200 flex">
          <thead class="bg-gray-200">
            <tr class="border-gray-400 border-b">
              <th
                scope="col"
                class="px-8 block text-sm py-2 text-left font-bold text-gray-600 uppercase"
              >
                id
              </th>
            </tr>
            <tr class="border-gray-400 border-b">
              <th
                scope="col"
                class="px-8 block text-sm py-2 text-left font-bold text-gray-600 uppercase"
              >
                Kontent
              </th>
            </tr>
            <tr class="border-gray-400">
              <th
                scope="col"
                class="px-8 block text-sm py-2 text-left font-bold text-gray-600 uppercase"
              >
                kategoriya
              </th>
            </tr>
          </thead>
          <tbody class="bg-white border">
            <tr class="">
              <td class="px-6 py-2 border-b">
                <div class="flex items-center text-sm">
                  {{ slider.id }}
                </div>
              </td>
            </tr>
            <tr class="">
              <td class="px-6 py-2 border-b">
                <div class="flex items-center text-sm">
                  {{ slider.text }}
                </div>
              </td>
            </tr>
            <tr class="">
              <td class="px-6 py-2">
                <div class="flex items-center text-sm" v-if="slider.category">
                  {{ slider.category.name }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-10">
        <span class="font-bold text-lg text-gray-600 mt-10 block"
          >Slider rasmi</span
        >
        <div class="flex">
          <div class="w-56 h-64 my-5 border shadow-sm">
            <img
              :src="slider.image"
              class="object-cover w-full h-full"
              alt="gallery image"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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

<style scoped>
tbody td {
  width: 52rem;
}
</style>
