<template>
  <div>
    <paginate
      :page-count="pageCount"
      :margin-pages="0"
      :page-range="pageRange"
      prev-text="Oldingisi"
      next-text="Keyingisi"
      container-class="pagination flex justify-between"
      page-link-class="bg-gray-800 text-white rounded-lg py-2 px-4"
      prev-link-class="bg-gray-800 text-white py-2 px-4 rounded-lg"
      next-link-class="bg-gray-800 text-white py-2 px-4 rounded-lg"
      :click-handler="clickHandler"
    ></paginate>
  </div>
</template>

<script>
export default {
  props: {
    pageCount: {
      type: Number,
      required: true
    },
    pageRange: {
      type: Number,
      required: true
    },
    clickHandler: {
      type: Function,
      required: true
    }
  }
};
</script>