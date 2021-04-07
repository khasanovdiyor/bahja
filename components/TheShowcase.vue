<template>
  <div>
    <div class="sm:grid grid-cols-4 grid-rows-2 gap-4 px-6 lg:px-16">
      <div
        class="block w-full row-span-1 md:row-span-2 col-span-4 md:col-span-2"
      >
        <splide
          :options="options"
          :slides="slides"
          class="h-72 block w-full lg:h-full"
        >
          <splide-slide v-for="slide in slides" :key="slide.id" class="h-72">
            <div
              :style="{ backgroundImage: 'url(' + slide.image + ')' }"
              class="lg:h-80 h-72 w-full flex items-center justify-center bg-cover bg-center"
            >
              <div
                class="bg-white opacity-75 text-center px-10 py-5 mx-16 font-semibold text-xl"
              >
                {{ slide.text }}
              </div>
            </div>
          </splide-slide>
        </splide>
      </div>
      <div
        v-for="(slide, index) in slides"
        :key="slide.id"
        class="row-span-1 my-6 sm:my-0 flex items-center justify-center bg-cover bg-center"
        :class="{
          'lg:col-span-2 xl:col-span-1 sm:h-auto h-36 col-span-4 sm:col-span-2 md:col-span-2 md:row-span-1':
            index < 2,
          'xl:col-span-2  col-span-4 md:col-span-4 h-36 xl:h-auto': index > 1,
        }"
        :style="{ backgroundImage: `url(${slide.image})` }"
      >
        <div class="px-10 py-5 bg-white opacity-75 mx-6">
          {{ slide.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slides: [],
      options: {
        type: "fade",
        autoplay: true,
        rewind: true,
        width: 1020,
        perPage: 1,
        gap: "1rem",
      },
    };
  },
  methods: {
    getSlider() {
      let me = this;

      this.$axios
        .get("product/slider/list/")
        .then((res) => {
          console.log("slider-list", res.data);
          res.data.forEach((element) => {
            me.slides.push(element);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.$nextTick(this.$nextTick(() => this.getSlider()));
  },
};
</script>

<style></style>
