<template>
  <div class="flex">
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
                nomi
              </th>
            </tr>
            <tr class="border-gray-400  border-b">
              <th
                scope="col"
                class="px-8 block  py-2 text-left font-bold text-gray-700 uppercase"
              >
                tavsif
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
            <tr class="border-gray-400  border-b">
              <th
                scope="col"
                class="px-8 block  py-2 text-left font-bold text-gray-700 uppercase"
              >
                brandi
              </th>
            </tr>
            <tr class="border-gray-400  border-b">
              <th
                scope="col"
                class="px-8 block  py-2 text-left font-bold text-gray-700 uppercase"
              >
                rangi
              </th>
            </tr>
            <tr class="border-gray-400  border-b">
              <th
                scope="col"
                class="px-8 block  py-2 text-left font-bold text-gray-700 uppercase"
              >
                o'lchami
              </th>
            </tr>
            <tr class="border-gray-400  border-b">
              <th
                scope="col"
                class="px-8 block  py-2 text-left font-bold text-gray-700 "
              >
                NARXI (so'm)
              </th>
            </tr>
            <tr class="border-gray-400  border-b">
              <th
                scope="col"
                class="px-8 block  py-2 text-left font-bold text-gray-700 uppercase"
              >
                soni
              </th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr class="border">
              <td class="px-6 py-2 border">
                <div class="flex items-center text-gray-500">
                  {{ product.id }}
                </div>
              </td>
            </tr>
            <tr class="border">
              <td class="px-6 py-2 border">
                <div class="flex items-center text-gray-500">
                  {{ product.name }}
                </div>
              </td>
            </tr>
            <tr class="border">
              <td class="px-6 py-2 border">
                <div class="flex items-center text-gray-500">
                  {{ product.description }}
                </div>
              </td>
            </tr>
            <tr class="border">
              <td class="px-6 py-2 border">
                <div class="flex items-center text-gray-500">
                  {{ product.category.name }}
                </div>
              </td>
            </tr>
            <tr class="border">
              <td class="px-6 py-2 border">
                <div class="flex items-center text-gray-500">
                  {{ product.brand.name }}
                </div>
              </td>
            </tr>
            <tr class="border">
              <td class="px-6 py-2 border">
                <div class="flex items-center text-gray-500">
                  {{ product.color.name }}
                </div>
              </td>
            </tr>
            <tr class="border">
              <td class="px-6 py-2 border">
                <div class="flex items-center text-gray-500">
                  {{ product.size }}
                </div>
              </td>
            </tr>
            <tr class="border">
              <td class="px-6 py-2 border">
                <div class="flex items-center text-gray-500">
                  {{ product.price }}
                </div>
              </td>
            </tr>
            <tr class="border">
              <td class="px-6 py-2 border">
                <div class="flex items-center text-gray-500">
                  {{ product.quantity }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-10">
        <span class="font-bold mb-4 block">Rasmi</span>
        <div class="w-56 h-48">
          <img
            :src="product.variation_image"
            class="w-full h-full object-cover object-top"
            alt="product image"
          />
        </div>
        <span class="font-bold mt-10 mb-4 block">Galereya rasmlari</span>
        <div class="flex ">
          <div
            v-for="image in product.images"
            :key="image.images"
            class="w-56 h-48 mb-10 mr-4"
          >
            <img
              :src="image.images"
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
      product: {
        brand: {},
        color: {},
        category: {}
      }
    };
  },
  methods: {
    getSlider() {
      this.$axios
        .get(`product/sliderdetail/${this.$route.params.id}`)
        .then(res => {
          console.log(res.data);
          this.product = res.data;
        });
    }
  },
  mounted() {
    this.getProduct();
  }
};
</script>

<style></style>
