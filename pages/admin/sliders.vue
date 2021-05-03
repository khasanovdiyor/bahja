<template>
  <div>
    <div>
      <div class="flex items-center justify-between mb-6">
        <h1 class="font-bold text-xl text-gray-700">Sliderlar</h1>
        <BaseButtonLink link url="/admin/slider-create" buttonText="Qo'shish" />
      </div>
      <BaseTable :headers="tableHeaders">
        <template #body>
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
          </tr>
        </template>
      </BaseTable>
      <BaseDeleteModal
        v-if="showDeleteDialog"
        text="Ushbu slayderni o'chirishni xohlaysizmi?"
        @delete="deleteSlider(selectedSliderID)"
        @close-modal="showDeleteDialog = false"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableHeaders: ["id", "matn", "kategoriya", "buyruqlar"],
      sliders: [],
      showDeleteDialog: false,
      selectedSliderID: null,
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
    },
  },
  mounted() {
    this.getSliders();
  },
};
</script>

<style></style>
