<template>
  <div class="flex">
    <AdminTheSidebar />
    <div class="px-16">
      <div>
        <div class="input-group block my-4">
          <h2 class="text-xl font-bold mb-10 uppercase">Rang qoshish</h2>
          <label for="input" class="block font-bold uppercase text-sm mb-2"
            >Rang nomi</label
          >
          <input
            type="text"
            class="border-2 text-sm w-1/2 py-2 pl-5"
            v-model="color.name"
          />
        </div>

        <button @click="createcolor" class="bg-green-400 text-white py-2 px-4">
          Kategoriya yaratish
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
                rang nomi
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
            <tr class="border" v-for="color in colors" :key="color.id">
              <td class="px-6 py-1 border">
                <div class="flex items-center text-gray-500 ">
                  {{ color.id }}
                </div>
              </td>
              <td class="px-6 py-1 border">
                <div class="flex items-center text-gray-500">
                  {{ color.name }}
                </div>
              </td>
              <td class="px-6 py-1 border">
                <div class="flex items-center text-gray-500 justify-between">
                  <div
                    @click="
                      showDeleteDialog = true;
                      selectedColorID = color.id;
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
                class="fixed z-40 top-0 bottom-0 right-0 left-0 bg-gray-600 opacity-75 flex items-center justify-center"
                v-if="showDeleteDialog"
              >
                <div class="w-1/3 bg-white py-4 px-10">
                  <span class="font-bold text-xl block mb-6"
                    >Ushbu Rangni o'chirishni xohlaysizmi?</span
                  >
                  <div class="flex justify-between">
                    <button
                      @click="deleteCategory(selectedColorID)"
                      class="bg-red-600 text-white py-2 px-4"
                    >
                      Ha {{ selectedColorID }}
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
  components: {
    AdminSidebar
  },
  data() {
    return {
      showDeleteDialog: false,
      selectedColorID: null,
      colors: [],
      newcolor: {
        name: ""
      }
    };
  },
  methods: {
    getColors() {
      this.$axios.get("product/color-list").then(res => {
        console.log(res.data);
        this.colors = res.data;
      });
    },
    createColor() {
      this.$axios.post("product/color-create", this.newColor).then(res => {
        console.log(res.data);
      });
    },
    deleteColor(id) {
      this.$axios
        .delete(`product/color-delete/${id}`)
        .then(res => {
          console.log(res.data, "ID:", id);
          this.showDeleteDialog = false;
          this.getColors();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getColors();
  }
};
</script>

<style></style>
