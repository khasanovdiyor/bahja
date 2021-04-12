<template>
  <div>
    <div x-data="{ sidebarOpen: false }" class="flex h-screen bg-gray-200">
      <div
        :class="sidebarOpen ? 'block' : 'hidden'"
        @click="sidebarOpen = false"
        class="fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden"
      ></div>
      <AdminSidebar />
      <div class="flex-1 flex flex-col overflow-hidden">
        <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div class="container mx-auto px-6">
            <!-- <div class="mt-4">
              <div class="flex flex-wrap -mx-6">
                <div class="w-full px-6 sm:w-1/2 xl:w-1/3">
                  <div class="relative">
                    <h3
                      class="mb-2 cursor-pointer inline-block"
                      @click="showSortOrder = true"
                    >
                      {{ selectedSortOrder.name }} &#8595;
                    </h3>
                    <div
                      class="absolute bg-gray-400 text-white left-16 top-0 z-40"
                      v-if="showSortOrder"
                    >
                      <ul>
                        <li
                          v-for="option in sortOptions"
                          :key="option.day"
                          @click="getStatsNewOrder(option)"
                          class="cursor-pointer hover:bg-gray-600 py-2 px-4"
                        >
                          {{ option.name }}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div
                    class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white h-32"
                  >
                    <div class="p-3 rounded-full bg-opacity-75">
                      <svg
                        class="h-8 w-8 text-black"
                        viewBox="0 0 28 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>

                    <div class="mx-5">
                      <h4 class="text-2xl font-semibold text-gray-700">
                        {{ newOrder }}
                      </h4>
                      <div class="text-gray-500">Yangi buyurtmalar soni</div>
                    </div>
                  </div>
                </div>

                <div class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
                  <div class="relative">
                    <h3
                      class="mb-2 cursor-pointer inline-block"
                      @click="showSortMoney = true"
                    >
                      {{ selectedSortMoney.name }} &#8595;
                    </h3>
                    <div
                      class="absolute bg-gray-400 text-white left-16 top-0 z-40"
                      v-if="showSortMoney"
                    >
                      <ul>
                        <li
                          v-for="option in sortOptions"
                          :key="option.day"
                          @click="getStatsNewOrderMoney(option)"
                          class="cursor-pointer hover:bg-gray-600 py-2 px-4"
                        >
                          {{ option.name }}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div
                    class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white h-32"
                  >
                    <div class="p-3 rounded-full bg-orange-600 bg-opacity-75">
                      <svg
                        height=""
                        class="w-8 h-8"
                        viewBox="0 -31 512.00033 512"
                        width="512pt"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="m166 300.003906h271.003906c6.710938 0 12.597656-4.4375 14.414063-10.882812l60.003906-210.003906c1.289063-4.527344.40625-9.390626-2.433594-13.152344-2.84375-3.75-7.265625-5.964844-11.984375-5.964844h-365.632812l-10.722656-48.25c-1.523438-6.871094-7.617188-11.75-14.648438-11.75h-91c-8.289062 0-15 6.710938-15 15 0 8.292969 6.710938 15 15 15h78.960938l54.167968 243.75c-15.9375 6.929688-27.128906 22.792969-27.128906 41.253906 0 24.8125 20.1875 45 45 45h271.003906c8.292969 0 15-6.707031 15-15 0-8.289062-6.707031-15-15-15h-271.003906c-8.261719 0-15-6.722656-15-15s6.738281-15 15-15zm0 0"
                        />
                        <path
                          d="m151 405.003906c0 24.816406 20.1875 45 45.003906 45 24.8125 0 45-20.183594 45-45 0-24.8125-20.1875-45-45-45-24.816406 0-45.003906 20.1875-45.003906 45zm0 0"
                        />
                        <path
                          d="m362.003906 405.003906c0 24.816406 20.1875 45 45 45 24.816406 0 45-20.183594 45-45 0-24.8125-20.183594-45-45-45-24.8125 0-45 20.1875-45 45zm0 0"
                        />
                      </svg>
                    </div>

                    <div class="mx-5">
                      <h4 class="text-2xl font-semibold text-gray-700">
                        {{ newOrderMoney }} so'm
                      </h4>
                      <div class="text-gray-500">Jami daromad</div>
                    </div>
                  </div>
                </div>

                <div class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
                  <div class="relative">
                    <h3
                      class="mb-2 cursor-pointer inline-block"
                      @click="showSortProduct = true"
                    >
                      {{ selectedSortProduct.name }} &#8595;
                    </h3>
                    <div
                      class="absolute bg-gray-400 text-white left-16 top-0 z-40"
                      v-if="showSortProduct"
                    >
                      <ul>
                        <li
                          v-for="option in sortOptions"
                          :key="option.day"
                          @click="getStatsNewProducts(option)"
                          class="cursor-pointer hover:bg-gray-600 py-2 px-4"
                        >
                          {{ option.name }}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div
                    class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white h-32"
                  >
                    <div class="p-3 rounded-full bg-opacity-75">
                      <svg
                        class="h-8 w-8 text-black"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z"
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z"
                          stroke="currentColor"
                          stroke-width="2"
                        ></path>
                      </svg>
                    </div>

                    <div class="mx-5">
                      <h4 class="text-2xl font-semibold text-gray-700">
                        {{ newProducts }}
                      </h4>
                      <div class="text-gray-500">
                        Yangi qo'shilgan mahsulotlar
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> -->

            <div class="flex items-center mt-8 justify-between">
              <h2 class="text-xl -mt-16 text-gray-700 font-semibold">
                Buyurtmalar
              </h2>
              <div class="mt-5 flex items-center">
                <div>
                  <select
                    name="filter-orders"
                    v-model="activeStatus"
                    id=""
                    class="inline-block ml-auto py-2 text-sm border border-gray-200 rounded-md"
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
                  <button
                    @click="getOrders"
                    class="bg-gray-800 w-24 rounded-md text-sm px-4 text-white my-2 py-2"
                  >
                    Saralash
                  </button>
                  <nuxt-link
                    to="/admin/order-create/"
                    class="block bg-gray-800 w-24 ml-auto text-sm text-center rounded-md px-3 text-white my-2 py-2"
                    >Qo'shish</nuxt-link
                  >
                </div>
              </div>
            </div>

            <div class="flex flex-col mt-5">
              <div
                class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
              >
                <div
                  class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200"
                >
                  <table class="min-w-full">
                    <thead>
                      <tr>
                        <th
                          class="px-6 py-3 border-b border-gray-200 bg-gray-200 text-left text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider"
                        >
                          Mijoz nomi
                        </th>
                        <th
                          class="px-6 py-3 border-b border-gray-200 bg-gray-200 text-left text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider"
                        >
                          Telefon raqami
                        </th>
                        <th
                          class="px-6 py-3 border-b border-gray-200 bg-gray-200 text-left text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider"
                        >
                          Buyurtmalar soni
                        </th>
                        <th
                          class="px-6 py-3 border-b border-gray-200 bg-gray-200 text-left text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider"
                        >
                          Buyurtmalar narxi
                        </th>
                        <th
                          class="px-6 py-3 border-b border-gray-200 bg-gray-200 text-left text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          class="px-6 py-3 border-b border-gray-200 bg-gray-200 text-left text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider"
                        >
                          o'zgartirish
                        </th>
                      </tr>
                    </thead>

                    <tbody class="bg-white">
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
                                class="text-sm leading-5 font-medium text-gray-900"
                              >
                                {{ order.name }}
                              </div>
                              <!-- <div class="text-sm leading-5 text-gray-500">
                                +998-99-959-59-59
                              </div> -->
                            </div>
                          </div>
                        </td>

                        <td
                          class="px-6 py-3 whitespace-no-wrap border-b border-gray-200"
                        >
                          <div class="text-sm leading-5 text-gray-900">
                            {{ order.phone_number }}
                          </div>
                          <!-- <div class="text-sm leading-5 text-gray-500">
                            Web dev
                          </div> -->
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
                            <div v-if="showStatus" class="w-32 3 px-4">
                              <span
                                v-for="status in statuses"
                                :key="status"
                                @click="changeStatus(status, order.id)"
                                class="px-2 inline-flex text-xs cursor-pointer leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                                >{{ status }}</span
                              >
                            </div>
                            <span
                              @click="showStatus = true"
                              v-if="!showStatus"
                              class="px-2 inline-flex text-xs text-center cursor-pointer leading-5 font-semibold rounded-full bg-green-100 text-green-800"
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
                        <div
                          class="fixed z-30 top-0 bottom-0 right-0 left-0 bg-gray-600 opacity-30 flex items-center justify-center"
                          v-if="showDeleteDialog"
                        >
                          <div class="w-1/3 bg-white py-4 px-10">
                            <span class="font-bold text-xl block mb-6"
                              >Ushbu mahsulotni o'chirishni xohlaysizmi?
                            </span>

                            <div class="flex justify-between">
                              <button
                                @click="deleteOrder(deleteOrderID)"
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
        </main>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarOpen: false,
      showDeleteDialog: false,
      deleteOrderID: null,
      orders: [],
      activeStatus: "",
      statuses: ["Tushgan", "Kutilmoqda", "Bekor qilingan", "Tugallangan"],
      showStatus: false,
    };
  },
  methods: {
    getOrders() {
      this.$axios
        .get("cart/orderbeta-list/", {
          params: {
            status: this.activeStatus,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.orders = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteOrder(id) {
      this.$axios
        .delete(`cart/orderbeta-delete/${id}`)
        .then((res) => {
          console.log(res.data, "ID:", id);
          this.showDeleteDialog = false;
          this.showSuccess = true;
          setTimeout(() => {
            this.showSuccess = false;
          }, 3000);
          this.getOrders();
        })
        .catch((err) => {
          this.showFail = true;
          setTimeout(() => {
            this.showFail = false;
          }, 3000);
          console.log(err);
        });
    },
    changeStatus(status, id) {
      const formData = new FormData();
      formData.append("status", status);
      this.$axios
        .patch(`cart/orderbeta-update/${id}`, formData)
        .then((res) => {
          this.showStatus = false;
          this.getOrders();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>
<style></style>
