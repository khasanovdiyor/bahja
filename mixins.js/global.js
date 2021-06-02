export default {
  data() {
    return {
      selectedProducts: [],
      categories: []
    };
  },
  methods: {
    getCategories() {
      this.$axios
        .get("product/category-all/")
        .then(res => {
          this.categories = res.data.results;
        })
        .catch(err => {});
    }
  }
};
