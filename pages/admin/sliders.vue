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
        @close="showDeleteDialog = false"
      />
    </div>
    <BasePagination
      v-if="totalPages > 1"
      class="mt-10 w-96 mx-auto"
      :page-count="totalPages"
      :page-range="totalPages >= 4 ? 3 : totalPages"
      :click-handler="getCategories"
    />
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      tableHeaders: ["id", "matn", "kategoriya", "buyruqlar"],
      sliders: [],
      showDeleteDialog: false,
      selectedSliderID: null,
      totalPages: null
    };
  },
  methods: {
    getSliders(page) {
      let loader = this.$loading.show();
      this.$axios
        .get("product/slider/all", {
          params: {
            page
          }
        })
        .then(res => {
          this.sliders = res.data.results;
          this.totalPages = res.data.total_pages;
        })
        .finally(() => {
          loader.hide();
        });
    },
    deleteSlider(id) {
      this.$axios
        .delete(`product/slider/delete/${id}`)
        .then(res => {
          this.$toast.success(res.data || "Slider o'chirildi");
          this.getSliders(1);
        })
        .catch(err => {
          this.$toast.error(
            err.response.data || "Slider o'chirishda xatolik yuz berdi"
          );
        })
        .finally(() => {
          this.showDeleteDialog = false;
        });
    }
  },
  mounted() {
    this.getSliders(1);
  }
};
</script>
