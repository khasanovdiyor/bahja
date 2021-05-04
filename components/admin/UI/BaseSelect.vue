<template>
  <div>
    <label class="w-1/2 block font-bold text-gray-600 uppercase text-sm mb-1">{{
      label
    }}</label>
    <multiselect
      :value="value"
      @input="$emit('input', $event)"
      :placeholder="placeholder"
      :label="selectLabel"
      track-by="id"
      :options="options"
      :multiple="multiple"
      :taggable="taggable"
      @select="$emit('select', $event)"
      @remove="$emit('remove')"
    >
      <template v-if="multiple"
        ><span class="text-red-500" slot="noResult">{{ noResult }}</span>
      </template>
    </multiselect>
    <div class="text-red-400 text-sm" v-if="required">
      <i>To'ldirish shart</i>
    </div>
    <slot name="validation"></slot>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    selectLabel: {
      type: String,
      default: "name",
    },
    placeholder: {
      type: String,
      required: true,
    },
    noResult: {
      type: String,
      default: "So'rovingiz topilmadi",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    taggable: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      required: true,
    },
    required: {
      type: Boolean,
      defult: false,
    },
  },
};
</script>

<style>
</style>