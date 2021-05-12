<template>
  <div>
    <div>
      <div class="flex-1 flex flex-col overflow-hidden">
        <main>
          <div class="mx-auto">
            <div class="flex items-center justify-between">
              <h2 class="text-xl text-gray-700 font-semibold">Buyurtmalar</h2>
              <div class="flex items-center">
                <select
                  name="filter-orders"
                  v-model="activeStatus"
                  id=""
                  class="ml-auto py-2 text-sm border border-gray-200 rounded-md"
                >
                  <option value="">Status bo'yicha saralash</option>
                  <option
                    :value="status"
                    v-for="(status, index) in statuses"
                    :key="index"
                  >
                    {{ status }}
                  </option>
                </select>
                <BaseButtonLink
                  class="mx-2"
                  buttonText="Saralash"
                  @button-click="getOrders"
                />
                <BaseButtonLink
                  link
                  buttonText="Qo'shish"
                  url="/admin/order-create/"
                />
              </div>
            </div>

            <div class="flex flex-col mt-5">
              <div
                class="my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
              >
                <BaseTable :headers="tableHeaders">
                  <template #body>
                    <tr v-for="order in orders" :key="order.id">
                      <td
                        class="px-6 py-3 whitespace-no-wrap border-b border-gray-200"
                      >
                        <div class="flex items-center">
                          <div class="flex-shrink-0 h-6 w-6">
                            <img
                              class="h-6 w-6 rounded-full"
                              src="~/assets/images/profile-user.svg"
                              alt=""
                            />
                          </div>
                          <div class="ml-4">
                            <div
                              class="text-sm leading-5 font-medium text-gray-700"
                            >
                              {{ order.name }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        class="px-6 py-3 whitespace-no-wrap border-b border-gray-200"
                      >
                        <div class="text-sm leading-5 font text-gray-700">
                          {{ order.phone_number }}
                        </div>
                      </td>
                      <td
                        class="px-6 py-3 whitespace-no-wrap border-b border-gray-200"
                      >
                        <div class="text-sm leading-5 text-gray-900">
                          {{ order.orderproducts.length }}
                        </div>
                      </td>
                      <td
                        class="px-6 py-3 whitespace-no-wrap border-b border-gray-200"
                      >
                        <div class="text-sm leading-5 text-gray-900">
                          {{ order.finish_price.toLocaleString() }} so'm
                        </div>
                      </td>
                      <td
                        class="px-6 py-3 whitespace-no-wrap border-b border-gray-200"
                      >
                        <div class="relative">
                          <div v-if="order.showStatus" class="w-32 3 px-4">
                            <span
                              v-for="status in statuses"
                              :key="status"
                              @click="changeStatus(status, order)"
                              class="px-2 inline-flex text-xs cursor-pointer leading-5 font-semibold rounded-full"
                              :class="{
                                'bg-green-100 text-green-800':
                                  status === 'Tugallangan',
                                'bg-gray-200 text-gray-800':
                                  status === 'Kutilmoqda',
                                'bg-red-100 text-red-800':
                                  status === 'Bekor qilingan'
                              }"
                              >{{ status }}</span
                            >
                          </div>
                          <span
                            @click="order.showStatus = true"
                            v-if="!order.showStatus"
                            class="px-2 inline-flex text-xs text-center cursor-pointer leading-5 font-semibold rounded-full"
                            :class="{
                              'bg-green-100 text-green-800':
                                order.status === 'Tugallangan',
                              'bg-gray-200 text-gray-800':
                                order.status === 'Kutilmoqda',
                              'bg-red-100 text-red-800':
                                order.status === 'Bekor qilingan'
                            }"
                            >{{ order.status }}</span
                          >
                        </div>
                      </td>

                      <td
                        class="px-6 py-2 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium"
                      >
                        <div
                          class="flex items-center text-gray-500 justify-between"
                        >
                          <nuxt-link
                            :to="`/admin/order-detail/${order.id}`"
                            class="hover"
                          >
                            <img
                              src="~/assets/images/eye.svg"
                              class="w-5 h-5"
                              alt="eye icon"
                            />
                          </nuxt-link>
                          <nuxt-link :to="`/admin/order-change/${order.id}`">
                            <img
                              src="~/assets/images/pencil.svg"
                              class="w-5 h-5"
                              alt="pencil icon"
                            />
                          </nuxt-link>
                          <div
                            class="cursor-pointer"
                            @click="
                              deleteOrderID = order.id;
                              showDeleteDialog = true;
                            "
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
                <div
                  v-if="orders.length === 0"
                  class="mx-auto w-1/3 my-10 text-bold text-center text-xl"
                >
                  Ushbu statusda buyurtmalar mavjud emas
                </div>
                <BaseDeleteModal
                  v-if="showDeleteDialog"
                  text="Ushbu buyurtmani o'chirishni xohlaysizmi?"
                  @delete="deleteOrder(deleteOrderID)"
                  @close="showDeleteDialog = false"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    <BasePagination
      v-if="totalPages > 1"
      class="mt-10"
      :page-count="totalPages"
      :page-range="totalPages > 6 ? 4 : totalPages"
      :click-handler="getOrders"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableHeaders: [
        "ism",
        "telefon raqam",
        "son",
        "narx",
        "status",
        "buyruqlar"
      ],
      sidebarOpen: false,
      showDeleteDialog: false,
      deleteOrderID: null,
      orders: [],
      activeStatus: "",
      statuses: ["Kutilmoqda", "Bekor qilingan", "Tugallangan"],
      totalPages: null
    };
  },
  methods: {
    getOrders(page) {
      let loader = this.$loading.show();
      this.$axios
        .get("cart/orderbeta-list/", {
          params: {
            page,
            status: this.activeStatus
          }
        })
        .then(res => {
          res.data.results.forEach(el => (el.showStatus = false));
          this.orders = res.data.results;
          this.totalPages = res.data.total_pages;
        })
        .finally(() => {
          loader.hide();
        });
    },
    deleteOrder(id) {
      let toast = this.$toast;
      this.$axios
        .delete(`cart/orderbeta-delete/${id}`)
        .then(res => {
          toast.success(res.data || "Buyurtma muvaffaqiyatli o'chirildi");
          this.getOrders(1);
        })
        .catch(err => {
          toast.error(
            err.response.data || "Buyurtma o'chirishda xatolik yuz berdi"
          );
        })
        .finally(() => {
          this.showDeleteDialog = false;
        });
    },
    changeStatus(status, order) {
      let toast = this.$toast;
      this.$axios
        .patch(`cart/orderbeta-update/${order.id}`, { status })
        .then(res => {
          toast.success("Status muvaffaqiyatli o'zgardi");
          this.getOrders(1);
        })
        .catch(err => {
          toast.error(err.response.data);
        });
    }
  },
  mounted() {
    this.getOrders(1);
  }
};
</script>