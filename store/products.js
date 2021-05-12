export const state = () => ({
  products: []
});

export const getters = {
  savedProducts(state) {
    return state.products;
  }
};
export const mutations = {
  initializeProducts(state) {
    if (process.browser)
      if (localStorage.getItem("products")) {
        state.products = JSON.parse(localStorage.getItem("products"));
      }
  },
  updateProduct(state, products) {
    state.products = products;
  },
  increment(state, index) {
    state.products[index].count++;
  },
  decrement(state, index) {
    state.products[index].count--;
  },
  addToCart(state, product) {
    // product qidirish
    let index = state.products.findIndex(
      el => parseInt(el.product_id) === parseInt(product.product_id)
    );

    if (index === -1) {
      state.products.push(product);
    } else {
      state.products[index].count = product.count;
    }
    localStorage.setItem("products", JSON.stringify(state.products));
  },
  delete(state, index) {
    state.products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(state.products));
  },
  deleteAll(state) {
    state.products = [];
    localStorage.setItem("products", JSON.stringify(state.products));
  }
};
export const actions = {
  getSavedProducts(context) {
    context.commit("initializeProducts");
  },
  addProductToCart(context, product) {
    context.commit("addToCart", product);
  },
  updateSavedProduct(context, products) {
    context.commit("updateProducts", products);
  },
  incrementCount(context, index) {
    context.commit("increment", index);
  },
  decrementCount(context, index) {
    context.commit("decrement", index);
  },
  deleteProduct(context, index) {
    context.commit("delete", index);
  },
  deleteAllProduct(context) {
    context.commit("deleteAll");
  }
};
