<template>
  <div>
    <div
      class="mb-6 w-full mx-auto lg:mx-0 lg:w-1/2"
      v-for="(item, index) in selector_data"
      :key="index"
    >
      <h4 class="uppercase mb-4">
        {{ item.label }}: {{ selected_attrs[index] }}
        <span class="font-bold capitalize">{{ selected_attrs[item.key] }}</span>
      </h4>
      <div class="flex ">
        <div
          v-for="(val, i) in item.values"
          :key="i"
          class="flex w-16 h-16 object-cover object-top cursor-pointer mr-2 border-2"
          :class="{
            'border-blue-400': selected_attrs[index] == val.value
          }"
          @click="selected_attrs[index] = val.value"
        >
          <img
            v-if="['color', ' '].includes(index)"
            :src="val.image"
            class="w-16 h-full object-cover object-top"
          />
          <span
            v-else
            class="bg-gray-100 flex items-center justify-center w-full text-xl"
          >
            {{ val.value }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      required: true
    },
    product: {
      type: Object
    }
  },
  watch: {
    selected_attrs: {
      deep: true,
      handler(newVal) {
        this.$emit("attribute-changed", newVal);
      }
    }
  },
  data() {
    return {
      selected_attrs: {}
    };
  },
  computed: {
    selector_data() {
      // key: {
      //   label: 'string',
      //   values: array
      // }
      let attrs = {};
      if (this.products.length > 0)
        attrs = this.convertAttributes(this.product);
      this.products.forEach(element => {
        console.log(element);
        for (const key in attrs) {
          if (element.attributes[key]) {
            let val = element.attributes[key].value;
            if (attrs[key]["values"].filter(e => e.value === val).length === 0)
              attrs[key]["values"].push({ value: val, image: element.image });
          }
        }
      });
      const sortedAttrs = Object.keys(attrs)
        .sort()
        .reduce((obj, key) => {
          obj[key] = attrs[key];
          return obj;
        }, {});
      for (const key in sortedAttrs) {
        sortedAttrs[key].values.sort((a, b) => (a.value > b.value ? 1 : -1));
      }
      return sortedAttrs;
    }
  },
  methods: {
    convertAttributes(product) {
      let attrs = product.attributes;
      let new_attrs = Object.assign({}, attrs);
      for (const key in attrs) {
        attrs[key]["values"] = [
          { value: new_attrs[key]["value"], image: product.image }
        ];

        this.$set(this.selected_attrs, key, attrs[key]["value"]);

        // delete attrs[key]["value"];
      }
      return attrs;
    }
  },
  mounted() {}
};
</script>

<style></style>
