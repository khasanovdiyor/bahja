<template>
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-200">
      <tr>
        <th
          scope="col"
          class="px-6 py-2 w-40 text-left text-sm font-bold text-gray-700 uppercase"
          v-for="(head, index) in tableHeaders"
          :key="index"
        >
          {{ head }}
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
              <img
                src="~/assets/images/delete.svg"
                alt="icon trash"
                class="w-6"
              />
            </div>
          </div>
        </td>
      </tr>
      <tr class="border" v-if="showAddNewKey">
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
              @click="$emit('add-attribute', attributes)"
              class="cursor-pointer hover:underline hover:font-bold"
            >
              Qo'shish
            </div>
          </div>
        </td>
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
    showAddNewKey: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      tableHeaders: ["is_main", "key", "label", "value", "buyruqlar"],
    };
  },
};
</script>

<style>
</style>