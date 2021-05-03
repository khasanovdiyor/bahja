<template>
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-200">
      <tr>
        <th
          scope="col"
          class="px-6 py-3 w-16 text-left text-xs font-bold text-gray-600 uppercase"
          v-for="(head, index) in headers"
          :key="index"
        >
          {{ head }}
        </th>
      </tr>
    </thead>
    <tbody class="bg-white">
      <slot name="body"></slot>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "BaseTable",
  props: {
    headers: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
</style>