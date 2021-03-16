<template>
  <div>
    <TheContact />
    <TheHeader />
    <div class="px-5 md:px-16 bg-gray-200 flex flex-col ">
      <h2 class="font-bold text-4xl self-center">Product name</h2>
      <div class="flex justify-between">
        <div class="flex">
          <star-rating
            :increment="0.5"
            :rating="selectedProduct.rating"
            :show-rating="false"
            :max-rating="5"
            inactive-color="#ccc"
            active-color="gold"
            :star-size="15"
          >
          </star-rating
          ><span class="ml-2">2 ta fikr</span>
        </div>
        <div>Mavjudligi: <span class="font-bold">mavjud </span></div>
      </div>
    </div>
    <div class="px-5 lg:px-16 py-10 block lg:flex">
      <div class="w-full lg:w-1/2 mb-0 lg:mb-10">
        <splide :options="primaryOptions" ref="primary">
          <splide-slide
            v-for="slide in selectedProduct.slides"
            :key="slide.src"
            class=""
          >
            <img :src="slide.src" alt="" class="" />
          </splide-slide>
        </splide>
        <splide :options="secondaryOptions" ref="secondary">
          <splide-slide
            v-for="slide in selectedProduct.slides"
            :key="slide.src"
            class=""
          >
            <img :src="slide.src" alt="" />
          </splide-slide>
        </splide>
      </div>
      <div class="ml-10 lg:w-1/2 border-b-2 border-gray-200">
        <div class="mb-6 w-full mx-auto lg:mx-0 lg:w-1/2">
          <h4 class="uppercase mb-4">
            Color: <span class="font-bold capitalize">{{ product.color }}</span>
          </h4>
          <div class="flex  justify-between">
            <img
              v-for="slide in selectedProduct.slides"
              :key="slide.src"
              @click="selectColor(slide.name)"
              :src="slide.src"
              class="w-16 h-16 object-cover mr-2 border-2 border-white"
              :class="{
                'border-blue-400': product.color == slide.name
              }"
            />
          </div>
        </div>
        <div class="w-1/2 mx-auto lg:mx-0 ">
          <h4 class="mb-4 uppercase">
            Size: <span class="font-bold capitalize">{{ product.size }}</span>
          </h4>
          <div class="flex justify-between">
            <div
              class="w-10 h-10 inline-flex items-center justify-center bg-gray-200 border-2 border-white"
              :class="{ 'border-blue-400': product.size == size.size }"
              @click="selectSize(size.size)"
              v-for="size in sizes"
              :key="size.size"
            >
              {{ size.size }}
            </div>
          </div>
        </div>

        <div class="mt-6 flex items-center border-b-2 border-gray-200 pb-8">
          <span class="flex items-center  h-6  bg-gray-200 mr-8">
            <button v-on:click="decrement()" class="w-6 text-lg font-bold">
              -
            </button>
            <p class="w-6 text-lg text-center">{{ product.count }}</p>
            <button v-on:click="increment()" class="w-6 text-lg font-bold">
              +
            </button>
          </span>
          <span class="font-bold text-2xl">200,000 so'm</span>
          <button
            @click="saveToCart"
            class="uppercase bg-black text-white py-2 px-4 mx-4"
          >
            Savatchaga qo'shish
          </button>
          <div class="">
            <svg
              class="text-red-600 w-6"
              viewBox="0 -28 512.001 512"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m256 455.515625c-7.289062 0-14.316406-2.640625-19.792969-7.4375-20.683593-18.085937-40.625-35.082031-58.21875-50.074219l-.089843-.078125c-51.582032-43.957031-96.125-81.917969-127.117188-119.3125-34.644531-41.804687-50.78125-81.441406-50.78125-124.742187 0-42.070313 14.425781-80.882813 40.617188-109.292969 26.503906-28.746094 62.871093-44.578125 102.414062-44.578125 29.554688 0 56.621094 9.34375 80.445312 27.769531 12.023438 9.300781 22.921876 20.683594 32.523438 33.960938 9.605469-13.277344 20.5-24.660157 32.527344-33.960938 23.824218-18.425781 50.890625-27.769531 80.445312-27.769531 39.539063 0 75.910156 15.832031 102.414063 44.578125 26.191406 28.410156 40.613281 67.222656 40.613281 109.292969 0 43.300781-16.132812 82.9375-50.777344 124.738281-30.992187 37.398437-75.53125 75.355469-127.105468 119.308594-17.625 15.015625-37.597657 32.039062-58.328126 50.167969-5.472656 4.789062-12.503906 7.429687-19.789062 7.429687zm-112.96875-425.523437c-31.066406 0-59.605469 12.398437-80.367188 34.914062-21.070312 22.855469-32.675781 54.449219-32.675781 88.964844 0 36.417968 13.535157 68.988281 43.882813 105.605468 29.332031 35.394532 72.960937 72.574219 123.476562 115.625l.09375.078126c17.660156 15.050781 37.679688 32.113281 58.515625 50.332031 20.960938-18.253907 41.011719-35.34375 58.707031-50.417969 50.511719-43.050781 94.136719-80.222656 123.46875-115.617188 30.34375-36.617187 43.878907-69.1875 43.878907-105.605468 0-34.515625-11.605469-66.109375-32.675781-88.964844-20.757813-22.515625-49.300782-34.914062-80.363282-34.914062-22.757812 0-43.652344 7.234374-62.101562 21.5-16.441406 12.71875-27.894532 28.796874-34.609375 40.046874-3.453125 5.785157-9.53125 9.238282-16.261719 9.238282s-12.808594-3.453125-16.261719-9.238282c-6.710937-11.25-18.164062-27.328124-34.609375-40.046874-18.449218-14.265626-39.34375-21.5-62.097656-21.5zm0 0"
              />
            </svg>
          </div>
        </div>
        <div class="mt-6 border-b-2 border-gray-200 pb-8">
          <h3 class="font-bold text-xl uppercase mb-6">
            Kafolatlangan xavfsiz to'lov
          </h3>
          <div class="flex">
            <img
              src="../assets/images/click.png"
              alt="click logo"
              class="w-24 mr-10"
            />
            <img
              src="../assets/images/payme.svg"
              alt="payme logo"
              class="w-24"
            />
          </div>
        </div>
        <div class="my-6 border-b-2 border-gray-200 pb-8">
          <h3 class="uppercase font-bold mb-2">Maxsulot haqida ma'lumot</h3>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente
            incidunt corporis labore consequatur consectetur praesentium aut,
            vel doloribus eos aperiam iste pariatur facilis numquam perspiciatis
            molestias officiis repellat ex blanditiis.
          </p>
        </div>
        <div class="border-b-2 border-gray-200 pb-8">
          <h3 class="uppercase font-bold mb-2">Qo'shimcha ma'lumot</h3>
          <div>
            <div>
              <span class="font-bold">Rangi: </span
              ><span
                v-for="color in selectedProduct.slides"
                :key="color.name"
                class="text-gray-600"
                >{{ color.name }},
              </span>
            </div>
            <div>
              <span class="font-bold">O'lcham: </span
              ><span
                v-for="size in sizes"
                :key="size.size"
                class="text-gray-600"
                >{{ size.size }},
              </span>
            </div>
            <div>
              <span class="font-bold">Material: </span
              ><span class="text-gray-600">100% Paxta</span>
            </div>
          </div>
        </div>
        <div class="my-6">
          <h3 class="uppercase font-bold mb-2">Xaridorlar fikri</h3>
          <div class="flex">
            <star-rating
              :increment="0.5"
              :rating="selectedProduct.rating"
              :show-rating="false"
              :max-rating="5"
              inactive-color="#ccc"
              active-color="gold"
              :star-size="20"
            >
            </star-rating
            ><span class="mx-2 text-lg">2 ta fikr</span>
            <div
              class="flex ml-auto cursor-pointer"
              @click="showCommentBox = !showCommentBox"
            >
              <img
                src="../assets/images/comment.svg"
                alt="comment icon"
                class="w-6 mr-2"
              />
              <span>Fikr bildirish</span>
            </div>
          </div>
          <div class="my-6" v-if="showCommentBox">
            <textarea
              name="comment"
              class="bg-gray-200 w-full h-24 py-2 px-4"
              placeholder="Fikringizni shu yerga qoldiring"
            ></textarea>
            <div class="flex justify-between items-center mt-2">
              <star-rating
                :increment="0.5"
                :rating="0"
                :show-rating="false"
                :max-rating="5"
                inactive-color="#ccc"
                active-color="gold"
                :star-size="15"
              >
              </star-rating>
              <button class="bg-black px-4 py-2 text-white">
                Fikr bildirish
              </button>
            </div>
          </div>
          <div>
            <div class="flex justify-between mt-6 mb-2">
              <span class="font-bold text-lg">Mirjahon</span>
              <div class="flex items-center ">
                <span class="text-gray-600 mr-4">3 daqiqa oldin</span>
                <star-rating
                  :increment="0.5"
                  :rating="4"
                  :show-rating="false"
                  :max-rating="5"
                  inactive-color="#ccc"
                  active-color="gold"
                  :star-size="15"
                >
                </star-rating>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet
              molestiae sapiente at qui blanditiis, deleniti repellendus saepe
              autem voluptatum iste rem ut quam eligendi. Cumque nemo tenetur
              possimus inventore minus?
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showCommentBox: false,
      products: [],
      selectedProduct: {
        id: 1,
        name: "Adidas Fly N1",
        image:
          "https://cdn.pixabay.com/photo/2016/03/27/19/31/fashion-1283863_960_720.jpg",
        slides: [
          {
            src:
              "https://miro.medium.com/max/10370/1*FbAVZD_gQJtd2FX21S7c5w.jpeg",
            name: "Red"
          },
          {
            src:
              "https://cdn.pixabay.com/photo/2015/07/27/20/21/beauty-863439_960_720.jpg",
            name: "White"
          },
          {
            src:
              "https://cdn.pixabay.com/photo/2016/08/26/20/44/elan-1623085_960_720.jpg",
            name: "Black"
          },
          {
            src:
              "https://www.coverstory.co.in/media/cms/home/category/work.jpg",
            name: "Green"
          }
        ],

        price: "400000",
        sale: "50%",
        priceWithSale: "200,000",
        rating: 5,
        isImport: true
      },
      product: {
        count: 1,
        id: 5,
        color: null,
        size: null
      },
      sizes: [
        {
          id: 1,
          size: "XL"
        },
        {
          id: 1,
          size: "XXL"
        },
        {
          id: 1,
          size: "L"
        },
        {
          id: 1,
          size: "M"
        },
        {
          id: 1,
          size: "S"
        },
        {
          id: 1,
          size: "XS"
        }
      ],
      primaryOptions: {
        perPage: 1,
        perMove: 1,
        type: "fade",
        minwidth: 600,
        height: 400,
        pagination: false,
        arrows: true,
        cover: true
      },
      secondaryOptions: {
        type: "slide",
        rewind: true,
        minwidth: 600,
        height: 100,
        gap: "1rem",
        pagination: false,
        fixedWidth: 135,
        fixedHeight: 64,
        cover: true,
        focus: "center",
        isNavigation: true
      }
    };
  },
  methods: {
    increment() {
      this.product.count++;
    },
    decrement() {
      this.product.count--;
    },
    selectColor(colorName) {
      this.product.color = colorName;
    },

    selectSize(size) {
      this.product.size = size;
    },
    saveToCart() {
      this.saveProduct();
      // console.log("Mahsulot cartga qoshildi!");
      // const products = JSON.parse(localStorage.getItem("products"));
      console.log("Localstorage: ", localStorage.products);
      console.log("Localstorage: ", JSON.parse(localStorage.products));
    },
    saveProduct() {
      let newList = [];
      newList.push(this.product);
      console.log("newList.push(this.product);", this.product);
      let old = localStorage.getItem("products");
      console.log("old", old);
      if (old) newList = [...newList, ...JSON.parse(old)];
      console.log("new", newList);
      const parsed = JSON.stringify(newList);
      console.log(JSON.parse(localStorage.getItem(newList)));
      localStorage.setItem("products", parsed);
    }
  },
  mounted() {
    this.$refs.primary.sync(this.$refs.secondary.splide);
  }
};
</script>

<style></style>
