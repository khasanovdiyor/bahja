<template>
  <div>
    <div
      class="filter block sm:flex justify-center md:justify-between md:px-8 mx-0 md:mx-16 p-5 bg-gray-200"
    >
      <div
        class="flex w-8/12 mx-auto md:w-1/2 sm:mr-10 md:mr-0 justify-between"
      >
        <div class="leading-8 w-2/5">
          <h2 class="font-semibold mb-3 text-gray-700">RANGI</h2>
          <div class="h-40 scroll overflow-y-scroll">
            <ul class="text-gray-600">
              <li
                class="text-sm capitalize cursor-pointer"
                v-for="color in colors"
                :key="color.id"
              >
                <span>{{ color.name }}</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- <div class="leading-loose w-2/5">
          <h2 class="font-semibold mb-3 text-gray-700">O'LCHAMI</h2>
          <ul class="text-gray-600">
            <li
              class="text-sm  capitalize"
              v-for="size in sizeList"
              :key="size"
            >
              <input
                type="checkbox"
                class="rounded-full cursor-pointer"
                :class="size"
              />
              {{ size }}
            </li>
          </ul>
        </div> -->
      </div>

      <div
        class="flex w-8/12 mx-auto md:w-5/12 mt-5 sm:mt-0 justify-end justify-between"
      >
        <div class="leading-7 w-2/5">
          <h2 class="font-semibold mb-3 text-gray-700">BRENDI</h2>
          <ul class="text-gray-600">
            <li v-for="brand in brands" :key="brand.id">
              <input type="checkbox" class="cursor-pointer" />
              <label for="checkbox">{{ brand.name }}</label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sizes: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      colors: [],
      brands: [],
      sizeList: this.sizes
    };
  },
  methods: {
    getColors() {
      this.$axios
        .get(`product/color-list/`)
        .then(res => {
          this.colors = res.data;
        })
        .catch(err => {
        });
    },
    getBrands() {
      this.$axios
        .get(`product/brand-list/`)
        .then(res => {
          this.brands = res.data;
        })
        .catch(err => {
        });
    }
  },
  mounted() {
    this.getColors();
    this.getBrands();
  }
};
</script>
<style>
.scroll::-webkit-scrollbar {
  width: 5px;
}
.scroll::-webkit-scrollbar-thumb {
  background: #888;
}
::-webkit-scrollbar-track {
  background: #dbdada;
  border-radius: 10px;
}
</style>
