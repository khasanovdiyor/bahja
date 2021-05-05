<template>
  <div>
    <label class="block font-bold relative text-gray-600 uppercase text-sm mb-1"
      >{{ label }}
      <p v-if="required" class="inline-block text-xs absolute text-red-500">
        &#10043;
      </p></label
    >
    <textarea
      v-if="textarea"
      class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
    </textarea>
    <input
      v-else
      type="text"
      class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
      v-mask="mask"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
    <div class="text-red-400 text-sm" v-if="requiredMessage">
      <i>To'ldirish shart</i>
    </div>
    <slot name="validation"></slot>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: null,
      required: true,
    },
    textarea: {
      type: Boolean,
      default: false,
    },
    mask: {
      type: [String, Function],
      required: false,
    },
    requiredMessage: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
</style>