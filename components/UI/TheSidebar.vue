<template>
  <div
    :class="
      sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
    "
    class="fixed z-30 inset-y-0 top-0 left-0 transition duration-300 transform bg-gray-900 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0 min-h-screen flex flex-col flex-shrink-0 antialiased bg-gray-50 text-gray-800"
  >
    <div class="flex flex-col w-64 bg-white h-full border-r">
      <!-- <div class="flex items-center justify-center h-14 border-b">
        <div>Bo'lim tanlang</div>
      </div> -->
      <div class="overflow-y-auto overflow-x-hidden flex-grow">
        <ul class="flex flex-col py-4 space-y-1">
          <li class="px-5">
            <div class="flex flex-row items-center h-8">
              <div class="font-bold tracking-wide text-gray-600">Bo'limlar</div>
            </div>
          </li>
          <li v-for="category in categories" :key="category.id" class="ml-2">
            <nuxt-link
              :to="`/products/${currentLink}/${category.slug}`"
              class="relative flex flex-row items-center h-11 focus:outline-none text-gray-600 hover:text-black border-l-4 border-transparent hover:border-black pr-6"
            >
              <span class="ml-6 tracking-wide truncate capitalize">{{
                category.name
              }}</span>
            </nuxt-link>
            <ul v-if="category.childs" class="ml-2">
              <li
                v-for="childCategory in category.childs"
                :key="childCategory.id"
              >
                <nuxt-link
                  v-if="showChild(childCategory)"
                  :to="`/products/${currentLink}/${childCategory.slug}`"
                  class="relative flex flex-row items-center h-11 focus:outline-none text-gray-600 hover:text-black border-l-4 border-transparent hover:border-black pr-6"
                >
                  <span class="ml-6 tracking-wide truncate capitalize">{{
                    childCategory.name
                  }}</span>
                </nuxt-link>
              </li>
            </ul>
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
    showChild(child) {
      let me = this;
      let currentCategory = this.categories.find(
        el => el.slug == me.$route.params.slug
      );
      if (currentCategory) {
        if (currentCategory.childs.includes(child)) return true;
        return false;
      } else return true;
    },
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
}
</style>
