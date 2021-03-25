<template>
  <div
    class="min-h-screen flex flex-col  flex-shrink-0 antialiased bg-gray-50 text-gray-800"
  >
    <div class=" flex flex-col w-64 bg-white h-full border-r">
      <!-- <div class="flex items-center justify-center h-14 border-b">
        <div>Bo'lim tanlang</div>
      </div> -->
      <div class="overflow-y-auto overflow-x-hidden flex-grow">
        <ul class="flex flex-col py-4 space-y-1">
          <li class="px-5">
            <div class="flex flex-row items-center h-8">
              <div class=" font-bold tracking-wide text-gray-600">
                Bo'limlar
              </div>
            </div>
          </li>
          <li v-for="category in categories" :key="category.id">
            <nuxt-link
              :to="`/products/${currentLink}/category/${category.id}`"
              class="relative flex flex-row items-center h-11 focus:outline-none  text-gray-600 hover:text-black border-l-4 border-transparent hover:border-black pr-6"
            >
              <span class="ml-6  tracking-wide truncate capitalize">{{
                category.name
              }}</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheSidebar",
  props: {
    currentLink: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      categories: []
    };
  },
  methods: {
    getCategories() {
      this.$axios
        .get("product/category-list/")
        .then(res => {
          console.log("category-list", res.data);
          this.categories = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getCategories();
  }
};
</script>

<style scoped>
.nuxt-link-exact-active {
  background: rgb(0, 0, 0);
  color: white;
}</style
>>
