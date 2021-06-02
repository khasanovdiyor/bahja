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
      <div class="flex">
        <div
          v-for="(val, i) in item.values"
          :key="i"
          class="flex w-16 h-16 object-cover object-top mr-2 border-2"
          :class="{
            'border-blue-400 cursor-pointer':
              selected_attrs[index] == val.value,
            'opacity-50 cursor-default': !availableAttrs[index].attrs.includes(
              val.value
            )
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
    },
    "selected_attrs.color"() {

      const found = this.products.find(
        el =>
          (el.attributes.color.value === this.selected_attrs.color &&
            el.attributes.size.value === this.selected_attrs.size) ||
          el.attributes.color.value === this.selected_attrs.color
      );
      if (found) {
        this.selected_attrs.size = found.attributes.size.value;
        this.sizeChanged = true;
      } else this.sizeChanged = false;
    },
    "selected_attrs.size"() {
      const found = this.products.find(
        el =>
          (el.attributes.size.value === this.selected_attrs.size &&
            el.attributes.color.value === this.selected_attrs.color) ||
          el.attributes.size.value === this.selected_attrs.size
      );
      if (found) {
        this.selected_attrs.color = found.attributes.color.value;
        this.colorChanged = true;
      } else this.colorChanged = false;
    }
  },
  data() {
    return {
      selected_attrs: {},
      sizeChanged: false,
      colorChanged: false
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
    },
    availableAttrs() {
      const available = [];

      this.products.forEach(product => {
        for (const key in product.attributes) {
          if (
            product.attributes[key].value === this.selected_attrs[key] &&
            !available.includes(product.attributes)
          ) {
            available.push(product.attributes);
          }
        }
      });
      let newObj = {};
      let arr = JSON.parse(JSON.stringify(available));
      arr.forEach(el => {
        for (const key in el) {
          if (!newObj[key]) newObj[key] = Object.assign({}, el[key]);
          if (!newObj[key].attrs) newObj[key].attrs = [];
          if (!newObj[key].attrs.includes(el[key].value))
            newObj[key].attrs.push(el[key].value);
        }
      });
      return newObj;
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
  mounted() {
    console.info(this.products);
  }
};
</script>

<style></style>
