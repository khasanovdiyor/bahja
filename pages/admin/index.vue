<template>
  <div>
    <div>
      <div class="flex flex-col overflow-hidden">
        <main>
          <div class="container mx-auto">
            <h3 class="text-gray-700 text-xl font-bold font-medium mb-6">
              Statistika
            </h3>

            <div>
              <div class="flex flex-wrap mx-6">
                <div class="w-full px-6 sm:w-1/2 xl:w-1/3">
                  <div
                    class="relative"
                    tabindex="0"
                    @focusout="showSortOrder = false"
                  >
                    <h3
                      class="mb-2 cursor-pointer text-sm border border-gray-200 bg-white rounded-md inline-block px-1"
                      @click="showSortOrder = true"
                    >
                      {{ selectedSortOrder.name }} &#9660;
                    </h3>
                    <div
                      class="absolute bg-gray-200 text-sm left-16 top-0 z-40"
                      v-if="showSortOrder"
                    >
                      <ul>
                        <li
                          v-for="option in sortOptions"
                          :key="option.day"
                          @click="getStatsNewOrder(option)"
                          class="cursor-pointer hover:bg-gray-300 px-4"
                        >
                          {{ option.name }}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div
                    class="flex items-center px-5 py-6 shadow-lg rounded-md bg-white h-32"
                  >
                    <div class="p-3 rounded-full bg-opacity-75">
                      <img
                        src="~/assets/images/order.svg"
                        class="w-10 h-10"
                        alt="order"
                      />
                    </div>

                    <div class="mx-5">
                      <h4 class="text-2xl font-semibold text-gray-700">
                        {{ newOrder }}
                      </h4>
                      <div class="text-sm font-semibold text-gray-400">
                        Yangi buyurtmalar soni
                      </div>
                    </div>
                  </div>
                </div>

                <div class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
                  <div
                    class="relative"
                    tabindex="0"
                    @focusout="showSortMoney = false"
                  >
                    <h3
                      class="mb-2 cursor-pointer text-sm border border-gray-200 bg-white rounded-md inline-block px-1"
                      @click="showSortMoney = true"
                    >
                      {{ selectedSortMoney.name }} &#9660;
                    </h3>
                    <div
                      class="absolute bg-gray-200 text-sm left-16 top-0 z-40"
                      v-if="showSortMoney"
                    >
                      <ul>
                        <li
                          v-for="option in sortOptions"
                          :key="option.day"
                          @click="getStatsNewOrderMoney(option)"
                          class="cursor-pointer hover:bg-gray-300 px-4"
                        >
                          {{ option.name }}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div
                    class="flex items-center px-5 py-6 shadow-lg rounded-md bg-white h-32"
                  >
                    <div class="p-3 rounded-full bg-orange-600 bg-opacity-75">
                      <img
                        src="~/assets/images/money.svg"
                        class="w-10 h-10"
                        alt="monay"
                      />
                    </div>

                    <div class="mx-5">
                      <h4 class="text-2xl font-semibold text-gray-700">
                        {{ newOrderMoney.toLocaleString() }} so'm
                      </h4>
                      <div class="text-sm font-semibold text-gray-400">
                        Jami daromad
                      </div>
                    </div>
                  </div>
                </div>

                <div class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
                  <div
                    class="relative"
                    tabindex="0"
                    @focusout="showSortProduct = false"
                  >
                    <h3
                      class="mb-2 cursor-pointer text-sm border border-gray-200 bg-white rounded-md inline-block px-1"
                      @click="showSortProduct = true"
                    >
                      {{ selectedSortProduct.name }} &#9660;
                    </h3>
                    <div
                      class="absolute bg-gray-200 text-sm left-16 top-0 z-40"
                      v-if="showSortProduct"
                    >
                      <ul>
                        <li
                          v-for="option in sortOptions"
                          :key="option.day"
                          @click="getStatsNewProducts(option)"
                          class="cursor-pointer hover:bg-gray-300 px-4"
                        >
                          {{ option.name }}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div
                    class="flex items-center px-5 py-6 shadow-lg rounded-md bg-white h-32"
                  >
                    <div class="p-3 rounded-full bg-opacity-75">
                      <img
                        src="~/assets/images/shopping.svg"
                        class="w-12 h-10"
                        alt="product"
                      />
                    </div>

                    <div class="mx-5">
                      <h4 class="text-2xl font-semibold text-gray-700">
                        {{ newProducts }}
                      </h4>
                      <div class="text-sm font-semibold text-gray-400">
                        Yangi qo'shilgan mahsulotlar
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-16 flex items-center justify-between">
              <h2 class="text-xl mt-2 font-bold text-gray-700">Buyurtmalar</h2>
              <div>
                <select
                  name="filter-orders"
                  v-model="activeStatus"
                  id=""
                  class="inline-block ml-auto py-2 mr-2 border border-gray-200 text-sm rounded-md"
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
                  @click="getOrders(1)"
                  class="bg-gray-800 rounded-md text-sm px-4 text-white py-2"
                >
                  Saralash
                </button>
              </div>
            </div>

            <div class="flex flex-col mt-8">
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
      totalPages: null,
      newOrder: "",
      newOrderMoney: "",
      showDeleteDialog: false,
      deleteOrderID: null,
      newProducts: "",
      showSortOrder: false,
      showSortMoney: false,
      showSortProduct: false,
      orders: [],
      activeStatus: "Kutilmoqda",
      showStatus: false,
      statuses: ["Kutilmoqda", "Bekor qilingan", "Tugallangan"],

      selectedSortOrder: {
        name: "1 kunlik",
        day: 1
      },
      selectedSortMoney: {
        name: "1 kunlik",
        day: 1
      },
      selectedSortProduct: {
        name: "1 kunlik",
        day: 1
      },
      sortOptions: [
        {
          name: "1 kunlik",
          day: 1
        },
        {
          name: "Haftalik",
          day: 7
        },
        {
          name: "Oylik",
          day: 30
        },
        {
          name: "Yillik",
          day: 365
        }
      ]
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
          res.data.results.forEach(el => {
            el.showStatus = false;
          });
          this.orders = res.data.results;
          this.totalPages = res.data.total_pages;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          loader.hide();
        });
    },
    getStatsNewOrder(option) {
      const formData = new FormData();
      formData.append("date", option.day);
      this.$axios
        .post("product/statistics/orders/number/", formData)
        .then(res => {
          console.log(res.data);
          this.newOrder = res.data.number;
          this.showSortOrder = false;
          this.selectedSortOrder = option;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getStatsNewProducts(option) {
      const formData = new FormData();
      formData.append("date", option.day);
      this.$axios
        .post("product/statistics/products/", formData)
        .then(res => {
          console.log(res.data);
          this.newProducts = res.data.number;
          this.showSortProduct = false;
          this.selectedSortProduct = option;
        })
        .catch(err => {
          this.showSortProduct = false;
          console.log(err);
        });
    },
    getStatsNewOrderMoney(option) {
      const formData = new FormData();
      formData.append("date", option.day);
      this.$axios
        .post("product/statistics/orders/money/", formData)
        .then(res => {
          console.log(res.data);
          this.newOrderMoney = res.data.number;
          this.showSortMoney = false;
          this.selectedSortMoney = option;
        })
        .catch(err => {
          this.showSortMoney = false;
          console.log(err);
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
      this.$axios
        .patch(`cart/change-status/${order.id}`, { status })
        .then(res => {
          this.$toast.success("Status muvaffaqiyatli o'zgardi");
          this.getOrders();
        })
        .catch(err => {
          this.$toast.error(
            err.response.data || "Status o'zgarishida xatolik yuz berdi"
          );
        });
    }
  },
  mounted() {
    this.getOrders(1);
    this.getStatsNewOrder(this.selectedSortOrder);
    this.getStatsNewOrderMoney(this.selectedSortMoney);
    this.getStatsNewProducts(this.selectedSortProduct);
  }
};
</script>
