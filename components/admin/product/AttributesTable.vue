<template>
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-200">
      <tr>
        <th
          scope="col"
          class="px-6 py-2 w-40 text-left text-sm font-bold text-gray-700 uppercase"
        >
          is main
        </th>

        <th
          scope="col"
          class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
        >
          key
        </th>
        <th
          scope="col"
          class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
        >
          label
        </th>
        <th
          scope="col"
          class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
        >
          value
        </th>
        <th
          scope="col"
          class="px-6 py-2 w-40 text-left text-sm font-bold text-gray-700 uppercase"
        >
          buyruqlar
        </th>
      </tr>
    </thead>
    <tbody class="bg-white">
      <tr class="border" v-for="(attr, index) in attributes" :key="index">
        <td class="px-6 py-1 border">
          <div class="flex items-center text-gray-500">
            <input
              type="checkbox"
              class="border w-full text-sm w-5 h-5 pl-5"
              v-model="attr.is_main"
            />
          </div>
        </td>

        <td class="px-6 py-1 border">
          <div class="flex items-center text-gray-500">
            <input
              type="text"
              class="w-full text-sm py-2 pl-5 mx-5 my-1"
              v-model="attr.key"
            />
          </div>
        </td>
        <td class="px-6 py-1 border">
          <div class="flex items-center text-gray-500">
            <input
              type="text"
              class="w-full text-sm py-2 pl-5 mx-5 my-1"
              v-model="attr.label"
            />
          </div>
        </td>
        <td class="px-6 py-1 border">
          <div class="flex items-center text-gray-500">
            <input
              type="text"
              class="w-full text-sm py-2 pl-5 mx-5 my-1"
              v-model="attr.value"
            />
          </div>
        </td>
        <td class="px-2 py-1 border">
          <div class="flex items-center text-gray-500 justify-center">
            <div
              @click="$emit('remove-attribute', attributes, index)"
              class="cursor-pointer hover:underline"
            >
              <img src="~/assets/images/delete.svg" alt="" class="w-6" />
            </div>
          </div>
        </td>
      </tr>
      <tr
        class="border"
        v-if="showAddNewKey && Object.keys(attribute).length > 3"
      >
        <td class="px-6 py-1 border">
          <div class="flex items-center text-gray-500">
            <input
              type="checkbox"
              class="border w-full text-sm w-5 h-5 pl-5"
              v-model="attribute.is_main"
            />
          </div>
        </td>

        <td class="py-1 border">
          <div class="flex items-center">
            <input
              type="text"
              class="w-full text-sm py-2 pl-5 mx-5 my-1"
              v-model="attribute.key"
            />
          </div>
        </td>
        <td class="py-1 border">
          <div class="flex items-center">
            <input
              type="text"
              class="w-full text-sm py-2 pl-5 mx-5 my-1"
              v-model="attribute.label"
            />
          </div>
        </td>
        <td class="py-1 border">
          <div class="flex items-center">
            <input
              type="text"
              class="w-full text-sm py-2 pl-5 mx-5 my-1"
              v-model="attribute.value"
            />
          </div>
        </td>
        <td class="px-6 py-1 border">
          <div class="flex items-center text-gray-500 justify-center">
            <div
              @click="$emit('add-attribute', attribute)"
              class="cursor-pointer hover:underline hover:font-bold"
            >
              Qo'shish
            </div>
          </div>
        </td>
        <div
          class="fixed z-40 bg-gray-500 opacity-50 flex items-center justify-center"
          v-if="showDeleteDialog"
        >
          <div class="w-1/3 opasity-0 rounded-md mx-auto bg-white py-4 px-10">
            <span class="font-bold text-center text-xl block mb-6"
              >Ushbu Kategoriyani o'chirishni xohlaysizmi?</span
            >
            <div class="flex justify-between">
              <button
                @click="deleteCategory(selectedCategoryID)"
                class="bg-red-500 rounded-md text-white py-2 px-4"
              >
                Ha
              </button>
              <button
                @click="showDeleteDialog = false"
                class="bg-gray-500 rounded-md text-white py-2 px-4"
              >
                Yo'q
              </button>
            </div>
          </div>
        </div>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    attributes: {
      type: Array,
      required: true,
    },
    attribute: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
</style>