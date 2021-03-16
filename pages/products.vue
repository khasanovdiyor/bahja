<template>
  <div>
    <TheContact />
    <TheHeader />
    <h1 class="px-16 font-bold text-center text-2xl my-5">Category name</h1>
    <div
      class="flex justify-center lg:justify-between px-5 md:px-16 flex-wrap "
    >
      <div class="" v-for="product in products" :key="product.name">
        <ProductCard :product="product" class="mb-5 mx-5" />
      </div>
    </div>
    <TheFooter />
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: {
        type: "fade",
        autoplay: true,
        rewind: true,
        width: "100%",
        type: "loop",
        perPage: 4,
        gap: "2rem"
      },
      products: [
        {
          name: "Adidas Fly N1",
          image:
            "https://cdn.pixabay.com/photo/2016/03/27/19/31/fashion-1283863_960_720.jpg",
          price: "400000",
          sale: "50%",
          priceWithSale: "200000",
          rating: 5,
          isImport: true
        },
        {
          name: "Nike Airmax Fly N1",
          image:
            "https://cdn.pixabay.com/photo/2016/03/27/19/31/fashion-1283863_960_720.jpg",
          price: "400000",
          sale: "50%",
          priceWithSale: "200000",
          rating: 4,
          isImport: false
        },
        {
          name: "Puma Sky N1",
          image:
            "https://cdn.shophumm.com/humm/uploads/sites/3/Fashion-bright-stylish-woman_Tile-default.jpg",
          price: "400000",
          sale: "50%",
          priceWithSale: "200000",
          rating: 3.5,
          isImport: true
        },
        {
          name: "Flo Fly N1",
          image:
            "https://cdn.shophumm.com/humm/uploads/sites/3/Fashion-bright-stylish-woman_Tile-default.jpg",
          price: "400000",
          sale: "50%",
          priceWithSale: "200000",
          rating: 4.5,
          isImport: false
        },
        {
          name: "Nike Airmax Fly N1",
          image:
            "https://cdn.pixabay.com/photo/2016/03/27/19/31/fashion-1283863_960_720.jpg",
          price: "400000",
          sale: "50%",
          priceWithSale: "200000",
          rating: 4,
          isImport: false
        },
        {
          name: "Puma Sky N1",
          image:
            "https://cdn.shophumm.com/humm/uploads/sites/3/Fashion-bright-stylish-woman_Tile-default.jpg",
          price: "400000",
          sale: "50%",
          priceWithSale: "200000",
          rating: 3.5,
          isImport: true
        },
        {
          name: "Nike Airmax Fly N1",
          image:
            "https://cdn.pixabay.com/photo/2016/03/27/19/31/fashion-1283863_960_720.jpg",
          price: "400000",
          sale: "50%",
          priceWithSale: "200000",
          rating: 4,
          isImport: false
        },
        {
          name: "Puma Sky N1",
          image:
            "https://cdn.shophumm.com/humm/uploads/sites/3/Fashion-bright-stylish-woman_Tile-default.jpg",
          price: "400000",
          sale: "50%",
          priceWithSale: "200000",
          rating: 3.5,
          isImport: true
        }
      ]
    };
  }
};
</script>
