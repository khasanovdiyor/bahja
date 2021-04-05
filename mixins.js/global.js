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
          this.categories = res.data;
          console.log("global categories", this.categories);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
